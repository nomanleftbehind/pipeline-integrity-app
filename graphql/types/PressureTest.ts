import { enumType, objectType, stringArg, extendType, nonNull, arg, intArg, floatArg } from 'nexus';
import { NexusGenObjects } from 'nexus-typegen';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { User as IUser, PressureTest as IPressureTest } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';
import {
  requiredWTForMopCalc,
  mopTestPressureCalc,
  maxPressureOfLimitingSpecCalc,
  pressureTestPressureCalc,
  requiredWTForTestPressureCalc,
  pressureTestCorrosionAllowanceCalc,
  waterForPiggingCalc,
} from './PressureTestCalcs';



export const LimitingSpecEnumMembers = {
  ANSI150: 'ANSI 150',
  ANSI300: 'ANSI 300',
  ANSI600: 'ANSI 600'
}

export const LimitingSpecEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'LimitingSpecEnum',
  },
  name: 'LimitingSpecEnum',
  members: LimitingSpecEnumMembers
});

export const LimitingSpecEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(LimitingSpecEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});

export const PressureTestObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'limitingSpec', nullable: true, type: 'LimitingSpecEnum', enumObjectArray: LimitingSpecEnumArray },
  { field: 'infoSentOutDate', nullable: true, type: 'DateTime' },
  { field: 'ddsDate', nullable: true, type: 'DateTime' },
  { field: 'pressureTestDate', nullable: false, type: 'DateTime' },
  { field: 'pressureTestReceivedDate', nullable: true, type: 'DateTime' },
  { field: 'integritySheetUpdated', nullable: true, type: 'DateTime' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'requiredWTForMop', nullable: true, type: 'Float' },
  { field: 'mopTestPressure', nullable: true, type: 'Float' },
  { field: 'maxPressureOfLimitingSpec', nullable: true, type: 'Float' },
  { field: 'pressureTestPressure', nullable: true, type: 'Float' },
  { field: 'requiredWTForTestPressure', nullable: true, type: 'Float' },
  { field: 'pressureTestCorrosionAllowance', nullable: true, type: 'Float' },
  { field: 'waterForPigging', nullable: true, type: 'Float' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];



export const PressureTest = objectType({
  name: 'PressureTest',
  sourceType: {
    module: '@prisma/client',
    export: 'PressureTest',
  },
  definition: t => {
    for (const { field, nullable, type } of PressureTestObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, {
        type,
        resolve:
          field === 'limitingSpec' ?
            ({ limitingSpec }) => {
              const result = limitingSpec && serverEnumToDatabaseEnum(LimitingSpecEnumMembers, limitingSpec);
              return result;
            } :
            undefined,
      })
    }
  }
});

export const PressureTestExtendObject = extendType({
  type: 'PressureTest',
  definition: t => {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async ({ createdById }, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolvePressureTestAuthorized({ user, createdById });
      }
    })
  },
});

interface IresolvePressureTestAuthorizedArgs {
  user: IUser;
  createdById: IPressureTest['createdById'];
}

const resolvePressureTestAuthorized = ({ user, createdById }: IresolvePressureTestAuthorizedArgs) => {
  const { role, id } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdById === id);
}


export const PressureTestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pressureTestsByPipelineId', {
      type: 'PressureTest',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {


        const pipeline = await ctx.prisma.pipeline.findUnique({
          where: { id: pipelineId },
          select: { mop: true, outsideDiameter: true, yieldStrength: true, wallThickness: true, length: true }
        });

        const pipelinePressureTests = await ctx.prisma.pressureTest.findMany({
          where: { pipelineId },
          select: { id: true, limitingSpec: true }
        });

        if (pipeline && pipelinePressureTests.length > 0) {
          const { mop, outsideDiameter, yieldStrength, wallThickness, length } = pipeline;
          const requiredWTForMop = await requiredWTForMopCalc({ mop, outsideDiameter, yieldStrength });
          const mopTestPressure = await mopTestPressureCalc({ outsideDiameter, requiredWTForMop, yieldStrength });
          const waterForPigging = await waterForPiggingCalc({ length, outsideDiameter, wallThickness });
          
          for (const { id, limitingSpec } of pipelinePressureTests) {
            const maxPressureOfLimitingSpec = await maxPressureOfLimitingSpecCalc({ limitingSpec });
            
            const pressureTestPressure = await pressureTestPressureCalc({ mopTestPressure, maxPressureOfLimitingSpec });
            
            const requiredWTForTestPressure = await requiredWTForTestPressureCalc({ pressureTestPressure, outsideDiameter, yieldStrength });
            
            const pressureTestCorrosionAllowance = await pressureTestCorrosionAllowanceCalc({ requiredWTForMop, requiredWTForTestPressure });
            console.log(
              maxPressureOfLimitingSpec,
);

            await ctx.prisma.pressureTest.update({
              where: { id },
              data: {
                // requiredWTForMop,
                // mopTestPressure,
                // maxPressureOfLimitingSpec,
                pressureTestPressure: 0,
                // requiredWTForTestPressure,
                // pressureTestCorrosionAllowance,
                // waterForPigging,
              }
            });
            // do not return here as you are inside the loop;

          }
        }
        const result = await ctx.prisma.pressureTest.findMany({
          where: { pipelineId },
          orderBy: { pressureTestDate: 'desc' },
        });
        return result;
      }
    })
  }
});


export const PressureTestPayload = objectType({
  name: 'PressureTestPayload',
  definition(t) {
    t.field('pressureTest', { type: 'PressureTest' })
    t.field('error', { type: 'FieldError' })
  },
});


export const PressureTestMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPressureTest', {
      type: 'PressureTestPayload',
      args: {
        id: nonNull(stringArg()),
        limitingSpec: arg({ type: 'LimitingSpecEnum' }),
        infoSentOutDate: arg({ type: 'DateTime' }),
        ddsDate: arg({ type: 'DateTime' }),
        pressureTestDate: arg({ type: 'DateTime' }),
        pressureTestReceivedDate: arg({ type: 'DateTime' }),
        integritySheetUpdated: arg({ type: 'DateTime' }),
        comment: stringArg(),
      },
      resolve: async (_, args, ctx: Context) => {

        const user = ctx.user;
        if (user) {
          const { id: userId, firstName, role } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
            if (role === 'OPERATOR') {
              const currentPressureTest = await ctx.prisma.pressureTest.findUnique({
                where: { id: args.id },
                select: {
                  createdById: true,
                }
              });
              if (currentPressureTest && currentPressureTest.createdById !== userId) {
                return {
                  error: {
                    field: 'Pressure test created by',
                    message: `Hi ${firstName}. Your user privilages do not allow you to edit pressure tests not authored by you.`,
                  }
                }
              }
            }
            const pressureTest = await ctx.prisma.pressureTest.update({
              where: { id: args.id },
              data: {
                limitingSpec: databaseEnumToServerEnum(LimitingSpecEnumMembers, args.limitingSpec),
                infoSentOutDate: args.infoSentOutDate,
                ddsDate: args.ddsDate,
                pressureTestDate: args.pressureTestDate || undefined,
                pressureTestReceivedDate: args.pressureTestReceivedDate,
                integritySheetUpdated: args.integritySheetUpdated,
                comment: args.comment,
                updatedById: userId,
              },
            });
            return { pressureTest }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes pressure tests.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      },
    })
    t.field('addPressureTest', {
      type: 'PressureTestPayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            const pressureTest = await ctx.prisma.pressureTest.create({
              data: {
                pipelineId,
                pressureTestDate: today,
                createdById: userId,
                updatedById: userId,
              }
            });
            return { pressureTest }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add pressure tests.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
    t.field('deletePressureTest', {
      type: 'PressureTestPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {

        const user = ctx.user;
        if (user) {
          const { id: userId, firstName, role } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
            if (role === 'OPERATOR') {
              const currentPressureTest = await ctx.prisma.pressureTest.findUnique({
                where: { id },
                select: {
                  createdById: true,
                }
              });
              if (currentPressureTest && currentPressureTest.createdById !== userId) {
                return {
                  error: {
                    field: 'Pressure test created by',
                    message: `Hi ${firstName}. Your user privilages do not allow you to delete pressure tests not authored by you.`,
                  }
                }
              }
            }
            const pressureTest = await ctx.prisma.pressureTest.delete({
              where: { id }
            });
            return { pressureTest }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete pressure tests.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
  }
})


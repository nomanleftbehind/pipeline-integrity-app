import { enumType, objectType, stringArg, extendType, nonNull, arg, intArg, floatArg } from 'nexus';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { User as IUser, PressureTest as IPressureTest } from '@prisma/client';
import {
  requiredWTForMopCalc,
  mopTestPressureCalc,
  maxPressureOfLimitingSpecCalc,
  pressureTestPressureCalc,
  requiredWTForTestPressureCalc,
  pressureTestCorrosionAllowanceCalc,
  waterForPiggingCalc,
} from './PressureTestCalcs';


export const PressureTest = objectType({
  name: 'PressureTest',
  sourceType: {
    module: '@prisma/client',
    export: 'PressureTest',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.float('requiredWTForMop', {
      resolve: async ({ pipelineId }, _args, ctx: Context) => await requiredWTForMopCalc({ pipelineId, ctx })
    })
    t.float('mopTestPressure', {
      resolve: async ({ pipelineId }, _args, ctx: Context) => await mopTestPressureCalc({ pipelineId, ctx })
    })
    t.field('limitingSpec', {
      type: 'LimitingSpecEnum',
      resolve: ({ limitingSpec }) => {
        const result = limitingSpec && serverEnumToDatabaseEnum(LimitingSpecEnumMembers, limitingSpec);
        return result;
      }
    })
    t.float('maxPressureOfLimitingSpec', {
      resolve: async ({ limitingSpec }) => await maxPressureOfLimitingSpecCalc({ limitingSpec })
    })
    t.float('pressureTestPressure', {
      resolve: async ({ pipelineId, limitingSpec }, _args, ctx: Context) => await pressureTestPressureCalc({ pipelineId, ctx, limitingSpec })
    })
    t.float('requiredWTForTestPressure', {
      resolve: async ({ pipelineId, limitingSpec }, _args, ctx: Context) => await requiredWTForTestPressureCalc({ pipelineId, limitingSpec, ctx })
    })
    t.float('pressureTestCorrosionAllowance', {
      resolve: async ({ pipelineId, limitingSpec }, _args, ctx: Context) => await pressureTestCorrosionAllowanceCalc({ pipelineId, limitingSpec, ctx })
    })
    t.float('waterForPigging', {
      resolve: async ({ pipelineId }, _args, ctx: Context) => await waterForPiggingCalc({ pipelineId, ctx })
    })
    t.field('infoSentOutDate', { type: 'DateTime' })
    t.field('ddsDate', { type: 'DateTime' })
    t.nonNull.field('pressureTestDate', { type: 'DateTime' })
    t.field('pressureTestReceivedDate', { type: 'DateTime' })
    t.field('integritySheetUpdated', { type: 'DateTime' })
    t.string('comment')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
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

        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'OPERATOR')) {

          const { id: userId, firstName, role } = user;

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
                  message: `Hi ${firstName}. Your user privilages do not allow you to edit pressure test entries not authored by you.`,
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

        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'OPERATOR')) {
          const userId = user.id;
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

        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'OPERATOR')) {

          const { id: userId, firstName, role } = user;

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
                  message: `Hi ${firstName}. Your user privilages do not allow you to delete pressure test entries not authored by you.`,
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
            message: 'Not authorized',
          }
        }
      }
    })
  }
})


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
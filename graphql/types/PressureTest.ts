import { enumType, objectType, stringArg, extendType, nonNull, arg, intArg, floatArg } from 'nexus';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { Pipeline as IPipeline, PressureTest as IPressureTest } from '@prisma/client';

type PickAndAddUndefined<T, K extends keyof T> = {
  [P in K]: T[P] | undefined;
};

type IRequiredWTForMopCalcArgs = PickAndAddUndefined<IPipeline, 'mop' | 'outsideDiameter' | 'yieldStrength'>;
type IMaxPressureOfLimitingSpecArgs = Pick<IPressureTest, 'limitingSpec'>;


const designFactor = 0.8;
const locationFactor = 0.9;
const jointFactor = 1;
const tempDeratingFactor = 1;
const corrosionAllowance = 0.5;

const requiredWTForMopCalc = ({ mop, outsideDiameter, yieldStrength }: IRequiredWTForMopCalcArgs) => {
  if (mop != null && outsideDiameter != null && yieldStrength != null) {
    const result = (mop * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}

const mopTestPressureCalc = ({ mop, outsideDiameter, yieldStrength }: IRequiredWTForMopCalcArgs) => {
  const requiredWTForMop = requiredWTForMopCalc({ mop, outsideDiameter, yieldStrength });
  if (yieldStrength != null && outsideDiameter != null && requiredWTForMop != null) {
    const result = (2 * yieldStrength * (requiredWTForMop + corrosionAllowance) * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor / outsideDiameter) * 1.25;
    return result;
  }
  return null;
}

const maxPressureOfLimitingSpecCalc = ({ limitingSpec }: IMaxPressureOfLimitingSpecArgs) => {
  switch (limitingSpec) {
    case 'ANSI150':
      return 1895 * 1.25;
    case 'ANSI300':
      return 4960 * 1.25;
    case 'ANSI600':
      return 9930 * 1.25
    default:
      return null;
  }
}

type IPressureTestPressureArgs = IRequiredWTForMopCalcArgs & IMaxPressureOfLimitingSpecArgs;

const pressureTestPressureCalc = ({ mop, outsideDiameter, yieldStrength, limitingSpec }: IPressureTestPressureArgs) => {
  const mopTestPressure = mopTestPressureCalc({ mop, outsideDiameter, yieldStrength });
  const maxPressureOfLimitingSpec = maxPressureOfLimitingSpecCalc({ limitingSpec });

  if (mopTestPressure != null && maxPressureOfLimitingSpec != null) {
    return Math.min(mopTestPressure, maxPressureOfLimitingSpec);
  }
  if (mopTestPressure != null && maxPressureOfLimitingSpec == null) {
    return mopTestPressure;
  }
  if (mopTestPressure == null && maxPressureOfLimitingSpec != null) {
    return maxPressureOfLimitingSpec;
  }
  return null;
}

const requiredWTForTestPressureCalc = ({ mop, outsideDiameter, yieldStrength, limitingSpec }: IPressureTestPressureArgs) => {
  const pressureTestPressure = pressureTestPressureCalc({ mop, outsideDiameter, yieldStrength, limitingSpec });
  if (yieldStrength != null && outsideDiameter != null && pressureTestPressure != null) {
    const result = ((pressureTestPressure / 1.25) * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}

const pressureTestCorrosionAllowanceCalc = ({ mop, outsideDiameter, yieldStrength, limitingSpec }: IPressureTestPressureArgs) => {
  const requiredWTForMop = requiredWTForMopCalc({ mop, outsideDiameter, yieldStrength });
  const requiredWTForTestPressure = requiredWTForTestPressureCalc({ mop, outsideDiameter, yieldStrength, limitingSpec });

  if (requiredWTForMop != null && requiredWTForTestPressure != null) {
    const result = requiredWTForTestPressure - requiredWTForMop;
    return result;
  }
  return null;
}

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
      args: {
        mop: intArg(),
        outsideDiameter: floatArg(),
        yieldStrength: intArg(),
      },
      resolve: async (_parent, { mop, outsideDiameter, yieldStrength }) => requiredWTForMopCalc({ mop, outsideDiameter, yieldStrength })
    })
    t.float('mopTestPressure', {
      args: {
        mop: intArg(),
        outsideDiameter: floatArg(),
        yieldStrength: intArg(),
      },
      resolve: async (_parent, { mop, yieldStrength, outsideDiameter }) => mopTestPressureCalc({ mop, yieldStrength, outsideDiameter })
    })
    t.field('limitingSpec', {
      type: 'LimitingSpecEnum',
      resolve: ({ limitingSpec }) => {
        const result = limitingSpec && serverEnumToDatabaseEnum(LimitingSpecEnumMembers, limitingSpec);
        return result;
      }
    })
    t.float('maxPressureOfLimitingSpec', {
      resolve: async ({ limitingSpec }) => maxPressureOfLimitingSpecCalc({ limitingSpec })
    })
    t.float('pressureTestPressure', {
      args: {
        mop: intArg(),
        outsideDiameter: floatArg(),
        yieldStrength: intArg(),
      },
      resolve: async ({ limitingSpec }, { mop, yieldStrength, outsideDiameter }) => pressureTestPressureCalc({ mop, yieldStrength, outsideDiameter, limitingSpec })
    })
    t.float('requiredWTForTestPressure', {
      args: {
        mop: intArg(),
        outsideDiameter: floatArg(),
        yieldStrength: intArg(),
      },
      resolve: async ({ limitingSpec }, { mop, yieldStrength, outsideDiameter }) => requiredWTForTestPressureCalc({ mop, yieldStrength, outsideDiameter, limitingSpec })
    })
    t.float('pressureTestCorrosionAllowance', {
      args: {
        mop: intArg(),
        outsideDiameter: floatArg(),
        yieldStrength: intArg(),
      },
      resolve: async ({ limitingSpec }, { mop, yieldStrength, outsideDiameter }) => pressureTestCorrosionAllowanceCalc({ mop, yieldStrength, outsideDiameter, limitingSpec })
    })
    t.float('waterForPigging', {
      args: {
        length: nonNull(floatArg()),
        outsideDiameter: floatArg(),
        wallThickness: floatArg(),
      },
      resolve: async (_parent, { length, outsideDiameter, wallThickness }) => {
        if (outsideDiameter != null && wallThickness != null) {
          const result = Math.PI * (length * 1000) * (Math.pow(((outsideDiameter - wallThickness) / 2000), 2));
          return result;
        }
        return null;
      }
    })
    t.field('infoSentOutDate', { type: 'DateTime' })
    t.field('ddsDate', { type: 'DateTime' })
    t.field('pressureTestDate', { type: 'DateTime' })
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
  },
})


export const PressureTestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pressureTestsByPipelineId', {
      type: 'PressureTest',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
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
              pressureTestDate: args.pressureTestDate,
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
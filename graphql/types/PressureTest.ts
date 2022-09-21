import { enumType, objectType, stringArg, extendType, nonNull, arg, inputObjectType } from 'nexus';
import { NexusGenObjects, NexusGenFieldTypes, NexusGenArgTypes } from 'nexus-typegen';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import { Context, ContextSubscription } from '../context';
import { User as IUser, PressureTest as IPressureTest } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';
import { allocatePressureTest } from './PressureTestCalcs';
import { withFilter } from 'graphql-subscriptions';



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
  { field: 'date', nullable: false, type: 'DateTime' },
  { field: 'limitingSpec', nullable: true, type: 'LimitingSpecEnum', enumObjectArray: LimitingSpecEnumArray },
  { field: 'infoSentOutDate', nullable: true, type: 'DateTime' },
  { field: 'ddsDate', nullable: true, type: 'DateTime' },
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
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
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
        return !!user && resolvePressureTestAuthorized(user);
      }
    })
  },
});


const resolvePressureTestAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR';
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
        await allocatePressureTest({ pipelineId, ctx });
        const result = await ctx.prisma.pressureTest.findMany({
          where: { pipelineId },
          orderBy: { date: 'desc' },
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


export const EditPressureTestInput = inputObjectType({
  name: 'EditPressureTestInput',
  definition(t) {
    t.nonNull.string('id')
    t.field('date', { type: 'DateTime' })
    t.field('limitingSpec', { type: 'LimitingSpecEnum' })
    t.field('infoSentOutDate', { type: 'DateTime' })
    t.field('ddsDate', { type: 'DateTime' })
    t.field('pressureTestReceivedDate', { type: 'DateTime' })
    t.field('integritySheetUpdated', { type: 'DateTime' })
    t.string('comment')
  },
});


export const PressureTestMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPressureTest', {
      type: 'PressureTestPayload',
      args: { data: nonNull(arg({ type: 'EditPressureTestInput' })) },
      resolve: async (_, { data: { id, date, limitingSpec, infoSentOutDate, ddsDate, pressureTestReceivedDate, integritySheetUpdated, comment } }, ctx: Context) => {

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
                    message: `Hi ${firstName}. Your user privilages do not allow you to edit pressure tests not authored by you.`,
                  }
                }
              }
            }
            const pressureTest = await ctx.prisma.pressureTest.update({
              where: { id },
              data: {
                date: date || undefined,
                limitingSpec: databaseEnumToServerEnum(LimitingSpecEnumMembers, limitingSpec),
                infoSentOutDate,
                ddsDate,
                pressureTestReceivedDate,
                integritySheetUpdated,
                comment,
                updatedById: userId,
              },
            });
            await allocatePressureTestChronologicalEdge({ pipelineId: pressureTest.pipelineId, ctx });
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
                date: today,
                createdById: userId,
                updatedById: userId,
              }
            });
            await allocatePressureTestChronologicalEdge({ pipelineId, ctx });
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
            await allocatePressureTestChronologicalEdge({ pipelineId: pressureTest.pipelineId, ctx });
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
    t.field('allocatePressureTest', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName, id: userId } = user;
          const authorized = resolvePressureTestAuthorized(user);
          if (authorized) {

            const allPressureTests = await ctx.prisma.pressureTest.groupBy({
              by: ['pipelineId'],
              _count: {
                _all: true
              }
            });

            const numberOfItems = allPressureTests.map(({ _count: { _all } }) => _all).reduce((previousValue, currentValue) => previousValue + currentValue);
            let progress = 0;
            for (const { pipelineId, _count: { _all } } of allPressureTests) {
              await allocatePressureTest({ pipelineId, ctx });
              progress += _all;
              ctx.pubsub.publish('pressureTestAllocationProgress', { userId, progress, numberOfItems });
            }
            // If allocation succeeds, publish initial progress after the loop to close the progress modal
            ctx.pubsub.publish('pressureTestAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
            return {
              success: {
                field: 'Pressure Test',
                message: `Allocated ${numberOfItems} pressure tests`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate pressure tests.`,
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

interface IAllocatePressureTestChronologicalEdge {
  pipelineId: IPressureTest['pipelineId'];
  ctx: Context;
}

export const allocatePressureTestChronologicalEdge = async ({ pipelineId, ctx }: IAllocatePressureTestChronologicalEdge) => {

  const { _min, _max } = await ctx.prisma.pressureTest.aggregate({
    where: { pipelineId },
    _max: { date: true },
    _min: { date: true },
  });

  const pipelinePressureTests = await ctx.prisma.pressureTest.findMany({
    where: { pipelineId },
    select: { id: true, date: true }
  });

  for (const { id, date } of pipelinePressureTests) {
    const first = date.getTime() === _min.date?.getTime() ? true : null;
    const last = date.getTime() === _max.date?.getTime() ? true : null;
    await ctx.prisma.pressureTest.update({
      where: { id },
      data: {
        first,
        last,
      }
    });
  }
}


export const PressureTestAllocationProgressSubscription = extendType({
  type: 'Subscription',
  definition: t => {
    t.nonNull.field('pressureTestAllocationProgress', {
      type: 'AllocationProgressObject',
      args: { data: nonNull(arg({ type: 'AllocationInput' })) },
      subscribe: withFilter(
        (_root/* This is still undefined at this point */, _args: NexusGenArgTypes['Subscription']['pressureTestAllocationProgress'], ctx: ContextSubscription) => {
          return ctx.pubsub.asyncIterator('pressureTestAllocationProgress')
        },
        (root: NexusGenFieldTypes['Subscription']['pressureTestAllocationProgress'], args: NexusGenArgTypes['Subscription']['pressureTestAllocationProgress'], _ctx: ContextSubscription) => {
          // Only push an update for user who pressed the allocate button
          return (root.userId === args.data.userId);
        },
      ),
      resolve: (root: NexusGenFieldTypes['Subscription']['pressureTestAllocationProgress'], _args, _ctx: ContextSubscription) => {
        return root
      },
    })
  }
});
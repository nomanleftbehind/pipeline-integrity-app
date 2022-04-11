import { objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import {
  gasAssociatedLiquidsCalc,
  totalFluidsCalc,
} from './Well';

export const SalesPoint = objectType({
  name: 'SalesPoint',
  sourceType: {
    module: '@prisma/client',
    export: 'SalesPoint',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.nonNull.float('gasAssociatedLiquids', {
      resolve: async ({ gas }) => await gasAssociatedLiquidsCalc(gas)
    })
    t.nonNull.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => await totalFluidsCalc({ oil, water, gas })
    })
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('fdcRecId')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('pipeline', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).pipeline();
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveSalesPointAuthorized(user);
      }
    })
  },
})


const resolveSalesPointAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}


export const SalesPointQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('salesPointsByPipelineId', {
      type: 'SalesPoint',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findMany({
          where: { pipelineId },
          orderBy: { name: 'asc' },
        });
        return result;
      },
    })
    t.list.field('salesPointOptions', {
      type: 'SourceOptions',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const connectedSalesPoints = await ctx.prisma.salesPoint.findMany({
          where: { pipelineId },
          select: {
            id: true,
          },
        });
        const ids = connectedSalesPoints.map(({ id }) => id);
        const options = await ctx.prisma.salesPoint.findMany({
          select: {
            id: true,
            name: true,
            pipeline: {
              select: {
                satellite: {
                  select: {
                    name: true,
                    facility: {
                      select: {
                        name: true,
                      }
                    }
                  }
                }
              }
            }
          },
          orderBy: [{ pipeline: { satellite: { facility: { name: 'asc' } } } }, { pipeline: { satellite: { name: 'asc' } } }, { name: 'asc' }]
        });

        const result = options.map(({ id, pipeline, name }) => {
          const { satellite } = pipeline || {};
          const { name: satelliteName, facility } = satellite || {};
          const { name: facilityName } = facility || {};
          const result = { source: name, facility: facilityName, satellite: satelliteName, id, disabled: ids.includes(id) }
          return result;
        });

        return result;
      }
    })
    t.field('salesPointsGroupByPipelineId', {
      type: 'SourceGroupBy',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const total = await ctx.prisma.salesPoint.groupBy({
          by: ['pipelineId'],
          _sum: { oil: true, water: true, gas: true },
          _max: { lastProduction: true, lastInjection: true },
          _min: { firstProduction: true, firstInjection: true },
          where: { pipelineId }
        });
        if (total.length > 0) {
          const { _sum: { oil, water, gas }, _max: { lastProduction, lastInjection }, _min: { firstProduction, firstInjection } } = total[0];
          const result = { oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection }
          return result;
        }
        return null;
      },
    })
  }
})


export const SalesPointCreateInput = inputObjectType({
  name: 'SalesPointCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('fdcRecId')
  },
});


export const SalesPointPayload = objectType({
  name: 'SalesPointPayload',
  definition(t) {
    t.field('salesPoint', { type: 'SalesPoint' })
    t.field('error', { type: 'FieldError' })
  },
});


export const SalesPointMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editSalesPoint', {
      type: 'SalesPointPayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: stringArg(),
        name: stringArg(),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
        firstProduction: arg({ type: 'DateTime' }),
        lastProduction: arg({ type: 'DateTime' }),
        firstInjection: arg({ type: 'DateTime' }),
        lastInjection: arg({ type: 'DateTime' }),
        fdcRecId: stringArg()
      },
      resolve: async (_, args, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user
          const authorized = resolveSalesPointAuthorized(user);
          if (authorized) {
            const salesPoint = await ctx.prisma.salesPoint.update({
              where: { id: args.id },
              data: {
                pipelineId: args.pipelineId || undefined,
                name: args.name || undefined,
                oil: args.oil || undefined,
                water: args.water || undefined,
                gas: args.gas || undefined,
                firstProduction: args.firstProduction,
                lastProduction: args.lastProduction,
                firstInjection: args.firstInjection,
                lastInjection: args.lastInjection,
                fdcRecId: args.fdcRecId,
                updatedById: user.id,
              },
            });
            return { salesPoint }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to sales points.`,
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
    t.field('connectSalesPoint', {
      type: 'SalesPointPayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { id, pipelineId }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveSalesPointAuthorized(user);
          if (authorized) {
            const salesPoint = await ctx.prisma.salesPoint.update({
              where: { id },
              data: {
                pipeline: {
                  connect: {
                    id: pipelineId,
                  }
                },
                updatedBy: {
                  connect: {
                    id: userId,
                  }
                }
              }
            });
            return { salesPoint }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to sales points.`,
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
    t.field('disconnectSalesPoint', {
      type: 'SalesPointPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveSalesPointAuthorized(user);
          if (authorized) {
            const salesPoint = await ctx.prisma.salesPoint.update({
              where: { id },
              data: {
                pipeline: {
                  disconnect: true,
                },
                updatedBy: {
                  connect: {
                    id: userId,
                  }
                }
              }
            });
            return { salesPoint }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to sales points.`,
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
});
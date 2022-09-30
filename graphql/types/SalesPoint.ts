import { objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';
import { allocateRecursivePipelineFlow } from './PipelineFlow';


export const SalesPointObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'name', nullable: false, type: 'String' },
  { field: 'oil', nullable: false, type: 'Float' },
  { field: 'water', nullable: false, type: 'Float' },
  { field: 'gas', nullable: false, type: 'Float' },
  { field: 'gasAssociatedLiquids', nullable: false, type: 'Float' },
  { field: 'totalFluids', nullable: false, type: 'Float' },
  { field: 'firstProduction', nullable: true, type: 'DateTime' },
  { field: 'lastProduction', nullable: true, type: 'DateTime' },
  { field: 'firstInjection', nullable: true, type: 'DateTime' },
  { field: 'lastInjection', nullable: true, type: 'DateTime' },
  { field: 'fdcRecId', nullable: true, type: 'String' },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

export const SalesPoint = objectType({
  name: 'SalesPoint',
  sourceType: {
    module: '@prisma/client',
    export: 'SalesPoint',
  },
  definition: t => {
    for (const { field, nullable, type } of SalesPointObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});

export const SalesPointExtendObject = extendType({
  type: 'SalesPoint',
  definition(t) {
    // t.nonNull.float('gasAssociatedLiquids', {
    //   resolve: async ({ gas }) => await gasAssociatedLiquidsCalc(gas)
    // })
    // t.nonNull.float('totalFluids', {
    //   resolve: async ({ oil, water, gas }) => await totalFluidsCalc({ oil, water, gas })
    // })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
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


export const EditSalesPointInput = inputObjectType({
  name: 'EditSalesPointInput',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('pipelineId')
    t.nonNull.field('flowCalculationDirection', { type: 'FlowCalculationDirectionEnum' })
    t.string('name')
    t.float('oil')
    t.float('water')
    t.float('gas')
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('fdcRecId')
  },
});


export const SalesPointMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editSalesPoint', {
      type: 'SalesPointPayload',
      args: { data: nonNull(arg({ type: 'EditSalesPointInput' })) },
      resolve: async (_, { data: { id, pipelineId, flowCalculationDirection, name, oil, water, gas, firstProduction, lastProduction, firstInjection, lastInjection, fdcRecId } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveSalesPointAuthorized(user);
          if (authorized) {
            const salesPoint = await ctx.prisma.salesPoint.update({
              where: { id },
              data: {
                name: name || undefined,
                oil: oil || undefined,
                water: water || undefined,
                gas: gas || undefined,
                firstProduction: firstProduction,
                lastProduction: lastProduction,
                firstInjection: firstInjection,
                lastInjection: lastInjection,
                fdcRecId: fdcRecId,
                updatedById: userId,
              },
            });
            if (typeof oil === 'number' || typeof water === 'number' || typeof gas === 'number' || firstProduction || lastProduction || firstInjection || lastInjection) {
              // Only allocate pipeline flow if numeric or datetime values have been changed on a wall.
              // Don't await because it can take many seconds depending on number of chained pipelines, and we dont' need the result of allocation
              allocateRecursivePipelineFlow({ pipelines: [{ id: pipelineId, flowCalculationDirection }], allocated: [], ctx });
            }
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
      args: { data: nonNull(arg({ type: 'ConnectSourceInput' })) },
      resolve: async (_, { data: { id, pipelineId, flowCalculationDirection } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveSalesPointAuthorized(user);
          if (authorized) {

            // When connecting new sales point to a pipeline, the requested sales point will implicitly be disconnected from previous pipeline.
            // We need to find that pipeline before new connection is made and run flow allocation on it, as the flow will have changed.
            const salesPointInitialPipeline = await ctx.prisma.pipeline.findFirst({
              where: { salesPoints: { some: { id } } },
              select: { id: true, flowCalculationDirection: true }
            });

            const pipelines = [{ id: pipelineId, flowCalculationDirection }];
            if (salesPointInitialPipeline && salesPointInitialPipeline.id !== pipelineId) {
              pipelines.push(salesPointInitialPipeline);
            }

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
            // Don't await because it can take many seconds depending on number of chained pipelines, and we dont' need the result of allocation
            allocateRecursivePipelineFlow({ pipelines, allocated: [], ctx });
            return { salesPoint }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to connect sales points to pipelines.`,
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
      args: { data: nonNull(arg({ type: 'DisconnectSourceInput' })) },
      resolve: async (_, { data: { id, pipelineInfo } }, ctx: Context) => {
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

            if (pipelineInfo) {
              // If pipeline info is passed to resolver, it means that resolver is being explicitly called to disconnect the sales point.
              // We want to run pipeline flow allocation in that case because sales point has been disconnected from the pipeline and flow has changed.
              // If pipeline info is not passed to resolver, it means that the disconnect sales point resolver is called as part of replacing the sales point with another sales point.
              // In that case pipeline flow allocation will be called inside connect sales point resolver, hence no need to run it twice.
              const { pipelineId, flowCalculationDirection } = pipelineInfo;
              // Don't await because it can take many seconds depending on number of chained pipelines, and we dont' need the result of allocation
              allocateRecursivePipelineFlow({ pipelines: [{ id: pipelineId, flowCalculationDirection }], allocated: [], ctx });
            }

            return { salesPoint }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to disconnect sales points from pipelines.`,
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
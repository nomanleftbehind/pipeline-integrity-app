import { objectType, stringArg, inputObjectType, extendType, nonNull, arg } from 'nexus';
import { Context } from '../context';
import { User as IUser, Well as IWell } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';
import { allocateRecursivePipelineFlow } from './PipelineFlow';



export const WellObjectFields: ITableConstructObject[] = [
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

export const Well = objectType({
  name: 'Well',
  sourceType: {
    module: '@prisma/client',
    export: 'Well',
  },
  definition: t => {
    for (const { field, nullable, type } of WellObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});



export const gasAssociatedLiquidsCalc = async (gas: number) => {
  const vol = gas * 35.49 * 0.00355238191999475 / 6.3;
  // Round to two decimals
  return Math.round((vol + Number.EPSILON) * 100) / 100;
}

interface ItotalFluidsCalcArgs {
  oil: number;
  water: number;
  gas: number;
}

export const totalFluidsCalc = async ({ oil, water, gas }: ItotalFluidsCalcArgs) => {
  return oil + water + await gasAssociatedLiquidsCalc(gas);
}

export const WellExtendObject = extendType({
  type: 'Well',
  definition(t) {
    // t.nonNull.float('gasAssociatedLiquids', {
    //   resolve: async ({ gas }) => await gasAssociatedLiquidsCalc(gas)
    // })
    // t.nonNull.float('totalFluids', {
    //   resolve: async ({ oil, water, gas }) => await totalFluidsCalc({ oil, water, gas })
    // })
    t.list.field('wellBatches', {
      type: 'WellBatch',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id }
        }).wellBatches();
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.field('pipeline', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.well.findUnique({
          where: { id },
        }).pipeline();
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveWellAuthorized(user);
      }
    })
  },
});

export const resolveWellAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}

export const SourceOptions = objectType({
  name: 'SourceOptions',
  definition(t) {
    t.string('facility')
    t.string('satellite')
    t.nonNull.string('id')
    t.nonNull.string('source')
    t.nonNull.boolean('disabled')
  }
});

export const SourceGroupBy = objectType({
  name: 'SourceGroupBy',
  definition(t) {
    t.float('oil')
    t.float('water')
    t.float('gas')
    t.float('gasAssociatedLiquids', {
      resolve: async ({ gas }) => {
        if (typeof gas === 'number') {
          return await gasAssociatedLiquidsCalc(gas);
        }
        return null
      }
    })
    t.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => {
        if (typeof oil === 'number' && typeof water === 'number' && typeof gas === 'number') {
          return await totalFluidsCalc({ oil, water, gas });
        }
        return null
      }
    })
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
  }
});


export const WellQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('wellsByPipelineId', {
      type: 'Well',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.well.findMany({
          where: { pipelineId },
          orderBy: { name: 'asc' },
        });
        return result;
      },
    })
    t.list.field('wellOptions', {
      type: 'SourceOptions',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const connectedWells = await ctx.prisma.well.findMany({
          where: { pipelineId },
          select: {
            id: true,
          },
        });
        const ids = connectedWells.map(({ id }) => id);
        const options = await ctx.prisma.well.findMany({
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
    t.field('wellsGroupByPipelineId', {
      type: 'SourceGroupBy',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {

        const total = await ctx.prisma.well.groupBy({
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


export const WellCreateInput = inputObjectType({
  name: 'WellCreateInput',
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

export const WellPayload = objectType({
  name: 'WellPayload',
  definition(t) {
    t.field('well', { type: 'Well' })
    t.field('error', { type: 'FieldError' })
  },
});

export const EditWellInput = inputObjectType({
  name: 'EditWellInput',
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

export const ConnectSourceInput = inputObjectType({
  name: 'ConnectSourceInput',
  definition: t => {
    t.nonNull.string('id')
    t.nonNull.string('pipelineId')
    t.nonNull.field('flowCalculationDirection', { type: 'FlowCalculationDirectionEnum' })
  },
});

export const DisconnectSourceOptionalInput = inputObjectType({
  name: 'DisconnectSourceOptionalInput',
  definition: t => {
    t.nonNull.string('pipelineId')
    t.nonNull.field('flowCalculationDirection', { type: 'FlowCalculationDirectionEnum' })
  },
});

export const DisconnectSourceInput = inputObjectType({
  name: 'DisconnectSourceInput',
  definition: t => {
    t.nonNull.string('id')
    t.field('pipelineInfo', {
      type: 'DisconnectSourceOptionalInput',
      description: 'Pass this object if well or sales point is being explicitly disconnected from pipeline, as opposed to implicitly by connecting the well or sales point to another pipeline'
    })
  },
});



export const WellMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editWell', {
      type: 'WellPayload',
      args: { data: nonNull(arg({ type: 'EditWellInput' })) },
      resolve: async (_, { data: { id, pipelineId, flowCalculationDirection, name, oil, water, gas, firstProduction, lastProduction, firstInjection, lastInjection, fdcRecId } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveWellAuthorized(user);
          if (authorized) {

            let totalFluids;
            let gasAssociatedLiquids;

            if (typeof oil === 'number') {
              const currentWellFlow = await ctx.prisma.well.findUnique({
                where: { id },
                select: { water: true, gas: true }
              });
              if (currentWellFlow) {
                const { water, gas } = currentWellFlow;
                totalFluids = await totalFluidsCalc({ oil, water, gas })
              }
            }
            if (typeof water === 'number') {
              const currentWellFlow = await ctx.prisma.well.findUnique({
                where: { id },
                select: { oil: true, gas: true }
              });
              if (currentWellFlow) {
                const { oil, gas } = currentWellFlow;
                totalFluids = await totalFluidsCalc({ oil, water, gas })
              }
            }
            if (typeof gas === 'number') {
              const currentWellFlow = await ctx.prisma.well.findUnique({
                where: { id },
                select: { oil: true, water: true }
              });
              if (currentWellFlow) {
                const { oil, water } = currentWellFlow;
                totalFluids = await totalFluidsCalc({ oil, water, gas });
                gasAssociatedLiquids = await gasAssociatedLiquidsCalc(gas);
              }
            }
            
            const well = await ctx.prisma.well.update({
              where: { id },
              data: {
                name: name || undefined,
                oil: oil || undefined,
                water: water || undefined,
                gas: gas || undefined,
                gasAssociatedLiquids,
                totalFluids,
                firstProduction,
                lastProduction,
                firstInjection,
                lastInjection,
                fdcRecId,
                updatedById: userId,
              },
            });
            if (typeof oil === 'number' || typeof water === 'number' || typeof gas === 'number' || firstProduction || lastProduction || firstInjection || lastInjection) {
              // Only allocate pipeline flow if numeric or datetime values have been changed on a wall.
              // Don't await because it can take many seconds depending on number of chained pipelines, and we dont' need the result of allocation
              allocateRecursivePipelineFlow({ pipelines: [{ id: pipelineId, flowCalculationDirection }], allocated: [], ctx });
            }
            return { well }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to wells.`,
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
    t.field('connectWell', {
      type: 'WellPayload',
      args: { data: nonNull(arg({ type: 'ConnectSourceInput' })) },
      resolve: async (_, { data: { id, pipelineId, flowCalculationDirection } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveWellAuthorized(user);
          if (authorized) {

            // When connecting new well to a pipeline, the requested well will implicitly be disconnected from previous pipeline.
            // We need to find that pipeline before new connection is made and run flow allocation on it, as the flow will have changed.
            const wellInitialPipeline = await ctx.prisma.pipeline.findFirst({
              where: { wells: { some: { id } } },
              select: { id: true, flowCalculationDirection: true }
            });

            const pipelines = [{ id: pipelineId, flowCalculationDirection }];
            if (wellInitialPipeline && wellInitialPipeline.id !== pipelineId) {
              pipelines.push(wellInitialPipeline);
            }

            const well = await ctx.prisma.well.update({
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
            return { well }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to connect wells to pipelines.`,
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
    t.field('disconnectWell', {
      type: 'WellPayload',
      args: { data: nonNull(arg({ type: 'DisconnectSourceInput' })) },
      resolve: async (_, { data: { id, pipelineInfo } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveWellAuthorized(user);
          if (authorized) {
            const well = await ctx.prisma.well.update({
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
              // If pipeline info is passed to resolver, it means that resolver is being explicitly called to disconnect the well.
              // We want to run pipeline flow allocation in that case because well has been disconnected from the pipeline and flow has changed.
              // If pipeline info is not passed to resolver, it means that the disconnect well resolver is called as part of replacing the well with another well.
              // In that case pipeline flow allocation will be called inside connect well resolver, hence no need to run it twice.
              const { pipelineId, flowCalculationDirection } = pipelineInfo;
              // Don't await because it can take many seconds depending on number of chained pipelines, and we dont' need the result of allocation
              allocateRecursivePipelineFlow({ pipelines: [{ id: pipelineId, flowCalculationDirection }], allocated: [], ctx });
            }

            return { well }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to disconnect wells from pipelines.`,
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



interface IAllocateWellFlowArgs {
  id: IWell['id'];
  oil: IWell['oil'];
  water: IWell['water'];
  gas: IWell['gas'];
  ctx: Context;
}

export const allocateWellFlow = async ({ id, oil, water, gas, ctx }: IAllocateWellFlowArgs) => {

  const gasAssociatedLiquids = await gasAssociatedLiquidsCalc(gas);
  const totalFluids = await totalFluidsCalc({ oil, water, gas })

  await ctx.prisma.well.update({
    where: { id },
    data: {
      gasAssociatedLiquids,
      totalFluids,
    }
  });

  console.log(id, oil, water, gas, gasAssociatedLiquids, totalFluids);

}
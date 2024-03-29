import { objectType, extendType, nonNull, stringArg, list, arg } from 'nexus';
import { gasAssociatedLiquidsCalc, totalFluidsCalc } from './Well';
import { resolvePipelineAuthorized } from './Pipeline';
import type {
  FlowCalculationDirectionEnum,
  Pipeline as IPipeline,
} from '@prisma/client';
import { Context } from '../context';
import { NexusGenObjects } from '../../node_modules/@types/nexus-typegen/index';

export const PipelineFlow = objectType({
  name: 'PipelineFlow',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name', {
      description: 'This field is a concatenated license and segment of a pipeline to conform with Well and Sales Point objects'
    })
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
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).createdBy()
        return result!;
      },
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
      resolve: async ({ id }, _args, ctx: Context) => {
        const { createdAt } = await ctx.prisma.pipeline.findUnique({
          where: { id },
          select: { createdAt: true },
        }) || {}
        return createdAt;
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).updatedBy()
        return result!;
      },
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
      resolve: async ({ id }, _args, ctx: Context) => {
        const { updatedAt } = await ctx.prisma.pipeline.findUnique({
          where: { id },
          select: { updatedAt: true },
        }) || {}
        return updatedAt;
      }
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolvePipelineAuthorized(user);
      }
    })
  }
});

export const PipelinesFlowAndSourceGroupBy = objectType({
  name: 'PipelinesFlowAndSourceGroupBy',
  definition(t) {
    t.list.field('pipelinesFlow', { type: 'PipelineFlow' })
    t.field('sourceGroupBy', { type: 'SourceGroupBy' })
  }
});

interface ITotalPipelineFlowRawQueryArgs {
  idList: (string | null)[];
  flowCalculationDirection: FlowCalculationDirectionEnum;
  ctx: Context;
}

export const totalPipelineFlowRawQuery = async ({ idList, flowCalculationDirection, ctx }: ITotalPipelineFlowRawQueryArgs) => {
  const ids = idList.join("', '");

  // This raw query calls user defined custom function on PostgreSQL database.
  // For it to work, sql function must first be created by executing file `/prisma/pipeline_flow_dynamic.sql` on database.
  // Before version 4.0.0, Prisma silently coerces Upstream/Downstream to flow_calculation_direction database type. From version 4.0.0, the query returns an error.
  // The fix is to explicitly cast Upstream/Downstream to the flow_calculation_direction type
  const result = await ctx.prisma.$queryRaw<NexusGenObjects['PipelineFlow'][]>`
      SELECT * FROM "ppl_db".pipeline_flow(${ids}, ${flowCalculationDirection}::flow_calculation_direction);
      `

  return result;
}

interface IPipelineFlowArgs {
  id: string;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  ctx: Context;
}

export const pipelineFlow = async ({ id, flowCalculationDirection, ctx }: IPipelineFlowArgs) => {
  const resultArray = await totalPipelineFlowRawQuery({ idList: [id], flowCalculationDirection, ctx });
  if (resultArray.length > 0) {
    const result = resultArray[0];
    return result;
  }
  return null;
}

interface IAllocateRecursivePipelineFlow {
  pipelines: Pick<IPipeline, 'id' | 'flowCalculationDirection'>[];
  allocated: string[];
  ctx: Context;
}

// Recursive function that traverses all chained upstream and downstream pipelines and allocates flow
export const allocateRecursivePipelineFlow = async ({ pipelines, allocated, ctx }: IAllocateRecursivePipelineFlow) => {

  console.log('pipelines:', pipelines.map((a: any) => a.license + '-' + a.segment), 'allocLic:', allocated);

  for (const { id, flowCalculationDirection } of pipelines) {
    await allocatePipelineFlow({ id, flowCalculationDirection, ctx });
    allocated.push(id);
  }

  if (pipelines.length === 0) {

  } else {
    const ids = pipelines.map(({ id }) => id);

    const newPipelines = await ctx.prisma.pipeline.findMany({
      where: {
        OR: [
          {
            upstream: { some: { downstreamId: { in: ids } } }
          },
          {
            downstream: { some: { upstreamId: { in: ids } } }
          },
        ],
        id: { notIn: allocated }
      },
      select: { id: true, flowCalculationDirection: true, license: true, segment: true }
    });

    await allocateRecursivePipelineFlow({ pipelines: newPipelines, allocated, ctx });
  }
};

interface IAllocatePipelineFlowArgs {
  id: IPipeline['id'];
  flowCalculationDirection: IPipeline['flowCalculationDirection'];
  ctx: Context;
}

export const allocatePipelineFlow = async ({ id, flowCalculationDirection, ctx }: IAllocatePipelineFlowArgs) => {

  const resultArray = await pipelineFlow({ id, flowCalculationDirection, ctx });
  if (resultArray) {
    const { oil, gas, water, firstProduction, firstInjection, lastInjection, lastProduction } = resultArray;
    const gasAssociatedLiquids = await gasAssociatedLiquidsCalc(gas);
    const totalFluids = await totalFluidsCalc({ oil, water, gas })
    await ctx.prisma.pipeline.update({
      where: { id },
      data: {
        oil,
        water,
        gas,
        gasAssociatedLiquids,
        totalFluids,
        firstProduction,
        firstInjection,
        lastProduction,
        lastInjection
      }
    });
    // console.log(id, flowCalculationDirection, oil, water, gas, gasAssociatedLiquids, totalFluids,);
  }
}


export const PipelineFlowQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pipelineOptions', {
      type: 'SourceOptions',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const ids = [id];
        const currentPipeline = await ctx.prisma.pipeline.findMany({
          where: { id },
          select: {
            upstream: { select: { upstreamId: true } },
            downstream: { select: { downstreamId: true } },
          },
        });
        for (const { upstream, downstream } of currentPipeline) {
          for (const { upstreamId } of upstream) {
            ids.push(upstreamId);
          }
          for (const { downstreamId } of downstream) {
            ids.push(downstreamId);
          }
        }
        const options = await ctx.prisma.pipeline.findMany({
          select: {
            id: true,
            license: true,
            segment: true,
            satellite: {
              select: {
                name: true,
                facility: {
                  select: {
                    name: true
                  }
                }
              }
            }
          },
          orderBy: [{ satellite: { facility: { name: 'asc' } } }, { satellite: { name: 'asc' } }, { license: 'asc' }, { segment: 'asc' }]
        });

        const result = options.map(({ id, license, segment, satellite }) => {
          const { name, facility } = satellite || {};
          const { name: facilityName } = facility || {};
          const result = { source: license + '-' + segment, facility: facilityName, satellite: name, id, disabled: ids.includes(id) }
          return result;
        });

        return result;
      }
    })
    t.list.field('pipelinesFlow', {
      type: 'PipelineFlow',
      args: {
        idList: nonNull(list(stringArg())),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_parent, { idList, flowCalculationDirection }, ctx: Context) => {
        return await totalPipelineFlowRawQuery({ idList, flowCalculationDirection, ctx });
      }
    })
    t.field('pipelineFlow', {
      type: 'PipelineFlow',
      args: {
        id: nonNull(stringArg()),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_parent, { id, flowCalculationDirection }, ctx: Context) => {
        return await pipelineFlow({ id, flowCalculationDirection, ctx });
      }
    })
  },
});



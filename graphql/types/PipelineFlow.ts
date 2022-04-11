import { objectType, extendType, nonNull, stringArg, list, arg } from 'nexus';
import { gasAssociatedLiquidsCalc, totalFluidsCalc } from './Well';
import { resolvePipelineAuthorized } from './Pipeline';
import type { FlowCalculationDirectionEnum } from '@prisma/client';
import { Context } from '../context';
import { NexusGenObjects } from '../../node_modules/@types/nexus-typegen/index';

export const PipelineFlow = objectType({
  name: 'PipelineFlow',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name', {
      description: 'This field is a concatonated license and segment of a pipeline to conform with Well and Sales Point objects'
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
    t.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).createdBy()
        return result;
      },
    })
    t.field('createdAt', {
      type: 'DateTime',
      resolve: async ({ id }, _args, ctx: Context) => {
        const { createdAt } = await ctx.prisma.pipeline.findUnique({
          where: { id },
          select: { createdAt: true },
        }) || {}
        return createdAt;
      },
    })
    t.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).updatedBy()
        return result;
      },
    })
    t.field('updatedAt', {
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
  // For it to work, sql function must first be created by executing file `/prisma/pipeline_flow_dynamic.sql` on database as the Administrator.
  const result = await ctx.prisma.$queryRaw<NexusGenObjects['PipelineFlow'][]>`
      SELECT * FROM "ppl_db".pipeline_flow(${ids}, ${flowCalculationDirection});
      `

  return result;
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
            upstream: { select: { id: true } },
            downstream: { select: { id: true } },
          },
        });
        for (const { upstream, downstream } of currentPipeline) {
          for (const { id } of upstream) {
            ids.push(id);
          }
          for (const { id } of downstream) {
            ids.push(id);
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
        const result = await totalPipelineFlowRawQuery({ idList, flowCalculationDirection, ctx });

        return result;
      }
    })
  },
});
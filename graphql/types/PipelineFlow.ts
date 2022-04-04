import { objectType, extendType, nonNull, stringArg, list, arg } from 'nexus';
import { gasAssociatedLiquidsCalc, totalFluidsCalc } from './Well';
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
      resolve: async ({ gas }) => gasAssociatedLiquidsCalc(gas)
    })
    t.nonNull.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => totalFluidsCalc({ oil, water, gas })
    })
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
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
      resolve: async (_, _args, ctx: Context) => {

        const result = await ctx.prisma.$queryRaw<NexusGenObjects['SourceOptions'][]>`
        SELECT

        COALESCE(f.name, 'no facility') "facility",
        COALESCE(s.name, 'no satellite') "satellite",
        pip.id,
        CONCAT(pip.license, '-', pip.segment) "source"

        FROM "ppl_db"."Pipeline" pip
        LEFT OUTER JOIN "ppl_db"."Satellite" s ON s."id" = pip."satelliteId"
        LEFT OUTER JOIN "ppl_db"."Facility" f ON f."id" = s."facilityId"

        ORDER BY f.name, s.name, pip.license, pip.segment
        `
        return result;
      }
    })
    t.list.field('pipelineFlow', {
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
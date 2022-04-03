import { objectType, extendType, nonNull, stringArg, list, arg } from 'nexus';
import { gasAssociatedLiquidsCalc, totalFluidsCalc } from './Well';
import { Context } from '../context';
import { NexusGenObjects } from '../../node_modules/@types/nexus-typegen/index';

export const PipelineFlow = objectType({
  name: 'PipelineFlow',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
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
  ctx: Context;
}

export const totalPipelineFlowRawQuery = async ({ idList, ctx }: ITotalPipelineFlowRawQueryArgs) => {
  const ids = idList.join("', '");
  const id = idList[0];
  if (id) {
    const { flowCalculationDirection } = await ctx.prisma.pipeline.findUnique({
      where: { id },
      select: { flowCalculationDirection: true },
    }) || {};
    if (flowCalculationDirection) {
      // This raw query calls user defined custom function on PostgreSQL database.
      // For it to work, sql function must first be created by executing file `/prisma/pipeline_flow_dynamic.sql` on database as the Administrator.
      const result = await ctx.prisma.$queryRaw<NexusGenObjects['PipelineFlow'][]>`
      SELECT * FROM "ppl_db".pipeline_flow(${ids}, ${flowCalculationDirection});
      `

      return result;
    }
  }
  return null;
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
      },
      resolve: async (_parent, { idList }, ctx: Context) => {
        const result = await totalPipelineFlowRawQuery({ idList, ctx });

        return result;
      }
    })
  },
});
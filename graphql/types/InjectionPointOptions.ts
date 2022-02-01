import { objectType, extendType, nonNull, stringArg, list, arg } from 'nexus';
import { gasAssociatedLiquidsCalc, totalFluidsCalc } from './InjectionPoint';
import { Context } from '../context';
import { NexusGenObjects } from '../../node_modules/@types/nexus-typegen/index';
import { FlowCalculationDirectionEnum } from '@prisma/client';


export const PipelineOptions = objectType({
  name: 'PipelineOptions',
  definition(t) {
    t.nonNull.string('facility')
    t.nonNull.string('satellite')
    t.nonNull.field('substance', { type: 'SubstanceEnum' })
    t.nonNull.string('id')
    t.nonNull.string('license')
    t.nonNull.string('segment')
  }
})

export const SourceOptions = objectType({
  name: 'SourceOptions',
  definition(t) {
    t.nonNull.string('facility')
    t.nonNull.string('satellite')
    t.nonNull.string('id')
    t.nonNull.string('source')
  }
})

export const PipelineFlow = objectType({
  name: 'PipelineFlow',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.nonNull.float('gasAssociatedLiquids', {
      resolve: async ({ gas }) => gasAssociatedLiquidsCalc(gas)
    })
    t.nonNull.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => totalFluidsCalc(oil, water, gas)
    })
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
  }
})

export const SatelliteSideBar = objectType({
  name: 'SatelliteSideBar',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
  }
})

export const SideBar = objectType({
  name: 'SideBar',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('satellites', { type: 'SatelliteSideBar' })
  }
})


export const totalPipelineFlowRawQuery = async (idList: (string | null)[], flowCalculationDirection: FlowCalculationDirectionEnum, ctx: Context) => {
  const ids = idList.join("', '");
  
  // This raw query calls user defined custom function on PostgreSQL database.
  // For it to work, sql function must first be created by executing file `/prisma/pipeline_flow_dynamic.sql` on database as the Administrator.
  const result = await ctx.prisma.$queryRaw<NexusGenObjects['PipelineFlow'][]>`
  SELECT * FROM "ppl_db".pipeline_flow(${ids}, ${flowCalculationDirection});
  `
  console.log(result);
  return result;
}


export const InjectionPointOptionsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pipelineOptions', {
      type: 'PipelineOptions',
      resolve: async (_parent, _args, ctx: Context) => {

        const result = await ctx.prisma.$queryRaw<NexusGenObjects['PipelineOptions'][]>`
        SELECT

        COALESCE(f.name, 'no facility') "facility",
        COALESCE(s.name, 'no satellite') "satellite",
		    pip.substance,
        pip.id,
        pip.license,
        pip.segment


        FROM "ppl_db"."Pipeline" pip
        LEFT OUTER JOIN "ppl_db"."Satellite" s ON s."id" = pip."satelliteId"
        LEFT OUTER JOIN "ppl_db"."Facility" f ON f."id" = s."facilityId"
		
		    ORDER BY f.name, s.name, pip.substance, pip.license, pip.segment
        `
        return result;
      }
    })
    t.list.field('sourceOptions', {
      type: 'SourceOptions',
      resolve: async (_parent, _args, ctx: Context) => {

        const result = await ctx.prisma.$queryRaw<NexusGenObjects['SourceOptions'][]>`
        SELECT

        COALESCE(f.name, 'no facility') "facility",
        COALESCE(s.name, 'no satellite') "satellite",
        ip.id,
        ip.source

        FROM "ppl_db"."InjectionPoint" ip
        LEFT OUTER JOIN "ppl_db"."Pipeline" pip ON pip."id" = ip."pipelineId"
        LEFT OUTER JOIN "ppl_db"."Satellite" s ON s."id" = pip."satelliteId"
        LEFT OUTER JOIN "ppl_db"."Facility" f ON f."id" = s."facilityId"

        ORDER BY f.name, s.name, ip.source
        `
        return result;
      }
    })
    t.list.field('sideBar', {
      type: 'SideBar',
      resolve: async (_parent, args, ctx: Context) => {
        const facility = await ctx.prisma.facility.findMany({
          select: {
            id: true,
            name: true,
            satellites: {
              select: {
                id: true,
                name: true,
              },
              orderBy: {
                name: 'asc'
              }
            }
          },
          orderBy: {
            name: 'asc'
          }
        });

        const satellites = await ctx.prisma.satellite.findMany({
          where: {
            facilityId: null,
          },
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc'
          }
        });

        facility.push({ id: 'no-facility', name: 'No Facility', satellites });
        return facility;
      }
    })
    t.list.field('pipelineFlow', {
      type: 'PipelineFlow',
      args: {
        idList: nonNull(list(stringArg())),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_parent, { idList, flowCalculationDirection }, ctx: Context) => {
        const result = await totalPipelineFlowRawQuery(idList, flowCalculationDirection, ctx);

        return result;
      }
    })
  },
});
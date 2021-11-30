import { objectType, extendType } from 'nexus';
import { Context } from '../context';
import { NexusGenObjects } from '../../node_modules/@types/nexus-typegen/index';

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

export const InjectionPointOptionsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pipelineOptions', {
      type: 'PipelineOptions',
      resolve: async (_parent, args, ctx: Context) => {

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
      resolve: async (_parent, args, ctx: Context) => {

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
  },
});
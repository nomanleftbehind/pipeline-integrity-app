import { objectType, extendType, nonNull, stringArg } from 'nexus';
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

export const PipelineFlow = objectType({
  name: 'PipelineFlow',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
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
    t.list.field('pipelineFlow', {
      type: 'PipelineFlow',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {

        const result = await ctx.prisma.$queryRaw<NexusGenObjects['PipelineFlow'][]>`
        WITH pipeline_volume as (
          SELECT
          
          pip.id,
          pip.license,
          pip.segment,
          SUM(ip.oil) as "oil",
          SUM(ip.water) as "water",
          SUM(ip.gas) as "gas",
          MIN(ip."firstProduction") as "firstProduction",
          MAX(ip."lastProduction") as "lastProduction",
          MIN(ip."firstInjection") as "firstInjection",
          MAX(ip."lastInjection") as "lastInjection"
          
          FROM "ppl_db"."Pipeline" pip
          LEFT OUTER JOIN "ppl_db"."InjectionPoint" ip ON ip."pipelineId" = pip.id
          
          GROUP BY
          pip.id,
          pip.license,
          pip.segment
          )
          
          SELECT
          
          pv.id,
          ROUND(COALESCE(pv.oil1,0) + COALESCE(pv.oil2,0) + COALESCE(pv.oil3,0) + COALESCE(pv.oil4,0) + COALESCE(pv.oil5,0) + COALESCE(pv.oil6,0) +
          COALESCE(pv.oil7,0) + COALESCE(pv.oil8,0) + COALESCE(pv.oil9,0) + COALESCE(pv.oil10,0) + COALESCE(pv.oil11,0), 2) as "oil",
          
          ROUND(COALESCE(pv.water1,0) + COALESCE(pv.water2,0) + COALESCE(pv.water3,0) + COALESCE(pv.water4,0) + COALESCE(pv.water5,0) + COALESCE(pv.water6,0) +
          COALESCE(pv.water7,0) + COALESCE(pv.water8,0) + COALESCE(pv.water9,0) + COALESCE(pv.water10,0) + COALESCE(pv.water11,0), 2) as "water",
          
          ROUND(COALESCE(pv.gas1,0) + COALESCE(pv.gas2,0) + COALESCE(pv.gas3,0) + COALESCE(pv.gas4,0) + COALESCE(pv.gas5,0) + COALESCE(pv.gas6,0) +
          COALESCE(pv.gas7,0) + COALESCE(pv.gas8,0) + COALESCE(pv.gas9,0) + COALESCE(pv.gas10,0) + COALESCE(pv.gas11,0), 2) as "gas",
          
          LEAST(pv."firstProduction1", pv."firstProduction2", pv."firstProduction3", pv."firstProduction4", pv."firstProduction5", pv."firstProduction6",
          pv."firstProduction7", pv."firstProduction8", pv."firstProduction9", pv."firstProduction10", pv."firstProduction11") as "firstProduction",
          
          GREATEST(pv."lastProduction1", pv."lastProduction2", pv."lastProduction3", pv."lastProduction4", pv."lastProduction5", pv."lastProduction6",
          pv."lastProduction7", pv."lastProduction8", pv."lastProduction9", pv."lastProduction10", pv."lastProduction11") as "lastProduction",
          
          LEAST(pv."firstInjection1", pv."firstInjection2", pv."firstInjection3", pv."firstInjection4", pv."firstInjection5", pv."firstInjection6",
          pv."firstInjection7", pv."firstInjection8", pv."firstInjection9", pv."firstInjection10", pv."firstInjection11") as "firstInjection",
          
          GREATEST(pv."lastInjection1", pv."lastInjection2", pv."lastInjection3", pv."lastInjection4", pv."lastInjection5", pv."lastInjection6",
          pv."lastInjection7", pv."lastInjection8", pv."lastInjection9", pv."lastInjection10", pv."lastInjection11") as "lastInjection"
          
          FROM (
          
          SELECT
          
          pv.id,
          SUM(CASE WHEN pv.sum_if_1 = 1 THEN pv.oil1 END) as "oil1",
          SUM(CASE WHEN pv.sum_if_1 = 1 THEN pv.water1 END) as "water1",
          SUM(CASE WHEN pv.sum_if_1 = 1 THEN pv.gas1 END) as "gas1",
          MIN(CASE WHEN pv.sum_if_1 = 1 THEN pv."firstProduction1" END) as "firstProduction1",
          MAX(CASE WHEN pv.sum_if_1 = 1 THEN pv."lastProduction1" END) as "lastProduction1",
          MIN(CASE WHEN pv.sum_if_1 = 1 THEN pv."firstInjection1" END) as "firstInjection1",
          MAX(CASE WHEN pv.sum_if_1 = 1 THEN pv."lastInjection1" END) as "lastInjection1",
          
          SUM(CASE WHEN pv.sum_if_2 = 1 THEN pv.oil2 END) as "oil2",
          SUM(CASE WHEN pv.sum_if_2 = 1 THEN pv.water2 END) as "water2",
          SUM(CASE WHEN pv.sum_if_2 = 1 THEN pv.gas2 END) as "gas2",
          MIN(CASE WHEN pv.sum_if_2 = 1 THEN pv."firstProduction2" END) as "firstProduction2",
          MAX(CASE WHEN pv.sum_if_2 = 1 THEN pv."lastProduction2" END) as "lastProduction2",
          MIN(CASE WHEN pv.sum_if_2 = 1 THEN pv."firstInjection2" END) as "firstInjection2",
          MAX(CASE WHEN pv.sum_if_2 = 1 THEN pv."lastInjection2" END) as "lastInjection2",
          
          SUM(CASE WHEN pv.sum_if_3 = 1 THEN pv.oil3 END) as "oil3",
          SUM(CASE WHEN pv.sum_if_3 = 1 THEN pv.water3 END) as "water3",
          SUM(CASE WHEN pv.sum_if_3 = 1 THEN pv.gas3 END) as "gas3",
          MIN(CASE WHEN pv.sum_if_3 = 1 THEN pv."firstProduction3" END) as "firstProduction3",
          MAX(CASE WHEN pv.sum_if_3 = 1 THEN pv."lastProduction3" END) as "lastProduction3",
          MIN(CASE WHEN pv.sum_if_3 = 1 THEN pv."firstInjection3" END) as "firstInjection3",
          MAX(CASE WHEN pv.sum_if_3 = 1 THEN pv."lastInjection3" END) as "lastInjection3",
          
          SUM(CASE WHEN pv.sum_if_4 = 1 THEN pv.oil4 END) as "oil4",
          SUM(CASE WHEN pv.sum_if_4 = 1 THEN pv.water4 END) as "water4",
          SUM(CASE WHEN pv.sum_if_4 = 1 THEN pv.gas4 END) as "gas4",
          MIN(CASE WHEN pv.sum_if_4 = 1 THEN pv."firstProduction4" END) as "firstProduction4",
          MAX(CASE WHEN pv.sum_if_4 = 1 THEN pv."lastProduction4" END) as "lastProduction4",
          MIN(CASE WHEN pv.sum_if_4 = 1 THEN pv."firstInjection4" END) as "firstInjection4",
          MAX(CASE WHEN pv.sum_if_4 = 1 THEN pv."lastInjection4" END) as "lastInjection4",
          
          SUM(CASE WHEN pv.sum_if_5 = 1 THEN pv.oil5 END) as "oil5",
          SUM(CASE WHEN pv.sum_if_5 = 1 THEN pv.water5 END) as "water5",
          SUM(CASE WHEN pv.sum_if_5 = 1 THEN pv.gas5 END) as "gas5",
          MIN(CASE WHEN pv.sum_if_5 = 1 THEN pv."firstProduction5" END) as "firstProduction5",
          MAX(CASE WHEN pv.sum_if_5 = 1 THEN pv."lastProduction5" END) as "lastProduction5",
          MIN(CASE WHEN pv.sum_if_5 = 1 THEN pv."firstInjection5" END) as "firstInjection5",
          MAX(CASE WHEN pv.sum_if_5 = 1 THEN pv."lastInjection5" END) as "lastInjection5",
          
          SUM(CASE WHEN pv.sum_if_6 = 1 THEN pv.oil6 END) as "oil6",
          SUM(CASE WHEN pv.sum_if_6 = 1 THEN pv.water6 END) as "water6",
          SUM(CASE WHEN pv.sum_if_6 = 1 THEN pv.gas6 END) as "gas6",
          MIN(CASE WHEN pv.sum_if_6 = 1 THEN pv."firstProduction6" END) as "firstProduction6",
          MAX(CASE WHEN pv.sum_if_6 = 1 THEN pv."lastProduction6" END) as "lastProduction6",
          MIN(CASE WHEN pv.sum_if_6 = 1 THEN pv."firstInjection6" END) as "firstInjection6",
          MAX(CASE WHEN pv.sum_if_6 = 1 THEN pv."lastInjection6" END) as "lastInjection6",
          
          SUM(CASE WHEN pv.sum_if_7 = 1 THEN pv.oil7 END) as "oil7",
          SUM(CASE WHEN pv.sum_if_7 = 1 THEN pv.water7 END) as "water7",
          SUM(CASE WHEN pv.sum_if_7 = 1 THEN pv.gas7 END) as "gas7",
          MIN(CASE WHEN pv.sum_if_7 = 1 THEN pv."firstProduction7" END) as "firstProduction7",
          MAX(CASE WHEN pv.sum_if_7 = 1 THEN pv."lastProduction7" END) as "lastProduction7",
          MIN(CASE WHEN pv.sum_if_7 = 1 THEN pv."firstInjection7" END) as "firstInjection7",
          MAX(CASE WHEN pv.sum_if_7 = 1 THEN pv."lastInjection7" END) as "lastInjection7",
          
          SUM(CASE WHEN pv.sum_if_8 = 1 THEN pv.oil8 END) as "oil8",
          SUM(CASE WHEN pv.sum_if_8 = 1 THEN pv.water8 END) as "water8",
          SUM(CASE WHEN pv.sum_if_8 = 1 THEN pv.gas8 END) as "gas8",
          MIN(CASE WHEN pv.sum_if_8 = 1 THEN pv."firstProduction8" END) as "firstProduction8",
          MAX(CASE WHEN pv.sum_if_8 = 1 THEN pv."lastProduction8" END) as "lastProduction8",
          MIN(CASE WHEN pv.sum_if_8 = 1 THEN pv."firstInjection8" END) as "firstInjection8",
          MAX(CASE WHEN pv.sum_if_8 = 1 THEN pv."lastInjection8" END) as "lastInjection8",
          
          SUM(CASE WHEN pv.sum_if_9 = 1 THEN pv.oil9 END) as "oil9",
          SUM(CASE WHEN pv.sum_if_9 = 1 THEN pv.water9 END) as "water9",
          SUM(CASE WHEN pv.sum_if_9 = 1 THEN pv.gas9 END) as "gas9",
          MIN(CASE WHEN pv.sum_if_9 = 1 THEN pv."firstProduction9" END) as "firstProduction9",
          MAX(CASE WHEN pv.sum_if_9 = 1 THEN pv."lastProduction9" END) as "lastProduction9",
          MIN(CASE WHEN pv.sum_if_9 = 1 THEN pv."firstInjection9" END) as "firstInjection9",
          MAX(CASE WHEN pv.sum_if_9 = 1 THEN pv."lastInjection9" END) as "lastInjection9",
          
          SUM(CASE WHEN pv.sum_if_10 = 1 THEN pv.oil10 END) as "oil10",
          SUM(CASE WHEN pv.sum_if_10 = 1 THEN pv.water10 END) as "water10",
          SUM(CASE WHEN pv.sum_if_10 = 1 THEN pv.gas10 END) as "gas10",
          MIN(CASE WHEN pv.sum_if_10 = 1 THEN pv."firstProduction10" END) as "firstProduction10",
          MAX(CASE WHEN pv.sum_if_10 = 1 THEN pv."lastProduction10" END) as "lastProduction10",
          MIN(CASE WHEN pv.sum_if_10 = 1 THEN pv."firstInjection10" END) as "firstInjection10",
          MAX(CASE WHEN pv.sum_if_10 = 1 THEN pv."lastInjection10" END) as "lastInjection10",
          
          SUM(CASE WHEN pv.sum_if_11 = 1 THEN pv.oil11 END) as "oil11",
          SUM(CASE WHEN pv.sum_if_11 = 1 THEN pv.water11 END) as "water11",
          SUM(CASE WHEN pv.sum_if_11 = 1 THEN pv.gas11 END) as "gas11",
          MIN(CASE WHEN pv.sum_if_11 = 1 THEN pv."firstProduction11" END) as "firstProduction11",
          MAX(CASE WHEN pv.sum_if_11 = 1 THEN pv."lastProduction11" END) as "lastProduction11",
          MIN(CASE WHEN pv.sum_if_11 = 1 THEN pv."firstInjection11" END) as "firstInjection11",
          MAX(CASE WHEN pv.sum_if_11 = 1 THEN pv."lastInjection11" END) as "lastInjection11"
          
          FROM (
          
          SELECT
          
          pv1.id,
          pv1.license,
          pv1.segment,
          ROW_NUMBER () OVER (PARTITION BY pv1.id ORDER BY pv1.id) sum_if_1,
          pv1.oil as "oil1",
          pv1.water as "water1",
          pv1.gas as "gas1",
          pv1."firstProduction" as "firstProduction1",
          pv1."lastProduction" as "lastProduction1",
          pv1."firstInjection" as "firstInjection1",
          pv1."lastInjection" as "lastInjection1",
          ROW_NUMBER () OVER (PARTITION BY pv2.id ORDER BY pv2.id) sum_if_2,
          pv2.oil as "oil2",
          pv2.gas as "gas2",
          pv2.water as "water2",
          pv2."firstProduction" as "firstProduction2",
          pv2."lastProduction" as "lastProduction2",
          pv2."firstInjection" as "firstInjection2",
          pv2."lastInjection" as "lastInjection2",
          ROW_NUMBER () OVER (PARTITION BY pv3.id ORDER BY pv3.id) sum_if_3,
          pv3.oil as "oil3",
          pv3.gas as "gas3",
          pv3.water as "water3",
          pv3."firstProduction" as "firstProduction3",
          pv3."lastProduction" as "lastProduction3",
          pv3."firstInjection" as "firstInjection3",
          pv3."lastInjection" as "lastInjection3",
          ROW_NUMBER () OVER (PARTITION BY pv4.id ORDER BY pv4.id) sum_if_4,
          pv4.oil as "oil4",
          pv4.gas as "gas4",
          pv4.water as "water4",
          pv4."firstProduction" as "firstProduction4",
          pv4."lastProduction" as "lastProduction4",
          pv4."firstInjection" as "firstInjection4",
          pv4."lastInjection" as "lastInjection4",
          ROW_NUMBER () OVER (PARTITION BY pv5.id ORDER BY pv5.id) sum_if_5,
          pv5.oil as "oil5",
          pv5.gas as "gas5",
          pv5.water as "water5",
          pv5."firstProduction" as "firstProduction5",
          pv5."lastProduction" as "lastProduction5",
          pv5."firstInjection" as "firstInjection5",
          pv5."lastInjection" as "lastInjection5",
          ROW_NUMBER () OVER (PARTITION BY pv6.id ORDER BY pv6.id) sum_if_6,
          pv6.oil as "oil6",
          pv6.gas as "gas6",
          pv6.water as "water6",
          pv6."firstProduction" as "firstProduction6",
          pv6."lastProduction" as "lastProduction6",
          pv6."firstInjection" as "firstInjection6",
          pv6."lastInjection" as "lastInjection6",
          ROW_NUMBER () OVER (PARTITION BY pv7.id ORDER BY pv7.id) sum_if_7,
          pv7.oil as "oil7",
          pv7.gas as "gas7",
          pv7.water as "water7",
          pv7."firstProduction" as "firstProduction7",
          pv7."lastProduction" as "lastProduction7",
          pv7."firstInjection" as "firstInjection7",
          pv7."lastInjection" as "lastInjection7",
          ROW_NUMBER () OVER (PARTITION BY pv8.id ORDER BY pv8.id) sum_if_8,
          pv8.oil as "oil8",
          pv8.gas as "gas8",
          pv8.water as "water8",
          pv8."firstProduction" as "firstProduction8",
          pv8."lastProduction" as "lastProduction8",
          pv8."firstInjection" as "firstInjection8",
          pv8."lastInjection" as "lastInjection8",
          ROW_NUMBER () OVER (PARTITION BY pv9.id ORDER BY pv9.id) sum_if_9,
          pv9.oil as "oil9",
          pv9.gas as "gas9",
          pv9.water as "water9",
          pv9."firstProduction" as "firstProduction9",
          pv9."lastProduction" as "lastProduction9",
          pv9."firstInjection" as "firstInjection9",
          pv9."lastInjection" as "lastInjection9",
          ROW_NUMBER () OVER (PARTITION BY pv10.id ORDER BY pv10.id) sum_if_10,
          pv10.oil as "oil10",
          pv10.gas as "gas10",
          pv10.water as "water10",
          pv10."firstProduction" as "firstProduction10",
          pv10."lastProduction" as "lastProduction10",
          pv10."firstInjection" as "firstInjection10",
          pv10."lastInjection" as "lastInjection10",
          ROW_NUMBER () OVER (PARTITION BY pv11.id ORDER BY pv11.id) sum_if_11,
          pv11.oil as "oil11",
          pv11.gas as "gas11",
          pv11.water as "water11",
          pv11."firstProduction" as "firstProduction11",
          pv11."lastProduction" as "lastProduction11",
          pv11."firstInjection" as "firstInjection11",
          pv11."lastInjection" as "lastInjection11"
          
          FROM pipeline_volume pv1
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl1 ON fl1."B" = pv1.id
          LEFT OUTER JOIN pipeline_volume pv2 ON pv2.id = fl1."A" AND pv2.id NOT IN (pv1.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl2 ON fl2."B" = pv2.id
          LEFT OUTER JOIN pipeline_volume pv3 ON pv3.id = fl2."A" AND pv3.id NOT IN (pv1.id, pv2.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl3 ON fl3."B" = pv3.id
          LEFT OUTER JOIN pipeline_volume pv4 ON pv4.id = fl3."A" AND pv4.id NOT IN (pv1.id, pv2.id, pv3.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl4 ON fl4."B" = pv4.id
          LEFT OUTER JOIN pipeline_volume pv5 ON pv5.id = fl4."A" AND pv5.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl5 ON fl5."B" = pv5.id
          LEFT OUTER JOIN pipeline_volume pv6 ON pv6.id = fl5."A" AND pv6.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id, pv5.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl6 ON fl6."B" = pv6.id
          LEFT OUTER JOIN pipeline_volume pv7 ON pv7.id = fl6."A" AND pv7.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id, pv5.id, pv6.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl7 ON fl7."B" = pv7.id
          LEFT OUTER JOIN pipeline_volume pv8 ON pv8.id = fl7."A" AND pv8.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id, pv5.id, pv6.id, pv7.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl8 ON fl8."B" = pv8.id
          LEFT OUTER JOIN pipeline_volume pv9 ON pv9.id = fl8."A" AND pv9.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id, pv5.id, pv6.id, pv7.id, pv8.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl9 ON fl9."B" = pv9.id
          LEFT OUTER JOIN pipeline_volume pv10 ON pv10.id = fl9."A" AND pv10.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id, pv5.id, pv6.id, pv7.id, pv8.id, pv9.id)
          LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl10 ON fl10."B" = pv10.id
          LEFT OUTER JOIN pipeline_volume pv11 ON pv11.id = fl10."A" AND pv11.id NOT IN (pv1.id, pv2.id, pv3.id, pv4.id, pv5.id, pv6.id, pv7.id, pv8.id, pv9.id, pv10.id)

          WHERE pv1.id = ${id}
          ) pv
          
          GROUP BY 
          pv.id
          
          ) pv
          ORDER BY
          pv.id
        `
        return result;
      }
    })
  },
});
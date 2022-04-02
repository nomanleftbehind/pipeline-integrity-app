import { objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { NexusGenObjects } from '../../node_modules/@types/nexus-typegen/index';


export const gasAssociatedLiquidsCalc = (gas: number) => {
  return gas * 35.49 * 0.00355238191999475 / 6.3;
}

interface ItotalFluidsCalcArgs {
  oil: number;
  water: number;
  gas: number;
}

export const totalFluidsCalc = ({ oil, water, gas }: ItotalFluidsCalcArgs) => {
  return oil + water + gasAssociatedLiquidsCalc(gas);
}

export const Well = objectType({
  name: 'Well',
  sourceType: {
    module: '@prisma/client',
    export: 'Well',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('uwi')
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
    t.string('fdcRecId')
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
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
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

const resolveWellAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}

export const WellOptions = objectType({
  name: 'WellOptions',
  definition(t) {
    t.nonNull.string('facility')
    t.nonNull.string('satellite')
    t.nonNull.string('id')
    t.nonNull.string('source')
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
          orderBy: { uwi: 'asc' },
        });
        return result;
      },
    })
    t.list.field('wellOptions', {
      type: 'WellOptions',
      resolve: async (_parent, _args, ctx: Context) => {

        const result = await ctx.prisma.$queryRaw<NexusGenObjects['WellOptions'][]>`
        SELECT

        COALESCE(f.name, 'no facility') "facility",
        COALESCE(s.name, 'no satellite') "satellite",
        w.id,
        w.uwi "source"

        FROM "ppl_db"."Well" w
        LEFT OUTER JOIN "ppl_db"."Pipeline" pip ON pip."id" = w."pipelineId"
        LEFT OUTER JOIN "ppl_db"."Satellite" s ON s."id" = pip."satelliteId"
        LEFT OUTER JOIN "ppl_db"."Facility" f ON f."id" = s."facilityId"

        ORDER BY f.name, s.name, w.uwi
        `
        return result;
      }
    })
  }
})


export const WellCreateInput = inputObjectType({
  name: 'WellCreateInput',
  definition(t) {
    t.nonNull.string('uwi')
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


export const WellMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editWell', {
      type: 'WellPayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: stringArg(),
        uwi: stringArg(),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
        firstProduction: arg({ type: 'DateTime' }),
        lastProduction: arg({ type: 'DateTime' }),
        firstInjection: arg({ type: 'DateTime' }),
        lastInjection: arg({ type: 'DateTime' }),
        fdcRecId: stringArg(),
      },
      resolve: async (_, args, ctx: Context) => {
        const user = ctx.user;
        const authorized = !!user && resolveWellAuthorized(user);
        if (authorized) {
          const well = await ctx.prisma.well.update({
            where: { id: args.id },
            data: {
              pipelineId: args.pipelineId || undefined,
              uwi: args.uwi || undefined,
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
          return { well }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      },
    })
  }
});
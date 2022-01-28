import { objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { InjectionPoint as IInjectionPoint } from '@prisma/client';
import { Context } from '../context';
import { getUserId } from '../utils';


export const gasAssociatedLiquidsCalc = (gas: IInjectionPoint['gas'] | number) => {
  return (typeof gas === 'number' ? gas : gas.toNumber()) * 35.49 * 0.00355238191999475 / 6.3;
}

export const totalFluidsCalc = (oil: IInjectionPoint['oil'] | number, water: IInjectionPoint['water'] | number, gas: IInjectionPoint['gas'] | number) => {
  oil = typeof oil === 'number' ? oil : oil.toNumber();
  water = typeof water === 'number' ? water : water.toNumber();
  return oil + water + gasAssociatedLiquidsCalc(gas);
}

export const InjectionPoint = objectType({
  name: 'InjectionPoint',
  sourceType: {
    module: '@prisma/client',
    export: 'InjectionPoint',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('source')
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
    t.string('pvNodeId')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.injectionPoint.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.injectionPoint.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('pipeline', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.injectionPoint.findUnique({
          where: { id },
        }).pipeline();
      },
    })
  },
})


export const InjectionPointQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allInjectionPoints', {
      type: InjectionPoint,
      resolve: async (_parent, _args, ctx: Context) => {
        const result = await ctx.prisma.injectionPoint.findMany({
          orderBy: [
            { pipeline: { satellite: { facility: { name: 'asc' } } } },
            { pipeline: { satellite: { name: 'asc' } } },
            { source: 'asc' }
          ]
        })
        return result;
      },
    })
  }
})


export const InjectionPointCreateInput = inputObjectType({
  name: 'InjectionPointCreateInput',
  definition(t) {
    t.nonNull.string('source')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('pvNodeId')
  },
})


export const InjectionPointMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editInjectionPoint', {
      type: 'InjectionPoint',
      args: {
        id: nonNull(stringArg()),
        pipelineId: stringArg(),
        source: stringArg(),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
        firstProduction: arg({ type: 'DateTime' }),
        lastProduction: arg({ type: 'DateTime' }),
        firstInjection: arg({ type: 'DateTime' }),
        lastInjection: arg({ type: 'DateTime' }),
        pvNodeId: stringArg()
      },
      resolve: async (_, args, ctx: Context) => {
        const userId = getUserId(ctx);
        try {
          return ctx.prisma.injectionPoint.update({
            where: { id: args.id },
            data: {
              pipelineId: args.pipelineId || undefined,
              source: args.source || undefined,
              oil: args.oil || undefined,
              water: args.water || undefined,
              gas: args.gas || undefined,
              firstProduction: args.firstProduction || undefined,
              lastProduction: args.lastProduction || undefined,
              firstInjection: args.firstInjection || undefined,
              lastInjection: args.lastInjection || undefined,
              pvNodeId: args.pvNodeId || undefined,
              updatedById: String(userId),
            },
          })
        } catch (e) {
          throw new Error(
            `Injection point with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })
  }
})
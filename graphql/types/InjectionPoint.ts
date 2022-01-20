import { enumType, intArg, objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { InjectionPoint as IInjectionPoint } from '@prisma/client';
import { User } from './User';
import { Satellite, SatelliteUniqueInput } from './Satellite';
import { Pipeline } from './Pipeline';
import { Context } from '../context';


export const gasAssociatedLiquids = (gas: IInjectionPoint['gas'] | number) => {
  return (typeof gas === 'number' ? gas : gas.toNumber()) * 35.49 * 0.00355238191999475 / 6.3;
}

export const totalFluids = (oil: IInjectionPoint['oil'] | number, water: IInjectionPoint['water'] | number, gas: IInjectionPoint['gas'] | number) => {
  oil = typeof oil === 'number' ? oil : oil.toNumber();
  water = typeof water === 'number' ? water : water.toNumber();
  return oil + water + gasAssociatedLiquids(gas);
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
      resolve: async ({ gas }) => gasAssociatedLiquids(gas)
    })
    t.nonNull.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => totalFluids(oil, water, gas)
    })
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('pvUnitId')
    t.string('pvNodeId')
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.injectionPoint
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('pipeline', {
      type: Pipeline,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.injectionPoint
          .findUnique({
            where: { id: parent.id },
          })
          .pipeline()
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
    t.string('pvUnitId')
    t.string('pvNodeId')
  },
})


export const InjectionPointMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editInjectionPoint', {
      type: InjectionPoint,
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
        pvUnitId: stringArg(),
        pvNodeId: stringArg()
      },
      resolve: async (_, args, ctx: Context) => {
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
              pvUnitId: args.pvUnitId || undefined,
              pvNodeId: args.pvNodeId || undefined,
            },
          })
        } catch (e) {
          throw new Error(
            `Injection point with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })
    // t.field('connectSource', {
    //   type: 'InjectionPoint',
    //   args: {
    //     id: nonNull(stringArg()),
    //     pipelineId: nonNull(stringArg()),
    //   },
    //   resolve: (_parent, { id, pipelineId }, ctx: Context) => {
    //     return ctx.prisma.injectionPoint.update({
    //       where: { id },
    //       data: {
    //         pipeline: {
    //           connect: {
    //             id: pipelineId
    //           }
    //         }
    //       }
    //     })
    //   }
    // })
    // t.field('disconnectSource', {
    //   type: 'InjectionPoint',
    //   args: {
    //     id: nonNull(stringArg())
    //   },
    //   resolve: (_parent, { id }, ctx: Context) => {
    //     return ctx.prisma.injectionPoint.update({
    //       where: { id },
    //       data: {
    //         pipeline: {
    //           disconnect: true
    //         }
    //       }
    //     })
    //   }
    // })
  }
})
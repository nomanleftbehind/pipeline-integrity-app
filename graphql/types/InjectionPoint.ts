import { enumType, intArg, objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { User } from './User';
import { Satellite, SatelliteUniqueInput } from './Satellite';
import { Pipeline, PipelineUniqueInput } from './Pipeline';
import { Context } from '../context';


export const InjectionPoint = objectType({
  name: 'InjectionPoint',
  sourceType: {
    module: '@prisma/client',
    export: 'InjectionPoint',
  },
  definition(t) {
    t.nonNull.string('id')
    t.field('satellite', {
      type: Satellite,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.injectionPoint
          .findUnique({
            where: { id: parent.id },
          })
          .satellite()
        return result
      },
    })
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
      resolve: async (_parent, _args, context: Context) => {
        const result = await context.prisma.injectionPoint.findMany()
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
        satelliteId: stringArg(),
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
      resolve: async (_, args, context: Context) => {
        try {
          return context.prisma.injectionPoint.update({
            where: { id: args.id },
            data: {
              satelliteId: args.satelliteId || undefined,
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
    t.field('deleteInjectionPointFromPipeline', {
      type: 'InjectionPoint',
      args: {
        id: nonNull(stringArg())
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.injectionPoint.update({
          where: { id: args.id },
          data: { pipelineId: null }
        })
      }
    })
  }
})
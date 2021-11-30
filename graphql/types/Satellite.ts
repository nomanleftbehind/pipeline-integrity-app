import { extendType, objectType, inputObjectType, stringArg, nonNull, arg } from 'nexus';
import { User } from './User';
import { Facility, FacilityUniqueInput } from './Facility';
import { Pipeline, PipelineCreateInput } from './Pipeline';
import { InjectionPoint, InjectionPointCreateInput } from './InjectionPoint';
import { Context } from '../context';


export const Satellite = objectType({
  name: 'Satellite',
  sourceType: {
    module: '@prisma/client',
    export: 'Satellite',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.field('facility', {
      type: Facility,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.satellite
          .findUnique({
            where: { id: parent.id },
          })
          .facility()
        return result
      },
    })
    t.list.field('pipelines', {
      type: Pipeline,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.satellite
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .pipelines()
      },
    })
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.satellite
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})



export const SatelliteUniqueInput = inputObjectType({
  name: 'SatelliteUniqueInput',
  definition(t) {
    t.string('id')
    t.string('name')
  },
})

export const SatelliteCreateInput = inputObjectType({
  name: 'SatelliteCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.list.field('pipelines', { type: PipelineCreateInput })
    t.list.field('injectionPoints', { type: InjectionPointCreateInput })
  },
})


export const SatelliteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allSatellites', {
      type: Satellite,
      resolve: async (_parent, _args, context: Context) => {
        const result = await context.prisma.satellite.findMany()
        return result;
      },
    })
  }
})


export const SatelliteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editSatellite', {
      type: Satellite,
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        facilityUniqueInput: arg({ type: FacilityUniqueInput }),
      },
      resolve: async (_, args, context: Context) => {
        try {
          return context.prisma.satellite.update({
            where: { id: args.id },
            data: {
              name: args.name || undefined,
              facility: args.facilityUniqueInput ? {
                connect: {
                  id: args.facilityUniqueInput.id || undefined,
                  name: args.facilityUniqueInput.name || undefined,
                }
              } : undefined
            },
          })
        } catch (e) {
          throw new Error(
            `Satellite with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })
    t.field('deleteSatellite', {
      type: 'Satellite',
      args: {
        id: nonNull(stringArg())
      },
      resolve: async (_parent, args, ctx: Context) => {
        return ctx.prisma.satellite.delete({
          where: { id: args.id }
        })
      }
    })
  }
})
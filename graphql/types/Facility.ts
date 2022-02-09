import { nonNull, objectType, inputObjectType, stringArg, extendType, arg } from 'nexus';
import { SatelliteCreateInput } from './Satellite';
import { Context } from '../context';

export const Facility = objectType({
  name: 'Facility',
  sourceType: {
    module: '@prisma/client',
    export: 'Facility',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.list.field('satellites', {
      type: 'Satellite',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.facility.findUnique({
          where: { id },
        }).satellites();
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.facility.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.facility.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})

export const FacilityQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allFacilities', {
      type: 'Facility',
      resolve: async (_parent, _args, ctx: Context) => {
        const result = await ctx.prisma.facility.findMany({
          orderBy:
          {
            name: 'asc'
          },
          include: {
            satellites: {
              orderBy: {
                name: 'asc'
              },
              include: {
                pipelines: {
                  orderBy: [
                    {
                      license: 'asc'
                    },
                    {
                      segment: 'asc'
                    }
                  ]
                }
              }
            }
          }
        })
        return result;
      },
    })
  }
})



export const FacilityCreateInput = inputObjectType({
  name: 'FacilityCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.list.field('satellites', { type: SatelliteCreateInput })
  },
})

export const FacilityUniqueInput = inputObjectType({
  name: 'FacilityUniqueInput',
  definition(t) {
    t.string('id')
    t.string('name')
  },
})

export const FacilityMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createFacility', {
      type: 'Facility',
      args: {
        data: nonNull(
          arg({
            type: FacilityCreateInput,
          }),
        ),
      },
      resolve: (_, args, ctx: Context) => {
        const userId = ctx.user?.id
        return ctx.prisma.facility.create({
          data: {
            name: args.data.name,
            createdById: String(userId),
            updatedById: String(userId),
          },
        })
      },
    })

    t.field('editFacility', {
      type: 'Facility',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
      },
      resolve: async (_, { id, name }, ctx: Context) => {
        try {
          return ctx.prisma.facility.update({
            where: { id },
            data: {
              name: name || undefined,
              updatedById: String(ctx.user?.id),
            },
          })
        } catch (e) {
          throw new Error(
            `Facility with ID ${id} does not exist in the database.`,
          )
        }
      },
    })
  }
})
import { nonNull, objectType, inputObjectType, stringArg, extendType, arg } from 'nexus';
import { User } from './User';
import { Satellite, SatelliteCreateInput } from './Satellite';
import { Context } from '../context';
import { getUserId } from '../utils';

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
      type: Satellite,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.facility
          .findUnique({
            where: { id: parent.id },
          })
          .satellites();
      },
    })
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.facility
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

export const FacilityQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allFacilities', {
      type: Facility,
      resolve: async (_parent, _args, context: Context) => {
        const result = await context.prisma.facility.findMany()
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
      type: Facility,
      args: {
        data: nonNull(
          arg({
            type: FacilityCreateInput,
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.facility.create({
          data: {
            name: args.data.name,
            createdById: String(userId),
          },
        })
      },
    })

    t.field('editFacility', {
      type: Facility,
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
      },
      resolve: async (_, args, context: Context) => {
        try {
          return context.prisma.facility.update({
            where: { id: args.id },
            data: {
              name: args.name || undefined
            },
          })
        } catch (e) {
          throw new Error(
            `Facility with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })
  }
})
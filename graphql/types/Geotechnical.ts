import { enumType, objectType, stringArg, extendType, nonNull, arg, inputObjectType } from 'nexus';
import { NexusGenObjects } from 'nexus-typegen';
import { databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';



export const GeotechnicalFacingEnumMembers = {
  N: 'N',
  NE: 'NE',
  E: 'E',
  SE: 'SE',
  S: 'S',
  SW: 'SW',
  W: 'W',
  NW: 'NW',
}

export const GeotechnicalFacingEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'GeotechnicalFacingEnum',
  },
  name: 'GeotechnicalFacingEnum',
  members: GeotechnicalFacingEnumMembers
});

export const GeotechnicalFacingEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(GeotechnicalFacingEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});


export const GeotechnicalObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'slopeAngleS1', nullable: true, type: 'Int' },
  { field: 'facingS1', nullable: true, type: 'GeotechnicalFacingEnum', enumObjectArray: GeotechnicalFacingEnumArray },
  { field: 'heightS1', nullable: true, type: 'Int' },
  { field: 'slopeAngleS2', nullable: true, type: 'Int' },
  { field: 'facingS2', nullable: true, type: 'GeotechnicalFacingEnum', enumObjectArray: GeotechnicalFacingEnumArray },
  { field: 'heightS2', nullable: true, type: 'Int' },
  { field: 'dateSlopeChecked', nullable: true, type: 'DateTime' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

export const Geotechnical = objectType({
  name: 'Geotechnical',
  sourceType: {
    module: '@prisma/client',
    export: 'Geotechnical',
  },
  definition: t => {
    for (const { field, nullable, type } of GeotechnicalObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
})

export const GeotechnicalExtendObject = extendType({
  type: 'Geotechnical',
  definition(t) {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.geotechnical.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.geotechnical.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.geotechnical.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveGeotechnicalAuthorized(user);
      }
    })
  },
});


const resolveGeotechnicalAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}




export const GeotechnicalQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('geotechnicalsByPipelineId', {
      type: 'Geotechnical',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.geotechnical.findMany({
          where: { pipelineId },
          orderBy: { dateSlopeChecked: 'desc' },
        })
        return result;
      }
    })
  }
});


export const GeotechnicalPayload = objectType({
  name: 'GeotechnicalPayload',
  definition(t) {
    t.field('geotechnical', { type: 'Geotechnical' })
    t.field('error', { type: 'FieldError' })
  },
});


export const EditGeotechnicalInput = inputObjectType({
  name: 'EditGeotechnicalInput',
  definition(t) {
    t.nonNull.string('id')
    t.int('slopeAngleS1')
    t.field('facingS1', { type: 'GeotechnicalFacingEnum' })
    t.int('heightS1')
    t.int('slopeAngleS2')
    t.field('facingS2', { type: 'GeotechnicalFacingEnum' })
    t.int('heightS2')
    t.field('dateSlopeChecked', { type: 'DateTime' })
    t.string('comment')
  },
});


export const GeotechnicalMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editGeotechnical', {
      type: 'GeotechnicalPayload',
      args: { data: nonNull(arg({ type: 'EditGeotechnicalInput' })) },
      resolve: async (_parent, { data: { id, slopeAngleS1, facingS1, heightS1, slopeAngleS2, facingS2, heightS2, dateSlopeChecked, comment } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveGeotechnicalAuthorized(user);
          if (authorized) {
            const geotechnical = await ctx.prisma.geotechnical.update({
              where: { id },
              data: {
                slopeAngleS1,
                facingS1: databaseEnumToServerEnum(GeotechnicalFacingEnumMembers, facingS1),
                heightS1,
                slopeAngleS2,
                facingS2: databaseEnumToServerEnum(GeotechnicalFacingEnumMembers, facingS2),
                heightS2,
                dateSlopeChecked,
                comment,
                updatedById: userId,
              },
            });
            return { geotechnical }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to geotechnicals.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      },
    })
    t.field('addGeotechnical', {
      type: 'GeotechnicalPayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveGeotechnicalAuthorized(user);
          if (authorized) {

            const geotechnical = await ctx.prisma.geotechnical.create({
              data: {
                pipelineId,
                createdById: userId,
                updatedById: userId,
              }
            });
            return { geotechnical };
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add new geotechnicals.`,
            }
          }
        }

        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
    t.field('deleteGeotechnical', {
      type: 'GeotechnicalPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { firstName } = user;
          const authorized = resolveGeotechnicalAuthorized(user);
          if (authorized) {

            const geotechnical = await ctx.prisma.geotechnical.delete({
              where: { id }
            });
            return { geotechnical }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete geotechnicals.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
  }
});
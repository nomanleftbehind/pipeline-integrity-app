import { enumType, objectType, stringArg, extendType, nonNull, arg } from 'nexus';
import { NexusGenObjects } from 'nexus-typegen';
import { Context } from '../context';
import { Prisma, User as IUser, PigRun as IPigRun } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';




export const PigInspectionEnumMembers = {
  Good: 'Good',
  Failed: 'Failed',
}

export const PigInspectionEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'PigInspectionEnum',
  },
  name: 'PigInspectionEnum',
  members: PigInspectionEnumMembers
});

export const PigInspectionEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(PigInspectionEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});


export const PigRunObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'pigTypeId', nullable: true, type: 'String' },
  { field: 'dateIn', nullable: false, type: 'DateTime' },
  { field: 'dateOut', nullable: true, type: 'DateTime' },
  { field: 'isolationValveFunctionTest', nullable: true, type: 'PigInspectionEnum', enumObjectArray: PigInspectionEnumArray },
  { field: 'pigSenderReceiverInspection', nullable: true, type: 'PigInspectionEnum', enumObjectArray: PigInspectionEnumArray },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'operatorId', nullable: true, type: 'String' },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];



export const PigRun = objectType({
  name: 'PigRun',
  sourceType: {
    module: '@prisma/client',
    export: 'PigRun',
  },
  definition: t => {
    for (const { field, nullable, type } of PigRunObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const PigRunExtendObject = extendType({
  type: 'PigRun',
  definition: t => {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pigRun.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.field('operator', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pigRun.findUnique({
          where: { id },
        }).operator();
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pigRun.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pigRun.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })

    t.nonNull.boolean('authorized', {
      resolve: async ({ createdById }, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolvePigRunAuthorized({ user, createdById });
      }
    })
  },
});

interface IresolvePigRunAuthorizedArgs {
  user: IUser;
  createdById: IPigRun['createdById'];
}

const resolvePigRunAuthorized = ({ user, createdById }: IresolvePigRunAuthorizedArgs) => {
  const { role, id } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdById === id);
}


export const PigRunQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pigRunsByPipelineId', {
      type: 'PigRun',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.pigRun.findMany({
          where: { pipelineId },
          orderBy: { dateIn: 'desc' },
        })
        return result;
      },
    })
  }
});


export const PigRunPayload = objectType({
  name: 'PigRunPayload',
  definition(t) {
    t.field('pigRun', { type: 'PigRun' })
    t.field('error', { type: 'FieldError' })
  },
});


export const PigRunMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPigRun', {
      type: 'PigRunPayload',
      args: {
        id: nonNull(stringArg()),
        pigTypeId: stringArg(),
        dateIn: arg({ type: 'DateTime' }),
        dateOut: arg({ type: 'DateTime' }),
        isolationValveFunctionTest: arg({ type: 'PigInspectionEnum' }),
        pigSenderReceiverInspection: arg({ type: 'PigInspectionEnum' }),
        comment: stringArg(),
        operatorId: stringArg(),
      },
      resolve: async (_parent, args, ctx: Context) => {

        const user = ctx.user;
        
        if (user) {
          const { id: userId, role, firstName } = user;

          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {

            const currentPigRun = await ctx.prisma.pigRun.findUnique({
              where: { id: args.id },
              select: {
                createdById: true,
                dateIn: true,
                dateOut: true,
              }
            });

            if (currentPigRun) {

              const { createdById, dateIn, dateOut } = currentPigRun;

              if (role === 'OPERATOR' && createdById !== userId) {
                return {
                  error: {
                    field: 'Pig run Created By',
                    message: `Hi ${firstName}. Your user privilages do not allow you to edit pig run entries not authored by you.`,
                  }
                }
              }

              if (args.dateOut && args.dateOut.getTime() < dateIn.getTime()) {
                return {
                  error: {
                    field: 'Pig run date out',
                    message: `Pig out date ${args.dateOut.toISOString().split('T')[0]} you are trying to enter is before pig in date ${dateIn.toISOString().split('T')[0]} which is impossible. Change pig in date first before entering pig out date.`,
                  }
                }
              }

              if (args.dateIn && dateOut && args.dateIn.getTime() > dateOut.getTime()) {
                return {
                  error: {
                    field: 'Pig run date in',
                    message: `Pig in date ${args.dateIn.toISOString().split('T')[0]} you are trying to enter is after pig out date ${dateOut.toISOString().split('T')[0]} which is impossible. Change or delete pig out date first before entering pig in date.`,
                  }
                }
              }
            }
            try {
              const pigRun = await ctx.prisma.pigRun.update({
                where: { id: args.id },
                data: {
                  pigTypeId: args.pigTypeId,
                  dateIn: args.dateIn || undefined,
                  dateOut: args.dateOut,
                  isolationValveFunctionTest: args.isolationValveFunctionTest,
                  pigSenderReceiverInspection: args.pigSenderReceiverInspection,
                  comment: args.comment,
                  operatorId: args.operatorId,
                  updatedById: userId,
                },
              });
              return { pigRun }
            } catch (e) {
              if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2003') {
                  return {
                    error: {
                      field: Object.keys(args)[1],
                      message: "Foreign table field doesn't contain specified ID.",
                    }
                  }
                }
              }
              throw e;
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to pig runs.`,
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
    t.field('addPigRun', {
      type: 'PigRunPayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            const pigRun = await ctx.prisma.pigRun.create({
              data: {
                pipelineId: pipelineId,
                dateIn: today,
                createdById: userId,
                updatedById: userId,
              }
            });
            return { pigRun };
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add pig runs.`,
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
    t.field('deletePigRun', {
      type: 'PigRunPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, firstName, role } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
            if (role === 'OPERATOR') {
              const currentPigRun = await ctx.prisma.pigRun.findUnique({
                where: { id },
                select: {
                  createdById: true,
                }
              });
              if (currentPigRun && currentPigRun.createdById !== userId) {
                return {
                  error: {
                    field: 'Pig run created by',
                    message: `Hi ${firstName}. Your user privilages do not allow you to delete pig runs not authored by you.`,
                  }
                }
              }
            }
            const pigRun = await ctx.prisma.pigRun.delete({
              where: { id }
            });
            return { pigRun }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete pig runs.`,
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


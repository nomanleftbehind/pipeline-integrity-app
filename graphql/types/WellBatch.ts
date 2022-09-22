import { objectType, stringArg, extendType, nonNull, arg, floatArg, inputObjectType } from 'nexus';
import { Context } from '../context';
import { User as IUser, WellBatch as IWellBatch } from '@prisma/client';


export const WellBatch = objectType({
  name: 'WellBatch',
  sourceType: {
    module: '@prisma/client',
    export: 'WellBatch',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('well', {
      type: 'Well',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.wellBatch.findUnique({
          where: { id },
        }).well();
        return result!
      },
    })
    t.nonNull.field('date', { type: 'DateTime' })
    t.nonNull.field('product', {
      type: 'BatchProduct',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.wellBatch.findUnique({
          where: { id },
        }).product();
        return result!
      }
    })
    t.float('cost')
    t.float('chemicalVolume')
    t.float('diluentVolume')
    t.string('comment')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.wellBatch.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.wellBatch.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.boolean('authorized', {
      resolve: async ({ createdById }, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveWellBatchAuthorized({ user, createdById });
      }
    })
  },
});

interface IresolveWellBatchAuthorizedArgs {
  user: IUser;
  createdById: IWellBatch['createdById'];
}

const resolveWellBatchAuthorized = ({ user, createdById }: IresolveWellBatchAuthorizedArgs) => {
  const { role, id } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || (role === 'CHEMICAL' && createdById === id);
}

export const WellBatchQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('wellBatchesByWellId', {
      type: 'WellBatch',
      args: {
        wellId: nonNull(stringArg()),
      },
      resolve: async (_, { wellId }, ctx: Context) => {
        const result = await ctx.prisma.wellBatch.findMany({
          where: { wellId },
          orderBy: { date: 'desc' },
        })
        return result;
      },
    })
  }
});


export const WellBatchPayload = objectType({
  name: 'WellBatchPayload',
  definition(t) {
    t.field('wellBatch', { type: 'WellBatch' })
    t.field('error', { type: 'FieldError' })
  },
});

export const EditWellBatchInput = inputObjectType({
  name: 'EditWellBatchInput',
  definition(t) {
    t.nonNull.string('id')
    t.field('date', { type: 'DateTime' })
    t.string('productId')
    t.float('cost')
    t.float('chemicalVolume')
    t.float('diluentVolume')
    t.string('comment')
  },
});

export const WellBatchMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editWellBatch', {
      type: 'WellBatchPayload',
      args: { data: nonNull(arg({ type: 'EditWellBatchInput' })) },
      resolve: async (_parent, { data: { id, date, productId, cost, chemicalVolume, diluentVolume, comment } }, ctx: Context) => {
        const user = ctx.user;
        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'CHEMICAL')) {
          const { id: userId } = user;
          const wellBatch = await ctx.prisma.wellBatch.update({
            where: { id },
            data: {
              date: date || undefined,
              productId: productId || undefined,
              cost,
              chemicalVolume,
              diluentVolume,
              comment,
              updatedById: userId,
            },
          });
          await allocateWellBatchChronologicalEdge({ wellId: wellBatch.wellId, ctx });
          return { wellBatch }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      },
    })
    t.field('addWellBatch', {
      type: 'WellBatchPayload',
      args: {
        wellId: nonNull(stringArg()),
      },
      resolve: async (_parent, { wellId }, ctx: Context) => {
        const user = ctx.user;
        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'CHEMICAL')) {
          const userId = user.id;
          const today = new Date();
          today.setUTCHours(0, 0, 0, 0);

          const wellBatch = await ctx.prisma.wellBatch.create({
            data: {
              well: { connect: { id: wellId } },
              date: today,
              product: { connect: { product: 'CCB-350' } },
              createdBy: { connect: { id: userId } },
              updatedBy: { connect: { id: userId } },
            }
          });
          await allocateWellBatchChronologicalEdge({ wellId, ctx });
          return { wellBatch };
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
    t.field('deleteWellBatch', {
      type: 'WellBatchPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {

        const user = ctx.user;

        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'CHEMICAL')) {

          const { firstName, role } = user;

          if (role === 'CHEMICAL') {
            const monthAgo = new Date();
            monthAgo.setUTCHours(0, 0, 0, 0);
            monthAgo.setMonth(monthAgo.getMonth() - 1);

            const currentWellBatch = await ctx.prisma.wellBatch.findUnique({
              where: { id },
              select: {
                createdAt: true,
              }
            });
            if (currentWellBatch && currentWellBatch.createdAt < monthAgo) {
              return {
                error: {
                  field: 'created at',
                  message: `Hi ${firstName}. Your user privilages do not allow you to delete pipeline batch created more than a month ago.`,
                }
              }
            }
          }
          const wellBatch = await ctx.prisma.wellBatch.delete({
            where: { id }
          });
          await allocateWellBatchChronologicalEdge({ wellId: wellBatch.wellId, ctx });
          return { wellBatch }
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


interface IAllocateWellBatchChronologicalEdge {
  wellId: IWellBatch['wellId'];
  ctx: Context;
}

export const allocateWellBatchChronologicalEdge = async ({ wellId, ctx }: IAllocateWellBatchChronologicalEdge) => {

  const { _min, _max } = await ctx.prisma.wellBatch.aggregate({
    where: { wellId },
    _max: { date: true },
    _min: { date: true },
  });

  const wellBatches = await ctx.prisma.wellBatch.findMany({
    where: { wellId },
    select: { id: true, date: true }
  });

  for (const { id, date } of wellBatches) {
    const first = date.getTime() === _min.date?.getTime() ? true : null;
    const last = date.getTime() === _max.date?.getTime() ? true : null;
    await ctx.prisma.wellBatch.update({
      where: { id },
      data: {
        first,
        last,
      }
    });
  }
}
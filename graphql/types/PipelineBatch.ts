import { objectType, stringArg, extendType, nonNull, arg, floatArg, inputObjectType } from 'nexus';
import { Context } from '../context';
import { User as IUser, PipelineBatch as IPipelineBatch } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';


export const PipelineBatchObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'date', nullable: false, type: 'DateTime' },
  { field: 'productId', nullable: false, type: 'String' },
  { field: 'cost', nullable: true, type: 'Float' },
  { field: 'chemicalVolume', nullable: true, type: 'Float' },
  { field: 'diluentVolume', nullable: true, type: 'Float' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const PipelineBatch = objectType({
  name: 'PipelineBatch',
  sourceType: {
    module: '@prisma/client',
    export: 'PipelineBatch',
  },
  definition: t => {
    for (const { field, nullable, type } of PipelineBatchObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});




export const PipelineBatchExtendObject = extendType({
  type: 'PipelineBatch',
  definition: t => {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipelineBatch.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.nonNull.field('product', {
      type: 'BatchProduct',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipelineBatch.findUnique({
          where: { id },
        }).product();
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipelineBatch.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipelineBatch.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async ({ createdById }, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolvePipelineBatchAuthorized({ user, createdById });
      }
    })
  },
});

interface IResolvePipelineBatchAuthorizedArgs {
  user: IUser;
  createdById: IPipelineBatch['createdById'];
}

const resolvePipelineBatchAuthorized = ({ user, createdById }: IResolvePipelineBatchAuthorizedArgs) => {
  const { role, id } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || (role === 'CHEMICAL' && createdById === id);
}


export const PipelineBatchQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pipelineBatchesByPipelineId', {
      type: 'PipelineBatch',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.pipelineBatch.findMany({
          where: { pipelineId },
          orderBy: { date: 'desc' },
        })
        return result;
      },
    })
  }
});


export const PipelineBatchPayload = objectType({
  name: 'PipelineBatchPayload',
  definition(t) {
    t.field('pipelineBatch', { type: 'PipelineBatch' })
    t.field('error', { type: 'FieldError' })
  },
});


export const EditPipelineBatchInput = inputObjectType({
  name: 'EditPipelineBatchInput',
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


export const PipelineBatchMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPipelineBatch', {
      type: 'PipelineBatchPayload',
      args: { data: nonNull(arg({ type: 'EditPipelineBatchInput' })) },
      resolve: async (_parent, { data: { id, date, productId, cost, chemicalVolume, diluentVolume, comment } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;

          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'CHEMICAL') {
            const pipelineBatch = await ctx.prisma.pipelineBatch.update({
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
            await allocatePipelineBatchChronologicalEdge({ pipelineId: pipelineBatch.pipelineId, ctx });
            return { pipelineBatch }
          }
          return {
            error: {
              field: 'Pipeline batch',
              message: `Hi ${firstName}, your user privilages do not allow you to edit pipeline batches.`,
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
    t.field('addPipelineBatch', {
      type: 'PipelineBatchPayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'CHEMICAL') {
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);

            const pipelineBatch = await ctx.prisma.pipelineBatch.create({
              data: {
                pipeline: { connect: { id: pipelineId } },
                date: today,
                product: {
                  connectOrCreate: {
                    where: { product: 'C-1210' },
                    create: { product: 'C-1210', solubility: 'Oil', createdById: userId, updatedById: userId }
                  }
                },
                createdBy: { connect: { id: userId } },
                updatedBy: { connect: { id: userId } },
              }
            });
            await allocatePipelineBatchChronologicalEdge({ pipelineId, ctx });
            return { pipelineBatch }
          }
          return {
            error: {
              field: 'Pipeline batch',
              message: `Hi ${firstName}, your user privilages do not allow you to add new pipeline batch.`,
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
    t.field('deletePipelineBatch', {
      type: 'PipelineBatchPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { firstName, role } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'CHEMICAL') {
            if (role === 'CHEMICAL') {
              const monthAgo = new Date();
              monthAgo.setUTCHours(0, 0, 0, 0);
              monthAgo.setMonth(monthAgo.getMonth() - 1);

              const currentPipelineBatch = await ctx.prisma.pipelineBatch.findUnique({
                where: { id },
                select: {
                  createdAt: true,
                }
              });
              if (currentPipelineBatch && currentPipelineBatch.createdAt < monthAgo) {
                return {
                  error: {
                    field: 'created at',
                    message: `Hi ${firstName}. Your user privilages do not allow you to delete pipeline batch created more than a month ago.`,
                  }
                }
              }
            }
            const pipelineBatch = await ctx.prisma.pipelineBatch.delete({
              where: { id }
            });
            await allocatePipelineBatchChronologicalEdge({ pipelineId: pipelineBatch.pipelineId, ctx });
            return { pipelineBatch }
          }
          return {
            error: {
              field: 'Pipeline batch',
              message: `Hi ${firstName}, your user privilages do not allow you to delete pipeline batch.`,
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


interface IAllocatePipelineBatchChronologicalEdge {
  pipelineId: IPipelineBatch['pipelineId'];
  ctx: Context;
}

export const allocatePipelineBatchChronologicalEdge = async ({ pipelineId, ctx }: IAllocatePipelineBatchChronologicalEdge) => {

  const { _min, _max } = await ctx.prisma.pipelineBatch.aggregate({
    where: { pipelineId },
    _max: { date: true },
    _min: { date: true },
  });

  const pipelinePipelineBatchs = await ctx.prisma.pipelineBatch.findMany({
    where: { pipelineId },
    select: { id: true, date: true }
  });

  for (const { id, date } of pipelinePipelineBatchs) {
    const first = date.getTime() === _min.date?.getTime() ? true : null;
    const last = date.getTime() === _max.date?.getTime() ? true : null;
    await ctx.prisma.pipelineBatch.update({
      where: { id },
      data: {
        first,
        last,
      }
    });
  }
}
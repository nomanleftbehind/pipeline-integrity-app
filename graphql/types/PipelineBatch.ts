import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { User as IUser, PipelineBatch as IPipelineBatch } from '@prisma/client';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import { ITableConstructObject } from './SearchNavigation';


export const PipelineBatchObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'date', nullable: false, type: 'DateTime' },
  { field: 'cost', nullable: true, type: 'Float' },
  { field: 'chemicalVolume', nullable: true, type: 'Float' },
  { field: 'diluentVolume', nullable: true, type: 'Float' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

// t.nonNull.string('id')
// t.nonNull.field('date', { type: 'DateTime' })
// t.float('cost')
// t.float('chemicalVolume')
// t.float('diluentVolume')
// t.string('comment')
// t.nonNull.field('createdAt', { type: 'DateTime' })
// t.nonNull.field('updatedAt', { type: 'DateTime' })

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

interface IresolvePipelineBatchAuthorizedArgs {
  user: IUser;
  createdById: IPipelineBatch['createdById'];
}

const resolvePipelineBatchAuthorized = ({ user, createdById }: IresolvePipelineBatchAuthorizedArgs) => {
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


export const PipelineBatchMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPipelineBatch', {
      type: 'PipelineBatchPayload',
      args: {
        id: nonNull(stringArg()),
        date: arg({ type: 'DateTime' }),
        product: stringArg(),
        cost: floatArg(),
        chemicalVolume: floatArg(),
        diluentVolume: floatArg(),
        comment: stringArg(),
      },
      resolve: async (_parent, args, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;

          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'CHEMICAL') {
            if (args.product) {
              const { id: productId } = await ctx.prisma.batchProduct.findUnique({
                where: { product: args.product },
                select: { id: true },
              }) || {};
              if (productId) {
                const pipelineBatch = await ctx.prisma.pipelineBatch.update({
                  where: { id: args.id },
                  data: {
                    productId,
                    updatedById: userId,
                  },
                });
                return { pipelineBatch }
              }
              const products = (await ctx.prisma.batchProduct.findMany({
                select: { product: true },
              })).map(batchProduct => batchProduct.product).join(', ');
              return {
                error: {
                  field: 'Product',
                  message: `Product ${args.product} doesn't exist. Please choose from the following products: ${products}`,
                }
              }
            }
            const pipelineBatch = await ctx.prisma.pipelineBatch.update({
              where: { id: args.id },
              data: {
                date: args.date || undefined,
                cost: args.cost,
                chemicalVolume: args.chemicalVolume,
                diluentVolume: args.diluentVolume,
                comment: args.comment,
                updatedById: userId,
              },
            });
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


import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';


export const BatchProduct = objectType({
  name: 'BatchProduct',
  sourceType: {
    module: '@prisma/client',
    export: 'BatchProduct',
  },
  definition(t) {
    t.nonNull.string('id')
    t.list.field('pipelineBatches', {
      type: 'PipelineBatch',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.batchProduct.findUnique({
          where: { id },
        }).pipelineBatches();
        return result;
      },
    })
    t.list.field('wellBatches', {
      type: 'WellBatch',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.batchProduct.findUnique({
          where: { id },
        }).wellBatches();
        return result;
      },
    })
    t.nonNull.field('product', {
      type: 'BatchProductEnum',
      resolve: ({ product }) => {
        const result = serverEnumToDatabaseEnum(BatchProductEnumMembers, product);
        return result;
      }
    })
    t.string('productType')
    t.float('cost')
    t.nonNull.field('solubility', {
      type: 'SolubilityEnum',
      resolve: ({ solubility }) => {
        const result = serverEnumToDatabaseEnum(SolubilityEnumMembers, solubility);
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.batchProduct.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.batchProduct.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
});


export const BatchProductEnumMembers = {
  PR777: 'PR-777',
  C3104: 'C-3104',
  R777: 'R-777',
  P7252: 'P-7252',
  SC6232: 'SC-6232',
  P7272: 'P-7272',
  PS7217: 'PS-7217',
  P7215: 'P-7215',
  P7263: 'P-7263',
  P7225: 'P-7225',
  PSI3: 'PSI-3',
  BC1303: 'BC-1303',
  CCB350: 'CCB-350',
  B2140: 'B-2140',
  SC6132: 'SC-6132',
  PSC7292: 'PSC-7292',
  C210: 'C-210',
  C1210: 'C-1210',
}

export const BatchProductEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'BatchProductEnum',
  },
  name: 'BatchProductEnum',
  members: BatchProductEnumMembers
});


export const SolubilityEnumMembers = {
  Oil: 'Oil',
  Water: 'Water',
}

export const SolubilityEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'SolubilityEnum',
  },
  name: 'SolubilityEnum',
  members: SolubilityEnumMembers
});
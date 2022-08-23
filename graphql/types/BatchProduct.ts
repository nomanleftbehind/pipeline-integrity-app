import { enumType, objectType } from 'nexus';
import { NexusGenObjects } from 'nexus-typegen';
import { Context } from '../context';
import { serverEnumToDatabaseEnum } from './Pipeline';


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
    t.nonNull.string('product')
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


export const SolubilityEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(SolubilityEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});
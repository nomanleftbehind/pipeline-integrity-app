import { objectType, extendType } from 'nexus';
import { Context } from '../context';
import { ITableConstructObject } from './SearchNavigation';
import { resolveChemicalAuthorized } from './Chemical';


export const ChemicalSupplierObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'name', nullable: false, type: 'String' },
  { field: 'description', nullable: true, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const ChemicalSupplier = objectType({
  name: 'ChemicalSupplier',
  sourceType: {
    module: '@prisma/client',
    export: 'ChemicalSupplier',
  },
  definition: t => {
    for (const { field, nullable, type } of ChemicalSupplierObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const ChemicalSupplierExtendObject = extendType({
  type: 'ChemicalSupplier',
  definition: t => {
    t.list.field('chemicals', {
      type: 'Chemical',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemicalSupplier.findUnique({
          where: { id },
        }).chemicals();
        return result;
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemicalSupplier.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemicalSupplier.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveChemicalAuthorized(user);
      }
    })
  }
});
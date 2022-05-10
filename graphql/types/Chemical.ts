import { objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';



export const ChemicalObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'baselineFluidAnalysisDate', nullable: true, type: 'DateTime' },
  { field: 'scaling', nullable: true, type: 'Boolean' },
  { field: 'bacteria', nullable: true, type: 'Boolean' },
  { field: 'co2', nullable: true, type: 'Boolean' },
  { field: 'o2', nullable: true, type: 'Boolean' },
  { field: 'h2s', nullable: true, type: 'Boolean' },
  { field: 'continuousInjection', nullable: true, type: 'Boolean' },
  { field: 'injectionRate', nullable: true, type: 'Float' },
  { field: 'downholeBatch', nullable: true, type: 'Boolean' },
  { field: 'inhibitorPipelineBatch', nullable: true, type: 'Boolean' },
  { field: 'bacteriaTreatment', nullable: true, type: 'Boolean' },
  { field: 'scaleTreatment', nullable: true, type: 'Boolean' },
  { field: 'batchFrequency', nullable: true, type: 'Int' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const Chemical = objectType({
  name: 'Chemical',
  sourceType: {
    module: '@prisma/client',
    export: 'Chemical',
  },
  definition: t => {
    for (const { field, nullable, type } of ChemicalObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const ChemicalExtendObject = extendType({
  type: 'Chemical',
  definition: t => {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemical.findUnique({
          where: { id },
        }).pipeline();
        return result!;
      }
    })
    t.field('chemicalSupplier', {
      type: 'ChemicalSupplier',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemical.findUnique({
          where: { id },
        }).chemicalSupplier();
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemical.findUnique({
          where: { id },
        }).createdBy();
        return result!;
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.chemical.findUnique({
          where: { id },
        }).updatedBy();
        return result!;
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

export const resolveChemicalAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || role === 'CHEMICAL';
}



export const ChemicalQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('chemicalById', {
      type: 'Chemical',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {
        const result = await ctx.prisma.chemical.findUnique({
          where: { id },
        });
        return result;
      }
    })
  }
});


export const ChemicalPayload = objectType({
  name: 'ChemicalPayload',
  definition(t) {
    t.field('chemical', { type: 'Chemical' })
    t.field('error', { type: 'FieldError' })
  },
});


export const ChemicalMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editChemical', {
      type: 'ChemicalPayload',
      args: {
        id: nonNull(stringArg()),
        baselineFluidAnalysisDate: arg({ type: 'DateTime' }),
        scaling: booleanArg(),
        bacteria: booleanArg(),
        co2: booleanArg(),
        o2: booleanArg(),
        h2s: booleanArg(),
        continuousInjection: booleanArg(),
        injectionRate: floatArg(),
        downholeBatch: booleanArg(),
        inhibitorPipelineBatch: booleanArg(),
        bacteriaTreatment: booleanArg(),
        scaleTreatment: booleanArg(),
        batchFrequency: intArg(),
        comment: stringArg(),
      },
      resolve: async (_, args, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveChemicalAuthorized(user);
          if (authorized) {
            const chemical = await ctx.prisma.chemical.update({
              where: { id: args.id },
              data: {
                baselineFluidAnalysisDate: args.baselineFluidAnalysisDate,
                scaling: args.scaling,
                bacteria: args.bacteria,
                co2: args.co2,
                o2: args.o2,
                h2s: args.h2s,
                continuousInjection: args.continuousInjection,
                injectionRate: args.injectionRate,
                downholeBatch: args.downholeBatch,
                inhibitorPipelineBatch: args.inhibitorPipelineBatch,
                bacteriaTreatment: args.bacteriaTreatment,
                scaleTreatment: args.scaleTreatment,
                batchFrequency: args.batchFrequency,
                comment: args.comment,
                updatedById: userId,
              },
            });
            return { chemical }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to chemical.`,
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
    t.field('addChemical', {
      type: 'ChemicalPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveChemicalAuthorized(user);
          if (authorized) {
            const chemical = await ctx.prisma.chemical.create({
              data: {
                id,
                createdById: userId,
                updatedById: userId,
              }
            });
            return { chemical }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add chemical.`,
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
    t.field('deleteChemical', {
      type: 'ChemicalPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user;
          const authorized = resolveChemicalAuthorized(user);
          if (authorized) {
            const chemical = await ctx.prisma.chemical.delete({
              where: { id }
            });
            return { chemical }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete chemical.`,
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
})
import { objectType, extendType } from 'nexus';
import { Context } from '../context';
import { ITableConstructObject } from './SearchNavigation';
import { resolveCathodicSurveyAuthorized } from './CathodicSurvey';


export const CompanyObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'name', nullable: false, type: 'String' },
  { field: 'description', nullable: true, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const Company = objectType({
  name: 'Company',
  sourceType: {
    module: '@prisma/client',
    export: 'Company',
  },
  definition: t => {
    for (const { field, nullable, type } of CompanyObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const CompanyExtendObject = extendType({
  type: 'Company',
  definition: t => {
    t.list.field('cathodicSurveys', {
      type: 'CathodicSurvey',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.company.findUnique({
          where: { id },
        }).cathodicSurveys();
        return result;
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.company.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.company.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveCathodicSurveyAuthorized(user);
      }
    })
  }
});
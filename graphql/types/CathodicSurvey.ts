import { objectType, stringArg, extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../context';
import { Prisma, User as IUser, CathodicSurvey as ICathodicSurvey } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';



export const CathodicSurveyObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String', },
  { field: 'date', nullable: false, type: 'DateTime', },
  { field: 'companyId', nullable: true, type: 'String' },
  { field: 'deficiencies', nullable: true, type: 'Boolean' },
  { field: 'correctionDate', nullable: true, type: 'DateTime' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const CathodicSurvey = objectType({
  name: 'CathodicSurvey',
  sourceType: {
    module: '@prisma/client',
    export: 'CathodicSurvey',
  },
  definition: t => {
    for (const { field, nullable, type } of CathodicSurveyObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const CathodicSurveyExtendObject = extendType({
  type: 'CathodicSurvey',
  definition: t => {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.cathodicSurvey.findUnique({
          where: { id },
        }).pipeline();
        return result!;
      }
    })
    t.field('company', {
      type: 'Company',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.cathodicSurvey.findUnique({
          where: { id },
        }).company();
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.cathodicSurvey.findUnique({
          where: { id },
        }).createdBy();
        return result!;
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.cathodicSurvey.findUnique({
          where: { id },
        }).updatedBy();
        return result!;
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

export const resolveCathodicSurveyAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || role === 'CATHODIC';
}



export const CathodicSurveyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('cathodicSurveysByPipelineId', {
      type: 'CathodicSurvey',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.cathodicSurvey.findMany({
          where: { pipelineId },
          orderBy: { date: 'desc' },
        })
        return result;
      }
    })
  }
});


export const CathodicSurveyPayload = objectType({
  name: 'CathodicSurveyPayload',
  definition(t) {
    t.field('cathodicSurvey', { type: 'CathodicSurvey' })
    t.field('error', { type: 'FieldError' })
  },
});

export const EditCathodicSurveyInput = inputObjectType({
  name: 'EditCathodicSurveyInput',
  definition: t => {
    t.nonNull.string('id')
    t.field('date', { type: 'DateTime' })
    t.string('companyId')
    t.boolean('deficiencies')
    t.field('correctionDate', { type: 'DateTime' })
    t.string('comment')
  },
});


export const CathodicSurveyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editCathodicSurvey', {
      type: 'CathodicSurveyPayload',
      args: { data: nonNull(arg({ type: 'EditCathodicSurveyInput' })) },
      resolve: async (_, { data: { id, date, companyId, deficiencies, correctionDate, comment } }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveCathodicSurveyAuthorized(user);
          if (authorized) {
            try {
              const cathodicSurvey = await ctx.prisma.cathodicSurvey.update({
                where: { id },
                data: {
                  date: date || undefined,
                  companyId,
                  deficiencies,
                  correctionDate,
                  comment,
                  updatedById: userId,
                },
              });
              await allocateCathodicSurveyChronologicalEdge({ pipelineId: cathodicSurvey.pipelineId, ctx });
              return { cathodicSurvey }
            } catch (e) {
              if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                  return {
                    error: {
                      field: 'date',
                      message: `Cathodic Survey dated ${date?.toISOString().split('T')[0]} already exists for this pipeline. One pipeline cannot have multiple cathodic surveys on the same date.`,
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
              message: `Hi ${firstName}, you are not authorized to make changes to cathodic survey.`,
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
    t.field('addCathodicSurvey', {
      type: 'CathodicSurveyPayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveCathodicSurveyAuthorized(user);
          if (authorized) {
            const pipelineCathodicSurveys = await ctx.prisma.cathodicSurvey.findMany({
              where: {
                pipelineId,
              },
              select: {
                date: true,
              },
              orderBy: {
                date: 'asc'
              }
            });
            // When adding new cathodic surveys, date when survey was done is mandatory and has to be unique,
            // so we set it to today and check if it already exists in which case we will keep increasing it by 1 until it's unique.
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            for (const i of pipelineCathodicSurveys) {
              if (i.date.getTime() === today.getTime()) {
                today.setDate(today.getDate() + 1);
              }
            }

            const cathodicSurvey = await ctx.prisma.cathodicSurvey.create({
              data: {
                pipelineId,
                date: today,
                createdById: userId,
                updatedById: userId,
              }
            });
            await allocateCathodicSurveyChronologicalEdge({ pipelineId: pipelineId, ctx });
            return { cathodicSurvey };
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add new cathodic surveys.`,
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
    t.field('deleteCathodicSurvey', {
      type: 'CathodicSurveyPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user;
          const authorized = resolveCathodicSurveyAuthorized(user);
          if (authorized) {
            const cathodicSurvey = await ctx.prisma.cathodicSurvey.delete({
              where: { id }
            });
            await allocateCathodicSurveyChronologicalEdge({ pipelineId: cathodicSurvey.pipelineId, ctx });
            return { cathodicSurvey }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete cathodic surveys.`,
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


interface IAllocateCathodicSurveyChronologicalEdge {
  pipelineId: ICathodicSurvey['pipelineId'];
  ctx: Context;
}

export const allocateCathodicSurveyChronologicalEdge = async ({ pipelineId, ctx }: IAllocateCathodicSurveyChronologicalEdge) => {

  const { _min, _max } = await ctx.prisma.cathodicSurvey.aggregate({
    where: { pipelineId },
    _max: { date: true },
    _min: { date: true },
  });

  const pipelineCathodicSurveys = await ctx.prisma.cathodicSurvey.findMany({
    where: { pipelineId },
    select: { id: true, date: true }
  });

  for (const { id, date } of pipelineCathodicSurveys) {
    const first = date.getTime() === _min.date?.getTime() ? true : null;
    const last = date.getTime() === _max.date?.getTime() ? true : null;
    await ctx.prisma.cathodicSurvey.update({
      where: { id },
      data: {
        first,
        last,
      }
    });
  }
}
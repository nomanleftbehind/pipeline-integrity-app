import { objectType, stringArg, extendType, nonNull, arg, subscriptionType } from 'nexus';
import { Context, ContextSubscription } from '../context';
import { User as IUser, LicenseChange as ILicenseChange } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';


export const LicenseChangeObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'statusId', nullable: false, type: 'String' },
  { field: 'substanceId', nullable: false, type: 'String' },
  { field: 'date', nullable: false, type: 'DateTime', },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'linkToDocumentation', nullable: true, type: 'String', },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

export const LicenseChange = objectType({
  name: 'LicenseChange',
  sourceType: {
    module: '@prisma/client',
    export: 'LicenseChange',
  },
  definition: t => {
    for (const { field, nullable, type } of LicenseChangeObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
})

export const LicenseChangeExtendObject = extendType({
  type: 'LicenseChange',
  definition(t) {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async ({ createdById }, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveLicenseChangeAuthorized({ user, createdById });
      }
    })
  },
});

interface IresolveLicenseChangeAuthorizedArgs {
  user: IUser;
  createdById: ILicenseChange['createdById'];
}

const resolveLicenseChangeAuthorized = ({ user, createdById }: IresolveLicenseChangeAuthorizedArgs) => {
  const { role, id } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || (role === 'OFFICE' && createdById === id);
}




export const LicenseChangeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('licenseChangesByPipelineId', {
      type: 'LicenseChange',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findMany({
          where: { pipelineId },
          orderBy: { date: 'desc' },
        })
        return result;
      }
    })
  }
});


export const LicenseChangePayload = objectType({
  name: 'LicenseChangePayload',
  definition(t) {
    t.field('licenseChange', { type: 'LicenseChange' })
    t.field('error', { type: 'FieldError' })
  },
});


export const LicenseChangeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editLicenseChange', {
      type: 'LicenseChangePayload',
      args: {
        id: nonNull(stringArg()),
        statusId: stringArg(),
        substanceId: stringArg(),
        date: arg({ type: 'DateTime' }),
        comment: stringArg(),
        linkToDocumentation: stringArg(),
      },
      resolve: async (_parent, args, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OFFICE') {
            const currentLicenseChange = await ctx.prisma.licenseChange.findUnique({
              where: { id: args.id },
              select: {
                pipelineId: true,
                createdById: true,
                date: true,
              }
            });

            if (currentLicenseChange) {

              const { pipelineId, createdById, date } = currentLicenseChange;

              const pipelineLicenseChanges = await ctx.prisma.licenseChange.findMany({
                where: { pipelineId },
                select: { date: true, }
              });

              const licenseChangeDates = pipelineLicenseChanges.map(licenseChange => licenseChange.date.getTime());

              if (args.date && licenseChangeDates.includes(args.date.getTime()) && args.date.getTime() !== date.getTime()) {
                return {
                  error: {
                    field: 'License change date',
                    message: `License change date ${args.date.toISOString().split('T')[0]} is already entered for this pipeline. One pipeline cannot have multiple license changes on the same date.`,
                  }
                }
              }

              if (role === 'OFFICE' && createdById !== userId) {
                return {
                  error: {
                    field: 'License change',
                    message: `Hi ${firstName}. Your user privilages do not allow you to edit license change entries not authored by you.`,
                  }
                }
              }
            }

            const licenseChange = await ctx.prisma.licenseChange.update({
              where: { id: args.id },
              data: {
                statusId: args.statusId || undefined,
                substanceId: args.substanceId || undefined,
                date: args.date || undefined,
                linkToDocumentation: args.linkToDocumentation,
                comment: args.comment,
                updatedById: userId,
              },
            });
            ctx.pubsub.publish('licenseChangeUpdate', licenseChange);
            return { licenseChange }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to license changes.`,
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
    t.field('addLicenseChange', {
      type: 'LicenseChangePayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OFFICE') {
            const pipelineLicenseChanges = await ctx.prisma.licenseChange.findMany({
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
            // When adding new license change entry, date when license was changed is mandatory and has to be unique,
            // so we set it to today and check if it already exists in which case we will keep increasing it by 1 until it's unique.
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            for (const i of pipelineLicenseChanges) {
              if (i.date.getTime() === today.getTime()) {
                today.setDate(today.getDate() + 1);
              }
            }

            const licenseChange = await ctx.prisma.licenseChange.create({
              data: {
                pipeline: { connect: { id: pipelineId } },
                date: today,
                status: { connect: { status: 'Operating' } },
                substance: { connect: { substance: 'Oil Well Effluent' } },
                createdBy: { connect: { id: userId } },
                updatedBy: { connect: { id: userId } },
              }
            });
            return { licenseChange };
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add new license changes.`,
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
    t.field('deleteLicenseChange', {
      type: 'LicenseChangePayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OFFICE') {

            if (role === 'OFFICE') {
              const currentLicenseChange = await ctx.prisma.licenseChange.findUnique({
                where: { id },
                select: {
                  createdById: true,
                }
              });

              if (currentLicenseChange && currentLicenseChange.createdById !== userId) {
                return {
                  error: {
                    field: 'License change created by',
                    message: `Hi ${firstName}. Your user privilages do not allow you to delete license changes not authored by you.`,
                  }
                }
              }
            }
            const licenseChange = await ctx.prisma.licenseChange.delete({
              where: { id }
            });
            return { licenseChange }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete license changes.`,
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


export const LicenseChangeSubscription = extendType({
  type: 'Subscription',
  definition: t => {
    t.field('licenseChangeUpdate', {
      type: 'LicenseChange',
      subscribe: (_root, _args, ctx: ContextSubscription) => {
        return ctx.pubsub.asyncIterator('licenseChangeUpdate');
      },
      resolve: (root: ILicenseChange, args, ctx: ContextSubscription) => {
        console.log('subscribe ctx:', root);
        return root
      },
    })
  }
});
import { enumType, objectType, stringArg, extendType, nonNull, arg } from 'nexus';
import { databaseEnumToServerEnum, serverEnumToDatabaseEnum } from './Pipeline';
import { Context } from '../context';


export const LicenseChange = objectType({
  name: 'LicenseChange',
  sourceType: {
    module: '@prisma/client',
    export: 'LicenseChange',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.nonNull.field('status', {
      type: 'StatusEnum',
      resolve: ({ status }) => {
        const result = serverEnumToDatabaseEnum(StatusEnumMembers, status);
        return result;
      }
    })
    t.nonNull.field('substance', {
      type: 'SubstanceEnum',
      resolve: ({ substance }) => {
        const result = serverEnumToDatabaseEnum(SubstanceEnumMembers, substance);
        return result;
      }
    })
    t.nonNull.field('date', { type: 'DateTime' })
    t.string('linkToDocumentation')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
});


export const StatusEnumMembers = {
  Operating: "Operating",
  Discontinued: "Discontinued",
  Abandoned: "Abandoned",
  Removed: "Removed",
  ToBeConstructed: "To Be Constructed",
  Active: "Active",
  Cancelled: "Cancelled",
  New: "New",
  NotConstructed: "Not Constructed"
}

export const StatusEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'StatusEnum',
  },
  name: 'StatusEnum',
  members: StatusEnumMembers
});


export const SubstanceEnumMembers = {
  NaturalGas: "Natural Gas",
  FreshWater: "Fresh Water",
  SaltWater: "Salt Water",
  CrudeOil: "Crude Oil",
  OilWellEffluent: "Oil Well Effluent",
  LVPProducts: "LVP Products",
  FuelGas: "Fuel Gas",
  SourNaturalGas: "Sour Natural Gas"
}

export const SubstanceEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'SubstanceEnum',
  },
  name: 'SubstanceEnum',
  members: SubstanceEnumMembers
});


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
        status: arg({ type: 'StatusEnum' }),
        substance: arg({ type: 'SubstanceEnum' }),
        date: arg({ type: 'DateTime' }),
        linkToDocumentation: stringArg(),
      },
      resolve: async (_parent, args, ctx: Context) => {

        const user = ctx.user;

        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'OFFICE')) {

          const { id: userId, firstName, role } = user;

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
              status: databaseEnumToServerEnum(StatusEnumMembers, args.status) || undefined,
              substance: databaseEnumToServerEnum(SubstanceEnumMembers, args.substance) || undefined,
              date: args.date || undefined,
              linkToDocumentation: args.linkToDocumentation,
              updatedById: userId,
            },
          });
          return { licenseChange }
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

        if (user && ['ADMIN', 'ENGINEER', 'OFFICE'].includes(user.role)) {
          const userId = user.id;
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
              pipelineId,
              date: today,
              createdById: userId,
              updatedById: userId,
            }
          });
          return { licenseChange };
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

        if (user && (user.role === 'ADMIN' || user.role === 'ENGINEER' || user.role === 'OFFICE')) {

          const { id: userId, firstName, role } = user;

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
                  message: `Hi ${firstName}. Your user privilages do not allow you to delete license change entries not authored by you.`,
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
            message: 'Not authorized',
          }
        }
      }
    })
  }
});
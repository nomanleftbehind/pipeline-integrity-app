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
          orderBy: { createdAt: 'desc' },
        })
        return result;
      }
    })
  }
})


export const LicenseChangeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editLicenseChange', {
      type: 'LicenseChange',
      args: {
        id: nonNull(stringArg()),
        status: arg({ type: 'StatusEnum' }),
        substance: arg({ type: 'SubstanceEnum' }),
        date: arg({ type: 'DateTime' }),
        linkToDocumentation: stringArg(),
      },
      resolve: async (_parent, args, ctx: Context) => {
        return ctx.prisma.licenseChange.update({
          where: { id: args.id },
          data: {
            status: databaseEnumToServerEnum(StatusEnumMembers, args.status) || undefined,
            substance: databaseEnumToServerEnum(SubstanceEnumMembers, args.substance) || undefined,
            date: args.date || undefined,
            linkToDocumentation: args.linkToDocumentation,
            updatedById: /*'606c4f5b-1af7-4720-b649-65f8fc20e64f'*/String(ctx.user?.id),
          },
        })
      },
    })
    t.field('addLicenseChange', {
      type: 'LicenseChange',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        const userId = String(ctx.user?.id);

        const pipelineLicenseChange = await ctx.prisma.licenseChange.findMany({
          where: {
            pipelineId,
          },
          select: {
            date: true,
          }
        });

        // When adding new license change entry, date when license was changed is mandatory and has to be unique,
        // so we set it to today and will keep increasing it by 1 until it's unique.
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const date = pipelineLicenseChange.reduce(
          (a, b) => {
            if (a.date.valueOf() === b.date.valueOf()) {
              a.date.setDate(a.date.getDate() + 1);
            }
            console.log('a:', a.date.toDateString(), 'b:', b.date.toDateString());
            console.log(a.date.valueOf() === b.date.valueOf());
            
            return a.date > b.date ? a : b
          },
          { date: today }).date;

        const result = await ctx.prisma.licenseChange.create({
          data: {
            pipelineId,
            date,
            createdById: userId,
            updatedById: userId,
          }
        });
        return result;
      }
    })
    t.field('deleteLicenseChange', {
      type: 'LicenseChange',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, { id }, ctx: Context) => {
        return ctx.prisma.licenseChange.delete({
          where: { id }
        })
      }
    })
  }
});
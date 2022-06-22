import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { NexusGenObjects } from 'nexus-typegen';
import { databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { allocateRisk } from './RiskCalcs';
import { ITableConstructObject } from './SearchNavigation';


export const EnvironmentProximityToEnumMembers = {
  WB1: 'WB1',
  WB3: 'WB3',
  WB4: 'WB4',
  WB5: 'WB5',
  WC1: 'WC1',
  WC2: 'WC2',
  WC3: 'WC3',
  WC4: 'WC4',
}

export const EnvironmentProximityToEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'EnvironmentProximityToEnum',
  },
  name: 'EnvironmentProximityToEnum',
  members: EnvironmentProximityToEnumMembers
});

const EnvironmentProximityToEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(EnvironmentProximityToEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});


export const GeotechnicalFacingEnumMembers = {
  N: 'N',
  NE: 'NE',
  E: 'E',
  SE: 'SE',
  S: 'S',
  SW: 'SW',
  W: 'W',
  NW: 'NW',
}

export const GeotechnicalFacingEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'GeotechnicalFacingEnum',
  },
  name: 'GeotechnicalFacingEnum',
  members: GeotechnicalFacingEnumMembers
});

const GeotechnicalFacingEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(GeotechnicalFacingEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});



export const RiskObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'aerialReview', nullable: true, type: 'Boolean' },
  { field: 'environmentProximityTo', nullable: true, type: 'EnvironmentProximityToEnum', enumObjectArray: EnvironmentProximityToEnumArray },
  { field: 'geotechnicalSlopeAngleS1', nullable: true, type: 'Int' },
  { field: 'geotechnicalFacingS1', nullable: true, type: 'GeotechnicalFacingEnum', enumObjectArray: GeotechnicalFacingEnumArray },
  { field: 'geotechnicalHeightS1', nullable: true, type: 'Int' },
  { field: 'geotechnicalSlopeAngleS2', nullable: true, type: 'Int' },
  { field: 'geotechnicalFacingS2', nullable: true, type: 'GeotechnicalFacingEnum', enumObjectArray: GeotechnicalFacingEnumArray },
  { field: 'geotechnicalHeightS2', nullable: true, type: 'Int' },
  { field: 'dateSlopeChecked', nullable: true, type: 'DateTime' },
  { field: 'repairTimeDays', nullable: true, type: 'Int' },
  { field: 'releaseTimeDays', nullable: true, type: 'Int' },
  { field: 'costPerM3Released', nullable: true, type: 'Float' },
  { field: 'consequenceEnviro', nullable: true, type: 'Int' },
  { field: 'consequenceAsset', nullable: true, type: 'Int' },
  { field: 'probabilityInterior', nullable: true, type: 'Int' },
  { field: 'probabilityExterior', nullable: true, type: 'Int' },
  { field: 'consequenceMax', nullable: true, type: 'Int' },
  { field: 'riskPotentialGeo', nullable: true, type: 'Int' },
  { field: 'riskPotentialInternal', nullable: true, type: 'Int' },
  { field: 'riskPotentialExternal', nullable: true, type: 'Int' },
  { field: 'oilReleaseCost', nullable: true, type: 'Float' },
  { field: 'gasReleaseCost', nullable: true, type: 'Float' },
  { field: 'consequencePeople', nullable: true, type: 'Int' },
  { field: 'probabilityGeo', nullable: true, type: 'Int' },
  { field: 'safeguardInternalProtection', nullable: true, type: 'Int' },
  { field: 'safeguardPigging', nullable: true, type: 'Int' },
  { field: 'safeguardChemicalInhibition', nullable: true, type: 'Int' },
  { field: 'probabilityInteriorWithSafeguards', nullable: true, type: 'Int' },
  { field: 'riskPotentialInternalWithSafeguards', nullable: true, type: 'Int' },
  { field: 'safeguardExternalCoating', nullable: true, type: 'Int' },
  { field: 'safeguardCathodic', nullable: true, type: 'Int' },
  { field: 'probabilityExteriorWithSafeguards', nullable: true, type: 'Int' },
  { field: 'riskPotentialExternalWithSafeguards', nullable: true, type: 'Int' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const Risk = objectType({
  name: 'Risk',
  sourceType: {
    module: '@prisma/client',
    export: 'Risk',
  },
  definition: t => {
    for (const { field, nullable, type } of RiskObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const RiskExtendObject = extendType({
  type: 'Risk',
  definition(t) {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).pipeline();
        return result!;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).createdBy();
        return result!;
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).updatedBy();
        return result!;
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveRiskAuthorized(user);
      }
    })
  }
});

const resolveRiskAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}



export const RiskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('riskById', {
      type: 'Risk',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        return await allocateRisk({ id, ctx });
      }
    })
  }
});


export const RiskPayload = objectType({
  name: 'RiskPayload',
  definition: t => {
    t.field('risk', { type: 'Risk' })
    t.field('error', { type: 'FieldError' })
  },
});


export const RiskMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('editRisk', {
      type: 'RiskPayload',
      args: {
        id: nonNull(stringArg()),
        aerialReview: booleanArg(),
        environmentProximityTo: arg({ type: 'EnvironmentProximityToEnum' }),
        geotechnicalSlopeAngleS1: intArg(),
        geotechnicalFacingS1: arg({ type: 'GeotechnicalFacingEnum' }),
        geotechnicalHeightS1: intArg(),
        geotechnicalSlopeAngleS2: intArg(),
        geotechnicalFacingS2: arg({ type: 'GeotechnicalFacingEnum' }),
        geotechnicalHeightS2: intArg(),
        dateSlopeChecked: arg({ type: 'DateTime' }),
        repairTimeDays: intArg(),
        releaseTimeDays: intArg(),
        oilReleaseCost: floatArg(),
        gasReleaseCost: floatArg(),
        consequencePeople: intArg(),
        probabilityGeo: intArg(),
        safeguardInternalProtection: intArg(),
        safeguardExternalCoating: intArg(),
        comment: stringArg(),
      },
      resolve: async (_, args, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveRiskAuthorized(user);
          if (authorized) {
            const risk = await ctx.prisma.risk.update({
              where: { id: args.id },
              data: {
                aerialReview: args.aerialReview,
                environmentProximityTo: databaseEnumToServerEnum(EnvironmentProximityToEnumMembers, args.environmentProximityTo),
                geotechnicalSlopeAngleS1: args.geotechnicalSlopeAngleS1,
                geotechnicalFacingS1: databaseEnumToServerEnum(GeotechnicalFacingEnumMembers, args.geotechnicalFacingS1),
                geotechnicalHeightS1: args.geotechnicalHeightS1,
                geotechnicalSlopeAngleS2: args.geotechnicalSlopeAngleS2,
                geotechnicalFacingS2: databaseEnumToServerEnum(GeotechnicalFacingEnumMembers, args.geotechnicalFacingS2),
                geotechnicalHeightS2: args.geotechnicalHeightS2,
                dateSlopeChecked: args.dateSlopeChecked,
                repairTimeDays: args.repairTimeDays,
                releaseTimeDays: args.releaseTimeDays,
                oilReleaseCost: args.oilReleaseCost,
                gasReleaseCost: args.gasReleaseCost,
                consequencePeople: args.consequencePeople,
                probabilityGeo: args.probabilityGeo,
                safeguardInternalProtection: args.safeguardInternalProtection,
                safeguardExternalCoating: args.safeguardExternalCoating,
                comment: args.comment,
                updatedById: userId,
              },
            });
            return { risk }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to risk.`,
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
    t.field('addRisk', {
      type: 'RiskPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveRiskAuthorized(user);
          if (authorized) {
            const risk = await ctx.prisma.risk.create({
              data: {
                id,
                createdById: userId,
                updatedById: userId,
              }
            });
            return { risk }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add risk.`,
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
    t.field('deleteRisk', {
      type: 'RiskPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user;
          const authorized = resolveRiskAuthorized(user);
          if (authorized) {
            const risk = await ctx.prisma.risk.delete({
              where: { id }
            });
            return { risk }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete risk.`,
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
    t.field('allocateRisk', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user;
          const authorized = resolveRiskAuthorized(user);
          if (authorized) {
            const allRisks = await ctx.prisma.risk.findMany({
              select: {
                id: true,
              }
            });
            for (const { id } of allRisks) {
              console.log(id);
              await allocateRisk({ id, ctx });
            }
            return {
              success: {
                field: 'Risk',
                message: `Allocated ${allRisks.length} risks`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate risks.`,
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

export const AllocationPayload = objectType({
  name: 'AllocationPayload',
  definition: t => {
    t.field('success', { type: 'FieldError' })
    t.field('error', { type: 'FieldError' })
  },
});
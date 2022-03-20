import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import {
  costPerM3ReleasedCalc,
  consequenceAssetCalc,
  consequenceEnviroCalc,
  probabilityExteriorCalc,
  probabilityInteriorCalc,
  conequenceMaxCalc,
  riskPotentialGeoCalc,
  riskPotentialInternalCalc,
  riskPotentialExternalCalc,
  safeguardPiggingCalc,
  safeguardChemicalInhibitionCalc,
  probabilityInteriorWithSafeguardsCalc,
  riskPotentialInternalWithSafeguardsCalc
} from './RiskCalcs';


export const Risk = objectType({
  name: 'Risk',
  sourceType: {
    module: '@prisma/client',
    export: 'Risk',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).pipeline();
        return result!;
      }
    })
    t.boolean('aerialReview')
    t.field('environmentProximityTo', { type: 'EnvironmentProximityToEnum' })
    t.int('geotechnicalSlopeAngleS1')
    t.field('geotechnicalFacingS1', { type: 'GeotechnicalFacingEnum' })
    t.int('geotechnicalHeightS1')
    t.int('geotechnicalSlopeAngleS2')
    t.field('geotechnicalFacingS2', { type: 'GeotechnicalFacingEnum' })
    t.int('geotechnicalHeightS2')
    t.field('dateSlopeChecked', { type: 'DateTime' })
    t.int('repairTimeDays')
    t.int('releaseTimeDays')
    t.float('costPerM3Released', {
      resolve: async ({ id }, _args, ctx: Context) => await costPerM3ReleasedCalc({ id, ctx })
    })
    t.int('consequenceEnviro', {
      resolve: async ({ id, environmentProximityTo }, _args, ctx: Context) => await consequenceEnviroCalc({ id, environmentProximityTo, ctx })
    })
    t.int('consequenceAsset', {
      resolve: async ({ id, repairTimeDays, oilReleaseCost, gasReleaseCost }, _args, ctx: Context) => await consequenceAssetCalc({ id, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx })
    })
    t.int('probabilityInterior', {
      resolve: async ({ id }, _args, ctx: Context) => await probabilityInteriorCalc({ id, ctx })
    })
    t.int('probabilityExterior', {
      resolve: async ({ id }, _args, ctx: Context) => await probabilityExteriorCalc({ id, ctx })
    })
    t.int('conequenceMax', {
      resolve: async ({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, _args, ctx: Context) => await conequenceMaxCalc({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx })
    })
    t.int('riskPotentialGeo', {
      resolve: async ({ id, riskPeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, _args, ctx: Context) => await riskPotentialGeoCalc({ id, riskPeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx })
    })
    t.int('riskPotentialInternal', {
      resolve: async ({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, _args, ctx: Context) => await riskPotentialInternalCalc({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx })
    })
    t.int('riskPotentialExternal', {
      resolve: async ({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, _args, ctx: Context) => await riskPotentialExternalCalc({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx })
    })
    t.float('oilReleaseCost')
    t.float('gasReleaseCost')
    t.int('riskPeople')
    t.float('probabilityGeo')
    t.boolean('safeguardInternalProtection')
    t.int('safeguardPigging', {
      resolve: async ({ id }, _args, ctx: Context) => await safeguardPiggingCalc({ id, ctx })
    })
    t.int('safeguardChemicalInhibition', {
      resolve: async () => await safeguardChemicalInhibitionCalc()
    })
    t.int('probabilityInteriorWithSafeguards', {
      resolve: async ({ id, safeguardInternalProtection }, _args, ctx: Context) => await probabilityInteriorWithSafeguardsCalc({ id, safeguardInternalProtection, ctx })
    })
    t.int('riskPotentialInternalWithSafeguards', {
      resolve: async ({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, safeguardInternalProtection }, _args, ctx: Context) => await riskPotentialInternalWithSafeguardsCalc({ id, riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, safeguardInternalProtection, ctx })
    })
    t.boolean('safeguardExternalCoating')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).createdBy();
        return result!;
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).updatedBy();
        return result!;
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})

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

export const RiskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('riskById', {
      type: 'Risk',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        });
        return result;
      }
    })
  }
});


export const RiskPayload = objectType({
  name: 'RiskPayload',
  definition(t) {
    t.field('risk', { type: 'Risk' })
    t.field('error', { type: 'FieldError' })
  },
});


export const RiskMutation = extendType({
  type: 'Mutation',
  definition(t) {
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
        riskPeople: intArg(),
        probabilityGeo: floatArg(),
        safeguardInternalProtection: booleanArg(),
        safeguardExternalCoating: booleanArg(),
      },
      resolve: async (_, args, ctx: Context) => {

        const user = ctx.user;

        if (user && ['ADMIN', 'ENGINEER'].includes(user.role)) {

          const { id: userId } = user;

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
              riskPeople: args.riskPeople,
              probabilityGeo: args.probabilityGeo,
              safeguardInternalProtection: args.safeguardInternalProtection,
              safeguardExternalCoating: args.safeguardExternalCoating,
              updatedById: userId,
            },
          });
          return { risk }
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
        if (user && ['ADMIN', 'ENGINEER'].includes(user.role)) {
          const userId = user.id;
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
        if (user && ['ADMIN', 'ENGINEER'].includes(user.role)) {
          const risk = await ctx.prisma.risk.delete({
            where: { id }
          });
          return { risk }
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
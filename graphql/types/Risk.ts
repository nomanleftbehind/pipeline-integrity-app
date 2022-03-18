import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import {
  assetRiskCalc,
  costPerM3ReleasedCalc,
  enviroRiskCalc,
  geoRiskPotentialCalc,
  probabilityExteriorCalc,
  probabilityInteriorCalc,
  internalRiskPotentialCalc,
  externalRiskPotentialCalc,
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
      args: {
        currentSubstance: arg({ type: 'SubstanceEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async (_, { currentSubstance, oil, water, gas }) => costPerM3ReleasedCalc({ currentSubstance, oil, water, gas })
    })
    t.int('enviroRisk', {
      args: {
        currentSubstance: arg({ type: 'SubstanceEnum' }),
        currentStatus: arg({ type: 'StatusEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ environmentProximityTo }, { currentSubstance, currentStatus, oil, water, gas }) => enviroRiskCalc({ environmentProximityTo, currentSubstance, currentStatus, oil, water, gas })
    })
    t.int('assetRisk', {
      args: {
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ repairTimeDays, oilReleaseCost, gasReleaseCost }, { oil, water, gas }) => assetRiskCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas })
    })
    t.int('probabilityInterior', {
      args: {
        currentSubstance: arg({ type: 'SubstanceEnum' }),
        currentStatus: arg({ type: 'StatusEnum' }),
        type: arg({ type: 'TypeEnum' }),
        material: arg({ type: 'MaterialEnum' }),
      },
      resolve: async (_, { currentSubstance, currentStatus, type, material }) => probabilityInteriorCalc({ currentSubstance, currentStatus, type, material })
    })
    t.int('probabilityExterior', {
      args: {
        currentStatus: arg({ type: 'StatusEnum' }),
        firstLicenseDate: arg({ type: 'DateTime' }),
        material: arg({ type: 'MaterialEnum' }),
      },
      resolve: async (_, { currentStatus, firstLicenseDate, material }) => probabilityExteriorCalc({ currentStatus, firstLicenseDate, material })
    })
    t.int('geoRiskPotential', {
      args: {
        currentSubstance: arg({ type: 'SubstanceEnum' }),
        currentStatus: arg({ type: 'StatusEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ riskPeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, { currentSubstance, currentStatus, oil, water, gas }) => geoRiskPotentialCalc({ riskPeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, currentSubstance, currentStatus, oil, water, gas })
    })
    t.int('internalRiskPotential', {
      args: {
        currentSubstance: arg({ type: 'SubstanceEnum' }),
        currentStatus: arg({ type: 'StatusEnum' }),
        type: arg({ type: 'TypeEnum' }),
        material: arg({ type: 'MaterialEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, { currentSubstance, currentStatus, type, material, oil, water, gas }) => internalRiskPotentialCalc({ riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, currentSubstance, currentStatus, type, material, oil, water, gas })
    })
    t.int('externalRiskPotential', {
      args: {
        currentSubstance: arg({ type: 'SubstanceEnum' }),
        currentStatus: arg({ type: 'StatusEnum' }),
        firstLicenseDate: arg({ type: 'DateTime' }),
        material: arg({ type: 'MaterialEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, { currentSubstance, currentStatus, firstLicenseDate, material, oil, water, gas }) => externalRiskPotentialCalc({ riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, currentSubstance, currentStatus, firstLicenseDate, material, oil, water, gas })
    })
    t.float('oilReleaseCost')
    t.float('gasReleaseCost')
    t.int('riskPeople')
    t.float('probabilityGeo')
    t.boolean('safeguardInternalProtection')
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
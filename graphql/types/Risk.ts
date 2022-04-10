import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { totalFluidsCalc } from './Well';
import { totalPipelineFlowRawQuery } from './PipelineFlow';
import { databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import {
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
    t.float('costPerM3Released')
    t.int('consequenceEnviro')
    t.int('consequenceAsset')
    t.int('probabilityInterior')
    t.int('probabilityExterior')
    t.int('consequenceMax')
    t.int('riskPotentialGeo')
    t.int('riskPotentialInternal')
    t.int('riskPotentialExternal')
    t.float('oilReleaseCost')
    t.float('gasReleaseCost')
    t.int('consequencePeople')
    t.float('probabilityGeo')
    t.int('safeguardInternalProtection')
    t.int('safeguardPigging')
    t.int('safeguardChemicalInhibition')
    t.int('probabilityInteriorWithSafeguards')
    t.int('riskPotentialInternalWithSafeguards')
    t.int('safeguardExternalCoating')
    t.string('comment')
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
        console.log('riskById');

        const risk = await ctx.prisma.risk.findUnique({
          where: { id },
          select: {
            environmentProximityTo: true,
            repairTimeDays: true,
            oilReleaseCost: true,
            gasReleaseCost: true,
            consequencePeople: true,
            probabilityGeo: true,
            safeguardInternalProtection: true,
          }
        });

        const lastLicenseChange = await ctx.prisma.licenseChange.findFirst({
          where: { pipelineId: id },
          orderBy: { date: 'desc' },
          select: {
            substance: true,
            status: true,
          },
        });

        const firstLicenseChange = await ctx.prisma.licenseChange.findFirst({
          where: { pipelineId: id },
          orderBy: { date: 'asc' },
          select: { date: true },
        });

        const pipeline = await ctx.prisma.pipeline.findUnique({
          where: { id },
          select: {
            flowCalculationDirection: true,
            type: true,
            material: true,
            piggable: true,
          }
        });

        if (risk && lastLicenseChange && firstLicenseChange && pipeline) {
          const { environmentProximityTo, oilReleaseCost, gasReleaseCost, repairTimeDays, consequencePeople, probabilityGeo, safeguardInternalProtection } = risk;
          const { substance: currentSubstance, status: currentStatus } = lastLicenseChange;
          const { date: firstLicenseDate } = firstLicenseChange;
          const { flowCalculationDirection, type, material, piggable } = pipeline;

          const { oil, water, gas } = (await totalPipelineFlowRawQuery({ idList: [id], flowCalculationDirection, ctx }))[0];
          const totalFluids = await totalFluidsCalc({ oil, water, gas });

          const costPerM3Released = currentSubstance === 'FreshWater' ? 0 : 25000 * water + 1000 * gas + 15000 * oil;

          const consequenceEnviro = await consequenceEnviroCalc({ environmentProximityTo, currentSubstance, currentStatus, totalFluids });

          const consequenceAsset = await consequenceAssetCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, gas, totalFluids });

          const consequenceMax = await conequenceMaxCalc({ consequencePeople, consequenceEnviro, consequenceAsset });

          const probabilityInterior = await probabilityInteriorCalc({ type, material, currentStatus, currentSubstance });

          const probabilityExterior = await probabilityExteriorCalc({ firstLicenseDate, currentStatus, material });

          const riskPotentialGeo = await riskPotentialGeoCalc({ consequenceMax, probabilityGeo });

          const riskPotentialInternal = await riskPotentialInternalCalc({ consequenceMax, probabilityInterior });

          const riskPotentialExternal = await riskPotentialExternalCalc({ consequenceMax, probabilityExterior });

          const safeguardPigging = await safeguardPiggingCalc({ piggable });

          const safeguardChemicalInhibition = await safeguardChemicalInhibitionCalc();

          const probabilityInteriorWithSafeguards = await probabilityInteriorWithSafeguardsCalc({ probabilityInterior, safeguardPigging, safeguardChemicalInhibition, safeguardInternalProtection });

          const riskPotentialInternalWithSafeguards = await riskPotentialInternalWithSafeguardsCalc({ consequenceMax, probabilityInteriorWithSafeguards });

          const result = await ctx.prisma.risk.update({
            where: { id },
            data: {
              costPerM3Released,
              consequenceEnviro,
              consequenceAsset,
              consequenceMax,
              probabilityInterior,
              probabilityExterior,
              riskPotentialGeo,
              riskPotentialInternal,
              riskPotentialExternal,
              safeguardPigging,
              safeguardChemicalInhibition,
              probabilityInteriorWithSafeguards,
              riskPotentialInternalWithSafeguards,
            }
          });
          return result;
        }
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
        consequencePeople: intArg(),
        probabilityGeo: floatArg(),
        safeguardInternalProtection: intArg(),
        safeguardExternalCoating: intArg(),
        comment: stringArg(),
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
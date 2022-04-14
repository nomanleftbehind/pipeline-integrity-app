import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import type { GetGen } from 'nexus/dist/typegenTypeHelpers';
import type { AllNexusOutputTypeDefs } from 'nexus/dist/definitions/wrapping';
import type { NexusMetaType } from 'nexus/dist/definitions/nexusMeta';
import { totalFluidsCalc } from './Well';
import { pipelineFlow } from './PipelineFlow';
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
  riskPotentialInternalWithSafeguardsCalc,
  safeguardCathodicCalc,
  probabilityExteriorWithSafeguardsCalc,
  riskPotentialExternalWithSafeguardsCalc,
} from './RiskCalcs';



export const RiskObjectMembers: { field: string; nullable: boolean; type: GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs | NexusMetaType }[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'aerialReview', nullable: true, type: 'Boolean' },
  { field: 'environmentProximityTo', nullable: true, type: 'EnvironmentProximityToEnum' },
  { field: 'geotechnicalSlopeAngleS1', nullable: true, type: 'Int' },
  { field: 'geotechnicalFacingS1', nullable: true, type: 'GeotechnicalFacingEnum' },
  { field: 'geotechnicalHeightS1', nullable: true, type: 'Int' },
  { field: 'geotechnicalSlopeAngleS2', nullable: true, type: 'Int' },
  { field: 'geotechnicalFacingS2', nullable: true, type: 'GeotechnicalFacingEnum' },
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
  { field: 'probabilityGeo', nullable: true, type: 'Float' },
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
];

export const SearchNavigationObject = objectType({
  name: 'SearchNavigationObject',
  definition(t) {
    t.nonNull.string('field')
    t.nonNull.boolean('nullable')
    t.nonNull.string('type')
  }
});

export const SearchNavigationObjects = objectType({
  name: 'SearchNavigationObjects',
  definition(t) {
    t.nonNull.list.nonNull.field('risk', { type: 'SearchNavigationObject' })
  }
});


export const RiskExtendObject = extendType({
  type: 'Risk',
  definition: t => {
    for (const property of RiskObjectMembers) {
      const { field, nullable, type } = property;
      if (nullable) {
        t.field(field, { type })
      } else {
        t.nonNull.field(field, { type })
      }
    }
  }
});


export const Risk = objectType({
  name: 'Risk',
  sourceType: {
    module: '@prisma/client',
    export: 'Risk',
  },
  definition(t) {
    // t.nonNull.string('id')
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.risk.findUnique({
          where: { id },
        }).pipeline();
        return result!;
      }
    })
    // t.boolean('aerialReview')
    // t.field('environmentProximityTo', { type: 'EnvironmentProximityToEnum' })
    // t.int('geotechnicalSlopeAngleS1')
    // t.field('geotechnicalFacingS1', { type: 'GeotechnicalFacingEnum' })
    // t.int('geotechnicalHeightS1')
    // t.int('geotechnicalSlopeAngleS2')
    // t.field('geotechnicalFacingS2', { type: 'GeotechnicalFacingEnum' })
    // t.int('geotechnicalHeightS2')
    // t.field('dateSlopeChecked', { type: 'DateTime' })
    // t.int('repairTimeDays')
    // t.int('releaseTimeDays')
    // t.float('costPerM3Released')
    // t.int('consequenceEnviro')
    // t.int('consequenceAsset')
    // t.int('probabilityInterior')
    // t.int('probabilityExterior')
    // t.int('consequenceMax')
    // t.int('riskPotentialGeo')
    // t.int('riskPotentialInternal')
    // t.int('riskPotentialExternal')
    // t.float('oilReleaseCost')
    // t.float('gasReleaseCost')
    // t.int('consequencePeople')
    // t.float('probabilityGeo')
    // t.int('safeguardInternalProtection')
    // t.int('safeguardPigging')
    // t.int('safeguardChemicalInhibition')
    // t.int('probabilityInteriorWithSafeguards')
    // t.int('riskPotentialInternalWithSafeguards')
    // t.int('safeguardExternalCoating')
    // t.int('safeguardCathodic')
    // t.int('probabilityExteriorWithSafeguards')
    // t.int('riskPotentialExternalWithSafeguards')
    // t.string('comment')
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
            safeguardExternalCoating: true,
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
          const { environmentProximityTo, oilReleaseCost, gasReleaseCost, repairTimeDays, consequencePeople, probabilityGeo, safeguardInternalProtection, safeguardExternalCoating } = risk;
          const { substance: currentSubstance, status: currentStatus } = lastLicenseChange;
          const { date: firstLicenseDate } = firstLicenseChange;
          const { flowCalculationDirection, type, material, piggable } = pipeline;

          const { oil, water, gas } = (await pipelineFlow({ id, flowCalculationDirection, ctx })) || { oil: 0, water: 0, gas: 0 };

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

          const safeguardCathodic = await safeguardCathodicCalc();

          const probabilityExteriorWithSafeguards = await probabilityExteriorWithSafeguardsCalc({ probabilityExterior, safeguardCathodic, safeguardExternalCoating });

          const riskPotentialExternalWithSafeguards = await riskPotentialExternalWithSafeguardsCalc({ consequenceMax, probabilityExteriorWithSafeguards });

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
              safeguardCathodic,
              probabilityExteriorWithSafeguards,
              riskPotentialExternalWithSafeguards,
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
    t.nonNull.field('searchOptions', {
      type: 'SearchNavigationObjects',
      resolve: () => {
        const risk = RiskObjectMembers as { field: string; nullable: boolean; type: string; }[];
        return { risk }
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
  }
})
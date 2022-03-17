import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { databaseEnumToServerEnum, TypeEnumMembers, MaterialEnumMembers } from './Pipeline';
import { SubstanceEnumMembers, StatusEnumMembers } from './LicenseChange';
import { totalFluidsCalc } from './InjectionPoint';
import { Context } from '../context';

import { Risk as IRisk } from '@prisma/client';
import { NexusGenArgTypes } from '../../node_modules/@types/nexus-typegen/index';

interface IEnviroRiskCalcArgs {
  environmentProximityTo: IRisk['environmentProximityTo'];
  substance: NexusGenArgTypes['Risk']['enviroRisk']['substance'];
  status: NexusGenArgTypes['Risk']['enviroRisk']['status'];
  oil: NexusGenArgTypes['Risk']['enviroRisk']['oil'];
  water: NexusGenArgTypes['Risk']['enviroRisk']['water'];
  gas: NexusGenArgTypes['Risk']['enviroRisk']['gas'];
}


const enviroRiskCalc = ({ environmentProximityTo, substance, status, oil, water, gas }: IEnviroRiskCalcArgs) => {
  substance = databaseEnumToServerEnum(SubstanceEnumMembers, substance);
  status = databaseEnumToServerEnum(StatusEnumMembers, status);
  environmentProximityTo = databaseEnumToServerEnum(EnvironmentProximityToEnumMembers, environmentProximityTo) || null;

  if (oil == null || water == null || gas == null) {
    return null;
  } else {
    const totalFluids = totalFluidsCalc(oil, water, gas);
    if (status === 'Discontinued' || status === 'Abandoned' || substance === 'FreshWater') {
      return 1;
    } else if (substance === 'NaturalGas' || substance === 'FuelGas' || substance === 'SourNaturalGas') {

      if (environmentProximityTo === null) {
        // no water body and no crossing.  (eg. middle of field)
        return totalFluids >= 1 ? 2 : 1;
      } else if (['WC1', 'WB3'].includes(environmentProximityTo)) {
        // WC1 = Ephemeral, WB3 = non-permanent seasonal/temporary wetlands; Fens; Bogs;
        return totalFluids >= 1 ? 3 : 2;
      } else if (environmentProximityTo === 'WC4' || environmentProximityTo === 'WC3' || environmentProximityTo === 'WC2' || environmentProximityTo === 'WB5' || environmentProximityTo === 'WB4') {
        return totalFluids >= 1 ? 4 : 3;
      } else {
        return null;
      }
    } else if (substance === 'OilWellEffluent' || substance === 'CrudeOil' || substance === 'SaltWater' /*|| substance === 'Sour Crude'*/) {
      if (environmentProximityTo === null || environmentProximityTo === 'WB1') {
        return 2;
      } else if (environmentProximityTo === 'WC1' || environmentProximityTo === 'WC2' || environmentProximityTo === 'WB3') {
        return 3;
      } else if (environmentProximityTo === 'WC3' || environmentProximityTo === 'WB4') {
        return 4;
      } else if (environmentProximityTo === 'WC4' || environmentProximityTo === 'WB5') {
        return 5;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

interface IAssetRiskCalcArgs {
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  oil: NexusGenArgTypes['Risk']['assetRisk']['oil'];
  water: NexusGenArgTypes['Risk']['assetRisk']['water'];
  gas: NexusGenArgTypes['Risk']['assetRisk']['gas'];
}

const assetRiskCalc = ({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas }: IAssetRiskCalcArgs) => {
  if (oil == null || water == null || gas == null) {
    return null;
  } else {
    const totalFluids = totalFluidsCalc(oil, water, gas);
    if (totalFluids === 0) {
      return 1;
    } else if (gasReleaseCost != null && oilReleaseCost != null && repairTimeDays != null) {
      const i = (gas * gasReleaseCost + oil * oilReleaseCost) * repairTimeDays
      if (i >= 1_000_000) {
        return 4;
      } else if (i < 1_000_000 && i >= 500_000) {
        return 3;
      } else if (i < 500_000 && i > 0) {
        return 2;
      } else {
        return 1
      }
    } else {
      return null;
    }
  }
}


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
        substance: arg({ type: 'SubstanceEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async (_parent, { substance, oil, water, gas }) => {
        substance = databaseEnumToServerEnum(SubstanceEnumMembers, substance);

        // Use loose unequality to capture both null and undefined
        if (oil != null && water != null && gas != null) {
          return substance === 'FreshWater' ? 0 : 25000 * water + 1000 * gas + 15000 * oil;
        }
        return null;
      }
    })
    t.int('enviroRisk', {
      args: {
        substance: arg({ type: 'SubstanceEnum' }),
        status: arg({ type: 'StatusEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ environmentProximityTo }, { substance, status, oil, water, gas }) => enviroRiskCalc({ environmentProximityTo, substance, status, oil, water, gas })
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
        substance: arg({ type: 'SubstanceEnum' }),
        status: arg({ type: 'StatusEnum' }),
        type: arg({ type: 'TypeEnum' }),
        material: arg({ type: 'MaterialEnum' }),
      },
      resolve: async (_parent, { substance, status, type, material }) => {
        substance = databaseEnumToServerEnum(SubstanceEnumMembers, substance);
        status = databaseEnumToServerEnum(StatusEnumMembers, status);
        type = databaseEnumToServerEnum(TypeEnumMembers, type);
        material = databaseEnumToServerEnum(MaterialEnumMembers, material);

        const isTypeZ245 = type && ['TypeZ2451', 'TypeZ2453'].includes(type);

        if ((status && ['Discontinued', 'Abandoned'].includes(status)) || (material && ['Fiberglass', 'Composite', 'Polyethylene', 'AsbestosCement', 'PolyvinylChloride', 'Aluminum'].includes(material))) {
          return 1;
        } else if (material === 'Steel') {
          if (substance && ['OilWellEffluent', 'SaltWater', 'FreshWater'].includes(substance)) {
            if (isTypeZ245) {
              return 3;
            } else {
              return 4;
            }
          } else if (substance === 'CrudeOil'/* || substance === 'Sour Crude'*/) {
            if (isTypeZ245) {
              return 2;
            } else {
              return 3;
            }
          } else if (substance && ['NaturalGas', 'FuelGas', 'SourNaturalGas'].includes(substance)) {
            if (isTypeZ245) {
              return 1;
            } else {
              return 2;
            }
          } else {
            // Create Error Message
            // MsgBox === 'SUBSTANCE type doesn't exist in vba code.'
            return null;
          }
        } else {
          return null;
        }
      }
    })
    t.int('probabilityExterior', {
      args: {
        status: arg({ type: 'StatusEnum' }),
        firstLicenseDate: arg({ type: 'DateTime' }),
        material: arg({ type: 'MaterialEnum' }),
      },
      resolve: async (_, { status, firstLicenseDate, material }) => {
        if (status === 'Discontinued' || status === 'Abandoned') {
          return 1;
        }
        if (material === 'Steel') {
          let vintage;
          if (firstLicenseDate instanceof Date) {
            vintage = firstLicenseDate.getFullYear();
          }
          if (typeof firstLicenseDate === 'string') {
            vintage = new Date(firstLicenseDate).getFullYear();
          }
          if (typeof vintage === 'number' && vintage > 2000) {
            return 3;
          }
          return 4;
        }
        if (material === 'Fiberglass' || material === 'Composite' || material === 'Polyethylene' || material === 'AsbestosCement' || material === 'PolyvinylChloride' || material === 'Aluminum') {
          return 1;
        }
        return null;
      }
    })
    t.int('geoRiskPotential', {
      args: {
        substance: arg({ type: 'SubstanceEnum' }),
        status: arg({ type: 'StatusEnum' }),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
      },
      resolve: async ({ riskPeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost }, { substance, status, oil, water, gas }) => {
        const enviroRisk = enviroRiskCalc({ environmentProximityTo, substance, status, oil, water, gas });
        const assetRisk = assetRiskCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas });
        const result = Math.max(riskPeople || 1, enviroRisk || 1, assetRisk || 1) * (probabilityGeo || 1);
        return result;
      }
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
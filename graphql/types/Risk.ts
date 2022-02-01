import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
'node_modules\.prisma\client\index.d.ts'
import { Risk as IRisk } from '@prisma/client';
import { databaseEnumToServerEnum, statusResolver, substanceResolver } from './Pipeline';
import { totalFluidsCalc } from './InjectionPoint';
import { totalPipelineFlowRawQuery } from './InjectionPointOptions';
import { getUserId } from '../utils';
import { Context } from '../context';


const riskResolvers = async (parent: IRisk, ctx: Context) => {
  const { id, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost } = parent;
  const { flowCalculationDirection, material, type } = await ctx.prisma.pipeline.findUnique({ where: { id } }) || {};
  const status = await statusResolver(id, ctx);
  const substance = await substanceResolver(id, ctx);
  // This function takes an array of pipeline ids as the first argument and returns an array of `pipeline flow` objects.
  // In this case since first argument array contains only one pipeline id, return value will be an array with only one `pipeline flow` object.
  const { water, oil, gas, } = (await totalPipelineFlowRawQuery([id], flowCalculationDirection || 'Upstream', ctx))[0];
  const totalFluids = totalFluidsCalc(oil, water, gas);

  const enviroRiskCalc = () => {
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

  const assetRiskCalc = () => {
    if (totalFluids === 0) {
      return 1;
    } else {
      const i = (gas * (gasReleaseCost && gasReleaseCost || 0) + oil * (oilReleaseCost && oilReleaseCost || 0)) * (repairTimeDays || 0)
      if (i >= 1_000_000) {
        return 4;
      } else if (i < 1_000_000 && i >= 500_000) {
        return 3;
      } else if (i < 500_000 && i > 0) {
        return 2;
      } else {
        return 1
      }
    }
  }

  const probabilityInteriorCalc = () => {
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


  const enviroRisk = enviroRiskCalc();
  const assetRisk = assetRiskCalc();
  const probabilityInterior = probabilityInteriorCalc();

  const result = {
    costPerM3Released: substance === 'FreshWater' ? 0 : 25000 * water + 1000 * gas + 15000 * oil,
    enviroRisk,
    assetRisk,
    probabilityInterior,
  }
  return result;
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
    t.boolean('arielReview')
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
      resolve: async (parent, _args, ctx: Context) => {
        const { costPerM3Released } = await riskResolvers(parent, ctx);
        return costPerM3Released;
      }
    })
    t.int('enviroRisk', {
      resolve: async (parent, _args, ctx: Context) => {
        const { enviroRisk } = await riskResolvers(parent, ctx);
        return enviroRisk;
      }
    })
    t.int('assetRisk', {
      resolve: async (parent, _args, ctx: Context) => {
        const { assetRisk } = await riskResolvers(parent, ctx);
        return assetRisk;
      }
    })
    t.int('probabilityInterior', {
      resolve: async (parent, _args, ctx: Context) => {
        const { probabilityInterior } = await riskResolvers(parent, ctx);
        return probabilityInterior;
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
    t.list.field('riskById', {
      type: 'Risk',
      args: {
        id: stringArg(),
      },
      resolve: async (_parent, { id }, ctx: Context) => {
        if (id) {
          const result = await ctx.prisma.risk.findMany({
            where: { id },
            orderBy: { createdAt: 'desc' },
          });
          return result;
        } else {
          const result = await ctx.prisma.risk.findMany({
            orderBy:
              { createdAt: 'desc' },
          });
          return result;
        }
      }
    })
  }
})



export const RiskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editRisk', {
      type: 'Risk',
      args: {
        id: nonNull(stringArg()),
        arielReview: booleanArg(),
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
        const userId = getUserId(ctx);

        return ctx.prisma.risk.update({
          where: { id: args.id },
          data: {
            arielReview: args.arielReview,
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
            updatedById: String(userId),
          },
        })

      },
    })
    t.field('addRisk', {
      type: 'Risk',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, { id }, ctx: Context) => {
        const userId = getUserId(ctx);
        return ctx.prisma.risk.create({
          data: {
            id,
            createdById: String(userId),
            updatedById: String(userId),
          }
        })
      }
    })
    t.field('deleteRisk', {
      type: 'Risk',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, { id }, ctx: Context) => {
        return ctx.prisma.risk.delete({
          where: { id }
        })
      }
    })
  }
})
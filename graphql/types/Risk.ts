import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { databaseEnumToServerEnum } from './Pipeline';
import { getUserId } from '../utils';
import { Context } from '../context';

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
        }).pipeline()
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
        }).createdBy()
        return result!;
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
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
    t.list.field('riskByPipelineId', {
      type: 'Risk',
      args: {
        pipelineId: stringArg(),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        if (pipelineId) {
          const result = await ctx.prisma.risk.findMany({
            where: { pipelineId },
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
        pipelineId: nonNull(stringArg()),
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
        console.log(args.arielReview);

        return ctx.prisma.risk.update({
          where: { pipelineId: args.pipelineId },
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
          },
        })

      },
    })
    t.field('addRisk', {
      type: 'Risk',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: (_parent, { pipelineId }, ctx: Context) => {
        const userId = getUserId(ctx);
        return ctx.prisma.risk.create({
          data: {
            pipelineId,
            createdById: String(userId),
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
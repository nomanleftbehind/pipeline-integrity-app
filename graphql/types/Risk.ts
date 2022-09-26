import { objectType, stringArg, extendType, nonNull, inputObjectType, arg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { allocateRisk } from './RiskCalcs';
import { ITableConstructObject } from './SearchNavigation';



export const RiskObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'aerialReview', nullable: true, type: 'Boolean' },
  { field: 'environmentId', nullable: true, type: 'String' },
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
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
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

export const resolveRiskAuthorized = (user: IUser) => {
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

export const EditRiskInput = inputObjectType({
  name: 'EditRiskInput',
  definition(t) {
    t.nonNull.string('id')
    t.boolean('aerialReview')
    t.string('environmentId')
    t.int('repairTimeDays')
    t.int('releaseTimeDays')
    t.float('oilReleaseCost')
    t.float('gasReleaseCost')
    t.int('consequencePeople')
    t.int('probabilityGeo')
    t.int('safeguardInternalProtection')
    t.int('safeguardExternalCoating')
    t.string('comment')
  },
});


export const RiskMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('editRisk', {
      type: 'RiskPayload',
      args: { data: nonNull(arg({ type: 'EditRiskInput' })) },
      resolve: async (_, { data: {
        id, aerialReview, environmentId, repairTimeDays, releaseTimeDays, oilReleaseCost, gasReleaseCost, consequencePeople, probabilityGeo, safeguardInternalProtection, safeguardExternalCoating, comment
      } }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveRiskAuthorized(user);
          if (authorized) {
            const risk = await ctx.prisma.risk.update({
              where: { id },
              data: {
                aerialReview,
                environmentId,
                repairTimeDays,
                releaseTimeDays,
                oilReleaseCost,
                gasReleaseCost,
                consequencePeople,
                probabilityGeo,
                safeguardInternalProtection,
                safeguardExternalCoating,
                comment,
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
import { objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import {
  gasAssociatedLiquidsCalc,
  totalFluidsCalc,
} from './Well';

export const SalesPoint = objectType({
  name: 'SalesPoint',
  sourceType: {
    module: '@prisma/client',
    export: 'SalesPoint',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.nonNull.float('gasAssociatedLiquids', {
      resolve: async ({ gas }) => gasAssociatedLiquidsCalc(gas)
    })
    t.nonNull.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => totalFluidsCalc({ oil, water, gas })
    })
    t.field('firstFlow', { type: 'DateTime' })
    t.field('lastFlow', { type: 'DateTime' })
    t.string('fdcRecId')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('pipeline', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.salesPoint.findUnique({
          where: { id },
        }).pipeline();
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveSalesPointAuthorized(user);
      }
    })
  },
})


const resolveSalesPointAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}


export const SalesPointQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('salespointsByPipelineId', {
      type: 'SalesPoint',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.salesPoint.findMany({
          where: { pipelineId },
          orderBy: { name: 'asc' },
        });
        return result;
      },
    })
  }
})


export const SalesPointCreateInput = inputObjectType({
  name: 'SalesPointCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.field('firstFlow', { type: 'DateTime' })
    t.field('lastFlow', { type: 'DateTime' })
    t.string('fdcRecId')
  },
});


export const SalesPointPayload = objectType({
  name: 'SalesPointPayload',
  definition(t) {
    t.field('salesPoint', { type: 'SalesPoint' })
    t.field('error', { type: 'FieldError' })
  },
});


export const SalesPointMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editSalesPoint', {
      type: 'SalesPointPayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: stringArg(),
        name: stringArg(),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
        firstFlow: arg({ type: 'DateTime' }),
        lastFlow: arg({ type: 'DateTime' }),
        fdcRecId: stringArg()
      },
      resolve: async (_, args, ctx: Context) => {
        const user = ctx.user;
        const authorized = !!user && resolveSalesPointAuthorized(user);
        if (authorized) {
          const salesPoint = await ctx.prisma.salesPoint.update({
            where: { id: args.id },
            data: {
              pipelineId: args.pipelineId || undefined,
              name: args.name || undefined,
              oil: args.oil || undefined,
              water: args.water || undefined,
              gas: args.gas || undefined,
              firstFlow: args.firstFlow,
              lastFlow: args.lastFlow,
              fdcRecId: args.fdcRecId,
              updatedById: user.id,
            },
          })
          return { salesPoint }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      },
    })
  }
});
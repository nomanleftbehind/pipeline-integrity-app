import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg } from 'nexus';
import { databaseEnumToServerEnum } from './Pipeline';
import { getUserId } from '../utils';
import { Context } from '../context';


export const PressureTest = objectType({
  name: 'PressureTest',
  sourceType: {
    module: '@prisma/client',
    export: 'PressureTest',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest
          .findUnique({
            where: { id: parent.id },
          })
          .pipeline()
        return result!
      },
    })
    t.field('limitingSpec', {
      type: 'LimitingSpecEnum',
      resolve: ({ limitingSpec }, _args, ctx: Context) => {
        const result = limitingSpec !== null ? LimitingSpecEnumMembers[limitingSpec] as keyof typeof LimitingSpecEnumMembers : null;
        return result;
      }
    })
    t.field('infoSentOutDate', { type: 'DateTime' })
    t.field('ddsDate', { type: 'DateTime' })
    t.field('pressureTestDate', { type: 'DateTime' })
    t.field('pressureTestReceivedDate', { type: 'DateTime' })
    t.field('integritySheetUpdated', { type: 'DateTime' })
    t.string('comment')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.pressureTest
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})


export const PressureTestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pressureTestsByPipelineId', {
      type: 'PressureTest',
      args: {
        pipelineId: stringArg(),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        if (pipelineId) {
          return ctx.prisma.pressureTest.findMany({
            where: { pipelineId },
            orderBy: { createdAt: 'desc' },
          })
        } else {
          return ctx.prisma.pressureTest.findMany({
            orderBy:
              { createdAt: 'desc' },
          })
        }
      }
    })
  }
})


export const PressureTestMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPressureTest', {
      type: 'PressureTest',
      args: {
        id: nonNull(stringArg()),
        pipelineId: stringArg(),
        limitingSpec: arg({ type: 'LimitingSpecEnum' }),
        infoSentOutDate: arg({ type: 'DateTime' }),
        ddsDate: arg({ type: 'DateTime' }),
        pressureTestDate: arg({ type: 'DateTime' }),
        pressureTestReceivedDate: arg({ type: 'DateTime' }),
        integritySheetUpdated: arg({ type: 'DateTime' }),
        comment: stringArg(),
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.pressureTest.update({
          where: { id: args.id },
          data: {
            pipelineId: args.pipelineId || undefined,
            limitingSpec: databaseEnumToServerEnum(LimitingSpecEnumMembers, args.limitingSpec),
            infoSentOutDate: args.infoSentOutDate || undefined,
            ddsDate: args.ddsDate || undefined,
            pressureTestDate: args.pressureTestDate || undefined,
            pressureTestReceivedDate: args.pressureTestReceivedDate || undefined,
            integritySheetUpdated: args.integritySheetUpdated || undefined,
            comment: args.comment || undefined,
          },
        })

      },
    })
    t.field('addPressureTest', {
      type: 'PressureTest',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: (_parent, { pipelineId }, ctx: Context) => {
        const userId = getUserId(ctx);
        return ctx.prisma.pressureTest.create({
          data: {
            pipelineId: pipelineId,
            createdById: String(userId),
          }
        })
      }
    })
    t.field('deletePressureTest', {
      type: 'PressureTest',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, { id }, ctx: Context) => {
        return ctx.prisma.pressureTest.delete({
          where: { id }
        })
      }
    })
  }
})


export const LimitingSpecEnumMembers = {
  ANSI150: "ANSI 150",
  ANSI300: "ANSI 300",
  ANSI600: "ANSI 600"
}

export const LimitingSpecEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'LimitingSpecEnum',
  },
  name: 'LimitingSpecEnum',
  members: LimitingSpecEnumMembers
});
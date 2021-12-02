import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg } from 'nexus';
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
    t.list.field('pressureTestsById', {
      type: 'PressureTest',
      args: {
        pipelineId: stringArg(),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        if (pipelineId) {
          return ctx.prisma.pressureTest.findMany({
            where: { pipelineId },
            orderBy: { pressureTestDate: 'asc' },
          })
        } else {
          return ctx.prisma.pressureTest.findMany({
            orderBy:
              { pressureTestDate: 'asc' },
          })
        }
      }
    })
  }
})


// export const PigRunMutation = extendType({
// 	type: 'Mutation',
// 	definition(t) {
// 		t.field('editPigRun', {
// 			type: 'PigRun',
// 			args: {
// 				id: nonNull(stringArg()),
// 				pipelineId: stringArg(),
// 				pigType: arg({ type: 'PigTypeEnum' }),
// 				date: arg({ type: 'DateTime' }),
// 				comment: stringArg(),
// 				operatorId: stringArg(),
// 			},
// 			resolve: async (_, args, context: Context) => {
// 				return context.prisma.pigRun.update({
// 					where: { id: args.id },
// 					data: {
// 						pipelineId: args.pipelineId || undefined,
// 						pigType: args.pigType || undefined,
// 						date: args.date || undefined,
// 						comment: args.comment || undefined,
// 						operatorId: args.operatorId || undefined,
// 					},
// 				})

// 			},
// 		})
// 		t.field('deletePigRun', {
// 			type: 'PigRun',
// 			args: {
// 				id: nonNull(stringArg())
// 			},
// 			resolve: (_parent, args, ctx: Context) => {
// 				return ctx.prisma.pigRun.delete({
// 					where: { id: args.id }
// 				})
// 			}
// 		})
// 	}
// })


export const LimitingSpecEnumMembers = {
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
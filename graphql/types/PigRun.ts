import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg } from 'nexus';
import { User } from './User';
import { Pipeline } from './Pipeline';
import { Context } from '../context';


export const PigRun = objectType({
	name: 'PigRun',
	sourceType: {
		module: '@prisma/client',
		export: 'PigRun',
	},
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.field('pipeline', {
			type: Pipeline,
			resolve: async (parent, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun
					.findUnique({
						where: { id: parent.id },
					})
					.pipeline()
				return result!
			},
		})
		t.field('pigType', { type: PigTypeEnum })
		t.field('date', { type: 'DateTime' })
		t.string('comment')
		t.field('operator', {
			type: 'User',
			resolve: async (parent, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun
					.findUnique({
						where: { id: parent.id },
					})
					.operator()
				return result
			},
		})
		t.nonNull.field('createdBy', {
			type: 'User',
			resolve: async (parent, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun
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


export const PigRunQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('pigRunByPipelineId', {
			type: 'PigRun',
			args: {
				pipelineId: nonNull(stringArg())
			},
			resolve: async (_parent, args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findMany({
					where: { pipelineId: args.pipelineId }
				})
				return result;
			},
		})
	}
})


export const PigRunMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('editPigRun', {
			type: 'PigRun',
			args: {
				id: nonNull(stringArg()),
				pipelineId: stringArg(),
				pigType: arg({ type: 'PigTypeEnum' }),
				date: arg({ type: 'DateTime' }),
				comment: stringArg(),
				operatorId: stringArg(),
			},
			resolve: async (_, args, context: Context) => {
				return context.prisma.pigRun.update({
					where: { id: args.id },
					data: {
						pipelineId: args.pipelineId || undefined,
						pigType: args.pigType || undefined,
						date: args.date || undefined,
						comment: args.comment || undefined,
						operatorId: args.operatorId || undefined,
					},
				})

			},
		})
		t.field('deletePigRun', {
			type: 'PigRun',
			args: {
				id: nonNull(stringArg())
			},
			resolve: (_parent, args, ctx: Context) => {
				return ctx.prisma.pigRun.delete({
					where: { id: args.id }
				})
			}
		})
	}
})


export const PigTypeEnumMembers = {
	GSCR: 'GSCR',
	PSCR: 'PSCR',
	Foam: 'Foam',
	Scrapper: 'Scrapper'
}

export const PigTypeEnum = enumType({
	sourceType: {
		module: '@prisma/client',
		export: 'PigTypeEnum',
	},
	name: 'PigTypeEnum',
	members: PigTypeEnumMembers
});
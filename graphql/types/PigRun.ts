import { enumType, objectType, stringArg, extendType, nonNull, arg } from 'nexus';
import { getUserId } from '../utils';
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
			type: 'Pipeline',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).pipeline()
				return result!
			},
		})
		t.field('pigType', { type: 'PigTypeEnum' })
		t.field('date', { type: 'DateTime' })
		t.string('comment')
		t.field('operator', {
			type: 'User',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).operator();
				return result
			},
		})
		t.nonNull.field('createdBy', {
			type: 'User',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).createdBy();
				return result!
			},
		})
		t.nonNull.field('createdAt', { type: 'DateTime' })
		t.nonNull.field('updatedBy', {
			type: 'User',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).updatedBy();
				return result!
			},
		})
		t.nonNull.field('updatedAt', { type: 'DateTime' })
	},
})


export const PigRunQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('pigRunsByPipelineId', {
			type: 'PigRun',
			args: {
				pipelineId: stringArg(),
			},
			resolve: async (_parent, { pipelineId }, ctx: Context) => {
				if (pipelineId) {
					const result = await ctx.prisma.pigRun.findMany({
						where: { pipelineId }
					})
					return result;
				} else {
					const result = await ctx.prisma.pigRun.findMany({
						orderBy: { createdAt: 'desc' }
					})
					return result;
				}
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
			resolve: async (_parent, args, ctx: Context) => {
				const userId = getUserId(ctx);
				return ctx.prisma.pigRun.update({
					where: { id: args.id },
					data: {
						pipelineId: args.pipelineId || undefined,
						pigType: args.pigType || undefined,
						date: args.date || undefined,
						comment: args.comment || undefined,
						operatorId: args.operatorId || undefined,
						updatedById: String(userId),
					},
				})

			},
		})
		t.field('addPigRun', {
			type: 'PigRun',
			args: {
				pipelineId: nonNull(stringArg()),
			},
			resolve: (_parent, { pipelineId }, ctx: Context) => {
				const userId = getUserId(ctx);
				// When adding new pig run entry, date when pig was run is mandatory, so we set it to today as default.
				const date = new Date();
				date.setHours(0, 0, 0, 0);
				return ctx.prisma.pigRun.create({
					data: {
						pipelineId: pipelineId,
						date,
						createdById: String(userId),
						updatedById: String(userId),
					}
				})
			}
		})
		t.field('deletePigRun', {
			type: 'PigRun',
			args: {
				id: nonNull(stringArg()),
			},
			resolve: (_parent, { id }, ctx: Context) => {
				return ctx.prisma.pigRun.delete({
					where: { id }
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
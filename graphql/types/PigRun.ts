import { enumType, objectType, stringArg, extendType, nonNull, arg } from 'nexus';
import { Context } from '../context';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';


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
				}).pipeline();
				return result!
			},
		})
		t.field('pigType', {
			type: 'PigTypeEnum',
			resolve: async ({ pigType }) => {
				const result = pigType && serverEnumToDatabaseEnum(PigTypeEnumMembers, pigType);
				return result;
			}
		})
		t.nonNull.field('dateIn', { type: 'DateTime' })
		t.field('dateOut', { type: 'DateTime' })
		t.field('isolationValveFunctionTest', { type: 'PigInspectionEnum' })
		t.field('pigSenderReceiverInspection', { type: 'PigInspectionEnum' })
		t.string('comment')
		t.field('operator', {
			type: 'User',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).operator();
				return result!
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
});


export const PigRunQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('pigRunsByPipelineId', {
			type: 'PigRun',
			args: {
				pipelineId: nonNull(stringArg()),
			},
			resolve: async (_parent, { pipelineId }, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findMany({
					where: { pipelineId },
					orderBy: { dateIn: 'desc' },
				})
				return result;
			},
		})
	}
});


export const PigRunMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('editPigRun', {
			type: 'PigRun',
			args: {
				id: nonNull(stringArg()),
				pigType: arg({ type: 'PigTypeEnum' }),
				dateIn: arg({ type: 'DateTime' }),
				dateOut: arg({ type: 'DateTime' }),
				isolationValveFunctionTest: arg({ type: 'PigInspectionEnum' }),
				pigSenderReceiverInspection: arg({ type: 'PigInspectionEnum' }),
				comment: stringArg(),
				operatorId: stringArg(),
			},
			resolve: async (_parent, args, ctx: Context) => {
				return ctx.prisma.pigRun.update({
					where: { id: args.id },
					data: {
						pigType: databaseEnumToServerEnum(PigTypeEnumMembers, args.pigType),
						dateIn: args.dateIn || undefined,
						dateOut: args.dateOut,
						isolationValveFunctionTest: args.isolationValveFunctionTest,
						pigSenderReceiverInspection: args.pigSenderReceiverInspection,
						comment: args.comment,
						operatorId: args.operatorId,
						updatedById: String(ctx.user?.id),
					},
				})
			},
		})
		t.field('addPigRun', {
			type: 'PigRun',
			args: {
				pipelineId: nonNull(stringArg()),
			},
			resolve: async (_parent, { pipelineId }, ctx: Context) => {
				const userId = String(ctx.user?.id);
				const pipelinePigRuns = await ctx.prisma.pigRun.findMany({
					where: { pipelineId },
					select: { dateIn: true }
				});
				const dateIn = pipelinePigRuns.reduce(function (a, b) { return a.dateIn > b.dateIn ? a : b; }).dateIn;
				// When adding new pig run entry, date when pig was run is mandatory and has to be unique, so we set it to last pig run date + 1.
				dateIn.setDate(dateIn.getDate() + 1);
				const result = await ctx.prisma.pigRun.create({
					data: {
						pipelineId: pipelineId,
						dateIn,
						createdById: userId,
						updatedById: userId,
					}
				});
				return result;
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
});


export const PigTypeEnumMembers = {
	Scrapper: 'Scrapper',
	PigType4inArgus: '4in Argus',
	PigType6inArgus: '6in Argus',
	ScraperP400: 'Scraper P400',
	PigType3inPurpleScraper: '3in Purple Scraper',
	ScraperP304: 'Scraper P304',
	PigType3inscapper: '3inscapper',
	PigType3inscrapper: '3inscrapper',
	PigType3inscraper: '3in scraper',
	Foam: 'Foam',
	RedStubby: 'Red Stubby',
	PigType3inredstubby: '3in red stubby',
	PigType3inGSCR: '3in GSCR',
	PigType2inGSCR: '2in GSCR',
	NoSender: 'No Sender',
	PigType2ingscr: '2ing scr',
	PigType2inGSCR_GFP: '2in GSCR/GFP',
	PigType4inGSCR: '4in GSCR',
	PigType2inPSCR_FLM: '2in PSCR/FLM',
	PigType3inPSCR: '3in PSCR',
	Highline: 'High line',
	PigType2inPSCR: '2in PSCR',
	PigType3_scrapper: '3:scrapper',
	ScraperP401: 'Scraper P401',
	ScraperP300: 'Scraper P300',
	ScraperP301: 'Scraper P301',
	ScraperP309: 'Scraper P309',
	ScraperP314: 'Scraper P314',
	ScaperP314: 'Scaper P314',
	ScaperPP309: 'Scaper PP309',
	ScraperP204: 'Scraper P204',
	ScraperP208: 'Scraper P208',
	PigType3inArgus: '3in Argus',
	Ball: 'Ball',
	REVERSEFLOWDUETOTAQA: 'REVERSE FLOW DUE TO TAQA',
	PigType3: '3',
	SIMAY2018: 'SI MAY 2018',
	ScraperP206: 'Scraper P206',
	ScraperP200: 'Scraper P200',
	PigType3inRscr: '3in R scr',
	PigType3inPurpleStubby: '3in Purple Stubby',
	PigType3inSCRAPER: '3in SCRAPER',
	Red3inscraper: 'Red 3in scraper',
	PigType3inGreenDisc: '3in Green Disc',
	PigType4inGreenDisc: '4in Green Disc',
	PigType4green2disc: '4green 2 disc',
	PigType4gree2disc: '4 gree 2 disc',
	PigType3ingreendisc: '3in green disc',
	PigType3inpurpledisc: '3in purple disc',
	PigType2inPurpleDisc: '2in Purple Disc',
	disc: 'disc',
	PigType2purple2disc: '2 purple 2 disc',
	Shutin: 'Shut in',
	PigType3inpurple2disc: '3in purple 2 disc',
	PigType2green2disc: '2 green 2 disc',
	bullet: 'bullet',
	PigType8inFoam: '8in Foam',
	PigType3inscr: '3in scr',
	ScraperP305: 'Scraper P305',
	ScraperP312: 'Scraper P312',
	ScraperP303: 'Scraper P303',
	ScraperP311: 'Scraper P311',
	ScrapperP307: 'Scrapper P307',
	PigType4inpurplescraper: '4in  purple scraper',
	Torpedo: 'Torpedo',
	PigType3BrownRibbed: '#3 Brown Ribbed',
	PigType3GreenRibbed: '#3 Green Ribbed',
	PigType3inBlueRibbed: '3in Blue Ribbed',
	PigType3inGreenRibbed: '3in Green Ribbed',
	PigType3BlueRibbed: '#3 Blue Ribbed',
	BlueRibbed: 'Blue Ribbed',
	M_D_Foamy: 'M.D. Foamy',
	PigType6inGreenRibbed: '6in Green Ribbed',
	SI_GOINGTOTAQA: 'SI - GOING TO TAQA',
	Red4inscraper: 'Red 4in scraper',
	Blue3inscraper: 'Blue 3in scraper',
	PigType4inBlueDisc: '4inBlue Disc',
	PigType8inBlackDisc: '8in Black Disc',
	PigType4inGreendisc: '4in Green disc',
	PigType6inGreenDisc: '6in Green Disc',
	PigType6inscrapper: '6in scrapper',
	PigType4inscrapper: '4inscrapper',
	PigType4inFoam: '4in Foam',
	PigType3inredscrape: '3in red scrape',
	GSCR: 'GSCR',
	PigType3inStubby: '3in Stubby',
	PigType4_GreenRibbed: '4: Green Ribbed',
	PigType3inbluescraper: '3in blue scraper',
	PigType6ingreenscraper: '6in green scraper',
	Purple3inDisc: 'Purple 3in Disc',
}

export const PigTypeEnum = enumType({
	sourceType: {
		module: '@prisma/client',
		export: 'PigTypeEnum',
	},
	name: 'PigTypeEnum',
	members: PigTypeEnumMembers
});

export const PigInspectionEnumMembers = {
	Good: 'Good',
	Failed: 'Failed',
}

export const PigInspectionEnum = enumType({
	sourceType: {
		module: '@prisma/client',
		export: 'PigInspectionEnum',
	},
	name: 'PigInspectionEnum',
	members: PigInspectionEnumMembers
});
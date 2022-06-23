import { enumType, objectType, stringArg, extendType, nonNull, arg } from 'nexus';
import { NexusGenObjects } from 'nexus-typegen';
import { Context } from '../context';
import { Prisma, User as IUser, PigRun as IPigRun } from '@prisma/client';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import { ITableConstructObject } from './SearchNavigation';





export const PigTypeEnumMembers = {
	Scrapper: 'Scrapper',
	PigType4inArgus: '4in Argus',
	PigType6inargus: '6in argus',
	PigType6inArgus: '6in Argus',
	ScraperP400: 'Scraper P400',
	PigType3inPurpleScraper: '3in Purple Scraper',
	ScraperP304: 'Scraper P304',
	PigType3inscapper: '3inscapper',
	PigType3inscrapper: '3inscrapper',
	PigType3inscraper: '3in scraper',
	Foam: 'Foam',
	Shutin: 'Shut in',
	RedStubby: 'Red Stubby',
	Redscraper: 'Red scraper',
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
	PigType2inpurple: '2in purple',
	Ball: 'Ball',
	Black3inBall: 'Black 3in Ball',
	PigType3inWhite: '3in White',
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
	PigType4in: '4in',
	PigType3inStubby: '3in Stubby',
	Stubby: 'Stubby',
	PigType3in: '3in',
	redball: 'red ball',
	PigType2inStubby: '2in Stubby',
	PigType1inStubby: '1in Stubby',
	PigType3inBrownRibbed: '3in Brown Ribbed',
	PigType3inGreenRibbed: '3in Green Ribbed',
	PigType3inBlueRibbed: '3in Blue Ribbed',
	BlueRibbed: 'Blue Ribbed',
	M_D_Foamy: 'M.D. Foamy',
	PigType6inGreenRibbed: '6in Green Ribbed',
	BlueinScraper: 'Blue #in Scraper',
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
	PigType4GreenStubby: '4 Green Stubby',
	PigType4_GreenRibbed: '4: Green Ribbed',
	PigType4Green: '#4 Green',
	PigType3inpurplescraper: '3in purple scraper',
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


export const PigTypeEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(PigTypeEnumMembers).map(([serverEnum, databaseEnum]) => {
	return { serverEnum, databaseEnum }
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

export const PigInspectionEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(PigInspectionEnumMembers).map(([serverEnum, databaseEnum]) => {
	return { serverEnum, databaseEnum }
});


export const PigRunObjectFields: ITableConstructObject[] = [
	{ field: 'id', nullable: false, type: 'String' },
	{ field: 'pigType', nullable: true, type: 'PigTypeEnum', enumObjectArray: PigTypeEnumArray },
	{ field: 'dateIn', nullable: false, type: 'DateTime' },
	{ field: 'dateOut', nullable: true, type: 'DateTime' },
	{ field: 'isolationValveFunctionTest', nullable: true, type: 'PigInspectionEnum', enumObjectArray: PigInspectionEnumArray },
	{ field: 'pigSenderReceiverInspection', nullable: true, type: 'PigInspectionEnum', enumObjectArray: PigInspectionEnumArray },
	{ field: 'comment', nullable: true, type: 'String' },
	{ field: 'operatorId', nullable: true, type: 'String' },
	{ field: 'createdAt', nullable: false, type: 'DateTime' },
	{ field: 'updatedAt', nullable: false, type: 'DateTime' },
];



export const PigRun = objectType({
	name: 'PigRun',
	sourceType: {
		module: '@prisma/client',
		export: 'PigRun',
	},
	definition: t => {
		for (const { field, nullable, type } of PigRunObjectFields) {
			const nullability = nullable ? 'nullable' : 'nonNull';

			t[nullability].field(field, {
				type,
				resolve:
					field === 'pigType' ?
						async ({ pigType }) => {
							const result = pigType && serverEnumToDatabaseEnum(PigTypeEnumMembers, pigType);
							return result;
						} :
						undefined,
			})
		}
	}
});


export const PigRunExtendObject = extendType({
	type: 'PigRun',
	definition: t => {
		t.nonNull.field('pipeline', {
			type: 'Pipeline',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).pipeline();
				return result!
			},
		})
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
		t.nonNull.field('updatedBy', {
			type: 'User',
			resolve: async ({ id }, _args, ctx: Context) => {
				const result = await ctx.prisma.pigRun.findUnique({
					where: { id },
				}).updatedBy();
				return result!
			},
		})

		t.nonNull.boolean('authorized', {
			resolve: async ({ createdById }, _args, ctx: Context) => {
				const user = ctx.user;
				return !!user && resolvePigRunAuthorized({ user, createdById });
			}
		})
	},
});

interface IresolvePigRunAuthorizedArgs {
	user: IUser;
	createdById: IPigRun['createdById'];
}

const resolvePigRunAuthorized = ({ user, createdById }: IresolvePigRunAuthorizedArgs) => {
	const { role, id } = user;
	return role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdById === id);
}


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


export const PigRunPayload = objectType({
	name: 'PigRunPayload',
	definition(t) {
		t.field('pigRun', { type: 'PigRun' })
		t.field('error', { type: 'FieldError' })
	},
});


export const PigRunMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('editPigRun', {
			type: 'PigRunPayload',
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

				const user = ctx.user;

				if (user) {
					const { id: userId, role, firstName } = user;

					if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {

						const currentPigRun = await ctx.prisma.pigRun.findUnique({
							where: { id: args.id },
							select: {
								createdById: true,
								dateIn: true,
								dateOut: true,
							}
						});

						if (currentPigRun) {

							const { createdById, dateIn, dateOut } = currentPigRun;

							if (role === 'OPERATOR' && createdById !== userId) {
								return {
									error: {
										field: 'Pig run Created By',
										message: `Hi ${firstName}. Your user privilages do not allow you to edit pig run entries not authored by you.`,
									}
								}
							}

							if (args.dateOut && args.dateOut.getTime() < dateIn.getTime()) {
								return {
									error: {
										field: 'Pig run date out',
										message: `Pig out date ${args.dateOut.toISOString().split('T')[0]} you are trying to enter is before pig in date ${dateIn.toISOString().split('T')[0]} which is impossible. Change pig in date first before entering pig out date.`,
									}
								}
							}

							if (args.dateIn && dateOut && args.dateIn.getTime() > dateOut.getTime()) {
								return {
									error: {
										field: 'Pig run date in',
										message: `Pig in date ${args.dateIn.toISOString().split('T')[0]} you are trying to enter is after pig out date ${dateOut.toISOString().split('T')[0]} which is impossible. Change or delete pig out date first before entering pig in date.`,
									}
								}
							}
						}
						try {
							const pigRun = await ctx.prisma.pigRun.update({
								where: { id: args.id },
								data: {
									pigType: databaseEnumToServerEnum(PigTypeEnumMembers, args.pigType),
									dateIn: args.dateIn || undefined,
									dateOut: args.dateOut,
									isolationValveFunctionTest: args.isolationValveFunctionTest,
									pigSenderReceiverInspection: args.pigSenderReceiverInspection,
									comment: args.comment,
									operatorId: args.operatorId,
									updatedById: userId,
								},
							});
							return { pigRun }
						} catch (e) {
							if (e instanceof Prisma.PrismaClientKnownRequestError) {
								if (e.code === 'P2003') {
									return {
										error: {
											field: Object.keys(args)[1],
											message: "Foreign table field doesn't contain specified ID.",
										}
									}
								}
							}
							throw e;
						}
					}
					return {
						error: {
							field: 'User',
							message: `Hi ${firstName}, you are not authorized to make changes to pig runs.`,
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
		t.field('addPigRun', {
			type: 'PigRunPayload',
			args: {
				pipelineId: nonNull(stringArg()),
			},
			resolve: async (_parent, { pipelineId }, ctx: Context) => {

				const user = ctx.user;
				if (user) {
					const { id: userId, role, firstName } = user;
					if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
						const today = new Date();
						today.setUTCHours(0, 0, 0, 0);
						const pigRun = await ctx.prisma.pigRun.create({
							data: {
								pipelineId: pipelineId,
								dateIn: today,
								createdById: userId,
								updatedById: userId,
							}
						});
						return { pigRun };
					}
					return {
						error: {
							field: 'User',
							message: `Hi ${firstName}, you are not authorized to add pig runs.`,
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
		t.field('deletePigRun', {
			type: 'PigRunPayload',
			args: {
				id: nonNull(stringArg()),
			},
			resolve: async (_parent, { id }, ctx: Context) => {

				const user = ctx.user;

				if (user) {
					const { id: userId, firstName, role } = user;
					if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') {
						if (role === 'OPERATOR') {
							const currentPigRun = await ctx.prisma.pigRun.findUnique({
								where: { id },
								select: {
									createdById: true,
								}
							});
							if (currentPigRun && currentPigRun.createdById !== userId) {
								return {
									error: {
										field: 'Pig run created by',
										message: `Hi ${firstName}. Your user privilages do not allow you to delete pig runs not authored by you.`,
									}
								}
							}
						}
						const pigRun = await ctx.prisma.pigRun.delete({
							where: { id }
						});
						return { pigRun }
					}
					return {
						error: {
							field: 'User',
							message: `Hi ${firstName}, you are not authorized to delete pig runs.`,
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
});


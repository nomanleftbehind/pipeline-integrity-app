import { enumType, intArg, objectType, stringArg, extendType, inputObjectType, nonNull, arg, floatArg } from 'nexus';
import { User } from './User';
import { Satellite, SatelliteUniqueInput } from './Satellite';
import { InjectionPoint, InjectionPointCreateInput } from './InjectionPoint';
import { Context } from '../context';


export const Pipeline = objectType({
  name: 'Pipeline',
  sourceType: {
    module: '@prisma/client',
    export: 'Pipeline',
  },
  definition(t) {
    t.nonNull.string('id')
    t.int('index')
    t.nonNull.field('satellite', {
      type: Satellite,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline
          .findUnique({
            where: { id: parent.id },
          })
          .satellite()
        return result!
      },
    })
    t.nonNull.list.nonNull.field('injectionPoints', {
      type: InjectionPoint,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.pipeline
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .injectionPoints()
      },
    })
    t.nonNull.string('license')
    t.nonNull.string('segment')
    t.nonNull.field('substance', {
      type: SubstanceEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.substance as keyof typeof SubstanceEnumMembers;
        const result = SubstanceEnumMembers[parent.substance] as keyof typeof SubstanceEnumMembers;
        return result;
      }
    })
    t.nonNull.string('from')
    t.field('fromFeature', {
      type: FromToFeatureEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.fromFeature as keyof typeof FromToFeatureEnumMembers;
        const result = parent.fromFeature !== null ? FromToFeatureEnumMembers[parent.fromFeature] as keyof typeof FromToFeatureEnumMembers : null;
        return result;
      }
    })
    t.nonNull.string('to')
    t.field('toFeature', {
      type: FromToFeatureEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.toFeature as keyof typeof FromToFeatureEnumMembers;
        const result = parent.toFeature !== null ? FromToFeatureEnumMembers[parent.toFeature] as keyof typeof FromToFeatureEnumMembers : null;
        return result;
      }
    })
    t.nonNull.field('status', {
      type: StatusEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.status as keyof typeof StatusEnumMembers;
        const result = StatusEnumMembers[parent.status] as keyof typeof StatusEnumMembers;
        return result;
      }
    })
    t.nonNull.float('length')
    t.field('type', {
      type: TypeEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.type as keyof typeof TypeEnumMembers;
        const result = parent.type !== null ? TypeEnumMembers[parent.type] as keyof typeof TypeEnumMembers : null;
        return result;
      }
    })
    t.field('grade', {
      type: GradeEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.grade as keyof typeof GradeEnumMembers;
        const result = parent.grade !== null ? GradeEnumMembers[parent.grade] as keyof typeof GradeEnumMembers : null;
        return result;
      }
    })
    t.float('outsideDiameter')
    t.float('wallThickness')
    t.field('material', {
      type: MaterialEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.material as keyof typeof MaterialEnumMembers;
        const result = parent.material !== null ? MaterialEnumMembers[parent.material] as keyof typeof MaterialEnumMembers : null;
        return result;
      }
    })
    t.int('mop')
    t.field('internalProtection', {
      type: InternalProtectionEnum,
      resolve: (parent, _args, ctx: Context) => {
        // const parentKey = parent.internalProtection as keyof typeof InternalProtectionEnumMembers;
        const result = parent.internalProtection !== null ? InternalProtectionEnumMembers[parent.internalProtection] as keyof typeof InternalProtectionEnumMembers : null;
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()
        return result!;
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.list.nonNull.field('upstream', {
      type: Pipeline,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.pipeline
          .findMany({
            where: { downstream: { some: { id: parent.id || undefined } } },
          })
      },
    })
    t.nonNull.list.nonNull.field('downstream', {
      type: Pipeline,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.pipeline
          .findMany({
            where: { upstream: { some: { id: parent.id || undefined } } },
          })
      },
    })
  },
});


export const SubstanceEnumMembers = {
  NaturalGas: "Natural Gas",
  FreshWater: "Fresh Water",
  SaltWater: "Salt Water",
  CrudeOil: "Crude Oil",
  OilWellEffluent: "Oil Well Effluent",
  LVPProducts: "LVP Products",
  FuelGas: "Fuel Gas",
  SourNaturalGas: "Sour Natural Gas"
}

export const SubstanceEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'SubstanceEnum',
  },
  name: 'SubstanceEnum',
  members: SubstanceEnumMembers
});


export const FromToFeatureEnumMembers = {
  BlindEnd: "Blind end",
  Battery: "Battery",
  "Pipeline": "Pipeline",
  "Satellite": "Satellite",
  StorageTank: "Storage tank",
  InjectionPlant: "Injection plant",
  Well: "Well",
  CompressorStation: "Compressor station",
  MeterStation: "Meter station",
  PumpStation: "Pump station",
  GasProcessingPlant: "Gas processing plant",
  UndergroundCapOrTieIn: "Underground cap or tie-in",
  Header: "Header"
}

export const FromToFeatureEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'FromToFeatureEnum',
  },
  name: 'FromToFeatureEnum',
  members: FromToFeatureEnumMembers
});


export const StatusEnumMembers = {
  Operating: "Operating",
  Discontinued: "Discontinued",
  Abandoned: "Abandoned",
  Removed: "Removed",
  ToBeConstructed: "To Be Constructed",
  Active: "Active",
  Cancelled: "Cancelled",
  New: "New",
  NotConstructed: "Not Constructed"
}

export const StatusEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'StatusEnum',
  },
  name: 'StatusEnum',
  members: StatusEnumMembers
});

export const TypeEnumMembers = {
  Type515: "To Be Constructed",
  Type2306: "2306",
  Type3406: "3406",
  Type3408: "3408",
  Type6063: "6063",
  Type6351: "6351",
  Type5A: "5A",
  Type5L: "5L",
  Type5LX: "5LX",
  TypeA106: "A106",
  TypeA120: "A120",
  TypeA53: "A53",
  TypeAMERON: "AMERON",
  TypeB515: "B515",
  TypeB51S: "B51S",
  TypeB5IS: "B5IS",
  TypeCENTRON: "CENTRON",
  TypeCIBA: "CIBA",
  TypeFSLP: "FSLP",
  TypeREDTHR: "REDTHR",
  TypeSMITH: "SMITH",
  TypeSTAR: "STAR",
  TypeTBS: "TBS",
  TypeWSLP: "WSLP",
  TypeZ2451: "Z245.1",
  TypeZ2453: "Z245.3",
}

export const TypeEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'TypeEnum',
  },
  name: 'TypeEnum',
  members: TypeEnumMembers
});

export const GradeEnumMembers = {
  GradeA: "A",
  Grade3592: "3592",
  GradeB: "B",
  GradeX42: "X42",
  GradeBW1: "BW1",
  Grade2500: "2500",
  Grade3591: "3591",
  Grade2901: "2901",
  GradeT4: "T4",
  Grade300: "300",
  Grade3593: "3593",
  Grade11: "11",
  GradeJ55: "J55",
  Grade2250: "2250",
  GradeX52: "X52",
  Grade2750: "2750",
  Grade2902: "2902",
  Grade25: "25",
  Grade241: "241",
  Grade2413: "2413",
  Grade2411: "2411",
  Grade155: "155",
  Grade150: "150",
  Grade1000: "1000",
  Grade800: "800",
  GradeT1A: "T1A",
  Grade2010: "2010",
  GradeT4A: "T4A",
  Grade1250: "1250",
  Grade17: "17",
  Grade900: "900",
  GradeT1B: "T1B",
  Grade810: "810",
  Grade35: "35",
  Grade5: "5",
  Grade9: "9",
  Grade200: "200",
  Grade1200: "1200",
  Grade1103: "11.03",
}

export const GradeEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'GradeEnum',
  },
  name: 'GradeEnum',
  members: GradeEnumMembers
});

export const MaterialEnumMembers = {
  Steel: "Steel",
  PolyvinylChloride: "Polyvinyl Chloride",
  Composite: "Composite",
  Fiberglass: "Fiberglass",
  Aluminum: "Aluminum",
  Polyethylene: "Polyethylene",
  CelluloseAcetateButyrate: "Cellulose Acetate Butyrate",
  Unknown: "Unknown",
  AsbestosCement: "Asbestos Cement"
}

export const MaterialEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'MaterialEnum',
  },
  name: 'MaterialEnum',
  members: MaterialEnumMembers
});

export const InternalProtectionEnumMembers = {
  Uncoated: "Uncoated",
  FreeStandingSlipLined: "Free Standing (Slip Lined)",
  Unknown: "Unknown",
  Cement: "Cement",
  ExpandedPolyethylene: "Expanded Polyethylene",
  ThinFilm: "Thin Film",
}

export const InternalProtectionEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'InternalProtectionEnum',
  },
  name: 'InternalProtectionEnum',
  members: InternalProtectionEnumMembers
});


export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: Pipeline,
    });
  },
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo });
    t.list.field('edges', {
      type: Edge,
    });
  },
});

export const PipelineQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allPipelines', {
      type: Pipeline,
      resolve: async (_parent, _args, context: Context) => {
        const result = await context.prisma.pipeline.findMany()
        return result;
      },
    })
    t.field('pipelines', {
      type: Response,
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx: Context) {
        console.log("Argssss if", args);
        let queryResults = null;
        if (args.after) {
          queryResults = await ctx.prisma.pipeline.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
            orderBy: {
              index: 'asc',
            },
          });
        } else {
          queryResults = await ctx.prisma.pipeline.findMany({
            take: args.first,
            orderBy: {
              index: 'asc',
            },
          });
        }

        if (queryResults.length > 0) {
          // last element
          const lastPipelineInResults = queryResults[queryResults.length - 1];
          // cursor we'll return
          const myCursor = lastPipelineInResults.id;

          // queries after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.pipeline.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
            orderBy: {
              index: 'asc',
            },
          });

          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges: queryResults.map((pipeline) => ({
              cursor: pipeline.id,
              node: pipeline,
            })),
          };
          return result;
        }
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});


export const PipelineUniqueInput = inputObjectType({
  name: 'PipelineUniqueInput',
  definition(t) {
    t.string('id')
    t.nonNull.string('license')
    t.nonNull.string('segment')
  },
})

export const PipelineCreateInput = inputObjectType({
  name: 'PipelineCreateInput',
  definition(t) {
    t.list.nonNull.field('injectionPoints', { type: InjectionPointCreateInput })
    t.nonNull.string('license')
    t.nonNull.string('segment')
    t.nonNull.field('substance', { type: SubstanceEnum })
    t.nonNull.string('from')
    t.field('fromFeature', { type: FromToFeatureEnum })
    t.nonNull.string('to')
    t.field('toFeature', { type: FromToFeatureEnum })
    t.nonNull.field('status', { type: StatusEnum })
    t.nonNull.float('length')
    t.field('type', { type: TypeEnum })
    t.field('grade', { type: GradeEnum })
    t.float('outsideDiameter')
    t.float('wallThickness')
    t.field('material', { type: MaterialEnum })
    t.int('mop')
    t.field('internalProtection', { type: InternalProtectionEnum })
    t.list.nonNull.field('upstream', { type: PipelineCreateInput })
    t.list.nonNull.field('downstream', { type: PipelineCreateInput })
  },
})


type Enums = typeof SubstanceEnumMembers | typeof FromToFeatureEnumMembers | typeof StatusEnumMembers | typeof TypeEnumMembers | typeof GradeEnumMembers | typeof MaterialEnumMembers | typeof InternalProtectionEnumMembers

function databaseEnumToServerEnum<T extends Enums>(object: T, value: T[keyof T] | null | undefined) {
  const keys = Object.keys(object) as (keyof T)[];
  const result = keys.find(key => object[key] === value);
  return result;
}

export const PipelineMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPipeline', {
      type: Pipeline,
      args: {
        id: nonNull(stringArg()),
        satelliteUniqueInput: arg({ type: SatelliteUniqueInput }),
        license: stringArg(),
        segment: stringArg(),
        substance: arg({ type: SubstanceEnum }),
        from: stringArg(),
        fromFeature: arg({ type: FromToFeatureEnum }),
        to: stringArg(),
        toFeature: arg({ type: FromToFeatureEnum }),
        status: arg({ type: StatusEnum }),
        length: floatArg(),
        type: arg({ type: TypeEnum }),
        grade: arg({ type: GradeEnum }),
        outsideDiameter: floatArg(),
        wallThickness: floatArg(),
        material: arg({ type: MaterialEnum }),
        mop: intArg(),
        internalProtection: arg({ type: InternalProtectionEnum })
      },
      resolve: async (_, args, context: Context) => {
        try {
          return context.prisma.pipeline.update({
            where: { id: args.id },
            data: {
              satellite: args.satelliteUniqueInput ? {
                connect: {
                  id: args.satelliteUniqueInput.id || undefined,
                  name: args.satelliteUniqueInput.name || undefined,
                }
              } : undefined,
              license: args.license || undefined,
              segment: args.segment || undefined,
              substance: databaseEnumToServerEnum(SubstanceEnumMembers, args.substance),
              from: args.from || undefined,
              fromFeature: databaseEnumToServerEnum(FromToFeatureEnumMembers, args.fromFeature),
              to: args.to || undefined,
              toFeature: databaseEnumToServerEnum(FromToFeatureEnumMembers, args.toFeature),
              status: databaseEnumToServerEnum(StatusEnumMembers, args.status),
              length: args.length || undefined,
              type: databaseEnumToServerEnum(TypeEnumMembers, args.type),
              grade: databaseEnumToServerEnum(GradeEnumMembers, args.grade),
              outsideDiameter: args.outsideDiameter || undefined,
              wallThickness: args.wallThickness || undefined,
              material: databaseEnumToServerEnum(MaterialEnumMembers, args.material),
              mop: args.mop || undefined,
              internalProtection: databaseEnumToServerEnum(InternalProtectionEnumMembers, args.internalProtection),
            },
          })
        } catch (e) {
          throw new Error(
            `Pipeline with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })
    t.nonNull.field('deletePipeline', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        
        try {
          
          return ctx.prisma.pipeline.delete({
            where: { id: args.id },
          })
        } catch (e) {
          console.log(args.id);
          throw new Error(
            `Error ${e} Pipeline with ID ${args.id} is fucked.`,
          )
        }
      },
    })
  }
})
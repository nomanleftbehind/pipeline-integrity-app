import { enumType, intArg, objectType, stringArg, extendType, inputObjectType, nonNull, arg, floatArg, booleanArg } from 'nexus';
import { Context } from '../context';
import { Pipeline as IPipeline } from '@prisma/client';
import { StatusEnumMembers, SubstanceEnumMembers } from './LicenseChange';



export const Pipeline = objectType({
  name: 'Pipeline',
  sourceType: {
    module: '@prisma/client',
    export: 'Pipeline',
  },
  definition(t) {
    t.nonNull.string('id')
    t.field('satellite', {
      type: 'Satellite',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).satellite();
        return result!
      },
    })
    t.list.field('injectionPoints', {
      type: 'InjectionPoint',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.pipeline.findUnique({
          where: { id: id || undefined },
        }).injectionPoints();
      },
    })
    t.nonNull.string('license')
    t.nonNull.string('segment')
    t.nonNull.field('flowCalculationDirection', { type: 'FlowCalculationDirectionEnum' })
    t.nonNull.string('from')
    t.field('fromFeature', {
      type: 'FromToFeatureEnum',
      resolve: ({ fromFeature }) => {
        const result = fromFeature && serverEnumToDatabaseEnum(FromToFeatureEnumMembers, fromFeature);
        return result;
      }
    })
    t.nonNull.string('to')
    t.field('toFeature', {
      type: 'FromToFeatureEnum',
      resolve: ({ toFeature }) => {
        const result = toFeature && serverEnumToDatabaseEnum(FromToFeatureEnumMembers, toFeature);
        return result;
      }
    })
    t.field('status', {
      type: 'StatusEnum',
      resolve: async ({ id }, _args, ctx: Context) => {
        const { status } = await ctx.prisma.licenseChange.findFirst({
          where: { pipelineId: id },
          orderBy: { date: 'desc' },
          select: { status: true },
        }) || {};
        const result = status && serverEnumToDatabaseEnum(StatusEnumMembers, status) || null;
        return result;
      }
    })
    t.field('substance', {
      type: 'SubstanceEnum',
      resolve: async ({ id }, _args, ctx: Context) => {
        const { substance } = await ctx.prisma.licenseChange.findFirst({
          where: { pipelineId: id },
          orderBy: { date: 'desc' },
          select: { substance: true },
        }) || {};

        const result = substance && serverEnumToDatabaseEnum(SubstanceEnumMembers, substance) || null;
        return result;
      }
    })
    t.field('licenseDate', { type: 'DateTime' })
    t.nonNull.float('length')
    t.field('type', {
      type: 'TypeEnum',
      resolve: ({ type }) => {
        const result = type && serverEnumToDatabaseEnum(TypeEnumMembers, type);
        return result;
      }
    })
    t.field('grade', {
      type: 'GradeEnum',
      resolve: ({ grade }) => {
        const result = grade && serverEnumToDatabaseEnum(GradeEnumMembers, grade);
        return result;
      }
    })
    t.int('yieldStrength')
    t.float('outsideDiameter')
    t.float('wallThickness')
    t.field('material', {
      type: 'MaterialEnum',
      resolve: ({ material }) => {
        const result = material && serverEnumToDatabaseEnum(MaterialEnumMembers, material);
        return result;
      }
    })
    t.int('mop')
    t.field('internalProtection', {
      type: 'InternalProtectionEnum',
      resolve: ({ internalProtection }) => {
        const result = internalProtection && serverEnumToDatabaseEnum(InternalProtectionEnumMembers, internalProtection);
        return result;
      }
    })
    t.boolean('piggable')
    t.int('piggingFrequency')
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).createdBy()
        return result!;
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).updatedBy()
        return result!;
      },
    })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.list.field('pressureTests', {
      type: 'PressureTest',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).pressureTests();
        return result;
      },
    })
    t.list.field('pigRuns', {
      type: 'PigRun',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).pigRuns();
        return result;
      },
    })
    t.list.field('licenseChanges', {
      type: 'LicenseChange',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).licenseChanges();
        return result;
      }
    })
    t.field('risk', {
      type: 'Risk',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).risk();
        return result;
      }
    })
    t.list.field('upstream', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.pipeline.findMany({
          where: { downstream: { some: { id } } },
        })
      },
    })
    t.list.field('downstream', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.pipeline.findMany({
          where: { upstream: { some: { id } } },
        })
      },
    })
  },
});



export const FromToFeatureEnumMembers = {
  BlindEnd: "Blind end",
  Battery: "Battery",
  Pipeline: "Pipeline",
  Satellite: "Satellite",
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

export const TypeEnumMembers = {
  Type515: "515",
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

export const FlowCalculationDirectionEnumMembers = {
  Upstream: 'Upstream',
  Downstream: 'Downstream',
}

export const FlowCalculationDirectionEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'FlowCalculationDirectionEnum',
  },
  name: 'FlowCalculationDirectionEnum',
  members: FlowCalculationDirectionEnumMembers
});

export const PipelineQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('pipelineById', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg())
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.pipeline.findUnique({
          where: { id: args.id }
        })
      }
    })
    t.list.field('pipelinesById', {
      type: 'Pipeline',
      args: {
        table: stringArg(),
        id: stringArg(),
      },
      resolve: async (_parent, { id, table }, ctx: Context) => {
        if (table === 'satellite') {
          return ctx.prisma.pipeline.findMany({
            where: { satelliteId: id },
            orderBy: [
              { license: 'asc' },
              { segment: 'asc' },
            ]
          })
        } else if (table === 'facility' && id === 'no-facility') {
          return ctx.prisma.pipeline.findMany({
            where: {
              satellite: { facilityId: null }
            },
            orderBy: [
              { license: 'asc' },
              { segment: 'asc' },
            ]
          })
        } else if (table === 'facility' && id) {
          return ctx.prisma.pipeline.findMany({
            where: {
              satellite: { facilityId: id }
            },
            orderBy: [
              { license: 'asc' },
              { segment: 'asc' },
            ]
          })
        } else {
          return ctx.prisma.pipeline.findMany({
            orderBy: [
              { license: 'asc' },
              { segment: 'asc' },
            ]
          })
        }
      }
    })
  },
});


export const PipelineUniqueInput = inputObjectType({
  name: 'PipelineUniqueInput',
  definition(t) {
    t.string('id')
    t.string('license')
    t.string('segment')
  },
})

export const PipelineCreateInput = inputObjectType({
  name: 'PipelineCreateInput',
  definition(t) {
    t.list.field('injectionPoints', { type: 'InjectionPointCreateInput' })
    t.nonNull.string('license')
    t.nonNull.string('segment')
    t.nonNull.string('from')
    t.field('fromFeature', { type: 'FromToFeatureEnum' })
    t.nonNull.string('to')
    t.field('toFeature', { type: 'FromToFeatureEnum' })
    t.nonNull.float('length')
    t.field('type', { type: 'TypeEnum' })
    t.field('grade', { type: 'GradeEnum' })
    t.float('outsideDiameter')
    t.float('wallThickness')
    t.field('material', { type: 'MaterialEnum' })
    t.int('mop')
    t.field('internalProtection', { type: 'InternalProtectionEnum' })
    t.list.field('upstream', { type: 'PipelineCreateInput' })
    t.list.field('downstream', { type: 'PipelineCreateInput' })
  },
})


export function serverEnumToDatabaseEnum<T>(object: T, key: keyof T) {
  return object[key] as unknown as keyof T;
}

export function databaseEnumToServerEnum<T>(object: T, value: T[keyof T] | null | undefined) {
  // This step is necessary because otherwise, function would return undefined if null was passed for value.
  // In GraphQL and context of this function, undefined means `do nothing`, null means set field to null.
  if (value === null) {
    return null;
  }
  const keys = Object.keys(object) as (keyof T)[];
  const result = keys.find(key => object[key] === value);
  return result;
}


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type IPipelinePartialBy = PartialBy<IPipeline, 'id' | 'createdAt' | 'updatedAt'>

export const PipelineMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPipeline', {
      type: Pipeline,
      args: {
        id: nonNull(stringArg()),
        satelliteId: stringArg(),
        license: stringArg(),
        segment: stringArg(),
        flowCalculationDirection: arg({ type: 'FlowCalculationDirectionEnum' }),
        from: stringArg(),
        fromFeature: arg({ type: 'FromToFeatureEnum' }),
        to: stringArg(),
        toFeature: arg({ type: 'FromToFeatureEnum' }),
        licenseDate: arg({ type: 'DateTime' }),
        length: floatArg(),
        type: arg({ type: 'TypeEnum' }),
        grade: arg({ type: 'GradeEnum' }),
        yieldStrength: intArg(),
        outsideDiameter: floatArg(),
        wallThickness: floatArg(),
        material: arg({ type: 'MaterialEnum' }),
        mop: intArg(),
        internalProtection: arg({ type: 'InternalProtectionEnum' }),
        piggable: booleanArg(),
        piggingFrequency: intArg(),
      },
      resolve: async (_, args, ctx: Context) => {
        try {
          return ctx.prisma.pipeline.update({
            where: { id: args.id },
            data: {
              satelliteId: args.satelliteId || undefined,
              license: args.license || undefined,
              segment: args.segment || undefined,
              flowCalculationDirection: args.flowCalculationDirection || undefined,
              from: args.from || undefined,
              fromFeature: databaseEnumToServerEnum(FromToFeatureEnumMembers, args.fromFeature),
              to: args.to || undefined,
              toFeature: databaseEnumToServerEnum(FromToFeatureEnumMembers, args.toFeature),
              length: args.length || undefined,
              type: databaseEnumToServerEnum(TypeEnumMembers, args.type),
              grade: databaseEnumToServerEnum(GradeEnumMembers, args.grade),
              yieldStrength: args.yieldStrength,
              outsideDiameter: args.outsideDiameter,
              wallThickness: args.wallThickness,
              material: databaseEnumToServerEnum(MaterialEnumMembers, args.material),
              mop: args.mop,
              internalProtection: databaseEnumToServerEnum(InternalProtectionEnumMembers, args.internalProtection),
              piggable: args.piggable,
              piggingFrequency: args.piggingFrequency,
              updatedById: String(ctx.user?.id),
            },
          })
        } catch (e) {
          throw new Error(
            `Pipeline with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })
    t.field('deletePipeline', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.pipeline.delete({
          where: { id: args.id },
        })
      },
    })
    t.field('duplicatePipeline', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {
        const userId = String(ctx.user?.id);
        const p = await ctx.prisma.pipeline.findUnique({
          where: { id }
        }) as IPipelinePartialBy
        if (p) {
          p.license += '_copy';
          p.segment += '_copy';
          delete p.id;
          delete p.createdAt;
          delete p.updatedAt;
          p.createdById = userId;
          p.updatedById = userId;
          return ctx.prisma.pipeline.create({
            data: p
          })
        } else return null;
      }
    })
    t.field('connectPipeline', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
        connectPipelineId: nonNull(stringArg()),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_parent, { id, connectPipelineId, flowCalculationDirection }, ctx: Context) => {

        const result = await ctx.prisma.pipeline.update({
          where: { id },
          data: {
            upstream: flowCalculationDirection === 'Upstream' ? {
              connect: { id: connectPipelineId }
            } : undefined,
            downstream: flowCalculationDirection === 'Downstream' ? {
              connect: { id: connectPipelineId }
            } : undefined,
            updatedBy: {
              update: {
                id: String(ctx.user?.id),
              }
            }
          }
        });
        return result;
      }
    })
    t.field('disconnectPipeline', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
        disconnectPipelineId: nonNull(stringArg()),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_parent, { id, disconnectPipelineId, flowCalculationDirection }, ctx: Context) => {

        const result = await ctx.prisma.pipeline.update({
          where: { id },
          data: {
            upstream: flowCalculationDirection === 'Upstream' ? {
              disconnect: { id: disconnectPipelineId }
            } : undefined,
            downstream: flowCalculationDirection === 'Downstream' ? {
              disconnect: { id: disconnectPipelineId }
            } : undefined,
            updatedBy: {
              update: {
                id: String(ctx.user?.id),
              }
            }
          }
        });
        return result;
      }
    })
    t.field('connectSource', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
        sourceId: nonNull(stringArg()),
      },
      resolve: async (_parent, { id, sourceId }, ctx: Context) => {
        return ctx.prisma.pipeline.update({
          where: { id },
          data: {
            injectionPoints: {
              connect: {
                id: sourceId
              }
            },
            updatedBy: {
              update: {
                id: String(ctx.user?.id),
              }
            }
          }
        })
      }
    })
    t.field('disconnectSource', {
      type: 'Pipeline',
      args: {
        id: nonNull(stringArg()),
        sourceId: nonNull(stringArg()),
      },
      resolve: async (_parent, { id, sourceId }, ctx: Context) => {
        return ctx.prisma.pipeline.update({
          where: { id },
          data: {
            injectionPoints: {
              disconnect: { id: sourceId }
            },
            updatedBy: {
              update: {
                id: String(ctx.user?.id),
              }
            }
          }
        })
      }
    })
  }
})
import { enumType, intArg, objectType, stringArg, extendType, inputObjectType, nonNull, arg, floatArg, booleanArg } from 'nexus';
import { Context } from '../context';
import { Pipeline as IPipeline } from '@prisma/client';
import { StatusEnumMembers, SubstanceEnumMembers } from './LicenseChange';
import { totalPipelineFlowRawQuery } from './PipelineFlow';
import { Prisma, User as IUser } from '@prisma/client';
import { ITableObject } from './SearchNavigation';


export const PipelineObjectMembers: ITableObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'license', nullable: false, type: 'String' },
  { field: 'segment', nullable: false, type: 'String' },
  { field: 'flowCalculationDirection', nullable: false, type: 'FlowCalculationDirectionEnum' },
  { field: 'from', nullable: false, type: 'String' },
  { field: 'to', nullable: false, type: 'String' },
  { field: 'length', nullable: false, type: 'Float' },
  { field: 'yieldStrength', nullable: true, type: 'Int' },
  { field: 'outsideDiameter', nullable: true, type: 'Float' },
  { field: 'wallThickness', nullable: true, type: 'Float' },
  { field: 'mop', nullable: true, type: 'Int' },
  { field: 'piggable', nullable: true, type: 'Boolean' },
  { field: 'piggingFrequency', nullable: true, type: 'Int' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

export const PipelineExtendObject = extendType({
  type: 'Pipeline',
  definition: t => {
    for (const property of PipelineObjectMembers) {
      const { field, nullable, type } = property;
      if (nullable) {
        t.field(field, { type })
      } else {
        t.nonNull.field(field, { type })
      }
    }
  }
});


export const Pipeline = objectType({
  name: 'Pipeline',
  sourceType: {
    module: '@prisma/client',
    export: 'Pipeline',
  },
  definition: t => {
    t.field('satellite', {
      type: 'Satellite',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).satellite();
        return result!
      },
    })
    t.list.field('wells', {
      type: 'Well',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).wells();
        return result;
      },
    })
    t.list.field('salesPoints', {
      type: 'SalesPoint',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).salesPoints();
        return result;
      },
    })
    t.field('fromFeature', {
      type: 'FromToFeatureEnum',
      resolve: ({ fromFeature }) => {
        const result = fromFeature && serverEnumToDatabaseEnum(FromToFeatureEnumMembers, fromFeature);
        return result;
      }
    })
    t.field('toFeature', {
      type: 'FromToFeatureEnum',
      resolve: ({ toFeature }) => {
        const result = toFeature && serverEnumToDatabaseEnum(FromToFeatureEnumMembers, toFeature);
        return result;
      }
    })
    t.field('currentStatus', {
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
    t.field('currentSubstance', {
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
    t.field('firstLicenseDate', {
      type: 'DateTime',
      resolve: async ({ id }, _args, ctx: Context) => {
        const { date } = await ctx.prisma.licenseChange.findFirst({
          where: { pipelineId: id },
          orderBy: { date: 'asc' },
          select: { date: true },
        }) || {};
        return date || null;
      }
    })
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
    t.field('material', {
      type: 'MaterialEnum',
      resolve: ({ material }) => {
        const result = material && serverEnumToDatabaseEnum(MaterialEnumMembers, material);
        return result;
      }
    })
    t.field('internalProtection', {
      type: 'InternalProtectionEnum',
      resolve: ({ internalProtection }) => {
        const result = internalProtection && serverEnumToDatabaseEnum(InternalProtectionEnumMembers, internalProtection);
        return result;
      }
    })
    t.field('batchFrequency', {
      type: 'BatchFrequencyEnum',
      resolve: ({ batchFrequency }) => {
        const result = batchFrequency && serverEnumToDatabaseEnum(BatchFrequencyEnumMembers, batchFrequency);
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).createdBy()
        return result!;
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id },
        }).updatedBy()
        return result!;
      },
    })
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
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolvePipelineAuthorized(user);
      }
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

export const BatchFrequencyEnumMembers = {
  Continuous: 'Continuous',
  Quarterly: 'Quarterly',
  Bimonthly: 'Bimonthly',
  Monthly: 'Monthly',
  Annually: 'Annually',
  Weekly: 'Weekly',
  Specialized: 'Specialized'
}

export const BatchFrequencyEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'BatchFrequencyEnum',
  },
  name: 'BatchFrequencyEnum',
  members: BatchFrequencyEnumMembers
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


export const resolvePipelineAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}


export const PipelineQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('connectedPipelinesByPipelineId', {
      type: 'PipelinesFlowAndSourceGroupBy',
      args: {
        id: nonNull(stringArg()),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_, { id, flowCalculationDirection }, ctx: Context) => {

        if (flowCalculationDirection === 'Upstream') {
          const { upstream } = await ctx.prisma.pipeline.findUnique({
            where: { id },
            select: {
              upstream: { select: { id: true } },
            },
          }) || {};
          if (upstream && upstream.length > 0) {

            const idList = upstream.map(({ id }) => id);
            const pipelinesFlow = await totalPipelineFlowRawQuery({ idList, flowCalculationDirection, ctx });

            if (pipelinesFlow.length > 0) {
              const pipelineGroupBy = pipelinesFlow.reduce((
                { oil: previousOil, water: previousWater, gas: previousGas, lastProduction: previousLastProduction, lastInjection: previousLastInjection, firstProduction: previousFirstProduction, firstInjection: previousFirstInjection },
                { oil: currentOil, water: currentWater, gas: currentGas, lastProduction: currentLastProduction, lastInjection: currentLastInjection, firstProduction: currentFirstProduction, firstInjection: currentFirstInjection }) => {

                return {
                  oil: previousOil + currentOil,
                  water: previousWater + currentWater,
                  gas: previousGas + currentGas,
                  lastProduction: currentLastProduction > previousLastProduction || (currentLastProduction != null && previousLastProduction == null) ? currentLastProduction : previousLastProduction,
                  lastInjection: currentLastInjection > previousLastInjection || (currentLastInjection != null && previousLastInjection == null) ? currentLastInjection : previousLastInjection,
                  firstProduction: currentFirstProduction < previousFirstProduction || (currentFirstProduction != null && previousFirstProduction == null) ? currentFirstProduction : previousFirstProduction,
                  firstInjection: currentFirstInjection < previousFirstInjection || (currentFirstInjection != null && previousFirstInjection == null) ? currentFirstInjection : previousFirstInjection,
                  id: '',
                  name: ''
                }
              });
              const { oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection } = pipelineGroupBy;
              const sourceGroupBy = { oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection }

              return { pipelinesFlow, sourceGroupBy };
            }
          }
        }
        if (flowCalculationDirection === 'Downstream') {
          const { downstream } = await ctx.prisma.pipeline.findUnique({
            where: { id },
            select: {
              downstream: { select: { id: true } },
            },
          }) || {};
          if (downstream && downstream.length > 0) {

            const idList = downstream.map(({ id }) => id);
            const pipelinesFlow = await totalPipelineFlowRawQuery({ idList, flowCalculationDirection, ctx });

            if (pipelinesFlow.length > 0) {
              const pipelineGroupBy = pipelinesFlow.reduce((
                { oil: previousOil, water: previousWater, gas: previousGas, lastProduction: previousLastProduction, lastInjection: previousLastInjection, firstProduction: previousFirstProduction, firstInjection: previousFirstInjection },
                { oil: currentOil, water: currentWater, gas: currentGas, lastProduction: currentLastProduction, lastInjection: currentLastInjection, firstProduction: currentFirstProduction, firstInjection: currentFirstInjection }) => {

                return {
                  oil: previousOil + currentOil,
                  water: previousWater + currentWater,
                  gas: previousGas + currentGas,
                  lastProduction: currentLastProduction > previousLastProduction || (currentLastProduction != null && previousLastProduction == null) ? currentLastProduction : previousLastProduction,
                  lastInjection: currentLastInjection > previousLastInjection || (currentLastInjection != null && previousLastInjection == null) ? currentLastInjection : previousLastInjection,
                  firstProduction: currentFirstProduction < previousFirstProduction || (currentFirstProduction != null && previousFirstProduction == null) ? currentFirstProduction : previousFirstProduction,
                  firstInjection: currentFirstInjection < previousFirstInjection || (currentFirstInjection != null && previousFirstInjection == null) ? currentFirstInjection : previousFirstInjection,
                  id: '',
                  name: ''
                }
              });
              const { oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection } = pipelineGroupBy;
              const sourceGroupBy = { oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection }

              return { pipelinesFlow, sourceGroupBy };
            }
          }
        }
        return null;
      }
    })
    t.list.field('pipelinesById', {
      type: 'Pipeline',
      args: {
        navigationInput: nonNull(arg({ type: 'NavigationInput' })),
      },
      resolve: async (_, { navigationInput: { hierarchy, search } }, ctx: Context) => {

        if (hierarchy) {
          const { id, table } = hierarchy;
          if (table === 'satellite') {
            const result = await ctx.prisma.pipeline.findMany({
              where: { satelliteId: id },
              orderBy: [
                { license: 'asc' },
                { segment: 'asc' },
              ]
            });
            return result;
          } else if (table === 'facility' && id === 'no-facility') {
            const result = await ctx.prisma.pipeline.findMany({
              where: {
                satellite: { facilityId: null }
              },
              orderBy: [
                { license: 'asc' },
                { segment: 'asc' },
              ]
            });
            return result;
          } else if (table === 'facility' && id) {
            const result = await ctx.prisma.pipeline.findMany({
              where: {
                satellite: { facilityId: id }
              },
              orderBy: [
                { license: 'asc' },
                { segment: 'asc' },
              ]
            });
            return result;
          } else {
            const result = await ctx.prisma.pipeline.findMany({
              orderBy: [
                { license: 'asc' },
                { segment: 'asc' },
              ]
            });
            return result;
          }
        }

        if (search) {
          const { table, field, value, type, operation } = search;
          const castValue =
            type === 'Int' ? parseInt(value) :
              type === 'Float' ? Number(value) :
                type === 'DateTime' ? new Date(value) :
                  type === 'Boolean' ? Boolean(value) : value //, 'Float'].includes(type) ? Number(value) : value;

          console.log(table, field, value, type, operation, JSON.stringify(castValue));


          if (table === 'pipeline') {
            return await ctx.prisma.pipeline.findMany({
              where: {
                [field]: { [operation]: castValue },
              }
            });
          }

          const b = await ctx.prisma.pipeline.findMany({
            where: {

            }
          });

          if (table === 'risk') {
            // if (field === 'riskPotentialGeo') {
            return await ctx.prisma.pipeline.findMany({
              where: {
                [table]: {
                  [field]: { [operation]: castValue },
                }
              }
            });


            // }
            // if (field === 'riskPotentialInternal') {
            //   const a = await ctx.prisma.pipeline.findMany({
            //     where: {
            //       risk: {
            //         riskPotentialInternal: parseInt(value),
            //       }
            //     }
            //   });
            //   console.log(table, field, value, type,  castValue, 'a:', JSON.stringify(a));
            //   return a;
            // }
            // if (field === 'riskPotentialInternal') {
            //   return await ctx.prisma.pipeline.findMany({
            //     where: {
            //       risk: {
            //         riskPotentialExternal: Number(value),
            //       }
            //     }
            //   });
            // }
          }
        }

        return null;
      }
    })
  },
});


export const NavigationInput = inputObjectType({
  name: 'NavigationInput',
  definition(t) {
    t.field('hierarchy', { type: 'HierarchyInput' })
    t.field('search', { type: 'SearchNavigationInput' })
  },
});

export const HierarchyInput = inputObjectType({
  name: 'HierarchyInput',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('table', { type: 'TableEnum' })
  },
});

export const SearchNavigationInput = inputObjectType({
  name: 'SearchNavigationInput',
  definition(t) {
    t.nonNull.field('table', { type: 'TableEnum' })
    t.nonNull.string('field')
    t.nonNull.string('value')
    t.nonNull.string('type')
    t.nonNull.field('operation', { type: 'OperationEnum' })
  },
});


export const PipelineCreateInput = inputObjectType({
  name: 'PipelineCreateInput',
  definition(t) {
    t.list.field('wells', { type: 'WellCreateInput' })
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


export const PipelinePayload = objectType({
  name: 'PipelinePayload',
  definition(t) {
    t.field('pipeline', { type: 'Pipeline' })
    t.field('error', { type: 'FieldError' })
  },
});

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type IPipelinePartialBy = PartialBy<IPipeline, 'id' | 'createdAt' | 'updatedAt'>

export const PipelineMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editPipeline', {
      type: 'PipelinePayload',
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
        batchFrequency: arg({ type: 'BatchFrequencyEnum' }),
      },
      resolve: async (_, args, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {
            if (args.license) {
              const currentPipeline = await ctx.prisma.pipeline.findUnique({
                where: { id: args.id },
                select: {
                  segment: true,
                }
              });
              if (currentPipeline) {
                const { segment } = currentPipeline;
                const pipelineWithSameSegment = await ctx.prisma.pipeline.findUnique({
                  where: { license_segment: { license: args.license, segment } },
                  select: {
                    id: true,
                    satellite: {
                      select: {
                        name: true,
                        facility: {
                          select: {
                            name: true,
                          }
                        }
                      }
                    }
                  }
                });
                if (pipelineWithSameSegment && pipelineWithSameSegment.id !== args.id) {
                  const facility = pipelineWithSameSegment.satellite?.facility?.name;
                  const satellite = pipelineWithSameSegment.satellite?.name;
                  return {
                    error: {
                      field: 'license',
                      message: `Pipeline ${args.license}-${segment} already exists at facility ${facility}, satellite ${satellite}.`,
                    }
                  }
                }
              }
            }
            if (args.segment) {
              const currentPipeline = await ctx.prisma.pipeline.findUnique({
                where: { id: args.id },
                select: {
                  license: true,
                }
              });
              if (currentPipeline) {
                const { license } = currentPipeline;
                const pipelineWithSameLicense = await ctx.prisma.pipeline.findUnique({
                  where: { license_segment: { license, segment: args.segment } },
                  select: {
                    id: true,
                    satellite: {
                      select: {
                        name: true,
                        facility: {
                          select: {
                            name: true,
                          }
                        }
                      }
                    }
                  }
                });
                if (pipelineWithSameLicense && pipelineWithSameLicense.id !== args.id) {
                  const facility = pipelineWithSameLicense.satellite?.facility?.name;
                  const satellite = pipelineWithSameLicense.satellite?.name;
                  return {
                    error: {
                      field: 'segment',
                      message: `Pipeline ${license}-${args.segment} already exists at facility ${facility}, satellite ${satellite}.`,
                    }
                  }
                }
              }
            }
            const pipeline = await ctx.prisma.pipeline.update({
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
                batchFrequency: databaseEnumToServerEnum(BatchFrequencyEnumMembers, args.batchFrequency),
                updatedById: userId,
              },
            });
            return { pipeline }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to pipelines.`,
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
    t.field('deletePipeline', {
      type: 'PipelinePayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {
            const pipeline = await ctx.prisma.pipeline.delete({
              where: { id },
            });
            return { pipeline }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete pipelines.`,
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
    t.field('duplicatePipeline', {
      type: 'PipelinePayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {

        const user = ctx.user;
        if (user) {
          const authorized = resolvePipelineAuthorized(user);
          const { id: userId, firstName } = user;
          if (authorized) {
            const newPipeline = await ctx.prisma.pipeline.findUnique({
              where: { id }
            }) as IPipelinePartialBy | null;

            if (newPipeline) {
              newPipeline.license += '_copy';
              newPipeline.segment += '_copy';
              delete newPipeline.id;
              delete newPipeline.createdAt;
              delete newPipeline.updatedAt;
              newPipeline.createdById = userId;
              newPipeline.updatedById = userId;

              try {
                const pipeline = await ctx.prisma.pipeline.create({
                  data: newPipeline
                });
                return { pipeline }
              } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                  if (e.code === 'P2002') {
                    return {
                      error: {
                        field: 'License and Segment',
                        message: 'There is a unique constraint violation, a new pipeline cannot be created with this license and segment',
                      }
                    }
                  }
                }
                throw e;
              }
            };
            return {
              error: {
                field: 'ID',
                message: `Couldn't find pipeline with ID ${id}.`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to create a new pipeline.`,
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
    t.field('connectPipeline', {
      type: 'PipelinePayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { id, pipelineId }, ctx: Context) => {
        console.log('id:', id, 'pipelineId:', pipelineId);

        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {
            const { flowCalculationDirection } = await ctx.prisma.pipeline.findUnique({
              where: { id: pipelineId },
              select: { flowCalculationDirection: true }
            }) || {};
            if (flowCalculationDirection) {
              const pipeline = await ctx.prisma.pipeline.update({
                where: { id: pipelineId },
                data: {
                  upstream: flowCalculationDirection === 'Upstream' ? {
                    connect: { id }
                  } : undefined,
                  downstream: flowCalculationDirection === 'Downstream' ? {
                    connect: { id }
                  } : undefined,
                  updatedBy: {
                    connect: { id: userId }
                  }
                }
              });
              return { pipeline }
            }
            return {
              error: {
                field: 'Flow calculation direction',
                message: `Hi ${firstName}, query is unable to determine direction used to calculate flow.`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to pipelines.`,
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
    t.field('disconnectPipeline', {
      type: 'PipelinePayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { id, pipelineId }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {
            const { flowCalculationDirection } = await ctx.prisma.pipeline.findUnique({
              where: { id: pipelineId },
              select: { flowCalculationDirection: true }
            }) || {};
            if (flowCalculationDirection) {
              const pipeline = await ctx.prisma.pipeline.update({
                where: { id: pipelineId },
                data: {
                  upstream: flowCalculationDirection === 'Upstream' ? {
                    disconnect: { id }
                  } : undefined,
                  downstream: flowCalculationDirection === 'Downstream' ? {
                    disconnect: { id }
                  } : undefined,
                  updatedBy: {
                    connect: { id: userId }
                  }
                }
              });
              return { pipeline }
            }
            return {
              error: {
                field: 'Flow calculation direction',
                message: `Hi ${firstName}, query is unable to determine direction used to calculate flow.`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to pipelines.`,
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
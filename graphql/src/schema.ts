import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'


export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })
    t.nonNull.list.nonNull.field('allPipelines', {
      type: Pipeline,
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.pipeline.findMany()
      },
    })
  }
})

const User = objectType({
  name: 'User',
  sourceType: {
    module: '@prisma/client',
    export: 'User',
  },
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.list.nonNull.field('pipelines', {
      type: Pipeline,
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .pipelines()
      },
    })
    t.nonNull.list.nonNull.field('facilities', {
      type: Facility,
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .facilities()
      },
    })
    t.nonNull.list.nonNull.field('satellites', {
      type: Satellite,
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .satellites()
      },
    })
    t.nonNull.list.nonNull.field('injectionPoints', {
      type: InjectionPoint,
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .injectionPoints()
      },
    })
  },
})



const Facility = objectType({
  name: 'Facility',
  sourceType: {
    module: '@prisma/client',
    export: 'Facility',
  },
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('satellites', {
      type: Satellite,
      resolve: (parent, _, context: Context) => {
        return context.prisma.facility
          .findUnique({
            where: { id: parent.id },
          })
          .satellites();
      },
    })
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.facility
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



const Satellite = objectType({
  name: 'Satellite',
  sourceType: {
    module: '@prisma/client',
    export: 'Satellite',
  },
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.field('facility', {
      type: Facility,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.satellite
          .findUnique({
            where: { id: parent.id },
          })
          .facility()
        return result!
      },
    })
    t.nonNull.list.nonNull.field('pipelines', {
      type: Pipeline,
      resolve: (parent, _, context: Context) => {
        return context.prisma.satellite
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .pipelines()
      },
    })
    t.nonNull.list.nonNull.field('injectionPoints', {
      type: InjectionPoint,
      resolve: (parent, _, context: Context) => {
        return context.prisma.satellite
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .injectionPoints()
      },
    })
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.satellite
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


const Pipeline = objectType({
  name: 'Pipeline',
  sourceType: {
    module: '@prisma/client',
    export: 'Pipeline',
  },
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('satellite', {
      type: Satellite,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.pipeline
          .findUnique({
            where: { id: parent.id },
          })
          .satellite()
        return result!
      },
    })
    t.nonNull.list.nonNull.field('injectionPoints', {
      type: InjectionPoint,
      resolve: (parent, _, context: Context) => {
        return context.prisma.pipeline
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
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.substance as keyof typeof SubstanceEnumMembers;
        const result = SubstanceEnumMembers[parent.substance] as keyof typeof SubstanceEnumMembers;
        return result;
      }
    })
    t.nonNull.string('from')
    t.field('fromFeature', {
      type: FromToFeatureEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.fromFeature as keyof typeof FromToFeatureEnumMembers;
        const result = parent.fromFeature !== null ? FromToFeatureEnumMembers[parent.fromFeature] as keyof typeof FromToFeatureEnumMembers : null;
        return result;
      }
    })
    t.nonNull.string('to')
    t.field('toFeature', {
      type: FromToFeatureEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.toFeature as keyof typeof FromToFeatureEnumMembers;
        const result = parent.toFeature !== null ? FromToFeatureEnumMembers[parent.toFeature] as keyof typeof FromToFeatureEnumMembers : null;
        return result;
      }
    })
    t.nonNull.field('status', {
      type: StatusEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.status as keyof typeof StatusEnumMembers;
        const result = StatusEnumMembers[parent.status] as keyof typeof StatusEnumMembers;
        return result;
      }
    })
    t.nonNull.float('length')
    t.field('type', {
      type: TypeEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.type as keyof typeof TypeEnumMembers;
        const result = parent.type !== null ? TypeEnumMembers[parent.type] as keyof typeof TypeEnumMembers : null;
        return result;
      }
    })
    t.field('grade', {
      type: GradeEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.grade as keyof typeof GradeEnumMembers;
        const result = parent.grade !== null ? GradeEnumMembers[parent.grade] as keyof typeof GradeEnumMembers : null;
        return result;
      }
    })
    t.nonNull.float('outsideDiameter')
    t.nonNull.float('wallThickness')
    t.field('material', {
      type: MaterialEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.material as keyof typeof MaterialEnumMembers;
        const result = parent.material !== null ? MaterialEnumMembers[parent.material] as keyof typeof MaterialEnumMembers : null;
        return result;
      }
    })
    t.float('mop')
    t.nonNull.field('internalProtection', {
      type: InternalProtectionEnum,
      resolve: (parent, _, context: Context) => {
        // const parentKey = parent.internalProtection as keyof typeof InternalProtectionEnumMembers;
        const result = InternalProtectionEnumMembers[parent.internalProtection] as keyof typeof InternalProtectionEnumMembers;
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.pipeline
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
      resolve: (parent, _, context: Context) => {
        return context.prisma.pipeline
          .findMany({
            where: { downstream: { some: { id: parent.id || undefined } } },
          })
      },
    })
    t.nonNull.list.nonNull.field('downstream', {
      type: Pipeline,
      resolve: (parent, _, context: Context) => {
        return context.prisma.pipeline
          .findMany({
            where: { upstream: { some: { id: parent.id || undefined } } },
          })
      },
    })
  },
});


const InjectionPoint = objectType({
  name: 'InjectionPoint',
  sourceType: {
    module: '@prisma/client',
    export: 'InjectionPoint',
  },
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('satellite', {
      type: Satellite,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.injectionPoint
          .findUnique({
            where: { id: parent.id },
          })
          .satellite()
        return result!
      },
    })
    t.nonNull.string('source')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('pvUnitId')
    t.string('pvNodeId')
    t.nonNull.field('createdBy', {
      type: User,
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.injectionPoint
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()
        return result!
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('pipeline', {
      type: Pipeline,
      resolve: (parent, _, context: Context) => {
        return context.prisma.injectionPoint
          .findUnique({
            where: { id: parent.id },
          })
          .pipeline()
      },
    })
  },
})


const SubstanceEnumMembers = {
  NaturalGas: "Natural Gas",
  FreshWater: "Fresh Water",
  SaltWater: "Salt Water",
  CrudeOil: "Crude Oil",
  OilWellEffluent: "Oil Well Effluent",
  LVPProducts: "LVP Products",
  FuelGas: "Fuel Gas",
  SourNaturalGas: "Sour Natural Gas"
}

const SubstanceEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'SubstanceEnum',
  },
  name: 'SubstanceEnum',
  members: SubstanceEnumMembers
});


const FromToFeatureEnumMembers = {
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

const FromToFeatureEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'FromToFeatureEnum',
  },
  name: 'FromToFeatureEnum',
  members: FromToFeatureEnumMembers
});


const StatusEnumMembers = {
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

const StatusEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'StatusEnum',
  },
  name: 'StatusEnum',
  members: StatusEnumMembers
});

const TypeEnumMembers = {
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

const TypeEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'TypeEnum',
  },
  name: 'TypeEnum',
  members: TypeEnumMembers
});

const GradeEnumMembers = {
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

const GradeEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'GradeEnum',
  },
  name: 'GradeEnum',
  members: GradeEnumMembers
});

const MaterialEnumMembers = {
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

const MaterialEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'MaterialEnum',
  },
  name: 'MaterialEnum',
  members: MaterialEnumMembers
});

const InternalProtectionEnumMembers = {
  Uncoated: "Uncoated",
  FreeStandingSlipLined: "Free Standing (Slip Lined)",
  Unknown: "Unknown",
  Cement: "Cement",
  ExpandedPolyethylene: "Expanded Polyethylene",
  ThinFilm: "Thin Film",
}

const InternalProtectionEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'InternalProtectionEnum',
  },
  name: 'InternalProtectionEnum',
  members: InternalProtectionEnumMembers
});



// export const Query = queryType({
//   definition(t) {
//     t.nonNull.list.nonNull.field('allUsers', {
//       type: User,
//       resolve: (_parent, _args, context: Context) => {
//         return context.prisma.user.findMany()
//       },
//     })

//     t.nonNull.list.nonNull.field('feed2', {
//       type: Pipeline,
//       args: {
//         searchString: stringArg(),
//         skip: intArg(),
//         take: intArg(),
//       },
//       resolve: (_parent, args, context: Context) => {
//         const or = args.searchString
//           ? {
//             OR: [
//               { title: { contains: args.searchString } },
//               { content: { contains: args.searchString } },
//             ],
//           }
//           : {}

//         return context.prisma.pipeline.findMany({
//           where: {
//             license: 'AB00035',
//             ...or,
//           },
//           take: args.take || undefined,
//           skip: args.skip || undefined,
//         })
//       },
//     })
//   },
// })

// export const Mutation = mutationType({
//   definition(t) {
//     t.field('createDraft', {
//       type: Pipeline,
//       args: {
//         data: nonNull(
//           arg({
//             type: PipelineCreateInput,
//           }),
//         ),
//         userEmail: stringArg(),
//       },
//       resolve: async (_, args, context: Context) => {
//         const newPipeline = await context.prisma.pipeline.create({
//           data: {
//             license: args.data.license,
//             segment: args.data.segment,
//             user: {
//               connect: { email: args.userEmail },
//             },
//           },
//         })

//         // publish the subscription here
//         context.pubsub.publish('newPipeline', newPipeline)
//         return newPipeline
//       },
//     })

//     t.field('togglePublishPost', {
//       type: 'Post',
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: async (_, args, context: Context) => {
//         try {
//           const pipeline = await context.prisma.pipeline.findUnique({
//             where: { id: args.id || undefined },
//           })

//           if (!pipeline.license) {
//             // publish the subscription here
//             context.pubsub.publish('pipelinePublished', pipeline)
//           }

//           return context.prisma.pipeline.update({
//             where: { id: args.id || undefined },
//             data: { license: pipeline?.license },
//           })
//         } catch (e) {
//           throw new Error(
//             `Pipeline with ID ${args.id} does not exist in the database.`,
//           )
//         }
//       },
//     })
//   },
// })

// export const Subscription = subscriptionType({
//   definition(t) {
//     t.field('newPipeline', {
//       type: Pipeline,
//       subscribe(_root, _args, ctx) {
//         return ctx.pubsub.asyncIterator('newPipeline')
//       },
//       resolve(payload) {
//         return payload
//       },
//     })

//     t.field('pipelinePublished', {
//       type: 'Post',
//       subscribe(_root, _args, ctx) {
//         return ctx.pubsub.asyncIterator('pipelinePublished')
//       },
//       resolve(payload) {
//         return payload
//       },
//     })
//   },
// })

// const PipelineCreateInput = inputObjectType({
//   name: 'PipelineCreateInput',
//   definition(t) {
//     t.nonNull.string('license')
//     t.nonNull.string('content')
//   },
// })

export const schema = makeSchema({
  types: [User, Facility, Satellite, Pipeline, /*PipelineStream,*/ InjectionPoint, DateTime, Query],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
    debug: true
  },
})
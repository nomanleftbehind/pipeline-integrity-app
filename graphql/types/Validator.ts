import { objectType, extendType } from 'nexus';
import { UserRoleEnumArray } from './User';
import {
  FlowCalculationDirectionEnumArray,
} from './Pipeline';
import { Context } from '../context';

import { licenseMatchPattern, segmentMatchPattern, } from './Pipeline';
import {
  fromToMatchPattern,
  wallThicknessMatchPattern,
  outsideDiameterMatchPattern,
  lengthMatchPattern,
  mopMatchPattern,
  yieldStrengthMatchPattern
} from './LicenseChange';
import { PigInspectionEnumArray } from './PigRun';
import { LimitingSpecEnumArray } from './PressureTest';
import { GeotechnicalFacingEnumArray } from './Geotechnical';
import { SolubilityEnumArray } from './BatchProduct';
import { OperationEnumArray, HavingEnumArray } from './SearchNavigation';






interface ILoadEnumObjectArrayArgs {
  ctx: Context;
}

export const loadPipelineTypeEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.pipelineType.findMany({
    select: { id: true, type: true },
    orderBy: { type: 'asc' },
  })).map(({ id, type }) => {
    return { databaseEnum: type, serverEnum: id };
  });
}

export const loadGradeEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.grade.findMany({
    select: { id: true, grade: true },
    orderBy: { grade: 'asc' },
  })).map(({ id, grade }) => {
    return { databaseEnum: grade, serverEnum: id };
  });
}

export const loadFromToFeatureEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.fromToFeature.findMany({
    select: { id: true, feature: true },
    orderBy: { feature: 'asc' },
  })).map(({ id, feature }) => {
    return { databaseEnum: feature, serverEnum: id };
  });
}

export const loadMaterialEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.material.findMany({
    select: { id: true, material: true },
    orderBy: { material: 'asc' },
  })).map(({ id, material }) => {
    return { databaseEnum: material, serverEnum: id };
  });
}

export const loadInternalProtectionEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.internalProtection.findMany({
    select: { id: true, internalProtection: true },
    orderBy: { internalProtection: 'asc' },
  })).map(({ id, internalProtection }) => {
    return { databaseEnum: internalProtection, serverEnum: id };
  });
}

export const loadStatusEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.status.findMany({
    select: { id: true, status: true },
    orderBy: { status: 'asc' },
  })).map(({ id, status }) => {
    return { databaseEnum: status, serverEnum: id };
  });
}

export const loadSubstanceEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.substance.findMany({
    select: { id: true, substance: true },
    orderBy: { substance: 'asc' },
  })).map(({ id, substance }) => {
    return { databaseEnum: substance, serverEnum: id };
  });
}

export const loadSatelliteEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.satellite.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })).map(({ id, name }) => {
    return { databaseEnum: name, serverEnum: id };
  });
}

export const loadPigTypeEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.pigType.findMany({
    select: { id: true, type: true },
    orderBy: { type: 'asc' },
  })).map(({ id, type }) => {
    return { databaseEnum: type, serverEnum: id };
  });
}

export const loadBatchProductEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.batchProduct.findMany({
    select: { id: true, product: true },
    orderBy: { product: 'asc' },
  })).map(({ id, product }) => {
    return { databaseEnum: product, serverEnum: id };
  });
}


export const loadUserEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.user.findMany({
    select: { id: true, firstName: true, lastName: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })).map(({ id, firstName, lastName }) => {
    return { databaseEnum: `${firstName} ${lastName}`, serverEnum: id };
  });
}

export const loadOperatorEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.user.findMany({
    where: { role: 'OPERATOR' },
    select: { id: true, firstName: true, lastName: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })).map(({ id, firstName, lastName }) => {
    return { databaseEnum: `${firstName} ${lastName}`, serverEnum: id };
  });
}

export const loadChemicalSupplierEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.chemicalSupplier.findMany({
    select: { id: true, name: true, },
    orderBy: { name: 'asc' },
  })).map(({ id, name }) => {
    return { databaseEnum: name, serverEnum: id };
  });
}

export const loadRiskEnvironmentEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.riskEnvironment.findMany({
    select: { id: true, environment: true, },
    orderBy: { environment: 'asc' },
  })).map(({ id, environment }) => {
    return { databaseEnum: environment, serverEnum: id };
  });
}

export const loadCompanyEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
  return (await ctx.prisma.company.findMany({
    select: { id: true, name: true, },
    orderBy: { name: 'asc' },
  })).map(({ id, name }) => {
    return { databaseEnum: name, serverEnum: id };
  });
}


export const ValidatorsPipeline = objectType({
  name: 'ValidatorsPipeline',
  definition: t => {
    t.nonNull.string('licenseMatchPattern')
    t.nonNull.string('segmentMatchPattern')
    t.nonNull.list.nonNull.field('flowCalculationDirectionEnum', { type: 'EnumObject' })
    t.nonNull.list.nonNull.field('satelliteEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadSatelliteEnumObjectArray({ ctx }) })
    t.nonNull.string('fromToMatchPattern')
    t.nonNull.list.nonNull.field('fromToFeatureEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadFromToFeatureEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('statusEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadStatusEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('substanceEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadSubstanceEnumObjectArray({ ctx }) })
    t.nonNull.string('lengthMatchPattern')
    t.nonNull.list.nonNull.field('pipelineTypeEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPipelineTypeEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('gradeEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadGradeEnumObjectArray({ ctx }) })
    t.nonNull.string('yieldStrengthMatchPattern')
    t.nonNull.string('outsideDiameterMatchPattern')
    t.nonNull.string('wallThicknessMatchPattern')
    t.nonNull.list.nonNull.field('materialEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadMaterialEnumObjectArray({ ctx }) })
    t.nonNull.string('mopMatchPattern')
    t.nonNull.list.nonNull.field('internalProtectionEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadInternalProtectionEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('limitingSpecEnum', { type: 'EnumObject' })
    t.nonNull.list.nonNull.field('riskEnvironmentEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadRiskEnvironmentEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('geotechnicalFacingEnum', { type: 'EnumObject' })
    t.nonNull.list.nonNull.field('solubilityEnum', { type: 'EnumObject' })
    t.nonNull.list.nonNull.field('batchProductEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadBatchProductEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('pigTypeEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPigTypeEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('pigInspectionEnum', { type: 'EnumObject' })
    t.nonNull.list.nonNull.field('operatorEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadOperatorEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('chemicalSupplierEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadChemicalSupplierEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('companyEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadCompanyEnumObjectArray({ ctx }) })
    t.nonNull.list.nonNull.field('operationEnum', { type: 'EnumObject' })
    t.nonNull.list.nonNull.field('havingEnum', { type: 'EnumObject' })
  }
});

export const ValidatorQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('validatorsPipeline', {
      type: 'ValidatorsPipeline',
      resolve: () => {
        return {
          licenseMatchPattern,
          segmentMatchPattern,
          fromToMatchPattern,
          lengthMatchPattern,
          yieldStrengthMatchPattern,
          outsideDiameterMatchPattern,
          wallThicknessMatchPattern,
          mopMatchPattern,
          flowCalculationDirectionEnum: FlowCalculationDirectionEnumArray,
          limitingSpecEnum: LimitingSpecEnumArray,
          geotechnicalFacingEnum: GeotechnicalFacingEnumArray,
          solubilityEnum: SolubilityEnumArray,
          pigInspectionEnum: PigInspectionEnumArray,
          operationEnum: OperationEnumArray,
          havingEnum: HavingEnumArray,
        };
      }
    })
  },
});


export const ValidatorsUserRole = objectType({
  name: 'ValidatorsUserRole',
  definition: t => {
    t.nonNull.list.nonNull.field('userRoleEnum', { type: 'EnumObject' })
  }
});

export const ValidatorUserRoleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('validators', {
      type: 'ValidatorsUserRole',
      resolve: () => {
        return {
          userRoleEnum: UserRoleEnumArray,
        };
      }
    })
  },
});
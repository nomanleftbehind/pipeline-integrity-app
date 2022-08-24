import { objectType, extendType } from 'nexus';
import { UserRoleEnumArray } from './User';
import {
	FlowCalculationDirectionEnumArray,
} from './Pipeline';
import { Context } from '../context';

import { fromToMatchPattern, wallThicknessMatchPattern, outsideDiameterMatchPattern, licenseMatchPattern, segmentMatchPattern } from './Pipeline';
import { PigInspectionEnumArray } from './PigRun';
import { LimitingSpecEnumArray } from './PressureTest';
import { GeotechnicalFacingEnumArray } from './Geotechnical';
import { SolubilityEnumArray } from './BatchProduct';
import { OperationEnumArray, HavingEnumArray } from './SearchNavigation';


export const lengthMatchPattern = "^\\d*\\.?\\d*$";
export const yieldStrengthMatchPattern = "^(240|206|359|290|0|289|57|24|200|205|380|2875|241|358|360)$";
export const mopMatchPattern = "^\\d{1,5}$"; // number between 0 and 99999



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

export const loadPipelineGradeEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.pipelineGrade.findMany({
		select: { id: true, grade: true },
		orderBy: { grade: 'asc' },
	})).map(({ id, grade }) => {
		return { databaseEnum: grade, serverEnum: id };
	});
}

export const loadPipelineFromToFeatureEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.pipelineFromToFeature.findMany({
		select: { id: true, feature: true },
		orderBy: { feature: 'asc' },
	})).map(({ id, feature }) => {
		return { databaseEnum: feature, serverEnum: id };
	});
}

export const loadPipelineMaterialEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.pipelineMaterial.findMany({
		select: { id: true, material: true },
		orderBy: { material: 'asc' },
	})).map(({ id, material }) => {
		return { databaseEnum: material, serverEnum: id };
	});
}

export const loadPipelineInternalProtectionEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.pipelineInternalProtection.findMany({
		select: { id: true, internalProtection: true },
		orderBy: { internalProtection: 'asc' },
	})).map(({ id, internalProtection }) => {
		return { databaseEnum: internalProtection, serverEnum: id };
	});
}

export const loadLicenseChangeStatusEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.licenseChangeStatus.findMany({
		select: { id: true, status: true },
		orderBy: { status: 'asc' },
	})).map(({ id, status }) => {
		return { databaseEnum: status, serverEnum: id };
	});
}

export const loadLicenseChangeSubstanceEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.licenseChangeSubstance.findMany({
		select: { id: true, substance: true },
		orderBy: { substance: 'asc' },
	})).map(({ id, substance }) => {
		return { databaseEnum: substance, serverEnum: id };
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


export const ValidatorsPipeline = objectType({
	name: 'ValidatorsPipeline',
	definition: t => {
		t.nonNull.string('licenseMatchPattern')
		t.nonNull.string('segmentMatchPattern')
		t.nonNull.string('fromToMatchPattern')
		t.nonNull.list.nonNull.field('fromToFeatureEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPipelineFromToFeatureEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('statusEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadLicenseChangeStatusEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('substanceEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadLicenseChangeSubstanceEnumObjectArray({ ctx }) })
		t.nonNull.string('lengthMatchPattern')
		t.nonNull.list.nonNull.field('pipelineTypeEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPipelineTypeEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('pipelineGradeEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPipelineGradeEnumObjectArray({ ctx }) })
		t.nonNull.string('yieldStrengthMatchPattern')
		t.nonNull.string('outsideDiameterMatchPattern')
		t.nonNull.string('wallThicknessMatchPattern')
		t.nonNull.list.nonNull.field('pipelineMaterialEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPipelineMaterialEnumObjectArray({ ctx }) })
		t.nonNull.string('mopMatchPattern')
		t.nonNull.list.nonNull.field('pipelineInternalProtectionEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPipelineInternalProtectionEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('flowCalculationDirectionEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('limitingSpecEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('riskEnvironmentEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadRiskEnvironmentEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('geotechnicalFacingEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('solubilityEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('batchProductEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadBatchProductEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('pigTypeEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadPigTypeEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('pigInspectionEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('operatorEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadOperatorEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('chemicalSupplierEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadChemicalSupplierEnumObjectArray({ ctx }) })
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
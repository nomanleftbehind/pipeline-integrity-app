import { objectType, extendType } from 'nexus';
import { UserRoleEnumArray } from './User';
import {
	FromToFeatureEnumArray,
	TypeEnumArray,
	GradeEnumArray,
	MaterialEnumArray,
	InternalProtectionEnumArray,
	FlowCalculationDirectionEnumArray,
} from './Pipeline';
import { Context } from '../context';

import { StatusEnumArray, SubstanceEnumArray } from './LicenseChange';
import { PigTypeEnumArray, PigInspectionEnumArray } from './PigRun';
import { LimitingSpecEnumArray } from './PressureTest';
import { EnvironmentProximityToEnumArray, GeotechnicalFacingEnumArray } from './Risk';
import { SolubilityEnumArray } from './BatchProduct';
import { OperationEnumArray, HavingEnumArray } from './SearchNavigation';

export const anyTextMatchPattern = "^[\\s\\S]*$";
export const licenseMatchPattern = "^(AB|SK|BC)(\\d{5}|\\d{6})$";
export const segmentMatchPattern = "^((UL)(\\d{1,2})|(\\d{1,3}))$";
export const fromToMatchPattern = "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$";
export const lengthMatchPattern = "^\\d*\\.?\\d*$";
export const yieldStrengthMatchPattern = "^(240|206|359|290|0|289|57|24|200|205|380|2875|241|358|360)$";
export const wallThicknessMatchPattern = "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$";
export const mopMatchPattern = "^\\d{1,5}$"; // number between 0 and 99999
export const outsideDiameterMatchPattern = "^4[3-9]$|^4[2-9]\\.[2-9]\\d?$|^([5-9]\\d)(\\.\\d\\d?)?$|^([1-2]\\d{2})(\\.\\d\\d?)?$|^(3[0-2][0-3])(\\.[0-8]\\d?)?$"; // number between 42.2 and 323.89



interface ILoadEnumObjectArrayArgs {
	ctx: Context;
}

export const loadBatchProductEnumObjectArray = async ({ ctx }: ILoadEnumObjectArrayArgs) => {
	return (await ctx.prisma.batchProduct.findMany({
		select: { id: true, product: true },
		orderBy: { product: 'asc' },
	})).map(({ id, product }) => {
		return { databaseEnum: product, serverEnum: id };
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


export const ValidatorsPipeline = objectType({
	name: 'ValidatorsPipeline',
	definition: t => {
		t.nonNull.list.nonNull.field('userRoleEnum', { type: 'EnumObject' })
		t.nonNull.string('licenseMatchPattern')
		t.nonNull.string('segmentMatchPattern')
		t.nonNull.string('fromToMatchPattern')
		t.nonNull.list.nonNull.field('fromToFeatureEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('statusEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('substanceEnum', { type: 'EnumObject' })
		t.nonNull.string('lengthMatchPattern')
		t.nonNull.list.nonNull.field('typeEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('gradeEnum', { type: 'EnumObject' })
		t.nonNull.string('yieldStrengthMatchPattern')
		t.nonNull.string('outsideDiameterMatchPattern')
		t.nonNull.string('wallThicknessMatchPattern')
		t.nonNull.list.nonNull.field('materialEnum', { type: 'EnumObject' })
		t.nonNull.string('mopMatchPattern')
		t.nonNull.list.nonNull.field('internalProtectionEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('flowCalculationDirectionEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('limitingSpecEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('environmentProximityToEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('geotechnicalFacingEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('solubilityEnum', { type: 'EnumObject' })
		t.nonNull.list.nonNull.field('batchProductEnum', { type: 'EnumObject', resolve: async (_, _args, ctx: Context) => await loadBatchProductEnumObjectArray({ ctx }) })
		t.nonNull.list.nonNull.field('pigTypeEnum', { type: 'EnumObject' })
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
					userRoleEnum: UserRoleEnumArray,
					licenseMatchPattern,
					segmentMatchPattern,
					fromToMatchPattern,
					fromToFeatureEnum: FromToFeatureEnumArray,
					statusEnum: StatusEnumArray,
					substanceEnum: SubstanceEnumArray,
					lengthMatchPattern,
					typeEnum: TypeEnumArray,
					gradeEnum: GradeEnumArray,
					yieldStrengthMatchPattern,
					outsideDiameterMatchPattern,
					wallThicknessMatchPattern,
					materialEnum: MaterialEnumArray,
					mopMatchPattern,
					internalProtectionEnum: InternalProtectionEnumArray,
					flowCalculationDirectionEnum: FlowCalculationDirectionEnumArray,
					limitingSpecEnum: LimitingSpecEnumArray,
					environmentProximityToEnum: EnvironmentProximityToEnumArray,
					geotechnicalFacingEnum: GeotechnicalFacingEnumArray,
					solubilityEnum: SolubilityEnumArray,
					pigTypeEnum: PigTypeEnumArray,
					pigInspectionEnum: PigInspectionEnumArray,
					operationEnum: OperationEnumArray,
					havingEnum: HavingEnumArray,
				};
			}
		})
	},
});
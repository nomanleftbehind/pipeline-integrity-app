import { objectType, extendType } from 'nexus';
import { UserRoleEnumMembers } from './User';
import {
	FromToFeatureEnumMembers,
	TypeEnumMembers,
	GradeEnumMembers,
	MaterialEnumMembers,
	InternalProtectionEnumMembers,
	FlowCalculationDirectionEnumMembers,
	BatchFrequencyEnumMembers,
} from './Pipeline';
import { StatusEnumMembers, SubstanceEnumMembers } from './LicenseChange';
import { PigTypeEnumMembers, PigInspectionEnumMembers } from './PigRun';
import { BatchProductEnumMembers } from './PipelineBatch';
import { LimitingSpecEnumMembers } from './PressureTest';
import { EnvironmentProximityToEnumMembers, GeotechnicalFacingEnumMembers } from './Risk';

export const anyTextMatchPattern = "^[\\s\\S]*$";
export const licenseMatchPattern = "^(AB|SK|BC)(\\d{5}|\\d{6})$";
export const segmentMatchPattern = "^((UL)(\\d{1,2})|(\\d{1,3}))$";
export const fromToMatchPattern = "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$";
export const lengthMatchPattern = "^\\d*\\.?\\d*$";
export const yieldStrengthMatchPattern = "^(240|206|359|290|0|289|57|24|200|205|380|2875|241|358|360)$";
export const wallThicknessMatchPattern = "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$";
export const mopMatchPattern = "^\\d{1,5}$"; // number between 0 and 99999
export const outsideDiameterMatchPattern = "^4[3-9]$|^4[2-9]\\.[2-9]\\d?$|^([5-9]\\d)(\\.\\d\\d?)?$|^([1-2]\\d{2})(\\.\\d\\d?)?$|^(3[0-2][0-3])(\\.[0-8]\\d?)?$"; // number between 42.2 and 323.89


export const UserRoleEnumObject = objectType({
	name: 'UserRoleEnumObject',
	definition(t) {
		for (const iterator of Object.keys(UserRoleEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const SubstanceEnumObject = objectType({
	name: 'SubstanceEnumObject',
	definition(t) {
		for (const iterator of Object.keys(SubstanceEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const FromToFeatureEnumObject = objectType({
	name: 'FromToFeatureEnumObject',
	definition(t) {
		for (const iterator of Object.keys(FromToFeatureEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const StatusEnumObject = objectType({
	name: 'StatusEnumObject',
	definition(t) {
		for (const iterator of Object.keys(StatusEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const TypeEnumObject = objectType({
	name: 'TypeEnumObject',
	definition(t) {
		for (const iterator of Object.keys(TypeEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const GradeEnumObject = objectType({
	name: 'GradeEnumObject',
	definition(t) {
		for (const iterator of Object.keys(GradeEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const MaterialEnumObject = objectType({
	name: 'MaterialEnumObject',
	definition(t) {
		for (const iterator of Object.keys(MaterialEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const InternalProtectionEnumObject = objectType({
	name: 'InternalProtectionEnumObject',
	definition(t) {
		for (const iterator of Object.keys(InternalProtectionEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const BatchFrequencyEnumObject = objectType({
	name: 'BatchFrequencyEnumObject',
	definition(t) {
		for (const iterator of Object.keys(BatchFrequencyEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const FlowCalculationDirectionEnumObject = objectType({
	name: 'FlowCalculationDirectionEnumObject',
	definition(t) {
		for (const iterator of Object.keys(FlowCalculationDirectionEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const PigTypeEnumObject = objectType({
	name: 'PigTypeEnumObject',
	definition(t) {
		for (const iterator of Object.keys(PigTypeEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const PigInspectionEnumObject = objectType({
	name: 'PigInspectionEnumObject',
	definition(t) {
		for (const iterator of Object.keys(PigInspectionEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const LimitingSpecEnumObject = objectType({
	name: 'LimitingSpecEnumObject',
	definition(t) {
		for (const iterator of Object.keys(LimitingSpecEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const EnvironmentProximityToEnumObject = objectType({
	name: 'EnvironmentProximityToEnumObject',
	definition(t) {
		for (const iterator of Object.keys(EnvironmentProximityToEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const GeotechnicalFacingEnumObject = objectType({
	name: 'GeotechnicalFacingEnumObject',
	definition(t) {
		for (const iterator of Object.keys(GeotechnicalFacingEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const BatchProductEnumObject = objectType({
	name: 'BatchProductEnumObject',
	definition(t) {
		for (const iterator of Object.keys(BatchProductEnumMembers)) {
			t.nonNull.string(iterator)
		}
	}
});

export const Validator = objectType({
	name: 'Validator',
	definition(t) {
		t.nonNull.field('userRoleEnum', { type: 'UserRoleEnumObject' })
		t.nonNull.string('anyTextMatchPattern')
		t.nonNull.string('licenseMatchPattern')
		t.nonNull.string('segmentMatchPattern')
		t.nonNull.field('substanceEnum', { type: 'SubstanceEnumObject' })
		t.nonNull.string('fromToMatchPattern')
		t.nonNull.field('fromToFeatureEnum', { type: 'FromToFeatureEnumObject' })
		t.nonNull.field('statusEnum', { type: 'StatusEnumObject' })
		t.nonNull.string('lengthMatchPattern')
		t.nonNull.field('typeEnum', { type: 'TypeEnumObject' })
		t.nonNull.field('gradeEnum', { type: 'GradeEnumObject' })
		t.nonNull.string('yieldStrengthMatchPattern')
		t.nonNull.string('outsideDiameterMatchPattern')
		t.nonNull.string('wallThicknessMatchPattern')
		t.nonNull.field('materialEnum', { type: 'MaterialEnumObject' })
		t.nonNull.string('mopMatchPattern')
		t.nonNull.field('internalProtectionEnum', { type: 'InternalProtectionEnumObject' })
		t.nonNull.field('batchFrequencyEnum', { type: 'BatchFrequencyEnumObject' })
		t.nonNull.field('flowCalculationDirectionEnum', { type: 'FlowCalculationDirectionEnumObject' })
		t.nonNull.field('pigTypeEnum', { type: 'PigTypeEnumObject' })
		t.nonNull.field('pigInspectionEnum', { type: 'PigInspectionEnumObject' })
		t.nonNull.field('limitingSpecEnum', { type: 'LimitingSpecEnumObject' })
		t.nonNull.field('environmentProximityToEnum', { type: 'EnvironmentProximityToEnumObject' })
		t.nonNull.field('geotechnicalFacingEnum', { type: 'GeotechnicalFacingEnumObject' })
		t.nonNull.field('batchProductEnum', { type: 'BatchProductEnumObject' })
	}
})

export const ValidatorQuery = extendType({
	type: 'Query',
	definition(t) {
		t.field('validators', {
			type: 'Validator',
			resolve: () => {
				return {
					userRoleEnum: UserRoleEnumMembers,
					anyTextMatchPattern,
					licenseMatchPattern,
					segmentMatchPattern,
					substanceEnum: SubstanceEnumMembers,
					fromToMatchPattern,
					fromToFeatureEnum: FromToFeatureEnumMembers,
					statusEnum: StatusEnumMembers,
					lengthMatchPattern,
					typeEnum: TypeEnumMembers,
					gradeEnum: GradeEnumMembers,
					yieldStrengthMatchPattern,
					outsideDiameterMatchPattern,
					wallThicknessMatchPattern,
					materialEnum: MaterialEnumMembers,
					mopMatchPattern,
					internalProtectionEnum: InternalProtectionEnumMembers,
					batchFrequencyEnum: BatchFrequencyEnumMembers,
					flowCalculationDirectionEnum: FlowCalculationDirectionEnumMembers,
					pigTypeEnum: PigTypeEnumMembers,
					pigInspectionEnum: PigInspectionEnumMembers,
					limitingSpecEnum: LimitingSpecEnumMembers,
					environmentProximityToEnum: EnvironmentProximityToEnumMembers,
					geotechnicalFacingEnum: GeotechnicalFacingEnumMembers,
					batchProductEnum: BatchProductEnumMembers,
				};
			}
		})
	},
});
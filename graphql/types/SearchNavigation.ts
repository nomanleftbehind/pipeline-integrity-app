import { enumType, objectType, extendType } from 'nexus';
import { PipelineObjectFields } from './Pipeline';
import { RiskObjectFields } from './Risk';
import { GeotechnicalObjectFields } from './Geotechnical';
import { CathodicSurveyObjectFields } from './CathodicSurvey';
import { ChemicalObjectFields } from './Chemical';
import { WellObjectFields } from './Well';
import { SalesPointObjectFields } from './SalesPoint';
import { LicenseChangeObjectFields } from './LicenseChange';
import { PressureTestObjectFields } from './PressureTest';
import { PigRunObjectFields } from './PigRun';
import { PipelineBatchObjectFields } from './PipelineBatch';
import {
  loadUserEnumObjectArray,
  loadOperatorEnumObjectArray,
  loadBatchProductEnumObjectArray,
  loadChemicalSupplierEnumObjectArray,
  loadPipelineTypeEnumObjectArray,
  loadGradeEnumObjectArray,
  loadFromToFeatureEnumObjectArray,
  loadPigTypeEnumObjectArray,
  loadMaterialEnumObjectArray,
  loadInternalProtectionEnumObjectArray,
  loadStatusEnumObjectArray,
  loadSubstanceEnumObjectArray,
  loadRiskEnvironmentEnumObjectArray,
  loadSatelliteEnumObjectArray,
  loadCompanyEnumObjectArray,
} from './Validator';
import type { GetGen } from 'nexus/dist/typegenTypeHelpers';
import type { AllNexusOutputTypeDefs } from 'nexus/dist/definitions/wrapping';
import type { NexusMetaType } from 'nexus/dist/definitions/nexusMeta';
import { NexusGenEnums, NexusGenObjects } from 'nexus-typegen';
import { Context } from '../context';




export interface ITableConstructObject extends Omit<NexusGenObjects['SearchNavigationObject'], 'type' | 'table'> {
  type: GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs | NexusMetaType;
}

interface ITableObjectExtend extends Omit<NexusGenObjects['SearchNavigationObject'], 'type'> {
  type: GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs | NexusMetaType;
}


export const TableEnumMembers = {
  pipeline: 'pipeline',
  risk: 'risk',
  chemical: 'chemical',
  facility: 'facility',
  satellite: 'satellite',
  wells: 'wells',
  salesPoints: 'salesPoints',
  licenseChanges: 'licenseChanges',
  geotechnicalParameters: 'geotechnicals',
  cathodicSurveys: 'cathodicSurveys',
  pressureTests: 'pressureTests',
  pigRuns: 'pigRuns',
  pipelineBatches: 'pipelineBatches',
  upstreamPipelines: 'upstream',
  downstreamPipelines: 'downstream',
}

export const TableEnum = enumType({
  name: 'TableEnum',
  members: TableEnumMembers,
});

export const OperationEnumMembers: { [x: string]: NexusGenEnums['OperationEnum'] } = {
  equals: 'equals',
  not: 'not',
  greaterThan: 'gt',
  greaterThanOrEqual: 'gte',
  lessThan: 'lt',
  lessThanOrEqual: 'lte',
  contains: 'contains',
  startsWith: 'startsWith',
  endsWith: 'endsWith',
}

export const OperationEnum = enumType({
  name: 'OperationEnum',
  members: OperationEnumMembers,
});

export const OperationEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(OperationEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});

export const HavingEnumMembers: { [x: string]: NexusGenEnums['HavingEnum'] } = {
  any: '_any',
  first: 'first',
  last: 'last',
  minimum: '_min',
  maximum: '_max',
  count: '_count',
}

export const HavingEnum = enumType({
  name: 'HavingEnum',
  members: HavingEnumMembers,
});

export const HavingEnumArray: NexusGenObjects['EnumObject'][] = Object.entries(HavingEnumMembers).map(([serverEnum, databaseEnum]) => {
  return { serverEnum, databaseEnum }
});


export const EnumObject = objectType({
  name: 'EnumObject',
  definition(t) {
    t.nonNull.string('serverEnum')
    t.nonNull.string('databaseEnum')
  }
});

export const SearchNavigationObject = objectType({
  name: 'SearchNavigationObject',
  definition(t) {
    t.nonNull.field('table', { type: 'TableEnum' })
    t.nonNull.string('field')
    t.nonNull.boolean('nullable')
    t.nonNull.string('type')
    t.list.nonNull.field('enumObjectArray', { type: 'EnumObject' })
  }
});


export const SearchNavigationQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.nonNull.field('searchNavigationOptions', {
      type: 'SearchNavigationObject',
      resolve: async (_, _args, ctx: Context) => {
        const userIdEnumObjectArray = await loadUserEnumObjectArray({ ctx });
        const environmentIdEnumObjectArray = await loadRiskEnvironmentEnumObjectArray({ ctx });
        const statusIdEnumObjectArray = await loadStatusEnumObjectArray({ ctx });
        const substanceIdEnumObjectArray = await loadSubstanceEnumObjectArray({ ctx });
        const pipelineTypeIdEnumObjectArray = await loadPipelineTypeEnumObjectArray({ ctx });
        const gradeIdEnumObjectArray = await loadGradeEnumObjectArray({ ctx });
        const fromToFeatureIdEnumObjectArray = await loadFromToFeatureEnumObjectArray({ ctx });
        const materialIdEnumObjectArray = await loadMaterialEnumObjectArray({ ctx });
        const internalProtectionIdEnumObjectArray = await loadInternalProtectionEnumObjectArray({ ctx });
        const operatorIdEnumObjectArray = await loadOperatorEnumObjectArray({ ctx });
        const pigTypeIdEnumObjectArray = await loadPigTypeEnumObjectArray({ ctx });
        const productIdEnumObjectArray = await loadBatchProductEnumObjectArray({ ctx });
        const chemicalSupplierIdEnumObjectArray = await loadChemicalSupplierEnumObjectArray({ ctx });
        const satelliteIdEnumObjectArray = await loadSatelliteEnumObjectArray({ ctx });
        const companyIdEnumObjectArray = await loadCompanyEnumObjectArray({ ctx });

        const generatePipelineSearchNavigationObject = async (table: Extract<NexusGenEnums['TableEnum'], 'pipeline' | 'upstream' | 'downstream'>) => {
          return PipelineObjectFields
            .map(({ field, nullable, type, enumObjectArray }) => {
              const newObj: ITableObjectExtend = {
                table, field, nullable, type,
                enumObjectArray: field === 'satelliteId' ? satelliteIdEnumObjectArray :
                  ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                    enumObjectArray
              };
              return newObj;
            });
        }

        const searchNavigationObjectPipeline = await generatePipelineSearchNavigationObject('pipeline');
        const searchNavigationObjectUpstreamPipeline = await generatePipelineSearchNavigationObject('upstream');
        const searchNavigationObjectDownstreamPipeline = await generatePipelineSearchNavigationObject('downstream');

        const searchNavigationObjectRisk = RiskObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {

            const newObj: ITableObjectExtend = {
              table: 'risk', field, nullable, type,
              enumObjectArray: field === 'environmentId' ? environmentIdEnumObjectArray :
                ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                  enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectGeotechnical = GeotechnicalObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'geotechnicals', field, nullable, type,
              enumObjectArray: ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectCathodicSurvey = CathodicSurveyObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'cathodicSurveys', field, nullable, type,
              enumObjectArray: field === 'companyId' ? companyIdEnumObjectArray :
                ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                  enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectLicenseChange = LicenseChangeObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'licenseChanges', field, nullable, type,
              enumObjectArray: field === 'statusId' ? statusIdEnumObjectArray :
                field === 'substanceId' ? substanceIdEnumObjectArray :
                  field === 'pipelineTypeId' ? pipelineTypeIdEnumObjectArray :
                    field === 'gradeId' ? gradeIdEnumObjectArray :
                      ['fromFeatureId', 'toFeatureId'].includes(field) ? fromToFeatureIdEnumObjectArray :
                        field === 'materialId' ? materialIdEnumObjectArray :
                          field === 'internalProtectionId' ? internalProtectionIdEnumObjectArray :
                            ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                              enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectPigRun = PigRunObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'pigRuns', field, nullable, type,
              enumObjectArray: field === 'operatorId' ? operatorIdEnumObjectArray :
                field === 'pigTypeId' ? pigTypeIdEnumObjectArray :
                  ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                    enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectPipelineBatch = PipelineBatchObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'pipelineBatches', field, nullable, type,
              enumObjectArray: field === 'productId' ? productIdEnumObjectArray :
                ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                  enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectChemical = ChemicalObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'chemical', field, nullable, type,
              enumObjectArray: field === 'chemicalSupplierId' ? chemicalSupplierIdEnumObjectArray :
                ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                  enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectWell = WellObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'wells', field, nullable, type,
              enumObjectArray: ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObjectSalesPoint = SalesPointObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'salesPoints', field, nullable, type,
              enumObjectArray: ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                enumObjectArray
            };
            return newObj;
          });


        const searchNavigationObjectPressureTest = PressureTestObjectFields
          .map(({ field, nullable, type, enumObjectArray }) => {
            const newObj: ITableObjectExtend = {
              table: 'pressureTests', field, nullable, type,
              enumObjectArray: ['createdById', 'updatedById'].includes(field) ? userIdEnumObjectArray :
                enumObjectArray
            };
            return newObj;
          });

        const searchNavigationObject = searchNavigationObjectPipeline
          .concat(
            searchNavigationObjectUpstreamPipeline,
            searchNavigationObjectDownstreamPipeline,
            searchNavigationObjectLicenseChange,
            searchNavigationObjectRisk,
            searchNavigationObjectChemical,
            searchNavigationObjectWell,
            searchNavigationObjectSalesPoint,
            searchNavigationObjectGeotechnical,
            searchNavigationObjectCathodicSurvey,
            searchNavigationObjectPressureTest,
            searchNavigationObjectPigRun,
            searchNavigationObjectPipelineBatch,
          );

        return searchNavigationObject as NexusGenObjects['SearchNavigationObject'][];
      }
    })
  }
})
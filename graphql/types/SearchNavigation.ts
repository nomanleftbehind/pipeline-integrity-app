import { enumType, objectType, extendType } from 'nexus';
import { PipelineObjectFields } from './Pipeline';
import { RiskObjectFields } from './Risk';
import { ChemicalObjectFields } from './Chemical';
import { WellObjectFields } from './Well';
import { SalesPointObjectFields } from './SalesPoint';
import { LicenseChangeObjectFields } from './LicenseChange';
import { PressureTestObjectFields } from './PressureTest';
import { PigRunObjectFields } from './PigRun';
import { PipelineBatchObjectFields } from './PipelineBatch';
import {
  loadOperatorEnumObjectArray,
  loadBatchProductEnumObjectArray,
  loadChemicalSupplierEnumObjectArray
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


// interface ITableObjectExtend extends ITableObject {
//   table: NexusGenEnums['TableEnum']
// }
// type ISearchNavigationObject = { table: NexusGenEnums['TableEnum']; field: string; nullable: boolean; type: string; };




export const TableEnumMembers = {
  pipeline: 'pipeline',
  risk: 'risk',
  chemical: 'chemical',
  facility: 'facility',
  satellite: 'satellite',
  wells: 'wells',
  salesPoints: 'salesPoints',
  licenseChanges: 'licenseChanges',
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

export const HavingEnumMembers: { [x: string]: NexusGenEnums['HavingEnum'] } = {
  any: '_any',
  minimum: '_min',
  maximum: '_max',
  count: '_count',
}

export const HavingEnum = enumType({
  name: 'HavingEnum',
  members: HavingEnumMembers,
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

const searchNavigationObjectPipeline = PipelineObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'pipeline', ...obj };
    return newObj;
  });

const searchNavigationObjectUpstreamPipeline = PipelineObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'upstream', ...obj };
    return newObj;
  });

const searchNavigationObjectDownstreamPipeline = PipelineObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'downstream', ...obj };
    return newObj;
  });

const searchNavigationObjectRisk = RiskObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'risk', ...obj };
    return newObj;
  });

const searchNavigationObjectWell = WellObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'wells', ...obj };
    return newObj;
  });

const searchNavigationObjectSalesPoint = SalesPointObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'salesPoints', ...obj };
    return newObj;
  });

const searchNavigationObjectLicenseChange = LicenseChangeObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'licenseChanges', ...obj };
    return newObj;
  });

const searchNavigationObjectPressureTest = PressureTestObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'pressureTests', ...obj };
    return newObj;
  });


export const SearchNavigationQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.nonNull.field('searchNavigationOptions', {
      type: 'SearchNavigationObject',
      resolve: async (_, _args, ctx: Context) => {

        const searchNavigationObjectPigRun = await Promise.all(PigRunObjectFields
          .map(async ({ field, nullable, type, enumObjectArray }) => {
            const operatorIdEnumObjectArray = await loadOperatorEnumObjectArray({ ctx });

            const newObj: ITableObjectExtend = {
              table: 'pigRuns', field, nullable, type, enumObjectArray: field === 'operatorId' ? operatorIdEnumObjectArray : enumObjectArray
            };
            return newObj;
          })
        );

        const searchNavigationObjectPipelineBatch = await Promise.all(PipelineBatchObjectFields
          .map(async ({ field, nullable, type, enumObjectArray }) => {
            const productIdEnumObjectArray = await loadBatchProductEnumObjectArray({ ctx });

            const newObj: ITableObjectExtend = { table: 'pipelineBatches', field, nullable, type, enumObjectArray: field === 'productId' ? productIdEnumObjectArray : enumObjectArray };
            return newObj;
          })
        );

        const searchNavigationObjectChemical = await Promise.all(ChemicalObjectFields
          .map(async ({ field, nullable, type, enumObjectArray }) => {
            const chemicalSupplierIdEnumObjectArray = await loadChemicalSupplierEnumObjectArray({ ctx });

            const newObj: ITableObjectExtend = { table: 'chemical', field, nullable, type, enumObjectArray: field === 'chemicalSupplierId' ? chemicalSupplierIdEnumObjectArray : enumObjectArray };
            return newObj;
          })
        );

        const searchNavigationObject = searchNavigationObjectPipeline
          .concat(
            searchNavigationObjectRisk,
            searchNavigationObjectChemical,
            searchNavigationObjectWell,
            searchNavigationObjectSalesPoint,
            searchNavigationObjectUpstreamPipeline,
            searchNavigationObjectDownstreamPipeline,
            searchNavigationObjectLicenseChange,
            searchNavigationObjectPressureTest,
            searchNavigationObjectPigRun,
            searchNavigationObjectPipelineBatch,
          );

        return searchNavigationObject as NexusGenObjects['SearchNavigationObject'][];
      }
    })
  }
})
import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { PipelineObjectFields } from './Pipeline';
import { RiskObjectFields } from './Risk';
import { WellObjectFields } from './Well';
import { SalesPointObjectFields } from './SalesPoint';
import { LicenseChangeObjectFields } from './LicenseChange';
import { PressureTestObjectFields } from './PressureTest';
import { PigRunObjectFields } from './PigRun';
import { PipelineBatchObjectFields } from './PipelineBatch';
import type { GetGen } from 'nexus/dist/typegenTypeHelpers';
import type { AllNexusOutputTypeDefs } from 'nexus/dist/definitions/wrapping';
import type { NexusMetaType } from 'nexus/dist/definitions/nexusMeta';
import { NexusGenEnums } from 'nexus-typegen';


export type ITableObject = {
  field: string;
  nullable: boolean;
  type: GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs | NexusMetaType;
};


type ITableObjectExtend = ITableObject & { table: NexusGenEnums['TableEnum'] }
type ISearchNavigationObject = { table: NexusGenEnums['TableEnum']; field: string; nullable: boolean; type: string; };



export const TableEnumMembers = {
  pipeline: 'pipeline',
  risk: 'risk',
  facility: 'facility',
  satellite: 'satellite',
  wells: 'wells',
  salesPoints: 'salesPoints',
  licenseChanges: 'licenseChanges',
  pressureTests: 'pressureTests',
  pigRuns: 'pigRuns',
  pipelineBatches: 'pipelineBatches',
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

export const SearchNavigationObject = objectType({
  name: 'SearchNavigationObject',
  definition(t) {
    t.nonNull.field('table', { type: 'TableEnum' })
    t.nonNull.string('field')
    t.nonNull.boolean('nullable')
    t.nonNull.string('type')
  }
});

const searchNavigationObjectPipeline = PipelineObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'pipeline', ...obj };
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

const searchNavigationObjectPigRun = PigRunObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'pigRuns', ...obj };
    return newObj;
  });

const searchNavigationObjectPipelineBatch = PipelineBatchObjectFields
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'pipelineBatches', ...obj };
    return newObj;
  });

const searchNavigationObject = searchNavigationObjectPipeline
  .concat(
    searchNavigationObjectRisk,
    searchNavigationObjectWell,
    searchNavigationObjectSalesPoint,
    searchNavigationObjectLicenseChange,
    searchNavigationObjectPressureTest,
    searchNavigationObjectPigRun,
    searchNavigationObjectPipelineBatch,
  );


export const SearchNavigationQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.nonNull.field('searchNavigationOptions', {
      type: 'SearchNavigationObject',
      resolve: () => {
        return searchNavigationObject as ISearchNavigationObject[];
      }
    })
  }
})
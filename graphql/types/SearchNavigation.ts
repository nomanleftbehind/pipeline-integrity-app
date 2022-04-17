import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { RiskObjectMembers } from './Risk';
import { PipelineObjectMembers } from './Pipeline';
import type { GetGen } from 'nexus/dist/typegenTypeHelpers';
import type { AllNexusOutputTypeDefs } from 'nexus/dist/definitions/wrapping';
import type { NexusMetaType } from 'nexus/dist/definitions/nexusMeta';
import { NexusGenEnums } from 'nexus-typegen';


export type ITableObject = { field: string; nullable: boolean; type: GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs | NexusMetaType };
type ITableObjectExtend = ITableObject & { table: NexusGenEnums['TableEnum'] }
type ISearchNavigationObject = { table: NexusGenEnums['TableEnum']; field: string; nullable: boolean; type: string; };



export const TableEnumMembers = {
  pipeline: 'pipeline',
  risk: 'risk',
  well: 'well',
  facility: 'facility',
  satellite: 'satellite',
  wells: 'wells',
  salesPoints: 'salesPoints',
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

const searchNavigationObject = RiskObjectMembers
  .map((obj) => {
    const newObj: ITableObjectExtend = { table: 'risk', ...obj };
    return newObj;
  })
  .concat(
    PipelineObjectMembers
      .map((obj) => {
        const newObj: ITableObjectExtend = { table: 'pipeline', ...obj };
        return newObj;
      })
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
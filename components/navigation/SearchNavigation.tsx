import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  OperationEnum,
  HavingEnum,
  EnumObject,
  SearchNavigationInput,
  SearchNavigationOptionsQuery,
} from '../../graphql/generated/graphql';

import { IHandleSearchNavigationChange } from './Navigation';
import { prettifyColumnName } from '../Header';
import { IValidatorsNavigation } from '../rows/PipelineData';



export type ISearchNavigationOptions = SearchNavigationOptionsQuery['searchNavigationOptions'];

interface ISearchNavigationProps {
  searchNavigationInputArray: SearchNavigationInput[];
  searchEnumObjectArray: EnumObject[][];
  options?: ISearchNavigationOptions;
  addFilter: () => void;
  removeFilter: (index: number) => void;
  handleChange: ({ e, index, key }: IHandleSearchNavigationChange) => void;
  handleClick: () => void;
  validators?: IValidatorsNavigation;
}

export default function SearchNavigation({ searchNavigationInputArray, searchEnumObjectArray, options, addFilter, removeFilter, handleChange, handleClick, validators }: ISearchNavigationProps) {

  const tableOptions = options?.map(({ table }) => table);

  return (
    <div className='search-navigation-form'>
      {searchNavigationInputArray.map(({ table, field, having, operation, type, value }, index) => {
        return <div className='search-navigation-input-item' key={index}>
          <div style={{ gridRow: '1/6', gridColumn: 1 }}>
            <IconButton className='button-container' size='small' onClick={() => removeFilter(index)}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          </div>

          <div style={{ gridRow: 1, gridColumn: 2 }}>Pipeline by:</div>
          <select style={{ gridRow: 1, gridColumn: 3 }} value={table} onChange={(e) => handleChange({ e, index, key: 'table' })}>
            {tableOptions?.filter((tableName, pos) => tableOptions.indexOf(tableName) === pos)
              .map((tableName, key) => {
                const prettyTableName = prettifyColumnName(tableName)
                return (
                  <option key={key} value={tableName}>
                    {prettyTableName}
                  </option>
                );
              })}
          </select>

          {<>
            <div style={{ gridRow: 2, gridColumn: 2 }}>Field:</div>
            <select
              style={{ gridRow: 2, gridColumn: 3 }} value={field} onChange={(e) => handleChange({ e, index, key: 'field' })}
              disabled={/* When "having" clause is set to `count` "field" is set to `id` automatically, so we are not allowed to change it */ having === HavingEnum.Count}>
              {options?.filter(({ table: tableName }) => tableName === table).map(({ field: fieldName }) => {
                const prettyField = prettifyColumnName(fieldName);
                return (
                  <option key={fieldName} value={fieldName}>{prettyField}</option>
                );
              })}
            </select>
          </>}

          { // This section is only available for one-to-many and many-to-many relationship tables in respect to pipelines table
            (table === 'licenseChanges' || table === 'geotechnicalParameters' || table === 'wells' || table === 'salesPoints' || table === 'pigRuns' || table === 'pressureTests' || table === 'pipelineBatches' || table === 'cathodicSurveys' || table === 'upstreamPipelines' || table === 'downstreamPipelines') && <>
              <div style={{ gridRow: 3, gridColumn: 2 }}>Where:</div>
              <select style={{ gridRow: 3, gridColumn: 3 }} value={having} onChange={(e) => handleChange({ e, index, key: 'having' })}>
                {validators && validators.havingEnum.filter(({ serverEnum }) => {

                  if (table === 'upstreamPipelines' || table === 'downstreamPipelines') {
                    // many-to-many relationship tables (upstream and downstream pipelines are only such tables in the database)
                    if (having === HavingEnum.Count) {
                      // When searching by "having" clause `count` in many-to-many relationship records, we can only again select search by "having" clause `any` or `count`
                      // because when we selected `count` the first time, search by "field" clause was automatically set to `id` which is a `String` "type"
                      // (Special case used only when searching by `count` of related fields, "field" is set to `id` and "type" is set to `Int` even though `id` is of type `String`)
                      // Pair that with the fact that none of the many-to-many relationship records have date column, meaning we are not able to search by `first` or `last` "having" clause.
                      // That leaves us with only `any` or `count`.
                      return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                    }
                    if (['Int', 'Float', 'DateTime'].includes(type)) {
                      // TODO
                      // Enable search by min and max on server side for many-to-many relationship tables numeric fields.
                      // Then come back here and add HavingEnum.Minimum, HavingEnum.Maximum
                      // HavingEnum.First and HavingEnum.Last are not a possibility here because many-to-many tables don't have date column.
                      return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                    }
                    return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                  }
                  if (table === 'wells' || table === 'salesPoints') {
                    // one-to-many relationship tables without the date column (meaning we can't search by first/last condition)
                    if (having === HavingEnum.Count) {
                      // Same as with many-to-many relationship tables, we can't select `min` or `max` "having" clause, because when `count` "having" was first selected, "field" was changed to `id` which is a `String` type,
                      // and we can't select `first` or `last` "having" clause because these tables don't have date column.
                      return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                    }
                    if (['Int', 'Float', 'DateTime'].includes(type)) {
                      // When searching for numeric types we would normally be able to specify "having" clause, but because these tables don't have date column we have to filter out `first` and `last`
                      return serverEnum !== HavingEnum.First && serverEnum !== HavingEnum.Last;
                    }
                    return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                  }
                  // Left with one-to-many relationship tables with date column
                  if (having === HavingEnum.Count) {
                    // We are able to add `first` and `last` to "having" selection because these tables have date column.
                    return serverEnum !== HavingEnum.Minimum && serverEnum !== HavingEnum.Maximum;
                  }
                  if (['Int', 'Float', 'DateTime'].includes(type)) {
                    // return all options if numeric type
                    return true;
                  }
                  // We cannot search by min/max values on non-numeric types
                  return serverEnum !== HavingEnum.Minimum && serverEnum !== HavingEnum.Maximum;

                }).map(({ serverEnum }) => {

                  const prettyHaving = prettifyColumnName(serverEnum);
                  // const customHaving = type === 'DateTime' ? serverEnum === HavingEnum.Minimum ? 'First' : serverEnum === HavingEnum.Maximum ? 'Last' : prettyHaving : prettyHaving;

                  return (
                    <option key={serverEnum} value={serverEnum}>{prettyHaving}</option>
                  );
                })}
              </select>
            </>}

          <div style={{ gridRow: 4, gridColumn: 2 }}>Operation:</div>
          <select style={{ gridRow: 4, gridColumn: 3 }} value={operation} onChange={(e) => handleChange({ e, index, key: 'operation' })}>
            {validators && validators.operationEnum.filter(({ serverEnum }) => {

              if (['Int', 'Float', 'DateTime'].includes(type)) {
                return [OperationEnum.Equals, OperationEnum.GreaterThan, OperationEnum.GreaterThanOrEqual, OperationEnum.LessThan, OperationEnum.LessThanOrEqual, OperationEnum.Not].includes(serverEnum as OperationEnum);
              }
              if (type === 'String') {
                return [OperationEnum.Equals, OperationEnum.Contains, OperationEnum.StartsWith, OperationEnum.EndsWith, OperationEnum.Not].includes(serverEnum as OperationEnum);
              }
              if (type === 'Boolean' || searchEnumObjectArray[index].length > 0) {
                return [OperationEnum.Equals, OperationEnum.Not].includes(serverEnum as OperationEnum);
              }

            }).map(({ serverEnum }) => {

              const prettyOperation = prettifyColumnName(serverEnum);
              const customOperation = type === 'DateTime' ? serverEnum === OperationEnum.GreaterThan ? 'After' : serverEnum === OperationEnum.GreaterThanOrEqual ? 'After Or Equal' : serverEnum === OperationEnum.LessThan ? 'Before' : serverEnum === OperationEnum.LessThanOrEqual ? 'Before Or Equal' : prettyOperation : prettyOperation;
              return (
                <option key={serverEnum} value={serverEnum}>{customOperation}</option>
              );
            })}
          </select>

          <div style={{ gridRow: 5, gridColumn: 2 }}>Value:</div>
          {searchEnumObjectArray[index].length > 0/* && having !== HavingEnum.Count*/ ?
            <select style={{ gridRow: 5, gridColumn: 3 }} value={value} onChange={(e) => handleChange({ e, index, key: 'value' })}>
              {searchEnumObjectArray[index].map(({ serverEnum, databaseEnum }) => {
                return (
                  <option key={serverEnum} value={serverEnum}>{databaseEnum}</option>
                )
              })}
            </select> :
            <input
              style={{ gridRow: 5, gridColumn: 3 }}
              type={['Int', 'Float'].includes(type) ? 'number' : type === 'DateTime' ? 'date' : 'text'}
              value={value}
              onChange={(e) => handleChange({ e, index, key: 'value' })}
            />
          }

        </div>
      })}

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <IconButton size='small' onClick={addFilter}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
          <div>Add Filter</div>
        </div>
        <IconButton aria-label='submit-search' size='small' onClick={handleClick} disabled={searchNavigationInputArray.length === 0 || searchNavigationInputArray.find(({ value }) => value === '') !== undefined}>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}
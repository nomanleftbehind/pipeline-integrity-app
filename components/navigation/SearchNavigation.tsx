import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  TableEnum,
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

          {having !== HavingEnum.Count && <>
            <div style={{ gridRow: 2, gridColumn: 2 }}>Field:</div>
            <select style={{ gridRow: 2, gridColumn: 3 }} value={field} onChange={(e) => handleChange({ e, index, key: 'field' })}>
              {options?.filter(({ table: tableName }) => tableName === table).map(({ field: fieldName }) => {
                const prettyField = prettifyColumnName(fieldName);
                return (
                  <option key={fieldName} value={fieldName}>{prettyField}</option>
                );
              })}
            </select>
          </>}

          {(table === 'licenseChanges' || table === 'geotechnicalParameters' || table === 'wells' || table === 'salesPoints' || table === 'pigRuns' || table === 'pressureTests' || table === 'pipelineBatches' || table === 'cathodicSurveys' || table === 'upstreamPipelines' || table === 'downstreamPipelines') && <>
            <div style={{ gridRow: 3, gridColumn: 2 }}>Where:</div>
            <select style={{ gridRow: 3, gridColumn: 3 }} value={having} onChange={(e) => handleChange({ e, index, key: 'having' })}>
              {validators && validators.havingEnum.filter(({ serverEnum }) => {

                // Special case when searching for Count of related fields, field is set to `id` and type is set to `Int` even though `id` is of type `String`
                // We are never able to select `minimum` or `maximum` Having when type is String, but because in this special case, we have to add special condition when current Having is Count.
                if (having === HavingEnum.Count) {
                  return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                }
                if (table === 'upstreamPipelines' || table === 'downstreamPipelines') {
                  // Only many-to-many relationship tables
                  if (['Int', 'Float', 'DateTime'].includes(type)) {
                    // TODO
                    // Enable search by min, max, first, last on backend for upstream and downstream pipelines many-to-many relationship with pipelines table
                    // Then come back here and add HavingEnum.Minimum, HavingEnum.Maximum
                    return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                  }
                  return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                }
                if (table === 'wells' || table === 'salesPoints') {
                  // one-to-many relationship tables without the date column (meaning we can't search by first/last condition)
                  if (['Int', 'Float', 'DateTime'].includes(type)) {
                    return serverEnum !== HavingEnum.First && serverEnum !== HavingEnum.Last;
                  }
                  return serverEnum === HavingEnum.Any || serverEnum === HavingEnum.Count;
                }
                // Only left with one-to-many relationship tables
                if (['Int', 'Float', 'DateTime'].includes(type)) {
                  // return all options if numeric type
                  return true;
                }
                // Only left with non-numeric types in one-to-many relationship tables where we cannot search by min/max values
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
          {searchEnumObjectArray[index].length > 0 && having !== HavingEnum.Count ?
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
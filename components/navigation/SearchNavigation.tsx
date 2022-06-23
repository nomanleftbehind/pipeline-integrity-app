import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  useOperationAndHavingEnumQuery,
  TableEnum,
  OperationEnum,
  HavingEnum,
  EnumObject,
  SearchNavigationInput,
  SearchNavigationOptionsQuery,
} from '../../graphql/generated/graphql';

import { IHandleSearchNavigationChange } from './Navigation';
import { prettifyColumnName } from '../Header';
import { Table } from '@mui/material';



export type ISearchNavigationOptions = SearchNavigationOptionsQuery['searchNavigationOptions'];

interface ISearchNavigationProps {
  searchNavigationInputArray: SearchNavigationInput[];
  searchEnumObjectArray: EnumObject[][];
  options?: ISearchNavigationOptions;
  addFilter: () => void;
  removeFilter: (index: number) => void;
  handleChange: ({ e, index, key }: IHandleSearchNavigationChange) => void;
  handleClick: () => void;
}

export default function SearchNavigation({ searchNavigationInputArray, searchEnumObjectArray, options, addFilter, removeFilter, handleChange, handleClick }: ISearchNavigationProps) {

  const tableOptions = options?.map(({ table }) => table);

  const { data: dataOperationAndHavingEnum } = useOperationAndHavingEnumQuery();

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

          {[TableEnum.LicenseChanges, TableEnum.Wells, TableEnum.SalesPoints, TableEnum.PigRuns, TableEnum.PressureTests, TableEnum.PipelineBatches, TableEnum.UpstreamPipelines, TableEnum.DownstreamPipelines].includes(table) && <>
            <div style={{ gridRow: 3, gridColumn: 2 }}>Having:</div>
            <select style={{ gridRow: 3, gridColumn: 3 }} value={having} onChange={(e) => handleChange({ e, index, key: 'having' })}>
              {dataOperationAndHavingEnum?.validators && Object.values(dataOperationAndHavingEnum.validators.havingEnum).filter((operationDb) => {
                // Special case when searching for Count of related fields, field is set to `id` and type is set to `Int` even though `id` is of type `String`
                // We are never able to select `minimum` or `maximum` Having when type is String, but because in this special case, we have to add special condition when current Having is Count.
                if (['Int', 'Float', 'DateTime'].includes(type) && having !== HavingEnum.Count && ![TableEnum.DownstreamPipelines, TableEnum.UpstreamPipelines].includes(table)) {
                  return true;
                }
                return [HavingEnum.Any, HavingEnum.Count].includes(operationDb);

              }).map((operationDb) => {

                const prettyHaving = prettifyColumnName(operationDb);
                const customHaving = type === 'DateTime' ? operationDb === HavingEnum.Minimum ? 'First' : operationDb === HavingEnum.Maximum ? 'Last' : prettyHaving : prettyHaving;

                return (
                  <option key={operationDb} value={operationDb}>{customHaving}</option>
                );
              })}
            </select>
          </>}

          <div style={{ gridRow: 4, gridColumn: 2 }}>Operation:</div>
          <select style={{ gridRow: 4, gridColumn: 3 }} value={operation} onChange={(e) => handleChange({ e, index, key: 'operation' })}>
            {dataOperationAndHavingEnum?.validators && Object.values(dataOperationAndHavingEnum.validators.operationEnum).filter((operationDb) => {

              if (['Int', 'Float', 'DateTime'].includes(type) || having === HavingEnum.Count) {
                return [OperationEnum.Equals, OperationEnum.GreaterThan, OperationEnum.GreaterThanOrEqual, OperationEnum.LessThan, OperationEnum.LessThanOrEqual, OperationEnum.Not].includes(operationDb);
              }
              if (type === 'String') {
                return [OperationEnum.Equals, OperationEnum.Contains, OperationEnum.StartsWith, OperationEnum.EndsWith, OperationEnum.Not].includes(operationDb);
              }
              if (type === 'Boolean' || searchEnumObjectArray[index].length > 0) {
                return [OperationEnum.Equals, OperationEnum.Not].includes(operationDb);
              }

            }).map((operationDb) => {

              const prettyOperation = prettifyColumnName(operationDb);
              const customOperation = type === 'DateTime' ? operationDb === OperationEnum.GreaterThan ? 'After' : operationDb === OperationEnum.GreaterThanOrEqual ? 'After Or Equal' : operationDb === OperationEnum.LessThan ? 'Before' : operationDb === OperationEnum.LessThanOrEqual ? 'Before Or Equal' : prettyOperation : prettyOperation;
              return (
                <option key={operationDb} value={operationDb}>{customOperation}</option>
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
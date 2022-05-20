import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  useSearchNavigationOptionsQuery,
  useOperationEnumQuery,
  TableEnum,
  OperationEnum,
  EnumObject,
  SearchNavigationInput,
} from '../../graphql/generated/graphql';

import { IOnNavigationAction } from './HierarchyNavigation';
import { prettifyColumnName } from '../Header';

interface ISearchNavigationProps {
  onSearchNavigation: IOnNavigationAction
}


export default function SearchNavigation({ onSearchNavigation }: ISearchNavigationProps) {

  const [searchNavigationInputArray, setSearchNavigationInputArray] = useState<SearchNavigationInput[]>([]);
  const [searchEnumObjectArray, setSearchEnumObjectArray] = useState<EnumObject[][]>([]);

  const { data } = useSearchNavigationOptionsQuery();
  const { data: dataOperationEnum } = useOperationEnumQuery();

  const addFilter = () => {
    setSearchNavigationInputArray(previousSearchNavigationInputArray => [...previousSearchNavigationInputArray, { table: TableEnum.Pipeline, field: 'id', operation: OperationEnum.Equals, type: 'String', value: '' }]);
    setSearchEnumObjectArray(previousSearchEnumObjectArray => [...previousSearchEnumObjectArray, []]);
  }

  const removeFilter = (index: number) => {
    setSearchNavigationInputArray(searchNavigationInputArray.filter((_, i) => i !== index));
    setSearchEnumObjectArray(searchEnumObjectArray.filter((_, i) => i !== index));
  }

  const options = data?.searchNavigationOptions;
  const tableOptions = options?.map(({ table }) => table);

  const handleChange = ({ e, index, key }: { e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number, key: keyof SearchNavigationInput }) => {
    let newSearchNavigationInputArray = [...searchNavigationInputArray];
    let searchItem = { ...newSearchNavigationInputArray[index] };

    let newSearchEnumObjectArray = [...searchEnumObjectArray];
    let newSearchEnumObject = [...newSearchEnumObjectArray[index]];

    if (key === 'table') {
      searchItem[key] = e.target.value as TableEnum;
      searchItem.field = 'id';
      searchItem.type = 'String';
      searchItem.operation = OperationEnum.Equals;
      searchItem.value = '';
      newSearchEnumObject = [];

    } else if (key === 'field') {
      searchItem[key] = e.target.value;
      searchItem.value = '';
      const { type, enumObjectArray } = options?.find(({ table, field }) => table === searchItem.table && field === e.target.value) || {};
      searchItem.type = type || '';
      newSearchEnumObject = type === 'Boolean' ? [
        { serverEnum: 'true', databaseEnum: 'Y', },
        { serverEnum: 'false', databaseEnum: 'N', },
      ] : enumObjectArray ? enumObjectArray :
        [];

    } else if (key === 'operation') {
      searchItem[key] = e.target.value as OperationEnum;

    } else if (key === 'value') {
      searchItem[key] = e.target.value;
    }

    newSearchNavigationInputArray[index] = searchItem;
    setSearchNavigationInputArray(newSearchNavigationInputArray);

    newSearchEnumObjectArray[index] = newSearchEnumObject;
    setSearchEnumObjectArray(newSearchEnumObjectArray);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearchNavigation({
      search: searchNavigationInputArray
    })
  }

  useEffect(() => {
    console.log(dataOperationEnum?.validators);
  }, [dataOperationEnum?.validators])

  return (
    <form className='search-navigation-form' onSubmit={onSubmit}>
      {searchNavigationInputArray.map(({ table, field, operation, type, value }, index) => {
        return <div className='search-navigation-input-item' key={index}>
          <div style={{ gridRow: '1/5', gridColumn: 1 }}>
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

          <div style={{ gridRow: 2, gridColumn: 2 }}>Field:</div>
          <select style={{ gridRow: 2, gridColumn: 3 }} value={field} onChange={(e) => handleChange({ e, index, key: 'field' })}>
            {options?.filter(({ table: tableName }) => tableName === table).map(({ field: fieldName }) => {
              const prettyField = prettifyColumnName(fieldName);
              return (
                <option key={fieldName} value={fieldName}>{prettyField}</option>
              );
            })}
          </select>

          <div style={{ gridRow: 3, gridColumn: 2 }}>Operation:</div>
          <select style={{ gridRow: 3, gridColumn: 3 }} value={operation} onChange={(e) => handleChange({ e, index, key: 'operation' })}>
            {dataOperationEnum?.validators && Object.values(dataOperationEnum.validators.operationEnum).filter((operationDb) => {

              if (['Int', 'Float', 'DateTime'].includes(type)) {
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
              return (
                <option key={operationDb} value={operationDb}>{prettyOperation}</option>
              );
            })}
          </select>

          <div style={{ gridRow: 4, gridColumn: 2 }}>Value:</div>
          {searchEnumObjectArray[index].length > 0 ?
            <select style={{ gridRow: 4, gridColumn: 3 }} value={value} onChange={(e) => handleChange({ e, index, key: 'value' })}>
              {searchEnumObjectArray[index].map(({ serverEnum, databaseEnum }) => {
                return (
                  <option key={serverEnum} value={serverEnum}>{databaseEnum}</option>
                )
              })}
            </select> :
            <input
              style={{ gridRow: 4, gridColumn: 3 }}
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
        <IconButton aria-label='submit-search' size='small' type='submit' disabled={searchNavigationInputArray.length === 0 || searchNavigationInputArray.find(({ value }) => value === '') !== undefined}>
          <SearchIcon />
        </IconButton>
      </div>
    </form>
  );
}
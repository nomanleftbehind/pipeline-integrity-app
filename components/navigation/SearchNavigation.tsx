import { useState, useEffect, Fragment } from 'react';
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
    setSearchNavigationInputArray(previousSearchNavigationInputArray => [...previousSearchNavigationInputArray, { table: TableEnum.Pipeline, field: '', operation: OperationEnum.Equals, type: '', value: '' }]);
    setSearchEnumObjectArray(previousSearchEnumObjectArray => [...previousSearchEnumObjectArray, []]);
  }

  const removeFilter = (index: number) => {
    setSearchNavigationInputArray(searchNavigationInputArray.filter((_, i) => i !== index));
    setSearchEnumObjectArray(searchEnumObjectArray.filter((_, i) => i !== index));
  }

  const options = data?.searchNavigationOptions;
  const tableOptions = options?.map(({ table }) => table);

  const handleChange = ({ e, index, key }: { e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number, key: keyof SearchNavigationInput }) => {
    let newSearchArray = [...searchNavigationInputArray];
    let searchItem = { ...newSearchArray[index] };

    let newSearchEnumObjectArray = [...searchEnumObjectArray];
    let newSearchEnumObject = [...newSearchEnumObjectArray[index]];

    if (key === 'table') {
      searchItem[key] = e.target.value as TableEnum;
      searchItem.field = '';
      searchItem.type = '';
      searchItem.operation = OperationEnum.Equals;
      searchItem.value = '';
      newSearchEnumObject = [];

    } else if (key === 'field') {
      searchItem[key] = e.target.value;
      searchItem.value = '';
      const { type, enumObjectArray } = options?.find(({ table, field }) => table === searchItem.table && field === e.target.value) || {};
      searchItem.type = type || '';
      newSearchEnumObject = enumObjectArray ? enumObjectArray :
        type === 'Boolean' ? [
          { serverEnum: 'true', databaseEnum: 'Y', },
          { serverEnum: '', databaseEnum: 'N', },
        ] : [];

    } else if (key === 'operation') {
      searchItem[key] = e.target.value as OperationEnum;

    } else if (key === 'value') {
      searchItem[key] = e.target.value;
    }

    newSearchArray[index] = searchItem;
    setSearchNavigationInputArray(newSearchArray);

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
    console.log(searchEnumObjectArray);
  }, [searchEnumObjectArray])


  return (
    <form className='search-navigation-form' onSubmit={onSubmit}>
      {/* <div style={{ gridRow: 1, gridColumn: 1 }}>
        <IconButton className='button-container' size='small' onClick={toggleSearch}>{search ? <SearchOffIcon /> : <ManageSearchIcon />}</IconButton>
      </div> */}

      {searchNavigationInputArray.map(({ table, field, operation, type, value }, index) => {
        return <div className='search-navigation-input-item' key={index}>
          <div style={{ gridRow: '1/3', gridColumn: 1 }}>
            <IconButton className='button-container' size='small' onClick={() => removeFilter(index)}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          </div>

          <div style={{ gridRow: 1, gridColumn: 2 }}>Pipeline by:</div>
          <select style={{ gridRow: 1, gridColumn: 3 }} value={searchNavigationInputArray[index].table} onChange={(e) => handleChange({ e, index, key: 'table' })}>
            {tableOptions?.filter((table, pos) => {
              return tableOptions.indexOf(table) === pos;
            }).map((table, key) => {
              const prettyTableName = prettifyColumnName(table)
              return (
                <option key={key} value={table}>
                  {prettyTableName}
                </option>
              );
            })}
          </select>

          <div style={{ gridRow: 2, gridColumn: 2 }}>Field:</div>
          <select style={{ gridRow: 2, gridColumn: 3 }} value={searchNavigationInputArray[index].field} onChange={(e) => handleChange({ e, index, key: 'field' })}>
            <option></option>
            {options?.filter(({ table }) => table === searchNavigationInputArray[index].table).map(({ field }) => {
              const prettyField = prettifyColumnName(field);
              return (
                <option key={field} value={field}>{prettyField}</option>
              );
            })}
          </select>

          <div style={{ gridRow: 3, gridColumn: 2 }}>Operation:</div>
          <select style={{ gridRow: 3, gridColumn: 3 }} value={searchNavigationInputArray[index].operation} onChange={(e) => handleChange({ e, index, key: 'operation' })}>
            {dataOperationEnum?.validators && Object.values(dataOperationEnum.validators.operationEnum)/*.filter((operationDb) => {

              if (['Int', 'Float', 'DateTime'].includes(searchNavigationInputArray[index].type)) {
                return [OperationEnum.Equals, OperationEnum.GreaterThan, OperationEnum.GreaterThanOrEqual, OperationEnum.LessThan, OperationEnum.LessThanOrEqual, OperationEnum.Not].includes(operationDb);
              }
              if (searchFieldType === 'String') {
                return [OperationEnum.Equals, OperationEnum.Contains, OperationEnum.StartsWith, OperationEnum.EndsWith, OperationEnum.Not].includes(operationDb);
              }
              if (searchFieldType === 'Boolean' || searchEnumObjectArray.length > 0) {
                return [OperationEnum.Equals, OperationEnum.Not].includes(operationDb);
              }
              // console.log(operationDb, [OperationEnum.Equals, OperationEnum.Not].includes(operationDb));
              
            })*/.map((operationDb) => {
              // console.log(operationDb);

              const prettyOperation = prettifyColumnName(operationDb);
              return (
                <option key={operationDb} value={operationDb}>{prettyOperation}</option>
              );
            })}
          </select>

          <div style={{ gridRow: 4, gridColumn: 2 }}>Value:</div>
          {searchEnumObjectArray[index].length > 0 ?
            <select style={{ gridRow: 4, gridColumn: 3 }} value={searchNavigationInputArray[index].value} onChange={(e) => handleChange({ e, index, key: 'value' })}>
              {searchEnumObjectArray[index].map(({ serverEnum, databaseEnum }) => {
                return (
                  <option key={serverEnum} value={serverEnum}>{databaseEnum}</option>
                )
              })}
            </select> :
            <input
              style={{ gridRow: 4, gridColumn: 3 }}
              type={['Int', 'Float'].includes(searchNavigationInputArray[index].type) ? 'number' : searchNavigationInputArray[index].type === 'DateTime' ? 'date' : 'text'}
              value={searchNavigationInputArray[index].value}
              onChange={(e) => handleChange({ e, index, key: 'value' })}
            />
          }

        </div>
      })}
      <div>
        <IconButton className='button-container' size='small' onClick={addFilter}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>

      {<div>
        <IconButton aria-label='submit-search' size='small' type='submit'><SearchIcon /></IconButton>
      </div>}
    </form>
  );
}
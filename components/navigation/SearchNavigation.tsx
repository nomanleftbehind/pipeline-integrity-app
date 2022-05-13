import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  useSearchNavigationOptionsLazyQuery,
  useOperationEnumLazyQuery,
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

  const [search, setSearch] = useState(false);

  const [searchArray, setSearchArray] = useState<SearchNavigationInput[]>([]);

  const [searchTable, setSearchTable] = useState<TableEnum>(TableEnum.Pipeline);
  const [searchField, setSearchField] = useState('');
  const [searchFieldType, setSearchFieldType] = useState('');
  const [searchEnumObjectArray, setSearchEnumObjectArray] = useState<EnumObject[]>([]);
  const [searchOperation, setSearchOperation] = useState<OperationEnum>(OperationEnum.Equals);
  const [searchValue, setSearchValue] = useState('');

  const [loadSearchOptions, { data }] = useSearchNavigationOptionsLazyQuery();
  const [loadOperationEnum, { data: dataOperationEnum }] = useOperationEnumLazyQuery();


  const toggleSearch = () => {
    setSearchTable(TableEnum.Pipeline);
    setSearchField('');
    setSearchFieldType('');
    setSearchOperation(OperationEnum.Equals);
    setSearchValue('');
    setSearch(!search);
    loadSearchOptions();
  }

  const options = data?.searchNavigationOptions;
  const tableOptions = options?.map(({ table }) => table);

  const handleChangeTable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTable(e.target.value as TableEnum);
    setSearchField('');
    setSearchFieldType('');
    setSearchOperation(OperationEnum.Equals);
  }

  const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    loadOperationEnum();
    setSearchField(e.target.value);
    setSearchValue('');
    setSearchOperation(OperationEnum.Equals);
    const { type, enumObjectArray } = options?.find(({ table, field }) => table === searchTable && field === e.target.value) || {};
    setSearchFieldType(type || '');
    setSearchEnumObjectArray(enumObjectArray ? enumObjectArray :
      type === 'Boolean' ? [
        { serverEnum: 'true', databaseEnum: 'Y', },
        { serverEnum: '', databaseEnum: 'N', },
      ] : []);
  }

  const handleChangeOperation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOperation(e.target.value as OperationEnum);
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchValue(e.target.value);
    setSearchArray(previousSearchArray => [...previousSearchArray, {
      table: searchTable,
      field: searchField,
      type: searchFieldType,
      operation: searchOperation,
      value: searchValue,
    }])
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearchNavigation({
      search: [
        {
          table: searchTable,
          field: searchField,
          type: searchFieldType,
          operation: searchOperation,
          value: searchValue,
        }
      ]
    })
  }

  useEffect(() => {
    console.log(searchTable, searchField, searchFieldType, searchValue, searchOperation, searchArray);
  }, [searchTable, searchField, searchFieldType, searchValue, searchOperation, searchArray])


  return (
    // <div>
    <form className='search-navigation-form' onSubmit={onSubmit}>
      <div style={{ gridRow: 1, gridColumn: 1 }}>
        <IconButton className='button-container' size='small' onClick={toggleSearch}>{search ? <SearchOffIcon /> : <ManageSearchIcon />}</IconButton>
      </div>
      {search && tableOptions && <><div style={{ gridRow: 1, gridColumn: '2/4' }}>Pipeline by:</div>
        <select style={{ gridRow: 1, gridColumn: '4/6' }} value={searchTable} onChange={handleChangeTable}>
          {tableOptions.filter((table, pos) => {
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
      </>}
      {search && searchTable && options && <>
        <div style={{ gridRow: 2, gridColumn: '1/3' }}>Field:</div>
        <select style={{ gridRow: 2, gridColumn: '3/6' }} value={searchField} onChange={handleChangeField}>
          <option></option>
          {options.filter(({ table }) => table === searchTable).map(({ field }) => {
            const prettyField = prettifyColumnName(field);
            return (
              <option key={field} value={field}>{prettyField}</option>
            );
          })}
        </select>
      </>}
      {search && searchField && dataOperationEnum?.validators && <>
        <div style={{ gridRow: 3, gridColumn: '1/3' }}>Operation:</div>
        <select style={{ gridRow: 3, gridColumn: '3/6' }} value={searchOperation} onChange={handleChangeOperation}>
          {Object.values(dataOperationEnum.validators.operationEnum).filter((operationDb) => {
            if (['Int', 'Float', 'DateTime'].includes(searchFieldType)) {
              return [OperationEnum.Equals, OperationEnum.GreaterThan, OperationEnum.GreaterThanOrEqual, OperationEnum.LessThan, OperationEnum.LessThanOrEqual, OperationEnum.Not].includes(operationDb);
            }
            if (searchFieldType === 'String') {
              return [OperationEnum.Equals, OperationEnum.Contains, OperationEnum.StartsWith, OperationEnum.EndsWith, OperationEnum.Not].includes(operationDb);
            }
            if (searchFieldType === 'Boolean' || searchEnumObjectArray.length > 0) {
              return [OperationEnum.Equals, OperationEnum.Not].includes(operationDb);
            }
          }).map((operationDb) => {
            const prettyOperation = prettifyColumnName(operationDb);
            return (
              <option key={operationDb} value={operationDb}>{prettyOperation}</option>
            );
          })}
        </select>
      </>}
      {searchField && <>
        <div style={{ gridRow: 4, gridColumn: '1/3' }}>Value:</div>
        {searchEnumObjectArray.length > 0 ?
          <select style={{ gridRow: 4, gridColumn: '3/5' }} value={searchValue} onChange={handleChangeValue}>
            {searchEnumObjectArray.map(({ serverEnum, databaseEnum }) => {
              return (
                <option key={serverEnum} value={serverEnum}>{databaseEnum}</option>
              )
            })}
          </select> :
          <input style={{ gridRow: 4, gridColumn: '3/5' }} type={['Int', 'Float'].includes(searchFieldType) ? 'number' : ['DateTime'].includes(searchFieldType) ? 'date' : 'text'} value={searchValue} onChange={handleChangeValue} />
        }
      </>}
      {searchField && <div style={{ gridRow: 4, gridColumn: 5 }}>
        <IconButton aria-label='disconnect row' size='small' type='submit'><SearchIcon /></IconButton>
      </div>}
    </form>
    // </div>
  );
}
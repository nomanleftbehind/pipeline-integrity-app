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
} from '../../graphql/generated/graphql';

import { IOnNavigationAction } from './HierarchyNavigation';
import { prettifyColumnName } from '../Header';

interface ISearchNavigationProps {
  onSearchNavigation: IOnNavigationAction
}


export default function SearchNavigation({ onSearchNavigation }: ISearchNavigationProps) {

  const [search, setSearch] = useState(false);

  const [searchTable, setSearchTable] = useState<TableEnum>(TableEnum.Risk);
  const [searchField, setSearchField] = useState('');
  const [searchFieldType, setSearchFieldType] = useState('');
  const [searchOperation, setSearchOperation] = useState<OperationEnum>(OperationEnum.Equals);
  const [searchValue, setSearchValue] = useState('');

  const [loadSearchOptions, { data }] = useSearchNavigationOptionsLazyQuery();
  const [loadOperationEnum, { data: dataOperationEnum }] = useOperationEnumLazyQuery();

  const toggleSearch = () => {
    setSearchTable(TableEnum.Risk);
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
  }

  const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    loadOperationEnum();
    setSearchField(e.target.value);
    setSearchValue('');
    const { type } = options?.find(({ table, field }) => table === searchTable && field === e.target.value) || {};
    setSearchFieldType(type || '');
  }

  const handleChangeOperation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOperation(e.target.value as OperationEnum);
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearchNavigation({
      search: {
        table: searchTable,
        field: searchField,
        type: searchFieldType,
        operation: searchOperation,
        value: searchValue,
      }
    })
  }

  const a = dataOperationEnum?.validators && Object.entries(dataOperationEnum.validators.operationEnum).map(([aa, op]) => {
    console.log(aa, op);
    return op
  })

  useEffect(() => {
    console.log(searchTable, searchField, searchFieldType, searchValue, a);
  }, [searchTable, searchField, searchFieldType, searchValue, a])


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
      {/* {search && searchTable && dataOperationEnum?.validators && <>
        <div style={{ gridRow: 3, gridColumn: '1/3' }}>Operation:</div>
        <select style={{ gridRow: 3, gridColumn: '3/6' }} value={searchOperation} onChange={handleChangeOperation}>
          {Object.entries(dataOperationEnum.validators).filter(([_, op]) => op === OperationEnum.Contains).map(({ field }) => {
            const prettyField = prettifyColumnName(field);
            return (
              <option key={field} value={field}>{prettyField}</option>
            );
          })}
        </select>
      </>} */}
      {searchField && <>
        <div style={{ gridRow: 4, gridColumn: '1/3' }}>Value:</div>
        <input style={{ gridRow: 4, gridColumn: '3/5' }} type={['Int', 'Float'].includes(searchFieldType) ? 'number' : ['DateTime'].includes(searchFieldType) ? 'date' : 'text'} value={searchValue} onChange={handleChangeValue} />
      </>}
      {searchField && <div style={{ gridRow: 4, gridColumn: 5 }}>
        <IconButton aria-label='disconnect row' size='small' type='submit'><SearchIcon /></IconButton>
      </div>}
    </form>
    // </div>
  );
}
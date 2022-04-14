import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  useSearchNavigationOptionsLazyQuery,
} from '../../graphql/generated/graphql';

import { IOnNavigationAction } from './HierarchyNavigation';
import { prettifyColumnName } from '../Header';

interface ISearchNavigationProps {
  onSearchNavigation: IOnNavigationAction
}


export default function SearchNavigation({ onSearchNavigation }: ISearchNavigationProps) {

  const [search, setSearch] = useState(false);

  const [searchTable, setSearchTable] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [loadSearchOptions, { data }] = useSearchNavigationOptionsLazyQuery();

  const toggleSearch = () => {
    setSearchTable('');
    setSearchField('');
    setSearchValue('');
    setSearch(!search);
    loadSearchOptions();

  }

  const options = data?.searchNavigationOptions;


  const handleChangeTable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTable(e.target.value);
    setSearchField('');
  }

  const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(e.target.value);
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
        value: searchValue,
      }
    })
  }

  // useEffect(() => {
  //   console.log(searchTable);
  //   console.log(searchField);

  // }, [searchTable, searchField])

  return (
    <div>
      {/* <div> */}
      <IconButton size='small' onClick={toggleSearch}>{search ? <SearchOffIcon /> : <SearchIcon />}</IconButton>
      {/* </div> */}
      {search && options && <form style={{ display: 'flex', flexDirection: 'column', border: '1px solid black' }} onSubmit={onSubmit}>
        <select value={searchTable} onChange={handleChangeTable}>
          <option></option>
          {/* {options.filter((item, pos) => {
            const prettyTableName = prettifyColumnName(table)
            return (
              <option key={key} value={table}>
                {prettyTableName}
              </option>
            );
          })} */}
        </select>
        {searchTable && options && <select value={searchField} onChange={handleChangeField}>
          {options.filter(({table}) => table === 'risk').map(({ table, field, nullable, type }) => {
            const prettyField = prettifyColumnName(field)
            return (
              <option key={field} value={field}>{prettyField}</option>
            );
          })}
        </select>}
        {searchField && <input type="text" value={searchValue} onChange={handleChangeValue}>
        </input>}
        <IconButton aria-label='disconnect row' size='small' type='submit'><CheckCircleOutlineIcon /></IconButton>
      </form>
      }
    </div>
  );
}
import { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import HierarchyNavigation from './HierarchyNavigation';
import SearchNavigation from './SearchNavigation';
import {
  useSearchNavigationOptionsQuery,
  PipelinesByIdQueryVariables,
  SearchNavigationInput,
  EnumObject,
  TableEnum,
  HavingEnum,
  OperationEnum,
  HierarchyInput,

} from '../../graphql/generated/graphql';

import IconButton from '@mui/material/IconButton';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IValidatorsNavigation } from '../rows/PipelineData';


type IOnNavigationAction = (arg: PipelinesByIdQueryVariables) => void;

export type IHandleSearchNavigationChange = { e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number, key: keyof SearchNavigationInput };

export interface INavigationProps {
  onNavigationAction: IOnNavigationAction;
  paginationCount: number;
  validators?: IValidatorsNavigation;
};


type INavigation = 'hierarchy' | 'search';

const Navigation = ({ onNavigationAction, paginationCount, validators }: INavigationProps) => {


  const [navigation, setNavigation] = useState<INavigation>('hierarchy');
  const [componentPaginationCount, setPaginationCount] = useState(0);

  useEffect(() => {
    setPaginationCount(paginationCount)
  }, [paginationCount]);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    if (navigation === 'hierarchy') {
      onNavigationAction({
        navigationInput: { hierarchy: hierarchyInput },
        skip: newPage * rowsPerPage,
        take: rowsPerPage,
      });
    }
    if (navigation === 'search') {
      onNavigationAction({
        navigationInput: { search: searchNavigationInputArray },
        skip: newPage * rowsPerPage,
        take: rowsPerPage,
      });
    }
  };
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (navigation === 'hierarchy') {
      onNavigationAction({
        navigationInput: { hierarchy: hierarchyInput },
        skip: 0,
        take: newRowsPerPage,
      });
    }
    if (navigation === 'search') {
      onNavigationAction({
        navigationInput: { search: searchNavigationInputArray },
        skip: 0,
        take: newRowsPerPage,
      });
    }
  };


  // Search Navigation
  const { data } = useSearchNavigationOptionsQuery();
  const [searchNavigationInputArray, setSearchNavigationInputArray] = useState<SearchNavigationInput[]>([]);
  const [searchEnumObjectArray, setSearchEnumObjectArray] = useState<EnumObject[][]>([]);
  const options = data?.searchNavigationOptions;

  const addFilter = () => {
    setPaginationCount(0);
    setSearchNavigationInputArray(previousSearchNavigationInputArray => [...previousSearchNavigationInputArray, { table: TableEnum.Pipeline, field: 'id', having: HavingEnum.Any, operation: OperationEnum.Equals, type: 'String', value: '' }]);
    setSearchEnumObjectArray(previousSearchEnumObjectArray => [...previousSearchEnumObjectArray, []]);
  }

  const removeFilter = (index: number) => {
    setPaginationCount(0);
    setSearchNavigationInputArray(searchNavigationInputArray.filter((_, i) => i !== index));
    setSearchEnumObjectArray(searchEnumObjectArray.filter((_, i) => i !== index));
  }

  const handleSearchNavigationChange = ({ e, index, key }: IHandleSearchNavigationChange) => {

    setPaginationCount(0);
    let newSearchNavigationInputArray = [...searchNavigationInputArray];
    let searchItem = { ...newSearchNavigationInputArray[index] };

    let newSearchEnumObjectArray = [...searchEnumObjectArray];
    let newSearchEnumObject = [...newSearchEnumObjectArray[index]];

    if (key === 'table') {
      searchItem[key] = e.target.value as TableEnum;
      searchItem.field = 'id';
      searchItem.having = HavingEnum.Any;
      searchItem.type = 'String';
      searchItem.operation = OperationEnum.Equals;
      searchItem.value = '';
      newSearchEnumObject = [];

    } else if (key === 'field') {
      searchItem[key] = e.target.value;
      searchItem.having = HavingEnum.Any;
      searchItem.operation = OperationEnum.Equals;
      const { type, enumObjectArray } = options?.find(({ table, field }) => table === searchItem.table && field === e.target.value) || {};
      searchItem.type = type || '';
      newSearchEnumObject = type === 'Boolean' ? [
        { serverEnum: 'true', databaseEnum: 'Y', },
        { serverEnum: 'false', databaseEnum: 'N', },
      ] : enumObjectArray ? enumObjectArray :
        [];
      searchItem.value = newSearchEnumObject.length > 0 ? newSearchEnumObject[0].serverEnum : '';

    } else if (key === 'having') {
      searchItem[key] = e.target.value as HavingEnum;
      if (e.target.value === HavingEnum.Count) {
        searchItem.field = 'id';
        searchItem.value = '';
        searchItem.type = 'Int';
        searchItem.operation = OperationEnum.Equals;
        newSearchEnumObject = [];
      } else {
        searchItem.operation = OperationEnum.Equals;
        const { type } = options?.find(({ table, field }) => table === searchItem.table && field === searchItem.field) || {};
        searchItem.type = type || '';
      }

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

  const handleSearchNavigationClick = () => {
    setPage(0);
    onNavigationAction({
      navigationInput: { search: searchNavigationInputArray },
      skip: 0,
      take: rowsPerPage,
    });
  }


  // Hierarchy Navigation
  const [hierarchyInput, setHierarchyInput] = useState<HierarchyInput>({ id: '', table: TableEnum.Facility });

  const handleHierarchyNavigationClick = (hierarchyInput: HierarchyInput) => {
    setHierarchyInput(hierarchyInput);
    setPage(0);
    onNavigationAction({
      navigationInput: { hierarchy: hierarchyInput },
      skip: 0,
      take: rowsPerPage,
    });
  }



  const renderNavigation = () => {
    if (navigation === 'hierarchy') {
      return <HierarchyNavigation
        handleClick={handleHierarchyNavigationClick}
      />
    }
    if (navigation === 'search') {
      return <SearchNavigation
        searchNavigationInputArray={searchNavigationInputArray}
        searchEnumObjectArray={searchEnumObjectArray}
        options={options}
        handleChange={handleSearchNavigationChange}
        handleClick={handleSearchNavigationClick}
        addFilter={addFilter}
        removeFilter={removeFilter}
        validators={validators}
      />
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'rgb(250, 250, 210)', padding: '4px' }}>
        <IconButton size='small' onClick={() => setNavigation('hierarchy')} disabled={navigation === 'hierarchy'}>
          <AccountTreeIcon />
        </IconButton>
        <IconButton size='small' onClick={() => setNavigation('search')} disabled={navigation === 'search'}>
          <ManageSearchIcon />
        </IconButton>
      </div>
      <div>{renderNavigation()}</div>
      <TablePagination
        // Replace default 12px padding of nested button
        // TablePagination component needs to be a child of Navigation component because we are using Navigation's state to render number of pages.
        // We place it fixed centered at the bottom of the page.
        sx={{ '& > div > div > button': { padding: '3px' }, position: 'fixed', left: '50vw', bottom: '-1vh' }}
        component='div'
        count={componentPaginationCount}
        size='small'
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Navigation;
import { useState } from 'react';
import HierarchyNavigation from './HierarchyNavigation';
import SearchNavigation from './SearchNavigation';
import { PipelinesByIdQueryVariables } from '../../graphql/generated/graphql';

import IconButton from '@mui/material/IconButton';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export type IOnNavigationAction = (arg: PipelinesByIdQueryVariables) => void;
export type IOffsetPagination = { skip: number; take: number };

export interface INavigationProps {
  onNavigationAction: IOnNavigationAction;
  offsetPagination: IOffsetPagination;
};


type INavigation = 'hierarchy' | 'search';

const Navigation = ({ onNavigationAction, offsetPagination }: INavigationProps) => {
  const [navigation, setNavigation] = useState<INavigation>('hierarchy');

  const renderNavigation = () => {
    if (navigation === 'hierarchy') {
      return <HierarchyNavigation
        onNavigationAction={onNavigationAction}
        offsetPagination={offsetPagination}
      />
    }
    if (navigation === 'search') {
      return <SearchNavigation
        onNavigationAction={onNavigationAction}
        offsetPagination={offsetPagination}
      />
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton size='small' onClick={() => setNavigation('hierarchy')} disabled={navigation === 'hierarchy'}>
          <AccountTreeIcon />
        </IconButton>
        <IconButton size='small' onClick={() => setNavigation('search')} disabled={navigation === 'search'}>
          <ManageSearchIcon />
        </IconButton>
      </div>
      <div>{renderNavigation()}</div>
    </>
  );
}

export default Navigation;
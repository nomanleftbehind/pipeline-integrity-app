import { useState } from 'react';
import HierarchyNavigation from './HierarchyNavigation';
import SearchNavigation from './SearchNavigation';
import { NavigationInput } from '../../graphql/generated/graphql';

import IconButton from '@mui/material/IconButton';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export type IOnNavigationAction = (arg: NavigationInput) => void;

export interface INavigationProps {
  onNavigationAction: IOnNavigationAction;
};


type INavigation = 'hierarchy' | 'search';

const Navigation = ({ onNavigationAction }: INavigationProps) => {
  const [navigation, setNavigation] = useState<INavigation>('hierarchy');

  const renderNavigation = () => {
    if (navigation === 'hierarchy') {
      return <HierarchyNavigation
        onNavigationAction={onNavigationAction}
      />
    }
    if (navigation === 'search') {
      return <SearchNavigation
        onNavigationAction={onNavigationAction}
      />
    }
  }

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
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
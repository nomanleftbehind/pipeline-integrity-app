import { Dispatch, SetStateAction } from 'react';
import {
  useSideBarQuery,
  TableEnum,
  NavigationInput
} from '../../graphql/generated/graphql';
import HierarchyNavigationItem from './HierarchyNavigationItem';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';


import { IHierarchy } from './Navigation';

export type ISetHierarchy = Dispatch<SetStateAction<IHierarchy>>;

export interface IHierarchyNavigationProps {
  setHierarchy: ISetHierarchy;
  handleClick: () => void;
}


export default function HierarchyNavigation({ handleClick, setHierarchy }: IHierarchyNavigationProps) {
  const { loading, error, data } = useSideBarQuery();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div">
          Facilities & Satellites
        </ListSubheader>
      }
    >
      {loading && <ListItemText primary="Loading..." />}
      {error && <ListItemText primary={error.message} />}
      {data?.sideBar && (
        data.sideBar.map(facility => facility && (
          <HierarchyNavigationItem
            key={facility.id}
            id={facility.id}
            name={facility.name}
            handleClick={handleClick}
            setHierarchy={setHierarchy}
            satellites={facility.satellites}
          />
        ))
      )}
    </List>
  );
}
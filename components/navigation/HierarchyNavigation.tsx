import { Dispatch, SetStateAction } from 'react';
import {
  useSideBarQuery,
  HierarchyInput,
} from '../../graphql/generated/graphql';
import HierarchyNavigationItem from './HierarchyNavigationItem';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';



export type ISetHierarchy = Dispatch<SetStateAction<HierarchyInput>>;

export interface IHierarchyNavigationProps {
  handleClick: (hierarchyInput: HierarchyInput) => void;
}


export default function HierarchyNavigation({ handleClick }: IHierarchyNavigationProps) {
  const { loading, error, data } = useSideBarQuery();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
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
            satellites={facility.satellites}
          />
        ))
      )}
    </List>
  );
}
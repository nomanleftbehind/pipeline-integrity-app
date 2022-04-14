import { useSideBarQuery, NavigationInput } from '../../graphql/generated/graphql';
import HierarchyNavigationItem from './HierarchyNavigationItem';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

export type IOnNavigationAction = (arg: NavigationInput) => void;

interface IHierarchyNavigationProps {
  onHierarchyItemClick: IOnNavigationAction;
};


export default function HierarchyNavigation({ onHierarchyItemClick }: IHierarchyNavigationProps) {
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
            onHierarchyItemClick={onHierarchyItemClick}
            satellites={facility.satellites}
          />
        ))
      )}
    </List>
  );
}
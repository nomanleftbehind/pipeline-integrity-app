import { useSideBarQuery } from '../graphql/generated/graphql';
import SidebarItem from './SidebarItem';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

type SideNavBarProps = {
  onSidebarClick: (id: string, table: string) => void;
};



export default function SideNavBar({ onSidebarClick }: SideNavBarProps) {
  const { loading, error, data } = useSideBarQuery();

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Facilities & Satellites
          </ListSubheader>
        }
      >
        {loading ? <ListItemText primary="Loading..." /> :
          error ? <ListItemText primary={error.message} /> :
            data && data.sideBar ?
              (
                <>
                  <SidebarItem
                    name="All Pipelines"
                    onSidebarClick={onSidebarClick}
                  />
                  {data.sideBar.map(facility => {
                    return facility ?
                      (
                        <SidebarItem
                          key={facility.id}
                          id={facility.id}
                          name={facility.name}
                          onSidebarClick={onSidebarClick}
                          satellites={facility.satellites}
                        />
                      ) :
                      null
                  })}
                </>
              ) :
              null}
      </List>
    </>
  );
}
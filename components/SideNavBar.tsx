import { useSideBarQuery } from '../graphql/generated/graphql';
import SidebarItem from './SidebarItem';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

type SideNavBarProps = {
  onAllPipelinesClick: () => void;
  onSatelliteClick: React.MouseEventHandler<HTMLButtonElement>;
  onFacilityClick: React.MouseEventHandler<HTMLButtonElement>;
  onUnconnectedPipelinesClick: React.MouseEventHandler<HTMLButtonElement>;
};



export default function SideNavBar({ onAllPipelinesClick, onFacilityClick, onSatelliteClick, onUnconnectedPipelinesClick }: SideNavBarProps) {
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
                    onFacilityClick={onAllPipelinesClick}
                  />
                  {data.sideBar.map(facility => {
                    return facility ?
                      (
                        <SidebarItem
                          key={facility.facilityId}
                          id={facility.facilityId}
                          name={facility.facilityName}
                          onFacilityClick={onFacilityClick}
                          onSatelliteClick={onSatelliteClick}
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



function SideNavBar2({ onAllPipelinesClick, onFacilityClick, onSatelliteClick, onUnconnectedPipelinesClick }: SideNavBarProps): JSX.Element {

  const { loading, error, data } = useSideBarQuery();

  return (
    <div>
      {loading ? <p>Loading...</p> :
        error ? <p>{error.message}</p> :
          data ?
            data.sideBar ?
              <ul>
                <li>
                  <button onClick={onAllPipelinesClick}>All Pipelines</button>
                </li>
                {data.sideBar.map(facility => {
                  return facility ?
                    (
                      <li key={facility.facilityId}>
                        <button value={facility.facilityId} onClick={onFacilityClick}>{facility.facilityName}</button>
                        <ul>
                          {facility.satellites ?
                            facility.satellites.map(satellite => {
                              return satellite ?
                                (
                                  <li key={satellite.satelliteId}>
                                    <button value={satellite.satelliteId} onClick={onSatelliteClick}>{satellite.satelliteName}</button>
                                  </li>
                                ) :
                                null;
                            }) :
                            null}
                        </ul>
                      </li>
                    ) :
                    null;
                })}
                <li>
                  <button value={'no satellite'} onClick={onUnconnectedPipelinesClick}>Pipelines not connected to satellite</button>
                </li>
              </ul> :
              null :
            null}
    </div>
  );
}
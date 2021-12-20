import React from 'react';
import { useSideBarQuery } from '../graphql/generated/graphql';

type SideNavBarProps = {
  onAllPipelinesClick: () => void;
  onSatelliteClick: React.MouseEventHandler<HTMLButtonElement>;
  onFacilityClick: React.MouseEventHandler<HTMLButtonElement>;
  onUnconnectedPipelinesClick: React.MouseEventHandler<HTMLButtonElement>;
};


export default function SideNavBar({ onAllPipelinesClick, onFacilityClick, onSatelliteClick, onUnconnectedPipelinesClick }: SideNavBarProps): JSX.Element {

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
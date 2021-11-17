import React from 'react';
import { useFacilitiesSideBarQuery } from '../graphql/generated/graphql';

type SideNavBarProps = {
  onAllPipelinesClick: () => void;
  onSatelliteClick: React.MouseEventHandler<HTMLButtonElement>;
  onFacilityClick: React.MouseEventHandler<HTMLButtonElement>
};


export default function SideNavBar({ onAllPipelinesClick, onFacilityClick, onSatelliteClick }: SideNavBarProps): JSX.Element {

  const { loading, error, data } = useFacilitiesSideBarQuery();

  return (
    <div>
      {loading ? <p>Loading...</p> :
        error ? <p>{error.message}</p> :
          data ?
            data.allFacilities ?
              <ul>
                <li>
                  <button onClick={onAllPipelinesClick}>All Pipelines</button>
                </li>
                {data.allFacilities.map(facility => {
                  return facility ?
                    (
                      <li key={facility.id}>
                        <button value={facility.id} onClick={onFacilityClick}>{facility.name}</button>
                        <ul>
                          {facility.satellites ?
                            facility.satellites.map(satellite => {
                              return satellite ?
                                (
                                  <li key={satellite.id}>
                                    <button value={satellite.id} onClick={onSatelliteClick}>{satellite.name}</button>
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
              </ul> :
              null :
            null}
    </div>
  );
}
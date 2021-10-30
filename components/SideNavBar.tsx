import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Facility, Satellite } from '@prisma/client';

export type FacilitySatellites = Facility & { satellites: Satellite[] }

export interface FacilityData {
  allFacilities: FacilitySatellites[];
}

type SideNavBarProps = {
  onAllPipelinesClick: () => void;
  onSatelliteClick: React.MouseEventHandler<HTMLButtonElement>;
  onFacilityClick: React.MouseEventHandler<HTMLButtonElement>
};

const FACILITIES_QUERY = gql`
  query FacilitiesQuery {
    allFacilities {
      id
      name
      satellites {
        id
        name
      }
    }
  }
`;


export default function SideNavBar({ onAllPipelinesClick, onFacilityClick, onSatelliteClick }: SideNavBarProps): JSX.Element {

  const { loading, error, data } = useQuery<FacilityData>(FACILITIES_QUERY);


  return (
    loading ? <p>Loading...</p> :
      error ? <p>{error.message}</p> :
        data ?
          <ul>
            <li>
              <button onClick={onAllPipelinesClick}>All Pipelines</button>
            </li>
            {data.allFacilities.map(facility => {
              return (
                <li key={facility.id}>
                    <button value={facility.id} onClick={onFacilityClick}>{facility.name}</button>
                  <ul>
                    {facility.satellites.map(satellite => {
                      return (
                        <li key={satellite.id}>
                          <button value={satellite.id} onClick={onSatelliteClick}>{satellite.name}</button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul> :
          <div></div>
  );
}
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Facility, Satellite } from '@prisma/client';

export type FacilitySatellites = Facility & { satellites: Satellite[] }

export interface FacilityData {
  allFacilities: FacilitySatellites[];
}

type SideNavBarProps = {
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


export default function SideNavBar({ onFacilityClick, onSatelliteClick }: SideNavBarProps): JSX.Element {

  const { loading, error, data } = useQuery<FacilityData>(FACILITIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data) {
    return (
      <ul>
        {data.allFacilities.map(facility => {
          return (
            <li key={facility.id}>
              <div>
                <button value={facility.id} onClick={onFacilityClick}>{facility.name}</button>
              </div>
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
      </ul>
    );
  } else {
    return <div>Loading...</div>
  }
}
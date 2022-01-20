import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import React, { ReactNode } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Facility, Satellite } from '@prisma/client';


export type SatelliteFacility = Satellite & { facility: Facility }

export interface SatelliteData {
  allSatellites: SatelliteFacility[];
}

const SATELLITES_QUERY = gql`
  query SatellitesQuery {
    allSatellites {
    id
    name
    facility {
      id
      name
    }
  }
  }
`;

export default function SatelliteFacilityList() {

  const { loading, data } = useQuery<SatelliteData>(SATELLITES_QUERY);
  if (data) {
    return (
      <div className="app">
        <h3>Facilities</h3>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Facility</th>
                <th>Satellite</th>
              </tr>
            </thead>
            <tbody>
              {data.allSatellites.map(satellite => (
                <tr key={satellite.id}>
                  <td>{satellite.facility.name}</td>
                  <td>{satellite.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  } else {
    return <p>Loading......</p>;
  }
}

SatelliteFacilityList.getLayout = function getLayout(page: ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}

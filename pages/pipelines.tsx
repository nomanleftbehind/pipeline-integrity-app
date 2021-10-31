import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { gql, useQuery, useLazyQuery, ApolloError } from '@apollo/client';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import { ReactNode } from 'react';
import { ChildDataProps, graphql } from "@apollo/react-hoc";
import styles from '../styles/Home.module.css'



import { useState } from 'react';
import RenderPipeline from '../components/rows/RenderPipeline';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';

import { Pipeline, InjectionPoint, Facility, Satellite } from '@prisma/client';
import { SatelliteFacility } from './satellites'

export interface IError { message: string }


export const validators = {
  license: "^(AB|SK|BC)(\\d{5}|\\d{6})$",
  segment: "^((UL)(\\d{1,2})|(\\d{1,3}))$",
  substance: ['Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas'],
  fromTo: "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$",
  fromToFeature: ['Blind end', 'Battery', 'Pipeline', 'Satellite', 'Storage tank', 'Injection plant', 'Well', 'Compressor station', 'Meter station', 'Pump station', 'Gas processing plant', 'Underground cap or tie-in', 'Header'],
  status: ['Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed'],
  length: "^\\d*\\.?\\d*$",
  type: ['515', '2306', '3406', '3408', '6063', '6351', '5A', '5L', '5LX', 'A106', 'A120', 'A53', 'AMERON', 'B515', 'B51S', 'B5IS', 'CENTRON', 'CIBA', 'FSLP', 'REDTHR', 'SMITH', 'STAR', 'TBS', 'WSLP', 'Z245.1', 'Z245.3'],
  grade: ['A', '3592', 'B', 'X42', 'BW1', '2500', '3591', '2901', 'T4', '300', '3593', '11', 'J55', '2250', 'X52', '2750', '2902', '25', '241', '2413', '2411', '155', '150', '1000', '800', 'T1A', '2010', 'T4A', '1250', '17', '900', 'T1B', '810', '35', '5', '9', '200', '1200', '11.03'],
  outsideDiameter: [0, 42.2, 50.8, 53.8, 54.4, 55.1, 57.1, 59.1, 60.3, 60.5, 62, 65.2, 66, 73, 76.2, 77, 81.3, 82.6, 88.9, 90.7, 91.2, 95.5, 97.4, 105.7, 114.3, 152.4, 168.3, 219.1, 231.4, 273.1, 296.2, 323.89],
  wallThickness: "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$",
  material: ['Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement'],
  mop: "^\\d{1,5}$",
  internalProtection: ['Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film']
}

export type IValidators = typeof validators;

export interface IHeader {
  createdAt: string;
  license: string;
  segment: string;
  substance: string;
  from: string;
  fromFeature: string;
  to: string;
  toFeature: string;
  injectionPoints: string;
  status: string
}

export type IPipelineQuery = Pipeline & { satellite: SatelliteFacility } & { injectionPoints: InjectionPoint[] };
type IPipelinesByIdVars = Partial<Pick<Pipeline, 'satelliteId'> & Pick<Satellite, 'facilityId'>>;

export type IInjectionPointQuery = InjectionPoint & { pipeline?: Pipeline } & { satellite?: Satellite & { facility?: Facility } };

interface IAllInjectionPoints {
  allInjectionPoints: IInjectionPointQuery[];
}

export const PIPELINES_BY_ID_QUERY = gql`
  query pipelinesByIdQuery($satelliteId: String, $facilityId: String) {
  pipelinesById(satelliteId: $satelliteId, facilityId: $facilityId) {
    id
    createdAt
    license
    segment
    substance
    from
    fromFeature
    to
    toFeature
    status
    length
    type
    grade
    outsideDiameter
    wallThickness
    material
    mop
    internalProtection
    satellite {
      id
      facility {
        id
      }
    }
    injectionPoints {
      id
      source
      oil
      gas
      water
    }
  }
}
`

const INJECTION_POINTS_QUERY = gql`
  query allInjectionPointsQuery {
    allInjectionPoints {
      id
      source
      pipeline {
        id
        license
        segment
      }
      satellite {
        id
        name
        facility {
          id
          name
        }
      }
    }
  }
`;


export default function PipelineDatabase(): JSX.Element {

  const header: IHeader = { createdAt: "", license: "", segment: "", substance: "", from: "", fromFeature: "", to: "", toFeature: "", injectionPoints: "", status: "" };
  const [expandedPipelines, setExpandedPipelines] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<IHeader>(header);
  const [filterTextCaseInsensitive, setFilterTextCaseInsensitive] = useState<IHeader>(header);

  const [pipelinesById, { data, error, loading }] = useLazyQuery<{ pipelinesById: IPipelineQuery[] }, IPipelinesByIdVars>(PIPELINES_BY_ID_QUERY);
  const { data: injectionPointData } = useQuery<IAllInjectionPoints>(INJECTION_POINTS_QUERY);


  function handleSatelliteClick(e: React.MouseEvent<HTMLButtonElement>): void {
    pipelinesById({ variables: { satelliteId: e.currentTarget.value } })
  }

  function handleFacilityClick(e: React.MouseEvent<HTMLButtonElement>): void {
    pipelinesById({ variables: { facilityId: e.currentTarget.value } })
  }

  const handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    const myHeader = name as keyof IHeader;
    const newFilterText = { ...filterText };
    const newFilterTextCaseInsensitive = { ...filterTextCaseInsensitive };
    newFilterText[myHeader] = value;
    newFilterTextCaseInsensitive[myHeader] = value.toUpperCase();
    setFilterText(newFilterText);
    setFilterTextCaseInsensitive(newFilterTextCaseInsensitive);
    console.log(filterTextCaseInsensitive[myHeader]);
  }

  const handlePipelineClick = (id: string): void => {
    setExpandedPipelines((prevState) => {
      return prevState.includes(id) ? prevState.filter(ppl_id => ppl_id !== id) : prevState.concat(id);
    });
  }

  return (
    <div className="app" >
      <div className="pipeline-database-wrapper">
        <div className="pipeline-database-side-bar">
          <div className="pipeline-database-side-bar-fixed">
            <SideNavBar
              onAllPipelinesClick={pipelinesById}
              onSatelliteClick={handleSatelliteClick}
              onFacilityClick={handleFacilityClick}
            />
          </div>
        </div>
        <div className="pipeline-database-table">
          <table className="MuiTable-root" id='pipelines'>
            <Header
              filterText={filterText}
              onFilterTextChange={handleFilterTextChange} />
            <tbody>
              {loading ? <tr><td><p>Loading...</p></td></tr> :
                error ? <tr><td><p>{error.message}</p></td></tr> :
                  data ? data.pipelinesById.filter(pipeline => {
                    const inj_pt_source = pipeline.injectionPoints.map(({ source }) => source);
                    return (
                      pipeline.license.toUpperCase().includes(filterTextCaseInsensitive.license) &&
                      pipeline.segment.toUpperCase().includes(filterTextCaseInsensitive.segment) &&
                      pipeline.substance.toUpperCase().includes(filterTextCaseInsensitive.substance) &&
                      pipeline.from.toUpperCase().includes(filterTextCaseInsensitive.from) &&
                      (pipeline.fromFeature ? pipeline.fromFeature.toUpperCase().includes(filterTextCaseInsensitive.fromFeature) : filterTextCaseInsensitive.fromFeature.length === 0) &&
                      pipeline.to.toUpperCase().includes(filterTextCaseInsensitive.to) &&
                      (pipeline.toFeature ? pipeline.toFeature.toUpperCase().includes(filterTextCaseInsensitive.toFeature) : filterTextCaseInsensitive.toFeature.length === 0) &&
                      (inj_pt_source === undefined ||
                        (inj_pt_source.length === 0 && filterTextCaseInsensitive.injectionPoints.length === 0) ||
                        inj_pt_source.some(i => {
                          switch (i) {
                            case undefined:
                              return filterTextCaseInsensitive.injectionPoints.length === 0;
                            default:
                              return i.toUpperCase().includes(filterTextCaseInsensitive.injectionPoints)
                          }
                        })) &&
                      pipeline.status.toUpperCase().includes(filterTextCaseInsensitive.status)
                    );
                  }).map((pipeline, ppl_idx) => {
                    return (
                      <RenderPipeline
                        key={pipeline.id}
                        ppl_idx={ppl_idx}
                        pipeline={pipeline}
                        injectionPointOptions={injectionPointData?.allInjectionPoints}
                        validators={validators}
                        expandedPipelines={expandedPipelines}
                        onPipelineClick={() => handlePipelineClick(pipeline.id)}
                      />
                    );
                  }) :
                    null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

PipelineDatabase.getLayout = function getLayout(page: ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}

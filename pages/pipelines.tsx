import { useState } from 'react';
import { prisma } from '../lib/prisma';
import { getUser } from '../lib/user';

import RenderPipeline from '../components/rows/RenderPipeline';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { IGetServerSideProps } from './register';
import { usePipelinesByIdQueryLazyQuery, useGetValidatorsQuery } from '../graphql/generated/graphql';


export interface IHeader {
  license: string;
  segment: string;
  substance: string;
  from: string;
  fromFeature: string;
  to: string;
  toFeature: string;
  status: string;
}

function PipelineDatabase() {

  const header: IHeader = { license: "", segment: "", substance: "", from: "", fromFeature: "", to: "", toFeature: "", status: "" };
  const [filterText, setFilterText] = useState<IHeader>(header);
  const [filterTextCaseInsensitive, setFilterTextCaseInsensitive] = useState<IHeader>(header);

  const [pipelinesById, { data, loading, error }] = usePipelinesByIdQueryLazyQuery();
  const { data: validatorsData } = useGetValidatorsQuery();

  function handleSidebarClick(id: string, table: string) {
    pipelinesById({ variables: { id, table } })
  }

  const handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    const myHeader = name as keyof IHeader;
    const newFilterText = { ...filterText };
    const newFilterTextCaseInsensitive = { ...filterTextCaseInsensitive };
    newFilterText[myHeader] = value;
    newFilterTextCaseInsensitive[myHeader] = value.toUpperCase();
    setFilterText(newFilterText);
    setFilterTextCaseInsensitive(newFilterTextCaseInsensitive);
  }

  const validators = validatorsData?.validators;
  function valuesFromEnum<T>(property: keyof T, validator: T | undefined) {
    return validator ? validator[property] : property;
  }

  return (
    <div className="pipeline-database-wrapper">
      <div className="pipeline-database-side-bar">
        <div className="pipeline-database-side-bar-fixed">
          <SideNavBar
            onSidebarClick={handleSidebarClick}
          />
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 73px)' }} >
        <Table stickyHeader aria-label="collapsible table">
          <Header
            filterText={filterText}
            onFilterTextChange={handleFilterTextChange} />
          <TableBody>
            {loading && <TableRow><TableCell>Loading...</TableCell></TableRow>}
            {error && <TableRow><TableCell>{error.message}</TableCell></TableRow>}
            {data?.pipelinesById && data.pipelinesById.filter(pipeline => {
              /*const inj_pt_source =
                pipeline && pipeline.injectionPoints ?
                  pipeline.injectionPoints.map(injectionPoints =>
                    injectionPoints ? injectionPoints.source : undefined) :
                  undefined;*/
              return (
                pipeline && (
                  pipeline.license.toUpperCase().includes(filterTextCaseInsensitive.license) &&
                  pipeline.segment.toUpperCase().includes(filterTextCaseInsensitive.segment) &&
                  (pipeline.substance ? valuesFromEnum(pipeline.substance, validators?.substanceEnum).toUpperCase().includes(filterTextCaseInsensitive.substance) : filterTextCaseInsensitive.substance.length === 0) &&
                  pipeline.from.toUpperCase().includes(filterTextCaseInsensitive.from) &&
                  (pipeline.fromFeature ? valuesFromEnum(pipeline.fromFeature, validators?.fromToFeatureEnum).toUpperCase().includes(filterTextCaseInsensitive.fromFeature) : filterTextCaseInsensitive.fromFeature.length === 0) &&
                  pipeline.to.toUpperCase().includes(filterTextCaseInsensitive.to) &&
                  (pipeline.toFeature ? valuesFromEnum(pipeline.toFeature, validators?.fromToFeatureEnum).toUpperCase().includes(filterTextCaseInsensitive.toFeature) : filterTextCaseInsensitive.toFeature.length === 0) &&
                  /*(inj_pt_source === undefined ||
                    (inj_pt_source.length === 0 && filterTextCaseInsensitive.injectionPoints.length === 0) ||
                    inj_pt_source.some(i => {
                      switch (i) {
                        case undefined:
                          return filterTextCaseInsensitive.injectionPoints.length === 0;
                        default:
                          return i.toUpperCase().includes(filterTextCaseInsensitive.injectionPoints)
                      }
                    })) &&*/
                  (pipeline.status ? valuesFromEnum(pipeline.status, validators?.statusEnum).toUpperCase().includes(filterTextCaseInsensitive.status) : filterTextCaseInsensitive.status.length === 0)
                )
              );
            }).map((pipeline, ppl_idx) => pipeline && <RenderPipeline
              key={pipeline.id}
              ppl_idx={ppl_idx}
              pipeline={pipeline}
              validators={validators}
            />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// Using Server-Side Rendering to prevent a flash of unauthenticated content
export async function getServerSideProps({ req }: IGetServerSideProps) {

  const user = await getUser(req, prisma);

  if (!user) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

export default PipelineDatabase;
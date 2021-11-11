import * as React from 'react';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import RenderPipeline2 from '../components/rows/RenderPipeline2';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { usePipelinesByIdQueryLazyQuery, useGetValidatorsQuery, useAllInjectionPointsQueryQuery } from '../graphql/generated/graphql';


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

export default function CollapsibleTable() {

  const header: IHeader = { createdAt: "", license: "", segment: "", substance: "", from: "", fromFeature: "", to: "", toFeature: "", injectionPoints: "", status: "" };
  const [expandedPipelines, setExpandedPipelines] = React.useState<string[]>([]);
  const [filterText, setFilterText] = React.useState<IHeader>(header);
  const [filterTextCaseInsensitive, setFilterTextCaseInsensitive] = React.useState<IHeader>(header);

  const [pipelinesById, { data, loading, error }] = usePipelinesByIdQueryLazyQuery();
  const { data: validatorsData } = useGetValidatorsQuery();
  const { data: injectionPointData } = useAllInjectionPointsQueryQuery();

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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <Header
            filterText={filterText}
            onFilterTextChange={handleFilterTextChange} />
          <TableBody>
            {loading ? <TableRow><TableCell>Loading...</TableCell></TableRow> :
              error ? <TableRow><TableCell>{error.message}</TableCell></TableRow> :
                data ?
                  data.pipelinesById ?
                    data.pipelinesById.filter(pipeline => {
                      const inj_pt_source =
                        pipeline ?
                          pipeline.injectionPoints ?
                            pipeline.injectionPoints.map(injectionPoints =>
                              injectionPoints ? injectionPoints.source : undefined) :
                            undefined :
                          undefined;
                      return (
                        pipeline ?
                          (
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
                          ) :
                          undefined
                      );
                    }).map((pipeline, ppl_idx) => {
                      return pipeline ?
                        (
                          <RenderPipeline2
                            key={pipeline.id}
                            ppl_idx={ppl_idx}
                            pipeline={pipeline}
                            validators={validatorsData?.validators}
                            injectionPointOptions={injectionPointData?.allInjectionPoints}
                            expandedPipelines={expandedPipelines}
                            onPipelineClick={() => handlePipelineClick(pipeline.id)}
                          />
                        ) :
                        null;
                    }) :
                    null :
                  null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

CollapsibleTable.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}

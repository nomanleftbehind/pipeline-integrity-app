import { useState } from 'react';
import RenderPipeline from './rows/RenderPipeline';
import Header from './Header';
import SideNavBar from './SideNavBar';

import { IPipeline, IInjectionPoint, IInjectionPointOptionsError, IFacility, ISatellite, IError, IValidators } from '../App';

type PipelineDatabaseProps = {
  pipelines: IPipeline[];
  errorPipelines: IError | null;
  arePipelinesLoaded: boolean;
  fetchPipelines: () => void;
  injectionPointOptions: IInjectionPoint[] | IInjectionPointOptionsError[];
  validators: IValidators | null;
  facilities: IFacility[];
  satellites: ISatellite[]
};

export interface IHeader {
  created_at: string;
  license: string;
  segment: string;
  substance: string;
  from: string;
  from_feature: string;
  to: string;
  to_feature: string;
  injection_points: string;
  status: string
}


function PipelineDatabase({ pipelines, errorPipelines, arePipelinesLoaded, fetchPipelines, injectionPointOptions, validators, facilities, satellites }: PipelineDatabaseProps): JSX.Element {

  const header: IHeader = { created_at: "", license: "", segment: "", substance: "", from: "", from_feature: "", to: "", to_feature: "", injection_points: "", status: "" };
  const [expandedPipelines, setExpandedPipelines] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<IHeader>(header);
  const [filterTextCaseInsensitive, setFilterTextCaseInsensitive] = useState<IHeader>(header);
  const [filterSatellite, setFilterSatellite] = useState<string>();
  const [filterFacility, setFilterFacility] = useState<string>();

  function handleSatelliteClick(e: React.MouseEvent<HTMLButtonElement>): void {
    setFilterSatellite(e.currentTarget.value);
    setFilterFacility(undefined);
  }

  function handleFacilityClick(e: React.MouseEvent<HTMLButtonElement>): void {
    setFilterFacility(e.currentTarget.value);
    setFilterSatellite(undefined);
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

  const handlePipelineClick = (_id: string): void => {
    setExpandedPipelines((prevState) => {
      return prevState.includes(_id) ? prevState.filter(ppl_id => ppl_id !== _id) : prevState.concat(_id);
    });
  }

  const sidebar_filter = pipelines.filter(pipeline => {
    return pipeline.satellite.facility._id === filterFacility || pipeline.satellite._id === filterSatellite;
  });

  const header_filter = sidebar_filter.filter(pipeline => {

    const inj_pt_source = pipeline.injection_points.map(({ source }) => source);

    return (
      pipeline.license.toUpperCase().includes(filterTextCaseInsensitive.license) &&
      pipeline.segment.toUpperCase().includes(filterTextCaseInsensitive.segment) &&
      pipeline.substance.toUpperCase().includes(filterTextCaseInsensitive.substance) &&
      pipeline.from.toUpperCase().includes(filterTextCaseInsensitive.from) &&
      pipeline.from_feature.toUpperCase().includes(filterTextCaseInsensitive.from_feature) &&
      pipeline.to.toUpperCase().includes(filterTextCaseInsensitive.to) &&
      pipeline.to_feature.toUpperCase().includes(filterTextCaseInsensitive.to_feature) &&
      (inj_pt_source === undefined ||
        (inj_pt_source.length === 0 && filterTextCaseInsensitive.injection_points.length === 0) ||
        inj_pt_source.some(i => {
          switch (i) {
            case undefined:
              return filterTextCaseInsensitive.injection_points.length === 0;
            default:
              return i.toUpperCase().includes(filterTextCaseInsensitive.injection_points)
          }
        })) &&
      pipeline.status.toUpperCase().includes(filterTextCaseInsensitive.status)
    );
  });

  if (errorPipelines) {
    return <div className="app">Error: {errorPipelines.message}</div>
  } else if (!arePipelinesLoaded) {
    return <div className="app">Loading...</div>
  } else {
    return (
      <div className="app" >
        <div className="pipeline-database-wrapper">
          <div className="pipeline-database-side-bar">
            <div className="pipeline-database-side-bar-fixed">
              <SideNavBar facilities={facilities} satellites={satellites} onSatelliteClick={handleSatelliteClick} onFacilityClick={handleFacilityClick} />
            </div>
          </div>
          <div className="pipeline-database-table">
            <table className="MuiTable-root" id='pipelines'>
              <Header
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange} />
              <tbody>
                {header_filter.map((pipeline, ppl_idx) => {
                  return (
                    <RenderPipeline
                      key={pipeline._id}
                      ppl_idx={ppl_idx}
                      pipeline={pipeline}
                      injectionPointOptions={injectionPointOptions}
                      validators={validators}
                      expandedPipelines={expandedPipelines}
                      onPipelineClick={() => handlePipelineClick(pipeline._id)}
                      fetchPipelines={fetchPipelines} />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default PipelineDatabase;
import { useState } from 'react';
// import useStickyHeader from "./components/useStickyHeader";
import RenderPipeline from './components/rows/renderPipeline';
import Header from './components/Header';
import SideNavBar from './components/SideNavBar';

function PipelineDatabase({ pipelines, errorPipelines, arePipelinesLoaded, fetchPipelines, injectionPointOptions, validators, facilities, satellites }) {

  const [expandedPipelines, setExpandedPipelines] = useState([]);
  const [filterText, setFilterText] = useState({ created_at: "", "license": "", segment: "", substance: "", from: "", from_feature: "", to: "", to_feature: "", injection_points: "", status: "" });
  const [filterSatellite, setFilterSatellite] = useState([]);
  const [filterFacility, setFilterFacility] = useState([]);
  // const { tableRef, isSticky } = useStickyHeader();

  function handleSatelliteClick(e) {
    setFilterSatellite(e.target.value);
    setFilterFacility([]);
  }

  function handleFacilityClick(e) {
    setFilterFacility(e.target.value);
    setFilterSatellite([]);
  }

  const handleFilterTextChange = (e) => {
    const { name, value } = e.target;
    const newFilterText = { ...filterText };
    newFilterText[name] = value;
    setFilterText(newFilterText);
  }

  const handlePipelineClick = (_id) => {
    const currentExpandedPipelines = expandedPipelines;
    const isPipelineCurrentlyExpanded = currentExpandedPipelines.includes(_id);
    const newExpandedPipelines = isPipelineCurrentlyExpanded ? currentExpandedPipelines.filter(ppl_id => ppl_id !== _id) : currentExpandedPipelines.concat(_id);
    setExpandedPipelines(newExpandedPipelines);
  }

  const caseInsensitiveFilterText = {};
  for (const [i, j] of Object.entries(filterText)) {
    caseInsensitiveFilterText[i] = j.toUpperCase();
  }

  const sidebar_filter = pipelines.filter(pipeline => {
    return pipeline.satellite.facility === filterFacility || pipeline.satellite._id === filterSatellite;
  });

  const header_filter = sidebar_filter.filter(pipeline => {
    console.log(pipeline.satellite.facility, filterFacility, pipeline.satellite._id, filterSatellite);
    const caseInsensitivePipeline = {};
    for (const [i, j] of Object.entries(pipeline)) {
      if (typeof j === "string" && i !== "_id") {
        caseInsensitivePipeline[i] = j.toUpperCase();
      }
      else {
        caseInsensitivePipeline[i] = j;
      }
    }

    const inj_pt_source = pipeline.injection_points.map(({ source }) => source);

    return (
      caseInsensitivePipeline.license.includes(caseInsensitiveFilterText.license) &&
      caseInsensitivePipeline.segment.includes(caseInsensitiveFilterText.segment) &&
      caseInsensitivePipeline.substance.includes(caseInsensitiveFilterText.substance) &&
      caseInsensitivePipeline.from.includes(caseInsensitiveFilterText.from) &&
      caseInsensitivePipeline.to.includes(caseInsensitiveFilterText.to) &&
      (inj_pt_source === undefined ||
        (inj_pt_source.length === 0 && caseInsensitiveFilterText.injection_points.length === 0) ||
        inj_pt_source.some(i => {
          switch (i) {
            case undefined:
              return caseInsensitiveFilterText.injection_points.length === 0;
            default:
              return i.includes(caseInsensitiveFilterText.injection_points)
          }
        })) &&
      caseInsensitivePipeline.status.includes(caseInsensitiveFilterText.status)
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
            {/*isSticky && (
              
              .sticky will be the copy of table header while sticky 
              needed as otherwise table won't preserve columns width
              
              <table id='pipelines' style={{ position: "fixed", top: 40, left: 0, right: 0, zIndex: 1 }}>
                <Header
                  filterText={filterText}
                  onFilterTextChange={handleFilterTextChange} />
              </table>
            )*/}
            <table className="MuiTable-root" id='pipelines'/* ref={tableRef}*/>
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
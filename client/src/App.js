import React, { useState, useEffect } from 'react';
import useStickyHeader from "./components/useStickyHeader";
import RenderPipeline from './components/row/renderPipeline';
import Header from './components/Header';

function PipelineDatabase() {

  const [errorPipelines, setErrorPipelines] = useState(null);
  const [arePipelinesLoaded, setArePipelinesLoaded] = useState(false);
  const [errorInjectionPoints, setErrorInjectionPoints] = useState(null);
  const [areInjectionPointsLoaded, setAreInjectionPointsLoaded] = useState(false);

  const [pipelines, setPipelines] = useState([]);
  const [injectionPointOptions, setInjectionPointOptions] = useState([]);
  const [validators, setValidators] = useState({});
  const [expandedPipelines, setExpandedPipelines] = useState([]);
  const [filterText, setFilterText] = useState({ created_at: "", "license": "", segment: "", substance: "", from: "", from_feature: "", to: "", to_feature: "", injection_points: "", status: "" });

  const { tableRef, isSticky } = useStickyHeader();


  const fetchPipelines = () => {
    console.log("RUNNING FETCH PIPELINES!!!");
    fetch("http://localhost:5002/pipelines")
      .then(res => res.json())
      .then(
        (result) => {
          setArePipelinesLoaded(true);
          setPipelines(result);
        },
        (error) => {
          setArePipelinesLoaded(true);
          setErrorPipelines(error);
        }
      );
  }

  const fetchInjectionPoints = () => {
    console.log("RUNNING FETCH INJECTION POINTS!!!");
    fetch("http://localhost:5002/injectionpoints")
      .then(res => res.json())
      .then(
        (result) => {
          setAreInjectionPointsLoaded(true);
          setInjectionPointOptions(result);
        },
        (error) => {
          setAreInjectionPointsLoaded(true);
          setErrorInjectionPoints(error);
        }
      );
  }

  const injectionPointOptionsLoaded = () => {
    if (errorInjectionPoints) {
      return [{ _id: "0", source: `Failed to load: ${errorInjectionPoints.message}` }]
    } else if (!areInjectionPointsLoaded) {
      return [{ _id: "0", source: "Loading..." }]
    } else {
      return injectionPointOptions
    }
  }

  const fetchEnums = () => {
    console.log("RUNNING FETCH VALIDATORS!!!");
    fetch("http://localhost:5002/validators")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(RegExp(result.license));
          setValidators(result);
        }
      );
  }

  useEffect(() => {
    fetchPipelines();
    fetchInjectionPoints();
    fetchEnums();
  }, []);

  const handleFilterTextChange = (e) => {
    const { name, value } = e.target;
    const newFilterText = { ...filterText };
    newFilterText[name] = value;
    setFilterText(newFilterText);
  }

  const handlePipelineClick = (_id) => {
    console.log(injectionPointOptionsLoaded());
    const currentExpandedPipelines = expandedPipelines;
    const isPipelineCurrentlyExpanded = currentExpandedPipelines.includes(_id);
    const newExpandedPipelines = isPipelineCurrentlyExpanded ? currentExpandedPipelines.filter(ppl_id => ppl_id !== _id) : currentExpandedPipelines.concat(_id);
    setExpandedPipelines(newExpandedPipelines);
  }

  const caseInsensitiveFilterText = {};
  for (const [i, j] of Object.entries(filterText)) {
    caseInsensitiveFilterText[i] = j.toUpperCase();
  }

  const pipelines2 = pipelines.filter(pipeline => {
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
    return <div>Error: {errorPipelines.message}</div>
  } else if (!arePipelinesLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="app" >
        <div className="table-fix-header">
          {isSticky && (
            /*
            .sticky will be the copy of table header while sticky 
            needed as otherwise table won't preserve columns width
            */
            <table id='pipelines' style={{ position: "fixed", top: 0, left: 8, right: 0, zIndex: 1 }}>
              <Header
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange} />
            </table>
          )}
          <table className="MuiTable-root" id='pipelines' ref={tableRef}>
            <Header
              filterText={filterText}
              onFilterTextChange={handleFilterTextChange} />
            <tbody>
              {pipelines2.map((pipeline, ppl_idx) => {
                return (
                  <RenderPipeline
                    key={pipeline._id}
                    ppl_idx={ppl_idx}
                    pipeline={pipeline}
                    injectionPointOptions={injectionPointOptionsLoaded()}
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
    )
  }
}

export default PipelineDatabase;
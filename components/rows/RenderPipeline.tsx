import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import PipelineData from './PipelineData';
import EntryField from '../fields/EntryField';
import { ModalDeletePipeline } from '../Modal';
import RemoveIcon from '../svg/remove-pipeline';
import AddIcon from '../svg/add-pipeline';
import ExpandIcon from '../svg/expand';
import CollapseIcon from '../svg/collapse';
import { IValidators, AllPipeline, AllInjectionPoint } from '../../pages/pipelines';

const isEven = (value: number): "even" | "odd" => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

interface IRenderPipelineProps {
  ppl_idx: number;
  pipeline: AllPipeline;
  injectionPointOptions: AllInjectionPoint[];
  validators: IValidators;
  expandedPipelines: string[];
  onPipelineClick: React.MouseEventHandler<HTMLButtonElement>;
}


const DELETE_PIPELINE = gql`
mutation deletePipeline($deletePipelineId: String!) {
  deletePipeline(id: $deletePipelineId) {
    license
    segment
  }
}
`;

interface IDeletePipeline {
  license: string;
  segment: string;
}

interface IDeletePipelineData {
  deletePipeline: IDeletePipeline
}

interface IDeletePipelineVars {
  id: string;
}


export default function RenderPipeline({ ppl_idx, pipeline, injectionPointOptions, validators, expandedPipelines, onPipelineClick }: IRenderPipelineProps): JSX.Element {
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState<boolean>(false);

  const [deletePipeline, { error, data }] = useMutation<IDeletePipelineData, IDeletePipelineVars>(DELETE_PIPELINE, { variables: { id: pipeline.id } });
  
  console.log(data, error);
  

  function handleAddPipeline() {
    fetch(`http://localhost:5002/pipeline/${pipeline.id}/copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => { console.log(response); return response.json() })
      .then(data => {
        fetchPipelines();
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function showModalDeletePipeline() {
    setShowDeletePipelineModal(true);
  }

  function hideModalDeletePipeline() {
    setShowDeletePipelineModal(false);
  }

  function handleDeletePipeline() {
    deletePipeline();
    setShowDeletePipelineModal(false);
  }

  const { id, createdAt, license, segment, substance, from, fromFeature, to, toFeature, injectionPoints, status, length, type, grade, outsideDiameter, wallThickness, material, mop, internalProtection } = pipeline;

  const { license: valLicense, segment: valSegment, substance: valSubstance, fromTo: valFromTo, fromToFeature: valFromToFeature, status: valStatus, length: valLength, type: valType, grade: valGrade, outsideDiameter: valOutsideDiameter, wallThickness: valWallThickness, material: valMaterial, mop: valMop, internalProtection: valInternalProtection } = validators;


  // type b = Omit<IPipeline, "injectionPoints" | "satellite">;
  // type a = ([b[keyof b], IValidators[keyof IValidators]]);

  // const pipeline_properties = [[{ length }, valLength], [{ type }, valType], [{ grade }, valGrade], [{ outsideDiameter }, valOutsideDiameter], [{ wallThickness }, valWallThickness], [{ material }, valMaterial], [{ mop }, valMop], [{ internalProtection }, valInternalProtection]];
  const pipeline_properties = { length, type, grade, outsideDiameter, wallThickness, material, mop, internalProtection };
  const pipeline_properties_validators = [valLength, valType, valGrade, valOutsideDiameter, valWallThickness, valMaterial, valMop, valInternalProtection];

  const modalDeletePipeline = showDeletePipelineModal ?
    <ModalDeletePipeline
      license={license}
      segment={segment}
      deletePipeline={handleDeletePipeline}
      hideModalDeletePipeline={hideModalDeletePipeline} /> : null;

  const pipelineRows = [
    <tr className={`MuiTableRow-root${expandedPipelines.includes(id) ? " makeStyles-root-1" : ""}`} key={id} data-target={"pipeline index is " + isEven(ppl_idx)}>
      <td className=/*"expand-collapse-row"*/"MuiTableCell-root MuiTableCell-body">
        <div className="button-container">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={onPipelineClick} type="button">
            {expandedPipelines.includes(id) ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        </div>
      </td>
      <td className="MuiTableCell-root MuiTableCell-body">
        <div className="cell-wrapper">
          <div className="form-r">
            <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={showModalDeletePipeline} type="button">
              <RemoveIcon />
            </button>
          </div>
          <div className="form-l">
            <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={handleAddPipeline} type="button">
              <AddIcon />
            </button>
          </div>
          {modalDeletePipeline}
        </div>
      </td>
      <td className="MuiTableCell-root MuiTableCell-body">{id}</td>
      <td className="MuiTableCell-root MuiTableCell-body">{createdAt}</td>
      <EntryField id={id} record={license} columnName="license" validator={valLicense}/* fetchPipelines={fetchPipelines}*/ />
      <EntryField id={id} record={segment} columnName="segment" validator={valSegment}/* fetchPipelines={fetchPipelines}*/ />
      <EntryField id={id} record={substance} columnName="substance" validator={valSubstance} /* fetchPipelines={fetchPipelines} */ />
      <EntryField id={id} record={from} columnName="from" validator={valFromTo}/*  fetchPipelines={fetchPipelines} */ />
      <EntryField id={id} record={fromFeature} columnName="fromFeature" validator={valFromToFeature}/*  fetchPipelines={fetchPipelines} */ />
      <EntryField id={id} record={to} columnName="to" validator={valFromTo}/*  fetchPipelines={fetchPipelines} */ />
      <EntryField id={id} record={toFeature} columnName="toFeature" validator={valFromToFeature}/*  fetchPipelines={fetchPipelines} */ />
      <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">{injectionPoints.length === 1 ? "1 well" : `${injectionPoints.length} wells`}</td>
      <EntryField id={id} record={status} columnName="status" validator={valStatus}/*  fetchPipelines={fetchPipelines} */ />
    </tr>
  ];

  if (expandedPipelines.includes(id)) {
    pipelineRows.push(
      <PipelineData
        key={`${id} injection points`}
        id={id}
        pipeline_properties={pipeline_properties}
        pipeline_properties_validators={pipeline_properties_validators}
        isEven={isEven(ppl_idx)}
        injectionPoints={injectionPoints}
        injectionPointOptions={injectionPointOptions}
      // fetchPipelines={fetchPipelines}
      />
    );
  }
  return <>{pipelineRows}</>;
}
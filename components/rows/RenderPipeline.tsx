import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import PipelineData from './PipelineData';
import EntryField from '../fields/EntryField';
import { ModalDeletePipeline } from '../Modal';
import RemoveIcon from '../svg/remove-pipeline';
import AddIcon from '../svg/add-pipeline';
import ExpandIcon from '../svg/expand';
import CollapseIcon from '../svg/collapse';
import { IValidators, IPipelineQuery, IInjectionPointQuery, PIPELINES_BY_ID_QUERY } from '../../pages/pipelines';
import { Pipeline } from '@prisma/client';


const isEven = (value: number): "even" | "odd" => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

interface IRenderPipelineProps {
  ppl_idx: number;
  pipeline: IPipelineQuery;
  injectionPointOptions: IInjectionPointQuery[] | undefined;
  validators: IValidators;
  expandedPipelines: string[];
  onPipelineClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DUPLICATE_PIPELINE = gql`
  mutation duplicatePipeline($id: String!) {
    duplicatePipeline(id: $id) {
      id
      license
      segment
    }
  }
`;

const DELETE_PIPELINE = gql`
  mutation deletePipeline($id: String!) {
    deletePipeline(id: $id) {
      id
      license
      segment
    }
  }
`;

type IMutatePipeline = Pick<Pipeline, 'id' | 'license' | 'segment'>;

interface IDuplicatePipeline {
  duplicatePipeline: IMutatePipeline;
}

interface IDeletePipeline {
  deletePipeline: IMutatePipeline;
}

type IMutatePipelineVars = Pick<Pipeline, 'id'>;


export default function RenderPipeline({ ppl_idx, pipeline, injectionPointOptions, validators, expandedPipelines, onPipelineClick }: IRenderPipelineProps): JSX.Element {
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState<boolean>(false);

  const [deletePipeline, { data: dataDeletePipeline }] = useMutation<IDeletePipeline, IMutatePipelineVars>(
    DELETE_PIPELINE, {
    variables: { id: pipeline.id },
    refetchQueries: [PIPELINES_BY_ID_QUERY, 'pipelinesByIdQuery']
  });

  const [duplicatePipeline, { data: dataDuplicatePipeline }] = useMutation<IDuplicatePipeline, IMutatePipelineVars>(
    DUPLICATE_PIPELINE, {
    variables: { id: pipeline.id },
    refetchQueries: [PIPELINES_BY_ID_QUERY, 'pipelinesByIdQuery']
  })

  useEffect(() => {
    console.log(pipeline);
  }, [])
  

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
            <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={() => duplicatePipeline()} type="button">
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
      <EntryField id={id} record={substance} columnName="substance" validator={valSubstance/*SubstanceEnumValidator*/} /* fetchPipelines={fetchPipelines} */ />
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
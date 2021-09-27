// eslint-disable-next-line
import { useState } from 'react';
import PipelineData from './PipelineData';
import EntryField from '../fields/EntryField';
import { ModalDeletePipeline } from '../Modal';
import { ReactComponent as RemoveIcon } from '../../svg/remove-pipeline.svg';
import { ReactComponent as AddPipelineIcon } from '../../svg/add-pipeline.svg';
import { ReactComponent as ExpandIcon } from '../../svg/expand.svg';
import { ReactComponent as CollapseIcon } from '../../svg/collapse.svg';
import { IPipeline, IInjectionPoint, IInjectionPointOptionsError, IValidators } from '../../App';

const isEven = (value: number): "even" | "odd" => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

interface IRenderPipelineProps {
  ppl_idx: number;
  pipeline: IPipeline;
  injectionPointOptions: IInjectionPoint[] | IInjectionPointOptionsError[];
  validators: IValidators | null;
  expandedPipelines: string[];
  onPipelineClick: React.MouseEventHandler<HTMLButtonElement>;
  fetchPipelines: () => void
}

export default function RenderPipeline({ ppl_idx, pipeline, injectionPointOptions, validators, expandedPipelines, onPipelineClick, fetchPipelines }: IRenderPipelineProps): JSX.Element {
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState<boolean>(false);

  function handleAddPipeline() {
    fetch(`http://localhost:5002/pipeline/${pipeline._id}/copy`, {
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

  function deletePipeline() {
    fetch("http://localhost:5002/pipeline/" + pipeline._id, {
      method: 'DELETE',
    })
      .then(response => { return response.json() })
      .then(data => {
        fetchPipelines();
        console.log('Delete Success:', data);
      })
      .catch((error) => {
        console.error('Delete Error:', error);
      });
    setShowDeletePipelineModal(false);
  }

  const { _id, created_at_formatted, license, segment, substance, from, from_feature, to, to_feature, injection_points: inj_pts, status, length, type, grade, outside_diameter, wall_thickness, material, mop, internal_protection } = pipeline;

  const { license: val_license, segment: val_segment, substance: val_substance, from_to: val_from_to, from_to_feature: val_from_to_feature, status: val_status, length: val_length, type: val_type, grade: val_grade, outside_diameter: val_outside_diameter, wall_thickness: val_wall_thickness, material: val_material, mop: val_mop, internal_protection: val_internal_protection } = validators === null ?
    { license: "", segment: "", substance: [""], from_to: "", from_to_feature: [""], status: [""], length: "", type: [""], grade: [""], outside_diameter: [0], wall_thickness: "", material: [""], mop: "", internal_protection: [""] } : validators;


  // type b = Omit<IPipeline, "injection_points" | "satellite">;
  // type a = ([b[keyof b], IValidators[keyof IValidators]]);

  // const mechanical_properties = [[{ length }, val_length], [{ type }, val_type], [{ grade }, val_grade], [{ outside_diameter }, val_outside_diameter], [{ wall_thickness }, val_wall_thickness], [{ material }, val_material], [{ mop }, val_mop], [{ internal_protection }, val_internal_protection]];
  const mechanical_properties = { length, type, grade, outside_diameter, wall_thickness, material, mop, internal_protection };
  const mechanical_properties_validators = [val_length, val_type, val_grade, val_outside_diameter, val_wall_thickness, val_material, val_mop, val_internal_protection];

  const modalDeletePipeline = showDeletePipelineModal ?
    <ModalDeletePipeline
      license={license}
      segment={segment}
      deletePipeline={deletePipeline}
      hideModalDeletePipeline={hideModalDeletePipeline} /> : null;

  const pipelineRows = [
    <tr className={`MuiTableRow-root${expandedPipelines.includes(_id) ? " makeStyles-root-1" : ""}`} key={_id} data-target={"pipeline index is " + isEven(ppl_idx)}>
      <td className=/*"expand-collapse-row"*/"MuiTableCell-root MuiTableCell-body">
        <div className="button-container">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={onPipelineClick} type="button">
            {expandedPipelines.includes(_id) ? <CollapseIcon className="MuiSvgIcon-root" /> : <ExpandIcon className="MuiSvgIcon-root" />}
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
              <AddPipelineIcon />
            </button>
          </div>
          {modalDeletePipeline}
        </div>
      </td>
      <td className="MuiTableCell-root MuiTableCell-body">{_id}</td>
      <td className="MuiTableCell-root MuiTableCell-body">{created_at_formatted}</td>
      <EntryField _id={_id} record={license} columnName="license" validator={val_license} fetchPipelines={fetchPipelines} />
      <EntryField _id={_id} record={segment} columnName="segment" validator={val_segment} fetchPipelines={fetchPipelines} />
      <EntryField _id={_id} record={substance} columnName="substance" validator={val_substance} fetchPipelines={fetchPipelines} />
      <EntryField _id={_id} record={from} columnName="from" validator={val_from_to} fetchPipelines={fetchPipelines} />
      <EntryField _id={_id} record={from_feature} columnName="from_feature" validator={val_from_to_feature} fetchPipelines={fetchPipelines} />
      <EntryField _id={_id} record={to} columnName="to" validator={val_from_to} fetchPipelines={fetchPipelines} />
      <EntryField _id={_id} record={to_feature} columnName="to_feature" validator={val_from_to_feature} fetchPipelines={fetchPipelines} />
      <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">{inj_pts.length === 1 ? "1 well" : `${inj_pts.length} wells`}</td>
      <EntryField _id={_id} record={status} columnName="status" validator={val_status} fetchPipelines={fetchPipelines} />
    </tr>
  ];

  if (expandedPipelines.includes(_id)) {
    pipelineRows.push(
      <PipelineData
        key={`${_id} injection points`}
        _id={_id}
        mechanical_properties={mechanical_properties}
        mechanical_properties_validators={mechanical_properties_validators}
        isEven={isEven(ppl_idx)}
        inj_pts={inj_pts}
        injectionPointOptions={injectionPointOptions}
        fetchPipelines={fetchPipelines} />
    );
  }
  return <>{pipelineRows}</>;
}
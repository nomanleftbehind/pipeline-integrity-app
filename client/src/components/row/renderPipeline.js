import React from 'react';
import InjectionPoints from './InjectionPoints';
import EntryField from '../fields/EntryField';
import { ModalDeletePipeline } from '../Modal';
import { ReactComponent as RemoveIcon } from '../../svg/remove-pipeline.svg';
import { ReactComponent as AddPipelineIcon } from '../../svg/add-pipeline.svg';
import { ReactComponent as ExpandIcon } from '../../svg/expand.svg';
import { ReactComponent as CollapseIcon } from '../../svg/collapse.svg';

const isEven = (value) => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

class RenderPipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeletePipelineModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAddPipeline = this.handleAddPipeline.bind(this);
    this.showModalDeletePipeline = this.showModalDeletePipeline.bind(this);
    this.hideModalDeletePipeline = this.hideModalDeletePipeline.bind(this);
    this.deletePipeline = this.deletePipeline.bind(this);
  }

  handleClick() {
    this.props.onPipelineClick();
  }

  handleAddPipeline(e) {
    // e.preventDefault();
    fetch("http://localhost:5002/pipeline/copy", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.pipeline),
    })
      .then(response => { console.log(response); return response.json() })
      .then(data => {
        this.props.fetchPipelines();
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  showModalDeletePipeline() {
    this.setState({ showDeletePipelineModal: true });
  }

  hideModalDeletePipeline() {
    this.setState({ showDeletePipelineModal: false });
  }

  deletePipeline() {
    fetch("http://localhost:5002/pipeline/" + this.props.pipeline._id, {
      method: 'DELETE',
    })
      .then(response => { return response.json() })
      .then(data => {
        this.props.fetchPipelines();
        console.log('Delete Success:', data);
      })
      .catch((error) => {
        console.error('Delete Error:', error);
      });
    this.setState({ showDeletePipelineModal: false });
  }

  render() {
    const ppl_idx = this.props.ppl_idx;
    const pipeline = this.props.pipeline;
    const expandedPipelines = this.props.expandedPipelines;
    const { _id, created_at_formatted, license, segment, substance, from, from_feature, to, to_feature, injection_points: inj_pts, status } = pipeline;

    const { license: val_license, segment: val_segment, substance: val_substance, from_to: val_from_to, from_to_feature: val_from_to_feature, status: val_status } = this.props.validators;

    const modalDeletePipeline = this.state.showDeletePipelineModal ?
      <ModalDeletePipeline
        license={license}
        segment={segment}
        deletePipeline={this.deletePipeline}
        hideModalDeletePipeline={this.hideModalDeletePipeline} /> : null;

    const pipelineRows = [
      <tr className={`MuiTableRow-root${expandedPipelines.includes(_id) ? " makeStyles-root-1" : ""}`} key={_id} target={"pipeline index is " + isEven(ppl_idx)}>
        <td className=/*"expand-collapse-row"*/"MuiTableCell-root MuiTableCell-body">
          <div className="button-container">
            <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={this.handleClick} type="button">
              {expandedPipelines.includes(_id) ? <CollapseIcon className="MuiSvgIcon-root" /> : <ExpandIcon className="MuiSvgIcon-root" />}
            </button>
          </div>
        </td>
        <td className="MuiTableCell-root MuiTableCell-body">
          <div className="cell-wrapper">
            <div className="form-r">
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={this.showModalDeletePipeline} type="button">
                <RemoveIcon />
              </button>
            </div>
            <div className="form-l">
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={this.handleAddPipeline} type="button">
                <AddPipelineIcon />
              </button>
            </div>
            {modalDeletePipeline}
          </div>
        </td>
        <td className="MuiTableCell-root MuiTableCell-body">{_id}</td>
        <td className="MuiTableCell-root MuiTableCell-body">{created_at_formatted}</td>
        <EntryField _id={_id} record={license} columnName="license" validator={RegExp(val_license)} fetchPipelines={this.props.fetchPipelines} />
        <EntryField _id={_id} record={segment} columnName="segment" validator={RegExp(val_segment)} fetchPipelines={this.props.fetchPipelines} />
        <EntryField _id={_id} record={substance} columnName="substance" validator={val_substance} fetchPipelines={this.props.fetchPipelines} />
        <EntryField _id={_id} record={from} columnName="from" validator={RegExp(val_from_to)} fetchPipelines={this.props.fetchPipelines} />
        <EntryField _id={_id} record={from_feature} columnName="from_feature" validator={val_from_to_feature} fetchPipelines={this.props.fetchPipelines} />
        <EntryField _id={_id} record={to} columnName="to" validator={RegExp(val_from_to)} fetchPipelines={this.props.fetchPipelines} />
        <EntryField _id={_id} record={to_feature} columnName="to_feature" validator={val_from_to_feature} fetchPipelines={this.props.fetchPipelines} />
        <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">{inj_pts.length === 1 ? "1 well" : `${inj_pts.length} wells`}</td>
        <EntryField _id={_id} record={status} columnName="status" validator={val_status} fetchPipelines={this.props.fetchPipelines} />
      </tr>
    ];

    if (expandedPipelines.includes(_id)) {
      pipelineRows.push(
        <InjectionPoints
          key={`${_id} injection points`}
          _id={_id}
          isEven={isEven(ppl_idx)}
          inj_pts={inj_pts}
          injectionPointOptions={this.props.injectionPointOptions}
          fetchPipelines={this.props.fetchPipelines} />
      );
    }
    return pipelineRows;
  }
}

export default RenderPipeline;
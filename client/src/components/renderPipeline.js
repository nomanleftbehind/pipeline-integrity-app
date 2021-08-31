import React from 'react';
import InjectionPointForm from './InjectionPointForm';
import Modal from './Modal';
import { ReactComponent as RemoveIcon } from '../svg/remove-pipeline.svg';
import { ReactComponent as AddPipelineIcon } from '../svg/add-pipeline.svg';
import { ReactComponent as EditIcon } from '../svg/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../svg/cancel-icon.svg';
import '../styles/pipeline.css';
import '../styles/injection-point-form.css';

const isEven = (value) => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

class RenderPipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      injectionPoints: [],
      showDuplicateInjectionPointModal: false,
      showDeletePipelineModal: false,
      modifiedInjectionPoints: {},
      showSubmitForm: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAddPipeline = this.handleAddPipeline.bind(this);
    this.handleAddInjectionPoint = this.handleAddInjectionPoint.bind(this);
    this.handleInjectionPointChange = this.handleInjectionPointChange.bind(this);
    this.handleInjectionPointChangeSubmit = this.handleInjectionPointChangeSubmit.bind(this);
    this.showModalDeletePipeline = this.showModalDeletePipeline.bind(this);
    this.hideModalDeletePipeline = this.hideModalDeletePipeline.bind(this);
    this.hideDuplicateInjectionPointModal = this.hideDuplicateInjectionPointModal.bind(this);
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

  handleAddInjectionPoint(e) {
    // e.preventDefault();
    fetch("http://localhost:5002/pipeline/" + this.props.pipeline._id + "/addinjpt", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

  handleUpdatePipeline(pipeline) {
    fetch("http://localhost:5002/pipeline/update/" + pipeline._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipeline),
    })
      .then(response => { return response.json() })
      .then(data => {
        this.props.fetchPipelines();
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleInjectionPointChange(e, inj_pt_id) {
    const modifiedInjectionPoints = this.state.modifiedInjectionPoints;
    modifiedInjectionPoints[inj_pt_id] = e.target.value;
    this.setState({ modifiedInjectionPoints });
    // console.log(e.target.value);
  }

  toggleInjectionPointSubmitForm(inj_pt_id) {
    this.setState(prevState => ({
      ...prevState,
      showSubmitForm: {
        ...prevState.showSubmitForm,
        [inj_pt_id]: !this.state.showSubmitForm[inj_pt_id]
      }
    }));
  }

  databaseChangeInjectionPoint(inj_pt_id, new_inj_pt_id) {
    fetch(`http://localhost:5002/pipeline/${this.props.pipeline._id}/${inj_pt_id}/${new_inj_pt_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => { return response.json() })
      .then(data => {
        this.props.fetchPipelines();
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  submitInjectionPointChange(e, inj_pt_id) {
    // const pipeline = { ...this.props.pipeline };
    // const inj_pts = [...pipeline.injection_points];
    // pipeline.injection_points = inj_pts;
    // const inj_pt_index = pipeline.injection_points.findIndex(inj_pt => inj_pt._id === inj_pt_id);
    // pipeline.injection_points[inj_pt_index] = e.target.name;
    this.databaseChangeInjectionPoint(inj_pt_id, e.target.name);
    console.log(this.state.injectionPoints);
  }

  handleInjectionPointChangeSubmit(e, inj_pt_id) {
    this.setState({ injectionPoints: this.props.pipeline.injection_points.map(({_id}) => _id) },
      () => {
        this.state.injectionPoints.includes(e.target.name) ?
          this.setState({ showDuplicateInjectionPointModal: true }) :
          this.submitInjectionPointChange(e, inj_pt_id)
      });
  }

  deleteInjectionPoint(inj_pt_id) {
    fetch(`http://localhost:5002/pipeline/${this.props.pipeline._id}/${inj_pt_id}`, {
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
  }

  hideDuplicateInjectionPointModal() {
    this.setState({ showDuplicateInjectionPointModal: false });
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
    // console.log(this.props.modifiedInjectionPoints);
    const ppl_idx = this.props.ppl_idx;
    const pipeline = this.props.pipeline;
    const expandedPipelines = this.props.expandedPipelines;
    const modifiedInjectionPoints = this.state.modifiedInjectionPoints;
    const { _id, license, segment, substance, from, to, injection_points: inj_pts, status } = pipeline;

    const modalDeletePipeline = this.state.showDeletePipelineModal ? (
      <Modal>
        <div className="modal">
          <div className="modal-box">
            <div>
              Are you sure you want to delete {`${license}-${segment}`} pipeline?
            </div>
            <button onClick={this.deletePipeline}>Delete</button>
            <button onClick={this.hideModalDeletePipeline}>Cancel</button>
          </div>
        </div>
      </Modal>
    ) : null;

    const modalDuplicateInjectionPoint = this.state.showDuplicateInjectionPointModal ? (
      <Modal>
        <div className="modal">
          <div className="modal-box">
            <div>
              Selected source already is injection point to the respective pipeline!
            </div>
            <button onClick={this.hideDuplicateInjectionPointModal}>OK</button>
          </div>
        </div>
      </Modal>
    ) : null;

    const pipelineRows = [
      <tr key={_id} target={"pipeline index is " + isEven(ppl_idx)}>
        <td>
          <div className="expand-collapse-pipeline-container">
            <button onClick={this.handleClick} type="button">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d={expandedPipelines.includes(_id) ? "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" : "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}></path>
              </svg>
            </button>
          </div>
        </td>
        <td>
          <div className="add-remove-pipeline-container">
            <button onClick={this.showModalDeletePipeline} type="button">
              <RemoveIcon />
            </button>
            <button onClick={this.handleAddPipeline} type="button">
              <AddPipelineIcon />
            </button>
            {modalDeletePipeline}
            {modalDuplicateInjectionPoint}
          </div>
        </td>
        <td><span>{_id}</span></td>
        <td><span>{license}</span></td>
        <td><span>{segment}</span></td>
        <td><span>{substance}</span></td>
        <td><span>{from}</span></td>
        <td><span>{to}</span></td>
        <td>
          <div>
            <span>{inj_pts.length === 1 ? "1 well" : `${inj_pts.length} wells`}</span>
          </div>
          <div className="add-remove-pipeline-container right">
            <button onClick={this.handleAddInjectionPoint} type="button">
              <AddPipelineIcon />
            </button>
          </div>
        </td>
        <td><span>{status}</span></td>
      </tr>
    ];

    if (expandedPipelines.includes(_id)) {
      pipelineRows.push(
        inj_pts.map(inj_pt => {
          // const inj_pt = this.props.injectionPointOptions.find((inj_pt) => inj_pt._id === inj_pt_id);
          // console.log(this.state);
          return (
            <tr key={`pipeline ${_id} injection point ${inj_pt._id}`} target={"pipeline index is " + isEven(ppl_idx)}>
              <td colSpan="8"></td>
              <td className="injection-point">
                <div className="left">
                  <span>{inj_pt.source}</span>
                </div>
                <div className="add-remove-pipeline-container left">
                  <button onClick={() => this.toggleInjectionPointSubmitForm(inj_pt._id)}>{this.state.showSubmitForm[inj_pt._id] ? <CancelIcon /> : <EditIcon />}</button>
                </div>
                <div className="add-remove-pipeline-container right">
                  <button onClick={() => this.deleteInjectionPoint(inj_pt._id)} type="button">
                    <RemoveIcon />
                  </button>
                </div>
                <div className="bottom">
                  {this.state.showSubmitForm[inj_pt._id] ?
                    <InjectionPointForm
                      inj_pt_id={inj_pt._id}
                      injectionPointOptions={this.props.injectionPointOptions}
                      modifiedInjectionPoint={modifiedInjectionPoints[inj_pt._id]}
                      onToggleInjectionPointSubmitForm={() => this.toggleInjectionPointSubmitForm(inj_pt._id)}
                      onInjectionPointChange={(e) => this.handleInjectionPointChange(e, inj_pt._id)}
                      onInjectionPointChangeSubmit={(e) => this.handleInjectionPointChangeSubmit(e, inj_pt._id)} /> :
                    null
                  }
                </div>
              </td>
              <td></td>
            </tr>);
        })
      );
    }
    return pipelineRows;
  }
}

export default RenderPipeline;
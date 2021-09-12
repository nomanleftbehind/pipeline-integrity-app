import React, { useState, useEffect } from 'react';
import InjectionPointForm from '../fields/InjectionPointForm';
import { ModalDuplicateInjectionPoint } from '../Modal';
import { ReactComponent as EditIcon } from '../../svg/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../../svg/cancel-icon.svg';
import { ReactComponent as AddPipelineIcon } from '../../svg/add-pipeline.svg';
import { ReactComponent as RemoveIcon } from '../../svg/remove-pipeline.svg';

function InjectionPoints({ _id, isEven, inj_pts, injectionPointOptions, fetchPipelines }) {
  const [showSubmitForm, setShowSubmitForm] = useState({});
  const [modifiedInjectionPoints, setModifiedInjectionPoints] = useState({});
  const [showDuplicateInjectionPointModal, setShowDuplicateInjectionPointModal] = useState(false);

  const toggleInjectionPointSubmitForm = (inj_pt_id) => {
    setShowSubmitForm({ [inj_pt_id]: !showSubmitForm[inj_pt_id] });
  }

  useEffect(() => {
    console.log(modifiedInjectionPoints);
  }, [modifiedInjectionPoints]);

  const handleInjectionPointChange = (e, inj_pt_id) => {
    setModifiedInjectionPoints({ [inj_pt_id]: e.target.value });
  }

  const handleInjectionPointChangeSubmit = (e, inj_pt_id) => {
    inj_pts.map(({ _id }) => _id).includes(e.target.name) ?
      setShowDuplicateInjectionPointModal(true) :
      submitInjectionPointChange(e, inj_pt_id);
  }

  const hideDuplicateInjectionPointModal = () => {
    setShowDuplicateInjectionPointModal(false);
  }

  const handleAddInjectionPoint = () => {
    fetch("http://localhost:5002/pipeline/" + _id + "/addinjpt", {
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

  const submitInjectionPointChange = (e, inj_pt_id) => {
    fetch(`http://localhost:5002/pipeline/${_id}/${inj_pt_id}/${e.target.name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => { return response.json() })
      .then(data => {
        fetchPipelines();
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deleteInjectionPoint = (inj_pt_id) => {
    fetch(`http://localhost:5002/pipeline/${_id}/${inj_pt_id}`, {
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
  }

  const modalDuplicateInjectionPoint = showDuplicateInjectionPointModal ?
    <ModalDuplicateInjectionPoint
      hideDuplicateInjectionPointModal={hideDuplicateInjectionPointModal} /> : null;

  return (
    <tr className="MuiTableRow-root" target={"pipeline index is " + isEven}>
      <td className="MuiTableCell-root MuiTableCell-body" colSpan="11"></td>
      <td className="MuiTableCell-root MuiTableCell-body" colSpan="2">
        <div className="collapse-container">
          <div className="collapse-container-inner">
            <div className="injection-points-title">Injection Points</div>
            <table className="MuiTable-root">
              <thead className="MuiTableHead-root">
                <tr className="MuiTableRow-root MuiTableRow-head">
                  <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall">
                    <div className="cell-wrapper">
                      <div className="form-l">Source</div>
                      <div className="form-r">
                        <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={handleAddInjectionPoint} type="button">
                          <AddPipelineIcon />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Oil</th>
                  <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Gas</th>
                  <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Water</th>
                </tr>
              </thead>
              <tbody className="MuiTableBody-root">
                {inj_pts.map(inj_pt => {
                  return (
                    <tr key={inj_pt._id} className="MuiTableRow-root">
                      <th className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeSmall" role="cell" scope="row">
                        <div className="cell-wrapper">
                          <div className="cell-r">
                            <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={() => toggleInjectionPointSubmitForm(inj_pt._id)}>{showSubmitForm[inj_pt._id] ? <CancelIcon /> : <EditIcon />}</button>
                          </div>
                          <div className="cell-fr">
                            <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={() => deleteInjectionPoint(inj_pt._id)} type="button">
                              <RemoveIcon />
                            </button>
                          </div>
                          {showSubmitForm[inj_pt._id] ?
                            <InjectionPointForm
                              inj_pt_id={inj_pt._id}
                              injectionPointOptions={injectionPointOptions}
                              modifiedInjectionPoint={modifiedInjectionPoints[inj_pt._id]}
                              onToggleInjectionPointSubmitForm={() => toggleInjectionPointSubmitForm(inj_pt._id)}
                              onInjectionPointChange={(e) => handleInjectionPointChange(e, inj_pt._id)}
                              onInjectionPointChangeSubmit={(e) => handleInjectionPointChangeSubmit(e, inj_pt._id)} /> :
                            <div className="cell-l no-wrap">{inj_pt.source}</div>}
                        </div>
                      </th>
                      <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeSmall">{inj_pt.oil}</td>
                      <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeSmall">{inj_pt.water}</td>
                      <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeSmall">{inj_pt.gas}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {modalDuplicateInjectionPoint}
      </td>
      {/* <td className="MuiTableCell-root MuiTableCell-body" colSpan="6"></td> */}
    </tr>
  );
}

export default InjectionPoints;
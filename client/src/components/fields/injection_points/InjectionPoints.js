import React, { useState } from 'react';
import Source from './Source';
import { ModalDuplicateInjectionPoint } from '../../Modal';
import { ReactComponent as AddPipelineIcon } from '../../../svg/add-pipeline.svg';

function InjectionPoints({ _id, inj_pts, injectionPointOptions, fetchPipelines }) {
  const [showDuplicateInjectionPointModal, setShowDuplicateInjectionPointModal] = useState(false);

  const handleSubmit = (new_inj_pt_id, inj_pt_id) => {
    inj_pts.map(({ _id }) => _id).includes(new_inj_pt_id) ?
      setShowDuplicateInjectionPointModal(true) :
      submitInjectionPointChange(new_inj_pt_id, inj_pt_id);
  }

  const hideDuplicateInjectionPointModal = () => {
    setShowDuplicateInjectionPointModal(false);
  }

  const submitInjectionPointChange = (new_inj_pt_id, inj_pt_id) => {
    fetch(`http://localhost:5002/pipeline/${_id}/${inj_pt_id}/${new_inj_pt_id}`, {
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

  const modalDuplicateInjectionPoint = showDuplicateInjectionPointModal ?
    <ModalDuplicateInjectionPoint
      hideDuplicateInjectionPointModal={hideDuplicateInjectionPointModal} /> : null;

  return (
    <td className="MuiTableCell-root MuiTableCell-body" colSpan="3">
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
                    <Source
                      ppl_id={_id}
                      inj_pt_id={inj_pt._id}
                      source={inj_pt.source}
                      injectionPointOptions={injectionPointOptions}
                      onSubmit={handleSubmit}
                      fetchPipelines={fetchPipelines}
                    />
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
  );
}

export default InjectionPoints;
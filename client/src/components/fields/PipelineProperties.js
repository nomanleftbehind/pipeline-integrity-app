import React from 'react';
import EntryField from './EntryField';

function PipelineProperties({ _id, properties_name, pipeline_properties, fetchPipelines }) {

  return (
    <td className="MuiTableCell-root MuiTableCell-body" colSpan="2">
      <div className="collapse-container">
        <div className="collapse-container-inner">
          <div className="injection-points-title">{properties_name}</div>
          <table className="MuiTable-root">
            <thead className="MuiTableHead-root">
              <tr className="MuiTableRow-root MuiTableRow-head">
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall">Property</th>
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Value</th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root">
              {pipeline_properties.map(([key, validator]) => {
                const [[columnName, record]] = Object.entries(key);
                return (
                  <tr key={columnName} className="MuiTableRow-root">
                    <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeSmall">{columnName.replace('_', ' ')}</td>
                    <EntryField _id={_id} record={record} columnName={columnName} validator={validator} fetchPipelines={fetchPipelines} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </td>
  );
}

export default PipelineProperties;
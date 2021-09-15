import React from 'react';
import InjectionPoints from '../fields/injection_points/InjectionPoints';

export default function PipelineData({ _id, isEven, inj_pts, injectionPointOptions, fetchPipelines }) {

  return (
    <tr className="MuiTableRow-root" target={"pipeline index is " + isEven}>
      <td className="MuiTableCell-root MuiTableCell-body" colSpan="4"></td>
      <InjectionPoints
        _id={_id}
        inj_pts={inj_pts}
        injectionPointOptions={injectionPointOptions}
        fetchPipelines={fetchPipelines}
      />
    </tr>
  );
}
import React from 'react';
import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';

export default function PipelineData({ _id, mechanical_properties, isEven, inj_pts, injectionPointOptions, fetchPipelines }) {

  return (
    <tr className="MuiTableRow-root" target={"pipeline index is " + isEven}>
      <td className="MuiTableCell-root MuiTableCell-body" colSpan="2"></td>
      <InjectionPoints
        _id={_id}
        inj_pts={inj_pts}
        injectionPointOptions={injectionPointOptions}
        fetchPipelines={fetchPipelines}
      />
      <PipelineProperties
        _id={_id}
        properties_name="Mechanical Properties"
        pipeline_properties={mechanical_properties}
        fetchPipelines={fetchPipelines}
      />
    </tr>
  );
}
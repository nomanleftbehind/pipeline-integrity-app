import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';
import { IInjectionPoint, IInjectionPointOptionsError } from '../../App';


export type IMechanicalProperties = { length: number; type: string; grade: string; outside_diameter: number; wall_thickness: number; material: string; mop: number; internal_protection: string }
export type IMechanicalPropertiesValidators = string | string[] | number[]

export interface IPipelineDataProps {
  _id: string;
  mechanical_properties: IMechanicalProperties;
  mechanical_properties_validators: IMechanicalPropertiesValidators[];
  isEven: "even" | "odd";
  inj_pts: IInjectionPoint[];
  injectionPointOptions: IInjectionPoint[] | IInjectionPointOptionsError[];
  fetchPipelines: () => void
}

export default function PipelineData({ _id, mechanical_properties, mechanical_properties_validators, isEven, inj_pts, injectionPointOptions, fetchPipelines }: IPipelineDataProps): JSX.Element {

  return (
    <tr className="MuiTableRow-root" data-target={"pipeline index is " + isEven}>
      <td className="MuiTableCell-root MuiTableCell-body" colSpan={2}></td>
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
        pipeline_properties_validators={mechanical_properties_validators}
        fetchPipelines={fetchPipelines}
      />
    </tr>
  );
}
import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';
import { Pipeline, InjectionPoint } from '@prisma/client';
import { AllInjectionPoint } from '../../pages/pipelines';


export type IPipelineProperties = Partial<Pipeline>;
export type IPipelinePropertiesValidators = string | string[] | number[]

export interface IPipelineDataProps {
  id: string;
  pipeline_properties: IPipelineProperties;
  pipeline_properties_validators: IPipelinePropertiesValidators[];
  isEven: "even" | "odd";
  injectionPoints: InjectionPoint[];
  injectionPointOptions: AllInjectionPoint[];
  // fetchPipelines: () => void
}

export default function PipelineData({ id, pipeline_properties, pipeline_properties_validators, isEven, injectionPoints, injectionPointOptions/*, fetchPipelines*/ }: IPipelineDataProps): JSX.Element {

  return (
    <tr className="MuiTableRow-root" data-target={"pipeline index is " + isEven}>
      <td className="MuiTableCell-root MuiTableCell-body" colSpan={2}></td>
      {/* <InjectionPoints
        id={id}
        injectionPoints={injectionPoints}
        injectionPointOptions={injectionPointOptions}
        // fetchPipelines={fetchPipelines}
      /> */}
      <PipelineProperties
        id={id}
        properties_name="Mechanical Properties"
        pipeline_properties={pipeline_properties}
        pipeline_properties_validators={pipeline_properties_validators}
      // fetchPipelines={fetchPipelines}
      />
    </tr>
  );
}
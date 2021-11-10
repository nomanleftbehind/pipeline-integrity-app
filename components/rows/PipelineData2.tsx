import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties2 from '../fields/PipelineProperties2';
import { IPipeline, IInjectionPointOptions } from './RenderPipeline2';
import { IValidators } from '../../pages/prettyPipelines';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


export interface IPipelineDataProps {
  open: boolean;
  pipeline: IPipeline;
  validators: IValidators;
  isEven: "even" | "odd";
  injectionPointOptions: IInjectionPointOptions;
}

export default function PipelineData({ open, pipeline, validators, isEven, injectionPointOptions }: IPipelineDataProps): JSX.Element {

  const { id, createdAt, license, segment, substance, from, fromFeature, to, toFeature, injectionPoints, status, length, type, grade, outsideDiameter, wallThickness, material, mop, internalProtection } = pipeline;

  const { license: valLicense, segment: valSegment, substance: valSubstance, fromTo: valFromTo, fromToFeature: valFromToFeature, status: valStatus, length: valLength, type: valType, grade: valGrade, outsideDiameter: valOutsideDiameter, wallThickness: valWallThickness, material: valMaterial, mop: valMop, internalProtection: valInternalProtection } = validators;

  const pipeline_properties = { length, type, grade, outsideDiameter, wallThickness, material, mop, internalProtection } as Partial<IPipeline>;
  const pipeline_properties_validators = [valLength, valType, valGrade, valOutsideDiameter, valWallThickness, valMaterial, valMop, valInternalProtection];

  return (
    <TableRow data-target={"pipeline index is " + isEven}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} />
      <InjectionPoints
        open={open}
        id={id}
        injectionPoints={injectionPoints}
        injectionPointOptions={injectionPointOptions}
      />
      <PipelineProperties2
        open={open}
        id={id}
        properties_name="Mechanical Properties"
        pipeline_properties={pipeline_properties}
        pipeline_properties_validators={pipeline_properties_validators}
      />
    </TableRow>
  );
}
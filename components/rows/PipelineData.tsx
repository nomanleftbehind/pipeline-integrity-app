import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';
import { IPipeline, IInjectionPointOptions, IValidators } from './RenderPipeline';
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

  const { id, createdAt, license, segment, substance, from, fromFeature, to, toFeature, injectionPoints, upstream, status, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection } = pipeline;

  const { licenseMatchPattern, segmentMatchPattern, substanceEnum, fromToMatchPattern, fromToFeatureEnum, statusEnum, lengthMatchPattern, typeEnum, gradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum } = validators || {};

  const mechanical_properties = [
    { columnName: 'length', record: length, validator: lengthMatchPattern },
    { columnName: 'type', record: type, validator: typeEnum },
    { columnName: 'grade', record: grade, validator: gradeEnum },
    { columnName: 'yieldStrength', record: yieldStrength, validator: yieldStrengthMatchPattern },
    { columnName: 'outsideDiameter', record: outsideDiameter, validator: outsideDiameterMatchPattern },
    { columnName: 'wallThickness', record: wallThickness, validator: wallThicknessMatchPattern },
    { columnName: 'material', record: material, validator: materialEnum },
    { columnName: 'mop', record: mop, validator: mopMatchPattern },
    { columnName: 'internalProtection', record: internalProtection, validator: internalProtectionEnum }
  ];

  const systemFields = [
    { columnName: 'createdAt', record: createdAt, validator: undefined },
    { columnName: 'id', record: id, validator: undefined },
  ];

  return (
    <TableRow data-target={"pipeline index is " + isEven}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} />
      <InjectionPoints
        open={open}
        id={id}
        upstream={upstream}
        injectionPoints={injectionPoints}
        injectionPointOptions={injectionPointOptions}
      />
      <PipelineProperties
        open={open}
        id={id}
        properties_name="Mechanical Properties"
        pipeline_properties={mechanical_properties}
      />
      <PipelineProperties
        open={open}
        id={id}
        properties_name="System Fields"
        pipeline_properties={systemFields}
      />
    </TableRow>
  );
}
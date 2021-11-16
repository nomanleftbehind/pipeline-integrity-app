import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties2 from '../fields/PipelineProperties2';
import { IPipeline, IInjectionPointOptions, IValidators } from './RenderPipeline2';
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

  const { licenseMatchPattern, segmentMatchPattern, substanceEnum, fromToMatchPattern, fromToFeatureEnum, statusEnum, lengthMatchPattern, typeEnum, gradeEnum, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum } = validators || {};

  // const pipeline_properties = { length, type, grade, outsideDiameter, wallThickness, material, mop, internalProtection } as Partial<IPipeline>;
  // const pipeline_properties_validators = [valLength, valType, valGrade, valOutsideDiameter, valWallThickness, valMaterial, valMop, valInternalProtection];
  // const pipeline_properties_validators = [lengthMatchPattern, typeEnum, gradeEnum, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum];

  const mechanical_properties = [
    [{ length }, lengthMatchPattern],
    [{ type }, typeEnum],
    [{ grade }, gradeEnum],
    [{ outsideDiameter }, outsideDiameterMatchPattern],
    [{ wallThickness }, wallThicknessMatchPattern],
    [{ material }, materialEnum],
    [{ mop }, mopMatchPattern],
    [{ internalProtection }, internalProtectionEnum]
  ];

  mechanical_properties.map(([property, validator]) => {
    if (property) {
      const [[columnName, record]] = Object.entries(property) as [[string, typeof lengthMatchPattern | typeof typeEnum]]
      console.log('columnName:', columnName, ', record:', record, ', validator:', validator);
    }
    return (
      'a'
    );
  })

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
        pipeline_properties={mechanical_properties}
      />
    </TableRow>
  );
}

import RecordEntry, { IEditRecordFunction } from '../fields/RecordEntry';
import { IRecordEntryMap } from './LicenseChanges';
import { IPipeline } from './RenderPipeline';
import { IValidatorsMechanicalProperties } from './PipelineData';

export type IMechanicalPropertyRecordEntryMap = IRecordEntryMap & { label: string };

type IMechanicalPropertiesProps = Pick<IPipeline, 'id' | 'length' | 'pipelineTypeId' | 'pipelineGradeId' | 'yieldStrength' | 'outsideDiameter' | 'wallThickness' | 'pipelineMaterialId' | 'mop' | 'pipelineInternalProtectionId' | 'piggable' | 'piggingFrequency' | 'authorized'> & {
  editPipeline: IEditRecordFunction;
  validators?: IValidatorsMechanicalProperties;
};

export default function MechanicalProperties({ id, length, pipelineTypeId, pipelineGradeId, yieldStrength, outsideDiameter, wallThickness, pipelineMaterialId, mop, pipelineInternalProtectionId, piggable, piggingFrequency, authorized, editPipeline: editRecord, validators }: IMechanicalPropertiesProps) {

  const { lengthMatchPattern, pipelineTypeEnum, pipelineGradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, pipelineMaterialEnum, mopMatchPattern, pipelineInternalProtectionEnum } = validators || {};

  const mechanicalProperties: IMechanicalPropertyRecordEntryMap[] = [
    { columnName: 'length', record: length, label: 'Length (km)', columnType: 'number', nullable: false, validator: lengthMatchPattern, editRecord },
    { columnName: 'pipelineTypeId', record: pipelineTypeId, label: 'Type', columnType: 'string', nullable: true, validator: pipelineTypeEnum, editRecord },
    { columnName: 'pipelineGradeId', record: pipelineGradeId, label: 'Grade', columnType: 'string', nullable: true, validator: pipelineGradeEnum, editRecord },
    { columnName: 'yieldStrength', record: yieldStrength, label: 'Yield Strength (Mpa)', columnType: 'number', nullable: true, validator: yieldStrengthMatchPattern, editRecord },
    { columnName: 'outsideDiameter', record: outsideDiameter, label: 'Outside Diameter (mm)', columnType: 'number', nullable: true, validator: outsideDiameterMatchPattern, editRecord },
    { columnName: 'wallThickness', record: wallThickness, label: 'Wall Thickness (mm)', columnType: 'number', nullable: true, validator: wallThicknessMatchPattern, editRecord },
    { columnName: 'pipelineMaterialId', record: pipelineMaterialId, label: 'Material', columnType: 'string', nullable: true, validator: pipelineMaterialEnum, editRecord },
    { columnName: 'mop', record: mop, label: 'MOP (kPa)', columnType: 'number', nullable: true, validator: mopMatchPattern, editRecord },
    { columnName: 'pipelineInternalProtectionId', record: pipelineInternalProtectionId, label: 'Internal Protection', columnType: 'string', nullable: true, validator: pipelineInternalProtectionEnum, editRecord },
    { columnName: 'piggable', record: piggable, label: 'Piggable', columnType: 'boolean', nullable: true, editRecord },
    { columnName: 'piggingFrequency', record: piggingFrequency, label: 'Pigging Frequency (#/year)', columnType: 'number', nullable: true, editRecord },
  ];

  let gridRow = 0;

  return (
    <div className='mechanical-properties'>
      {mechanicalProperties.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
        let gridColumn = i;
        gridColumn = gridColumn % 3 + 1;
        if (gridColumn === 1) {
          gridRow += 1;
        }
        return (
          <div key={i} style={{ gridColumn, gridRow }}>
            <div>{label}</div>
            <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
          </div>
        );
      })}
    </div>
  )
}
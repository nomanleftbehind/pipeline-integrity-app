
import RecordEntry, { IEditRecordFunction } from '../fields/RecordEntry';
import { IRecordEntryMap } from './LicenseChanges';
import { IPipeline } from './RenderPipeline';
import { IValidatorsPipelineProperties } from './PipelineData';

export type IMechanicalPropertyRecordEntryMap = IRecordEntryMap & { label: string };

type IMechanicalPropertiesProps = Pick<IPipeline, 'id' | 'flowCalculationDirection' | 'piggable' | 'piggingFrequency' | 'authorized'> & {
  editPipeline: IEditRecordFunction;
  validators?: IValidatorsPipelineProperties;
};

export default function MechanicalProperties({ id, flowCalculationDirection, piggable, piggingFrequency, authorized, editPipeline: editRecord, validators }: IMechanicalPropertiesProps) {

  const { flowCalculationDirectionEnum } = validators || {};

  const mechanicalProperties: IMechanicalPropertyRecordEntryMap[] = [
    { columnName: 'flowCalculationDirection', record: flowCalculationDirection, label: 'Flow Calculation Direction', columnType: 'string', nullable: false, validator: flowCalculationDirectionEnum, editRecord },
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
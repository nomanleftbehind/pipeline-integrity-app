
import RecordEntry, { IEditRecordFunction } from '../fields/RecordEntry';
import { IRecordEntryMap } from './LicenseChanges';
import { IPipeline } from './RenderPipeline';
import { IValidatorsPipelineProperties } from './PipelineData';

export type IPipelinePropertyRecordEntryMap = IRecordEntryMap & { label: string };

interface IMechanicalPropertiesProps {
  fields: Pick<IPipeline, 'id' | 'flowCalculationDirection' | 'piggable' | 'piggingFrequency' | 'comment' | 'authorized' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>;
  editPipeline: IEditRecordFunction;
  validators?: IValidatorsPipelineProperties;
};

export default function PipelineProperties({ fields: { id, flowCalculationDirection, piggable, piggingFrequency, comment, authorized, createdBy, createdAt, updatedBy, updatedAt }, editPipeline: editRecord, validators }: IMechanicalPropertiesProps) {

  const { flowCalculationDirectionEnum } = validators || {};

  const pipelineProperties: IPipelinePropertyRecordEntryMap[] = [
    { columnName: 'flowCalculationDirection', record: flowCalculationDirection, label: 'Flow Calculation Direction', columnType: 'string', nullable: false, validator: flowCalculationDirectionEnum, editRecord },
    { columnName: 'piggable', record: piggable, label: 'Piggable', columnType: 'boolean', nullable: true, editRecord },
    { columnName: 'piggingFrequency', record: piggingFrequency, label: 'Pigging Frequency (#/year)', columnType: 'number', nullable: true, editRecord },
    { columnName: 'comment', record: comment, label: 'Comment', columnType: 'string', nullable: true, editRecord },
    { columnName: 'createdBy', record: createdBy.email, columnType: 'string', label: 'Created By', nullable: false },
    { columnName: 'createdAt', record: createdAt, columnType: 'date', label: 'Created At', nullable: false },
    { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string', label: 'Updated By', nullable: false },
    { columnName: 'updatedAt', record: updatedAt, columnType: 'date', label: 'Updated At', nullable: false },
    { columnName: 'id', record: id, columnType: 'string', label: 'ID', nullable: false },
  ];

  let gridRow = 0;

  return (
    <div className='mechanical-properties'>
      {pipelineProperties.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
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
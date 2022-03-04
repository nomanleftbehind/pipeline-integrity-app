
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { IPipeline } from './RenderPipeline';
import {
  useEditPipelineMutation,
  useValidatorsMechanicalPropertiesQuery,
  PipelinesByIdQueryDocument,
} from '../../graphql/generated/graphql';

type IMechanicalPropertiesProps = Pick<IPipeline, 'id' | 'length' | 'type' | 'grade' | 'yieldStrength' | 'outsideDiameter' | 'wallThickness' | 'material' | 'mop' | 'internalProtection' | 'createdBy'>


export default function MechanicalProperties({ id, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection, createdBy }: IMechanicalPropertiesProps) {

  const { data: dataValidators } = useValidatorsMechanicalPropertiesQuery();
  const [editPipeline] = useEditPipelineMutation({ refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });

  const editRecord = ({ id, columnName, columnType, newRecord }: IEditRecord) => {
    const switchNewRecord = () => {
      switch (columnType) {
        case 'number':
          if (newRecord === null) {
            return null;
          }
          return Number(newRecord);
        case 'date':
          if (newRecord && typeof newRecord !== 'boolean') {
            const date = new Date(newRecord);
            return date.toISOString();
          }
        default:
          return newRecord;
      }
    }
    newRecord = switchNewRecord();
    editPipeline({ variables: { id, [columnName]: newRecord } });
  }

  const { lengthMatchPattern, typeEnum, gradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum } = dataValidators?.validators || {};

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 240px 240px',
        columnGap: '10px',
        rowGap: '30px',
        gridTemplateRows: 'minmax(50px, auto)',
      }}
    >
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        <div>Length (km)</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='length' columnType='number' nullable={false} record={length} validator={lengthMatchPattern} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <div>Type</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='type' columnType='string' nullable={true} record={type} validator={typeEnum} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 3, gridRow: 1 }}>
        <div>Grade</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='grade' columnType='string' nullable={true} record={grade} validator={gradeEnum} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        <div>Yield Strength (Mpa)</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='yieldStrength' columnType='number' nullable={true} record={yieldStrength} validator={yieldStrengthMatchPattern} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 2, gridRow: 2 }}>
        <div>Outside Diameter (mm)</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='outsideDiameter' columnType='number' nullable={true} record={outsideDiameter} validator={outsideDiameterMatchPattern} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 3, gridRow: 2 }}>
        <div>Wall Thickness (mm)</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='wallThickness' columnType='number' nullable={true} record={wallThickness} validator={wallThicknessMatchPattern} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 1, gridRow: 3 }}>
        <div>Material</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='material' columnType='string' nullable={true} record={material} validator={materialEnum} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 2, gridRow: 3 }}>
        <div>MOP (kPa)</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='mop' columnType='number' nullable={true} record={mop} validator={mopMatchPattern} editRecord={editRecord} />
      </div>
      <div style={{ gridColumn: 3, gridRow: 3 }}>
        <div>Internal Protection</div>
        <RecordEntry id={id} createdById={createdBy.id} columnName='internalProtection' columnType='string' nullable={true} record={internalProtection} validator={internalProtectionEnum} editRecord={editRecord} />
      </div>
    </div>
  )
}
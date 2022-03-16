
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { useAuth } from '../../context/AuthContext';
import { IRecordEntryMap } from './LicenseChanges';
import { IPipeline } from './RenderPipeline';
import {
  useEditPipelineMutation,
  useValidatorsMechanicalPropertiesQuery,
  PipelinesByIdQueryDocument,
} from '../../graphql/generated/graphql';

type IMechanicalPropertyRecordEntryMap = IRecordEntryMap & { label: string };

type IMechanicalPropertiesProps = Pick<IPipeline, 'id' | 'length' | 'type' | 'grade' | 'yieldStrength' | 'outsideDiameter' | 'wallThickness' | 'material' | 'mop' | 'internalProtection' | 'createdBy'>


export default function MechanicalProperties({ id, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection, createdBy }: IMechanicalPropertiesProps) {
  const { data: dataValidators } = useValidatorsMechanicalPropertiesQuery();
  const [editPipeline] = useEditPipelineMutation({ refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });

  const { user } = useAuth() || {};
  const { role } = user || {};
  const authorized = role === 'ADMIN' || role === 'ENGINEER';

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

  const mechanicalProperties: IMechanicalPropertyRecordEntryMap[] = [
    { columnName: 'length', record: length, label: 'Length (km)', columnType: 'number', nullable: false, validator: lengthMatchPattern, editRecord },
    { columnName: 'type', record: type, label: 'Type', columnType: 'string', nullable: true, validator: typeEnum, editRecord },
    { columnName: 'grade', record: grade, label: 'Grade', columnType: 'string', nullable: true, validator: gradeEnum, editRecord },
    { columnName: 'yieldStrength', record: yieldStrength, label: 'Yield Strength (Mpa)', columnType: 'number', nullable: true, validator: yieldStrengthMatchPattern, editRecord },
    { columnName: 'outsideDiameter', record: outsideDiameter, label: 'Outside Diameter (mm)', columnType: 'number', nullable: true, validator: outsideDiameterMatchPattern, editRecord },
    { columnName: 'wallThickness', record: wallThickness, label: 'Wall Thickness (mm)', columnType: 'number', nullable: true, validator: wallThicknessMatchPattern, editRecord },
    { columnName: 'material', record: material, label: 'Material', columnType: 'string', nullable: true, validator: materialEnum, editRecord },
    { columnName: 'mop', record: mop, label: 'MOP (kPa)', columnType: 'number', nullable: true, validator: mopMatchPattern, editRecord },
    { columnName: 'internalProtection', record: internalProtection, label: 'Internal Protection', columnType: 'string', nullable: true, validator: internalProtectionEnum, editRecord },
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
            <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
          </div>
        );
      })}
    </div>
  )
}
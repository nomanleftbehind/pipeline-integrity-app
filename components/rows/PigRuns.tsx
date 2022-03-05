import { Fragment } from 'react';
import { useAuth } from '../../context/AuthContext';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {
  usePigRunsByPipelineIdQuery,
  useValidatorsPigRunQuery,
  useEditPigRunMutation,
  useAddPigRunMutation,
  useDeletePigRunMutation,
  PigRunsByPipelineIdDocument,
} from '../../graphql/generated/graphql';

export interface IPigRunsProps {
  pipelineId: string;
}

export default function PigRuns({ pipelineId }: IPigRunsProps) {
  const { data, loading, error } = usePigRunsByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataValidators } = useValidatorsPigRunQuery();
  const [editPigRun] = useEditPigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });
  const [addRecord] = useAddPigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });
  const [deleteRecord] = useDeletePigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });

  const { pigTypeEnum, pigInspectionEnum } = dataValidators?.validators || {};

  const { user } = useAuth() || {};
  const { role, id: userId } = user || {};

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
    editPigRun({ variables: { id, [columnName]: newRecord } });
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '30px 290px 220px 220px auto 130px 130px 200px auto', gap: '5px', gridAutoRows: 'minmax(40px, auto)' }}>
      {(role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') && <div style={{ padding: '4px', gridColumn: 1, gridRow: 1 }}>
        <IconButton
          style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
          aria-label='add row' size='small' onClick={() => addRecord({ variables: { pipelineId } })}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>}
      <div style={{ padding: '4px', gridColumn: 2, gridRow: 1 }}>Pig Type</div>
      <div style={{ padding: '4px', gridColumn: 3, gridRow: 1 }}>Date In</div>
      <div style={{ padding: '4px', gridColumn: 4, gridRow: 1 }}>Date Out</div>
      <div style={{ padding: '4px', gridColumn: 5, gridRow: 1 }}>Operator</div>
      <div style={{ padding: '4px', gridColumn: 6, gridRow: 1 }}>Isolation Valve Function Test</div>
      <div style={{ padding: '4px', gridColumn: 7, gridRow: 1 }}>Pig Sender/ Receiver Insp.</div>
      <div style={{ padding: '4px', gridColumn: 8, gridRow: 1 }}>Comment</div>
      <div style={{ padding: '4px', gridColumn: 9, gridRow: 1 }}>Created By</div>
      <div style={{ padding: '4px', gridColumn: 10, gridRow: 1 }}>Updated By</div>
      <div style={{ padding: '4px', gridColumn: 11, gridRow: 1 }}>ID</div>
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.pigRunsByPipelineId?.map((pigRun, i) => {
        i += 2;
        if (pigRun) {
          const { id, pigType, dateIn, dateOut, operator, isolationValveFunctionTest, pigSenderReceiverInspection, comment, createdBy, updatedBy } = pigRun;
          const authorized = role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdBy.id === userId);
          return (
            <Fragment key={id}>
              {authorized && <div style={{ padding: '4px', gridColumn: 1, gridRow: i }}>
                <IconButton
                  style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
                  aria-label='delete row' size='small' onClick={() => deleteRecord({ variables: { id } })}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>}
              <div style={{ padding: '4px', gridColumn: 2, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='pigType' columnType='string' nullable={true} record={pigType} validator={pigTypeEnum} authorized={authorized} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 3, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='dateIn' columnType='date' nullable={false} record={dateIn} authorized={authorized} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 4, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='dateOut' columnType='date' nullable={true} record={dateOut} authorized={authorized} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 5, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='operator' columnType='string' nullable={true} record={operator?.email} authorized={authorized} />
              </div>
              <div style={{ padding: '4px', gridColumn: 6, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='isolationValveFunctionTest' columnType='string' nullable={true} record={isolationValveFunctionTest} validator={pigInspectionEnum} authorized={authorized} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 7, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='pigSenderReceiverInspection' columnType='string' nullable={true} record={pigSenderReceiverInspection} validator={pigInspectionEnum} authorized={authorized} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 8, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='comment' columnType='string' nullable={true} record={comment} authorized={authorized} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 9, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='createdBy' columnType='string' nullable={false} record={createdBy.email} authorized={authorized} />
              </div>
              <div style={{ padding: '4px', gridColumn: 10, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='updatedBy' columnType='string' nullable={false} record={updatedBy.email} authorized={authorized} />
              </div>
              <div style={{ padding: '4px', gridColumn: 11, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='ID' columnType='string' nullable={false} record={id} authorized={authorized} />
              </div>
            </Fragment>
          );
        }
      })}
    </div>
  );
}
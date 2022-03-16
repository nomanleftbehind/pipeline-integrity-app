import { useState, Fragment } from 'react';
import { useAuth } from '../../context/AuthContext';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IRecordEntryMap } from './LicenseChanges';

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
  const [editPigRun] = useEditPigRunMutation({
    refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'],
    onCompleted: ({ editPigRun }) => {
      const { error } = editPigRun || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addPigRun] = useAddPigRunMutation({
    variables: { pipelineId },
    refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'],
    onCompleted: ({ addPigRun }) => {
      const { error } = addPigRun || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deletePigRun] = useDeletePigRunMutation({
    refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'],
    onCompleted: ({ deletePigRun }) => {
      const { error } = deletePigRun || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

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

  const addRecord = () => {
    addPigRun();
  }

  const deleteRecord = (id: string) => {
    deletePigRun({ variables: { id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const pigRunHeader = [
    { label: 'Pig Type' },
    { label: 'Date In' },
    { label: 'Date Out' },
    { label: 'Operator' },
    { label: 'Isolation Valve Function Test' },
    { label: 'Pig Sender/ Receiver Insp.' },
    { label: 'Comment' },
    { label: 'Created By' },
    { label: 'Created At' },
    { label: 'Updated By' },
    { label: 'Updated At' },
    { label: 'ID' },
  ];

  return (
    <div className='pig-run'>
      {(role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') && <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
          aria-label='add row' size='small' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>}
      {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {pigRunHeader.map(({ label }, gridColumn) => {
        gridColumn += 2;
        return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
      })}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.pigRunsByPipelineId?.map((pigRun, gridRow) => {
        const isLastRow = data.pigRunsByPipelineId?.length === gridRow + 1;
        gridRow += 2;
        if (pigRun) {
          const { id, pigType, dateIn, dateOut, operator, isolationValveFunctionTest, pigSenderReceiverInspection, comment, createdBy, createdAt, updatedBy, updatedAt } = pigRun;
          const authorized = role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdBy.id === userId);
          const pigRunColumns: IRecordEntryMap[] = [
            { columnName: 'pigType', columnType: 'string', nullable: true, record: pigType, validator: pigTypeEnum, editRecord },
            { columnName: 'dateIn', columnType: 'date', nullable: false, record: dateIn, editRecord },
            { columnName: 'dateOut', columnType: 'date', nullable: true, record: dateOut, editRecord },
            { columnName: 'operator', columnType: 'string', nullable: true, record: operator?.email },
            { columnName: 'isolationValveFunctionTest', columnType: 'string', nullable: true, record: isolationValveFunctionTest, validator: pigInspectionEnum, editRecord },
            { columnName: 'pigSenderReceiverInspection', columnType: 'string', nullable: true, record: pigSenderReceiverInspection, validator: pigInspectionEnum, editRecord },
            { columnName: 'comment', columnType: 'string', nullable: true, record: comment, editRecord },
            { columnName: 'createdBy', columnType: 'string', nullable: false, record: createdBy.email },
            { columnName: 'createdAt', columnType: 'date', nullable: false, record: createdAt },
            { columnName: 'updatedBy', columnType: 'string', nullable: false, record: updatedBy.email },
            { columnName: 'updatedAt', columnType: 'date', nullable: false, record: updatedAt },
            { columnName: 'id', columnType: 'string', nullable: false, record: id },
          ];
          return (
            <Fragment key={id}>
              {authorized && <div className={`pig-run-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
                  aria-label='delete row' size='small' onClick={() => deleteRecord(id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>}
              {pigRunColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='pig-run-row' style={{ gridColumn, gridRow }}>
                    <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                  </div>
                );
              })}
            </Fragment>
          );
        }
      })}
    </div>
  );
}
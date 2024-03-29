import { useState, Fragment } from 'react';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IRecordEntryMap } from './LicenseChanges';
import { openModal } from './RenderPipeline';
import { IValidatorsPigRuns } from './PipelineData';

import {
  usePigRunsByPipelineIdQuery,
  useEditPigRunMutation,
  useAddPigRunMutation,
  useDeletePigRunMutation,
  PigRunsByPipelineIdDocument,
} from '../../graphql/generated/graphql';


export interface IPigRunsProps {
  pipelineId: string;
  validators?: IValidatorsPigRuns;
}

export default function PigRuns({ pipelineId, validators }: IPigRunsProps) {

  const { data, loading, error } = usePigRunsByPipelineIdQuery({ variables: { pipelineId } });
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
  const [confirmDeletePigRunModal, setConfirmDeletePigRunModal] = useState(false);
  const [toDeletePigRun, setToDeletePigRun] = useState({ id: '', friendlyName: '' });


  const { pigTypeEnum, pigInspectionEnum, operatorEnum } = validators || {};

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
        case 'boolean':
          if (newRecord === 'true') {
            return true;
          }
          if (newRecord === 'false') {
            return false;
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

  const deleteRecord = () => {
    setConfirmDeletePigRunModal(false);
    deletePigRun({ variables: { id: toDeletePigRun.id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

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
      <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          className='button-container'
          aria-label='add row' size='small' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
      {confirmDeletePigRunModal && <ModalFieldError
        fieldError={{ field: 'Pig Run', message: `Are you sure you want to delete pig run from ${toDeletePigRun.friendlyName}?` }}
        hideFieldError={() => setConfirmDeletePigRunModal(false)}
        executeFunction={deleteRecord}
      />}
      {isModalOpen && <ModalFieldError
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
          const { id, pigTypeId, dateIn, dateOut, operatorId, isolationValveFunctionTest, pigSenderReceiverInspection, comment, createdBy, createdAt, updatedBy, updatedAt, authorized } = pigRun;
          const pigRunColumns: IRecordEntryMap[] = [
            { columnName: 'pigTypeId', columnType: 'string', nullable: true, record: pigTypeId, validator: pigTypeEnum, editRecord },
            { columnName: 'dateIn', columnType: 'date', nullable: false, record: dateIn, editRecord },
            { columnName: 'dateOut', columnType: 'date', nullable: true, record: dateOut, editRecord },
            { columnName: 'operatorId', columnType: 'string', nullable: true, record: operatorId, validator: operatorEnum, editRecord },
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
              <div className={`pig-run-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  className='button-container'
                  aria-label='delete row' size='small' title='Delete pig run' disabled={!authorized} onClick={() => {
                    setToDeletePigRun({ id, friendlyName: dateIn.split('T')[0] });
                    setConfirmDeletePigRunModal(true);
                  }}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
              {pigRunColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='pig-run-row' style={{ gridColumn, gridRow }}>
                    <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
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
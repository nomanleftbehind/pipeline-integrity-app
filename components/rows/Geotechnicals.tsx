import { useState, Fragment } from 'react';
import {
  useGeotechnicalsByPipelineIdQuery,
  useEditGeotechnicalMutation,
  useAddGeotechnicalMutation,
  useDeleteGeotechnicalMutation,
  GeotechnicalsByPipelineIdDocument,
} from '../../graphql/generated/graphql';

import RecordEntry, { IEditRecord, IRecordEntryProps } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { openModal } from './RenderPipeline';
import { IValidatorsGeotechnicals } from './PipelineData';

export type IRecordEntryMap = Omit<IRecordEntryProps, 'id' | 'createdById' | 'authorized'>;

interface IGeotechnicalProps {
  pipelineId: string;
  validators?: IValidatorsGeotechnicals;
}

export default function Geotechnicals({ pipelineId, validators }: IGeotechnicalProps) {

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);
  const [confirmDeleteGeotechnicalModal, setConfirmDeleteGeotechnicalModal] = useState(false);
  const [toDeleteGeotechnical, setToDeleteGeotechnical] = useState({ id: '', friendlyName: '' });


  const { data, loading, error } = useGeotechnicalsByPipelineIdQuery({ variables: { pipelineId } });
  const [editGeotechnical] = useEditGeotechnicalMutation({
    refetchQueries: [GeotechnicalsByPipelineIdDocument, 'GeotechnicalsByPipelineId'],
    onCompleted: ({ editGeotechnical }) => {
      const { error } = editGeotechnical || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addGeotechnical] = useAddGeotechnicalMutation({
    variables: { pipelineId },
    refetchQueries: [GeotechnicalsByPipelineIdDocument, 'GeotechnicalsByPipelineId'],
    onCompleted: ({ addGeotechnical }) => {
      const { error } = addGeotechnical || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deleteGeotechnical] = useDeleteGeotechnicalMutation({
    refetchQueries: [GeotechnicalsByPipelineIdDocument, 'GeotechnicalsByPipelineId'],
    onCompleted: ({ deleteGeotechnical }) => {
      const { error } = deleteGeotechnical || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const { geotechnicalFacingEnum } = validators || {};

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
    editGeotechnical({ variables: { data: { id, [columnName]: newRecord } } });
  }

  const addRecord = () => {
    addGeotechnical();
  }

  const deleteRecord = () => {
    setConfirmDeleteGeotechnicalModal(false);
    deleteGeotechnical({ variables: { id: toDeleteGeotechnical.id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const geotechnicalHeader = [
    { label: 'Date Slope Checked' },
    { label: 'Slope Angle S1' },
    { label: 'Facing S1' },
    { label: 'Height S1' },
    { label: 'Slope Angle S2' },
    { label: 'Facing S2' },
    { label: 'Height S2' },
    { label: 'Comment' },
    { label: 'Created By' },
    { label: 'Created At' },
    { label: 'Updated By' },
    { label: 'Updated At' },
    { label: 'ID' },
  ];

  return (
    <div className='geotechnical'>
      <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          className='button-container'
          aria-label='add row' size='small' title='Add geotechnical parameter' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
      {confirmDeleteGeotechnicalModal && <ModalFieldError
        fieldError={{ field: 'Geotechnical Parameter', message: `Are you sure you want to delete geotechnical parameter${toDeleteGeotechnical.friendlyName ? ` from ${toDeleteGeotechnical.friendlyName}` : ''}?` }}
        hideFieldError={() => setConfirmDeleteGeotechnicalModal(false)}
        executeFunction={deleteRecord}
      />}
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {geotechnicalHeader.map(({ label }, gridColumn) => {
        gridColumn += 2;
        return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
      })}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.geotechnicalsByPipelineId?.map((geotechnical, gridRow) => {
        const isLastRow = data.geotechnicalsByPipelineId?.length === gridRow + 1;
        gridRow += 2;
        if (geotechnical) {
          const { id, slopeAngleS1, facingS1, heightS1, slopeAngleS2, facingS2, heightS2, dateSlopeChecked, comment, createdBy, createdAt, updatedBy, updatedAt, authorized } = geotechnical;
          const geotechnicalColumns: IRecordEntryMap[] = [
            { columnName: 'dateSlopeChecked', columnType: 'date', nullable: true, record: dateSlopeChecked, editRecord },
            { columnName: 'slopeAngleS1', columnType: 'number', nullable: true, record: slopeAngleS1, editRecord },
            { columnName: 'facingS1', columnType: 'string', nullable: true, record: facingS1, validator: geotechnicalFacingEnum, editRecord },
            { columnName: 'heightS1', columnType: 'number', nullable: true, record: heightS1, editRecord },
            { columnName: 'slopeAngleS2', columnType: 'number', nullable: true, record: slopeAngleS2, editRecord },
            { columnName: 'facingS2', columnType: 'string', nullable: true, record: facingS2, validator: geotechnicalFacingEnum, editRecord },
            { columnName: 'heightS2', columnType: 'number', nullable: true, record: heightS2, editRecord },
            { columnName: 'comment', columnType: 'string', nullable: true, record: comment, editRecord },
            { columnName: 'createdBy', columnType: 'string', nullable: false, record: createdBy.email },
            { columnName: 'createdAt', columnType: 'date', nullable: false, record: createdAt },
            { columnName: 'updatedBy', columnType: 'string', nullable: false, record: updatedBy.email },
            { columnName: 'updatedAt', columnType: 'date', nullable: false, record: updatedAt },
            { columnName: 'id', columnType: 'string', nullable: false, record: id },
          ];
          return (
            <Fragment key={id}>
              <div className={`geotechnical-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  className='button-container'
                  aria-label='delete row' size='small' title='Delete geotechnical parameter' disabled={!authorized}
                  onClick={() => {
                    setToDeleteGeotechnical({ id, friendlyName: dateSlopeChecked?.split('T')[0] || '' });
                    setConfirmDeleteGeotechnicalModal(true);
                  }}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
              {geotechnicalColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='geotechnical-row' style={{ gridColumn, gridRow }}>
                    <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                  </div>
                );
              })}
            </Fragment>
          )
        }
      })}
    </div>
  );
}
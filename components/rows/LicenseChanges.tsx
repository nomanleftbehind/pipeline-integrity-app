import { useState, Fragment } from 'react';
import {
  useLicenseChangesByPipelineIdQuery,
  useValidatorsLicenseChangeQuery,
  useEditLicenseChangeMutation,
  useAddLicenseChangeMutation,
  useDeleteLicenseChangeMutation,
  LicenseChangesByPipelineIdDocument,
  PipelinesByIdDocument,
  RiskByIdDocument,
} from '../../graphql/generated/graphql';

import RecordEntry, { IEditRecord, IRecordEntryProps } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { openModal } from './RenderPipeline';
import { IValidatorsLicenseChanges } from './PipelineData';

export type IRecordEntryMap = Omit<IRecordEntryProps, 'id' | 'createdById' | 'authorized'>;

interface ILicenseChangesProps {
  pipelineId: string;
  validators?: IValidatorsLicenseChanges;
}

export default function LicenseChanges({ pipelineId, validators }: ILicenseChangesProps) {

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const { data, loading, error } = useLicenseChangesByPipelineIdQuery({ variables: { pipelineId } });
  const [editLicenseChange] = useEditLicenseChangeMutation({
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'pipelinesById', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ editLicenseChange }) => {
      const { error } = editLicenseChange || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addLicenseChange] = useAddLicenseChangeMutation({
    variables: { pipelineId },
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'pipelinesById', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ addLicenseChange }) => {
      const { error } = addLicenseChange || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deleteLicenseChange] = useDeleteLicenseChangeMutation({
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'pipelinesById', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ deleteLicenseChange }) => {
      const { error } = deleteLicenseChange || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const { statusEnum, substanceEnum } = validators || {};

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
    editLicenseChange({ variables: { id, [columnName]: newRecord } });
  }

  const addRecord = () => {
    addLicenseChange();
  }

  const deleteRecord = (id: string) => {
    deleteLicenseChange({ variables: { id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const licenseChangeHeader = [
    { label: 'Date' },
    { label: 'Status' },
    { label: 'Substance' },
    { label: 'Link To Documentation' },
    { label: 'Comment' },
    { label: 'Created By' },
    { label: 'Created At' },
    { label: 'Updated By' },
    { label: 'Updated At' },
    { label: 'ID' },
  ];

  return (
    <div className='license-change'>
      <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          className='button-container'
          aria-label='add row' size='small' title='Add license change' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {licenseChangeHeader.map(({ label }, gridColumn) => {
        gridColumn += 2;
        return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
      })}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.licenseChangesByPipelineId?.map((licenseChange, gridRow) => {
        const isLastRow = data.licenseChangesByPipelineId?.length === gridRow + 1;
        gridRow += 2;
        if (licenseChange) {
          const { id, date, status, substance, linkToDocumentation, comment, createdBy, createdAt, updatedBy, updatedAt, authorized } = licenseChange;
          const licenseChangeColumns: IRecordEntryMap[] = [
            { columnName: 'date', columnType: 'date', nullable: false, record: date, editRecord },
            { columnName: 'status', columnType: 'string', nullable: false, record: status, validator: statusEnum, editRecord },
            { columnName: 'substance', columnType: 'string', nullable: false, record: substance, validator: substanceEnum, editRecord },
            { columnName: 'linkToDocumentation', columnType: 'link', nullable: true, record: linkToDocumentation, editRecord },
            { columnName: 'comment', columnType: 'string', nullable: true, record: comment, editRecord },
            { columnName: 'createdBy', columnType: 'string', nullable: false, record: createdBy.email },
            { columnName: 'createdAt', columnType: 'date', nullable: false, record: createdAt },
            { columnName: 'updatedBy', columnType: 'string', nullable: false, record: updatedBy.email },
            { columnName: 'updatedAt', columnType: 'date', nullable: false, record: updatedAt },
            { columnName: 'id', columnType: 'string', nullable: false, record: id },
          ];
          return (
            <Fragment key={id}>
              <div className={`license-change-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  className='button-container'
                  aria-label='delete row' size='small' title='Delete license change' disabled={!authorized} onClick={() => deleteRecord(id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
              {licenseChangeColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='license-change-row' style={{ gridColumn, gridRow }}>
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
import { useState, Fragment } from 'react';
import {
  useLicenseChangesByPipelineIdQuery,
  useEditLicenseChangeMutation,
  useAddLicenseChangeMutation,
  useDeleteLicenseChangeMutation,
  LicenseChangesByPipelineIdDocument,
  PipelinesByIdDocument,
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
  const [confirmDeleteLicenseChangeModal, setConfirmDeleteLicenseChangeModal] = useState(false);
  const [toDeleteLicenseChange, setToDeleteLicenseChange] = useState({ id: '', friendlyName: '' });

  const { data, loading, error } = useLicenseChangesByPipelineIdQuery({ variables: { pipelineId } });
  const [editLicenseChange] = useEditLicenseChangeMutation({
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'PipelinesById'/*, RiskByIdDocument, 'RiskById'*/],
    onCompleted: ({ editLicenseChange }) => {
      const { error } = editLicenseChange || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addLicenseChange] = useAddLicenseChangeMutation({
    variables: { pipelineId },
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'PipelinesById'/*, RiskByIdDocument, 'RiskById'*/],
    onCompleted: ({ addLicenseChange }) => {
      const { error } = addLicenseChange || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deleteLicenseChange] = useDeleteLicenseChangeMutation({
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'PipelinesById'/*, RiskByIdDocument, 'RiskById'*/],
    onCompleted: ({ deleteLicenseChange }) => {
      const { error } = deleteLicenseChange || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const { statusEnum, substanceEnum, fromToMatchPattern, fromToFeatureEnum, lengthMatchPattern, pipelineTypeEnum, gradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum, } = validators || {};

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

  const deleteRecord = () => {
    setConfirmDeleteLicenseChangeModal(false);
    deleteLicenseChange({ variables: { id: toDeleteLicenseChange.id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const licenseChangeHeader = [
    { label: 'Date' },
    { label: 'Status' },
    { label: 'Substance' },
    { label: 'From' },
    { label: 'From Feature' },
    { label: 'To' },
    { label: 'To Feature' },
    { label: 'Length (km)' },
    { label: 'Type' },
    { label: 'Grade' },
    { label: 'Yield Strength (Mpa)' },
    { label: 'Outside Diameter (mm)' },
    { label: 'Wall Thickness (mm)' },
    { label: 'Material' },
    { label: 'MOP (kPa)' },
    { label: 'Internal Protection' },
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
      {confirmDeleteLicenseChangeModal && <ModalFieldError
        fieldError={{ field: 'License Change', message: `Are you sure you want to delete license change from ${toDeleteLicenseChange.friendlyName}?` }}
        hideFieldError={() => setConfirmDeleteLicenseChangeModal(false)}
        executeFunction={deleteRecord}
      />}
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
          const { id, date, statusId, substanceId, from, fromFeatureId, to, toFeatureId, length, pipelineTypeId, gradeId, yieldStrength, outsideDiameter,
            wallThickness, materialId, mop, internalProtectionId, linkToDocumentation, comment, createdBy, createdAt, updatedBy, updatedAt, authorized, } = licenseChange;
          const licenseChangeColumns: IRecordEntryMap[] = [
            { columnName: 'date', columnType: 'date', nullable: false, record: date, editRecord },
            { columnName: 'statusId', columnType: 'string', nullable: false, record: statusId, validator: statusEnum, editRecord },
            { columnName: 'substanceId', columnType: 'string', nullable: false, record: substanceId, validator: substanceEnum, editRecord },
            { columnName: 'from', columnType: 'string', nullable: false, record: from, validator: fromToMatchPattern, editRecord },
            { columnName: 'fromFeatureId', columnType: 'string', nullable: true, record: fromFeatureId, validator: fromToFeatureEnum, editRecord },
            { columnName: 'to', columnType: 'string', nullable: false, record: to, validator: fromToMatchPattern, editRecord },
            { columnName: 'toFeatureId', columnType: 'string', nullable: true, record: toFeatureId, validator: fromToFeatureEnum, editRecord },
            { columnName: 'length', record: length, columnType: 'number', nullable: false, validator: lengthMatchPattern, editRecord },
            { columnName: 'pipelineTypeId', record: pipelineTypeId, columnType: 'string', nullable: true, validator: pipelineTypeEnum, editRecord },
            { columnName: 'gradeId', record: gradeId, columnType: 'string', nullable: true, validator: gradeEnum, editRecord },
            { columnName: 'yieldStrength', record: yieldStrength, columnType: 'number', nullable: true, validator: yieldStrengthMatchPattern, editRecord },
            { columnName: 'outsideDiameter', record: outsideDiameter, columnType: 'number', nullable: true, validator: outsideDiameterMatchPattern, editRecord },
            { columnName: 'wallThickness', record: wallThickness, columnType: 'number', nullable: true, validator: wallThicknessMatchPattern, editRecord },
            { columnName: 'materialId', record: materialId, columnType: 'string', nullable: true, validator: materialEnum, editRecord },
            { columnName: 'mop', record: mop, columnType: 'number', nullable: true, validator: mopMatchPattern, editRecord },
            { columnName: 'internalProtectionId', record: internalProtectionId, columnType: 'string', nullable: true, validator: internalProtectionEnum, editRecord },
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
                  aria-label='delete row' size='small' title='Delete license change' disabled={!authorized}
                  onClick={() => {
                    setToDeleteLicenseChange({ id, friendlyName: date.split('T')[0] });
                    setConfirmDeleteLicenseChangeModal(true);
                  }}>
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
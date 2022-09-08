import { useState, Fragment } from 'react';
import {
  useCathodicSurveysByPipelineIdQuery,
  useEditCathodicSurveyMutation,
  useAddCathodicSurveyMutation,
  useDeleteCathodicSurveyMutation,
  CathodicSurveysByPipelineIdDocument,
  PipelinesByIdDocument,
} from '../../graphql/generated/graphql';

import RecordEntry, { IEditRecord, IRecordEntryProps } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { openModal } from './RenderPipeline';
import { IValidatorsCathodicSurveys } from './PipelineData';

export type IRecordEntryMap = Omit<IRecordEntryProps, 'id' | 'createdById' | 'authorized'>;

interface ICathodicSurveysProps {
  pipelineId: string;
  validators?: IValidatorsCathodicSurveys;
}

export default function CathodicSurveys({ pipelineId, validators }: ICathodicSurveysProps) {

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);
  const [confirmDeleteCathodicSurveyModal, setConfirmDeleteCathodicSurveyModal] = useState(false);
  const [toDeleteCathodicSurvey, setToDeleteCathodicSurvey] = useState({ id: '', friendlyName: '' });

  const { data, loading, error } = useCathodicSurveysByPipelineIdQuery({ variables: { pipelineId } });
  const [editCathodicSurvey] = useEditCathodicSurveyMutation({
    refetchQueries: [CathodicSurveysByPipelineIdDocument, 'CathodicSurveysByPipelineId', PipelinesByIdDocument, 'PipelinesById'/*, RiskByIdDocument, 'RiskById'*/],
    onCompleted: ({ editCathodicSurvey }) => {
      const { error } = editCathodicSurvey || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addCathodicSurvey] = useAddCathodicSurveyMutation({
    variables: { pipelineId },
    refetchQueries: [CathodicSurveysByPipelineIdDocument, 'CathodicSurveysByPipelineId', PipelinesByIdDocument, 'PipelinesById'/*, RiskByIdDocument, 'RiskById'*/],
    onCompleted: ({ addCathodicSurvey }) => {
      const { error } = addCathodicSurvey || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deleteCathodicSurvey] = useDeleteCathodicSurveyMutation({
    refetchQueries: [CathodicSurveysByPipelineIdDocument, 'CathodicSurveysByPipelineId', PipelinesByIdDocument, 'PipelinesById'/*, RiskByIdDocument, 'RiskById'*/],
    onCompleted: ({ deleteCathodicSurvey }) => {
      const { error } = deleteCathodicSurvey || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const { companyEnum } = validators || {};

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
    editCathodicSurvey({ variables: { data: { id, [columnName]: newRecord } } });
  }

  const addRecord = () => {
    addCathodicSurvey();
  }

  const deleteRecord = () => {
    setConfirmDeleteCathodicSurveyModal(false);
    deleteCathodicSurvey({ variables: { id: toDeleteCathodicSurvey.id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const cathodicSurveyHeader = [
    { label: 'Date' },
    { label: 'Cathodic Company' },
    { label: 'Deficiencies' },
    { label: 'Correction Date' },
    { label: 'Comment' },
    { label: 'Created By' },
    { label: 'Created At' },
    { label: 'Updated By' },
    { label: 'Updated At' },
    { label: 'ID' },
  ];

  return (
    <div className='cathodic-survey'>
      <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          className='button-container'
          aria-label='add row' size='small' title='Add cathodic survey' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
      {confirmDeleteCathodicSurveyModal && <ModalFieldError
        fieldError={{ field: 'Cathodic Survey', message: `Are you sure you want to delete cathodic survey from ${toDeleteCathodicSurvey.friendlyName}?` }}
        hideFieldError={() => setConfirmDeleteCathodicSurveyModal(false)}
        executeFunction={deleteRecord}
      />}
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {cathodicSurveyHeader.map(({ label }, gridColumn) => {
        gridColumn += 2;
        return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
      })}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.cathodicSurveysByPipelineId?.map((cathodicSurvey, gridRow) => {
        const isLastRow = data.cathodicSurveysByPipelineId?.length === gridRow + 1;
        gridRow += 2;
        if (cathodicSurvey) {
          const { id, date, companyId, deficiencies, correctionDate, comment, createdBy, createdAt, updatedBy, updatedAt, authorized } = cathodicSurvey;
          const cathodicSurveyColumns: IRecordEntryMap[] = [
            { columnName: 'date', columnType: 'date', nullable: false, record: date, editRecord },
            { columnName: 'companyId', columnType: 'string', nullable: true, record: companyId, validator: companyEnum, editRecord },
            { columnName: 'deficiencies', columnType: 'boolean', nullable: true, record: deficiencies, editRecord },
            { columnName: 'correctionDate', columnType: 'date', nullable: true, record: correctionDate, editRecord },
            { columnName: 'comment', columnType: 'string', nullable: true, record: comment, editRecord },
            { columnName: 'createdBy', columnType: 'string', nullable: false, record: createdBy.email },
            { columnName: 'createdAt', columnType: 'date', nullable: false, record: createdAt },
            { columnName: 'updatedBy', columnType: 'string', nullable: false, record: updatedBy.email },
            { columnName: 'updatedAt', columnType: 'date', nullable: false, record: updatedAt },
            { columnName: 'id', columnType: 'string', nullable: false, record: id },
          ];
          return (
            <Fragment key={id}>
              <div className={`cathodic-survey-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  className='button-container'
                  aria-label='delete row' size='small' title='Delete cathodic survey' disabled={!authorized}
                  onClick={() => {
                    setToDeleteCathodicSurvey({ id, friendlyName: date.split('T')[0] });
                    setConfirmDeleteCathodicSurveyModal(true);
                  }}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
              {cathodicSurveyColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='cathodic-survey-row' style={{ gridColumn, gridRow }}>
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
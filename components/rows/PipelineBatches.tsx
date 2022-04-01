import { useState, Fragment } from 'react';
import {
  usePipelineBatchesByPipelineIdQuery,
  useValidatorsBatchProductQuery,
  useEditPipelineBatchMutation,
  useAddPipelineBatchMutation,
  useDeletePipelineBatchMutation,
  PipelineBatchesByPipelineIdDocument,
} from '../../graphql/generated/graphql';

import RecordEntry, { IEditRecord, IRecordEntryProps } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type IRecordEntryMap = Omit<IRecordEntryProps, 'id' | 'createdById' | 'authorized'>;

interface IPipelineBatchesProps {
  pipelineId: string;
}

export default function PipelineBatches({ pipelineId }: IPipelineBatchesProps) {
  const { data, loading, error } = usePipelineBatchesByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataValidators } = useValidatorsBatchProductQuery();
  const [editPipelineBatch] = useEditPipelineBatchMutation({
    refetchQueries: [PipelineBatchesByPipelineIdDocument, 'PipelineBatchesByPipelineId'],
    onCompleted: ({ editPipelineBatch }) => {
      const { error } = editPipelineBatch || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addPipelineBatch] = useAddPipelineBatchMutation({
    variables: { pipelineId },
    refetchQueries: [PipelineBatchesByPipelineIdDocument, 'PipelineBatchesByPipelineId'],
    onCompleted: ({ addPipelineBatch }) => {
      const { error } = addPipelineBatch || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deletePipelineBatch] = useDeletePipelineBatchMutation({
    refetchQueries: [PipelineBatchesByPipelineIdDocument, 'PipelineBatchesByPipelineId'],
    onCompleted: ({ deletePipelineBatch }) => {
      const { error } = deletePipelineBatch || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const { solubilityEnum } = dataValidators?.validators || {};

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
    editPipelineBatch({ variables: { id, [columnName]: newRecord } });
  }

  const addRecord = () => {
    addPipelineBatch();
  }

  const deleteRecord = (id: string) => {
    deletePipelineBatch({ variables: { id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const pipelineBatchHeader = [
    { label: 'Date' },
    { label: 'Product' },
    { label: 'Solubility' },
    { label: 'Cost ($/L)' },
    { label: 'Chemical Volume (L)' },
    { label: 'Diluent Volume (L)' },
    { label: 'Comment' },
    { label: 'Created By' },
    { label: 'Created At' },
    { label: 'Updated By' },
    { label: 'Updated At' },
    { label: 'ID' },
  ];

  return (
    <div className='pipeline-batch'>
      <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          className='button-container'
          aria-label='add row' size='small' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
      {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {pipelineBatchHeader.map(({ label }, gridColumn) => {
        gridColumn += 2;
        return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
      })}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.pipelineBatchesByPipelineId?.map((pipelineBatch, gridRow) => {
        const isLastRow = data.pipelineBatchesByPipelineId?.length === gridRow + 1;
        gridRow += 2;
        if (pipelineBatch) {
          const { id, date, product, cost, chemicalVolume, diluentVolume, comment, createdBy, createdAt, updatedBy, updatedAt, authorized } = pipelineBatch;
          const pipelineBatchColumns: IRecordEntryMap[] = [
            { columnName: 'date', columnType: 'date', nullable: false, record: date, editRecord },
            { columnName: 'product', columnType: 'string', nullable: false, record: product.product, editRecord },
            { columnName: 'solubility', columnType: 'string', nullable: false, record: product.solubility, validator: solubilityEnum },
            { columnName: 'cost', columnType: 'number', nullable: true, record: cost, editRecord },
            { columnName: 'chemicalVolume', columnType: 'number', nullable: true, record: chemicalVolume, editRecord },
            { columnName: 'diluentVolume', columnType: 'number', nullable: true, record: diluentVolume, editRecord },
            { columnName: 'comment', columnType: 'string', nullable: true, record: comment, editRecord },
            { columnName: 'createdBy', columnType: 'string', nullable: false, record: createdBy.email },
            { columnName: 'createdAt', columnType: 'date', nullable: false, record: createdAt },
            { columnName: 'updatedBy', columnType: 'string', nullable: false, record: updatedBy.email },
            { columnName: 'updatedAt', columnType: 'date', nullable: false, record: updatedAt },
            { columnName: 'id', columnType: 'string', nullable: false, record: id },
          ];
          return (
            <Fragment key={id}>
              <div className={`pipeline-batch-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  className='button-container'
                  aria-label='delete row' size='small' onClick={() => deleteRecord(id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
              {pipelineBatchColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='pipeline-batch-row' style={{ gridColumn, gridRow }}>
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
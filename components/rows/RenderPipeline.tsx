import { useState } from 'react';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import PipelineData from './PipelineData';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEditPipelineMutation, useDeletePipelineMutation, PipelinesByIdDocument, useDuplicatePipelineMutation, PipelinesByIdQuery, ValidatorsPipelineQuery, RiskByIdDocument } from '../../graphql/generated/graphql';
import { IRecordEntryMap } from './LicenseChanges';

export type IInferFromArray<T> = T extends (infer U)[] ? NonNullable<U> : never;

export type IPipeline = IInferFromArray<NonNullable<PipelinesByIdQuery['pipelinesById']['pipelines']>>;

export type IValidators = ValidatorsPipelineQuery['validatorsPipeline'];

type IFieldError = {
  field: string;
  message: string;
}

export const openModal = ({ field, message }: IFieldError) => {
  return field !== '' && message !== '';
}

interface IRenderPipelineProps {
  gridRow: number;
  rowIsEven: boolean;
  pipeline: IPipeline;
  validators?: IValidators;
}

export default function RenderPipeline({ gridRow, rowIsEven, pipeline, validators }: IRenderPipelineProps) {

  const [open, setOpen] = useState(false);
  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);
  const [confirmDeletePipelineModal, setConfirmDeletePipelineModal] = useState(false);

  const [editPipeline] = useEditPipelineMutation({
    refetchQueries: [PipelinesByIdDocument, 'PipelinesById', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ editPipeline }) => {
      const { error } = editPipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deletePipeline] = useDeletePipelineMutation({
    variables: { id: pipeline.id },
    refetchQueries: [PipelinesByIdDocument, 'PipelinesById'],
    onCompleted: ({ deletePipeline }) => {
      const { error } = deletePipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [duplicatePipeline] = useDuplicatePipelineMutation({
    variables: { id: pipeline.id },
    refetchQueries: [PipelinesByIdDocument, 'PipelinesById'],
    onCompleted: ({ duplicatePipeline }) => {
      const { error } = duplicatePipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });


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
    editPipeline({ variables: { id, [columnName]: newRecord } });
  }

  const deleteRecord = () => {
    setConfirmDeletePipelineModal(false);
    deletePipeline();
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const { id, license, segment, currentFrom, currentFromFeature, currentTo, currentToFeature, currentStatus, currentSubstance, authorized, } = pipeline;
  const { licenseMatchPattern, segmentMatchPattern } = validators || {};

  const pipelineColumns: IRecordEntryMap[] = [
    { columnName: 'license', columnType: 'string', nullable: false, record: license, validator: licenseMatchPattern, editRecord },
    { columnName: 'segment', columnType: 'string', nullable: false, record: segment, validator: segmentMatchPattern, editRecord },
    { columnName: 'currentFrom', columnType: 'string', nullable: true, record: currentFrom },
    { columnName: 'currentFromFeature', columnType: 'string', nullable: true, record: currentFromFeature },
    { columnName: 'currentTo', columnType: 'string', nullable: true, record: currentTo },
    { columnName: 'currentToFeature', columnType: 'string', nullable: true, record: currentToFeature },
    { columnName: 'currentStatus', columnType: 'string', nullable: true, record: currentStatus, },
    { columnName: 'currentSubstance', columnType: 'string', nullable: true, record: currentSubstance, },
  ];

  const backgroundColor = rowIsEven ? '#abeaff' : '#fff7c9';

  return (
    <>
      {confirmDeletePipelineModal && <ModalFieldError
        fieldError={{ field: 'Pipeline', message: `Are you sure you want to delete "${license}-${segment}" pipeline? This will delete all License Changes, Pig Runs, Pressure Tests, Pipeline Batches, Geotechnical Parameters, Risk and Chemical section associated with the pipeline!` }}
        hideFieldError={() => setConfirmDeletePipelineModal(false)}
        executeFunction={deleteRecord}
      />}
      <div className='pipeline-row' style={{ gridColumn: 1, gridRow, backgroundColor }}>
        <IconButton className='button-container' aria-label='expand row' size='small' title={open ? 'Collapse pipeline row' : 'Expand pipeline row'} onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <div className='pipeline-row' style={{ gridColumn: 2, gridRow, backgroundColor }}>
        {<IconButton className='button-container' aria-label='delete row' size='small' title='Delete pipeline' disabled={!authorized} onClick={() => setConfirmDeletePipelineModal(true)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>}
      </div>
      <div className='pipeline-row' style={{ gridColumn: 3, gridRow, backgroundColor }}>
        {<IconButton className='button-container' aria-label='add row' size='small' title='Create a copy of pipeline' disabled={!authorized} onClick={() => duplicatePipeline()}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>}
      </div>
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {pipelineColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
        gridColumn += 4;
        return (
          <div key={gridColumn} className='pipeline-row' style={{ gridColumn, gridRow, backgroundColor }}>
            <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
          </div>
        );
      })}
      <div className='pipeline-row' style={{ gridColumn: 12, gridRow, backgroundColor }}></div>
      <PipelineData
        key={`${id} data`}
        gridRow={gridRow}
        rowIsEven={rowIsEven}
        open={open}
        pipeline={pipeline}
        validators={validators}
        editPipeline={editRecord}
      />
    </>
  );
}
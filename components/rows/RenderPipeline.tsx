import { useState } from 'react';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError, ModalDeletePipeline } from '../Modal';
import PipelineData from './PipelineData';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEditPipelineMutation, useDeletePipelineMutation, PipelinesByIdQueryDocument, useDuplicatePipelineMutation, PipelinesByIdQueryQuery, GetValidatorsQuery, ValidatorsPipelineQuery } from '../../graphql/generated/graphql';
import { IRecordEntryMap } from './LicenseChanges';

export type IPipeline = PipelinesByIdQueryQuery['pipelinesById'] extends (infer U)[] | null | undefined ? NonNullable<U> : never;
export type IValidators = GetValidatorsQuery['validators'];

type IValidatorsPipeline = ValidatorsPipelineQuery['validators']

interface IRenderPipelineProps {
  gridRow: number;
  pipeline: IPipeline;
  validators: IValidatorsPipeline;
  authorized: boolean;
}

const isEven = (value: number): 'even' | 'odd' => {
  if (value % 2 === 0)
    return 'even';
  else return 'odd';
}

export default function RenderPipeline({ gridRow, pipeline, validators, authorized }: IRenderPipelineProps) {

  const [open, setOpen] = useState(false);
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState(false);

  const [editPipeline] = useEditPipelineMutation({
    refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'],
    onCompleted: ({ editPipeline }) => {
      const { error } = editPipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deletePipeline] = useDeletePipelineMutation({
    variables: { id: pipeline.id },
    refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'],
    onCompleted: ({ deletePipeline }) => {
      const { error } = deletePipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [duplicatePipeline] = useDuplicatePipelineMutation({
    variables: { id: pipeline.id },
    refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'],
    onCompleted: ({ duplicatePipeline }) => {
      const { error } = duplicatePipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });


  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

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

  function showModalDeletePipeline() {
    setShowDeletePipelineModal(true);
  }

  function hideModalDeletePipeline() {
    setShowDeletePipelineModal(false);
  }

  function handleDeletePipeline() {
    deletePipeline();
    setShowDeletePipelineModal(false);
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const { id, license, segment, from, fromFeature, to, toFeature, currentStatus, currentSubstance, createdBy } = pipeline;
  const { licenseMatchPattern, segmentMatchPattern, fromToMatchPattern, fromToFeatureEnum, statusEnum, substanceEnum } = validators || {};

  const pipelineColumns: IRecordEntryMap[] = [
    { columnName: 'license', columnType: 'string', nullable: false, record: license, validator: licenseMatchPattern, editRecord },
    { columnName: 'segment', columnType: 'string', nullable: false, record: segment, validator: segmentMatchPattern, editRecord },
    { columnName: 'from', columnType: 'string', nullable: false, record: from, validator: fromToMatchPattern, editRecord },
    { columnName: 'fromFeature', columnType: 'string', nullable: true, record: fromFeature, validator: fromToFeatureEnum, editRecord },
    { columnName: 'to', columnType: 'string', nullable: false, record: to, validator: fromToMatchPattern, editRecord },
    { columnName: 'toFeature', columnType: 'string', nullable: true, record: toFeature, validator: fromToFeatureEnum, editRecord },
    { columnName: 'currentStatus', columnType: 'string', nullable: false, record: currentStatus, validator: statusEnum },
    { columnName: 'currentSubstance', columnType: 'string', nullable: false, record: currentSubstance, validator: substanceEnum },
  ];

  const modalDeletePipeline = showDeletePipelineModal ?
    <ModalDeletePipeline
      license={license}
      segment={segment}
      deletePipeline={handleDeletePipeline}
      hideModalDeletePipeline={hideModalDeletePipeline} /> : null;

  return (
    <>
      <div className='pipeline-row' style={{ gridColumn: 1, gridRow: gridRow }}>
        <IconButton className='button-container' aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <div className='pipeline-row' style={{ gridColumn: 2, gridRow: gridRow }}>
        {authorized && <IconButton className='button-container' aria-label='delete row' size='small' onClick={showModalDeletePipeline}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>}
      </div>
      <div className='pipeline-row' style={{ gridColumn: 3, gridRow: gridRow }}>
        {authorized && <IconButton className='button-container' aria-label='add row' size='small' onClick={() => duplicatePipeline()}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>}
      </div>
      {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {modalDeletePipeline}
      {pipelineColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
        gridColumn += 4;
        return (
          <div key={gridColumn} className='pipeline-row' style={{ gridColumn, gridRow: gridRow }}>
            <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
          </div>
        );
      })}
      <PipelineData
        gridRow={gridRow}
        key={`${id} data`}
        open={open}
        pipeline={pipeline}
        isEven={isEven(gridRow)}
      />
    </>
  );
}
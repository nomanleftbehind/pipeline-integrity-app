import { useState } from 'react';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError, ModalDeletePipeline } from '../Modal';
import PipelineData from './PipelineData';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEditPipelineMutation, useDeletePipelineMutation, PipelinesByIdDocument, useDuplicatePipelineMutation, PipelinesByIdQuery, GetValidatorsQuery, ValidatorsPipelineQuery, RiskByIdDocument } from '../../graphql/generated/graphql';
import { IRecordEntryMap } from './LicenseChanges';

export type IInferFromArray<T> = T extends (infer U)[] ? NonNullable<U> : never;

export type IPipeline = IInferFromArray<NonNullable<PipelinesByIdQuery['pipelinesById']>>;
export type IValidators = GetValidatorsQuery['validators'];

type IValidatorsPipeline = ValidatorsPipelineQuery['validators'];

type IFieldError = {
  field: string;
  message: string;
}

export const openModal = ({ field, message }: IFieldError) => {
  return field !== '' && message !== '';
}

interface IRenderPipelineProps {
  gridRow: number;
  pipeline: IPipeline;
  validators: IValidatorsPipeline;
}

const isEven = (value: number): 'even' | 'odd' => {
  if (value % 2 === 0)
    return 'even';
  else return 'odd';
}

export default function RenderPipeline({ gridRow, pipeline, validators }: IRenderPipelineProps) {

  const [open, setOpen] = useState(false);
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState(false);
  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

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

  const isModalOpen = openModal(fieldError);

  const { id, license, segment, from, fromFeature, to, toFeature, currentStatus, currentSubstance, authorized } = pipeline;
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
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {modalDeletePipeline}
      {pipelineColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
        gridColumn += 4;
        return (
          <div key={gridColumn} className='pipeline-row' style={{ gridColumn, gridRow: gridRow }}>
            <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
          </div>
        );
      })}
      <PipelineData
        gridRow={gridRow}
        key={`${id} data`}
        open={open}
        pipeline={pipeline}
        authorized={authorized}
        editPipeline={editRecord}
        isEven={isEven(gridRow)}
      />
    </>
  );
}
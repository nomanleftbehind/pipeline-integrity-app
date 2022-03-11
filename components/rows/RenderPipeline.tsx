import { useState, Fragment } from 'react';
import EntryField from '../fields/EntryField';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalDeletePipeline } from '../Modal';
import PipelineData from './PipelineData';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAuth } from '../../context/AuthContext';
import { useEditPipelineMutation, useDeletePipelineMutation, PipelinesByIdQueryDocument, useDuplicatePipelineMutation, PipelinesByIdQueryQuery, GetValidatorsQuery } from '../../graphql/generated/graphql';


export type IPipeline = PipelinesByIdQueryQuery['pipelinesById'] extends (infer U)[] | null | undefined ? NonNullable<U> : never;
export type IValidators = GetValidatorsQuery['validators'];

interface IRenderPipelineProps {
  ppl_idx: number;
  pipeline: IPipeline;
  validators: IValidators;
}

const isEven = (value: number): 'even' | 'odd' => {
  if (value % 2 === 0)
    return 'even';
  else return 'odd';
}

export default function RenderPipeline({ ppl_idx, pipeline, validators }: IRenderPipelineProps) {

  const { user } = useAuth() || {};
  const { role } = user || {};
  const authorized = role === 'ADMIN' || role === 'ENGINEER';

  const [index, setIndex] = useState(ppl_idx);
  const [open, setOpen] = useState(false);
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState(false);

  const [editPipeline] = useEditPipelineMutation({ refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
  const [deletePipeline, { data: dataDeletePipeline }] = useDeletePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
  const [duplicatePipeline, { data: dataDuplicatePipeline }] = useDuplicatePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });

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

  const { id, license, segment, from, fromFeature, to, toFeature, createdBy } = pipeline;
  const { id: createdById } = createdBy;
  const { licenseMatchPattern, segmentMatchPattern, fromToMatchPattern, fromToFeatureEnum } = validators || {};

  const modalDeletePipeline = showDeletePipelineModal ?
    <ModalDeletePipeline
      license={license}
      segment={segment}
      deletePipeline={handleDeletePipeline}
      hideModalDeletePipeline={hideModalDeletePipeline} /> : null;

  return (
    <>
      <div style={{ padding: '4px', gridColumn: 1, gridRow: ppl_idx }}>
        <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <div style={{ padding: '4px', gridColumn: 2, gridRow: ppl_idx }}>
        {role && ['ADMIN', 'ENGINEER'].includes(role) && <IconButton aria-label='delete row' size='small' onClick={showModalDeletePipeline}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>}
      </div>
      <div style={{ padding: '4px', gridColumn: 3, gridRow: ppl_idx }}>
        {role && ['ADMIN', 'ENGINEER'].includes(role) && <IconButton aria-label='add row' size='small' onClick={() => duplicatePipeline()}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>}
      </div>
      {modalDeletePipeline}
      <div style={{ padding: '4px', gridColumn: 4, gridRow: ppl_idx }}>
        <RecordEntry id={id} createdById={createdById} columnName='license' columnType='string' nullable={false} record={license} validator={licenseMatchPattern} authorized={authorized} editRecord={editRecord} />
      </div>
      <div style={{ padding: '4px', gridColumn: 5, gridRow: ppl_idx }}>
        <RecordEntry id={id} createdById={createdById} columnName='segment' columnType='string' nullable={false} record={segment} validator={segmentMatchPattern} authorized={authorized} editRecord={editRecord} />
      </div>
      <div style={{ padding: '4px', gridColumn: 6, gridRow: ppl_idx }}>
        <RecordEntry id={id} createdById={createdById} columnName='from' columnType='string' nullable={false} record={from} validator={fromToMatchPattern} authorized={authorized} editRecord={editRecord} />
      </div>
      <div style={{ padding: '4px', gridColumn: 7, gridRow: ppl_idx }}>
        <RecordEntry id={id} createdById={createdById} columnName='fromFeature' columnType='string' nullable={true} record={fromFeature} validator={fromToFeatureEnum} authorized={authorized} editRecord={editRecord} />
      </div>
      <div style={{ padding: '4px', gridColumn: 8, gridRow: ppl_idx }}>
        <RecordEntry id={id} createdById={createdById} columnName='to' columnType='string' nullable={false} record={to} validator={fromToMatchPattern} authorized={authorized} editRecord={editRecord} />
      </div>
      <div style={{ padding: '4px', gridColumn: 9, gridRow: ppl_idx }}>
        <RecordEntry id={id} createdById={createdById} columnName='toFeature' columnType='string' nullable={true} record={toFeature} validator={fromToFeatureEnum} authorized={authorized} editRecord={editRecord} />
      </div>
      <PipelineData
        ppl_idx={ppl_idx}
        key={`${id} data`}
        open={open}
        pipeline={pipeline}
        validators={validators}
        isEven={isEven(ppl_idx)}
      />
    </>
  );
}

/*
<Fragment>
<TableRow sx={{ '& > td': { borderBottom: 'unset' } }}>
  <TableCell>
    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  </TableCell>
  {role && ['ADMIN', 'ENGINEER'].includes(role) && <TableCell>
    <IconButton aria-label='delete row' size='small' onClick={showModalDeletePipeline}>
      <DeleteOutlineOutlinedIcon />
    </IconButton>
    <IconButton aria-label='add row' size='small' onClick={() => duplicatePipeline()}>
      <AddCircleOutlineOutlinedIcon />
    </IconButton>
    {modalDeletePipeline}
  </TableCell>}
  <TableCell>
    <RecordEntry id={id} createdById={createdById} columnName='license' columnType='string' nullable={false} record={license} validator={licenseMatchPattern} authorized={authorized} editRecord={editRecord} />
  </TableCell>
  <EntryField id={id} createdById={createdById} record={license} columnName='license' columnType='string' validator={validators?.licenseMatchPattern} />
  <EntryField id={id} createdById={createdById} record={segment} columnName='segment' columnType='string' validator={validators?.segmentMatchPattern} />
  <EntryField id={id} createdById={createdById} record={from} columnName='from' columnType='string' validator={validators?.fromToMatchPattern} />
  <EntryField id={id} createdById={createdById} record={fromFeature} columnName='fromFeature' columnType='string' validator={validators?.fromToFeatureEnum} />
  <EntryField id={id} createdById={createdById} record={to} columnName='to' columnType='string' validator={validators?.fromToMatchPattern} />
  <EntryField id={id} createdById={createdById} record={toFeature} columnName='toFeature' columnType='string' validator={validators?.fromToFeatureEnum} />
</TableRow>
<PipelineData
  key={`${id} injection points`}
  open={open}
  pipeline={pipeline}
  validators={validators}
  isEven={isEven(ppl_idx)}
/>
</Fragment>*/
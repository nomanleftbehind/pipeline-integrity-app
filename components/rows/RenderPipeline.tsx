import { useState, Fragment } from 'react';
import EntryField from '../fields/EntryField';
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
import { useDeletePipelineMutation, PipelinesByIdQueryDocument, useDuplicatePipelineMutation, PipelinesByIdQueryQuery, GetValidatorsQuery } from '../../graphql/generated/graphql';


export type IPipeline = PipelinesByIdQueryQuery['pipelinesById'] extends (infer U)[] | null | undefined ? NonNullable<U> : never;
export type IValidators = GetValidatorsQuery['validators'];

interface IRenderPipelineProps {
  ppl_idx: number;
  pipeline: IPipeline;
  validators: IValidators;
}

const isEven = (value: number): "even" | "odd" => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

export default function RenderPipeline({ ppl_idx, pipeline, validators }: IRenderPipelineProps) {

  const { user } = useAuth() || {};
  const { role } = user || {};

  const [open, setOpen] = useState(false);
  const [showDeletePipelineModal, setShowDeletePipelineModal] = useState(false);

  const [deletePipeline, { data: dataDeletePipeline }] = useDeletePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
  const [duplicatePipeline, { data: dataDuplicatePipeline }] = useDuplicatePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });

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

  const { id, license, segment, substance, from, fromFeature, to, toFeature, status, createdBy } = pipeline;
  const { id: createdById } = createdBy;

  const modalDeletePipeline = showDeletePipelineModal ?
    <ModalDeletePipeline
      license={license}
      segment={segment}
      deletePipeline={handleDeletePipeline}
      hideModalDeletePipeline={hideModalDeletePipeline} /> : null;

  return (
    <Fragment>
      <TableRow sx={{ '& > td': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {role && ['ADMIN', 'ENGINEER'].includes(role) && <TableCell>
          <IconButton aria-label="delete row" size="small" onClick={showModalDeletePipeline}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="add row" size="small" onClick={() => duplicatePipeline()}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
          {modalDeletePipeline}
        </TableCell>}
        <EntryField id={id} createdById={createdById} record={license} columnName="license" validator={validators?.licenseMatchPattern} />
        <EntryField id={id} createdById={createdById} record={segment} columnName="segment" validator={validators?.segmentMatchPattern} />
        <EntryField id={id} createdById={createdById} record={substance} columnName="substance" validator={validators?.substanceEnum} />
        <EntryField id={id} createdById={createdById} record={from} columnName="from" validator={validators?.fromToMatchPattern} />
        <EntryField id={id} createdById={createdById} record={fromFeature} columnName="fromFeature" validator={validators?.fromToFeatureEnum} />
        <EntryField id={id} createdById={createdById} record={to} columnName="to" validator={validators?.fromToMatchPattern} />
        <EntryField id={id} createdById={createdById} record={toFeature} columnName="toFeature" validator={validators?.fromToFeatureEnum} />
        <EntryField id={id} createdById={createdById} record={status} columnName="status" validator={validators?.statusEnum} />
      </TableRow>
      <PipelineData
        key={`${id} injection points`}
        open={open}
        pipeline={pipeline}
        validators={validators}
        isEven={isEven(ppl_idx)}
      />
    </Fragment>
  );
}
import React from 'react';
import EntryField from '../fields/EntryField';
import { useRouter } from 'next/router';
import { ModalDeletePipeline } from '../Modal';
import PipelineData from './PipelineData';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useDeletePipelineMutation, PipelinesByIdQueryDocument, useDuplicatePipelineMutation } from '../../graphql/generated/graphql';

import { IPipeline, IValidators } from '../../pages/pipelines';



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
  const [open, setOpen] = React.useState(false);
  const [showDeletePipelineModal, setShowDeletePipelineModal] = React.useState<boolean>(false);

  const [deletePipeline, { data: dataDeletePipeline }] = useDeletePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
  const [duplicatePipeline, { data: dataDuplicatePipeline }] = useDuplicatePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })

  const router = useRouter();

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

  const { id, license, segment, substance, from, fromFeature, to, toFeature, injectionPoints, status } = pipeline;

  const modalDeletePipeline = showDeletePipelineModal ?
    <ModalDeletePipeline
      license={license}
      segment={segment}
      deletePipeline={handleDeletePipeline}
      hideModalDeletePipeline={hideModalDeletePipeline} /> : null;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete row" size="small" onClick={showModalDeletePipeline}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="add row" size="small" onClick={() => duplicatePipeline()}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
          {modalDeletePipeline}
        </TableCell>
        <TableCell>
          <Button color="secondary" variant="outlined" sx={{ color: 'blue' }} aria-label="navigate to pipeline" size="small" onClick={() => router.push(`/pipeline/${id}`)}>
            Details
          </Button>
        </TableCell>
        <EntryField id={id} record={license} columnName="license" validator={validators?.licenseMatchPattern} />
        <EntryField id={id} record={segment} columnName="segment" validator={validators?.segmentMatchPattern} />
        <EntryField id={id} record={substance} columnName="substance" validator={validators?.substanceEnum} />
        <EntryField id={id} record={from} columnName="from" validator={validators?.fromToMatchPattern} />
        <EntryField id={id} record={fromFeature} columnName="fromFeature" validator={validators?.fromToFeatureEnum} />
        <EntryField id={id} record={to} columnName="to" validator={validators?.fromToMatchPattern} />
        <EntryField id={id} record={toFeature} columnName="toFeature" validator={validators?.fromToFeatureEnum} />
        <TableCell align="right">{injectionPoints ? injectionPoints.length === 1 ? "1 well" : `${injectionPoints.length} wells` : null}</TableCell>
        <EntryField id={id} record={status} columnName="status" validator={validators?.statusEnum} />
      </TableRow>
      < PipelineData
        key={`${id} injection points`}
        open={open}
        pipeline={pipeline}
        validators={validators}
        isEven={isEven(ppl_idx)}
      />
    </React.Fragment>
  );
}
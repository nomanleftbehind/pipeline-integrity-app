import React from 'react';
import { ModalDeletePipeline } from '../Modal';
import PipelineData2 from './PipelineData2';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useDeletePipelineMutation, PipelinesByIdQueryDocument, useDuplicatePipelineMutation, PipelinesByIdQueryQuery, AllInjectionPointsQueryQuery } from '../../graphql/generated/graphql';
import { IValidators } from '../../pages/prettyPipelines';

export type IPipeline = PipelinesByIdQueryQuery['pipelinesById'] extends (infer U)[] | null | undefined ? NonNullable<U> : never;

export type IInjectionPointOptions = AllInjectionPointsQueryQuery['allInjectionPoints'];

interface IRenderPipelineProps {
  ppl_idx: number;
  pipeline: IPipeline;
  injectionPointOptions: IInjectionPointOptions;
  validators: IValidators;
  expandedPipelines: string[];
  onPipelineClick: React.MouseEventHandler<HTMLButtonElement>;
}

const isEven = (value: number): "even" | "odd" => {
  if (value % 2 === 0)
    return "even";
  else return "odd";
}

export default function RenderPipeline2({ ppl_idx, pipeline, injectionPointOptions, validators }: IRenderPipelineProps) {
  const [open, setOpen] = React.useState(false);
  const [showDeletePipelineModal, setShowDeletePipelineModal] = React.useState<boolean>(false);

  const [deletePipeline, { data: dataDeletePipeline }] = useDeletePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
  const [duplicatePipeline, { data: dataDuplicatePipeline }] = useDuplicatePipelineMutation({ variables: { id: pipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })

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

  const { id, createdAt, license, segment, substance, from, fromFeature, to, toFeature, injectionPoints, status } = pipeline;

  const { license: valLicense, segment: valSegment, substance: valSubstance, fromTo: valFromTo, fromToFeature: valFromToFeature, status: valStatus, length: valLength, type: valType, grade: valGrade, outsideDiameter: valOutsideDiameter, wallThickness: valWallThickness, material: valMaterial, mop: valMop, internalProtection: valInternalProtection } = validators;

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
        <TableCell component="th" scope="row">{id}</TableCell>
        <TableCell align="right">{createdAt}</TableCell>
        <TableCell align="right">{license}</TableCell>
        <TableCell align="right">{segment}</TableCell>
        <TableCell align="right">{substance}</TableCell>
        <TableCell align="right">{from}</TableCell>
        <TableCell align="right">{fromFeature}</TableCell>
        <TableCell align="right">{to}</TableCell>
        <TableCell align="right">{toFeature}</TableCell>
        <TableCell align="right">{injectionPoints ? injectionPoints.length === 1 ? "1 well" : `${injectionPoints.length} wells` : null}</TableCell>
        <TableCell align="right">{status}</TableCell>
      </TableRow>
      < PipelineData2
        key={`${id} injection points`}
        open={open}
        pipeline={pipeline}
        validators={validators}
        isEven={isEven(ppl_idx)}
        injectionPointOptions={injectionPointOptions}
      />
    </React.Fragment>
  );
}
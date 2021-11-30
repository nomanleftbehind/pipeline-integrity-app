import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Source from './Source';
import InjectionPointForm from './InjectionPointForm';
import { IPipeline, IInjectionPointOptions } from '../../rows/RenderPipeline';

import { useConnectUpstreamPipelineMutation, useDisconnectUpstreamPipelineMutation, useConnectSourceMutation, useDisconnectSourceMutation, useDeleteInjectionPointFromPipelineMutation, useChangeInjectionPointToPipelineMutation, PipelinesByIdQueryDocument } from '../../../graphql/generated/graphql';

type IInjectionPoints = Pick<IPipeline, 'injectionPoints' | 'upstream'>;
type IUpstream = IPipeline['upstream'];

interface IInjectionPointsProps {
  open: boolean;
  id: string;
  upstream: IUpstream;
  injectionPoints: IInjectionPoints;
}


export default function InjectionPoints({ open, id, injectionPoints }: IInjectionPointsProps) {
  const [showUpstreamPipelinesForm, setShowUpstreamPipelinesForm] = React.useState<boolean>(false);
  const [showSourcesForm, setShowSourcesForm] = React.useState<boolean>(false);

  const [connectUpstreamPipeline, { data: dataConnectUpstreamPipeline }] = useConnectUpstreamPipelineMutation();
  const [disconnectUpstreamPipeline, { data: dataDisconnectUpstreamPipeline }] = useDisconnectUpstreamPipelineMutation();

  const [connectSource, { data: dataConnectSource }] = useConnectSourceMutation();
  const [disconnectSource, { data: dataDisconnectSource }] = useDisconnectSourceMutation();

  const [deleteInjectionPoint, { data, error, loading }] = useDeleteInjectionPointFromPipelineMutation();
  const [changeInjectionPointToPipeline, { data: dataChangeInjectionPointToPipeline }] = useChangeInjectionPointToPipelineMutation();

  const { injectionPoints: sources, upstream: upstreamPipelines } = injectionPoints;

  function toggleShowUpstreamPipelinesForm() {
    setShowUpstreamPipelinesForm(!showUpstreamPipelinesForm);
  }

  function toggleShowSourcesForm() {
    setShowSourcesForm(!showSourcesForm);
  }

  function handleSubmit(injectionPointType: string, newInjectionPointId: string, oldInjectionPointId?: string) {
    switch (injectionPointType) {
      case 'upstream pipeline':
        // Very important this is the first mutation called in this block,
        // as otherwise if you click OK, while not having selected a different injection point,
        // it would first override injection point with itself and then delete it.
        if (oldInjectionPointId) disconnectUpstreamPipeline({ variables: { id, upstreamId: oldInjectionPointId } });
        connectUpstreamPipeline({ variables: { id, upstreamId: newInjectionPointId }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
        setShowUpstreamPipelinesForm(false);
        break;
      case 'source':
        if (oldInjectionPointId) disconnectSource({ variables: { id, sourceId: oldInjectionPointId } });
        connectSource({ variables: { id, sourceId: newInjectionPointId }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
        setShowSourcesForm(false);
        break;
      default:
        break;
    }
  }

  function handleSubmit2(newInjectionPointId: string, oldInjectionPointId?: string) {
    if (oldInjectionPointId) deleteInjectionPoint({ variables: { id: oldInjectionPointId } }); // Very important this is the first mutation called in this block,
    // as otherwise if you click OK, while not having selected a different injection point,
    // it would first override injection point with itself and then delete it.
    changeInjectionPointToPipeline({ variables: { id: newInjectionPointId, pipelineId: id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
    setShowSourcesForm(false);
  }

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Injection Points
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Upstream Pipelines
                  <IconButton aria-label="expand row" size="small" onClick={toggleShowUpstreamPipelinesForm}>
                    {showUpstreamPipelinesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="right">Oil</TableCell>
                <TableCell align="right">Water</TableCell>
                <TableCell align="right">Gas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showUpstreamPipelinesForm ?
                <TableRow>
                  <TableCell colSpan={2}>
                    <InjectionPointForm
                      injectionPointType="upstream pipeline"
                      handleSubmit={handleSubmit}
                    />
                  </TableCell>
                </TableRow> :
                null}
              {upstreamPipelines ? upstreamPipelines.map(upstreamPipeline => {
                return upstreamPipeline ?
                  (
                    <TableRow key={upstreamPipeline.id}>
                      <Source
                        injectionPointType="upstream pipeline"
                        injectionPointId={upstreamPipeline.id}
                        source={`${upstreamPipeline.license}-${upstreamPipeline.segment}`}
                        handleSubmit={handleSubmit}
                        disconnectInjectionPoint={() => disconnectUpstreamPipeline({ variables: { id: id, upstreamId: upstreamPipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })}
                      />
                      <TableCell align="right" colSpan={3} />
                    </TableRow>
                  ) :
                  null;
              }) :
                null}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>Sources
                  <IconButton aria-label="expand row" size="small" onClick={toggleShowSourcesForm}>
                    {showSourcesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showSourcesForm ?
                <TableRow>
                  <TableCell colSpan={4}>
                    <InjectionPointForm
                      injectionPointType="source"
                      handleSubmit={handleSubmit}
                    />
                  </TableCell>
                </TableRow> :
                null}
              {sources ? sources.map(source => {
                return source ?
                  (
                    <TableRow key={source.id}>
                      <Source
                        injectionPointType="source"
                        injectionPointId={source.id}
                        source={source.source}
                        handleSubmit={handleSubmit}
                        disconnectInjectionPoint={() => disconnectSource({ variables: { id: id, sourceId: source.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })}
                      />
                      <TableCell align="right">{source.oil}</TableCell>
                      <TableCell align="right">{source.water}</TableCell>
                      <TableCell align="right">{source.gas}</TableCell>
                    </TableRow>
                  ) :
                  null;
              }) :
                null}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
}
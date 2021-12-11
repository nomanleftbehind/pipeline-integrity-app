import React, { useEffect, useMemo } from 'react';
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
import { IPipeline } from '../../rows/RenderPipeline';

import { usePipelineFlowQuery, PipelineFlowQuery, useConnectUpstreamPipelineMutation, useDisconnectUpstreamPipelineMutation, useConnectSourceMutation, useDisconnectSourceMutation, PipelinesByIdQueryDocument } from '../../../graphql/generated/graphql';

type IInjectionPoints = Pick<IPipeline, 'injectionPoints' | 'upstream'>;
type IUpstream = IPipeline['upstream'];

type IInferFromArray<T> = T extends (infer U)[] ? U : never;

type IUpstreamPipelineFlow = IInferFromArray<PipelineFlowQuery['pipelineFlow']>;
type ISourceFlow = IInferFromArray<IInjectionPoints['injectionPoints']>;


interface IInjectionPointsProps {
  open: boolean;
  id: string;
  upstream: IUpstream;
  injectionPoints: IInjectionPoints;
}


export interface ICollectFlowDataProps {
  oil?: number;
  water?: number;
  gas?: number;
  firstProduction?: string | null;
  lastProduction?: string | null;
  firstInjection?: string | null;
  lastInjection?: string | null;
}


export default function InjectionPoints({ open, id, injectionPoints }: IInjectionPointsProps) {
  const [showUpstreamPipelinesForm, setShowUpstreamPipelinesForm] = React.useState<boolean>(false);
  const [showSourcesForm, setShowSourcesForm] = React.useState<boolean>(false);

  const { injectionPoints: sources, upstream: upstreamPipelines } = injectionPoints;

  const args = upstreamPipelines ? upstreamPipelines.map(upstreamPipeline => upstreamPipeline ? upstreamPipeline.id : null) : [];

  // This function calls Prisma raw query that calculates total flow volume through each upstream pipeline.
  const { data: dataPipelineFlow } = usePipelineFlowQuery({ variables: { pipelineFlowId: args } });

  // Upstream pipelines object was being passed as a prop all the way from pipelines page.
  // However, it didn't contain volume flow data. We had to write raw SQL query to return object with calculated total flow through each upstream pipeline.
  // We are now merging those two objects on their common key, which is id.
  const mergedUpstreamPipelines = upstreamPipelines ? upstreamPipelines.map(us => (us ? { ...us, ...dataPipelineFlow?.pipelineFlow?.find(pf => (pf ? pf.id === us.id : null)) } : null)) : null;

  useEffect(() => {
    console.log('dataPipelineFlow', dataPipelineFlow?.pipelineFlow, upstreamPipelines, mergedUpstreamPipelines);

  }, [dataPipelineFlow])

  const [connectUpstreamPipeline, { data: dataConnectUpstreamPipeline }] = useConnectUpstreamPipelineMutation();
  const [disconnectUpstreamPipeline, { data: dataDisconnectUpstreamPipeline }] = useDisconnectUpstreamPipelineMutation();

  const [connectSource, { data: dataConnectSource }] = useConnectSourceMutation();
  const [disconnectSource, { data: dataDisconnectSource }] = useDisconnectSourceMutation();


  function toggleShowUpstreamPipelinesForm() {
    setShowUpstreamPipelinesForm(!showUpstreamPipelinesForm);
  }

  function toggleShowSourcesForm() {
    setShowSourcesForm(!showSourcesForm);
  }

  function sumFlow<T extends IUpstreamPipelineFlow | ISourceFlow>(arr: T[] | null | undefined, prop: keyof Pick<NonNullable<T>, 'oil' | 'water' | 'gas'>) {
    if (arr) {
      let n = 0;
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item) {
          n += item[prop];
        }
      }
      return n;
    }
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
                <TableCell align="right">{sumFlow(dataPipelineFlow?.pipelineFlow, 'oil')}</TableCell>
                <TableCell align="right">{sumFlow(dataPipelineFlow?.pipelineFlow, 'water')}</TableCell>
                <TableCell align="right">{sumFlow(dataPipelineFlow?.pipelineFlow, 'gas')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showUpstreamPipelinesForm ?
                <TableRow>
                  <TableCell>
                    <InjectionPointForm
                      injectionPointType="upstream pipeline"
                      handleSubmit={handleSubmit}
                    />
                  </TableCell>
                </TableRow> :
                null}
              {mergedUpstreamPipelines ? mergedUpstreamPipelines.map(upstreamPipeline => {
                return upstreamPipeline ? (
                  <Source
                    key={upstreamPipeline.id}
                    injectionPointType="upstream pipeline"
                    injectionPointId={upstreamPipeline.id}
                    source={`${upstreamPipeline.license}-${upstreamPipeline.segment}`}
                    handleSubmit={handleSubmit}
                    disconnectInjectionPoint={() => disconnectUpstreamPipeline({ variables: { id: id, upstreamId: upstreamPipeline.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })}
                    injectionPointFlow={{ injectionPointOil: upstreamPipeline.oil, injectionPointWater: upstreamPipeline.water, injectionPointGas: upstreamPipeline.gas }}
                  />
                ) :
                  null;
              }) :
                null}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Sources
                  <IconButton aria-label="expand row" size="small" onClick={toggleShowSourcesForm}>
                    {showSourcesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="right">{sumFlow(sources, 'oil')}</TableCell>
                <TableCell align="right">{sumFlow(sources, 'water')}</TableCell>
                <TableCell align="right">{sumFlow(sources, 'gas')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showSourcesForm ?
                <TableRow>
                  <TableCell>
                    <InjectionPointForm
                      injectionPointType="source"
                      handleSubmit={handleSubmit}
                    />
                  </TableCell>
                </TableRow> :
                null}
              {sources ? sources.map(source => {
                return source ? (
                  <Source
                    key={source.id}
                    injectionPointType="source"
                    injectionPointId={source.id}
                    source={source.source}
                    handleSubmit={handleSubmit}
                    disconnectInjectionPoint={() => disconnectSource({ variables: { id: id, sourceId: source.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })}
                    injectionPointFlow={{ injectionPointOil: source.oil, injectionPointWater: source.water, injectionPointGas: source.gas }}
                  />
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
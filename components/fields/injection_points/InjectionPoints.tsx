import { useState } from 'react';
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

import { sum_flow } from '../../../wasm/pkg/pipeline_database_wasm_bg';

import { usePipelineFlowQuery, PipelineFlowQuery, useConnectUpstreamPipelineMutation, useDisconnectUpstreamPipelineMutation, useConnectSourceMutation, useDisconnectSourceMutation, PipelinesByIdQueryDocument } from '../../../graphql/generated/graphql';

type IInjectionPoints = Pick<IPipeline, 'injectionPoints' | 'upstream'>;
type IUpstream = IPipeline['upstream'];

export type IInferFromArray<T> = T extends (infer U)[] ? U : never;

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
  const [showUpstreamPipelinesForm, setShowUpstreamPipelinesForm] = useState(false);
  const [showSourcesForm, setShowSourcesForm] = useState(false);

  const { injectionPoints: sources, upstream: upstreamPipelines } = injectionPoints;

  const args = upstreamPipelines ? upstreamPipelines.map(upstreamPipeline => upstreamPipeline ? upstreamPipeline.id : null) : [];

  // This function calls Prisma raw query that calculates total flow volume through each upstream pipeline.
  const { data: dataPipelineFlow } = usePipelineFlowQuery({ variables: { pipelineFlowId: args } });

  // Upstream pipelines object was being passed as a prop all the way from pipelines page.
  // However, it didn't contain volume flow data. We had to write raw SQL query to return object with calculated total flow through each upstream pipeline.
  // We are now merging those two objects on their common key, which is id.
  const mergedUpstreamPipelines = upstreamPipelines ? upstreamPipelines.map(us => (us ? { ...us, ...dataPipelineFlow?.pipelineFlow?.find(pf => (pf ? pf.id === us.id : null)) } : null)) : null;

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

  // This function was replaced with WebAssembly function sum_flow.
  // Keeping here for potential future use.
  // function sumFlow<T extends IUpstreamPipelineFlow | ISourceFlow>(arr: T[] | null | undefined, prop: keyof Pick<NonNullable<T>, 'oil' | 'water' | 'gas'>) {
  //   if (arr) {
  //     let n = 0;
  //     for (let i = 0; i < arr.length; i++) {
  //       const item = arr[i];
  //       if (item) {
  //         n += item[prop];
  //       }
  //     }
  //     return n === 0 ? undefined : n;
  //   }
  // }

  function calculateLastFirstFlow<T extends IUpstreamPipelineFlow | ISourceFlow>(arr: T[] | null | undefined, prop: keyof Pick<NonNullable<T>, 'lastProduction' | 'lastInjection' | 'firstProduction' | 'firstInjection'>) {
    if (arr) {
      let date: Date | undefined;
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item) {
          const dateString = item[prop];
          if (dateString) {
            const newDate = new Date(dateString.slice(0, 10));
            if (prop === 'lastProduction' || prop === 'lastInjection') {
              // calculate max date
              if (typeof date === 'undefined' || newDate > date) {
                date = newDate;
              }
            } else {
              // calculate min date
              if (typeof date === 'undefined' || newDate < date) {
                date = newDate;
              }
            }
          }
        }
      }
      return date;
    }
  }

  function sumHorizontal(num1?: number, num2?: number) {
    if (num1 || num2) {
      return Math.round(((num1 || 0) + (num2 || 0)) * 100) / 100;
    }
  }

  function maxHorizontal(date1: Date | undefined, date2: Date | undefined) {
    if (date1 && date2) {
      if (date1 >= date2) {
        return date1;
      } else {
        return date2;
      }
    } else if (date1) {
      return date1;
    } else if (date2) {
      return date2;
    }
  }

  function minHorizontal(date1: Date | undefined, date2: Date | undefined) {
    if (date1 && date2) {
      if (date1 <= date2) {
        return date1;
      } else {
        return date2;
      }
    } else if (date1) {
      return date1;
    } else if (date2) {
      return date2;
    }
  }

  // Functions with snake_case naming convention are WebAssembly functions written in Rust.
  const flow = {
    upstreamPipelinesOil: sum_flow(dataPipelineFlow?.pipelineFlow, 'oil'),
    upstreamPipelinesWater: sum_flow(dataPipelineFlow?.pipelineFlow, 'water'),
    upstreamPipelinesGas: sum_flow(dataPipelineFlow?.pipelineFlow, 'gas'),
    upstreamPipelinesGasAssociatedLiquids: sum_flow(dataPipelineFlow?.pipelineFlow, 'gasAssociatedLiquids'),
    upstreamPipelinesTotalFluids: sum_flow(dataPipelineFlow?.pipelineFlow, 'totalFluids'),
    upstreamPipelinesLastProduction: calculateLastFirstFlow(dataPipelineFlow?.pipelineFlow, 'lastProduction'),
    upstreamPipelinesLastInjection: calculateLastFirstFlow(dataPipelineFlow?.pipelineFlow, 'lastInjection'),
    upstreamPipelinesFirstProduction: calculateLastFirstFlow(dataPipelineFlow?.pipelineFlow, 'firstProduction'),
    upstreamPipelinesFirstInjection: calculateLastFirstFlow(dataPipelineFlow?.pipelineFlow, 'firstInjection'),
    sourcesOil: sum_flow(sources, 'oil'),
    sourcesWater: sum_flow(sources, 'water'),
    sourcesGas: sum_flow(sources, 'gas'),
    sourcesGasAssociatedLiquids: sum_flow(sources, 'gasAssociatedLiquids'),
    sourcesTotalFluids: sum_flow(sources, 'totalFluids'),
    sourcesLastProduction: calculateLastFirstFlow(sources, 'lastProduction'),
    sourcesLastInjection: calculateLastFirstFlow(sources, 'lastInjection'),
    sourcesFirstProduction: calculateLastFirstFlow(sources, 'firstProduction'),
    sourcesFirstInjection: calculateLastFirstFlow(sources, 'firstInjection'),
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
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Injection Points
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Oil (m³/d)</TableCell>
              <TableCell align="right">Water (m³/d)</TableCell>
              <TableCell align="right">Gas (E3m³/d)</TableCell>
              <TableCell align="right">Gas Associated Liquids (m³/d)</TableCell>
              <TableCell align="right">Total Fluids (m³/d)</TableCell>
              <TableCell align="right">Last Production</TableCell>
              <TableCell align="right">Last Injection</TableCell>
              <TableCell align="right">First Production</TableCell>
              <TableCell align="right">First Injection</TableCell>
            </TableRow>
            <TableRow sx={{ '& > th': { whiteSpace: 'nowrap' } }}>
              <TableCell>Total</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesOil, flow.sourcesOil)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesWater, flow.sourcesWater)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesGas, flow.sourcesGas)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesGasAssociatedLiquids, flow.sourcesGasAssociatedLiquids)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesTotalFluids, flow.sourcesTotalFluids)}</TableCell>
              <TableCell align="right">{maxHorizontal(flow.upstreamPipelinesLastProduction, flow.sourcesLastProduction)?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{maxHorizontal(flow.upstreamPipelinesLastInjection, flow.sourcesLastInjection)?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{minHorizontal(flow.upstreamPipelinesFirstProduction, flow.sourcesFirstProduction)?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{minHorizontal(flow.upstreamPipelinesFirstInjection, flow.sourcesFirstInjection)?.toISOString().slice(0, 10)}</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow sx={{ '& > th': { paddingTop: '30px', fontStyle: 'italic', whiteSpace: 'nowrap' } }}>
              <TableCell>Upstream Pipelines
                <IconButton aria-label="expand row" size="small" onClick={toggleShowUpstreamPipelinesForm}>
                  {showUpstreamPipelinesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                </IconButton>
              </TableCell>
              {/* Even though we don't need to sum only one value, we are passing here to sumHorizontal function because that function rounds to two decimals.
                    If we don't pass it to the function, we might get numbers like 1.2300000000001 */}
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesOil)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesWater)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesGas)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesGasAssociatedLiquids)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.upstreamPipelinesTotalFluids)}</TableCell>
              <TableCell align="right">{flow.upstreamPipelinesLastProduction?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{flow.upstreamPipelinesLastInjection?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{flow.upstreamPipelinesFirstProduction?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{flow.upstreamPipelinesFirstInjection?.toISOString().slice(0, 10)}</TableCell>
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
                  injectionPointFlow={{
                    injectionPointOil: upstreamPipeline.oil,
                    injectionPointWater: upstreamPipeline.water,
                    injectionPointGas: upstreamPipeline.gas,
                    injectionPointGasAssociatedLiquids: upstreamPipeline.gasAssociatedLiquids,
                    injectionPointTotalFluids: upstreamPipeline.totalFluids,
                    injectionPointLastProduction: upstreamPipeline.lastProduction,
                    injectionPointFirstProduction: upstreamPipeline.firstProduction,
                    injectionPointLastInjection: upstreamPipeline.lastInjection,
                    injectionPointFirstInjection: upstreamPipeline.firstInjection,
                  }}
                />
              ) :
                null;
            }) :
              null}
          </TableBody>
          <TableHead>
            <TableRow sx={{ '& > th': { paddingTop: '30px', fontStyle: 'italic', whiteSpace: 'nowrap' } }}>
              <TableCell>Sources
                <IconButton aria-label="expand row" size="small" onClick={toggleShowSourcesForm}>
                  {showSourcesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                </IconButton>
              </TableCell>
              <TableCell align="right">{sumHorizontal(flow.sourcesOil)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.sourcesWater)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.sourcesGas)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.sourcesGasAssociatedLiquids)}</TableCell>
              <TableCell align="right">{sumHorizontal(flow.sourcesTotalFluids)}</TableCell>
              <TableCell align="right">{flow.sourcesLastProduction?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{flow.sourcesLastInjection?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{flow.sourcesFirstProduction?.toISOString().slice(0, 10)}</TableCell>
              <TableCell align="right">{flow.sourcesFirstInjection?.toISOString().slice(0, 10)}</TableCell>
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
                  injectionPointFlow={{
                    injectionPointOil: source.oil,
                    injectionPointWater: source.water,
                    injectionPointGas: source.gas,
                    injectionPointGasAssociatedLiquids: source.gasAssociatedLiquids,
                    injectionPointTotalFluids: source.totalFluids,
                    injectionPointLastProduction: source.lastProduction,
                    injectionPointFirstProduction: source.firstProduction,
                    injectionPointLastInjection: source.lastInjection,
                    injectionPointFirstInjection: source.firstInjection,
                  }}
                />
              ) :
                null;
            }) :
              null}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  );
}
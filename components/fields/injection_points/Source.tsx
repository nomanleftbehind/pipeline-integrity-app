import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import InjectionPointForm from './InjectionPointForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// import { usePipelineFlowLazyQuery, usePipelineFlowQuery } from '../../../graphql/generated/graphql';
// import { ICollectFlowDataProps } from './InjectionPoints';

interface IInjectionPointEnrtyProps {
  injectionPointType: string;
  injectionPointId: string;
  source: string;
  handleSubmit: (injectionPointType: string, newInjectionPointId: string, oldInjectionPointId: string) => void;
  disconnectInjectionPoint: () => void;
  injectionPointFlow: { injectionPointOil?: number; injectionPointWater?: number; injectionPointGas?: number };
  // collectUpstreamPipelineFlowData?: (arg0: ICollectFlowDataProps, increment?: number) => void;
}

export default function InjectionPointEntry({ injectionPointType, injectionPointId, source, handleSubmit, disconnectInjectionPoint, injectionPointFlow/*, collectUpstreamPipelineFlowData*/ }: IInjectionPointEnrtyProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  // This function calls Prisma raw query
  // const [pipelineFlow, { data: dataPipelineFlow }] = usePipelineFlowLazyQuery({ variables: { pipelineFlowId: injectionPointId } });

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleSubmitAndHideForm(injectionPointType: string, newInjectionPointId: string) {
    handleSubmit(injectionPointType, newInjectionPointId, injectionPointId);
    setShowForm(false);
  }

  // const dataUpstreamPipelineFlow = dataPipelineFlow && dataPipelineFlow.pipelineFlow && dataPipelineFlow.pipelineFlow[0] && dataPipelineFlow.pipelineFlow[0];

  // const { oil: upstreamPipelineOil, gas: upstreamPipelineGas, water: upstreamPipelineWater, firstProduction: upstreamPipelineFirstProduction, lastProduction: upstreamPipelineLastProduction, firstInjection: upstreamPipelineFirstInjection, lastInjection: upstreamPipelineLastInjection } = dataUpstreamPipelineFlow || {};
  const { injectionPointOil, injectionPointWater, injectionPointGas } = injectionPointFlow || {};

  // function collectFlowData() {
  //   const obj = {
  //     oil: upstreamPipelineOil,
  //     water: upstreamPipelineWater,
  //     gas: upstreamPipelineGas,
  //     firstProduction: upstreamPipelineFirstProduction,
  //     lastProduction: upstreamPipelineLastProduction,
  //     firstInjection: upstreamPipelineFirstInjection,
  //     lastInjection: upstreamPipelineLastInjection,
  //   }

  //   if (collectUpstreamPipelineFlowData) {
  //     collectUpstreamPipelineFlowData(obj, increment);
  //   }
  // }

  // useEffect(() => {
  //   collectFlowData();
  // }, [dataUpstreamPipelineFlow])

  // This component can represent either source or upstream pipeline.
  // We will call pipelineFlow query only if it represents upstream pipeline.
  // useEffect(() => {
  //   if (injectionPointType === 'upstream pipeline') { pipelineFlow(); }
  // }, []);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <div className="cell-wrapper">
          <div className="cell-r">
            <IconButton aria-label="show form" size="small" onClick={toggleShowForm} type="button">
              {showForm ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton>
          </div>
          <div className="cell-fr">
            <IconButton aria-label="delete injection point" size="small" onClick={disconnectInjectionPoint} type="button">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
          {showForm ?
            <InjectionPointForm
              injectionPointId={injectionPointId}
              injectionPointType={injectionPointType}
              handleSubmit={handleSubmitAndHideForm}
            /> :
            <div className="cell-l no-wrap">{source}</div>}
        </div>
      </TableCell>
      {/* Rounding to two decimal places because Prisma raw query sometimes returns what should be a two decimal places number,
          showing gazillion trailing zeros and 1 after a decimal point */}
      <TableCell align="right">{injectionPointOil ? Math.round((injectionPointOil) * 100) / 100 : injectionPointOil}</TableCell>
      <TableCell align="right">{injectionPointWater ? Math.round((injectionPointWater) * 100) / 100 : injectionPointWater}</TableCell>
      <TableCell align="right">{injectionPointGas ? Math.round((injectionPointGas) * 100) / 100 : injectionPointGas}</TableCell>
    </TableRow>
  );
}
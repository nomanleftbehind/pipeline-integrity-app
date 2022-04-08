import { useState } from 'react';
import AutocompleteForm from './AutocompleteForm';
import { IDataOptions } from './SourceData';
import IconButton from '@mui/material/IconButton';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DisconnectIcon from '../../svg/disconnect';
import { ISourceMap } from './SourceData';
import { IInferFromArray } from '../RenderPipeline';
import { IDis_ConnectSource } from './ConnectedSources';
import {
  WellsByPipelineIdQuery,
  SalesPointsByPipelineIdQuery,
  ConnectedPipelinesByPipelineIdQuery,
} from '../../../graphql/generated/graphql';



export type IWell = IInferFromArray<WellsByPipelineIdQuery['wellsByPipelineId']>;
export type ISalesPoint = IInferFromArray<SalesPointsByPipelineIdQuery['salesPointsByPipelineId']>;
export type IPipelineFlow = IInferFromArray<NonNullable<ConnectedPipelinesByPipelineIdQuery['connectedPipelinesByPipelineId']>['pipelinesFlow']>;

interface ISourceRowProps {
  pipelineId: string;
  source: IWell | ISalesPoint | IPipelineFlow;
  length: number;
  row: number;
  formId: string;
  loadOptions: () => void;
  dataOptions: IDataOptions;
  connectSource: (arg0: IDis_ConnectSource) => void;
  disconnectSource: (arg0: IDis_ConnectSource) => void;
}

export default function SourceRow({ pipelineId, source, formId, length, row, loadOptions, dataOptions, connectSource, disconnectSource }: ISourceRowProps) {

  const [showOptionsForm, setShowOptionsForm] = useState(false);

  const toggleShowOptionsForm = () => {
    loadOptions();
    setShowOptionsForm(!showOptionsForm);
  }

  const handleConnectSource = ({ id, pipelineId, oldSourceId }: IDis_ConnectSource) => {
    setShowOptionsForm(false);
    connectSource({ id, pipelineId, oldSourceId });
  }

  const { id, name, oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, firstProduction, lastInjection, firstInjection } = source;
  const isLastRow = length === row + 1;
  const columns: ISourceMap[] = [
    // { record: <IconButton aria-label='delete row' size='small' onClick={() => disconnectSource({ id, pipelineId })}><DisconnectIcon /></IconButton> },
    // { record: name, style: { borderRight: 'unset', textAlign: 'left', paddingLeft: '6px' } },
    // { record: <IconButton aria-label='delete row' size='small' onClick={toggleShowOptionsForm}>{/*showOptionsForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />*/<EditOutlinedIcon />}</IconButton>, style: { borderLeft: 'unset' } },
    { record: oil.toFixed(2) },
    { record: water.toFixed(2) },
    { record: gas.toFixed(2) },
    { record: gasAssociatedLiquids.toFixed(3) },
    { record: totalFluids.toFixed(2) },
    { record: lastProduction?.split('T')[0] },
    { record: lastInjection?.split('T')[0] },
    { record: firstProduction?.split('T')[0] },
    { record: firstInjection?.split('T')[0] }
  ];
  return (
    <tr>
      <td className={`connected-source-row sticky left${isLastRow ? ' last' : ''}`}>
        <IconButton aria-label='disconnect row' size='small' onClick={() => disconnectSource({ id, pipelineId })}><DisconnectIcon /></IconButton>
      </td>
      {showOptionsForm ? <AutocompleteForm
        pipelineId={pipelineId}
        sourceId={id}
        formId={formId}
        connectSource={handleConnectSource}
        options={dataOptions}
      /> : <td style={{ borderRight: 'unset', textAlign: 'left', paddingLeft: '6px' }}>{name}</td>}
      {!showOptionsForm && <td style={{ display: 'flex' }}>
        <IconButton size='small' onClick={toggleShowOptionsForm}>{showOptionsForm ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}</IconButton>
      </td>}
      <td>
        {showOptionsForm && <IconButton size='small' onClick={() => setShowOptionsForm(false)}><BlockOutlinedIcon /></IconButton>}
      </td>
      {columns.map(({ record, style }, column) => {
        column += 3
        return (
          <td
            className={column.toString()}
            key={column}
            style={style}
          >
            {record}
          </td>
        );
      })}
    </tr>
  );
}
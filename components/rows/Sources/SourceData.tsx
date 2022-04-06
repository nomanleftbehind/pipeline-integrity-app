import { useState } from 'react';
import AutocompleteForm from './AutocompleteForm';
import { IRecord } from '../../fields/RecordEntry';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DisconnectIcon from '../../svg/disconnect';

import {
  WellsByPipelineIdQuery,
  WellsGroupByPipelineIdQuery,
  WellOptionsQuery,
  SalesPointsByPipelineIdQuery,
  SalesPointsGroupByPipelineIdQuery,
  SalesPointOptionsQuery,
  ConnectedPipelinesByPipelineIdQuery,
  PipelineOptionsQuery,
} from '../../../graphql/generated/graphql';


interface IConnectSource {
  id: string;
  pipelineId: string;
}

export interface ISourceMap {
  record: IRecord | JSX.Element;
  style?: React.HTMLAttributes<HTMLTableCellElement>['style'];
}

interface ISourcesDataProps {
  pipelineId: string;
  label: string;
  data?: WellsByPipelineIdQuery['wellsByPipelineId'] | SalesPointsByPipelineIdQuery['salesPointsByPipelineId'] | NonNullable<ConnectedPipelinesByPipelineIdQuery['connectedPipelinesByPipelineId']>['pipelineFlow'];
  dataGroupBy?: WellsGroupByPipelineIdQuery['wellsGroupByPipelineId'] | SalesPointsGroupByPipelineIdQuery['salesPointsGroupByPipelineId'] | NonNullable<ConnectedPipelinesByPipelineIdQuery['connectedPipelinesByPipelineId']>['sourceGroupBy'];
  loadOptions: () => void;
  dataOptions?: WellOptionsQuery['wellOptions'] | SalesPointOptionsQuery['salesPointOptions'] | PipelineOptionsQuery['pipelineOptions'];
  connectSource: (arg0: IConnectSource) => void;
  disconnectSource: (arg0: IConnectSource) => void;
}

export default function SourceData({ pipelineId, label, data, dataGroupBy, loadOptions, dataOptions, connectSource, disconnectSource }: ISourcesDataProps) {

  const [showOptionsForm, setShowOptionsForm] = useState(false);

  const toggleShowOptionsForm = () => {
    loadOptions();
    setShowOptionsForm(!showOptionsForm);
  }

  const handleConnectSource = ({ id, pipelineId }: IConnectSource) => {
    setShowOptionsForm(false);
    connectSource({ id, pipelineId });
  }

  const { oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, firstProduction, lastInjection, firstInjection } = dataGroupBy || {}
  const groupBy = [
    { record: oil?.toFixed(2) },
    { record: water?.toFixed(2) },
    { record: gas?.toFixed(2) },
    { record: gasAssociatedLiquids?.toFixed(3) },
    { record: totalFluids?.toFixed(2) },
    { record: lastProduction?.split('T')[0] },
    { record: lastInjection?.split('T')[0] },
    { record: firstProduction?.split('T')[0] },
    { record: firstInjection?.split('T')[0] },
  ];

  return (
    <>
      <thead className='source-data'>
        <tr>
          <th className='connected-source-row sticky left'></th>
          <th>{label}</th>
          <th>
            <IconButton aria-label="expand row" size="small" onClick={toggleShowOptionsForm}>
              {showOptionsForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
            </IconButton>
          </th>
          {groupBy.map(({ record }, key) => <th key={key}>{record}</th>)}
        </tr>
      </thead>
      <tbody className='source-data'>
        {showOptionsForm && <tr>
          <td className='connected-source-row sticky left'></td>
          <AutocompleteForm
            pipelineId={pipelineId}
            connectSource={handleConnectSource}
            options={dataOptions}
          />
        </tr>}
        {data?.map((source, row) => {
          if (source) {
            const { id, name, oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, firstProduction, lastInjection, firstInjection } = source;
            const isLastRow = data.length === row + 1;
            const columns: ISourceMap[] = [
              { record: <IconButton aria-label='delete row' size='small' onClick={() => disconnectSource({ id, pipelineId })}><DisconnectIcon /></IconButton> },
              { record: name, style: { borderRight: 'unset', textAlign: 'left', paddingLeft: '6px' } },
              { record: <IconButton aria-label='delete row' size='small' onClick={() => alert('hello')}><EditOutlinedIcon /></IconButton>, style: { borderLeft: 'unset' } },
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
              <tr key={row}>
                {columns.map(({ record, style }, column) => {
                  return (
                    <td
                      key={column}
                      className={column === 0 ? `connected-source-row sticky left${isLastRow ? ' last' : ''}` : undefined}
                      style={style}
                    >
                      {record}
                    </td>
                  );
                })}
              </tr>
            );
          }
        })}
      </tbody>
    </>
  );
}
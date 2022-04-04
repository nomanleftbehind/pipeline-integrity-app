import { useState } from 'react';
import AutocompleteForm from './AutocompleteForm';
import { IRecord } from '../../fields/RecordEntry';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

import {
  WellsByPipelineIdQuery,
  WellOptionsQuery,
  SalesPointsByPipelineIdQuery,
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
  data?: WellsByPipelineIdQuery['wellsByPipelineId'] | SalesPointsByPipelineIdQuery['salesPointsByPipelineId'] | ConnectedPipelinesByPipelineIdQuery['connectedPipelinesByPipelineId'];
  loadOptions: () => void;
  dataOptions?: WellOptionsQuery['wellOptions'] | SalesPointOptionsQuery['salesPointOptions'] | PipelineOptionsQuery['pipelineOptions'];
  connectSource: (arg0: IConnectSource) => void;
  disconnectSource: (arg0: IConnectSource) => void;
}

export default function SourceData({ pipelineId, label, data, loadOptions, dataOptions, connectSource, disconnectSource }: ISourcesDataProps) {

  const [showOptionsForm, setShowOptionsForm] = useState(false);

  const toggleShowOptionsForm = () => {
    loadOptions();
    setShowOptionsForm(!showOptionsForm);
  }

  const handleConnectSource = ({ id, pipelineId }: IConnectSource) => {
    setShowOptionsForm(false);
    connectSource({ id, pipelineId });
  }

  return (
    <>
      <thead>
        <tr>
          <th></th>
          <th>{label}</th>
          <th>
            <IconButton aria-label="expand row" size="small" onClick={toggleShowOptionsForm}>
              {showOptionsForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
            </IconButton>
          </th>
        </tr>
      </thead>
      <tbody>
        {showOptionsForm && <tr>
          <td></td>
          <AutocompleteForm
            pipelineId={pipelineId}
            connectSource={handleConnectSource}
            options={dataOptions}
          />
        </tr>}
        {data?.map((source, row) => {
          if (source) {
            const { id, name, oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, firstProduction, lastInjection, firstInjection } = source;

            const columns: ISourceMap[] = [
              { record: <IconButton aria-label='delete row' size='small' onClick={() => disconnectSource({ id, pipelineId })}><DeleteOutlineOutlinedIcon /></IconButton> },
              { record: name, style: { borderRight: 'unset', textAlign: 'left' } },
              { record: <IconButton aria-label='delete row' size='small' onClick={() => alert('hello')}><EditOutlinedIcon /></IconButton>, style: { borderLeft: 'unset' } },
              { record: oil.toFixed(2) },
              { record: water.toFixed(2) },
              { record: gas.toFixed(2) },
              { record: gasAssociatedLiquids.toFixed(3) },
              { record: totalFluids.toFixed(2) },
              { record: lastProduction?.split('T')[0] },
              { record: firstProduction?.split('T')[0] },
              { record: lastInjection?.split('T')[0] },
              { record: firstInjection?.split('T')[0] }
            ];
            return (
              <tr key={row}>
                {columns.map(({ record, style }, column) => <td key={column} style={style}>{record}</td>)}
              </tr>
            );
          }
        })}
      </tbody>
    </>
  );
}
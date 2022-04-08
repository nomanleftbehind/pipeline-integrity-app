import { useEffect, useState } from 'react';
import SourceRow from './SourceRow';
import { IDis_ConnectSource } from './ConnectedSources';
import AutocompleteForm from './AutocompleteForm';
import { IRecord } from '../../fields/RecordEntry';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

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




export interface ISourceMap {
  record: IRecord | JSX.Element;
  style?: React.HTMLAttributes<HTMLTableCellElement>['style'];
}

export type IDataOptions = WellOptionsQuery['wellOptions'] | SalesPointOptionsQuery['salesPointOptions'] | PipelineOptionsQuery['pipelineOptions'];

interface ISourcesDataProps {
  pipelineId: string;
  label: string;
  formId: string;
  data?: WellsByPipelineIdQuery['wellsByPipelineId'] | SalesPointsByPipelineIdQuery['salesPointsByPipelineId'] | NonNullable<ConnectedPipelinesByPipelineIdQuery['connectedPipelinesByPipelineId']>['pipelinesFlow'];
  dataGroupBy?: WellsGroupByPipelineIdQuery['wellsGroupByPipelineId'] | SalesPointsGroupByPipelineIdQuery['salesPointsGroupByPipelineId'] | NonNullable<ConnectedPipelinesByPipelineIdQuery['connectedPipelinesByPipelineId']>['sourceGroupBy'];
  loadOptions: () => void;
  dataOptions?: IDataOptions;
  connectSource: (arg0: IDis_ConnectSource) => void;
  disconnectSource: (arg0: IDis_ConnectSource) => void;
}

export default function SourceData({ pipelineId, label, formId, data, dataGroupBy, loadOptions, dataOptions, connectSource, disconnectSource }: ISourcesDataProps) {

  useEffect(() => {
    console.log('well options', dataOptions);

  }, [dataOptions])

  const [showOptionsForm, setShowOptionsForm] = useState(false);

  const toggleShowOptionsForm = () => {
    loadOptions();
    setShowOptionsForm(!showOptionsForm);
  }

  const handleConnectSource = ({ id, pipelineId, oldSourceId }: IDis_ConnectSource) => {
    setShowOptionsForm(false);
    connectSource({ id, pipelineId, oldSourceId });
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
          <th></th>
          {groupBy.map(({ record }, key) => <th key={key}>{record}</th>)}
        </tr>
      </thead>
      <tbody className='source-data'>
        {showOptionsForm && <tr>
          <td className='connected-source-row sticky left'></td>
          <AutocompleteForm
            pipelineId={pipelineId}
            formId={formId}
            connectSource={handleConnectSource}
            options={dataOptions}
          />
        </tr>}
        {data?.map((source, row) => {
          if (source) {
            return (
              <SourceRow
                key={row}
                pipelineId={pipelineId}
                source={source}
                formId={formId}
                loadOptions={loadOptions}
                dataOptions={dataOptions}
                connectSource={connectSource}
                disconnectSource={disconnectSource}
                length={data.length}
                row={row}
              />
            );
          }
        })}
      </tbody>
    </>
  );
}
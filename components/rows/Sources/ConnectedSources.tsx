import { useState } from 'react';
import { IRecord } from '../../fields/RecordEntry';
import SourceData from './SourceData';
import { ModalFieldError } from '../../Modal';
import { IPipeline, openModal } from '../RenderPipeline';
import {
  useWellsByPipelineIdQuery,
  useWellsGroupByPipelineIdQuery,
  useWellOptionsLazyQuery,
  useConnectWellMutation,
  useDisconnectWellMutation,
  WellsByPipelineIdDocument,
  WellsGroupByPipelineIdDocument,


  useSalesPointsByPipelineIdQuery,
  useSalesPointsGroupByPipelineIdQuery,
  useSalesPointOptionsLazyQuery,
  useConnectSalesPointMutation,
  useDisconnectSalesPointMutation,
  SalesPointsByPipelineIdDocument,
  SalesPointsGroupByPipelineIdDocument,

  useConnectedPipelinesByPipelineIdQuery,
  usePipelineOptionsLazyQuery,
  useConnectPipelineMutation,
  useDisconnectPipelineMutation,
  ConnectedPipelinesByPipelineIdDocument,

  RiskByIdDocument,
} from '../../../graphql/generated/graphql';

export interface ISourceHeaderMap {
  label?: string;
  props?: React.ThHTMLAttributes<HTMLTableCellElement>;
}

export interface ISourceMap {
  record: IRecord | JSX.Element;
  style?: React.HTMLAttributes<HTMLTableCellElement>['style'];
}

export interface IDis_ConnectSource {
  id: string;
  pipelineId: string;
}

interface ISourcesProps {
  pipelineId: string;
  flowCalculationDirection: IPipeline['flowCalculationDirection'];
}

export default function ConnectedSources({ pipelineId, flowCalculationDirection }: ISourcesProps) {

  // Well queries and mutations
  const { data: dataWells } = useWellsByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataWellsGroupBy } = useWellsGroupByPipelineIdQuery({ variables: { pipelineId } });
  const [wellOptions, { data: dataWellOptions }] = useWellOptionsLazyQuery({
    variables: { pipelineId },
    fetchPolicy: 'no-cache'
  });
  const loadWellOptions = () => {
    wellOptions();
  }


  const [connectWell] = useConnectWellMutation({
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId', WellsGroupByPipelineIdDocument, 'WellsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId'],
    onCompleted: ({ connectWell }) => {
      const { error } = connectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectWell = ({ id, pipelineId }: IDis_ConnectSource) => {
    connectWell({ variables: { id, pipelineId } });
  }

  const [disconnectWell] = useDisconnectWellMutation({
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId', WellsGroupByPipelineIdDocument, 'WellsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId'],
    onCompleted: ({ disconnectWell }) => {
      const { error } = disconnectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleDisconnectWell = ({ id }: IDis_ConnectSource) => {
    disconnectWell({ variables: { id } });
  }




  // Sales point queries and mutations
  const { data: dataSalesPoints } = useSalesPointsByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataSalesPointsGroupBy } = useSalesPointsGroupByPipelineIdQuery({ variables: { pipelineId } });
  const [salesPointOptions, { data: dataSalesPointOptions }] = useSalesPointOptionsLazyQuery({
    fetchPolicy: 'no-cache'
  });
  const loadSalesPointOptions = () => {
    salesPointOptions();
  }

  const [connectSalesPoint] = useConnectSalesPointMutation({
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId', SalesPointsGroupByPipelineIdDocument, 'SalesPointsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId'],
    onCompleted: ({ connectSalesPoint }) => {
      const { error } = connectSalesPoint || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectSalesPoint = ({ id, pipelineId }: IDis_ConnectSource) => {
    connectSalesPoint({ variables: { id, pipelineId } });
  }

  const [disconnectSalesPoint] = useDisconnectSalesPointMutation({
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId', SalesPointsGroupByPipelineIdDocument, 'SalesPointsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId'],
    onCompleted: ({ disconnectSalesPoint }) => {
      const { error } = disconnectSalesPoint || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleDisconnectSalesPoint = ({ id }: IDis_ConnectSource) => {
    disconnectSalesPoint({ variables: { id } });
  }




  // Connected pipeline queries and mutations
  const { data: dataConnectedPipelines } = useConnectedPipelinesByPipelineIdQuery({ variables: { id: pipelineId, flowCalculationDirection } });
  const [pipelineOptions, { data: dataPipelineOptions }] = usePipelineOptionsLazyQuery({
    variables: { id: pipelineId },
    fetchPolicy: 'no-cache'
  });
  const loadPipelineOptions = () => {
    pipelineOptions();
  }

  const [connectPipeline] = useConnectPipelineMutation({
    refetchQueries: [ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId'],
    onCompleted: ({ connectPipeline }) => {
      const { error } = connectPipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectPipeline = ({ id, pipelineId }: IDis_ConnectSource) => {
    connectPipeline({ variables: { id, pipelineId } });
  }

  const [disconnectPipeline] = useDisconnectPipelineMutation({
    refetchQueries: [ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId'],
    onCompleted: ({ disconnectPipeline }) => {
      const { error } = disconnectPipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleDisconnectPipeline = ({ id, pipelineId }: IDis_ConnectSource) => {
    disconnectPipeline({ variables: { id, pipelineId } });
  }


  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const sourceHeader: ISourceHeaderMap[] = [
    {},
    { label: 'Sources', props: { style: { width: '250px' } } },
    {},
    { label: 'Oil (m³/d)', props: { style: { width: '50px' } } },
    { label: 'Water (m³/d)', props: { style: { width: '120px' } } },
    { label: 'Gas (E3m³/d)', props: { style: { width: '100px' } } },
    { label: 'Gas Associated Liquids (m³/d)', props: { style: { width: '100px' } } },
    { label: 'Total Fluids (m³/d)', props: { style: { width: '100px' } } },
    { label: 'Last Production', props: { style: { width: '100px' } } },
    { label: 'Last Injection', props: { style: { width: '100px' } } },
    { label: 'First Production', props: { style: { width: '100px' } } },
    { label: 'First Injection', props: { style: { width: '100px' } } },
  ];

  return (
    <>
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      <table className='connected-source'>
        <thead>
          <tr>
            {sourceHeader.map(({ label, props }, column) => {
              return (
                <th
                  key={column}
                  {...props}
                  className={`pipeline-data-view-header sticky top left${column === 0 ? ' left' : ''}`}
                >
                  {label}
                </th>
              )
            })}
          </tr>
        </thead>
        <SourceData
          pipelineId={pipelineId}
          label='Wells'
          data={dataWells?.wellsByPipelineId}
          dataGroupBy={dataWellsGroupBy?.wellsGroupByPipelineId}
          loadOptions={loadWellOptions}
          dataOptions={dataWellOptions?.wellOptions}
          connectSource={handleConnectWell}
          disconnectSource={handleDisconnectWell}
        />
        <SourceData
          pipelineId={pipelineId}
          label='Sales Points'
          data={dataSalesPoints?.salesPointsByPipelineId}
          dataGroupBy={dataSalesPointsGroupBy?.salesPointsGroupByPipelineId}
          loadOptions={loadSalesPointOptions}
          dataOptions={dataSalesPointOptions?.salesPointOptions}
          connectSource={handleConnectSalesPoint}
          disconnectSource={handleDisconnectSalesPoint}
        />
        <SourceData
          pipelineId={pipelineId}
          label={`Connected ${flowCalculationDirection} Pipelines`}
          data={dataConnectedPipelines?.connectedPipelinesByPipelineId?.pipelineFlow}
          dataGroupBy={dataConnectedPipelines?.connectedPipelinesByPipelineId?.sourceGroupBy}
          loadOptions={loadPipelineOptions}
          dataOptions={dataPipelineOptions?.pipelineOptions}
          connectSource={handleConnectPipeline}
          disconnectSource={handleDisconnectPipeline}
        />
      </table>
    </>
  );
}
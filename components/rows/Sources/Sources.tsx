import { useState } from 'react';
import { IRecord } from '../../fields/RecordEntry';
import SourceData from './SourceData';
import { ModalFieldError } from '../../Modal';
import { IPipeline } from '../RenderPipeline';
import {
  useWellsByPipelineIdQuery,
  useWellOptionsLazyQuery,
  useConnectWellMutation,
  useDisconnectWellMutation,
  WellsByPipelineIdDocument,

  useSalesPointsByPipelineIdQuery,
  useSalesPointOptionsLazyQuery,
  useConnectSalesPointMutation,
  useDisconnectSalesPointMutation,
  SalesPointsByPipelineIdDocument,

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

export default function Sources({ pipelineId, flowCalculationDirection }: ISourcesProps) {

  // Well queries and mutations
  const { data: dataWells } = useWellsByPipelineIdQuery({ variables: { pipelineId } });
  const [wellOptions, { data: dataWellOptions }] = useWellOptionsLazyQuery({
    fetchPolicy: 'no-cache'
  });
  const loadWellOptions = () => {
    wellOptions();
  }

  const [connectWell] = useConnectWellMutation({
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId'],
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
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId'],
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
  const [salesPointOptions, { data: dataSalesPointOptions }] = useSalesPointOptionsLazyQuery({
    fetchPolicy: 'no-cache'
  });
  const loadSalesPointOptions = () => {
    salesPointOptions();
  }

  const [connectSalesPoint] = useConnectSalesPointMutation({
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId'],
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
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId'],
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
    { label: 'First Production', props: { style: { width: '100px' } } },
    { label: 'Last Injection', props: { style: { width: '100px' } } },
    { label: 'First Injection', props: { style: { width: '100px' } } },
  ];

  return (
    <>
      {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      <table className='injection-point'>
        <thead>
          <tr>
            {sourceHeader.map(({ label, props }, i) => <th key={i} {...props}>{label}</th>)}
          </tr>
        </thead>
        <SourceData
          pipelineId={pipelineId}
          label='Wells'
          data={dataWells?.wellsByPipelineId}
          loadOptions={loadWellOptions}
          dataOptions={dataWellOptions?.wellOptions}
          connectSource={handleConnectWell}
          disconnectSource={handleDisconnectWell}
        />
        <SourceData
          pipelineId={pipelineId}
          label='Sales Points'
          data={dataSalesPoints?.salesPointsByPipelineId}
          loadOptions={loadSalesPointOptions}
          dataOptions={dataSalesPointOptions?.salesPointOptions}
          connectSource={handleConnectSalesPoint}
          disconnectSource={handleDisconnectSalesPoint}
        />
        <SourceData
          pipelineId={pipelineId}
          label={`Connected ${flowCalculationDirection} Pipelines'`}
          data={dataConnectedPipelines?.connectedPipelinesByPipelineId}
          loadOptions={loadPipelineOptions}
          dataOptions={dataPipelineOptions?.pipelineOptions}
          connectSource={handleConnectPipeline}
          disconnectSource={handleDisconnectPipeline}
        />
      </table>
    </>
  );
}
import { useState } from 'react';
import RecordEntry, { IRecord, IEditRecordFunction } from '../../fields/RecordEntry';
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
  usePipelineFlowQuery,
  usePipelineOptionsLazyQuery,
  useConnectPipelineMutation,
  useDisconnectPipelineMutation,
  ConnectedPipelinesByPipelineIdDocument,
  PipelineFlowDocument,

  useValidatorFlowCalculationDirectionQuery,

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
  oldSourceId?: string;
}

interface ISourcesProps {
  pipelineId: string;
  flowCalculationDirection: IPipeline['flowCalculationDirection'];
  editPipeline: IEditRecordFunction;
  authorized: boolean;
}

export default function ConnectedSources({ pipelineId, flowCalculationDirection, editPipeline, authorized }: ISourcesProps) {

  // Total pipeline flow
  const { data: dataPipelineFlow } = usePipelineFlowQuery({ variables: { id: pipelineId, flowCalculationDirection } });
  const { oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, lastInjection, firstProduction, firstInjection } = dataPipelineFlow?.pipelineFlow || {};



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
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId', WellsGroupByPipelineIdDocument, 'WellsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId', PipelineFlowDocument, 'PipelineFlow'],
    onCompleted: ({ connectWell }) => {
      const { error } = connectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectWell = ({ id, pipelineId, oldSourceId }: IDis_ConnectSource) => {
    // Very important this is the first mutation called in this block,
    // as otherwise if you click OK, while not having selected a different injection point,
    // it would first override injection point with itself and then delete it.
    if (oldSourceId) {
      disconnectWell({ variables: { id: oldSourceId } });
    }
    connectWell({ variables: { id, pipelineId } });
  }

  const [disconnectWell] = useDisconnectWellMutation({
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId', WellsGroupByPipelineIdDocument, 'WellsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId', PipelineFlowDocument, 'PipelineFlow'],
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
    variables: { pipelineId },
    fetchPolicy: 'no-cache'
  });
  const loadSalesPointOptions = () => {
    salesPointOptions();
  }

  const [connectSalesPoint] = useConnectSalesPointMutation({
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId', SalesPointsGroupByPipelineIdDocument, 'SalesPointsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId', PipelineFlowDocument, 'PipelineFlow'],
    onCompleted: ({ connectSalesPoint }) => {
      const { error } = connectSalesPoint || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectSalesPoint = ({ id, pipelineId, oldSourceId }: IDis_ConnectSource) => {
    if (oldSourceId) {
      disconnectSalesPoint({ variables: { id: oldSourceId } });
    }
    connectSalesPoint({ variables: { id, pipelineId } });
  }

  const [disconnectSalesPoint] = useDisconnectSalesPointMutation({
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId', SalesPointsGroupByPipelineIdDocument, 'SalesPointsGroupByPipelineId', ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId', PipelineFlowDocument, 'PipelineFlow'],
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
    refetchQueries: [ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId', PipelineFlowDocument, 'PipelineFlow'],
    onCompleted: ({ connectPipeline }) => {
      const { error } = connectPipeline || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectPipeline = ({ id, pipelineId, oldSourceId }: IDis_ConnectSource) => {
    if (oldSourceId) {
      disconnectPipeline({ variables: { id: oldSourceId, pipelineId } });
    }
    connectPipeline({ variables: { id, pipelineId } });
  }

  const [disconnectPipeline] = useDisconnectPipelineMutation({
    refetchQueries: [ConnectedPipelinesByPipelineIdDocument, 'ConnectedPipelinesByPipelineId', PipelineFlowDocument, 'PipelineFlow'],
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

  const { data: dataValidatorFlowCalculationDirection } = useValidatorFlowCalculationDirectionQuery();
  const validator = dataValidatorFlowCalculationDirection?.validators?.flowCalculationDirectionEnum;

  const recordEntryProps = { editRecord: editPipeline, authorized, record: flowCalculationDirection, validator };

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const sourceHeader: ISourceHeaderMap[] = [
    { props: { style: { width: '30px' } } },
    { label: 'Sources', props: { style: { width: '250px' } } },
    { props: { style: { width: '30px' } } },
    { props: { style: { width: '30px' } } },
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

  const totalFlow = [
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
        <thead className='total-flow'>
          <tr>
            <th className='sticky left'></th>
            <th>Total</th>
            <th colSpan={2}></th>
            {totalFlow.map(({ record }, key) => <th key={key}>{record}</th>)}
          </tr>
        </thead>
        <SourceData
          pipelineId={pipelineId}
          label='Wells'
          formId='well'
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
          formId='sales-point'
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
          recordEntryProps={recordEntryProps}
          formId='connected-pipeline'
          data={dataConnectedPipelines?.connectedPipelinesByPipelineId?.pipelinesFlow}
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
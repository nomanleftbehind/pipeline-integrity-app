import { useState } from 'react';
import { IRecord } from '../../fields/RecordEntry';
import SourceData from './SourceData';
import { ModalFieldError } from '../../Modal';
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

  RiskByIdDocument,
  usePipelineOptionsLazyQuery,
} from '../../../graphql/generated/graphql';

export interface ISourceHeaderMap {
  label?: string;
  props?: React.ThHTMLAttributes<HTMLTableCellElement>;
}

export interface ISourceMap {
  record: IRecord | JSX.Element;
  style?: React.HTMLAttributes<HTMLTableCellElement>['style'];
}

export interface IConnectSource {
  id: string;
  pipelineId: string;
}

interface ISourcesProps {
  pipelineId: string;
}

export default function Sources({ pipelineId }: ISourcesProps) {

  // Well queries and mutations
  const { data: dataWells } = useWellsByPipelineIdQuery({ variables: { pipelineId } });
  const [wellOptions, { data: dataWellOptions }] = useWellOptionsLazyQuery({
    fetchPolicy: 'no-cache'
  });
  const loadWellOptions = () => {
    wellOptions();
  }

  const [connectWell] = useConnectWellMutation({
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ connectWell }) => {
      const { error } = connectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectWell = ({ id, pipelineId }: IConnectSource) => {
    connectWell({ variables: { id, pipelineId } });
  }

  const [disconnectWell] = useDisconnectWellMutation({
    refetchQueries: [WellsByPipelineIdDocument, 'WellsByPipelineId', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ disconnectWell }) => {
      const { error } = disconnectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleDisconnectWell = ({ id, pipelineId }: IConnectSource) => {
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
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ connectSalesPoint }) => {
      const { error } = connectSalesPoint || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleConnectSalesPoint = ({ id, pipelineId }: IConnectSource) => {
    connectSalesPoint({ variables: { id, pipelineId } });
  }

  const [disconnectSalesPoint] = useDisconnectSalesPointMutation({
    refetchQueries: [SalesPointsByPipelineIdDocument, 'SalesPointsByPipelineId', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ disconnectSalesPoint }) => {
      const { error } = disconnectSalesPoint || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const handleDisconnectSalesPoint = ({ id, pipelineId }: IConnectSource) => {
    disconnectSalesPoint({ variables: { id } });
  }




  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const wellHeader: ISourceHeaderMap[] = [
    {},
    { label: 'Source', props: { style: { width: '250px' } } },
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
            {wellHeader.map(({ label, props }, i) => <th key={i} {...props}>{label}</th>)}
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
      </table>
    </>
  );
}
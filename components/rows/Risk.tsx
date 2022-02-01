import RiskProperties from '../fields/PipelineProperties';
import { IPipeline } from './RenderPipeline';

import {
  useRiskByIdQuery,
  useValidatorsRiskQuery,
  useAddRiskMutation,
  useDeleteRiskMutation,
  RiskByIdDocument,
  usePipelineFlowQuery,
} from '../../graphql/generated/graphql';

import { ITable } from './PipelineData';


export interface IRiskProps {
  id: string;
  open: boolean;
  flowCalculationDirection: IPipeline['flowCalculationDirection'];
  substance: IPipeline['substance'];
  status: IPipeline['status'];
  type: IPipeline['type'];
  material: IPipeline['material'];
}


export default function Risk({ id, open, flowCalculationDirection, substance, status, type, material }: IRiskProps) {

  const { data: dataPipelineFlow, loading: loadingPipelineFlow, error: errorPipelineFlow } = usePipelineFlowQuery({ variables: { idList: [id], flowCalculationDirection } });

  const { oil, water, gas } = dataPipelineFlow?.pipelineFlow?.[0] || {};

  const { data, loading, error } = useRiskByIdQuery({ variables: { id, substance, status, type, material, oil, water, gas } });
  const { data: dataValidatorsRisk } = useValidatorsRiskQuery();
  const [addRisk, { data: dataAddRisk }] = useAddRiskMutation({ variables: { id }, refetchQueries: [RiskByIdDocument, 'RiskById'] });
  const [deleteRisk, { data: dataDeleteRisk }] = useDeleteRiskMutation({ variables: { id }, refetchQueries: [RiskByIdDocument, 'RiskById'] });

  const table: ITable = 'risk';

  const { id: riskId, arielReview, environmentProximityTo, geotechnicalFacingS1, geotechnicalHeightS1, geotechnicalSlopeAngleS1, geotechnicalFacingS2, geotechnicalHeightS2, geotechnicalSlopeAngleS2,
    dateSlopeChecked, oilReleaseCost, gasReleaseCost, probabilityGeo, probabilityInterior, repairTimeDays, releaseTimeDays, costPerM3Released, riskPeople, enviroRisk, assetRisk, safeguardExternalCoating, safeguardInternalProtection, createdBy, createdAt, updatedAt } = data?.riskById || {};
  const { environmentProximityToEnum, geotechnicalFacingEnum } = dataValidatorsRisk?.validators || {};

  const riskProperties = [
    { columnName: 'arielReview', record: arielReview, table },
    { columnName: 'environmentProximityTo', record: environmentProximityTo, validator: environmentProximityToEnum, table },
    { columnName: 'geotechnicalFacingS1', record: geotechnicalFacingS1, validator: geotechnicalFacingEnum, table },
    { columnName: 'geotechnicalHeightS1', record: geotechnicalHeightS1, table },
    { columnName: 'geotechnicalSlopeAngleS1', record: geotechnicalSlopeAngleS1, table },
    { columnName: 'geotechnicalFacingS2', record: geotechnicalFacingS2, validator: geotechnicalFacingEnum, table },
    { columnName: 'geotechnicalHeightS2', record: geotechnicalHeightS2, table },
    { columnName: 'geotechnicalSlopeAngleS2', record: geotechnicalSlopeAngleS2, table },
    { columnName: 'dateSlopeChecked', record: dateSlopeChecked, table },
    { columnName: 'oilReleaseCost', record: oilReleaseCost, table },
    { columnName: 'gasReleaseCost', record: gasReleaseCost, table },
    { columnName: 'probabilityGeo', record: probabilityGeo, table },
    { columnName: 'probabilityInterior', record: probabilityInterior },
    { columnName: 'repairTimeDays', record: repairTimeDays, table },
    { columnName: 'releaseTimeDays', record: releaseTimeDays, table },
    { columnName: 'costPerM3Released', record: costPerM3Released },
    { columnName: 'riskPeople', record: riskPeople, table },
    { columnName: 'enviroRisk', record: enviroRisk },
    { columnName: 'assetRisk', record: assetRisk },
    { columnName: 'safeguardExternalCoating', record: safeguardExternalCoating, table },
    { columnName: 'safeguardInternalProtection', record: safeguardInternalProtection, table },
    { columnName: 'createdBy', record: createdBy?.email, table },
    { columnName: 'createdAt', record: createdAt, table },
    { columnName: 'updatedAt', record: updatedAt, table },
  ];

  return (
    <RiskProperties
      id={riskId}
      open={open}
      pipelineProperties={riskProperties}
      propertiesName='Risk'
      addProperties={addRisk}
      deleteProperties={deleteRisk}
    />
  );
}
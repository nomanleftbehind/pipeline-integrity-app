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
import { IPipelineProperty } from '../fields/PipelineProperties';


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

  if (data?.riskById && dataValidatorsRisk?.validators) {
    const { id, arielReview, environmentProximityTo, geotechnicalFacingS1, geotechnicalHeightS1, geotechnicalSlopeAngleS1, geotechnicalFacingS2, geotechnicalHeightS2, geotechnicalSlopeAngleS2,
      dateSlopeChecked, oilReleaseCost, gasReleaseCost, probabilityGeo, probabilityInterior, repairTimeDays, releaseTimeDays, costPerM3Released, riskPeople, enviroRisk, assetRisk, safeguardExternalCoating, safeguardInternalProtection, createdBy, createdAt, updatedAt } = data.riskById;
    const { environmentProximityToEnum, geotechnicalFacingEnum } = dataValidatorsRisk.validators;

    const riskProperties: IPipelineProperty[] = [
      { columnName: 'arielReview', record: arielReview, columnType: 'boolean', table },
      { columnName: 'environmentProximityTo', record: environmentProximityTo, columnType: 'string', validator: environmentProximityToEnum, table },
      { columnName: 'geotechnicalFacingS1', record: geotechnicalFacingS1, columnType: 'string', validator: geotechnicalFacingEnum, table },
      { columnName: 'geotechnicalHeightS1', record: geotechnicalHeightS1, columnType: 'number', table },
      { columnName: 'geotechnicalSlopeAngleS1', record: geotechnicalSlopeAngleS1, columnType: 'number', table },
      { columnName: 'geotechnicalFacingS2', record: geotechnicalFacingS2, columnType: 'string', validator: geotechnicalFacingEnum, table },
      { columnName: 'geotechnicalHeightS2', record: geotechnicalHeightS2, columnType: 'number', table },
      { columnName: 'geotechnicalSlopeAngleS2', record: geotechnicalSlopeAngleS2, columnType: 'number', table },
      { columnName: 'dateSlopeChecked', record: dateSlopeChecked, columnType: 'date', table },
      { columnName: 'oilReleaseCost', record: oilReleaseCost, columnType: 'number', table },
      { columnName: 'gasReleaseCost', record: gasReleaseCost, columnType: 'number', table },
      { columnName: 'probabilityGeo', record: probabilityGeo, columnType: 'number', table },
      { columnName: 'probabilityInterior', record: probabilityInterior, columnType: 'number' },
      { columnName: 'repairTimeDays', record: repairTimeDays, table, columnType: 'number' },
      { columnName: 'releaseTimeDays', record: releaseTimeDays, columnType: 'number', table },
      { columnName: 'costPerM3Released', record: costPerM3Released, columnType: 'number' },
      { columnName: 'riskPeople', record: riskPeople, columnType: 'number', table },
      { columnName: 'enviroRisk', record: enviroRisk, columnType: 'number' },
      { columnName: 'assetRisk', record: assetRisk, columnType: 'number' },
      { columnName: 'safeguardExternalCoating', record: safeguardExternalCoating, columnType: 'boolean', table },
      { columnName: 'safeguardInternalProtection', record: safeguardInternalProtection, columnType: 'boolean', table },
      { columnName: 'createdBy', record: createdBy?.email, columnType: 'string', table },
      { columnName: 'createdAt', record: createdAt, columnType: 'date', table },
      { columnName: 'updatedAt', record: updatedAt, columnType: 'date', table },
    ];

    return (
      <RiskProperties
        id={id}
        open={open}
        createdById={createdBy.id}
        pipelineProperties={riskProperties}
        propertiesName='Risk'
        addProperties={addRisk}
        deleteProperties={deleteRisk}
      />
    );
  } else return null
}
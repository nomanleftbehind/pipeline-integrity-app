import RiskProperties from '../fields/PipelineProperties';

import {
  useRiskByIdQuery,
  useValidatorsRiskQuery,
  useAddRiskMutation,
  useDeleteRiskMutation,
  RiskByIdDocument,
  RiskByIdQuery

} from '../../graphql/generated/graphql';

import { ITable } from './PipelineData';


export interface IRiskProps {
  id: string;
  open: boolean;
}


export default function Risk({ id, open }: IRiskProps) {

  const { data, loading, error } = useRiskByIdQuery({ variables: { id } });
  const { data: dataValidatorsRisk } = useValidatorsRiskQuery();
  const [addRisk, { data: dataAddRisk }] = useAddRiskMutation({ variables: { id }, refetchQueries: [RiskByIdDocument, 'RiskById'] });
  const [deleteRisk, { data: dataDeleteRisk }] = useDeleteRiskMutation({ variables: { id }, refetchQueries: [RiskByIdDocument, 'RiskById'] });

  const table: ITable = 'risk';

  const { id: riskId, arielReview, environmentProximityTo, geotechnicalFacingS1, geotechnicalHeightS1, geotechnicalSlopeAngleS1, geotechnicalFacingS2, geotechnicalHeightS2, geotechnicalSlopeAngleS2,
    dateSlopeChecked, oilReleaseCost, gasReleaseCost, probabilityGeo, repairTimeDays, releaseTimeDays, riskPeople, safeguardExternalCoating, safeguardInternalProtection, createdBy, createdAt, updatedAt } = data && data.riskById && data.riskById[0] || {};
  const { environmentProximityToEnum, geotechnicalFacingEnum } = dataValidatorsRisk && dataValidatorsRisk.validators || {};

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
    { columnName: 'repairTimeDays', record: repairTimeDays, table },
    { columnName: 'releaseTimeDays', record: releaseTimeDays, table },
    { columnName: 'riskPeople', record: riskPeople, table },
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
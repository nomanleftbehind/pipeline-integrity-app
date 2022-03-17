import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IPipeline } from './RenderPipeline';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import { IMechanicalPropertyRecordEntryMap as IRiskPropertyRecordEntryMap } from './MechanicalProperties';

import {
  useRiskByIdLazyQuery,
  useValidatorsRiskQuery,
  useEditRiskMutation,
  useAddRiskMutation,
  useDeleteRiskMutation,
  RiskByIdDocument,
  usePipelineFlowQuery,
} from '../../graphql/generated/graphql';


export interface IRiskProps {
  id: string;
  flowCalculationDirection: IPipeline['flowCalculationDirection'];
  currentSubstance: IPipeline['currentSubstance'];
  currentStatus: IPipeline['currentStatus'];
  type: IPipeline['type'];
  material: IPipeline['material'];
  firstLicenseDate: IPipeline['firstLicenseDate'];
}


export default function Risk({ id, flowCalculationDirection, currentSubstance, currentStatus, type, material, firstLicenseDate }: IRiskProps) {

  const { user } = useAuth() || {};
  const { role } = user || {};
  const authorized = role === 'ADMIN' || role === 'ENGINEER';

  usePipelineFlowQuery({
    variables: { idList: [id], flowCalculationDirection },
    onCompleted: ({ pipelineFlow }) => {
      const { oil, water, gas } = pipelineFlow?.[0] || {};
      riskById({ variables: { id, substance: currentSubstance, status: currentStatus, type, material, firstLicenseDate, oil, water, gas } })
    },
    onError: ({ name, message }) => {
      riskById({ variables: { id, substance: currentSubstance, status: currentStatus, type, material, firstLicenseDate } });
      setFieldError({
        field: name,
        message
      });
    }
  });

  const [riskById, { data }] = useRiskByIdLazyQuery({
    onError: ({ name, message }) => {
      setFieldError({
        field: name,
        message
      });
    }
  });

  const { data: dataValidatorsRisk } = useValidatorsRiskQuery();
  const [editRisk] = useEditRiskMutation({
    refetchQueries: [RiskByIdDocument, 'RiskById'],
    onCompleted: ({ editRisk }) => {
      const { error } = editRisk || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addRisk] = useAddRiskMutation({
    variables: { id },
    refetchQueries: [RiskByIdDocument, 'RiskById'],
    onCompleted: ({ addRisk }) => {
      const { error } = addRisk || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deleteRisk] = useDeleteRiskMutation({
    variables: { id },
    refetchQueries: [RiskByIdDocument, 'RiskById'],
    onCompleted: ({ deleteRisk }) => {
      const { error } = deleteRisk || {};
      if (error) {
        setFieldError(error);
      }
    }
  });


  const editRecord = ({ id, columnName, columnType, newRecord }: IEditRecord) => {
    const switchNewRecord = () => {
      switch (columnType) {
        case 'number':
          if (newRecord === null) {
            return null;
          }
          return Number(newRecord);
        case 'date':
          if (newRecord && typeof newRecord !== 'boolean') {
            const date = new Date(newRecord);
            return date.toISOString();
          }
        default:
          return newRecord;
      }
    }
    newRecord = switchNewRecord();
    editRisk({ variables: { id, [columnName]: newRecord } });
  }

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const addRecord = () => {
    addRisk();
  }

  const deleteRecord = () => {
    deleteRisk();
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }


  if (data?.riskById) {
    const { id, aerialReview, environmentProximityTo, geotechnicalFacingS1, geotechnicalHeightS1, geotechnicalSlopeAngleS1, geotechnicalFacingS2, geotechnicalHeightS2, geotechnicalSlopeAngleS2,
      dateSlopeChecked, oilReleaseCost, gasReleaseCost, probabilityGeo, probabilityInterior, probabilityExterior, repairTimeDays, releaseTimeDays, costPerM3Released, riskPeople, enviroRisk, assetRisk, safeguardExternalCoating, safeguardInternalProtection, createdBy, createdAt, updatedBy, updatedAt } = data.riskById;
    const { environmentProximityToEnum, geotechnicalFacingEnum } = dataValidatorsRisk?.validators || {};

    const riskProperties: IRiskPropertyRecordEntryMap[] = [
      { columnName: 'aerialReview', record: aerialReview, columnType: 'boolean', label: 'Aerial Review', nullable: true, editRecord },
      { columnName: 'environmentProximityTo', record: environmentProximityTo, columnType: 'string', validator: environmentProximityToEnum, label: 'Environment Proximity To', nullable: true, editRecord },
      { columnName: 'geotechnicalSlopeAngleS1', record: geotechnicalSlopeAngleS1, columnType: 'number', label: 'Geotechnical Slope Angle S1', nullable: true, editRecord },
      { columnName: 'geotechnicalFacingS1', record: geotechnicalFacingS1, columnType: 'string', validator: geotechnicalFacingEnum, label: 'Geotechnical Facing S1', nullable: true, editRecord },
      { columnName: 'geotechnicalHeightS1', record: geotechnicalHeightS1, columnType: 'number', label: 'Geotechnical Height S1', nullable: true, editRecord },
      { columnName: 'geotechnicalSlopeAngleS2', record: geotechnicalSlopeAngleS2, columnType: 'number', label: 'Geotechnical Slope Angle S2', nullable: true, editRecord },
      { columnName: 'geotechnicalFacingS2', record: geotechnicalFacingS2, columnType: 'string', validator: geotechnicalFacingEnum, label: 'Geotechnical Facing S2', nullable: true, editRecord },
      { columnName: 'geotechnicalHeightS2', record: geotechnicalHeightS2, columnType: 'number', label: 'Geotechnical Height S2', nullable: true, editRecord },
      { columnName: 'dateSlopeChecked', record: dateSlopeChecked, columnType: 'date', label: 'Date Slope Checked', nullable: true, editRecord },
      { columnName: 'repairTimeDays', record: repairTimeDays, columnType: 'number', label: 'Repair Time Days', nullable: true, editRecord },
      { columnName: 'releaseTimeDays', record: releaseTimeDays, columnType: 'number', label: 'Release Time Days', nullable: true, editRecord },
      { columnName: 'costPerM3Released', record: costPerM3Released, columnType: 'number', label: 'Cost Per m³ Released', nullable: true },
      { columnName: 'oilReleaseCost', record: oilReleaseCost, columnType: 'number', label: 'Oil Release Cost', nullable: true, editRecord },
      { columnName: 'gasReleaseCost', record: gasReleaseCost, columnType: 'number', label: 'Gas Release Cost', nullable: true, editRecord },
      { columnName: 'riskPeople', record: riskPeople, columnType: 'number', label: 'Risk People', nullable: true, editRecord },
      { columnName: 'enviroRisk', record: enviroRisk, columnType: 'number', label: 'Enviro Risk', nullable: true },
      { columnName: 'assetRisk', record: assetRisk, columnType: 'number', label: 'Asset Risk', nullable: true },
      { columnName: 'probabilityGeo', record: probabilityGeo, columnType: 'number', label: 'Probability Geo', nullable: true, editRecord },
      { columnName: 'probabilityInterior', record: probabilityInterior, columnType: 'number', label: 'Probability Interior', nullable: true },
      { columnName: 'probabilityExterior', record: probabilityExterior, columnType: 'number', label: 'Probability Exterior', nullable: true },
      { columnName: 'safeguardExternalCoating', record: safeguardExternalCoating, columnType: 'boolean', label: 'Safeguard External Coating', nullable: true, editRecord },
      { columnName: 'safeguardInternalProtection', record: safeguardInternalProtection, columnType: 'boolean', label: 'Safeguard Internal Protection', nullable: true, editRecord },
      { columnName: 'createdBy', record: createdBy.email, columnType: 'string', label: 'Created By', nullable: false },
      { columnName: 'createdAt', record: createdAt, columnType: 'date', label: 'Created At', nullable: false },
      { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string', label: 'Updated By', nullable: false },
      { columnName: 'updatedAt', record: updatedAt, columnType: 'date', label: 'Updated At', nullable: false },
    ];

    let gridRow = 0;

    return (
      <>
        {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
          fieldError={fieldError}
          hideFieldError={hideFieldErrorModal}
        />}
        <div className='risk'>
          {riskProperties.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
            let gridColumn = i;
            gridColumn = gridColumn % 3 + 1;
            if (gridColumn === 1) {
              gridRow += 1;
            }
            return (
              <div key={i} style={{ gridColumn, gridRow }}>
                <div className='property-header'>{label}</div>
                <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return null;
}
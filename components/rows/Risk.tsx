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
      riskById({ variables: { id, currentSubstance, currentStatus, type, material, firstLicenseDate, oil, water, gas } })
    },
    onError: ({ name, message }) => {
      riskById({ variables: { id, currentSubstance, currentStatus, type, material, firstLicenseDate } });
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
    const { id, aerialReview, environmentProximityTo, geotechnicalFacingS1, geotechnicalHeightS1, geotechnicalSlopeAngleS1, geotechnicalFacingS2, geotechnicalHeightS2, geotechnicalSlopeAngleS2, dateSlopeChecked,
      riskPeople, enviroRisk, assetRisk, probabilityGeo, probabilityInterior, probabilityExterior, geoRiskPotential, internalRiskPotential, externalRiskPotential,
      oilReleaseCost, gasReleaseCost, repairTimeDays, releaseTimeDays, costPerM3Released, safeguardExternalCoating, safeguardInternalProtection, createdBy, createdAt, updatedBy, updatedAt } = data.riskById;
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
      { columnName: 'geoRiskPotential', record: geoRiskPotential, columnType: 'number', label: 'Geo Risk Potential', nullable: true },
      { columnName: 'internalRiskPotential', record: internalRiskPotential, columnType: 'number', label: 'Internal Risk Potential', nullable: true },
      { columnName: 'externalRiskPotential', record: externalRiskPotential, columnType: 'number', label: 'External Risk Potential', nullable: true },
      { columnName: 'safeguardExternalCoating', record: safeguardExternalCoating, columnType: 'boolean', label: 'Safeguard External Coating', nullable: true, editRecord },
      { columnName: 'safeguardInternalProtection', record: safeguardInternalProtection, columnType: 'boolean', label: 'Safeguard Internal Protection', nullable: true, editRecord },
      { columnName: 'createdBy', record: createdBy.email, columnType: 'string', label: 'Created By', nullable: false },
      { columnName: 'createdAt', record: createdAt, columnType: 'date', label: 'Created At', nullable: false },
      { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string', label: 'Updated By', nullable: false },
      { columnName: 'updatedAt', record: updatedAt, columnType: 'date', label: 'Updated At', nullable: false },
    ];

    let gridRow = 0;

    return (
      <div className='risk'>
        {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
          fieldError={fieldError}
          hideFieldError={hideFieldErrorModal}
        />}
        <div className='risk-fields'>
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
        <div>
          <RiskMatrix
            label='Geo Risk Potential'
          />
        </div>
      </div>
    );
  }
  return null;
}


interface IRiskMatrixProps {
  label: string;
}

const RiskMatrix = ({ label }: IRiskMatrixProps) => {

  let gridRow = 3;
  return (
    <div className='risk-matrix'>
      <div style={{ gridColumn: '1 / 8', gridRow: 1, backgroundColor: 'white', fontSize: 'small', fontWeight: 'bold' }}>{label}</div>
      <div style={{ gridColumn: '3 / 8', gridRow: 2, border: 'black 1px solid' }}>Consequence</div>
      <div className='risk consequence-1' style={{ gridColumn: 3, gridRow: 3, border: 'black 1px solid' }}>1 Negligible</div>
      <div className='risk consequence-2' style={{ gridColumn: 4, gridRow: 3, border: 'black 1px solid' }}>2 Minor</div>
      <div className='risk consequence-3' style={{ gridColumn: 5, gridRow: 3, border: 'black 1px solid' }}>3 Moderate</div>
      <div className='risk consequence-4' style={{ gridColumn: 6, gridRow: 3, border: 'black 1px solid' }}>4 Major</div>
      <div className='risk consequence-5' style={{ gridColumn: 7, gridRow: 3, border: 'black 1px solid' }}>5 Catastrophic</div>
      <div className='risk likelihood-5' style={{ gridColumn: 2, gridRow: 4, border: 'black 1px solid' }}>5 Frequent</div>
      <div className='risk likelihood-4' style={{ gridColumn: 2, gridRow: 5, border: 'black 1px solid' }}>4 Likely</div>
      <div className='risk likelihood-3' style={{ gridColumn: 2, gridRow: 6, border: 'black 1px solid' }}>3 Possible</div>
      <div className='risk likelihood-2' style={{ gridColumn: 2, gridRow: 7, border: 'black 1px solid' }}>2 Unlikely</div>
      <div className='risk likelihood-1' style={{ gridColumn: 2, gridRow: 8, border: 'black 1px solid' }}>1 Rare</div>
      <div style={{ gridColumn: 1, gridRow: '4 / 9', border: 'black 1px solid', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Likelihood</div>
      {Array.from(Array(25).keys()).map((gridColumn, i) => {
        gridColumn = gridColumn % 5 + 3;
        if (gridColumn === 3) {
          gridRow += 1;
        }
        const likelihood = 9 - gridRow;
        const consequence = gridColumn - 2;
        const riskPotential = likelihood * consequence;

        let backgroundColor;
        if (riskPotential < 4) {
          backgroundColor = 'green';
        }
        if (riskPotential >= 4 && riskPotential < 8) {
          backgroundColor = 'yellow';
        }
        if (riskPotential > 7 && riskPotential < 12) {
          backgroundColor = 'orange';
        }
        if (riskPotential > 11) {
          backgroundColor = 'red';
        }
        const className = `risk likelihood-${likelihood} consequence-${consequence}`
        return <div key={i} className={className} style={{ gridColumn, gridRow, backgroundColor, border: 'black 1px solid' }}></div>
      })}
    </div>
  );
}
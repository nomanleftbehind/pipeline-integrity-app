import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IPipeline } from './RenderPipeline';
import RecordEntry, { IEditRecord, IEditRecordFunction } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import { IMechanicalPropertyRecordEntryMap as IRiskPropertyRecordEntryMap } from './MechanicalProperties';

import {
  useRiskByIdQuery,
  useValidatorsRiskQuery,
  useEditRiskMutation,
  useAddRiskMutation,
  useDeleteRiskMutation,
  RiskByIdDocument,
} from '../../graphql/generated/graphql';


export interface IRiskProps {
  id: string;
  flowCalculationDirection: IPipeline['flowCalculationDirection'];
  currentSubstance: IPipeline['currentSubstance'];
  currentStatus: IPipeline['currentStatus'];
  editPipeline: IEditRecordFunction;
  type: IPipeline['type'];
  material: IPipeline['material'];
  firstLicenseDate: IPipeline['firstLicenseDate'];
}


export default function Risk({ id, flowCalculationDirection, currentSubstance, currentStatus, type, material, firstLicenseDate, editPipeline }: IRiskProps) {

  const { user } = useAuth() || {};
  const { role } = user || {};
  const authorized = role === 'ADMIN' || role === 'ENGINEER';

  const { data } = useRiskByIdQuery({
    variables: { id },
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
      riskPeople, consequenceEnviro, consequenceAsset, conequenceMax, probabilityGeo, probabilityInterior, probabilityExterior, riskPotentialGeo, riskPotentialInternal, riskPotentialExternal,
      safeguardInternalProtection, safeguardPigging, safeguardChemicalInhibition, probabilityInteriorWithSafeguards, riskPotentialInternalWithSafeguards,
      oilReleaseCost, gasReleaseCost, repairTimeDays, releaseTimeDays, costPerM3Released, safeguardExternalCoating, createdBy, createdAt, updatedBy, updatedAt } = data.riskById;
    const { environmentProximityToEnum, geotechnicalFacingEnum, typeEnum, materialEnum } = dataValidatorsRisk?.validators || {};

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
      { columnName: 'createdBy', record: createdBy.email, columnType: 'string', label: 'Created By', nullable: false },
      { columnName: 'createdAt', record: createdAt, columnType: 'date', label: 'Created At', nullable: false },
      { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string', label: 'Updated By', nullable: false },
      { columnName: 'updatedAt', record: updatedAt, columnType: 'date', label: 'Updated At', nullable: false },
    ];

    const consequenceFields: IRiskPropertyRecordEntryMap[] = [
      { columnName: 'riskPeople', record: riskPeople, columnType: 'number', label: 'People', nullable: true, editRecord },
      { columnName: 'consequenceEnviro', record: consequenceEnviro, columnType: 'number', label: 'Environment', nullable: true },
      { columnName: 'consequenceAsset', record: consequenceAsset, columnType: 'number', label: 'Assets', nullable: true },
      { columnName: 'conequenceMax', record: conequenceMax, columnType: 'number', label: 'Used Consequence', nullable: true },
    ];

    const probabilityInteriorFields: IRiskPropertyRecordEntryMap[] = [
      { columnName: 'type', record: type, columnType: 'string', label: 'Pipeline Type', nullable: true, validator: typeEnum, editRecord: editPipeline },
      { columnName: 'material', record: material, columnType: 'string', label: 'Pipeline Material', nullable: true, validator: materialEnum, editRecord: editPipeline },
      { columnName: 'safeguardInternalProtection', record: safeguardInternalProtection, columnType: 'boolean', label: 'Internal Protection Safeguard', nullable: true, editRecord },
      { columnName: 'safeguardPigging', record: safeguardPigging, columnType: 'number', label: 'Pigging Safeguard', nullable: true },
      { columnName: 'safeguardChemicalInhibition', record: safeguardChemicalInhibition, columnType: 'number', label: 'Chemical Inhibition Safeguard', nullable: true },
    ];

    const probabilityExteriorFields: IRiskPropertyRecordEntryMap[] = [
      { columnName: 'safeguardExternalCoating', record: safeguardExternalCoating, columnType: 'boolean', label: 'External Coating Safeguard', nullable: true, editRecord },
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
            gridColumn = gridColumn % 2 + 1;
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
        <div className='risk-matrix-wrapper'>
          <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '0 0 4px 0', paddingBottom: '4px' }}>Consequences</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
            {consequenceFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
              return (
                <div key={i} style={{ width: '180px', padding: '4px' }}>
                  <div className='property-header'>{label}</div>
                  <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                </div>
              );
            })}
          </div>

          <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '8px 0 4px 0', paddingBottom: '4px' }}>Geo Risk Potential</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
            <div style={{ width: '200px', padding: '4px' }}>
              <div className='property-header'>Probability Geo</div>
              <RecordEntry id={id} createdById={createdBy.id} columnName='probabilityGeo' columnType='number' nullable={true} record={probabilityGeo} authorized={authorized} editRecord={editRecord} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px', margin: '4px 0 4px 0' }}>
            <RiskMatrix
              label='Geo Risk Potential'
              currentProbability={probabilityGeo}
              currentConsequence={conequenceMax}
              currentRiskPotential={riskPotentialGeo}
            />
          </div>

          <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '8px 0 4px 0', paddingBottom: '4px' }}>Internal Risk Potential</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
            {probabilityInteriorFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
              return (
                <div key={i} style={{ width: '120px', padding: '4px' }}>
                  <div className='property-header'>{label}</div>
                  <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px', margin: '4px 0 4px 0' }}>
            <RiskMatrix
              label='Internal Risk Potential'
              currentProbability={probabilityInterior}
              currentConsequence={conequenceMax}
              currentRiskPotential={riskPotentialInternal}
            />
            <RiskMatrix
              label='Internal Risk Potential with Safeguards'
              currentProbability={probabilityInteriorWithSafeguards}
              currentConsequence={conequenceMax}
              currentRiskPotential={riskPotentialInternalWithSafeguards}
            />
          </div>

          <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '8px 0 4px 0', paddingBottom: '4px' }}>External Risk Potential</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
            {probabilityExteriorFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
              return (
                <div key={i} style={{ width: '200px', padding: '4px' }}>
                  <div className='property-header'>{label}</div>
                  <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px', margin: '4px 0 4px 0' }}>
            <RiskMatrix
              label='External Risk Potential'
              currentProbability={probabilityExterior}
              currentConsequence={conequenceMax}
              currentRiskPotential={riskPotentialExternal}
            />
          </div>

        </div>
      </div>
    );
  }
  return null;
}


interface IRiskMatrixProps {
  label: string;
  currentProbability?: number | null;
  currentConsequence?: number | null;
  currentRiskPotential?: number | null;
}

const RiskMatrix = ({ label, currentProbability, currentConsequence, currentRiskPotential }: IRiskMatrixProps) => {

  let gridRow = 3;
  return (

    <div className='risk-matrix'>
      <div style={{ gridColumn: '1 / 8', gridRow: 1, backgroundColor: 'white', fontSize: 'small', fontWeight: 'bold' }}>{label}</div>
      <div style={{ gridColumn: '1 / 3', gridRow: '2 / 4' }}></div>
      <div style={{ gridColumn: '3 / 8', gridRow: 2 }}>Consequence</div>
      <div className={currentConsequence === 1 ? 'consequence' : undefined} style={{ gridColumn: 3, gridRow: 3 }}>1 Negligible</div>
      <div className={currentConsequence === 2 ? 'consequence' : undefined} style={{ gridColumn: 4, gridRow: 3 }}>2 Minor</div>
      <div className={currentConsequence === 3 ? 'consequence' : undefined} style={{ gridColumn: 5, gridRow: 3 }}>3 Moderate</div>
      <div className={currentConsequence === 4 ? 'consequence' : undefined} style={{ gridColumn: 6, gridRow: 3 }}>4 Major</div>
      <div className={currentConsequence === 5 ? 'consequence' : undefined} style={{ gridColumn: 7, gridRow: 3 }}>5 Catastrophic</div>
      <div className={currentProbability === 5 ? 'probability' : undefined} style={{ gridColumn: 2, gridRow: 4 }}>5 Frequent</div>
      <div className={currentProbability === 4 ? 'probability' : undefined} style={{ gridColumn: 2, gridRow: 5 }}>4 Likely</div>
      <div className={currentProbability === 3 ? 'probability' : undefined} style={{ gridColumn: 2, gridRow: 6 }}>3 Possible</div>
      <div className={currentProbability === 2 ? 'probability' : undefined} style={{ gridColumn: 2, gridRow: 7 }}>2 Unlikely</div>
      <div className={currentProbability === 1 ? 'probability' : undefined} style={{ gridColumn: 2, gridRow: 8 }}>1 Rare</div>
      <div style={{ gridColumn: 1, gridRow: '4 / 9', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Probability</div>
      {Array.from(Array(25).keys()).map((gridColumn, i) => {
        gridColumn = gridColumn % 5 + 3;
        if (gridColumn === 3) {
          gridRow += 1;
        }
        const probability = 9 - gridRow;
        const consequence = gridColumn - 2;
        const riskPotential = probability * consequence;

        let backgroundColor =
          riskPotential < 4 ? 'green' :
            riskPotential >= 4 && riskPotential < 8 ? 'yellow' :
              riskPotential > 7 && riskPotential < 12 ? 'orange' :
                riskPotential > 11 ? 'red' : undefined;
        const className =
          probability === currentProbability && consequence === currentConsequence ? 'probability consequence' :
            probability === currentProbability && consequence < (currentConsequence || 6) ? 'probability' :
              consequence === currentConsequence && probability > (currentProbability || 0) ? 'consequence' : undefined;

        const riskPotentialDisplay = riskPotential === currentRiskPotential && probability === currentProbability && consequence === currentConsequence ? currentRiskPotential : undefined;

        return <div key={i} className={className} style={{ gridColumn, gridRow, backgroundColor }}>{riskPotentialDisplay}</div>
      })}
    </div>
  );
}
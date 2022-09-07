import { useState } from 'react';
import { IPipeline } from './RenderPipeline';
import RecordEntry, { IEditRecord, IEditRecordFunction } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import { IPipelinePropertyRecordEntryMap as IRiskPropertyRecordEntryMap } from './PipelineProperties';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { openModal } from './RenderPipeline';
import { IValidatorsRisk } from './PipelineData';

import {
  useRiskByIdQuery,
  useEditRiskMutation,
  useAddRiskMutation,
  useDeleteRiskMutation,
  RiskByIdDocument,
} from '../../graphql/generated/graphql';


type IRiskProps = Pick<IPipeline, 'id' | 'license' | 'segment' | 'flowCalculationDirection' | 'currentSubstance' | 'currentStatus' | 'firstLicenseDate'> & {
  editPipeline: IEditRecordFunction;
  validators?: IValidatorsRisk;
};


export default function Risk({ id, license, segment, flowCalculationDirection, currentSubstance, currentStatus, firstLicenseDate, editPipeline, validators }: IRiskProps) {

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);
  const [confirmDeleteRiskModal, setConfirmDeleteRiskModal] = useState(false);

  const { data } = useRiskByIdQuery({
    variables: { id },
    onError: ({ name, message }) => {
      setFieldError({
        field: name,
        message
      });
    }
  });

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
        case 'boolean':
          if (newRecord === 'true') {
            return true;
          }
          if (newRecord === 'false') {
            return false;
          }
        default:
          return newRecord;
      }
    }
    newRecord = switchNewRecord();
    editRisk({ variables: { data: { id, [columnName]: newRecord } } });
  }


  const addRecord = () => {
    addRisk();
  }

  const deleteRecord = () => {
    setConfirmDeleteRiskModal(false);
    deleteRisk();
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const renderRisk = () => {
    if (data?.riskById) {

      const { id, aerialReview, environmentId, consequencePeople, consequenceEnviro, consequenceAsset, consequenceMax, probabilityGeo, probabilityInterior,
        probabilityExterior, riskPotentialGeo, riskPotentialInternal, riskPotentialExternal,
        safeguardInternalProtection, safeguardPigging, safeguardChemicalInhibition, probabilityInteriorWithSafeguards, riskPotentialInternalWithSafeguards,
        oilReleaseCost, gasReleaseCost, repairTimeDays, releaseTimeDays, costPerM3Released,
        safeguardExternalCoating, safeguardCathodic, probabilityExteriorWithSafeguards, riskPotentialExternalWithSafeguards,
        createdBy, createdAt, updatedBy, updatedAt, comment, authorized } = data.riskById;
      const { riskEnvironmentEnum } = validators || {};

      const riskProperties: IRiskPropertyRecordEntryMap[] = [
        { columnName: 'aerialReview', record: aerialReview, columnType: 'boolean', label: 'Aerial Review', nullable: true, editRecord },
        { columnName: 'environmentId', record: environmentId, columnType: 'string', validator: riskEnvironmentEnum, label: 'Environment Proximity To', nullable: true, editRecord },
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
        { columnName: 'consequencePeople', record: consequencePeople, columnType: 'number', label: 'People', nullable: true, editRecord },
        { columnName: 'consequenceEnviro', record: consequenceEnviro, columnType: 'number', label: 'Environment', nullable: true },
        { columnName: 'consequenceAsset', record: consequenceAsset, columnType: 'number', label: 'Assets', nullable: true },
        { columnName: 'consequenceMax', record: consequenceMax, columnType: 'number', label: 'Used Consequence', nullable: true },
      ];

      const probabilityInteriorFields: IRiskPropertyRecordEntryMap[] = [
        { columnName: 'safeguardInternalProtection', record: safeguardInternalProtection, columnType: 'number', label: 'Internal Protection Safeguard', nullable: true, editRecord },
        { columnName: 'safeguardPigging', record: safeguardPigging, columnType: 'number', label: 'Pigging Safeguard', nullable: true },
        { columnName: 'safeguardChemicalInhibition', record: safeguardChemicalInhibition, columnType: 'number', label: 'Chemical Inhibition Safeguard', nullable: true },
      ];

      const probabilityExteriorFields: IRiskPropertyRecordEntryMap[] = [
        { columnName: 'safeguardExternalCoating', record: safeguardExternalCoating, columnType: 'number', label: 'External Coating Safeguard', nullable: true, editRecord },
        { columnName: 'safeguardCathodic', record: safeguardCathodic, columnType: 'number', label: 'Cathodic Safeguard', nullable: true },
      ];

      let gridRow = 0;

      return (
        <>
          <div className='risk-fields' style={{ gridColumn: 2, gridRow: '1/3' }}>
            {riskProperties.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
              let gridColumn = i;
              gridColumn = gridColumn % 2 + 1;
              if (gridColumn === 1) {
                gridRow += 1;
              }
              return (
                <div key={i} style={{ gridColumn, gridRow }}>
                  <div className='property-header'>{label}</div>
                  <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                </div>
              );
            })}
          </div>
          <div className='risk-matrix-wrapper' style={{ gridColumn: 3, gridRow: '1/3' }}>
            <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '0 0 4px 0', paddingBottom: '4px' }}>Consequences</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
              {consequenceFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
                return (
                  <div key={i} style={{ width: '180px', padding: '4px' }}>
                    <div className='property-header'>{label}</div>
                    <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                  </div>
                );
              })}
            </div>

            <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '8px 0 4px 0', paddingBottom: '4px' }}>Geo Risk Potential</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
              <div style={{ width: '200px', padding: '4px' }}>
                <div className='property-header'>Probability Geo</div>
                <RecordEntry id={id} columnName='probabilityGeo' columnType='number' nullable={true} record={probabilityGeo} authorized={authorized} editRecord={editRecord} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px', margin: '4px 0 4px 0' }}>
              <RiskMatrix
                label='Geo Risk Potential'
                currentProbability={probabilityGeo}
                currentConsequence={consequenceMax}
                currentRiskPotential={riskPotentialGeo}
              />
            </div>

            <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '8px 0 4px 0', paddingBottom: '4px' }}>Internal Risk Potential</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
              {probabilityInteriorFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
                return (
                  <div key={i} style={{ width: '120px', padding: '4px' }}>
                    <div className='property-header'>{label}</div>
                    <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px', margin: '4px 0 4px 0' }}>
              <RiskMatrix
                label='Internal Risk Potential'
                currentProbability={probabilityInterior}
                currentConsequence={consequenceMax}
                currentRiskPotential={riskPotentialInternal}
              />
              <RiskMatrix
                label='Internal Risk Potential with Safeguards'
                currentProbability={probabilityInteriorWithSafeguards}
                currentConsequence={consequenceMax}
                currentRiskPotential={riskPotentialInternalWithSafeguards}
              />
            </div>

            <h4 style={{ textAlign: 'left', borderBottom: '1px solid #909496', margin: '8px 0 4px 0', paddingBottom: '4px' }}>External Risk Potential</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px' }}>
              {probabilityExteriorFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
                return (
                  <div key={i} style={{ width: '200px', padding: '4px' }}>
                    <div className='property-header'>{label}</div>
                    <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', border: '1px solid #B6B6B6', borderRadius: '4px', margin: '4px 0 4px 0' }}>
              <RiskMatrix
                label='External Risk Potential'
                currentProbability={probabilityExterior}
                currentConsequence={consequenceMax}
                currentRiskPotential={riskPotentialExternal}
              />
              <RiskMatrix
                label='External Risk Potential with Safeguards'
                currentProbability={probabilityExteriorWithSafeguards}
                currentConsequence={consequenceMax}
                currentRiskPotential={riskPotentialExternalWithSafeguards}
              />
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <div className='risk'>
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {confirmDeleteRiskModal && <ModalFieldError
        fieldError={{ field: 'Risk', message: `Are you sure you want to delete risk section for ${license}-${segment} pipeline? You will need to reenter all risk fields when creating a new risk.` }}
        hideFieldError={() => setConfirmDeleteRiskModal(false)}
        executeFunction={deleteRecord}
      />}
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        {data?.riskById ?
          <IconButton
            className='button-container'
            aria-label='delete row' size='small' disabled={!data.riskById.authorized} onClick={() => setConfirmDeleteRiskModal(true)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton> :
          <IconButton
            className='button-container'
            aria-label='add row' size='small' onClick={addRecord}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>}
      </div>
      {renderRisk()}
    </div>
  );
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
import { useState } from 'react';
import { IPipeline } from './RenderPipeline';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import { IMechanicalPropertyRecordEntryMap as IChemicalPropertyRecordEntryMap } from './MechanicalProperties';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { openModal } from './RenderPipeline';

import {
  useChemicalByIdQuery,
  useEditChemicalMutation,
  useAddChemicalMutation,
  useDeleteChemicalMutation,
  ChemicalByIdDocument,
} from '../../graphql/generated/graphql';


export interface IChemicalProps {
  id: string;
  license: IPipeline['license'];
  segment: IPipeline['segment'];
}


export default function Chemical({ id, license, segment }: IChemicalProps) {

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);
  const [confirmDeleteChemicalModal, setConfirmDeleteChemicalModal] = useState(false);

  const { data } = useChemicalByIdQuery({
    variables: { id },
    onError: ({ name, message }) => {
      setFieldError({
        field: name,
        message
      });
    }
  });

  const [editChemical] = useEditChemicalMutation({
    refetchQueries: [ChemicalByIdDocument, 'ChemicalById'],
    onCompleted: ({ editChemical }) => {
      const { error } = editChemical || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addChemical] = useAddChemicalMutation({
    variables: { id },
    refetchQueries: [ChemicalByIdDocument, 'ChemicalById'],
    onCompleted: ({ addChemical }) => {
      const { error } = addChemical || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deleteChemical] = useDeleteChemicalMutation({
    variables: { id },
    refetchQueries: [ChemicalByIdDocument, 'RiskById'],
    onCompleted: ({ deleteChemical }) => {
      const { error } = deleteChemical || {};
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
    editChemical({ variables: { id, [columnName]: newRecord } });
  }

  const addRecord = () => {
    addChemical();
  }

  const deleteRecord = () => {
    setConfirmDeleteChemicalModal(false);
    deleteChemical();
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const isModalOpen = openModal(fieldError);

  const renderChemical = () => {
    if (data?.chemicalById) {
      const { id, chemicalSupplier, baselineFluidAnalysisDate, scaling, bacteria, co2, o2, h2s, continuousInjection, injectionRate, downholeBatch, inhibitorPipelineBatch,
        bacteriaTreatment, scaleTreatment, batchFrequency, comment,
        createdBy, createdAt, updatedBy, updatedAt, authorized } = data.chemicalById;

      const chemicalFields: IChemicalPropertyRecordEntryMap[] = [
        { columnName: 'chemicalSupplier', record: chemicalSupplier?.name, label: 'Chemical Supplier', columnType: 'string', nullable: true },
        { columnName: 'baselineFluidAnalysisDate', record: baselineFluidAnalysisDate, label: 'Baseline Fluid Analysis Date', columnType: 'date', nullable: true, editRecord },
        { columnName: 'scaling', record: scaling, label: 'Scaling', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'bacteria', record: bacteria, label: 'Bacteria', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'co2', record: co2, label: 'CO2', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'o2', record: o2, label: 'O2', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'h2s', record: h2s, label: 'H2S', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'continuousInjection', record: continuousInjection, label: 'Continuous Injection', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'injectionRate', record: injectionRate, label: 'Injection Rate (L/day)', columnType: 'number', nullable: true, editRecord },
        { columnName: 'downholeBatch', record: downholeBatch, label: 'Downhole Batch', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'inhibitorPipelineBatch', record: inhibitorPipelineBatch, label: 'Inhibitor Pipeline Batch', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'bacteriaTreatment', record: bacteriaTreatment, label: 'Bacteria Treatment', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'scaleTreatment', record: scaleTreatment, label: 'Scale Treatment', columnType: 'boolean', nullable: true, editRecord },
        { columnName: 'batchFrequency', record: batchFrequency, label: 'Batch Frequency (times per year)', columnType: 'number', nullable: true, editRecord },
        { columnName: 'comment', record: comment, label: 'Comment', columnType: 'string', nullable: true, editRecord },
        { columnName: 'createdBy', record: createdBy.email, columnType: 'string', label: 'Created By', nullable: false },
        { columnName: 'createdAt', record: createdAt, columnType: 'date', label: 'Created At', nullable: false },
        { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string', label: 'Updated By', nullable: false },
        { columnName: 'updatedAt', record: updatedAt, columnType: 'date', label: 'Updated At', nullable: false },
      ];

      let gridRow = 0;

      return (
        <div className='chemical-fields' style={{ gridColumn: 2, gridRow: '1/3' }}>
          {chemicalFields.map(({ columnName, label, record, validator, columnType, nullable, editRecord }, i) => {
            let gridColumn = i;
            gridColumn = gridColumn % 4 + 1;
            if (gridColumn === 1) {
              gridRow += 1;
            }
            return (
              <div key={i} style={{ gridColumn, gridRow }}>
                <div>{label}</div>
                <RecordEntry id={id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
              </div>
            );
          })}
        </div>
      )
    }
  }

  return (
    <div className='chemical'>
      {isModalOpen && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {confirmDeleteChemicalModal && <ModalFieldError
        fieldError={{ field: 'Chemical', message: `Are you sure you want to delete chemical section for ${license}-${segment} pipeline? You will need to reenter all chemical fields when creating a new chemical section.` }}
        hideFieldError={() => setConfirmDeleteChemicalModal(false)}
        executeFunction={deleteRecord}
      />}
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        {data?.chemicalById ?
          <IconButton
            className='button-container'
            aria-label='delete row' size='small' disabled={!data.chemicalById.authorized} onClick={() => setConfirmDeleteChemicalModal(true)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton> :
          <IconButton
            className='button-container'
            aria-label='add row' size='small' onClick={addRecord}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>}
      </div>
      {renderChemical()}
    </div>
  );
}
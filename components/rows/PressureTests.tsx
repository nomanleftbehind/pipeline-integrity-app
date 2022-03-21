import { useState, Fragment } from 'react';
import { useAuth } from '../../context/AuthContext';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  usePressureTestsByPipelineIdQuery,
  useValidatorsPressureTestQuery,
  useEditPressureTestMutation,
  useAddPressureTestMutation,
  useDeletePressureTestMutation,
  PressureTestsByPipelineIdDocument,
} from '../../graphql/generated/graphql';

import { IPipeline } from './RenderPipeline';
import { IRecordEntryMap } from './LicenseChanges';

type IPressureTestArgs = Pick<IPipeline, 'length' | 'mop' | 'outsideDiameter' | 'yieldStrength' | 'wallThickness'>;

interface IPressureTestsProps extends IPressureTestArgs {
  pipelineId: string;
}

export default function PressureTests({ pipelineId, length, mop, outsideDiameter, yieldStrength, wallThickness }: IPressureTestsProps) {

  const { data, loading, error } = usePressureTestsByPipelineIdQuery({ variables: { pipelineId, length, mop, outsideDiameter, yieldStrength, wallThickness } });
  const { data: dataValidators } = useValidatorsPressureTestQuery();
  const [editPressureTest] = useEditPressureTestMutation({
    refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'],
    onCompleted: ({ editPressureTest }) => {
      const { error } = editPressureTest || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [addPressureTest] = useAddPressureTestMutation({
    variables: { pipelineId },
    refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'],
    onCompleted: ({ addPressureTest }) => {
      const { error } = addPressureTest || {};
      if (error) {
        setFieldError(error);
      }
    }
  });
  const [deletePressureTest] = useDeletePressureTestMutation({
    refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'],
    onCompleted: ({ deletePressureTest }) => {
      const { error } = deletePressureTest || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const { limitingSpecEnum } = dataValidators?.validators || {};

  const { user } = useAuth() || {};
  const { role, id: userId } = user || {};

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
    editPressureTest({ variables: { id, [columnName]: newRecord } });
  }

  const addRecord = () => {
    addPressureTest();
  }

  const deleteRecord = (id: string) => {
    deletePressureTest({ variables: { id } });
  }

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const pressureTestHeader = [
    { label: 'Pressure Test Date' },
    { label: 'Pressure Test Received Date' },
    { label: 'Info Sent Out Date' },
    { label: 'DDS Date' },
    { label: 'Integrity Sheet Updated' },
    { label: 'Comment' },
    { label: 'Limiting Spec' },
    { label: 'Max Pressure Of Limiting Spec' },
    { label: 'Required W.T. for MOP (mm)' },
    { label: 'MOP Test Pressure (kPa)' },
    { label: 'Pressure Test Pressure (kPa)' },
    { label: 'Required W.T. for Test Pressure (mm)' },
    { label: 'Pressure Test Corrosion Allowance (mm)' },
    { label: 'Water for Pigging (m³)' },
    { label: 'Created By' },
    { label: 'Created At' },
    { label: 'Updated By' },
    { label: 'Updated At' },
    { label: 'ID' },
  ];

  return (
    <div className='pressure-test'>
      {(role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') && <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
          aria-label='add row' size='small' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>}
      {JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
        fieldError={fieldError}
        hideFieldError={hideFieldErrorModal}
      />}
      {pressureTestHeader.map(({ label }, gridColumn) => {
        gridColumn += 2;
        return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
      })}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.pressureTestsByPipelineId?.map((pressureTest, gridRow) => {
        const isLastRow = data.pressureTestsByPipelineId?.length === gridRow + 1;
        gridRow += 2;
        if (pressureTest) {
          const { comment, ddsDate, pressureTestDate, infoSentOutDate, integritySheetUpdated, limitingSpec, pressureTestReceivedDate, requiredWTForMop, mopTestPressure,
            maxPressureOfLimitingSpec, pressureTestPressure, requiredWTForTestPressure, pressureTestCorrosionAllowance, waterForPigging, createdBy, createdAt, updatedBy, updatedAt, id
          } = pressureTest;
          const authorized = role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdBy.id === userId);

          const pressureTestColumns: IRecordEntryMap[] = [
            { columnName: 'pressureTestDate', columnType: 'date', nullable: false, record: pressureTestDate, editRecord },
            { columnName: 'pressureTestReceivedDate', columnType: 'date', nullable: true, record: pressureTestReceivedDate, editRecord },
            { columnName: 'infoSentOutDate', columnType: 'date', nullable: true, record: infoSentOutDate, editRecord },
            { columnName: 'ddsDate', columnType: 'date', nullable: true, record: ddsDate, editRecord },
            { columnName: 'integritySheetUpdated', columnType: 'date', nullable: true, record: integritySheetUpdated, editRecord },
            { columnName: 'comment', columnType: 'string', nullable: true, record: comment, editRecord },
            { columnName: 'limitingSpec', columnType: 'string', nullable: true, record: limitingSpec, validator: limitingSpecEnum, editRecord },
            { columnName: 'maxPressureOfLimitingSpec', columnType: 'number', nullable: false, record: maxPressureOfLimitingSpec },
            { columnName: 'requiredWTForMop', columnType: 'string', nullable: false, record: requiredWTForMop && requiredWTForMop.toFixed(3) },
            { columnName: 'mopTestPressure', columnType: 'string', nullable: false, record: mopTestPressure && mopTestPressure.toFixed(1) },
            { columnName: 'pressureTestPressure', columnType: 'string', nullable: false, record: pressureTestPressure && pressureTestPressure.toFixed(1) },
            { columnName: 'requiredWTForTestPressure', columnType: 'string', nullable: false, record: requiredWTForTestPressure && requiredWTForTestPressure.toFixed(3) },
            { columnName: 'pressureTestCorrosionAllowance', columnType: 'string', nullable: false, record: pressureTestCorrosionAllowance && pressureTestCorrosionAllowance.toFixed(3) },
            { columnName: 'waterForPigging', columnType: 'string', nullable: false, record: waterForPigging && waterForPigging.toFixed(2) },
            { columnName: 'createdBy', columnType: 'string', nullable: false, record: createdBy.email },
            { columnName: 'createdAt', columnType: 'date', nullable: false, record: createdAt },
            { columnName: 'updatedBy', columnType: 'string', nullable: false, record: updatedBy.email },
            { columnName: 'updatedAt', columnType: 'date', nullable: false, record: updatedAt },
            { columnName: 'id', columnType: 'string', nullable: false, record: id },
          ];
          return (
            <Fragment key={id}>
              {authorized && <div className={`pressure-test-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
                <IconButton
                  className='button-container'
                  aria-label='delete row' size='small' onClick={() => deleteRecord(id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>}
              {pressureTestColumns.map(({ columnName, columnType, nullable, record, validator, editRecord }, gridColumn) => {
                gridColumn += 2;
                return (
                  <div key={gridColumn} className='pressure-test-row' style={{ gridColumn, gridRow }}>
                    <RecordEntry id={id} createdById={createdBy.id} columnName={columnName} columnType={columnType} nullable={nullable} record={record} validator={validator} authorized={authorized} editRecord={editRecord} />
                  </div>
                );
              })}
            </Fragment>
          );
        }
      })}
    </div>
  );
}
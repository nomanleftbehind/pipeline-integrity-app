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
import { IRecordEntryProps } from '../fields/RecordEntry';

type IPressureTestArgs = Pick<IPipeline, 'length' | 'mop' | 'outsideDiameter' | 'yieldStrength' | 'wallThickness'>;

type IRecordEntryVaraible = Pick<IRecordEntryProps, 'columnName' | 'columnType' | 'record' | 'nullable' | 'validator' | 'editRecord'>;

interface IRecordEntryVaraibleProps extends IRecordEntryVaraible {
  columnNamePretty: string;
  gridTemplateColumn: string;
}

interface IPressureTestsProps extends IPressureTestArgs {
  pipelineId: string;
}

export default function PressureTests({ pipelineId, length, mop, outsideDiameter, yieldStrength, wallThickness }: IPressureTestsProps) {

  const { data, loading, error } = usePressureTestsByPipelineIdQuery({ variables: { pipelineId, length, mop, outsideDiameter, yieldStrength, wallThickness } });
  const { data: dataValidators } = useValidatorsPressureTestQuery();
  const [editPressureTest, { data: dataEditPressureTestMutation }] = useEditPressureTestMutation({ refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'] });
  const [addPressureTest, { data: dataAddPressureTestMutation }] = useAddPressureTestMutation({ variables: { pipelineId }, refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'] });
  const [deletePressureTest, { data: dataDeletePressureTestMutation }] = useDeletePressureTestMutation({ refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'] });

  const [fieldErrorModal, setFieldErrorModal] = useState(false);

  const { limitingSpecEnum } = dataValidators?.validators || {};
  const { error: errorEditPressureTest } = dataEditPressureTestMutation?.editPressureTest || {};
  const { error: errorAddPressureTest } = dataAddPressureTestMutation?.addPressureTest || {};
  const { error: errorDeletePressureTest } = dataDeletePressureTestMutation?.deletePressureTest || {};

  const { user } = useAuth() || {};
  const { role, id: userId } = user || {};

  const editRecord = ({ id, columnName, columnType, newRecord }: IEditRecord) => {

    if (errorEditPressureTest) {
      setFieldErrorModal(true);
    }

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
    if (errorAddPressureTest) {
      setFieldErrorModal(true);
    }
    addPressureTest();
  }

  const deleteRecord = (id: string) => {
    if (errorDeletePressureTest) {
      setFieldErrorModal(true);
    }
    deletePressureTest({ variables: { id } });
  }

  const hideFieldErrorModal = () => {
    setFieldErrorModal(false);
  }

  const boxShadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto', rowGap: '15px', gridAutoRows: 'auto' }}>
      {(role === 'ADMIN' || role === 'ENGINEER' || role === 'OPERATOR') && <div style={{ padding: '4px', gridColumn: 1, gridRow: 1 }}>
        <IconButton
          style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
          aria-label='add row' size='small' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>}
      {fieldErrorModal && errorAddPressureTest && <ModalFieldError
        fieldError={errorAddPressureTest}
        hideFieldError={hideFieldErrorModal}
      />}
      {fieldErrorModal && errorEditPressureTest && <ModalFieldError
        fieldError={errorEditPressureTest}
        hideFieldError={hideFieldErrorModal}
      />}
      {fieldErrorModal && errorDeletePressureTest && <ModalFieldError
        fieldError={errorDeletePressureTest}
        hideFieldError={hideFieldErrorModal}
      />}
      {loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
      {error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
      {data?.pressureTestsByPipelineId?.map((pressureTest, i) => {
        i += 2;
        if (pressureTest) {
          const { id, comment, createdBy, updatedBy, ddsDate, pressureTestDate, infoSentOutDate, integritySheetUpdated, limitingSpec, pressureTestReceivedDate, createdAt, updatedAt,
            requiredWTForMop, mopTestPressure, maxPressureOfLimitingSpec, pressureTestPressure, requiredWTForTestPressure, pressureTestCorrosionAllowance, waterForPigging
          } = pressureTest;
          const authorized = role === 'ADMIN' || role === 'ENGINEER' || (role === 'OPERATOR' && createdBy.id === userId);

          const mopRequirements: IRecordEntryVaraibleProps[] = [
            { columnName: 'requiredWTForMop', columnNamePretty: 'Required W.T. for MOP (mm)', record: requiredWTForMop && requiredWTForMop.toFixed(3), columnType: 'string', nullable: true, gridTemplateColumn: '135px' },
            { columnName: 'mopTestPressure', columnNamePretty: 'MOP Test Pressure (kPa)', record: mopTestPressure && mopTestPressure.toFixed(1), columnType: 'string', nullable: true, gridTemplateColumn: '135px' },
          ];

          const limitingSpecs: IRecordEntryVaraibleProps[] = [
            { columnName: 'limitingSpec', columnNamePretty: 'Limiting Spec', record: limitingSpec, columnType: 'string', nullable: true, validator: limitingSpecEnum, editRecord, gridTemplateColumn: '135px' },
            { columnName: 'maxPressureOfLimitingSpec', columnNamePretty: 'Max Pressure Of Limiting Spec', record: maxPressureOfLimitingSpec, columnType: 'number', nullable: true, gridTemplateColumn: '135px' },
          ];

          const pressureTestInfo: IRecordEntryVaraibleProps[] = [
            { columnName: 'pressureTestPressure', columnNamePretty: 'Pressure Test Pressure (kPa)', record: pressureTestPressure && pressureTestPressure.toFixed(1), columnType: 'string', nullable: true, gridTemplateColumn: '135px' },
            { columnName: 'requiredWTForTestPressure', columnNamePretty: 'Required W.T. for Test Pressure (mm)', record: requiredWTForTestPressure && requiredWTForTestPressure.toFixed(3), columnType: 'string', nullable: true, gridTemplateColumn: '135px' },
            { columnName: 'pressureTestCorrosionAllowance', columnNamePretty: 'Pressure Test Corrosion Allowance (mm)', record: pressureTestCorrosionAllowance && pressureTestCorrosionAllowance.toFixed(3), columnType: 'string', nullable: true, gridTemplateColumn: '135px' },
            { columnName: 'waterForPigging', columnNamePretty: 'Water for Pigging (m³)', record: waterForPigging && waterForPigging.toFixed(2), columnType: 'string', nullable: true, gridTemplateColumn: '135px' },
          ];

          const schedule: IRecordEntryVaraibleProps[] = [
            { columnName: 'infoSentOutDate', columnNamePretty: 'Info Sent Out Date', record: infoSentOutDate, columnType: 'date', nullable: true, editRecord, gridTemplateColumn: '220px' },
            { columnName: 'ddsDate', columnNamePretty: 'DDS Date', record: ddsDate, columnType: 'date', nullable: true, editRecord, gridTemplateColumn: '220px' },
            { columnName: 'pressureTestDate', columnNamePretty: 'Pressure Test Date', record: pressureTestDate, columnType: 'date', nullable: true, editRecord, gridTemplateColumn: '220px' },
            { columnName: 'pressureTestReceivedDate', columnNamePretty: 'Pressure Test Received Date', record: pressureTestReceivedDate, columnType: 'date', nullable: true, editRecord, gridTemplateColumn: '220px' },
            { columnName: 'integritySheetUpdated', columnNamePretty: 'Integrity Sheet Updated', record: integritySheetUpdated, columnType: 'date', nullable: true, editRecord, gridTemplateColumn: '220px' },
          ];

          const comments: IRecordEntryVaraibleProps[] = [
            { columnName: 'comment', columnNamePretty: 'Comment', record: comment, columnType: 'string', nullable: true, editRecord, gridTemplateColumn: 'auto' },
          ]

          const systemFields: IRecordEntryVaraibleProps[] = [
            { columnName: 'id', columnNamePretty: 'ID', record: id, columnType: 'string', nullable: false, gridTemplateColumn: 'auto' },
            { columnName: 'createdBy', columnNamePretty: 'Created By', record: createdBy.email, columnType: 'string', nullable: false, gridTemplateColumn: 'auto' },
            { columnName: 'createdAt', columnNamePretty: 'Created At', record: createdAt, columnType: 'date', nullable: false, gridTemplateColumn: 'auto' },
            { columnName: 'updatedBy', columnNamePretty: 'Updated By', record: updatedBy.email, columnType: 'string', nullable: false, gridTemplateColumn: 'auto' },
            { columnName: 'updatedAt', columnNamePretty: 'Updated At', record: updatedAt, columnType: 'date', nullable: false, gridTemplateColumn: 'auto' },
          ];

          return (
            <Fragment key={id}>
              {authorized && <div style={{ padding: '4px', gridColumn: 1, gridRow: i }}>
                <IconButton
                  style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
                  aria-label='delete row' size='small' onClick={() => deleteRecord(id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>}
              <div
                style={{
                  gridColumn: 2, gridRow: i, display: 'grid', gridTemplateColumns: 'auto', gap: '10px', gridAutoRows: 'auto', backgroundColor: 'rgb(250, 250, 250)', padding: '8px', borderRadius: '8px', boxShadow
                }}>
                <Window
                  id={id}
                  createdById={createdBy.id}
                  authorized={authorized}
                  gridColumn={1}
                  gridRow={1}
                  title='MOP Requirements'
                  recordEntryVaraibleProps={mopRequirements}
                />
                <Window
                  id={id}
                  createdById={createdBy.id}
                  authorized={authorized}
                  gridColumn={2}
                  gridRow={1}
                  title='Limiting Specs'
                  recordEntryVaraibleProps={limitingSpecs}
                />
                <Window
                  id={id}
                  createdById={createdBy.id}
                  authorized={authorized}
                  gridColumn={3}
                  gridRow={1}
                  title='Pressure Test Info'
                  recordEntryVaraibleProps={pressureTestInfo}
                />
                <Window
                  id={id}
                  createdById={createdBy.id}
                  authorized={authorized}
                  gridColumn={'1 / 4'}
                  gridRow={2}
                  title='Schedule'
                  recordEntryVaraibleProps={schedule}
                />
                <Window
                  id={id}
                  createdById={createdBy.id}
                  authorized={authorized}
                  gridColumn={'1 / 4'}
                  gridRow={3}
                  title='Comments'
                  recordEntryVaraibleProps={comments}
                />

                <Window
                  id={id}
                  createdById={createdBy.id}
                  authorized={authorized}
                  gridColumn={'1 / 4'}
                  gridRow={4}
                  title='System Fields'
                  recordEntryVaraibleProps={systemFields}
                />

              </div>
            </Fragment>
          );
        }
      })}
    </div>
  );
}

interface IWindowProps {
  id: string;
  createdById: string;
  title: string;
  gridColumn: string | number;
  gridRow: string | number;
  authorized: boolean;
  recordEntryVaraibleProps: IRecordEntryVaraibleProps[];
}

function Window({ id, createdById, title, gridColumn, gridRow, authorized, recordEntryVaraibleProps }: IWindowProps) {

  const boxShadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)';

  const gridTemplateColumns = recordEntryVaraibleProps.map(({ gridTemplateColumn }) => gridTemplateColumn).join(' ');

  return (
    <div style={{
      gridColumn, gridRow, display: 'grid', gridTemplateColumns: 'auto', gap: '10px', gridAutoRows: 'auto', backgroundColor: 'rgb(240, 240, 240)', padding: '8px', borderRadius: '8px', boxShadow
    }}
    >
      <div style={{ gridColumn: 1, gridRow: 1 }}>{title}</div>
      <div
        style={{
          gridColumn: 1, gridRow: 2, display: 'grid', gridTemplateColumns, gap: '10px', gridAutoRows: 'auto', backgroundColor: 'rgb(230, 230, 230)', padding: '8px', borderRadius: '8px', boxShadow
        }}>
        {recordEntryVaraibleProps.map(({ columnName, columnNamePretty, columnType, record, nullable, validator, editRecord }, i) => {
          i += 1;
          return (
            <Fragment key={i}>
              <div style={{ gridColumn: i, gridRow: 1 }}>{columnNamePretty}</div>
              <div style={{ gridColumn: i, gridRow: 2 }}>
                <RecordEntry id={id} createdById={createdById} columnName={columnName} columnType={columnType} nullable={nullable} record={record} authorized={authorized} validator={validator} editRecord={editRecord} />
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  )
}
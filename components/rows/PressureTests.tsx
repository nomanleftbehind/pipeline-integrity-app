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

type IPressureTestArgs = Pick<IPipeline, 'length' | 'mop' | 'outsideDiameter' | 'yieldStrength' | 'wallThickness'>

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
                  gridColumn: 2, gridRow: i, display: 'grid', gridTemplateColumns: 'auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(230, 230, 230)', padding: '8px', borderRadius: '8px', boxShadow
                }}>

                <div style={{
                  gridColumn: 1, gridRow: 1, display: 'grid', gridTemplateColumns: 'auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(240, 240, 240)', padding: '4px', borderRadius: '6px', boxShadow
                }}
                >
                  <div style={{ gridColumn: 1, gridRow: 1 }}>MOP Requirements</div>
                  <div
                    style={{
                      gridColumn: 1, gridRow: 2, display: 'grid', gridTemplateColumns: 'auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(220, 220, 220)', padding: '8px', borderRadius: '8px', boxShadow
                    }}>
                    <div style={{ gridColumn: 1, gridRow: 1 }}>Required W.T. for MOP (mm)</div>
                    <div style={{ gridColumn: 1, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='requiredWTForMop' columnType='string' nullable={true} record={requiredWTForMop && requiredWTForMop.toFixed(3)} authorized={authorized} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 1 }}>MOP Test Pressure (kPa)</div>
                    <div style={{ gridColumn: 2, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='mopTestPressure' columnType='string' nullable={true} record={mopTestPressure && mopTestPressure.toFixed(1)} authorized={authorized} />
                    </div>
                  </div>
                </div>

                <div style={{
                  gridColumn: 2, gridRow: 1, display: 'grid', gridTemplateColumns: 'auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(240, 240, 240)', padding: '4px', borderRadius: '6px', boxShadow
                }}
                >
                  <div style={{ gridColumn: 1, gridRow: 1 }}>Limiting Specs</div>
                  <div
                    style={{
                      gridColumn: 1, gridRow: 2, display: 'grid', gridTemplateColumns: '140px auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(220, 220, 220)', padding: '8px', borderRadius: '8px', boxShadow
                    }}>
                    <div style={{ gridColumn: 1, gridRow: 1 }}>Limiting Spec</div>
                    <div style={{ gridColumn: 1, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='limitingSpec' columnType='string' nullable={true} record={limitingSpec} validator={limitingSpecEnum} authorized={authorized} editRecord={editRecord} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 1 }}>Max Pressure of Limiting Spec (kpa)</div>
                    <div style={{ gridColumn: 2, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='maxPressureOfLimitingSpec' columnType='number' nullable={true} record={maxPressureOfLimitingSpec} authorized={authorized} />
                    </div>
                  </div>
                </div>

                <div style={{
                  gridColumn: 3, gridRow: 1, display: 'grid', gridTemplateColumns: 'auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(240, 240, 240)', padding: '4px', borderRadius: '6px', boxShadow
                }}
                >
                  <div style={{ gridColumn: '1 / 2', gridRow: 1 }}>Pressure Test Info</div>
                  <div
                    style={{
                      gridColumn: 1, gridRow: 2, display: 'grid', gridTemplateColumns: 'auto', gap: '5px', gridAutoRows: 'auto', backgroundColor: 'rgb(220, 220, 220)', padding: '8px', borderRadius: '8px', boxShadow
                    }}>
                    <div style={{ gridColumn: 1, gridRow: 1 }}>Pressure Test Pressure (kPa)</div>
                    <div style={{ gridColumn: 1, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='pressureTestPressure' columnType='number' nullable={true} record={pressureTestPressure} authorized={authorized} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 1 }}>Required W.T. for Test Pressure (mm)</div>
                    <div style={{ gridColumn: 2, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='requiredWTForTestPressure' columnType='string' nullable={true} record={requiredWTForTestPressure && requiredWTForTestPressure.toFixed(3)} authorized={authorized} />
                    </div>
                    <div style={{ gridColumn: 3, gridRow: 1 }}>Pressure Test Corrosion Allowance (mm)</div>
                    <div style={{ gridColumn: 3, gridRow: 2 }}>
                      <RecordEntry id={id} createdById={createdBy.id} columnName='pressureTestCorrosionAllowance' columnType='number' nullable={true} record={pressureTestCorrosionAllowance && pressureTestCorrosionAllowance.toFixed(3)} authorized={authorized} />
                    </div>
                  </div>
                </div>

                <div style={{ gridColumn: 1, gridRow: 3 }}>Pressure Test Date</div>
                <div style={{ gridColumn: 1, gridRow: 4 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='pressureTestDate' columnType='date' nullable={true} record={pressureTestDate} authorized={authorized} editRecord={editRecord} />
                </div>
                <div style={{ gridColumn: 6, gridRow: 1 }}>DDS Date</div>
                <div style={{ gridColumn: 6, gridRow: 2 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='ddsDate' columnType='date' nullable={true} record={ddsDate} authorized={authorized} editRecord={editRecord} />
                </div>
                <div style={{ gridColumn: 7, gridRow: 3 }}>Info Sent Out Date</div>
                <div style={{ gridColumn: 7, gridRow: 4 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='infoSentOutDate' columnType='date' nullable={true} record={infoSentOutDate} authorized={authorized} editRecord={editRecord} />
                </div>
                <div style={{ gridColumn: 7, gridRow: 1 }}>Pressure Test Received Date</div>
                <div style={{ gridColumn: 7, gridRow: 2 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='pressureTestReceivedDate' columnType='date' nullable={true} record={pressureTestReceivedDate} authorized={authorized} editRecord={editRecord} />
                </div>
                <div style={{ gridColumn: 7, gridRow: 3 }}>Integrity Sheet Updated</div>
                <div style={{ gridColumn: 7, gridRow: 4 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='integritySheetUpdated' columnType='date' nullable={true} record={integritySheetUpdated} authorized={authorized} editRecord={editRecord} />
                </div>

                <div style={{ gridColumn: 7, gridRow: 1 }}>Comment</div>
                <div style={{ gridColumn: 7, gridRow: 2 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='comment' columnType='string' nullable={true} record={comment} authorized={authorized} editRecord={editRecord} />
                </div>




                <div style={{ gridColumn: 7, gridRow: 5 }}>MOP Test Pressure (kPa)</div>
                <div style={{ gridColumn: 7, gridRow: 6 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='mopTestPressure' columnType='string' nullable={true} record={mopTestPressure && mopTestPressure.toFixed(1)} authorized={authorized} />
                </div>

                <div style={{ gridColumn: 7, gridRow: 7 }}>Created By</div>
                <div style={{ gridColumn: 7, gridRow: 8 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='createdBy' columnType='string' nullable={false} record={createdBy.email} authorized={authorized} />
                </div>
                <div style={{ gridColumn: 7, gridRow: 7 }}>Created At</div>
                <div style={{ gridColumn: 7, gridRow: 8 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='createdAt' columnType='date' nullable={false} record={createdAt} authorized={authorized} />
                </div>
                <div style={{ gridColumn: 6, gridRow: 7 }}>Updated By</div>
                <div style={{ gridColumn: 6, gridRow: 8 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='updatedBy' columnType='string' nullable={false} record={updatedBy.email} authorized={authorized} />
                </div>
                <div style={{ gridColumn: 7, gridRow: 7 }}>Updated At</div>
                <div style={{ gridColumn: 7, gridRow: 8 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='updatedAt' columnType='date' nullable={false} record={updatedAt} authorized={authorized} />
                </div>
                <div style={{ gridColumn: 7, gridRow: 7 }}>ID</div>
                <div style={{ gridColumn: 7, gridRow: 8 }}>
                  <RecordEntry id={id} createdById={createdBy.id} columnName='ID' columnType='string' nullable={false} record={id} authorized={authorized} />
                </div>
              </div>
            </Fragment>
          );
        }
      })}
    </div>
  );
}
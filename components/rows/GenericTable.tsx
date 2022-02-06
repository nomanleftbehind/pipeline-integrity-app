import EntryField from '../fields/EntryField';
import InjectionPointForm from '../fields/injection_points/InjectionPointForm';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

import { useState, useEffect } from 'react';
import {
  usePressureTestsByPipelineIdLazyQuery,
  useValidatorsPressureTestLazyQuery,
  useAddPressureTestMutation,
  useDeletePressureTestMutation,
  PressureTestsByPipelineIdQuery,
  PressureTestsByPipelineIdDocument,

  usePigRunsByPipelineIdLazyQuery,
  useValidatorsPigRunLazyQuery,
  useAddPigRunMutation,
  useDeletePigRunMutation,
  PigRunsByPipelineIdQuery,
  PigRunsByPipelineIdDocument,

  useRiskByIdLazyQuery,
  useValidatorsRiskLazyQuery,
  useAddRiskMutation,
  useDeleteRiskMutation,
  RiskByIdQuery,
  RiskByIdDocument,

} from '../../graphql/generated/graphql';

import { IInferFromArray } from '../fields/injection_points/InjectionPoints';

type IPressureTest = NonNullable<IInferFromArray<PressureTestsByPipelineIdQuery['pressureTestsByPipelineId']>>;
type IPigRun = NonNullable<IInferFromArray<PigRunsByPipelineIdQuery['pigRunsByPipelineId']>>;
type IRisk = NonNullable<RiskByIdQuery['riskById']>;

interface IGenericTableData extends IPressureTest, IPigRun, IRisk { };

export interface IGenericTableProps {
  pipelineId?: string;
  in_tab_panel?: boolean;
  table: 'pressure tests' | 'pig runs' | 'risk';
}

export default function GenericTable({ pipelineId, in_tab_panel, table }: IGenericTableProps) {

  const [pressureTestsByPipelineId, { data: dataPressureTestsByPipelineId, loading: loadingPressureTestsByPipelineId, error: errorPressureTestsByPipelineId }] = usePressureTestsByPipelineIdLazyQuery({ variables: { pipelineId } });
  const [validatorsPressureTest, { data: dataValidatorsPressureTest }] = useValidatorsPressureTestLazyQuery();
  const [addPressureTest, { data: dataAddPressureTest }] = useAddPressureTestMutation({ refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'] });
  const [deletePressureTest, { data: dataDeletePressureTest }] = useDeletePressureTestMutation({ refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'] });

  const [pigRunsByPipelineId, { data: dataPigRunsByPipelineId, loading: loadingPigRunsByPipelineId, error: errorPigRunsByPipelineId }] = usePigRunsByPipelineIdLazyQuery({ variables: { pipelineId } });
  const [validatorsPigType, { data: dataValidatorsPigRun }] = useValidatorsPigRunLazyQuery();
  const [addPigRun, { data: dataAddPigRun }] = useAddPigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });
  const [deletePigRun, { data: dataDeletePigRun }] = useDeletePigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });

  const [riskById, { data: dataRiskById, loading: loadingRiskById, error: errorRiskById }] = useRiskByIdLazyQuery({ variables: { id: pipelineId } });
  const [validatorsRisk, { data: dataValidatorsRisk }] = useValidatorsRiskLazyQuery();
  const [addRisk, { data: dataAddRisk }] = useAddRiskMutation({ refetchQueries: [RiskByIdDocument, 'RiskById'] });
  const [deleteRisk, { data: dataDeleteRisk }] = useDeleteRiskMutation({ refetchQueries: [RiskByIdDocument, 'RiskById'] });

  const [showAddForm, setShowAddForm] = useState(false);

  function loadingSwitch() {
    switch (table) {
      case 'pressure tests':
        return loadingPressureTestsByPipelineId;
      case 'pig runs':
        return loadingPigRunsByPipelineId;
      case 'risk':
        return loadingRiskById;
      default:
        break;
    }
  }

  function errorSwitch() {
    switch (table) {
      case 'pressure tests':
        return errorPressureTestsByPipelineId;
      case 'pig runs':
        return errorPigRunsByPipelineId;
      case 'risk':
        return errorRiskById;
      default:
        break;
    }
  }

  function dataSwitch() {
    switch (table) {
      case 'pressure tests':
        return dataPressureTestsByPipelineId?.pressureTestsByPipelineId;
      case 'pig runs':
        return dataPigRunsByPipelineId?.pigRunsByPipelineId;
      case 'risk':
        return dataRiskById?.riskById;
      default:
        break;
    }
  }

  const loading = loadingSwitch();
  const error = errorSwitch();
  const data = dataSwitch();

  function deleteEntry(id: string) {
    switch (table) {
      case 'pressure tests':
        deletePressureTest({ variables: { id } });
        break;
      case 'pig runs':
        deletePigRun({ variables: { id } });
        break;
      case 'risk':
        deleteRisk({ variables: { id } });
        break;
      default:
        break;
    }
  }

  function loadData() {
    switch (table) {
      case 'pressure tests':
        pressureTestsByPipelineId();
        validatorsPressureTest();
        break;
      case 'pig runs':
        pigRunsByPipelineId();
        validatorsPigType();
        break;
      case 'risk':
        riskById();
        validatorsRisk();
        break;
      default:
        break;
    }
  }

  useEffect(() => { loadData(); }, []);

  // This function needs to match handleSubmit function signature from InjectionPointForm component because we are using
  // `upstream pipeline form` to return all pipelines in autocomplete dropdown.
  function handleAddEntryFromPage(_injectionPointType: string, pipelineId: string) {
    switch (table) {
      case 'pressure tests':
        addPressureTest({ variables: { pipelineId } });
        break;
      case 'pig runs':
        addPigRun({ variables: { pipelineId } });
        break;
      case 'risk':
        addRisk({ variables: { id: pipelineId } });
        break;
      default:
        break;
    }
    setShowAddForm(false);
  }

  function handleAddEntry() {
    if (in_tab_panel === true && pipelineId) {
      switch (table) {
        case 'pressure tests':
          addPressureTest({ variables: { pipelineId } });
          break;
        case 'pig runs':
          addPigRun({ variables: { pipelineId } });
          break;
        case 'risk':
          addRisk({ variables: { id: pipelineId } });
          break;
        default:
          break;
      }
    } else {
      setShowAddForm(!showAddForm);
    }
  }

  function renderHeader() {
    switch (table) {
      case 'pressure tests':
        return (
          <>
            <TableCell align="right">Limiting Spec</TableCell>
            <TableCell align="right">Info Sent Out</TableCell>
            <TableCell align="right">DDS Date</TableCell>
            <TableCell align="right">Pressure Test Date</TableCell>
            <TableCell align="right">Pressure Test Received Date</TableCell>
            <TableCell align="right">Integriry Sheet Updated Date</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">ID</TableCell>
          </>
        );
      case 'pig runs':
        return (
          <>
            <TableCell align="right">Pig Type</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Operator</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">ID</TableCell>
          </>
        );
      case 'risk':
        return (
          <>
            <TableCell align="right">Aerial Review</TableCell>
            <TableCell align="right">Environment (proximity to)</TableCell>
            <TableCell align="right">Geotechnical Slope Angle S1</TableCell>
            <TableCell align="right">Geotechnical Facing S1</TableCell>
            <TableCell align="right">Geotechnical Height S1</TableCell>
            <TableCell align="right">Geotechnical Slope Angle S2</TableCell>
            <TableCell align="right">Geotechnical Facing S2</TableCell>
            <TableCell align="right">Geotechnical Height S2</TableCell>
            <TableCell align="right">Date Slope Checked</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">ID</TableCell>
          </>
        );
      default:
        break;
    }
  }

  function renderBody(data: IGenericTableData) {
    const { id, limitingSpec, infoSentOutDate, ddsDate, pressureTestDate, pressureTestReceivedDate, integritySheetUpdated, comment, createdBy,
      pigType, date, operator, createdAt, updatedAt,
      arielReview, environmentProximityTo, geotechnicalSlopeAngleS1, geotechnicalFacingS1, geotechnicalHeightS1, geotechnicalSlopeAngleS2, geotechnicalFacingS2, geotechnicalHeightS2, dateSlopeChecked } = data;
    switch (table) {
      case 'pressure tests':
        return (
          <>
            <EntryField table={table} id={id} record={limitingSpec} columnName="limitingSpec" validator={dataValidatorsPressureTest?.validators?.limitingSpecEnum} />
            <EntryField table={table} id={id} record={infoSentOutDate} columnName="infoSentOutDate" validator="date" />
            <EntryField table={table} id={id} record={ddsDate} columnName="ddsDate" validator="date" />
            <EntryField table={table} id={id} record={pressureTestDate} columnName="pressureTestDate" validator="date" />
            <EntryField table={table} id={id} record={pressureTestReceivedDate} columnName="pressureTestReceivedDate" validator="date" />
            <EntryField table={table} id={id} record={integritySheetUpdated} columnName="integritySheetUpdated" validator="date" />
            <EntryField table={table} id={id} record={comment} columnName="comment" columnType='string' validator={dataValidatorsPressureTest?.validators?.anyTextMatchPattern} />
            <TableCell align="right">{createdBy.email}</TableCell>
            <EntryField table={table} id={id} record={createdAt} columnName="createdAt" />
            <EntryField table={table} id={id} record={updatedAt} columnName="updatedAt" />
            <TableCell align="right">{id}</TableCell>
          </>
        );
      case 'pig runs':
        return (
          <>
            <EntryField table={table} id={id} record={pigType} columnName="pigType" validator={dataValidatorsPigRun?.validators?.pigTypeEnum} />
            <EntryField table={table} id={id} record={date} columnName="date" />
            <EntryField table={table} id={id} record={comment} columnName="comment" validator={dataValidatorsPigRun?.validators?.anyTextMatchPattern} />
            <EntryField table={table} id={id} record={operator?.email} columnName="operator" />
            <TableCell align="right">{createdBy.email}</TableCell>
            <EntryField table={table} id={id} record={createdAt} columnName="createdAt" />
            <EntryField table={table} id={id} record={updatedAt} columnName="updatedAt" />
            <TableCell align="right">{id}</TableCell>
          </>
        );
      case 'risk':
        return (
          <>
            <EntryField table={table} id={id} record={arielReview} columnName="arielReview" />
            <EntryField table={table} id={id} record={environmentProximityTo} columnName="environmentProximityTo" validator={dataValidatorsRisk?.validators?.environmentProximityToEnum} />
            <EntryField table={table} id={id} record={geotechnicalSlopeAngleS1} columnName="geotechnicalSlopeAngleS1" />
            <EntryField table={table} id={id} record={geotechnicalFacingS1} columnName="geotechnicalFacingS1" validator={dataValidatorsRisk?.validators?.geotechnicalFacingEnum} />
            <EntryField table={table} id={id} record={geotechnicalHeightS1} columnName="geotechnicalHeightS1" />
            <EntryField table={table} id={id} record={geotechnicalSlopeAngleS2} columnName="geotechnicalSlopeAngleS2" />
            <EntryField table={table} id={id} record={geotechnicalFacingS2} columnName="geotechnicalFacingS2" validator={dataValidatorsRisk?.validators?.geotechnicalFacingEnum} />
            <EntryField table={table} id={id} record={geotechnicalHeightS2} columnName="geotechnicalHeightS2" />
            <EntryField table={table} id={id} record={dateSlopeChecked} columnName="dateSlopeChecked" validator='date' />
            <TableCell align="right">{createdBy.email}</TableCell>
            <EntryField table={table} id={id} record={createdAt} columnName="createdAt" />
            <EntryField table={table} id={id} record={updatedAt} columnName="updatedAt" />
            <TableCell align="right">{id}</TableCell>
          </>
        );
      default:
        break;
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton aria-label="add row" size="small" onClick={handleAddEntry} disabled={Boolean(dataRiskById?.riskById)}>
                  {showAddForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                </IconButton>
              </TableCell>
              {in_tab_panel ? null : <TableCell>Pipeline</TableCell>}
              {renderHeader()}
            </TableRow>
          </TableHead>
          <TableBody>
            {showAddForm ? <TableRow>
              <TableCell colSpan={4}>
                <InjectionPointForm
                  injectionPointType='connected pipeline'
                  handleSubmit={handleAddEntryFromPage}
                />
              </TableCell>
            </TableRow> : null}
            {loading ? <TableRow><TableCell>Loading...</TableCell></TableRow> :
              error ? <TableRow><TableCell>{error.message}</TableCell></TableRow> :
                data ?
                  data.map(item => {
                    return item ?
                      (
                        <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                          <TableCell>
                            <IconButton aria-label="delete row" size="small" onClick={() => deleteEntry(item.id)}>
                              <DeleteOutlineOutlinedIcon />
                            </IconButton>
                          </TableCell>
                          {in_tab_panel ? null : <TableCell>{`${item.pipeline.license}-${item.pipeline.segment}`}</TableCell>}
                          {renderBody(item)}
                        </TableRow>
                      ) : null
                  }) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}
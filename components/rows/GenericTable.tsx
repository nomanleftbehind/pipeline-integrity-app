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
} from '../../graphql/generated/graphql';

import { IInferFromArray } from '../fields/injection_points/InjectionPoints';

type IPressureTest = NonNullable<IInferFromArray<PressureTestsByPipelineIdQuery['pressureTestsByPipelineId']>>;
type IPigRun = NonNullable<IInferFromArray<PigRunsByPipelineIdQuery['pigRunsByPipelineId']>>;

interface IGenericTableData extends IPressureTest, IPigRun { };

export interface IGenericTableProps {
  pipelineId?: string;
  in_tab_panel?: boolean;
  table: 'pressure tests' | 'pig runs';
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

  const [showAddForm, setShowAddForm] = useState(false);

  function loadingSwitch() {
    switch (table) {
      case 'pressure tests':
        return loadingPressureTestsByPipelineId;
      case 'pig runs':
        return loadingPigRunsByPipelineId;
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
      default:
        break;
    }
  }

  useEffect(() => { loadData(); }, []);

  // This function needs to match handleSubmit function signature from InjectionPointForm component because we are using
  // `upstream pipeline form` to return all pipelines in autocomplete dropdown.
  function handleAddEntryFromPage(_injectionPointType: string, pipelineId: string) {
    if (table === 'pressure tests') {
      addPressureTest({ variables: { pipelineId } });
    }
    if (table === 'pig runs') {
      addPigRun({ variables: { pipelineId } });
    }
    setShowAddForm(false);
  }

  function handleAddEntry() {
    if (in_tab_panel === true && pipelineId) {
      if (table === 'pressure tests') {
        addPressureTest({ variables: { pipelineId } });
      }
      if (table === 'pig runs') {
        addPigRun({ variables: { pipelineId } });
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
      default:
        break;
    }
  }

  function renderBody(data: IGenericTableData) {
    const { id, limitingSpec, infoSentOutDate, ddsDate, pressureTestDate, pressureTestReceivedDate, integritySheetUpdated, comment, createdBy,
      pigType, date, operator, createdAt, updatedAt } = data;
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
            <EntryField table={table} id={id} record={comment} columnName="comment" validator={dataValidatorsPressureTest?.validators?.anyTextMatchPattern} />
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
        )
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
                <IconButton aria-label="add row" size="small" onClick={handleAddEntry}>
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
                  injectionPointType="upstream pipeline"
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
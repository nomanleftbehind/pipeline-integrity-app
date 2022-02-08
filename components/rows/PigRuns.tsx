import EntryField from '../fields/EntryField';

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

import {
  usePigRunsByPipelineIdQuery,
  useValidatorsPigRunQuery,
  useAddPigRunMutation,
  useDeletePigRunMutation,
  PigRunsByPipelineIdDocument,
} from '../../graphql/generated/graphql';

export interface IPigRunsProps {
  pipelineId: string;
}

export default function PigRuns({ pipelineId }: IPigRunsProps) {

  const { data, loading, error } = usePigRunsByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataValidatorsPigRun } = useValidatorsPigRunQuery();
  const [addPigRun, { data: dataAddPigRun }] = useAddPigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });
  const [deletePigRun, { data: dataDeletePigRun }] = useDeletePigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });

  const table = 'pig runs'

  const { pigTypeEnum, pigInspectionEnum, anyTextMatchPattern } = dataValidatorsPigRun?.validators || {};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton aria-label="add row" size="small" onClick={() => addPigRun({ variables: { pipelineId } })}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">Pig Type</TableCell>
              <TableCell align="right">Operator</TableCell>
              <TableCell align="right">Date In</TableCell>
              <TableCell align="right">Date Out</TableCell>
              <TableCell align="right">Isolation Valve Function Test</TableCell>
              <TableCell align="right">Pig Sender/Receiver Inspection</TableCell>
              <TableCell align="right">Comment</TableCell>
              <TableCell align="right">Created By</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated By</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right">ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <TableRow><TableCell>Loading...</TableCell></TableRow>}
            {error && <TableRow><TableCell>{error.message}</TableCell></TableRow>}
            {data?.pigRunsByPipelineId?.map(pigRun => {
              return pigRun && (
                <TableRow hover role="checkbox" tabIndex={-1} key={pigRun.id}>
                  <TableCell>
                    <IconButton aria-label="delete row" size="small" onClick={() => deletePigRun({ variables: { id: pigRun.id } })}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <EntryField table={table} id={pigRun.id} record={pigRun.pigType} columnName="pigType" validator={pigTypeEnum} />
                  <EntryField table={table} id={pigRun.id} record={pigRun.operator?.email} columnName="operator" />
                  <EntryField table={table} id={pigRun.id} record={pigRun.dateIn} columnName="dateIn" validator='date' />
                  <EntryField table={table} id={pigRun.id} record={pigRun.dateOut} columnName="dateOut" validator='date' />
                  <EntryField table={table} id={pigRun.id} record={pigRun.isolationValveFunctionTest} columnName="isolationValveFunctionTest" validator={pigInspectionEnum} />
                  <EntryField table={table} id={pigRun.id} record={pigRun.pigSenderReceiverInspection} columnName="pigSenderReceiverInspection" validator={pigInspectionEnum} />
                  <EntryField table={table} id={pigRun.id} record={pigRun.comment} columnName="comment" validator={anyTextMatchPattern} columnType='string' />
                  <TableCell align="right">{pigRun.createdBy.email}</TableCell>
                  <EntryField table={table} id={pigRun.id} record={pigRun.createdAt} columnName="createdAt" />
                  <TableCell align="right">{pigRun.updatedBy.email}</TableCell>
                  <EntryField table={table} id={pigRun.id} record={pigRun.updatedAt} columnName="updatedAt" />
                  <TableCell align="right">{pigRun.id}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}
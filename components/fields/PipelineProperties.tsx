import EntryField from './EntryField';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IPipeline, IValidators } from '../rows/RenderPipeline';
import { ITable } from '../rows/PipelineData';

export type IColumnType = 'string' | 'number' | 'date' | 'boolean';

type PipelinePropertyObject<T1, T2> = { columnName: string; columnType: IColumnType; record: T1[keyof T1]; validator?: T2[keyof T2]; table?: ITable };

export type IPipelineProperty = PipelinePropertyObject<Omit<IPipeline, 'satellite' | 'injectionPoints' | 'upstream' | 'downstream' | 'createdBy' | 'updatedBy'>, NonNullable<IValidators>>;

export type IRecord = IPipelineProperty['record'];

export type IValidator = IPipelineProperty['validator'];


interface IPipelinePropertiesProps {
  id?: string;
  createdById: string;
  open: boolean;
  propertiesName: string;
  pipelineProperties: IPipelineProperty[];
  addProperties?: () => void;
  deleteProperties?: () => void;
}


export default function PipelineProperties({ id, createdById, open, propertiesName, pipelineProperties, addProperties, deleteProperties }: IPipelinePropertiesProps) {

  const prettifyColumnName = (columnName: string) => columnName
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          {propertiesName}
          {id && deleteProperties ?
            <IconButton aria-label="delete row" size="small" onClick={deleteProperties}>
              <DeleteOutlineOutlinedIcon />
            </IconButton> :
            !id && addProperties ?
              <IconButton aria-label="add row" size="small" onClick={addProperties}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton> :
              null}
        </Typography>
        {id && <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pipelineProperties.map(({ columnName, record, columnType, validator, table }) => {
              const columnNamePretty = prettifyColumnName(columnName);
              return (
                <TableRow key={columnName}>
                  <TableCell>{columnNamePretty}</TableCell>
                  <EntryField id={id} createdById={createdById} table={table} record={record} columnName={columnName} columnType={columnType} validator={validator} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>}
      </Box>
    </Collapse>
  );
}
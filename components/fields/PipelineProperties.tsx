import EntryField from './EntryField';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { IPipeline, IValidators } from '../rows/RenderPipeline';



type PipelinePropertyObject<T1, T2> = { columnName: string; record: T1[keyof T1], validator: T2[keyof T2] | undefined };

type IPipelineProperty = PipelinePropertyObject<Omit<IPipeline, 'satellite' | 'injectionPoints'>, NonNullable<IValidators>>;

export type IRecord = IPipelineProperty['record'];

export type IValidator = IPipelineProperty['validator'];


interface IPipelinePropertiesProps {
  open: boolean;
  id: string;
  properties_name: string;
  pipeline_properties: IPipelineProperty[]
}


export default function PipelineProperties({ open, id, properties_name, pipeline_properties }: IPipelinePropertiesProps): JSX.Element {

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            {properties_name}
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pipeline_properties.map(({ columnName, record, validator }) => {
                const columnNameArray = columnName.split(/(?=[A-Z])/);
                for (let i = 0; i < columnNameArray.length; i++) {
                  columnNameArray[i] = columnNameArray[i].charAt(0).toUpperCase() + columnNameArray[i].slice(1);
                }
                const columnNamePretty = columnNameArray.join(' ')

                return (
                  <TableRow key={columnName}>
                    <TableCell>{columnNamePretty}</TableCell>
                    <EntryField id={id} record={record} columnName={columnName} validator={validator} />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
}
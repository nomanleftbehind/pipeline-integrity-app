import EntryField from './EntryField';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { IPipeline } from '../rows/RenderPipeline2';

interface IPipelinePropertiesProps {
  open: boolean;
  id: string;
  properties_name: string;
  pipeline_properties: Partial<IPipeline>;
  pipeline_properties_validators: (string | string[] | number[])[];
}


export default function PipelineProperties({ open, id, properties_name, pipeline_properties, pipeline_properties_validators }: IPipelinePropertiesProps): JSX.Element {

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
              {Object.entries(pipeline_properties).map(([columnName, record], index) => {
                const validator = pipeline_properties_validators[index];
                return (
                  <TableRow key={columnName}>
                    <TableCell>{columnName}</TableCell>
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
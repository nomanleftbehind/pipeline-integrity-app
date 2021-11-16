import EntryField from './EntryField';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { IPipeline, IValidators } from '../rows/RenderPipeline2';


type mechanical_property = (
  ({ length: IPipeline['length'] } | NonNullable<IValidators>['lengthMatchPattern'] | undefined)[] |
  ({ type: IPipeline['type'] } | NonNullable<IValidators>['typeEnum'] | undefined)[] |
  ({ grade: IPipeline['grade'] } | NonNullable<IValidators>['gradeEnum'] | undefined)[] |
  ({ outsideDiameter: IPipeline['outsideDiameter'] } | NonNullable<IValidators>['outsideDiameterMatchPattern'] | undefined)[] |
  ({ wallThickness: IPipeline['wallThickness'] } | NonNullable<IValidators>['wallThicknessMatchPattern'] | undefined)[] |
  ({ material: IPipeline['material'] } | NonNullable<IValidators>['materialEnum'] | undefined)[] |
  ({ mop: IPipeline['mop'] } | NonNullable<IValidators>['mopMatchPattern'] | undefined)[] |
  ({ internalProtection: IPipeline['internalProtection'] } | NonNullable<IValidators>['internalProtectionEnum'] | undefined)[]
)

type IProperty =
  { length: IPipeline['length'] } |
  { type: IPipeline['type'] } |
  { grade: IPipeline['grade'] } |
  { outsideDiameter: IPipeline['outsideDiameter'] } |
  { wallThickness: IPipeline['wallThickness'] } |
  { material: IPipeline['material'] } |
  { mop: IPipeline['mop'] } |
  { internalProtection: IPipeline['internalProtection'] }

type IRecord =
  IPipeline['length'] |
  IPipeline['type'] |
  IPipeline['grade'] |
  IPipeline['outsideDiameter'] |
  IPipeline['wallThickness'] |
  IPipeline['material'] |
  IPipeline['mop'] |
  IPipeline['internalProtection']

export type IValidator =
  NonNullable<IValidators>['lengthMatchPattern'] |
  NonNullable<IValidators>['typeEnum'] |
  NonNullable<IValidators>['gradeEnum'] |
  NonNullable<IValidators>['outsideDiameterMatchPattern'] |
  NonNullable<IValidators>['wallThicknessMatchPattern'] |
  NonNullable<IValidators>['materialEnum'] |
  NonNullable<IValidators>['mopMatchPattern'] |
  NonNullable<IValidators>['internalProtectionEnum']

interface IPipelinePropertiesProps {
  open: boolean;
  id: string;
  properties_name: string;
  pipeline_properties: mechanical_property[]
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
              {pipeline_properties.map(pipeline_property => {
                const [property, validator] = pipeline_property as [IProperty, IValidator]
                const [[columnName, record]] = Object.entries(property) as [[string, IRecord]]
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
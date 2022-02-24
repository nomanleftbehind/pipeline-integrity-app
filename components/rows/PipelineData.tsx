import { useState } from 'react';
import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';
import LicenseChanges from './LicenseChanges';
import GenericTable from './GenericTable';
import PigRuns from './PigRuns';
import Risk from './Risk';
import { IPipeline, IValidators } from './RenderPipeline';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IPipelineProperty } from '../fields/PipelineProperties';

import { TabPanel, a11yProps } from '../../pages/pipeline/[id]/index';

export type ITable = 'pressure tests' | 'pig runs' | 'risk' | 'license change';

export interface IPipelineDataProps {
  open: boolean;
  pipeline: IPipeline;
  validators: IValidators;
  isEven: "even" | "odd";
}

export default function PipelineData({ open, pipeline, validators, isEven }: IPipelineDataProps): JSX.Element {
  const [value, setValue] = useState(0);

  const { id, createdAt, updatedAt, createdBy, updatedBy, license, segment, substance, flowCalculationDirection, from, fromFeature, to, toFeature, injectionPoints, upstream, status, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection } = pipeline;

  const { licenseMatchPattern, segmentMatchPattern, substanceEnum, fromToMatchPattern, fromToFeatureEnum, statusEnum, lengthMatchPattern, typeEnum, gradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum } = validators || {};

  const mechanicalProperties: IPipelineProperty[] = [
    { columnName: 'length', record: length, columnType: 'number', validator: lengthMatchPattern },
    { columnName: 'type', record: type, columnType: 'string', validator: typeEnum },
    { columnName: 'grade', record: grade, columnType: 'string', validator: gradeEnum },
    { columnName: 'yieldStrength', record: yieldStrength, columnType: 'number', validator: yieldStrengthMatchPattern },
    { columnName: 'outsideDiameter', record: outsideDiameter, columnType: 'number', validator: outsideDiameterMatchPattern },
    { columnName: 'wallThickness', record: wallThickness, columnType: 'number', validator: wallThicknessMatchPattern },
    { columnName: 'material', record: material, columnType: 'string', validator: materialEnum },
    { columnName: 'mop', record: mop, columnType: 'number', validator: mopMatchPattern },
    { columnName: 'internalProtection', record: internalProtection, columnType: 'string', validator: internalProtectionEnum }
  ];

  const systemFields: IPipelineProperty[] = [
    { columnName: 'createdBy', record: createdBy.email, columnType: 'string' },
    { columnName: 'createdAt', record: createdAt, columnType: 'date' },
    { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string' },
    { columnName: 'updatedAt', record: updatedAt, columnType: 'date' },
    { columnName: 'id', record: id, columnType: 'string' },
  ];

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TableRow data-target={"pipeline index is " + isEven}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="License Changes" {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Injection Points" {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Mechanical Properties" {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Pressure Tests" {...a11yProps(3)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Pig Runs" {...a11yProps(4)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Risk" {...a11yProps(5)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="System Fields" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <LicenseChanges
                pipelineId={id}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <InjectionPoints
                open={open}
                id={id}
                flowCalculationDirection={flowCalculationDirection}
                upstream={upstream}
                injectionPoints={{ injectionPoints, upstream }}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PipelineProperties
                open={open}
                id={id}
                createdById={createdBy.id}
                propertiesName="Mechanical Properties"
                pipelineProperties={mechanicalProperties}
              />
            </TabPanel>
            {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} /> */}
            <TabPanel value={value} index={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Pressure Tests
                  </Typography>
                  <GenericTable
                    pipelineId={id}
                    in_tab_panel={true}
                    table='pressure tests'
                  />
                </Box>
              </Collapse>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Pig Runs
                  </Typography>
                  <PigRuns pipelineId={id} />
                </Box>
              </Collapse>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Risk
                id={id}
                open={open}
                flowCalculationDirection={flowCalculationDirection}
                substance={substance}
                status={status}
                type={type}
                material={material}
              />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <PipelineProperties
                open={open}
                id={id}
                createdById={createdBy.id}
                propertiesName="System Fields"
                pipelineProperties={systemFields}
              />
            </TabPanel>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
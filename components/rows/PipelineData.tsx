import { useState } from 'react';
import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';
import GenericTable from './GenericTable';
import Risk from './Risk';
import { IPipeline, IValidators } from './RenderPipeline';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { TabPanel, a11yProps } from '../../pages/pipeline/[id]/index';

export type ITable = 'pressure tests' | 'pig runs' | 'risk';

export interface IPipelineDataProps {
  open: boolean;
  pipeline: IPipeline;
  validators: IValidators;
  isEven: "even" | "odd";
}

export default function PipelineData({ open, pipeline, validators, isEven }: IPipelineDataProps): JSX.Element {
  const [value, setValue] = useState(0);

  const { id, createdAt, updatedAt, createdBy, license, segment, substance, from, fromFeature, to, toFeature, injectionPoints, upstream, status, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection } = pipeline;

  const { licenseMatchPattern, segmentMatchPattern, substanceEnum, fromToMatchPattern, fromToFeatureEnum, statusEnum, lengthMatchPattern, typeEnum, gradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum } = validators || {};

  const mechanical_properties = [
    { columnName: 'length', record: length, validator: lengthMatchPattern },
    { columnName: 'type', record: type, validator: typeEnum },
    { columnName: 'grade', record: grade, validator: gradeEnum },
    { columnName: 'yieldStrength', record: yieldStrength, validator: yieldStrengthMatchPattern },
    { columnName: 'outsideDiameter', record: outsideDiameter, validator: outsideDiameterMatchPattern },
    { columnName: 'wallThickness', record: wallThickness, validator: wallThicknessMatchPattern },
    { columnName: 'material', record: material, validator: materialEnum },
    { columnName: 'mop', record: mop, validator: mopMatchPattern },
    { columnName: 'internalProtection', record: internalProtection, validator: internalProtectionEnum }
  ];

  const systemFields = [
    { columnName: 'createdBy', record: createdBy.email, validator: undefined },
    { columnName: 'createdAt', record: createdAt, validator: undefined },
    { columnName: 'updatedAt', record: updatedAt, validator: undefined },
    { columnName: 'id', record: id, validator: undefined },
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
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Injection Points" {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Mechanical Properties" {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Pressure Tests" {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Pig Runs" {...a11yProps(3)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="Risk" {...a11yProps(4)} />
              <Tab sx={{ textTransform: 'none' }} style={{ marginRight: 8 }} label="System Fields" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <InjectionPoints
                open={open}
                id={id}
                upstream={upstream}
                injectionPoints={{ injectionPoints, upstream }}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PipelineProperties
                open={open}
                id={id}
                propertiesName="Mechanical Properties"
                pipelineProperties={mechanical_properties}
              />
            </TabPanel>
            {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} /> */}
            <TabPanel value={value} index={2}>
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
            <TabPanel value={value} index={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Pig Runs
                  </Typography>
                  <GenericTable
                    pipelineId={id}
                    in_tab_panel={true}
                    table='pig runs'
                  />
                </Box>
              </Collapse>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Risk id={id} open={open} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <PipelineProperties
                open={open}
                id={id}
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
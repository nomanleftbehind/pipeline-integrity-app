import { useState } from 'react';
import InjectionPoints from '../fields/injection_points/InjectionPoints';
import PipelineProperties from '../fields/PipelineProperties';
import LicenseChanges from './LicenseChanges';
import MechanicalProperties from './MechanicalProperties';
import PressureTests from './PressureTests';
import PigRuns from './PigRuns';
import Risk from './Risk';
import { IPipeline, IValidators } from './RenderPipeline';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IPipelineProperty } from '../fields/PipelineProperties';

import { TabPanel, a11yProps } from '../../pages/pipeline/[id]/index';

export type ITable = 'pressure tests' | 'pig runs' | 'risk' | 'license change';

export interface IPipelineDataProps {
  ppl_idx: number;
  open: boolean;
  pipeline: IPipeline;
  validators: IValidators;
  isEven: "even" | "odd";
}

const border = 'rgb(40 155 151) 2px solid';
const borderRadius = '6px';
const color = 'white';

export default function PipelineData({ ppl_idx, open, pipeline, validators, isEven }: IPipelineDataProps): JSX.Element {
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
    <div style={{ gridColumn: '1 / 10', gridRow: ppl_idx + 1 }}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ display: 'grid', gridTemplateColumns: '200px auto', rowGap: '2px', columnGap: '4px', gridAutoRows: 'minmax(40px, auto)', padding: '0 4px 0 4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', border, borderRadius, color, gridColumn: 1, gridRow: 1 }}>
            <div style={{ padding: '4px', textAlign: 'center' }}>License Changes</div>
            <div style={{ padding: '4px', textAlign: 'center' }}>Injection Points</div>
            <div style={{ padding: '4px', textAlign: 'center' }}>Mechanical Properties</div>
            <div style={{ padding: '4px', textAlign: 'center' }}>Pressure Tests</div>
            <div style={{ padding: '4px', textAlign: 'center' }}>Pig Runs</div>
            <div style={{ padding: '4px', textAlign: 'center' }}>Risk</div>
            <div style={{ padding: '4px', textAlign: 'center' }}>System Fields</div>
          </div>
          <div style={{ gridColumn: 2, gridRow: 1, border, borderRadius, color }}>
            Rest
          </div>
        </div>
      </Collapse>
    </div>
  );
}



/*<TableRow data-target={"pipeline index is " + isEven}>
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
              <MechanicalProperties
                id={id}
                createdBy={createdBy}
                length={length}
                type={type}
                grade={grade}
                yieldStrength={yieldStrength}
                outsideDiameter={outsideDiameter}
                wallThickness={wallThickness}
                material={material}
                mop={mop}
                internalProtection={internalProtection}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PressureTests
                pipelineId={id}
                length={length}
                mop={mop}
                outsideDiameter={outsideDiameter}
                wallThickness={wallThickness}
                yieldStrength={yieldStrength}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <PigRuns pipelineId={id} />
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
    </TableRow>*/
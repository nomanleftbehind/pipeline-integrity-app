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
// import Tab from '@mui/material/Tab';
import { IPipelineProperty } from '../fields/PipelineProperties';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import { TabPanel, a11yProps } from '../../pages/pipeline/[id]/index';

export type ITable = 'pressure tests' | 'pig runs' | 'risk' | 'license change';

export interface IPipelineDataProps {
  ppl_idx: number;
  open: boolean;
  pipeline: IPipeline;
  validators: IValidators;
  isEven: "even" | "odd";
}

type IView = 'license change' | 'injection point' | 'mechanical properties' | 'pressure test' | 'pig run' | 'risk' | 'system fields';

interface ITabPanelMap {
  title: string;
  view: IView;
}

interface ITabPanelProps extends ITabPanelMap {
  currentView: IView;
  handleViewClick: (view: IView) => void;
}

const border = 'rgb(40 155 151) 2px solid';
const borderRadius = '6px';
const color = 'white';

export default function PipelineData({ ppl_idx, open, pipeline, validators, isEven }: IPipelineDataProps) {
  const [value, setValue] = useState(0);
  const [view, setView] = useState<IView>('license change');

  const { id, createdAt, updatedAt, createdBy, updatedBy, license, segment, currentSubstance, flowCalculationDirection, from, fromFeature, to, toFeature, injectionPoints, upstream, currentStatus, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection } = pipeline;

  const { licenseMatchPattern, segmentMatchPattern, substanceEnum, fromToMatchPattern, fromToFeatureEnum, statusEnum, lengthMatchPattern, typeEnum, gradeEnum, yieldStrengthMatchPattern, outsideDiameterMatchPattern, wallThicknessMatchPattern, materialEnum, mopMatchPattern, internalProtectionEnum } = validators || {};

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

  const handleViewClick = (view: IView) => {
    setView(view);
  }

  const renderView = () => {
    if (view === 'license change') {
      return <LicenseChanges
        pipelineId={id}
      />
    }
    if (view === 'injection point') {
      return <InjectionPoints
        open={open}
        id={id}
        flowCalculationDirection={flowCalculationDirection}
        upstream={upstream}
        injectionPoints={{ injectionPoints, upstream }}
      />
    }
    if (view === 'mechanical properties') {
      return <MechanicalProperties
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
    }
    if (view === 'pressure test') {
      return <PressureTests
        pipelineId={id}
        length={length}
        mop={mop}
        outsideDiameter={outsideDiameter}
        wallThickness={wallThickness}
        yieldStrength={yieldStrength}
      />
    }
    if (view === 'pig run') {
      return <PigRuns pipelineId={id} />
    }
    if (view === 'risk') {
      <Risk
        id={id}
        open={open}
        flowCalculationDirection={flowCalculationDirection}
        currentSubstance={currentSubstance}
        currentStatus={currentStatus}
        type={type}
        material={material}
      />
    }
    if (view === 'system fields') {
      <PipelineProperties
        open={open}
        id={id}
        createdById={createdBy.id}
        propertiesName="System Fields"
        pipelineProperties={systemFields}
      />
    }
  }

  const tabs: ITabPanelMap[] = [
    { title: 'License Changes', view: 'license change' },
    { title: 'Injection Points', view: 'injection point' },
    { title: 'Mechanical Properties', view: 'mechanical properties' },
    { title: 'Pressure Tests', view: 'pressure test' },
    { title: 'Pig Runs', view: 'pig run' },
    { title: 'Risk', view: 'risk' },
    { title: 'System Fields', view: 'system fields' },
  ]


  return (
    <div style={{ gridColumn: '1 / 13', gridRow: ppl_idx + 1 }}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className='pipeline-data'>
          <div className='tabs'>
            <nav role='navigation'>
              <ol>
                {tabs.map(({ title, view: mappedView }, i) => <TabPanel key={i} title={title} view={mappedView} currentView={view} handleViewClick={handleViewClick} />)}
              </ol>
            </nav>
          </div>
          <div className='pipeline-data-view'>
            {renderView()}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

function TabPanel({ title, view, currentView, handleViewClick }: ITabPanelProps) {

  return (
    <li className={currentView === view ? 'tab-panel highlighted' : 'tab-panel'} onClick={() => handleViewClick(view)}>
      <div style={{ padding: '4px' }}>{title}</div>
      <div style={{ padding: '4px' }}>
        <ArrowForwardIosIcon />
      </div>
    </li>
  )
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
import { useState } from 'react';
// import InjectionPoints from '../fields/injection_points/InjectionPoints';
import ConnectedSources from './Sources/ConnectedSources';
import PipelineProperties from '../fields/PipelineProperties';
import LicenseChanges from './LicenseChanges';
import MechanicalProperties from './MechanicalProperties';
import PressureTests from './PressureTests';
import PigRuns from './PigRuns';
import PipelineBatches from './PipelineBatches';
import Risk from './Risk';
import { IEditRecordFunction } from '../fields/RecordEntry';
import { IPipeline } from './RenderPipeline';
import Collapse from '@mui/material/Collapse';
import { IPipelineProperty } from '../fields/PipelineProperties';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type ITable = 'pressure tests' | 'pig runs' | 'risk' | 'license change';

export interface IPipelineDataProps {
  gridRow: number;
  open: boolean;
  pipeline: IPipeline;
  authorized: boolean;
  editPipeline: IEditRecordFunction;
  isEven: "even" | "odd";
}

type IView = 'license change' | 'connected source' | 'mechanical properties' | 'pressure test' | 'pig run' | 'pipeline batch' | 'risk' | 'system fields';

interface ITabPanelMap {
  title: string;
  view: IView;
}

interface ITabPanelProps extends ITabPanelMap {
  currentView: IView;
  handleViewClick: (view: IView) => void;
}

export default function PipelineData({ gridRow, open, pipeline, editPipeline, authorized, isEven }: IPipelineDataProps) {
  const [view, setView] = useState<IView>('license change');

  const { id, currentSubstance, flowCalculationDirection, currentStatus, length, type, grade, yieldStrength, outsideDiameter, wallThickness, material, mop, internalProtection, firstLicenseDate } = pipeline;

  // const systemFields: IPipelineProperty[] = [
  //   { columnName: 'createdBy', record: createdBy.email, columnType: 'string' },
  //   { columnName: 'createdAt', record: createdAt, columnType: 'date' },
  //   { columnName: 'updatedBy', record: updatedBy.email, columnType: 'string' },
  //   { columnName: 'updatedAt', record: updatedAt, columnType: 'date' },
  //   { columnName: 'id', record: id, columnType: 'string' },
  // ];

  const handleViewClick = (view: IView) => {
    setView(view);
  }

  const renderView = () => {
    if (view === 'license change') {
      return <LicenseChanges
        pipelineId={id}
      />
    }
    if (view === 'connected source') {
      return <ConnectedSources
        pipelineId={id}
        flowCalculationDirection={flowCalculationDirection}
      />
    }
    if (view === 'mechanical properties') {
      return <MechanicalProperties
        id={id}
        length={length}
        type={type}
        grade={grade}
        yieldStrength={yieldStrength}
        outsideDiameter={outsideDiameter}
        wallThickness={wallThickness}
        material={material}
        mop={mop}
        internalProtection={internalProtection}
        authorized={authorized}
        editPipeline={editPipeline}
      />
    }
    if (view === 'pressure test') {
      return <PressureTests
        pipelineId={id}
      />
    }
    if (view === 'pig run') {
      return <PigRuns pipelineId={id} />
    }
    if (view === 'pipeline batch') {
      return <PipelineBatches pipelineId={id} />
    }
    if (view === 'risk') {
      return <Risk
        id={id}
        flowCalculationDirection={flowCalculationDirection}
        currentSubstance={currentSubstance}
        currentStatus={currentStatus}
        editPipeline={editPipeline}
        type={type}
        material={material}
        firstLicenseDate={firstLicenseDate}
      />
    }
    // if (view === 'system fields') {
    //   return <PipelineProperties
    //     open={open}
    //     id={id}
    //     createdById={createdBy.id}
    //     propertiesName="System Fields"
    //     pipelineProperties={systemFields}
    //   />
    // }
  }

  const tabs: ITabPanelMap[] = [
    { title: 'License Changes', view: 'license change' },
    { title: 'Connected Sources', view: 'connected source' },
    { title: 'Mechanical Properties', view: 'mechanical properties' },
    { title: 'Pressure Tests', view: 'pressure test' },
    { title: 'Pig Runs', view: 'pig run' },
    { title: 'Pipeline Batches', view: 'pipeline batch' },
    { title: 'Risk', view: 'risk' },
    { title: 'System Fields', view: 'system fields' },
  ]


  return (
    <div style={{ gridColumn: '1 / 13', gridRow: gridRow + 1 }}>
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
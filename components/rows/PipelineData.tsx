import { useState } from 'react';
import ConnectedSources from './ConnectedSources/ConnectedSources';
import LicenseChanges from './LicenseChanges';
import MechanicalProperties from './MechanicalProperties';
import PressureTests from './PressureTests';
import PigRuns from './PigRuns';
import PipelineBatches from './PipelineBatches';
import Risk from './Risk';
import Geotechnicals from './Geotechnicals';
import Chemical from './Chemical';
import { IEditRecordFunction } from '../fields/RecordEntry';
import { IPipeline, IValidators } from './RenderPipeline';
import Collapse from '@mui/material/Collapse';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type ITable = 'pressure tests' | 'pig runs' | 'risk' | 'license change';

export interface IPipelineDataProps {
  gridRow: number;
  rowIsEven: boolean;
  open: boolean;
  pipeline: IPipeline;
  validators: IValidators;
  authorized: boolean;
  editPipeline: IEditRecordFunction;
}


type PickNullable<T, K extends keyof T> = {
  [P in K]: T[P];
} | null | undefined;


export type IValidatorsPipelineProperties = PickNullable<NonNullable<IValidators>, 'flowCalculationDirectionEnum'>;
export type IValidatorsLicenseChanges = PickNullable<NonNullable<IValidators>, 'statusEnum' | 'substanceEnum' | 'fromToMatchPattern' | 'fromToFeatureEnum' | 'lengthMatchPattern' | 'pipelineTypeEnum' | 'gradeEnum' | 'yieldStrengthMatchPattern' | 'outsideDiameterMatchPattern' | 'wallThicknessMatchPattern' | 'materialEnum' | 'mopMatchPattern' | 'internalProtectionEnum'>;
export type IValidatorsGeotechnicals = PickNullable<NonNullable<IValidators>, 'geotechnicalFacingEnum'>;
export type IValidatorsConnectedSources = PickNullable<NonNullable<IValidators>, 'flowCalculationDirectionEnum'>;
export type IValidatorsPressureTests = PickNullable<NonNullable<IValidators>, 'limitingSpecEnum'>;
export type IValidatorsRisk = PickNullable<NonNullable<IValidators>, 'riskEnvironmentEnum' | 'pipelineTypeEnum' | 'materialEnum'>;
export type IValidatorsPigRuns = PickNullable<NonNullable<IValidators>, 'pigTypeEnum' | 'pigInspectionEnum' | 'operatorEnum'>;
export type IValidatorsPipelineBatches = PickNullable<NonNullable<IValidators>, 'solubilityEnum' | 'batchProductEnum'>;
export type IValidatorsChemical = PickNullable<NonNullable<IValidators>, 'chemicalSupplierEnum'>;
export type IValidatorsNavigation = PickNullable<NonNullable<IValidators>, 'operationEnum' | 'havingEnum'>;

type IView = 'license change' | 'connected source' | 'mechanical properties' | 'pressure test' | 'pig run' | 'pipeline batch' | 'risk' | 'geotechnical' | 'chemical' | 'system fields';

interface ITabPanelMap {
  title: string;
  view: IView;
}

interface ITabPanelProps extends ITabPanelMap {
  currentView: IView;
  handleViewClick: (view: IView) => void;
}

export default function PipelineData({ gridRow, rowIsEven, open, pipeline, editPipeline, authorized, validators }: IPipelineDataProps) {
  const [view, setView] = useState<IView>('license change');

  const { id, license, segment, currentSubstance, flowCalculationDirection, currentStatus, firstLicenseDate, piggable, piggingFrequency, comment } = pipeline;

  const validatorsLicenseChanges: IValidatorsLicenseChanges = validators && {
    statusEnum: validators.statusEnum,
    substanceEnum: validators.substanceEnum,
    lengthMatchPattern: validators.lengthMatchPattern,
    pipelineTypeEnum: validators.pipelineTypeEnum,
    gradeEnum: validators.gradeEnum,
    yieldStrengthMatchPattern: validators.yieldStrengthMatchPattern,
    outsideDiameterMatchPattern: validators.outsideDiameterMatchPattern,
    wallThicknessMatchPattern: validators.wallThicknessMatchPattern,
    materialEnum: validators.materialEnum,
    mopMatchPattern: validators.mopMatchPattern,
    internalProtectionEnum: validators.internalProtectionEnum,
    fromToMatchPattern: validators.fromToMatchPattern,
    fromToFeatureEnum: validators.fromToFeatureEnum,
  };

  const validatorsConnectedSources: IValidatorsConnectedSources = validators && {
    flowCalculationDirectionEnum: validators.flowCalculationDirectionEnum,
  };

  const validatorsPipelineProperties: IValidatorsPipelineProperties = validators && {
    flowCalculationDirectionEnum: validators.flowCalculationDirectionEnum,
  };

  const validatorsPressureTests: IValidatorsPressureTests = validators && {
    limitingSpecEnum: validators.limitingSpecEnum,
  };

  const validatorsRisk: IValidatorsRisk = validators && {
    riskEnvironmentEnum: validators.riskEnvironmentEnum,
    pipelineTypeEnum: validators.pipelineTypeEnum,
    materialEnum: validators.materialEnum,
  };

  const validatorsGeotechnicals: IValidatorsGeotechnicals = validators && {
    geotechnicalFacingEnum: validators.geotechnicalFacingEnum,

  };

  const validatorsPigRuns: IValidatorsPigRuns = validators && {
    pigTypeEnum: validators.pigTypeEnum,
    pigInspectionEnum: validators.pigInspectionEnum,
    operatorEnum: validators.operatorEnum,
  };

  const validatorsPipelineBatches: IValidatorsPipelineBatches = validators && {
    solubilityEnum: validators.solubilityEnum,
    batchProductEnum: validators.batchProductEnum,
  };

  const validatorsChemical: IValidatorsChemical = validators && {
    chemicalSupplierEnum: validators.chemicalSupplierEnum,
  };


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
        validators={validatorsLicenseChanges}
      />
    }
    if (view === 'connected source') {
      return <ConnectedSources
        pipelineId={id}
        flowCalculationDirection={flowCalculationDirection}
        validators={validatorsConnectedSources}
        editPipeline={editPipeline}
        authorized={authorized}
      />
    }
    if (view === 'mechanical properties') {
      return <MechanicalProperties
        id={id}
        flowCalculationDirection={flowCalculationDirection}
        piggable={piggable}
        piggingFrequency={piggingFrequency}
        authorized={authorized}
        editPipeline={editPipeline}
        validators={validatorsPipelineProperties}
      />
    }
    if (view === 'pressure test') {
      return <PressureTests
        pipelineId={id}
        validators={validatorsPressureTests}
      />
    }
    if (view === 'pig run') {
      return <PigRuns
        pipelineId={id}
        validators={validatorsPigRuns}
      />
    }
    if (view === 'pipeline batch') {
      return <PipelineBatches
        pipelineId={id}
        validators={validatorsPipelineBatches}
      />
    }
    if (view === 'risk') {
      return <Risk
        id={id}
        license={license}
        segment={segment}
        flowCalculationDirection={flowCalculationDirection}
        currentSubstance={currentSubstance}
        currentStatus={currentStatus}
        editPipeline={editPipeline}
        firstLicenseDate={firstLicenseDate}
        validators={validatorsRisk}
      />
    }
    if (view === 'geotechnical') {
      return <Geotechnicals
        pipelineId={id}
        validators={validatorsGeotechnicals}
      />
    }
    if (view === 'chemical') {
      return <Chemical
        id={id}
        license={license}
        segment={segment}
        validators={validatorsChemical}
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
    { title: 'Chemical', view: 'chemical' },
    { title: 'Risk', view: 'risk' },
    { title: 'Geotechnical', view: 'geotechnical' },
    { title: 'System Fields', view: 'system fields' },
  ];


  return (
    <div style={{ gridColumn: '1 / 13', gridRow: gridRow + 1, backgroundColor: rowIsEven ? '#d2eef8' : '#fcf9e6' }}>
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
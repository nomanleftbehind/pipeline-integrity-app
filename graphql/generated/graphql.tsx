import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
};

export type AllocationPayload = {
  error?: Maybe<FieldError>;
  success?: Maybe<FieldError>;
};

export type AuthPayload = {
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type BatchProduct = {
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['String'];
  pipelineBatches?: Maybe<Array<Maybe<PipelineBatch>>>;
  product: Scalars['String'];
  productType?: Maybe<Scalars['String']>;
  solubility: SolubilityEnum;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  wellBatches?: Maybe<Array<Maybe<WellBatch>>>;
};

export type Chemical = {
  authorized: Scalars['Boolean'];
  bacteria?: Maybe<Scalars['Boolean']>;
  bacteriaTreatment?: Maybe<Scalars['Boolean']>;
  baselineFluidAnalysisDate?: Maybe<Scalars['DateTime']>;
  batchFrequency?: Maybe<Scalars['Int']>;
  chemicalSupplier?: Maybe<ChemicalSupplier>;
  chemicalSupplierId?: Maybe<Scalars['String']>;
  co2?: Maybe<Scalars['Boolean']>;
  comment?: Maybe<Scalars['String']>;
  continuousInjection?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  downholeBatch?: Maybe<Scalars['Boolean']>;
  h2s?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  inhibitorPipelineBatch?: Maybe<Scalars['Boolean']>;
  injectionRate?: Maybe<Scalars['Float']>;
  o2?: Maybe<Scalars['Boolean']>;
  pipeline: Pipeline;
  scaleTreatment?: Maybe<Scalars['Boolean']>;
  scaling?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type ChemicalPayload = {
  chemical?: Maybe<Chemical>;
  error?: Maybe<FieldError>;
};

export type ChemicalSupplier = {
  authorized: Scalars['Boolean'];
  chemicals?: Maybe<Array<Maybe<Chemical>>>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type EnumObject = {
  databaseEnum: Scalars['String'];
  serverEnum: Scalars['String'];
};

export enum EnvironmentProximityToEnum {
  Wb1 = 'WB1',
  Wb3 = 'WB3',
  Wb4 = 'WB4',
  Wb5 = 'WB5',
  Wc1 = 'WC1',
  Wc2 = 'WC2',
  Wc3 = 'WC3',
  Wc4 = 'WC4'
}

export type EnvironmentProximityToEnumObject = {
  WB1: Scalars['String'];
  WB3: Scalars['String'];
  WB4: Scalars['String'];
  WB5: Scalars['String'];
  WC1: Scalars['String'];
  WC2: Scalars['String'];
  WC3: Scalars['String'];
  WC4: Scalars['String'];
};

export type Facility = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['String'];
  name: Scalars['String'];
  satellites?: Maybe<Array<Maybe<Satellite>>>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type FacilityCreateInput = {
  name: Scalars['String'];
  satellites?: Maybe<Array<Maybe<SatelliteCreateInput>>>;
};

export type FacilityUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export enum FlowCalculationDirectionEnum {
  Downstream = 'Downstream',
  Upstream = 'Upstream'
}

export type FlowCalculationDirectionEnumObject = {
  Downstream: Scalars['String'];
  Upstream: Scalars['String'];
};

export enum FromToFeatureEnum {
  Battery = 'Battery',
  BlindEnd = 'BlindEnd',
  CompressorStation = 'CompressorStation',
  GasProcessingPlant = 'GasProcessingPlant',
  Header = 'Header',
  InjectionPlant = 'InjectionPlant',
  MeterStation = 'MeterStation',
  Pipeline = 'Pipeline',
  PumpStation = 'PumpStation',
  Satellite = 'Satellite',
  StorageTank = 'StorageTank',
  UndergroundCapOrTieIn = 'UndergroundCapOrTieIn',
  Well = 'Well'
}

export type FromToFeatureEnumObject = {
  Battery: Scalars['String'];
  BlindEnd: Scalars['String'];
  CompressorStation: Scalars['String'];
  GasProcessingPlant: Scalars['String'];
  Header: Scalars['String'];
  InjectionPlant: Scalars['String'];
  MeterStation: Scalars['String'];
  Pipeline: Scalars['String'];
  PumpStation: Scalars['String'];
  Satellite: Scalars['String'];
  StorageTank: Scalars['String'];
  UndergroundCapOrTieIn: Scalars['String'];
  Well: Scalars['String'];
};

export enum GeotechnicalFacingEnum {
  E = 'E',
  N = 'N',
  Ne = 'NE',
  Nw = 'NW',
  S = 'S',
  Se = 'SE',
  Sw = 'SW',
  W = 'W'
}

export type GeotechnicalFacingEnumObject = {
  E: Scalars['String'];
  N: Scalars['String'];
  NE: Scalars['String'];
  NW: Scalars['String'];
  S: Scalars['String'];
  SE: Scalars['String'];
  SW: Scalars['String'];
  W: Scalars['String'];
};

export enum GradeEnum {
  Grade5 = 'Grade5',
  Grade9 = 'Grade9',
  Grade11 = 'Grade11',
  Grade17 = 'Grade17',
  Grade25 = 'Grade25',
  Grade35 = 'Grade35',
  Grade150 = 'Grade150',
  Grade155 = 'Grade155',
  Grade200 = 'Grade200',
  Grade241 = 'Grade241',
  Grade300 = 'Grade300',
  Grade800 = 'Grade800',
  Grade810 = 'Grade810',
  Grade900 = 'Grade900',
  Grade1000 = 'Grade1000',
  Grade1103 = 'Grade1103',
  Grade1200 = 'Grade1200',
  Grade1250 = 'Grade1250',
  Grade2010 = 'Grade2010',
  Grade2250 = 'Grade2250',
  Grade2411 = 'Grade2411',
  Grade2413 = 'Grade2413',
  Grade2500 = 'Grade2500',
  Grade2750 = 'Grade2750',
  Grade2901 = 'Grade2901',
  Grade2902 = 'Grade2902',
  Grade3591 = 'Grade3591',
  Grade3592 = 'Grade3592',
  Grade3593 = 'Grade3593',
  GradeA = 'GradeA',
  GradeB = 'GradeB',
  GradeBw1 = 'GradeBW1',
  GradeJ55 = 'GradeJ55',
  GradeT1A = 'GradeT1A',
  GradeT1B = 'GradeT1B',
  GradeT4 = 'GradeT4',
  GradeT4A = 'GradeT4A',
  GradeX42 = 'GradeX42',
  GradeX52 = 'GradeX52'
}

export type GradeEnumObject = {
  Grade5: Scalars['String'];
  Grade9: Scalars['String'];
  Grade11: Scalars['String'];
  Grade17: Scalars['String'];
  Grade25: Scalars['String'];
  Grade35: Scalars['String'];
  Grade150: Scalars['String'];
  Grade155: Scalars['String'];
  Grade200: Scalars['String'];
  Grade241: Scalars['String'];
  Grade300: Scalars['String'];
  Grade800: Scalars['String'];
  Grade810: Scalars['String'];
  Grade900: Scalars['String'];
  Grade1000: Scalars['String'];
  Grade1103: Scalars['String'];
  Grade1200: Scalars['String'];
  Grade1250: Scalars['String'];
  Grade2010: Scalars['String'];
  Grade2250: Scalars['String'];
  Grade2411: Scalars['String'];
  Grade2413: Scalars['String'];
  Grade2500: Scalars['String'];
  Grade2750: Scalars['String'];
  Grade2901: Scalars['String'];
  Grade2902: Scalars['String'];
  Grade3591: Scalars['String'];
  Grade3592: Scalars['String'];
  Grade3593: Scalars['String'];
  GradeA: Scalars['String'];
  GradeB: Scalars['String'];
  GradeBW1: Scalars['String'];
  GradeJ55: Scalars['String'];
  GradeT1A: Scalars['String'];
  GradeT1B: Scalars['String'];
  GradeT4: Scalars['String'];
  GradeT4A: Scalars['String'];
  GradeX42: Scalars['String'];
  GradeX52: Scalars['String'];
};

export enum HavingEnum {
  Any = 'any',
  Count = 'count',
  Maximum = 'maximum',
  Minimum = 'minimum'
}

export type HavingEnumObject = {
  _any: HavingEnum;
  _count: HavingEnum;
  _max: HavingEnum;
  _min: HavingEnum;
};

export type HierarchyInput = {
  id: Scalars['String'];
  table: TableEnum;
};

export enum InternalProtectionEnum {
  Cement = 'Cement',
  ExpandedPolyethylene = 'ExpandedPolyethylene',
  FreeStandingSlipLined = 'FreeStandingSlipLined',
  ThinFilm = 'ThinFilm',
  Uncoated = 'Uncoated',
  Unknown = 'Unknown'
}

export type InternalProtectionEnumObject = {
  Cement: Scalars['String'];
  ExpandedPolyethylene: Scalars['String'];
  FreeStandingSlipLined: Scalars['String'];
  ThinFilm: Scalars['String'];
  Uncoated: Scalars['String'];
  Unknown: Scalars['String'];
};

export type LicenseChange = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  date: Scalars['DateTime'];
  id: Scalars['String'];
  linkToDocumentation?: Maybe<Scalars['String']>;
  pipeline: Pipeline;
  status: StatusEnum;
  substance: SubstanceEnum;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type LicenseChangePayload = {
  error?: Maybe<FieldError>;
  licenseChange?: Maybe<LicenseChange>;
};

export enum LimitingSpecEnum {
  Ansi150 = 'ANSI150',
  Ansi300 = 'ANSI300',
  Ansi600 = 'ANSI600'
}

export type LimitingSpecEnumObject = {
  ANSI150: Scalars['String'];
  ANSI300: Scalars['String'];
  ANSI600: Scalars['String'];
};

export enum MaterialEnum {
  Aluminum = 'Aluminum',
  AsbestosCement = 'AsbestosCement',
  CelluloseAcetateButyrate = 'CelluloseAcetateButyrate',
  Composite = 'Composite',
  Fiberglass = 'Fiberglass',
  Polyethylene = 'Polyethylene',
  PolyvinylChloride = 'PolyvinylChloride',
  Steel = 'Steel',
  Unknown = 'Unknown'
}

export type MaterialEnumObject = {
  Aluminum: Scalars['String'];
  AsbestosCement: Scalars['String'];
  CelluloseAcetateButyrate: Scalars['String'];
  Composite: Scalars['String'];
  Fiberglass: Scalars['String'];
  Polyethylene: Scalars['String'];
  PolyvinylChloride: Scalars['String'];
  Steel: Scalars['String'];
  Unknown: Scalars['String'];
};

export type Mutation = {
  addChemical?: Maybe<ChemicalPayload>;
  addLicenseChange?: Maybe<LicenseChangePayload>;
  addPigRun?: Maybe<PigRunPayload>;
  addPipelineBatch?: Maybe<PipelineBatchPayload>;
  addPressureTest?: Maybe<PressureTestPayload>;
  addRisk?: Maybe<RiskPayload>;
  addWellBatch?: Maybe<WellBatchPayload>;
  allocateRisk?: Maybe<AllocationPayload>;
  connectPipeline?: Maybe<PipelinesOnPipelinesPayload>;
  connectSalesPoint?: Maybe<SalesPointPayload>;
  connectWell?: Maybe<WellPayload>;
  createFacility?: Maybe<Facility>;
  deleteChemical?: Maybe<ChemicalPayload>;
  deleteLicenseChange?: Maybe<LicenseChangePayload>;
  deletePigRun?: Maybe<PigRunPayload>;
  deletePipeline?: Maybe<PipelinePayload>;
  deletePipelineBatch?: Maybe<PipelineBatchPayload>;
  deletePressureTest?: Maybe<PressureTestPayload>;
  deleteRisk?: Maybe<RiskPayload>;
  deleteSatellite?: Maybe<Satellite>;
  deleteWellBatch?: Maybe<WellBatchPayload>;
  disconnectPipeline?: Maybe<PipelinesOnPipelinesPayload>;
  disconnectSalesPoint?: Maybe<SalesPointPayload>;
  disconnectWell?: Maybe<WellPayload>;
  duplicatePipeline?: Maybe<PipelinePayload>;
  editChemical?: Maybe<ChemicalPayload>;
  editFacility?: Maybe<Facility>;
  editLicenseChange?: Maybe<LicenseChangePayload>;
  editPigRun?: Maybe<PigRunPayload>;
  editPipeline?: Maybe<PipelinePayload>;
  editPipelineBatch?: Maybe<PipelineBatchPayload>;
  editPressureTest?: Maybe<PressureTestPayload>;
  editRisk?: Maybe<RiskPayload>;
  editSalesPoint?: Maybe<SalesPointPayload>;
  editSatellite?: Maybe<Satellite>;
  editWell?: Maybe<WellPayload>;
  editWellBatch?: Maybe<WellBatchPayload>;
  login?: Maybe<AuthPayload>;
  logout?: Maybe<Scalars['Boolean']>;
  signup?: Maybe<AuthPayload>;
};


export type MutationAddChemicalArgs = {
  id: Scalars['String'];
};


export type MutationAddLicenseChangeArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddPigRunArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddPipelineBatchArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddPressureTestArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddRiskArgs = {
  id: Scalars['String'];
};


export type MutationAddWellBatchArgs = {
  wellId: Scalars['String'];
};


export type MutationConnectPipelineArgs = {
  connectNewPipelineId: Scalars['String'];
  connectedPipelineId?: Maybe<Scalars['String']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  pipelineId: Scalars['String'];
};


export type MutationConnectSalesPointArgs = {
  id: Scalars['String'];
  pipelineId: Scalars['String'];
};


export type MutationConnectWellArgs = {
  id: Scalars['String'];
  pipelineId: Scalars['String'];
};


export type MutationCreateFacilityArgs = {
  data: FacilityCreateInput;
};


export type MutationDeleteChemicalArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLicenseChangeArgs = {
  id: Scalars['String'];
};


export type MutationDeletePigRunArgs = {
  id: Scalars['String'];
};


export type MutationDeletePipelineArgs = {
  id: Scalars['String'];
};


export type MutationDeletePipelineBatchArgs = {
  id: Scalars['String'];
};


export type MutationDeletePressureTestArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRiskArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSatelliteArgs = {
  id: Scalars['String'];
};


export type MutationDeleteWellBatchArgs = {
  id: Scalars['String'];
};


export type MutationDisconnectPipelineArgs = {
  disconnectPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
  pipelineId: Scalars['String'];
};


export type MutationDisconnectSalesPointArgs = {
  id: Scalars['String'];
};


export type MutationDisconnectWellArgs = {
  id: Scalars['String'];
};


export type MutationDuplicatePipelineArgs = {
  id: Scalars['String'];
};


export type MutationEditChemicalArgs = {
  bacteria?: Maybe<Scalars['Boolean']>;
  bacteriaTreatment?: Maybe<Scalars['Boolean']>;
  baselineFluidAnalysisDate?: Maybe<Scalars['DateTime']>;
  batchFrequency?: Maybe<Scalars['Int']>;
  chemicalSupplierId?: Maybe<Scalars['String']>;
  co2?: Maybe<Scalars['Boolean']>;
  comment?: Maybe<Scalars['String']>;
  continuousInjection?: Maybe<Scalars['Boolean']>;
  downholeBatch?: Maybe<Scalars['Boolean']>;
  h2s?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  inhibitorPipelineBatch?: Maybe<Scalars['Boolean']>;
  injectionRate?: Maybe<Scalars['Float']>;
  o2?: Maybe<Scalars['Boolean']>;
  scaleTreatment?: Maybe<Scalars['Boolean']>;
  scaling?: Maybe<Scalars['Boolean']>;
};


export type MutationEditFacilityArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationEditLicenseChangeArgs = {
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  linkToDocumentation?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
};


export type MutationEditPigRunArgs = {
  comment?: Maybe<Scalars['String']>;
  dateIn?: Maybe<Scalars['DateTime']>;
  dateOut?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  operatorId?: Maybe<Scalars['String']>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
  pigType?: Maybe<PigTypeEnum>;
};


export type MutationEditPipelineArgs = {
  flowCalculationDirection?: Maybe<FlowCalculationDirectionEnum>;
  from?: Maybe<Scalars['String']>;
  fromFeature?: Maybe<FromToFeatureEnum>;
  grade?: Maybe<GradeEnum>;
  id: Scalars['String'];
  internalProtection?: Maybe<InternalProtectionEnum>;
  length?: Maybe<Scalars['Float']>;
  license?: Maybe<Scalars['String']>;
  licenseDate?: Maybe<Scalars['DateTime']>;
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
  satelliteId?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  wallThickness?: Maybe<Scalars['Float']>;
  yieldStrength?: Maybe<Scalars['Int']>;
};


export type MutationEditPipelineBatchArgs = {
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
};


export type MutationEditPressureTestArgs = {
  comment?: Maybe<Scalars['String']>;
  ddsDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  pressureTestDate?: Maybe<Scalars['DateTime']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
};


export type MutationEditRiskArgs = {
  aerialReview?: Maybe<Scalars['Boolean']>;
  comment?: Maybe<Scalars['String']>;
  consequencePeople?: Maybe<Scalars['Int']>;
  dateSlopeChecked?: Maybe<Scalars['DateTime']>;
  environmentProximityTo?: Maybe<EnvironmentProximityToEnum>;
  gasReleaseCost?: Maybe<Scalars['Float']>;
  geotechnicalFacingS1?: Maybe<GeotechnicalFacingEnum>;
  geotechnicalFacingS2?: Maybe<GeotechnicalFacingEnum>;
  geotechnicalHeightS1?: Maybe<Scalars['Int']>;
  geotechnicalHeightS2?: Maybe<Scalars['Int']>;
  geotechnicalSlopeAngleS1?: Maybe<Scalars['Int']>;
  geotechnicalSlopeAngleS2?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  oilReleaseCost?: Maybe<Scalars['Float']>;
  probabilityGeo?: Maybe<Scalars['Int']>;
  releaseTimeDays?: Maybe<Scalars['Int']>;
  repairTimeDays?: Maybe<Scalars['Int']>;
  safeguardExternalCoating?: Maybe<Scalars['Int']>;
  safeguardInternalProtection?: Maybe<Scalars['Int']>;
};


export type MutationEditSalesPointArgs = {
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  oil?: Maybe<Scalars['Float']>;
  pipelineId?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['Float']>;
};


export type MutationEditSatelliteArgs = {
  facilityUniqueInput?: Maybe<FacilityUniqueInput>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationEditWellArgs = {
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  oil?: Maybe<Scalars['Float']>;
  pipelineId?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['Float']>;
};


export type MutationEditWellBatchArgs = {
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  userCreateInput: UserCreateInput;
};

export type NavigationInput = {
  hierarchy?: Maybe<HierarchyInput>;
  search?: Maybe<Array<SearchNavigationInput>>;
};

export enum OperationEnum {
  Contains = 'contains',
  EndsWith = 'endsWith',
  Equals = 'equals',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqual = 'greaterThanOrEqual',
  LessThan = 'lessThan',
  LessThanOrEqual = 'lessThanOrEqual',
  Not = 'not',
  StartsWith = 'startsWith'
}

export type OperationEnumObject = {
  contains: OperationEnum;
  endsWith: OperationEnum;
  equals: OperationEnum;
  gt: OperationEnum;
  gte: OperationEnum;
  lt: OperationEnum;
  lte: OperationEnum;
  not: OperationEnum;
  startsWith: OperationEnum;
};

export enum PigInspectionEnum {
  Failed = 'Failed',
  Good = 'Good'
}

export type PigInspectionEnumObject = {
  Failed: Scalars['String'];
  Good: Scalars['String'];
};

export type PigRun = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  dateIn: Scalars['DateTime'];
  dateOut?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  operator?: Maybe<User>;
  operatorId?: Maybe<Scalars['String']>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
  pigType?: Maybe<PigTypeEnum>;
  pipeline: Pipeline;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type PigRunPayload = {
  error?: Maybe<FieldError>;
  pigRun?: Maybe<PigRun>;
};

export enum PigTypeEnum {
  Ball = 'Ball',
  Black3inBall = 'Black3inBall',
  Blue3inscraper = 'Blue3inscraper',
  BlueRibbed = 'BlueRibbed',
  BlueinScraper = 'BlueinScraper',
  Foam = 'Foam',
  Gscr = 'GSCR',
  Highline = 'Highline',
  MDFoamy = 'M_D_Foamy',
  NoSender = 'NoSender',
  PigType1inStubby = 'PigType1inStubby',
  PigType2green2disc = 'PigType2green2disc',
  PigType2inGscr = 'PigType2inGSCR',
  PigType2inGscrGfp = 'PigType2inGSCR_GFP',
  PigType2inPscr = 'PigType2inPSCR',
  PigType2inPscrFlm = 'PigType2inPSCR_FLM',
  PigType2inPurpleDisc = 'PigType2inPurpleDisc',
  PigType2inStubby = 'PigType2inStubby',
  PigType2ingscr = 'PigType2ingscr',
  PigType2inpurple = 'PigType2inpurple',
  PigType2purple2disc = 'PigType2purple2disc',
  PigType3 = 'PigType3',
  PigType3Scrapper = 'PigType3_scrapper',
  PigType3in = 'PigType3in',
  PigType3inArgus = 'PigType3inArgus',
  PigType3inBlueRibbed = 'PigType3inBlueRibbed',
  PigType3inBrownRibbed = 'PigType3inBrownRibbed',
  PigType3inGscr = 'PigType3inGSCR',
  PigType3inGreenDisc = 'PigType3inGreenDisc',
  PigType3inGreenRibbed = 'PigType3inGreenRibbed',
  PigType3inPscr = 'PigType3inPSCR',
  PigType3inPurpleScraper = 'PigType3inPurpleScraper',
  PigType3inPurpleStubby = 'PigType3inPurpleStubby',
  PigType3inRscr = 'PigType3inRscr',
  PigType3inScraper = 'PigType3inSCRAPER',
  PigType3inStubby = 'PigType3inStubby',
  PigType3inWhite = 'PigType3inWhite',
  PigType3ingreendisc = 'PigType3ingreendisc',
  PigType3inpurple2disc = 'PigType3inpurple2disc',
  PigType3inpurpledisc = 'PigType3inpurpledisc',
  PigType3inpurplescraper = 'PigType3inpurplescraper',
  PigType3inredscrape = 'PigType3inredscrape',
  PigType3inscapper = 'PigType3inscapper',
  PigType3inscr = 'PigType3inscr',
  PigType3inscraper = 'PigType3inscraper',
  PigType3inscrapper = 'PigType3inscrapper',
  PigType4Green = 'PigType4Green',
  PigType4GreenStubby = 'PigType4GreenStubby',
  PigType4GreenRibbed = 'PigType4_GreenRibbed',
  PigType4gree2disc = 'PigType4gree2disc',
  PigType4green2disc = 'PigType4green2disc',
  PigType4in = 'PigType4in',
  PigType4inArgus = 'PigType4inArgus',
  PigType4inBlueDisc = 'PigType4inBlueDisc',
  PigType4inFoam = 'PigType4inFoam',
  PigType4inGscr = 'PigType4inGSCR',
  PigType4inGreenDisc = 'PigType4inGreenDisc',
  PigType4inGreendisc = 'PigType4inGreendisc',
  PigType4inpurplescraper = 'PigType4inpurplescraper',
  PigType4inscrapper = 'PigType4inscrapper',
  PigType6inArgus = 'PigType6inArgus',
  PigType6inGreenDisc = 'PigType6inGreenDisc',
  PigType6inGreenRibbed = 'PigType6inGreenRibbed',
  PigType6inargus = 'PigType6inargus',
  PigType6ingreenscraper = 'PigType6ingreenscraper',
  PigType6inscrapper = 'PigType6inscrapper',
  PigType8inBlackDisc = 'PigType8inBlackDisc',
  PigType8inFoam = 'PigType8inFoam',
  Purple3inDisc = 'Purple3inDisc',
  Red3inscraper = 'Red3inscraper',
  Red4inscraper = 'Red4inscraper',
  RedStubby = 'RedStubby',
  Redscraper = 'Redscraper',
  Simay2018 = 'SIMAY2018',
  ScaperP314 = 'ScaperP314',
  ScaperPp309 = 'ScaperPP309',
  ScraperP200 = 'ScraperP200',
  ScraperP204 = 'ScraperP204',
  ScraperP206 = 'ScraperP206',
  ScraperP208 = 'ScraperP208',
  ScraperP300 = 'ScraperP300',
  ScraperP301 = 'ScraperP301',
  ScraperP303 = 'ScraperP303',
  ScraperP304 = 'ScraperP304',
  ScraperP305 = 'ScraperP305',
  ScraperP309 = 'ScraperP309',
  ScraperP311 = 'ScraperP311',
  ScraperP312 = 'ScraperP312',
  ScraperP314 = 'ScraperP314',
  ScraperP400 = 'ScraperP400',
  ScraperP401 = 'ScraperP401',
  Scrapper = 'Scrapper',
  ScrapperP307 = 'ScrapperP307',
  Shutin = 'Shutin',
  Stubby = 'Stubby',
  Torpedo = 'Torpedo',
  Bullet = 'bullet',
  Disc = 'disc',
  Redball = 'redball'
}

export type PigTypeEnumObject = {
  Ball: Scalars['String'];
  Black3inBall: Scalars['String'];
  Blue3inscraper: Scalars['String'];
  BlueRibbed: Scalars['String'];
  BlueinScraper: Scalars['String'];
  Foam: Scalars['String'];
  GSCR: Scalars['String'];
  Highline: Scalars['String'];
  M_D_Foamy: Scalars['String'];
  NoSender: Scalars['String'];
  PigType1inStubby: Scalars['String'];
  PigType2green2disc: Scalars['String'];
  PigType2inGSCR: Scalars['String'];
  PigType2inGSCR_GFP: Scalars['String'];
  PigType2inPSCR: Scalars['String'];
  PigType2inPSCR_FLM: Scalars['String'];
  PigType2inPurpleDisc: Scalars['String'];
  PigType2inStubby: Scalars['String'];
  PigType2ingscr: Scalars['String'];
  PigType2inpurple: Scalars['String'];
  PigType2purple2disc: Scalars['String'];
  PigType3: Scalars['String'];
  PigType3_scrapper: Scalars['String'];
  PigType3in: Scalars['String'];
  PigType3inArgus: Scalars['String'];
  PigType3inBlueRibbed: Scalars['String'];
  PigType3inBrownRibbed: Scalars['String'];
  PigType3inGSCR: Scalars['String'];
  PigType3inGreenDisc: Scalars['String'];
  PigType3inGreenRibbed: Scalars['String'];
  PigType3inPSCR: Scalars['String'];
  PigType3inPurpleScraper: Scalars['String'];
  PigType3inPurpleStubby: Scalars['String'];
  PigType3inRscr: Scalars['String'];
  PigType3inSCRAPER: Scalars['String'];
  PigType3inStubby: Scalars['String'];
  PigType3inWhite: Scalars['String'];
  PigType3ingreendisc: Scalars['String'];
  PigType3inpurple2disc: Scalars['String'];
  PigType3inpurpledisc: Scalars['String'];
  PigType3inpurplescraper: Scalars['String'];
  PigType3inredscrape: Scalars['String'];
  PigType3inscapper: Scalars['String'];
  PigType3inscr: Scalars['String'];
  PigType3inscraper: Scalars['String'];
  PigType3inscrapper: Scalars['String'];
  PigType4Green: Scalars['String'];
  PigType4GreenStubby: Scalars['String'];
  PigType4_GreenRibbed: Scalars['String'];
  PigType4gree2disc: Scalars['String'];
  PigType4green2disc: Scalars['String'];
  PigType4in: Scalars['String'];
  PigType4inArgus: Scalars['String'];
  PigType4inBlueDisc: Scalars['String'];
  PigType4inFoam: Scalars['String'];
  PigType4inGSCR: Scalars['String'];
  PigType4inGreenDisc: Scalars['String'];
  PigType4inGreendisc: Scalars['String'];
  PigType4inpurplescraper: Scalars['String'];
  PigType4inscrapper: Scalars['String'];
  PigType6inArgus: Scalars['String'];
  PigType6inGreenDisc: Scalars['String'];
  PigType6inGreenRibbed: Scalars['String'];
  PigType6inargus: Scalars['String'];
  PigType6ingreenscraper: Scalars['String'];
  PigType6inscrapper: Scalars['String'];
  PigType8inBlackDisc: Scalars['String'];
  PigType8inFoam: Scalars['String'];
  Purple3inDisc: Scalars['String'];
  Red3inscraper: Scalars['String'];
  Red4inscraper: Scalars['String'];
  RedStubby: Scalars['String'];
  Redscraper: Scalars['String'];
  SIMAY2018: Scalars['String'];
  ScaperP314: Scalars['String'];
  ScaperPP309: Scalars['String'];
  ScraperP200: Scalars['String'];
  ScraperP204: Scalars['String'];
  ScraperP206: Scalars['String'];
  ScraperP208: Scalars['String'];
  ScraperP300: Scalars['String'];
  ScraperP301: Scalars['String'];
  ScraperP303: Scalars['String'];
  ScraperP304: Scalars['String'];
  ScraperP305: Scalars['String'];
  ScraperP309: Scalars['String'];
  ScraperP311: Scalars['String'];
  ScraperP312: Scalars['String'];
  ScraperP314: Scalars['String'];
  ScraperP400: Scalars['String'];
  ScraperP401: Scalars['String'];
  Scrapper: Scalars['String'];
  ScrapperP307: Scalars['String'];
  Shutin: Scalars['String'];
  Stubby: Scalars['String'];
  Torpedo: Scalars['String'];
  bullet: Scalars['String'];
  disc: Scalars['String'];
  redball: Scalars['String'];
};

export type Pipeline = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  currentStatus?: Maybe<StatusEnum>;
  currentSubstance?: Maybe<SubstanceEnum>;
  downstream?: Maybe<Array<Maybe<Pipeline>>>;
  firstLicenseDate?: Maybe<Scalars['DateTime']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  from: Scalars['String'];
  fromFeature?: Maybe<FromToFeatureEnum>;
  grade?: Maybe<GradeEnum>;
  id: Scalars['String'];
  internalProtection?: Maybe<InternalProtectionEnum>;
  length: Scalars['Float'];
  license: Scalars['String'];
  licenseChanges?: Maybe<Array<Maybe<LicenseChange>>>;
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  pigRuns?: Maybe<Array<Maybe<PigRun>>>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
  pressureTests?: Maybe<Array<Maybe<PressureTest>>>;
  risk?: Maybe<Risk>;
  salesPoints?: Maybe<Array<Maybe<SalesPoint>>>;
  satellite?: Maybe<Satellite>;
  segment: Scalars['String'];
  to: Scalars['String'];
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  upstream?: Maybe<Array<Maybe<Pipeline>>>;
  wallThickness?: Maybe<Scalars['Float']>;
  wells?: Maybe<Array<Maybe<Well>>>;
  yieldStrength?: Maybe<Scalars['Int']>;
};

export type PipelineBatch = {
  authorized: Scalars['Boolean'];
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  date: Scalars['DateTime'];
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  pipeline: Pipeline;
  product: BatchProduct;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type PipelineBatchPayload = {
  error?: Maybe<FieldError>;
  pipelineBatch?: Maybe<PipelineBatch>;
};

export type PipelineCreateInput = {
  downstream?: Maybe<Array<Maybe<PipelineCreateInput>>>;
  from: Scalars['String'];
  fromFeature?: Maybe<FromToFeatureEnum>;
  grade?: Maybe<GradeEnum>;
  internalProtection?: Maybe<InternalProtectionEnum>;
  length: Scalars['Float'];
  license: Scalars['String'];
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  segment: Scalars['String'];
  to: Scalars['String'];
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  upstream?: Maybe<Array<Maybe<PipelineCreateInput>>>;
  wallThickness?: Maybe<Scalars['Float']>;
  wells?: Maybe<Array<Maybe<WellCreateInput>>>;
};

export type PipelineFlow = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  gasAssociatedLiquids: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  /** This field is a concatenated license and segment of a pipeline to conform with Well and Sales Point objects */
  name: Scalars['String'];
  oil: Scalars['Float'];
  totalFluids: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  water: Scalars['Float'];
};

export type PipelinePayload = {
  error?: Maybe<FieldError>;
  pipeline?: Maybe<Pipeline>;
};

export type PipelinesByIdPayload = {
  count: Scalars['Int'];
  pipelines?: Maybe<Array<Maybe<Pipeline>>>;
};

export type PipelinesFlowAndSourceGroupBy = {
  pipelinesFlow?: Maybe<Array<Maybe<PipelineFlow>>>;
  sourceGroupBy?: Maybe<SourceGroupBy>;
};

export type PipelinesOnPipelines = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  downstream: Pipeline;
  downstreamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  upstream: Pipeline;
  upstreamId: Scalars['String'];
};

export type PipelinesOnPipelinesPayload = {
  error?: Maybe<FieldError>;
  pipelinesOnPipelines?: Maybe<PipelinesOnPipelines>;
};

export type PressureTest = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  ddsDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  maxPressureOfLimitingSpec?: Maybe<Scalars['Float']>;
  mopTestPressure?: Maybe<Scalars['Float']>;
  pipeline: Pipeline;
  pressureTestCorrosionAllowance?: Maybe<Scalars['Float']>;
  pressureTestDate: Scalars['DateTime'];
  pressureTestPressure?: Maybe<Scalars['Float']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
  requiredWTForMop?: Maybe<Scalars['Float']>;
  requiredWTForTestPressure?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  waterForPigging?: Maybe<Scalars['Float']>;
};

export type PressureTestPayload = {
  error?: Maybe<FieldError>;
  pressureTest?: Maybe<PressureTest>;
};

export type Query = {
  allFacilities?: Maybe<Array<Maybe<Facility>>>;
  allSatellites?: Maybe<Array<Maybe<Satellite>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  chemicalById?: Maybe<Chemical>;
  connectedPipelinesByPipelineId?: Maybe<PipelinesFlowAndSourceGroupBy>;
  licenseChangesByPipelineId?: Maybe<Array<Maybe<LicenseChange>>>;
  me?: Maybe<User>;
  pigRunsByPipelineId?: Maybe<Array<Maybe<PigRun>>>;
  pipelineBatchesByPipelineId?: Maybe<Array<Maybe<PipelineBatch>>>;
  pipelineFlow?: Maybe<PipelineFlow>;
  pipelineOptions?: Maybe<Array<Maybe<SourceOptions>>>;
  pipelinesById: PipelinesByIdPayload;
  pipelinesByUser?: Maybe<Array<Maybe<Pipeline>>>;
  pipelinesFlow?: Maybe<Array<Maybe<PipelineFlow>>>;
  pipelinesOnPipelinesByDownstreamId?: Maybe<Array<Maybe<PipelinesOnPipelines>>>;
  pipelinesOnPipelinesByUpstreamId?: Maybe<Array<Maybe<PipelinesOnPipelines>>>;
  pressureTestsByPipelineId?: Maybe<Array<Maybe<PressureTest>>>;
  riskById?: Maybe<Risk>;
  salesPointOptions?: Maybe<Array<Maybe<SourceOptions>>>;
  salesPointsByPipelineId?: Maybe<Array<Maybe<SalesPoint>>>;
  salesPointsGroupByPipelineId?: Maybe<SourceGroupBy>;
  searchNavigationOptions: Array<SearchNavigationObject>;
  sideBar?: Maybe<Array<Maybe<SideBar>>>;
  userCount?: Maybe<Scalars['Int']>;
  validators?: Maybe<Validator>;
  validatorsPipeline?: Maybe<ValidatorsPipeline>;
  wellBatchesByWellId?: Maybe<Array<Maybe<WellBatch>>>;
  wellOptions?: Maybe<Array<Maybe<SourceOptions>>>;
  wellsByPipelineId?: Maybe<Array<Maybe<Well>>>;
  wellsGroupByPipelineId?: Maybe<SourceGroupBy>;
};


export type QueryChemicalByIdArgs = {
  id: Scalars['String'];
};


export type QueryConnectedPipelinesByPipelineIdArgs = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
};


export type QueryLicenseChangesByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryPigRunsByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryPipelineBatchesByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryPipelineFlowArgs = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
};


export type QueryPipelineOptionsArgs = {
  id: Scalars['String'];
};


export type QueryPipelinesByIdArgs = {
  navigationInput: NavigationInput;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryPipelinesByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryPipelinesFlowArgs = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  idList: Array<Maybe<Scalars['String']>>;
};


export type QueryPipelinesOnPipelinesByDownstreamIdArgs = {
  downstreamId: Scalars['String'];
};


export type QueryPipelinesOnPipelinesByUpstreamIdArgs = {
  upstreamId: Scalars['String'];
};


export type QueryPressureTestsByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryRiskByIdArgs = {
  id: Scalars['String'];
};


export type QuerySalesPointOptionsArgs = {
  pipelineId: Scalars['String'];
};


export type QuerySalesPointsByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QuerySalesPointsGroupByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryWellBatchesByWellIdArgs = {
  wellId: Scalars['String'];
};


export type QueryWellOptionsArgs = {
  pipelineId: Scalars['String'];
};


export type QueryWellsByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryWellsGroupByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};

export type Risk = {
  aerialReview?: Maybe<Scalars['Boolean']>;
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  consequenceAsset?: Maybe<Scalars['Int']>;
  consequenceEnviro?: Maybe<Scalars['Int']>;
  consequenceMax?: Maybe<Scalars['Int']>;
  consequencePeople?: Maybe<Scalars['Int']>;
  costPerM3Released?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  dateSlopeChecked?: Maybe<Scalars['DateTime']>;
  environmentProximityTo?: Maybe<EnvironmentProximityToEnum>;
  gasReleaseCost?: Maybe<Scalars['Float']>;
  geotechnicalFacingS1?: Maybe<GeotechnicalFacingEnum>;
  geotechnicalFacingS2?: Maybe<GeotechnicalFacingEnum>;
  geotechnicalHeightS1?: Maybe<Scalars['Int']>;
  geotechnicalHeightS2?: Maybe<Scalars['Int']>;
  geotechnicalSlopeAngleS1?: Maybe<Scalars['Int']>;
  geotechnicalSlopeAngleS2?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  oilReleaseCost?: Maybe<Scalars['Float']>;
  pipeline: Pipeline;
  probabilityExterior?: Maybe<Scalars['Int']>;
  probabilityExteriorWithSafeguards?: Maybe<Scalars['Int']>;
  probabilityGeo?: Maybe<Scalars['Int']>;
  probabilityInterior?: Maybe<Scalars['Int']>;
  probabilityInteriorWithSafeguards?: Maybe<Scalars['Int']>;
  releaseTimeDays?: Maybe<Scalars['Int']>;
  repairTimeDays?: Maybe<Scalars['Int']>;
  riskPotentialExternal?: Maybe<Scalars['Int']>;
  riskPotentialExternalWithSafeguards?: Maybe<Scalars['Int']>;
  riskPotentialGeo?: Maybe<Scalars['Int']>;
  riskPotentialInternal?: Maybe<Scalars['Int']>;
  riskPotentialInternalWithSafeguards?: Maybe<Scalars['Int']>;
  safeguardCathodic?: Maybe<Scalars['Int']>;
  safeguardChemicalInhibition?: Maybe<Scalars['Int']>;
  safeguardExternalCoating?: Maybe<Scalars['Int']>;
  safeguardInternalProtection?: Maybe<Scalars['Int']>;
  safeguardPigging?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type RiskPayload = {
  error?: Maybe<FieldError>;
  risk?: Maybe<Risk>;
};

export type SalesPoint = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  gasAssociatedLiquids: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  oil: Scalars['Float'];
  pipeline?: Maybe<Pipeline>;
  totalFluids: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  water: Scalars['Float'];
};

export type SalesPointCreateInput = {
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  oil: Scalars['Float'];
  water: Scalars['Float'];
};

export type SalesPointPayload = {
  error?: Maybe<FieldError>;
  salesPoint?: Maybe<SalesPoint>;
};

export type Satellite = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  facility?: Maybe<Facility>;
  id: Scalars['String'];
  name: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<Pipeline>>>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type SatelliteCreateInput = {
  injectionPoints?: Maybe<Array<Maybe<WellCreateInput>>>;
  name: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<PipelineCreateInput>>>;
};

export type SatelliteSideBar = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type SatelliteUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SearchNavigationInput = {
  field: Scalars['String'];
  having: HavingEnum;
  operation: OperationEnum;
  table: TableEnum;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type SearchNavigationObject = {
  enumObjectArray?: Maybe<Array<EnumObject>>;
  field: Scalars['String'];
  nullable: Scalars['Boolean'];
  table: TableEnum;
  type: Scalars['String'];
};

export type SideBar = {
  id: Scalars['String'];
  name: Scalars['String'];
  satellites: Array<SatelliteSideBar>;
};

export enum SolubilityEnum {
  Oil = 'Oil',
  Water = 'Water'
}

export type SolubilityEnumObject = {
  Oil: Scalars['String'];
  Water: Scalars['String'];
};

export type SourceGroupBy = {
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas?: Maybe<Scalars['Float']>;
  gasAssociatedLiquids?: Maybe<Scalars['Float']>;
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil?: Maybe<Scalars['Float']>;
  totalFluids?: Maybe<Scalars['Float']>;
  water?: Maybe<Scalars['Float']>;
};

export type SourceOptions = {
  disabled: Scalars['Boolean'];
  facility?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  satellite?: Maybe<Scalars['String']>;
  source: Scalars['String'];
};

export enum StatusEnum {
  Abandoned = 'Abandoned',
  Active = 'Active',
  Cancelled = 'Cancelled',
  Discontinued = 'Discontinued',
  New = 'New',
  NotConstructed = 'NotConstructed',
  Operating = 'Operating',
  Removed = 'Removed',
  ToBeConstructed = 'ToBeConstructed'
}

export type StatusEnumObject = {
  Abandoned: Scalars['String'];
  Active: Scalars['String'];
  Cancelled: Scalars['String'];
  Discontinued: Scalars['String'];
  New: Scalars['String'];
  NotConstructed: Scalars['String'];
  Operating: Scalars['String'];
  Removed: Scalars['String'];
  ToBeConstructed: Scalars['String'];
};

export enum SubstanceEnum {
  CrudeOil = 'CrudeOil',
  FreshWater = 'FreshWater',
  FuelGas = 'FuelGas',
  LvpProducts = 'LVPProducts',
  NaturalGas = 'NaturalGas',
  OilWellEffluent = 'OilWellEffluent',
  SaltWater = 'SaltWater',
  SourNaturalGas = 'SourNaturalGas'
}

export type SubstanceEnumObject = {
  CrudeOil: Scalars['String'];
  FreshWater: Scalars['String'];
  FuelGas: Scalars['String'];
  LVPProducts: Scalars['String'];
  NaturalGas: Scalars['String'];
  OilWellEffluent: Scalars['String'];
  SaltWater: Scalars['String'];
  SourNaturalGas: Scalars['String'];
};

export enum TableEnum {
  Chemical = 'chemical',
  DownstreamPipelines = 'downstreamPipelines',
  Facility = 'facility',
  LicenseChanges = 'licenseChanges',
  PigRuns = 'pigRuns',
  Pipeline = 'pipeline',
  PipelineBatches = 'pipelineBatches',
  PressureTests = 'pressureTests',
  Risk = 'risk',
  SalesPoints = 'salesPoints',
  Satellite = 'satellite',
  UpstreamPipelines = 'upstreamPipelines',
  Wells = 'wells'
}

export enum TypeEnum {
  Type5A = 'Type5A',
  Type5L = 'Type5L',
  Type5Lx = 'Type5LX',
  Type515 = 'Type515',
  Type2306 = 'Type2306',
  Type3406 = 'Type3406',
  Type3408 = 'Type3408',
  Type6063 = 'Type6063',
  Type6351 = 'Type6351',
  TypeA53 = 'TypeA53',
  TypeA106 = 'TypeA106',
  TypeA120 = 'TypeA120',
  TypeAmeron = 'TypeAMERON',
  TypeB5Is = 'TypeB5IS',
  TypeB51S = 'TypeB51S',
  TypeB515 = 'TypeB515',
  TypeCentron = 'TypeCENTRON',
  TypeCiba = 'TypeCIBA',
  TypeFslp = 'TypeFSLP',
  TypeRedthr = 'TypeREDTHR',
  TypeSmith = 'TypeSMITH',
  TypeStar = 'TypeSTAR',
  TypeTbs = 'TypeTBS',
  TypeWslp = 'TypeWSLP',
  TypeZ2451 = 'TypeZ2451',
  TypeZ2453 = 'TypeZ2453'
}

export type TypeEnumObject = {
  Type5A: Scalars['String'];
  Type5L: Scalars['String'];
  Type5LX: Scalars['String'];
  Type515: Scalars['String'];
  Type2306: Scalars['String'];
  Type3406: Scalars['String'];
  Type3408: Scalars['String'];
  Type6063: Scalars['String'];
  Type6351: Scalars['String'];
  TypeA53: Scalars['String'];
  TypeA106: Scalars['String'];
  TypeA120: Scalars['String'];
  TypeAMERON: Scalars['String'];
  TypeB5IS: Scalars['String'];
  TypeB51S: Scalars['String'];
  TypeB515: Scalars['String'];
  TypeCENTRON: Scalars['String'];
  TypeCIBA: Scalars['String'];
  TypeFSLP: Scalars['String'];
  TypeREDTHR: Scalars['String'];
  TypeSMITH: Scalars['String'];
  TypeSTAR: Scalars['String'];
  TypeTBS: Scalars['String'];
  TypeWSLP: Scalars['String'];
  TypeZ2451: Scalars['String'];
  TypeZ2453: Scalars['String'];
};

export type User = {
  email: Scalars['String'];
  facilitiesCreated?: Maybe<Array<Maybe<Facility>>>;
  facilitiesUpdated?: Maybe<Array<Maybe<Facility>>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  licenseChangesCreated?: Maybe<Array<Maybe<LicenseChange>>>;
  licenseChangesUpdated?: Maybe<Array<Maybe<LicenseChange>>>;
  pipelinesCreated?: Maybe<Array<Maybe<Pipeline>>>;
  pipelinesUpdated?: Maybe<Array<Maybe<Pipeline>>>;
  risksCreated?: Maybe<Array<Maybe<Risk>>>;
  risksUpdated?: Maybe<Array<Maybe<Risk>>>;
  role: UserRoleEnum;
  satellitesCreated?: Maybe<Array<Maybe<Satellite>>>;
  satellitesUpdated?: Maybe<Array<Maybe<Satellite>>>;
  wellsCreated?: Maybe<Array<Maybe<Well>>>;
  wellsUpdated?: Maybe<Array<Maybe<Well>>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: UserRoleEnum;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Cathodic = 'CATHODIC',
  Chemical = 'CHEMICAL',
  Contractor = 'CONTRACTOR',
  Engineer = 'ENGINEER',
  Office = 'OFFICE',
  Operator = 'OPERATOR'
}

export type UserRoleEnumObject = {
  ADMIN: Scalars['String'];
  CATHODIC: Scalars['String'];
  CHEMICAL: Scalars['String'];
  CONTRACTOR: Scalars['String'];
  ENGINEER: Scalars['String'];
  OFFICE: Scalars['String'];
  OPERATOR: Scalars['String'];
};

export type UserUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type Validator = {
  anyTextMatchPattern: Scalars['String'];
  environmentProximityToEnum: EnvironmentProximityToEnumObject;
  flowCalculationDirectionEnum: FlowCalculationDirectionEnumObject;
  fromToFeatureEnum: FromToFeatureEnumObject;
  fromToMatchPattern: Scalars['String'];
  geotechnicalFacingEnum: GeotechnicalFacingEnumObject;
  gradeEnum: GradeEnumObject;
  havingEnum: HavingEnumObject;
  internalProtectionEnum: InternalProtectionEnumObject;
  lengthMatchPattern: Scalars['String'];
  licenseMatchPattern: Scalars['String'];
  limitingSpecEnum: LimitingSpecEnumObject;
  materialEnum: MaterialEnumObject;
  mopMatchPattern: Scalars['String'];
  operationEnum: OperationEnumObject;
  outsideDiameterMatchPattern: Scalars['String'];
  pigInspectionEnum: PigInspectionEnumObject;
  pigTypeEnum: PigTypeEnumObject;
  segmentMatchPattern: Scalars['String'];
  solubilityEnum: SolubilityEnumObject;
  statusEnum: StatusEnumObject;
  substanceEnum: SubstanceEnumObject;
  typeEnum: TypeEnumObject;
  userRoleEnum: UserRoleEnumObject;
  wallThicknessMatchPattern: Scalars['String'];
  yieldStrengthMatchPattern: Scalars['String'];
};

export type ValidatorsPipeline = {
  batchProductEnum: Array<EnumObject>;
  chemicalSupplierEnum: Array<EnumObject>;
  environmentProximityToEnum: Array<EnumObject>;
  flowCalculationDirectionEnum: Array<EnumObject>;
  fromToFeatureEnum: Array<EnumObject>;
  fromToMatchPattern: Scalars['String'];
  geotechnicalFacingEnum: Array<EnumObject>;
  gradeEnum: Array<EnumObject>;
  internalProtectionEnum: Array<EnumObject>;
  lengthMatchPattern: Scalars['String'];
  licenseMatchPattern: Scalars['String'];
  limitingSpecEnum: Array<EnumObject>;
  materialEnum: Array<EnumObject>;
  mopMatchPattern: Scalars['String'];
  operatorEnum: Array<EnumObject>;
  outsideDiameterMatchPattern: Scalars['String'];
  pigInspectionEnum: Array<EnumObject>;
  pigTypeEnum: Array<EnumObject>;
  segmentMatchPattern: Scalars['String'];
  solubilityEnum: Array<EnumObject>;
  statusEnum: Array<EnumObject>;
  substanceEnum: Array<EnumObject>;
  typeEnum: Array<EnumObject>;
  wallThicknessMatchPattern: Scalars['String'];
  yieldStrengthMatchPattern: Scalars['String'];
};

export type Well = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  gasAssociatedLiquids: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  oil: Scalars['Float'];
  pipeline?: Maybe<Pipeline>;
  totalFluids: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  water: Scalars['Float'];
  wellBatches?: Maybe<Array<Maybe<WellBatch>>>;
};

export type WellBatch = {
  authorized: Scalars['Boolean'];
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  date: Scalars['DateTime'];
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  product: BatchProduct;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  well: Well;
};

export type WellBatchPayload = {
  error?: Maybe<FieldError>;
  wellBatch?: Maybe<WellBatch>;
};

export type WellCreateInput = {
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  oil: Scalars['Float'];
  water: Scalars['Float'];
};

export type WellPayload = {
  error?: Maybe<FieldError>;
  well?: Maybe<Well>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type SignupMutationVariables = Exact<{
  userCreateInput: UserCreateInput;
}>;


export type SignupMutation = { signup?: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout?: boolean | null | undefined };

export type DeletePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePipelineMutation = { deletePipeline?: { pipeline?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DuplicatePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicatePipelineMutation = { duplicatePipeline?: { pipeline?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type ConnectPipelineMutationVariables = Exact<{
  pipelineId: Scalars['String'];
  connectNewPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
  connectedPipelineId?: Maybe<Scalars['String']>;
}>;


export type ConnectPipelineMutation = { connectPipeline?: { pipelinesOnPipelines?: { upstreamId: string, downstreamId: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DisconnectPipelineMutationVariables = Exact<{
  pipelineId: Scalars['String'];
  disconnectPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type DisconnectPipelineMutation = { disconnectPipeline?: { pipelinesOnPipelines?: { upstreamId: string, downstreamId: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type ConnectWellMutationVariables = Exact<{
  id: Scalars['String'];
  pipelineId: Scalars['String'];
}>;


export type ConnectWellMutation = { connectWell?: { well?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DisconnectWellMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DisconnectWellMutation = { disconnectWell?: { well?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type ConnectSalesPointMutationVariables = Exact<{
  id: Scalars['String'];
  pipelineId: Scalars['String'];
}>;


export type ConnectSalesPointMutation = { connectSalesPoint?: { salesPoint?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DisconnectSalesPointMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DisconnectSalesPointMutation = { disconnectSalesPoint?: { salesPoint?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  satelliteId?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
  flowCalculationDirection?: Maybe<FlowCalculationDirectionEnum>;
  from?: Maybe<Scalars['String']>;
  fromFeature?: Maybe<FromToFeatureEnum>;
  to?: Maybe<Scalars['String']>;
  toFeature?: Maybe<FromToFeatureEnum>;
  licenseDate?: Maybe<Scalars['DateTime']>;
  length?: Maybe<Scalars['Float']>;
  type?: Maybe<TypeEnum>;
  grade?: Maybe<GradeEnum>;
  yieldStrength?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  wallThickness?: Maybe<Scalars['Float']>;
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  internalProtection?: Maybe<InternalProtectionEnum>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
}>;


export type EditPipelineMutation = { editPipeline?: { pipeline?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditLicenseChangeMutationVariables = Exact<{
  id: Scalars['String'];
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
  date?: Maybe<Scalars['DateTime']>;
  linkToDocumentation?: Maybe<Scalars['String']>;
}>;


export type EditLicenseChangeMutation = { editLicenseChange?: { licenseChange?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddLicenseChangeMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddLicenseChangeMutation = { addLicenseChange?: { licenseChange?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeleteLicenseChangeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteLicenseChangeMutation = { deleteLicenseChange?: { licenseChange?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditPressureTestMutationVariables = Exact<{
  id: Scalars['String'];
  limitingSpec?: Maybe<LimitingSpecEnum>;
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  ddsDate?: Maybe<Scalars['DateTime']>;
  pressureTestDate?: Maybe<Scalars['DateTime']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type EditPressureTestMutation = { editPressureTest?: { pressureTest?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddPressureTestMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddPressureTestMutation = { addPressureTest?: { pressureTest?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeletePressureTestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePressureTestMutation = { deletePressureTest?: { pressureTest?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditPigRunMutationVariables = Exact<{
  id: Scalars['String'];
  pigType?: Maybe<PigTypeEnum>;
  dateIn?: Maybe<Scalars['DateTime']>;
  dateOut?: Maybe<Scalars['DateTime']>;
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
  comment?: Maybe<Scalars['String']>;
  operatorId?: Maybe<Scalars['String']>;
}>;


export type EditPigRunMutation = { editPigRun?: { pigRun?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddPigRunMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddPigRunMutation = { addPigRun?: { pigRun?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeletePigRunMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePigRunMutation = { deletePigRun?: { pigRun?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditPipelineBatchMutationVariables = Exact<{
  id: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  productId?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  chemicalVolume?: Maybe<Scalars['Float']>;
  diluentVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type EditPipelineBatchMutation = { editPipelineBatch?: { pipelineBatch?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddPipelineBatchMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddPipelineBatchMutation = { addPipelineBatch?: { pipelineBatch?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeletePipelineBatchMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePipelineBatchMutation = { deletePipelineBatch?: { pipelineBatch?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditWellBatchMutationVariables = Exact<{
  id: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  productId?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  chemicalVolume?: Maybe<Scalars['Float']>;
  diluentVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type EditWellBatchMutation = { editWellBatch?: { wellBatch?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddWellBatchMutationVariables = Exact<{
  wellId: Scalars['String'];
}>;


export type AddWellBatchMutation = { addWellBatch?: { wellBatch?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeleteWellBatchMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteWellBatchMutation = { deleteWellBatch?: { wellBatch?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditRiskMutationVariables = Exact<{
  id: Scalars['String'];
  aerialReview?: Maybe<Scalars['Boolean']>;
  environmentProximityTo?: Maybe<EnvironmentProximityToEnum>;
  geotechnicalSlopeAngleS1?: Maybe<Scalars['Int']>;
  geotechnicalFacingS1?: Maybe<GeotechnicalFacingEnum>;
  geotechnicalHeightS1?: Maybe<Scalars['Int']>;
  geotechnicalSlopeAngleS2?: Maybe<Scalars['Int']>;
  geotechnicalFacingS2?: Maybe<GeotechnicalFacingEnum>;
  geotechnicalHeightS2?: Maybe<Scalars['Int']>;
  dateSlopeChecked?: Maybe<Scalars['DateTime']>;
  repairTimeDays?: Maybe<Scalars['Int']>;
  releaseTimeDays?: Maybe<Scalars['Int']>;
  oilReleaseCost?: Maybe<Scalars['Float']>;
  gasReleaseCost?: Maybe<Scalars['Float']>;
  consequencePeople?: Maybe<Scalars['Int']>;
  probabilityGeo?: Maybe<Scalars['Int']>;
  safeguardInternalProtection?: Maybe<Scalars['Int']>;
  safeguardExternalCoating?: Maybe<Scalars['Int']>;
}>;


export type EditRiskMutation = { editRisk?: { risk?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddRiskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddRiskMutation = { addRisk?: { risk?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeleteRiskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRiskMutation = { deleteRisk?: { risk?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AllocateRiskMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocateRiskMutation = { allocateRisk?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditChemicalMutationVariables = Exact<{
  id: Scalars['String'];
  chemicalSupplierId?: Maybe<Scalars['String']>;
  baselineFluidAnalysisDate?: Maybe<Scalars['DateTime']>;
  scaling?: Maybe<Scalars['Boolean']>;
  bacteria?: Maybe<Scalars['Boolean']>;
  co2?: Maybe<Scalars['Boolean']>;
  o2?: Maybe<Scalars['Boolean']>;
  h2s?: Maybe<Scalars['Boolean']>;
  continuousInjection?: Maybe<Scalars['Boolean']>;
  injectionRate?: Maybe<Scalars['Float']>;
  downholeBatch?: Maybe<Scalars['Boolean']>;
  inhibitorPipelineBatch?: Maybe<Scalars['Boolean']>;
  bacteriaTreatment?: Maybe<Scalars['Boolean']>;
  scaleTreatment?: Maybe<Scalars['Boolean']>;
  batchFrequency?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type EditChemicalMutation = { editChemical?: { chemical?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddChemicalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddChemicalMutation = { addChemical?: { chemical?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeleteChemicalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteChemicalMutation = { deleteChemical?: { chemical?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined };

export type UserCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCountQuery = { userCount?: number | null | undefined };

export type PipelinesByIdQueryVariables = Exact<{
  navigationInput: NavigationInput;
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type PipelinesByIdQuery = { pipelinesById: { count: number, pipelines?: Array<{ id: string, license: string, segment: string, flowCalculationDirection: FlowCalculationDirectionEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, currentStatus?: StatusEnum | null | undefined, currentSubstance?: SubstanceEnum | null | undefined, firstLicenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined } };

export type PigRunsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PigRunsByPipelineIdQuery = { pigRunsByPipelineId?: Array<{ id: string, pigType?: PigTypeEnum | null | undefined, dateIn: string, dateOut?: string | null | undefined, isolationValveFunctionTest?: PigInspectionEnum | null | undefined, pigSenderReceiverInspection?: PigInspectionEnum | null | undefined, comment?: string | null | undefined, operatorId?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type SearchNavigationOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchNavigationOptionsQuery = { searchNavigationOptions: Array<{ table: TableEnum, field: string, nullable: boolean, type: string, enumObjectArray?: Array<{ serverEnum: string, databaseEnum: string }> | null | undefined }> };

export type OperationAndHavingEnumQueryVariables = Exact<{ [key: string]: never; }>;


export type OperationAndHavingEnumQuery = { validators?: { operationEnum: { equals: OperationEnum, not: OperationEnum, gt: OperationEnum, gte: OperationEnum, lt: OperationEnum, lte: OperationEnum, contains: OperationEnum, startsWith: OperationEnum, endsWith: OperationEnum }, havingEnum: { _min: HavingEnum, _max: HavingEnum, _count: HavingEnum, _any: HavingEnum } } | null | undefined };

export type PipelineBatchesByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PipelineBatchesByPipelineIdQuery = { pipelineBatchesByPipelineId?: Array<{ id: string, date: string, cost?: number | null | undefined, chemicalVolume?: number | null | undefined, diluentVolume?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, product: { id: string, product: string, cost?: number | null | undefined, solubility: SolubilityEnum }, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type WellBatchesByWellIdQueryVariables = Exact<{
  wellId: Scalars['String'];
}>;


export type WellBatchesByWellIdQuery = { wellBatchesByWellId?: Array<{ id: string, date: string, cost?: number | null | undefined, chemicalVolume?: number | null | undefined, diluentVolume?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, product: { id: string, product: string, cost?: number | null | undefined, solubility: SolubilityEnum }, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type ValidatorsPipelineQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPipelineQuery = { validatorsPipeline?: { licenseMatchPattern: string, segmentMatchPattern: string, fromToMatchPattern: string, lengthMatchPattern: string, yieldStrengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, fromToFeatureEnum: Array<{ serverEnum: string, databaseEnum: string }>, statusEnum: Array<{ serverEnum: string, databaseEnum: string }>, substanceEnum: Array<{ serverEnum: string, databaseEnum: string }>, typeEnum: Array<{ serverEnum: string, databaseEnum: string }>, gradeEnum: Array<{ serverEnum: string, databaseEnum: string }>, materialEnum: Array<{ serverEnum: string, databaseEnum: string }>, internalProtectionEnum: Array<{ serverEnum: string, databaseEnum: string }>, flowCalculationDirectionEnum: Array<{ serverEnum: string, databaseEnum: string }>, limitingSpecEnum: Array<{ serverEnum: string, databaseEnum: string }>, environmentProximityToEnum: Array<{ serverEnum: string, databaseEnum: string }>, geotechnicalFacingEnum: Array<{ serverEnum: string, databaseEnum: string }>, solubilityEnum: Array<{ serverEnum: string, databaseEnum: string }>, batchProductEnum: Array<{ serverEnum: string, databaseEnum: string }>, pigTypeEnum: Array<{ serverEnum: string, databaseEnum: string }>, pigInspectionEnum: Array<{ serverEnum: string, databaseEnum: string }>, operatorEnum: Array<{ serverEnum: string, databaseEnum: string }>, chemicalSupplierEnum: Array<{ serverEnum: string, databaseEnum: string }> } | null | undefined };

export type GetValidatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValidatorsQuery = { validators?: { licenseMatchPattern: string, segmentMatchPattern: string, fromToMatchPattern: string, lengthMatchPattern: string, yieldStrengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string }, fromToFeatureEnum: { BlindEnd: string, Battery: string, Pipeline: string, Satellite: string, StorageTank: string, InjectionPlant: string, Well: string, CompressorStation: string, MeterStation: string, PumpStation: string, GasProcessingPlant: string, UndergroundCapOrTieIn: string, Header: string }, statusEnum: { Operating: string, Discontinued: string, Abandoned: string, Removed: string, ToBeConstructed: string, Active: string, Cancelled: string, New: string, NotConstructed: string }, typeEnum: { Type515: string, Type2306: string, Type3406: string, Type3408: string, Type6063: string, Type6351: string, Type5A: string, Type5L: string, Type5LX: string, TypeA106: string, TypeA120: string, TypeA53: string, TypeAMERON: string, TypeB515: string, TypeB51S: string, TypeB5IS: string, TypeCENTRON: string, TypeCIBA: string, TypeFSLP: string, TypeREDTHR: string, TypeSMITH: string, TypeSTAR: string, TypeTBS: string, TypeWSLP: string, TypeZ2451: string, TypeZ2453: string }, gradeEnum: { GradeA: string, Grade3592: string, GradeB: string, GradeX42: string, GradeBW1: string, Grade2500: string, Grade3591: string, Grade2901: string, GradeT4: string, Grade300: string, Grade3593: string, Grade11: string, GradeJ55: string, Grade2250: string, GradeX52: string, Grade2750: string, Grade2902: string, Grade25: string, Grade241: string, Grade2413: string, Grade2411: string, Grade155: string, Grade150: string, Grade1000: string, Grade800: string, GradeT1A: string, Grade2010: string, GradeT4A: string, Grade1250: string, Grade17: string, Grade900: string, GradeT1B: string, Grade810: string, Grade35: string, Grade5: string, Grade9: string, Grade200: string, Grade1200: string, Grade1103: string }, materialEnum: { Steel: string, PolyvinylChloride: string, Composite: string, Fiberglass: string, Aluminum: string, Polyethylene: string, CelluloseAcetateButyrate: string, Unknown: string, AsbestosCement: string }, internalProtectionEnum: { Uncoated: string, FreeStandingSlipLined: string, Unknown: string, Cement: string, ExpandedPolyethylene: string, ThinFilm: string }, pigTypeEnum: { Scrapper: string, PigType4inArgus: string, PigType6inargus: string, PigType6inArgus: string, ScraperP400: string, PigType3inPurpleScraper: string, ScraperP304: string, PigType3inscapper: string, PigType3inscrapper: string, PigType3inscraper: string, Foam: string, Shutin: string, RedStubby: string, Redscraper: string, PigType3inGSCR: string, PigType2inGSCR: string, NoSender: string, PigType2ingscr: string, PigType2inGSCR_GFP: string, PigType4inGSCR: string, PigType2inPSCR_FLM: string, PigType3inPSCR: string, Highline: string, PigType2inPSCR: string, PigType3_scrapper: string, ScraperP401: string, ScraperP300: string, ScraperP301: string, ScraperP309: string, ScraperP314: string, ScaperP314: string, ScaperPP309: string, ScraperP204: string, ScraperP208: string, PigType3inArgus: string, PigType2inpurple: string, Ball: string, Black3inBall: string, PigType3inWhite: string, PigType3: string, SIMAY2018: string, ScraperP206: string, ScraperP200: string, PigType3inRscr: string, PigType3inPurpleStubby: string, PigType3inSCRAPER: string, Red3inscraper: string, PigType3inGreenDisc: string, PigType4inGreenDisc: string, PigType4green2disc: string, PigType4gree2disc: string, PigType3ingreendisc: string, PigType3inpurpledisc: string, PigType2inPurpleDisc: string, disc: string, PigType2purple2disc: string, PigType3inpurple2disc: string, PigType2green2disc: string, bullet: string, PigType8inFoam: string, PigType3inscr: string, ScraperP305: string, ScraperP312: string, ScraperP303: string, ScraperP311: string, ScrapperP307: string, PigType4inpurplescraper: string, Torpedo: string, PigType4in: string, PigType3inStubby: string, Stubby: string, PigType3in: string, redball: string, PigType2inStubby: string, PigType1inStubby: string, PigType3inBrownRibbed: string, PigType3inGreenRibbed: string, PigType3inBlueRibbed: string, BlueRibbed: string, M_D_Foamy: string, PigType6inGreenRibbed: string, BlueinScraper: string, Red4inscraper: string, Blue3inscraper: string, PigType4inBlueDisc: string, PigType8inBlackDisc: string, PigType4inGreendisc: string, PigType6inGreenDisc: string, PigType6inscrapper: string, PigType4inscrapper: string, PigType4inFoam: string, PigType3inredscrape: string, GSCR: string, PigType4GreenStubby: string, PigType4_GreenRibbed: string, PigType4Green: string, PigType3inpurplescraper: string, PigType6ingreenscraper: string, Purple3inDisc: string }, flowCalculationDirectionEnum: { Upstream: string, Downstream: string }, pigInspectionEnum: { Failed: string, Good: string }, limitingSpecEnum: { ANSI150: string, ANSI300: string, ANSI600: string }, environmentProximityToEnum: { WB1: string, WB3: string, WB4: string, WB5: string, WC1: string, WC2: string, WC3: string, WC4: string }, geotechnicalFacingEnum: { N: string, NE: string, E: string, SE: string, S: string, SW: string, W: string, NW: string }, solubilityEnum: { Oil: string, Water: string } } | null | undefined };

export type ValidatorFlowCalculationDirectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorFlowCalculationDirectionQuery = { validators?: { flowCalculationDirectionEnum: { Upstream: string, Downstream: string } } | null | undefined };

export type ValidatorsLicenseChangeQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsLicenseChangeQuery = { validators?: { statusEnum: { Operating: string, Discontinued: string, Abandoned: string, Removed: string, ToBeConstructed: string, Active: string, Cancelled: string, New: string, NotConstructed: string }, substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string } } | null | undefined };

export type ValidatorsMechanicalPropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsMechanicalPropertiesQuery = { validators?: { yieldStrengthMatchPattern: string, lengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, typeEnum: { Type515: string, Type2306: string, Type3406: string, Type3408: string, Type6063: string, Type6351: string, Type5A: string, Type5L: string, Type5LX: string, TypeA106: string, TypeA120: string, TypeA53: string, TypeAMERON: string, TypeB515: string, TypeB51S: string, TypeB5IS: string, TypeCENTRON: string, TypeCIBA: string, TypeFSLP: string, TypeREDTHR: string, TypeSMITH: string, TypeSTAR: string, TypeTBS: string, TypeWSLP: string, TypeZ2451: string, TypeZ2453: string }, gradeEnum: { GradeA: string, Grade3592: string, GradeB: string, GradeX42: string, GradeBW1: string, Grade2500: string, Grade3591: string, Grade2901: string, GradeT4: string, Grade300: string, Grade3593: string, Grade11: string, GradeJ55: string, Grade2250: string, GradeX52: string, Grade2750: string, Grade25: string, Grade2902: string, Grade241: string, Grade2413: string, Grade2411: string, Grade155: string, Grade150: string, Grade1000: string, Grade800: string, GradeT1A: string, Grade2010: string, GradeT4A: string, Grade1250: string, Grade17: string, Grade900: string, GradeT1B: string, Grade810: string, Grade35: string, Grade5: string, Grade9: string, Grade200: string, Grade1200: string, Grade1103: string }, materialEnum: { Steel: string, PolyvinylChloride: string, Composite: string, Fiberglass: string, Aluminum: string, Polyethylene: string, CelluloseAcetateButyrate: string, Unknown: string, AsbestosCement: string }, internalProtectionEnum: { Uncoated: string, FreeStandingSlipLined: string, Unknown: string, Cement: string, ExpandedPolyethylene: string, ThinFilm: string } } | null | undefined };

export type ValidatorsPressureTestQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPressureTestQuery = { validators?: { limitingSpecEnum: { ANSI150: string, ANSI300: string, ANSI600: string } } | null | undefined };

export type ValidatorsRiskQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsRiskQuery = { validators?: { environmentProximityToEnum: { WB1: string, WB3: string, WB4: string, WB5: string, WC1: string, WC2: string, WC3: string, WC4: string }, geotechnicalFacingEnum: { N: string, NE: string, E: string, SE: string, S: string, SW: string, W: string, NW: string }, typeEnum: { Type515: string, Type2306: string, Type3406: string, Type3408: string, Type6063: string, Type6351: string, Type5A: string, Type5L: string, Type5LX: string, TypeA106: string, TypeA120: string, TypeA53: string, TypeAMERON: string, TypeB515: string, TypeB51S: string, TypeB5IS: string, TypeCENTRON: string, TypeCIBA: string, TypeFSLP: string, TypeREDTHR: string, TypeSMITH: string, TypeSTAR: string, TypeTBS: string, TypeWSLP: string, TypeZ2451: string, TypeZ2453: string }, materialEnum: { Steel: string, PolyvinylChloride: string, Composite: string, Fiberglass: string, Aluminum: string, Polyethylene: string, CelluloseAcetateButyrate: string, Unknown: string, AsbestosCement: string } } | null | undefined };

export type ValidatorUserRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorUserRoleQuery = { validators?: { userRoleEnum: { ADMIN: string, ENGINEER: string, OFFICE: string, OPERATOR: string, CHEMICAL: string, CATHODIC: string, CONTRACTOR: string } } | null | undefined };

export type LicenseChangesByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type LicenseChangesByPipelineIdQuery = { licenseChangesByPipelineId?: Array<{ id: string, status: StatusEnum, substance: SubstanceEnum, date: string, comment?: string | null | undefined, linkToDocumentation?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type PressureTestsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PressureTestsByPipelineIdQuery = { pressureTestsByPipelineId?: Array<{ id: string, requiredWTForMop?: number | null | undefined, mopTestPressure?: number | null | undefined, limitingSpec?: LimitingSpecEnum | null | undefined, maxPressureOfLimitingSpec?: number | null | undefined, pressureTestPressure?: number | null | undefined, requiredWTForTestPressure?: number | null | undefined, pressureTestCorrosionAllowance?: number | null | undefined, waterForPigging?: number | null | undefined, infoSentOutDate?: string | null | undefined, ddsDate?: string | null | undefined, pressureTestDate: string, pressureTestReceivedDate?: string | null | undefined, integritySheetUpdated?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type WellsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type WellsByPipelineIdQuery = { wellsByPipelineId?: Array<{ id: string, name: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined, fdcRecId?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type WellsGroupByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type WellsGroupByPipelineIdQuery = { wellsGroupByPipelineId?: { oil?: number | null | undefined, water?: number | null | undefined, gas?: number | null | undefined, gasAssociatedLiquids?: number | null | undefined, firstProduction?: string | null | undefined, totalFluids?: number | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined };

export type WellOptionsQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type WellOptionsQuery = { wellOptions?: Array<{ facility?: string | null | undefined, satellite?: string | null | undefined, id: string, source: string, disabled: boolean } | null | undefined> | null | undefined };

export type SalesPointsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type SalesPointsByPipelineIdQuery = { salesPointsByPipelineId?: Array<{ id: string, name: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined, fdcRecId?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type SalesPointsGroupByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type SalesPointsGroupByPipelineIdQuery = { salesPointsGroupByPipelineId?: { oil?: number | null | undefined, water?: number | null | undefined, gas?: number | null | undefined, gasAssociatedLiquids?: number | null | undefined, totalFluids?: number | null | undefined, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined };

export type SalesPointOptionsQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type SalesPointOptionsQuery = { salesPointOptions?: Array<{ facility?: string | null | undefined, satellite?: string | null | undefined, id: string, source: string, disabled: boolean } | null | undefined> | null | undefined };

export type ConnectedPipelinesByPipelineIdQueryVariables = Exact<{
  id: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type ConnectedPipelinesByPipelineIdQuery = { connectedPipelinesByPipelineId?: { pipelinesFlow?: Array<{ id: string, name: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined, authorized: boolean, createdAt: string, updatedAt: string, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined, sourceGroupBy?: { oil?: number | null | undefined, water?: number | null | undefined, gas?: number | null | undefined, gasAssociatedLiquids?: number | null | undefined, totalFluids?: number | null | undefined, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined } | null | undefined };

export type PipelineFlowQueryVariables = Exact<{
  id: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type PipelineFlowQuery = { pipelineFlow?: { oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined };

export type PipelineOptionsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PipelineOptionsQuery = { pipelineOptions?: Array<{ facility?: string | null | undefined, satellite?: string | null | undefined, id: string, source: string, disabled: boolean } | null | undefined> | null | undefined };

export type RiskByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RiskByIdQuery = { riskById?: { id: string, aerialReview?: boolean | null | undefined, environmentProximityTo?: EnvironmentProximityToEnum | null | undefined, geotechnicalSlopeAngleS1?: number | null | undefined, geotechnicalFacingS1?: GeotechnicalFacingEnum | null | undefined, geotechnicalHeightS1?: number | null | undefined, geotechnicalSlopeAngleS2?: number | null | undefined, geotechnicalFacingS2?: GeotechnicalFacingEnum | null | undefined, geotechnicalHeightS2?: number | null | undefined, dateSlopeChecked?: string | null | undefined, repairTimeDays?: number | null | undefined, releaseTimeDays?: number | null | undefined, costPerM3Released?: number | null | undefined, consequenceEnviro?: number | null | undefined, consequenceAsset?: number | null | undefined, probabilityInterior?: number | null | undefined, probabilityExterior?: number | null | undefined, consequenceMax?: number | null | undefined, riskPotentialGeo?: number | null | undefined, riskPotentialInternal?: number | null | undefined, riskPotentialExternal?: number | null | undefined, oilReleaseCost?: number | null | undefined, gasReleaseCost?: number | null | undefined, consequencePeople?: number | null | undefined, probabilityGeo?: number | null | undefined, safeguardInternalProtection?: number | null | undefined, safeguardPigging?: number | null | undefined, safeguardChemicalInhibition?: number | null | undefined, probabilityInteriorWithSafeguards?: number | null | undefined, riskPotentialInternalWithSafeguards?: number | null | undefined, safeguardExternalCoating?: number | null | undefined, safeguardCathodic?: number | null | undefined, probabilityExteriorWithSafeguards?: number | null | undefined, riskPotentialExternalWithSafeguards?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined };

export type ChemicalByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ChemicalByIdQuery = { chemicalById?: { id: string, chemicalSupplierId?: string | null | undefined, baselineFluidAnalysisDate?: string | null | undefined, scaling?: boolean | null | undefined, bacteria?: boolean | null | undefined, co2?: boolean | null | undefined, o2?: boolean | null | undefined, h2s?: boolean | null | undefined, continuousInjection?: boolean | null | undefined, injectionRate?: number | null | undefined, downholeBatch?: boolean | null | undefined, inhibitorPipelineBatch?: boolean | null | undefined, bacteriaTreatment?: boolean | null | undefined, scaleTreatment?: boolean | null | undefined, batchFrequency?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined };

export type PipelinesFlowQueryVariables = Exact<{
  idList: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type PipelinesFlowQuery = { pipelinesFlow?: Array<{ id: string, name: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined> | null | undefined };

export type SideBarQueryVariables = Exact<{ [key: string]: never; }>;


export type SideBarQuery = { sideBar?: Array<{ id: string, name: string, satellites: Array<{ id: string, name: string }> } | null | undefined> | null | undefined };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      firstName
      lastName
      role
    }
    error {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($userCreateInput: UserCreateInput!) {
  signup(userCreateInput: $userCreateInput) {
    user {
      id
      email
      firstName
      lastName
      role
    }
    error {
      field
      message
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      userCreateInput: // value for 'userCreateInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const DeletePipelineDocument = gql`
    mutation DeletePipeline($id: String!) {
  deletePipeline(id: $id) {
    pipeline {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeletePipelineMutationFn = Apollo.MutationFunction<DeletePipelineMutation, DeletePipelineMutationVariables>;

/**
 * __useDeletePipelineMutation__
 *
 * To run a mutation, you first call `useDeletePipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePipelineMutation, { data, loading, error }] = useDeletePipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePipelineMutation(baseOptions?: Apollo.MutationHookOptions<DeletePipelineMutation, DeletePipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePipelineMutation, DeletePipelineMutationVariables>(DeletePipelineDocument, options);
      }
export type DeletePipelineMutationHookResult = ReturnType<typeof useDeletePipelineMutation>;
export type DeletePipelineMutationResult = Apollo.MutationResult<DeletePipelineMutation>;
export type DeletePipelineMutationOptions = Apollo.BaseMutationOptions<DeletePipelineMutation, DeletePipelineMutationVariables>;
export const DuplicatePipelineDocument = gql`
    mutation DuplicatePipeline($id: String!) {
  duplicatePipeline(id: $id) {
    pipeline {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DuplicatePipelineMutationFn = Apollo.MutationFunction<DuplicatePipelineMutation, DuplicatePipelineMutationVariables>;

/**
 * __useDuplicatePipelineMutation__
 *
 * To run a mutation, you first call `useDuplicatePipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicatePipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicatePipelineMutation, { data, loading, error }] = useDuplicatePipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicatePipelineMutation(baseOptions?: Apollo.MutationHookOptions<DuplicatePipelineMutation, DuplicatePipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicatePipelineMutation, DuplicatePipelineMutationVariables>(DuplicatePipelineDocument, options);
      }
export type DuplicatePipelineMutationHookResult = ReturnType<typeof useDuplicatePipelineMutation>;
export type DuplicatePipelineMutationResult = Apollo.MutationResult<DuplicatePipelineMutation>;
export type DuplicatePipelineMutationOptions = Apollo.BaseMutationOptions<DuplicatePipelineMutation, DuplicatePipelineMutationVariables>;
export const ConnectPipelineDocument = gql`
    mutation ConnectPipeline($pipelineId: String!, $connectNewPipelineId: String!, $flowCalculationDirection: FlowCalculationDirectionEnum!, $connectedPipelineId: String) {
  connectPipeline(
    pipelineId: $pipelineId
    connectNewPipelineId: $connectNewPipelineId
    flowCalculationDirection: $flowCalculationDirection
    connectedPipelineId: $connectedPipelineId
  ) {
    pipelinesOnPipelines {
      upstreamId
      downstreamId
    }
    error {
      field
      message
    }
  }
}
    `;
export type ConnectPipelineMutationFn = Apollo.MutationFunction<ConnectPipelineMutation, ConnectPipelineMutationVariables>;

/**
 * __useConnectPipelineMutation__
 *
 * To run a mutation, you first call `useConnectPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectPipelineMutation, { data, loading, error }] = useConnectPipelineMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *      connectNewPipelineId: // value for 'connectNewPipelineId'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
 *      connectedPipelineId: // value for 'connectedPipelineId'
 *   },
 * });
 */
export function useConnectPipelineMutation(baseOptions?: Apollo.MutationHookOptions<ConnectPipelineMutation, ConnectPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectPipelineMutation, ConnectPipelineMutationVariables>(ConnectPipelineDocument, options);
      }
export type ConnectPipelineMutationHookResult = ReturnType<typeof useConnectPipelineMutation>;
export type ConnectPipelineMutationResult = Apollo.MutationResult<ConnectPipelineMutation>;
export type ConnectPipelineMutationOptions = Apollo.BaseMutationOptions<ConnectPipelineMutation, ConnectPipelineMutationVariables>;
export const DisconnectPipelineDocument = gql`
    mutation DisconnectPipeline($pipelineId: String!, $disconnectPipelineId: String!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  disconnectPipeline(
    pipelineId: $pipelineId
    disconnectPipelineId: $disconnectPipelineId
    flowCalculationDirection: $flowCalculationDirection
  ) {
    pipelinesOnPipelines {
      upstreamId
      downstreamId
    }
    error {
      field
      message
    }
  }
}
    `;
export type DisconnectPipelineMutationFn = Apollo.MutationFunction<DisconnectPipelineMutation, DisconnectPipelineMutationVariables>;

/**
 * __useDisconnectPipelineMutation__
 *
 * To run a mutation, you first call `useDisconnectPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectPipelineMutation, { data, loading, error }] = useDisconnectPipelineMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *      disconnectPipelineId: // value for 'disconnectPipelineId'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
 *   },
 * });
 */
export function useDisconnectPipelineMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectPipelineMutation, DisconnectPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectPipelineMutation, DisconnectPipelineMutationVariables>(DisconnectPipelineDocument, options);
      }
export type DisconnectPipelineMutationHookResult = ReturnType<typeof useDisconnectPipelineMutation>;
export type DisconnectPipelineMutationResult = Apollo.MutationResult<DisconnectPipelineMutation>;
export type DisconnectPipelineMutationOptions = Apollo.BaseMutationOptions<DisconnectPipelineMutation, DisconnectPipelineMutationVariables>;
export const ConnectWellDocument = gql`
    mutation ConnectWell($id: String!, $pipelineId: String!) {
  connectWell(id: $id, pipelineId: $pipelineId) {
    well {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type ConnectWellMutationFn = Apollo.MutationFunction<ConnectWellMutation, ConnectWellMutationVariables>;

/**
 * __useConnectWellMutation__
 *
 * To run a mutation, you first call `useConnectWellMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectWellMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectWellMutation, { data, loading, error }] = useConnectWellMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useConnectWellMutation(baseOptions?: Apollo.MutationHookOptions<ConnectWellMutation, ConnectWellMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectWellMutation, ConnectWellMutationVariables>(ConnectWellDocument, options);
      }
export type ConnectWellMutationHookResult = ReturnType<typeof useConnectWellMutation>;
export type ConnectWellMutationResult = Apollo.MutationResult<ConnectWellMutation>;
export type ConnectWellMutationOptions = Apollo.BaseMutationOptions<ConnectWellMutation, ConnectWellMutationVariables>;
export const DisconnectWellDocument = gql`
    mutation DisconnectWell($id: String!) {
  disconnectWell(id: $id) {
    well {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DisconnectWellMutationFn = Apollo.MutationFunction<DisconnectWellMutation, DisconnectWellMutationVariables>;

/**
 * __useDisconnectWellMutation__
 *
 * To run a mutation, you first call `useDisconnectWellMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectWellMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectWellMutation, { data, loading, error }] = useDisconnectWellMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDisconnectWellMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectWellMutation, DisconnectWellMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectWellMutation, DisconnectWellMutationVariables>(DisconnectWellDocument, options);
      }
export type DisconnectWellMutationHookResult = ReturnType<typeof useDisconnectWellMutation>;
export type DisconnectWellMutationResult = Apollo.MutationResult<DisconnectWellMutation>;
export type DisconnectWellMutationOptions = Apollo.BaseMutationOptions<DisconnectWellMutation, DisconnectWellMutationVariables>;
export const ConnectSalesPointDocument = gql`
    mutation ConnectSalesPoint($id: String!, $pipelineId: String!) {
  connectSalesPoint(id: $id, pipelineId: $pipelineId) {
    salesPoint {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type ConnectSalesPointMutationFn = Apollo.MutationFunction<ConnectSalesPointMutation, ConnectSalesPointMutationVariables>;

/**
 * __useConnectSalesPointMutation__
 *
 * To run a mutation, you first call `useConnectSalesPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectSalesPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectSalesPointMutation, { data, loading, error }] = useConnectSalesPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useConnectSalesPointMutation(baseOptions?: Apollo.MutationHookOptions<ConnectSalesPointMutation, ConnectSalesPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectSalesPointMutation, ConnectSalesPointMutationVariables>(ConnectSalesPointDocument, options);
      }
export type ConnectSalesPointMutationHookResult = ReturnType<typeof useConnectSalesPointMutation>;
export type ConnectSalesPointMutationResult = Apollo.MutationResult<ConnectSalesPointMutation>;
export type ConnectSalesPointMutationOptions = Apollo.BaseMutationOptions<ConnectSalesPointMutation, ConnectSalesPointMutationVariables>;
export const DisconnectSalesPointDocument = gql`
    mutation DisconnectSalesPoint($id: String!) {
  disconnectSalesPoint(id: $id) {
    salesPoint {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DisconnectSalesPointMutationFn = Apollo.MutationFunction<DisconnectSalesPointMutation, DisconnectSalesPointMutationVariables>;

/**
 * __useDisconnectSalesPointMutation__
 *
 * To run a mutation, you first call `useDisconnectSalesPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectSalesPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectSalesPointMutation, { data, loading, error }] = useDisconnectSalesPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDisconnectSalesPointMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectSalesPointMutation, DisconnectSalesPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectSalesPointMutation, DisconnectSalesPointMutationVariables>(DisconnectSalesPointDocument, options);
      }
export type DisconnectSalesPointMutationHookResult = ReturnType<typeof useDisconnectSalesPointMutation>;
export type DisconnectSalesPointMutationResult = Apollo.MutationResult<DisconnectSalesPointMutation>;
export type DisconnectSalesPointMutationOptions = Apollo.BaseMutationOptions<DisconnectSalesPointMutation, DisconnectSalesPointMutationVariables>;
export const EditPipelineDocument = gql`
    mutation EditPipeline($id: String!, $satelliteId: String, $license: String, $segment: String, $flowCalculationDirection: FlowCalculationDirectionEnum, $from: String, $fromFeature: FromToFeatureEnum, $to: String, $toFeature: FromToFeatureEnum, $licenseDate: DateTime, $length: Float, $type: TypeEnum, $grade: GradeEnum, $yieldStrength: Int, $outsideDiameter: Float, $wallThickness: Float, $material: MaterialEnum, $mop: Int, $internalProtection: InternalProtectionEnum, $piggable: Boolean, $piggingFrequency: Int) {
  editPipeline(
    id: $id
    satelliteId: $satelliteId
    license: $license
    segment: $segment
    flowCalculationDirection: $flowCalculationDirection
    from: $from
    fromFeature: $fromFeature
    to: $to
    toFeature: $toFeature
    licenseDate: $licenseDate
    length: $length
    type: $type
    grade: $grade
    yieldStrength: $yieldStrength
    outsideDiameter: $outsideDiameter
    wallThickness: $wallThickness
    material: $material
    mop: $mop
    internalProtection: $internalProtection
    piggable: $piggable
    piggingFrequency: $piggingFrequency
  ) {
    pipeline {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditPipelineMutationFn = Apollo.MutationFunction<EditPipelineMutation, EditPipelineMutationVariables>;

/**
 * __useEditPipelineMutation__
 *
 * To run a mutation, you first call `useEditPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPipelineMutation, { data, loading, error }] = useEditPipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      satelliteId: // value for 'satelliteId'
 *      license: // value for 'license'
 *      segment: // value for 'segment'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
 *      from: // value for 'from'
 *      fromFeature: // value for 'fromFeature'
 *      to: // value for 'to'
 *      toFeature: // value for 'toFeature'
 *      licenseDate: // value for 'licenseDate'
 *      length: // value for 'length'
 *      type: // value for 'type'
 *      grade: // value for 'grade'
 *      yieldStrength: // value for 'yieldStrength'
 *      outsideDiameter: // value for 'outsideDiameter'
 *      wallThickness: // value for 'wallThickness'
 *      material: // value for 'material'
 *      mop: // value for 'mop'
 *      internalProtection: // value for 'internalProtection'
 *      piggable: // value for 'piggable'
 *      piggingFrequency: // value for 'piggingFrequency'
 *   },
 * });
 */
export function useEditPipelineMutation(baseOptions?: Apollo.MutationHookOptions<EditPipelineMutation, EditPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPipelineMutation, EditPipelineMutationVariables>(EditPipelineDocument, options);
      }
export type EditPipelineMutationHookResult = ReturnType<typeof useEditPipelineMutation>;
export type EditPipelineMutationResult = Apollo.MutationResult<EditPipelineMutation>;
export type EditPipelineMutationOptions = Apollo.BaseMutationOptions<EditPipelineMutation, EditPipelineMutationVariables>;
export const EditLicenseChangeDocument = gql`
    mutation EditLicenseChange($id: String!, $status: StatusEnum, $substance: SubstanceEnum, $date: DateTime, $linkToDocumentation: String) {
  editLicenseChange(
    id: $id
    status: $status
    substance: $substance
    date: $date
    linkToDocumentation: $linkToDocumentation
  ) {
    licenseChange {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditLicenseChangeMutationFn = Apollo.MutationFunction<EditLicenseChangeMutation, EditLicenseChangeMutationVariables>;

/**
 * __useEditLicenseChangeMutation__
 *
 * To run a mutation, you first call `useEditLicenseChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditLicenseChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editLicenseChangeMutation, { data, loading, error }] = useEditLicenseChangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      substance: // value for 'substance'
 *      date: // value for 'date'
 *      linkToDocumentation: // value for 'linkToDocumentation'
 *   },
 * });
 */
export function useEditLicenseChangeMutation(baseOptions?: Apollo.MutationHookOptions<EditLicenseChangeMutation, EditLicenseChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditLicenseChangeMutation, EditLicenseChangeMutationVariables>(EditLicenseChangeDocument, options);
      }
export type EditLicenseChangeMutationHookResult = ReturnType<typeof useEditLicenseChangeMutation>;
export type EditLicenseChangeMutationResult = Apollo.MutationResult<EditLicenseChangeMutation>;
export type EditLicenseChangeMutationOptions = Apollo.BaseMutationOptions<EditLicenseChangeMutation, EditLicenseChangeMutationVariables>;
export const AddLicenseChangeDocument = gql`
    mutation AddLicenseChange($pipelineId: String!) {
  addLicenseChange(pipelineId: $pipelineId) {
    licenseChange {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddLicenseChangeMutationFn = Apollo.MutationFunction<AddLicenseChangeMutation, AddLicenseChangeMutationVariables>;

/**
 * __useAddLicenseChangeMutation__
 *
 * To run a mutation, you first call `useAddLicenseChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLicenseChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLicenseChangeMutation, { data, loading, error }] = useAddLicenseChangeMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useAddLicenseChangeMutation(baseOptions?: Apollo.MutationHookOptions<AddLicenseChangeMutation, AddLicenseChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLicenseChangeMutation, AddLicenseChangeMutationVariables>(AddLicenseChangeDocument, options);
      }
export type AddLicenseChangeMutationHookResult = ReturnType<typeof useAddLicenseChangeMutation>;
export type AddLicenseChangeMutationResult = Apollo.MutationResult<AddLicenseChangeMutation>;
export type AddLicenseChangeMutationOptions = Apollo.BaseMutationOptions<AddLicenseChangeMutation, AddLicenseChangeMutationVariables>;
export const DeleteLicenseChangeDocument = gql`
    mutation DeleteLicenseChange($id: String!) {
  deleteLicenseChange(id: $id) {
    licenseChange {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeleteLicenseChangeMutationFn = Apollo.MutationFunction<DeleteLicenseChangeMutation, DeleteLicenseChangeMutationVariables>;

/**
 * __useDeleteLicenseChangeMutation__
 *
 * To run a mutation, you first call `useDeleteLicenseChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLicenseChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLicenseChangeMutation, { data, loading, error }] = useDeleteLicenseChangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLicenseChangeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLicenseChangeMutation, DeleteLicenseChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLicenseChangeMutation, DeleteLicenseChangeMutationVariables>(DeleteLicenseChangeDocument, options);
      }
export type DeleteLicenseChangeMutationHookResult = ReturnType<typeof useDeleteLicenseChangeMutation>;
export type DeleteLicenseChangeMutationResult = Apollo.MutationResult<DeleteLicenseChangeMutation>;
export type DeleteLicenseChangeMutationOptions = Apollo.BaseMutationOptions<DeleteLicenseChangeMutation, DeleteLicenseChangeMutationVariables>;
export const EditPressureTestDocument = gql`
    mutation EditPressureTest($id: String!, $limitingSpec: LimitingSpecEnum, $infoSentOutDate: DateTime, $ddsDate: DateTime, $pressureTestDate: DateTime, $pressureTestReceivedDate: DateTime, $integritySheetUpdated: DateTime, $comment: String) {
  editPressureTest(
    id: $id
    limitingSpec: $limitingSpec
    infoSentOutDate: $infoSentOutDate
    ddsDate: $ddsDate
    pressureTestDate: $pressureTestDate
    pressureTestReceivedDate: $pressureTestReceivedDate
    integritySheetUpdated: $integritySheetUpdated
    comment: $comment
  ) {
    pressureTest {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditPressureTestMutationFn = Apollo.MutationFunction<EditPressureTestMutation, EditPressureTestMutationVariables>;

/**
 * __useEditPressureTestMutation__
 *
 * To run a mutation, you first call `useEditPressureTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPressureTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPressureTestMutation, { data, loading, error }] = useEditPressureTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      limitingSpec: // value for 'limitingSpec'
 *      infoSentOutDate: // value for 'infoSentOutDate'
 *      ddsDate: // value for 'ddsDate'
 *      pressureTestDate: // value for 'pressureTestDate'
 *      pressureTestReceivedDate: // value for 'pressureTestReceivedDate'
 *      integritySheetUpdated: // value for 'integritySheetUpdated'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useEditPressureTestMutation(baseOptions?: Apollo.MutationHookOptions<EditPressureTestMutation, EditPressureTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPressureTestMutation, EditPressureTestMutationVariables>(EditPressureTestDocument, options);
      }
export type EditPressureTestMutationHookResult = ReturnType<typeof useEditPressureTestMutation>;
export type EditPressureTestMutationResult = Apollo.MutationResult<EditPressureTestMutation>;
export type EditPressureTestMutationOptions = Apollo.BaseMutationOptions<EditPressureTestMutation, EditPressureTestMutationVariables>;
export const AddPressureTestDocument = gql`
    mutation AddPressureTest($pipelineId: String!) {
  addPressureTest(pipelineId: $pipelineId) {
    pressureTest {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddPressureTestMutationFn = Apollo.MutationFunction<AddPressureTestMutation, AddPressureTestMutationVariables>;

/**
 * __useAddPressureTestMutation__
 *
 * To run a mutation, you first call `useAddPressureTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPressureTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPressureTestMutation, { data, loading, error }] = useAddPressureTestMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useAddPressureTestMutation(baseOptions?: Apollo.MutationHookOptions<AddPressureTestMutation, AddPressureTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPressureTestMutation, AddPressureTestMutationVariables>(AddPressureTestDocument, options);
      }
export type AddPressureTestMutationHookResult = ReturnType<typeof useAddPressureTestMutation>;
export type AddPressureTestMutationResult = Apollo.MutationResult<AddPressureTestMutation>;
export type AddPressureTestMutationOptions = Apollo.BaseMutationOptions<AddPressureTestMutation, AddPressureTestMutationVariables>;
export const DeletePressureTestDocument = gql`
    mutation DeletePressureTest($id: String!) {
  deletePressureTest(id: $id) {
    pressureTest {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeletePressureTestMutationFn = Apollo.MutationFunction<DeletePressureTestMutation, DeletePressureTestMutationVariables>;

/**
 * __useDeletePressureTestMutation__
 *
 * To run a mutation, you first call `useDeletePressureTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePressureTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePressureTestMutation, { data, loading, error }] = useDeletePressureTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePressureTestMutation(baseOptions?: Apollo.MutationHookOptions<DeletePressureTestMutation, DeletePressureTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePressureTestMutation, DeletePressureTestMutationVariables>(DeletePressureTestDocument, options);
      }
export type DeletePressureTestMutationHookResult = ReturnType<typeof useDeletePressureTestMutation>;
export type DeletePressureTestMutationResult = Apollo.MutationResult<DeletePressureTestMutation>;
export type DeletePressureTestMutationOptions = Apollo.BaseMutationOptions<DeletePressureTestMutation, DeletePressureTestMutationVariables>;
export const EditPigRunDocument = gql`
    mutation EditPigRun($id: String!, $pigType: PigTypeEnum, $dateIn: DateTime, $dateOut: DateTime, $isolationValveFunctionTest: PigInspectionEnum, $pigSenderReceiverInspection: PigInspectionEnum, $comment: String, $operatorId: String) {
  editPigRun(
    id: $id
    pigType: $pigType
    dateIn: $dateIn
    dateOut: $dateOut
    isolationValveFunctionTest: $isolationValveFunctionTest
    pigSenderReceiverInspection: $pigSenderReceiverInspection
    comment: $comment
    operatorId: $operatorId
  ) {
    pigRun {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditPigRunMutationFn = Apollo.MutationFunction<EditPigRunMutation, EditPigRunMutationVariables>;

/**
 * __useEditPigRunMutation__
 *
 * To run a mutation, you first call `useEditPigRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPigRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPigRunMutation, { data, loading, error }] = useEditPigRunMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pigType: // value for 'pigType'
 *      dateIn: // value for 'dateIn'
 *      dateOut: // value for 'dateOut'
 *      isolationValveFunctionTest: // value for 'isolationValveFunctionTest'
 *      pigSenderReceiverInspection: // value for 'pigSenderReceiverInspection'
 *      comment: // value for 'comment'
 *      operatorId: // value for 'operatorId'
 *   },
 * });
 */
export function useEditPigRunMutation(baseOptions?: Apollo.MutationHookOptions<EditPigRunMutation, EditPigRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPigRunMutation, EditPigRunMutationVariables>(EditPigRunDocument, options);
      }
export type EditPigRunMutationHookResult = ReturnType<typeof useEditPigRunMutation>;
export type EditPigRunMutationResult = Apollo.MutationResult<EditPigRunMutation>;
export type EditPigRunMutationOptions = Apollo.BaseMutationOptions<EditPigRunMutation, EditPigRunMutationVariables>;
export const AddPigRunDocument = gql`
    mutation AddPigRun($pipelineId: String!) {
  addPigRun(pipelineId: $pipelineId) {
    pigRun {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddPigRunMutationFn = Apollo.MutationFunction<AddPigRunMutation, AddPigRunMutationVariables>;

/**
 * __useAddPigRunMutation__
 *
 * To run a mutation, you first call `useAddPigRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPigRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPigRunMutation, { data, loading, error }] = useAddPigRunMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useAddPigRunMutation(baseOptions?: Apollo.MutationHookOptions<AddPigRunMutation, AddPigRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPigRunMutation, AddPigRunMutationVariables>(AddPigRunDocument, options);
      }
export type AddPigRunMutationHookResult = ReturnType<typeof useAddPigRunMutation>;
export type AddPigRunMutationResult = Apollo.MutationResult<AddPigRunMutation>;
export type AddPigRunMutationOptions = Apollo.BaseMutationOptions<AddPigRunMutation, AddPigRunMutationVariables>;
export const DeletePigRunDocument = gql`
    mutation DeletePigRun($id: String!) {
  deletePigRun(id: $id) {
    pigRun {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeletePigRunMutationFn = Apollo.MutationFunction<DeletePigRunMutation, DeletePigRunMutationVariables>;

/**
 * __useDeletePigRunMutation__
 *
 * To run a mutation, you first call `useDeletePigRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePigRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePigRunMutation, { data, loading, error }] = useDeletePigRunMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePigRunMutation(baseOptions?: Apollo.MutationHookOptions<DeletePigRunMutation, DeletePigRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePigRunMutation, DeletePigRunMutationVariables>(DeletePigRunDocument, options);
      }
export type DeletePigRunMutationHookResult = ReturnType<typeof useDeletePigRunMutation>;
export type DeletePigRunMutationResult = Apollo.MutationResult<DeletePigRunMutation>;
export type DeletePigRunMutationOptions = Apollo.BaseMutationOptions<DeletePigRunMutation, DeletePigRunMutationVariables>;
export const EditPipelineBatchDocument = gql`
    mutation EditPipelineBatch($id: String!, $date: DateTime, $productId: String, $cost: Float, $chemicalVolume: Float, $diluentVolume: Float, $comment: String) {
  editPipelineBatch(
    id: $id
    date: $date
    productId: $productId
    cost: $cost
    chemicalVolume: $chemicalVolume
    diluentVolume: $diluentVolume
    comment: $comment
  ) {
    pipelineBatch {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditPipelineBatchMutationFn = Apollo.MutationFunction<EditPipelineBatchMutation, EditPipelineBatchMutationVariables>;

/**
 * __useEditPipelineBatchMutation__
 *
 * To run a mutation, you first call `useEditPipelineBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPipelineBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPipelineBatchMutation, { data, loading, error }] = useEditPipelineBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *      productId: // value for 'productId'
 *      cost: // value for 'cost'
 *      chemicalVolume: // value for 'chemicalVolume'
 *      diluentVolume: // value for 'diluentVolume'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useEditPipelineBatchMutation(baseOptions?: Apollo.MutationHookOptions<EditPipelineBatchMutation, EditPipelineBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPipelineBatchMutation, EditPipelineBatchMutationVariables>(EditPipelineBatchDocument, options);
      }
export type EditPipelineBatchMutationHookResult = ReturnType<typeof useEditPipelineBatchMutation>;
export type EditPipelineBatchMutationResult = Apollo.MutationResult<EditPipelineBatchMutation>;
export type EditPipelineBatchMutationOptions = Apollo.BaseMutationOptions<EditPipelineBatchMutation, EditPipelineBatchMutationVariables>;
export const AddPipelineBatchDocument = gql`
    mutation AddPipelineBatch($pipelineId: String!) {
  addPipelineBatch(pipelineId: $pipelineId) {
    pipelineBatch {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddPipelineBatchMutationFn = Apollo.MutationFunction<AddPipelineBatchMutation, AddPipelineBatchMutationVariables>;

/**
 * __useAddPipelineBatchMutation__
 *
 * To run a mutation, you first call `useAddPipelineBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPipelineBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPipelineBatchMutation, { data, loading, error }] = useAddPipelineBatchMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useAddPipelineBatchMutation(baseOptions?: Apollo.MutationHookOptions<AddPipelineBatchMutation, AddPipelineBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPipelineBatchMutation, AddPipelineBatchMutationVariables>(AddPipelineBatchDocument, options);
      }
export type AddPipelineBatchMutationHookResult = ReturnType<typeof useAddPipelineBatchMutation>;
export type AddPipelineBatchMutationResult = Apollo.MutationResult<AddPipelineBatchMutation>;
export type AddPipelineBatchMutationOptions = Apollo.BaseMutationOptions<AddPipelineBatchMutation, AddPipelineBatchMutationVariables>;
export const DeletePipelineBatchDocument = gql`
    mutation DeletePipelineBatch($id: String!) {
  deletePipelineBatch(id: $id) {
    pipelineBatch {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeletePipelineBatchMutationFn = Apollo.MutationFunction<DeletePipelineBatchMutation, DeletePipelineBatchMutationVariables>;

/**
 * __useDeletePipelineBatchMutation__
 *
 * To run a mutation, you first call `useDeletePipelineBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePipelineBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePipelineBatchMutation, { data, loading, error }] = useDeletePipelineBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePipelineBatchMutation(baseOptions?: Apollo.MutationHookOptions<DeletePipelineBatchMutation, DeletePipelineBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePipelineBatchMutation, DeletePipelineBatchMutationVariables>(DeletePipelineBatchDocument, options);
      }
export type DeletePipelineBatchMutationHookResult = ReturnType<typeof useDeletePipelineBatchMutation>;
export type DeletePipelineBatchMutationResult = Apollo.MutationResult<DeletePipelineBatchMutation>;
export type DeletePipelineBatchMutationOptions = Apollo.BaseMutationOptions<DeletePipelineBatchMutation, DeletePipelineBatchMutationVariables>;
export const EditWellBatchDocument = gql`
    mutation EditWellBatch($id: String!, $date: DateTime, $productId: String, $cost: Float, $chemicalVolume: Float, $diluentVolume: Float, $comment: String) {
  editWellBatch(
    id: $id
    date: $date
    productId: $productId
    cost: $cost
    chemicalVolume: $chemicalVolume
    diluentVolume: $diluentVolume
    comment: $comment
  ) {
    wellBatch {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditWellBatchMutationFn = Apollo.MutationFunction<EditWellBatchMutation, EditWellBatchMutationVariables>;

/**
 * __useEditWellBatchMutation__
 *
 * To run a mutation, you first call `useEditWellBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditWellBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editWellBatchMutation, { data, loading, error }] = useEditWellBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *      productId: // value for 'productId'
 *      cost: // value for 'cost'
 *      chemicalVolume: // value for 'chemicalVolume'
 *      diluentVolume: // value for 'diluentVolume'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useEditWellBatchMutation(baseOptions?: Apollo.MutationHookOptions<EditWellBatchMutation, EditWellBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditWellBatchMutation, EditWellBatchMutationVariables>(EditWellBatchDocument, options);
      }
export type EditWellBatchMutationHookResult = ReturnType<typeof useEditWellBatchMutation>;
export type EditWellBatchMutationResult = Apollo.MutationResult<EditWellBatchMutation>;
export type EditWellBatchMutationOptions = Apollo.BaseMutationOptions<EditWellBatchMutation, EditWellBatchMutationVariables>;
export const AddWellBatchDocument = gql`
    mutation AddWellBatch($wellId: String!) {
  addWellBatch(wellId: $wellId) {
    wellBatch {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddWellBatchMutationFn = Apollo.MutationFunction<AddWellBatchMutation, AddWellBatchMutationVariables>;

/**
 * __useAddWellBatchMutation__
 *
 * To run a mutation, you first call `useAddWellBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWellBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWellBatchMutation, { data, loading, error }] = useAddWellBatchMutation({
 *   variables: {
 *      wellId: // value for 'wellId'
 *   },
 * });
 */
export function useAddWellBatchMutation(baseOptions?: Apollo.MutationHookOptions<AddWellBatchMutation, AddWellBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWellBatchMutation, AddWellBatchMutationVariables>(AddWellBatchDocument, options);
      }
export type AddWellBatchMutationHookResult = ReturnType<typeof useAddWellBatchMutation>;
export type AddWellBatchMutationResult = Apollo.MutationResult<AddWellBatchMutation>;
export type AddWellBatchMutationOptions = Apollo.BaseMutationOptions<AddWellBatchMutation, AddWellBatchMutationVariables>;
export const DeleteWellBatchDocument = gql`
    mutation DeleteWellBatch($id: String!) {
  deleteWellBatch(id: $id) {
    wellBatch {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeleteWellBatchMutationFn = Apollo.MutationFunction<DeleteWellBatchMutation, DeleteWellBatchMutationVariables>;

/**
 * __useDeleteWellBatchMutation__
 *
 * To run a mutation, you first call `useDeleteWellBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWellBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWellBatchMutation, { data, loading, error }] = useDeleteWellBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWellBatchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWellBatchMutation, DeleteWellBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWellBatchMutation, DeleteWellBatchMutationVariables>(DeleteWellBatchDocument, options);
      }
export type DeleteWellBatchMutationHookResult = ReturnType<typeof useDeleteWellBatchMutation>;
export type DeleteWellBatchMutationResult = Apollo.MutationResult<DeleteWellBatchMutation>;
export type DeleteWellBatchMutationOptions = Apollo.BaseMutationOptions<DeleteWellBatchMutation, DeleteWellBatchMutationVariables>;
export const EditRiskDocument = gql`
    mutation EditRisk($id: String!, $aerialReview: Boolean, $environmentProximityTo: EnvironmentProximityToEnum, $geotechnicalSlopeAngleS1: Int, $geotechnicalFacingS1: GeotechnicalFacingEnum, $geotechnicalHeightS1: Int, $geotechnicalSlopeAngleS2: Int, $geotechnicalFacingS2: GeotechnicalFacingEnum, $geotechnicalHeightS2: Int, $dateSlopeChecked: DateTime, $repairTimeDays: Int, $releaseTimeDays: Int, $oilReleaseCost: Float, $gasReleaseCost: Float, $consequencePeople: Int, $probabilityGeo: Int, $safeguardInternalProtection: Int, $safeguardExternalCoating: Int) {
  editRisk(
    id: $id
    aerialReview: $aerialReview
    environmentProximityTo: $environmentProximityTo
    geotechnicalSlopeAngleS1: $geotechnicalSlopeAngleS1
    geotechnicalFacingS1: $geotechnicalFacingS1
    geotechnicalHeightS1: $geotechnicalHeightS1
    geotechnicalSlopeAngleS2: $geotechnicalSlopeAngleS2
    geotechnicalFacingS2: $geotechnicalFacingS2
    geotechnicalHeightS2: $geotechnicalHeightS2
    dateSlopeChecked: $dateSlopeChecked
    repairTimeDays: $repairTimeDays
    releaseTimeDays: $releaseTimeDays
    oilReleaseCost: $oilReleaseCost
    gasReleaseCost: $gasReleaseCost
    consequencePeople: $consequencePeople
    probabilityGeo: $probabilityGeo
    safeguardInternalProtection: $safeguardInternalProtection
    safeguardExternalCoating: $safeguardExternalCoating
  ) {
    risk {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditRiskMutationFn = Apollo.MutationFunction<EditRiskMutation, EditRiskMutationVariables>;

/**
 * __useEditRiskMutation__
 *
 * To run a mutation, you first call `useEditRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRiskMutation, { data, loading, error }] = useEditRiskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      aerialReview: // value for 'aerialReview'
 *      environmentProximityTo: // value for 'environmentProximityTo'
 *      geotechnicalSlopeAngleS1: // value for 'geotechnicalSlopeAngleS1'
 *      geotechnicalFacingS1: // value for 'geotechnicalFacingS1'
 *      geotechnicalHeightS1: // value for 'geotechnicalHeightS1'
 *      geotechnicalSlopeAngleS2: // value for 'geotechnicalSlopeAngleS2'
 *      geotechnicalFacingS2: // value for 'geotechnicalFacingS2'
 *      geotechnicalHeightS2: // value for 'geotechnicalHeightS2'
 *      dateSlopeChecked: // value for 'dateSlopeChecked'
 *      repairTimeDays: // value for 'repairTimeDays'
 *      releaseTimeDays: // value for 'releaseTimeDays'
 *      oilReleaseCost: // value for 'oilReleaseCost'
 *      gasReleaseCost: // value for 'gasReleaseCost'
 *      consequencePeople: // value for 'consequencePeople'
 *      probabilityGeo: // value for 'probabilityGeo'
 *      safeguardInternalProtection: // value for 'safeguardInternalProtection'
 *      safeguardExternalCoating: // value for 'safeguardExternalCoating'
 *   },
 * });
 */
export function useEditRiskMutation(baseOptions?: Apollo.MutationHookOptions<EditRiskMutation, EditRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditRiskMutation, EditRiskMutationVariables>(EditRiskDocument, options);
      }
export type EditRiskMutationHookResult = ReturnType<typeof useEditRiskMutation>;
export type EditRiskMutationResult = Apollo.MutationResult<EditRiskMutation>;
export type EditRiskMutationOptions = Apollo.BaseMutationOptions<EditRiskMutation, EditRiskMutationVariables>;
export const AddRiskDocument = gql`
    mutation AddRisk($id: String!) {
  addRisk(id: $id) {
    risk {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddRiskMutationFn = Apollo.MutationFunction<AddRiskMutation, AddRiskMutationVariables>;

/**
 * __useAddRiskMutation__
 *
 * To run a mutation, you first call `useAddRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRiskMutation, { data, loading, error }] = useAddRiskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddRiskMutation(baseOptions?: Apollo.MutationHookOptions<AddRiskMutation, AddRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRiskMutation, AddRiskMutationVariables>(AddRiskDocument, options);
      }
export type AddRiskMutationHookResult = ReturnType<typeof useAddRiskMutation>;
export type AddRiskMutationResult = Apollo.MutationResult<AddRiskMutation>;
export type AddRiskMutationOptions = Apollo.BaseMutationOptions<AddRiskMutation, AddRiskMutationVariables>;
export const DeleteRiskDocument = gql`
    mutation DeleteRisk($id: String!) {
  deleteRisk(id: $id) {
    risk {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeleteRiskMutationFn = Apollo.MutationFunction<DeleteRiskMutation, DeleteRiskMutationVariables>;

/**
 * __useDeleteRiskMutation__
 *
 * To run a mutation, you first call `useDeleteRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRiskMutation, { data, loading, error }] = useDeleteRiskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRiskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRiskMutation, DeleteRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRiskMutation, DeleteRiskMutationVariables>(DeleteRiskDocument, options);
      }
export type DeleteRiskMutationHookResult = ReturnType<typeof useDeleteRiskMutation>;
export type DeleteRiskMutationResult = Apollo.MutationResult<DeleteRiskMutation>;
export type DeleteRiskMutationOptions = Apollo.BaseMutationOptions<DeleteRiskMutation, DeleteRiskMutationVariables>;
export const AllocateRiskDocument = gql`
    mutation AllocateRisk {
  allocateRisk {
    success {
      field
      message
    }
    error {
      field
      message
    }
  }
}
    `;
export type AllocateRiskMutationFn = Apollo.MutationFunction<AllocateRiskMutation, AllocateRiskMutationVariables>;

/**
 * __useAllocateRiskMutation__
 *
 * To run a mutation, you first call `useAllocateRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocateRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocateRiskMutation, { data, loading, error }] = useAllocateRiskMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllocateRiskMutation(baseOptions?: Apollo.MutationHookOptions<AllocateRiskMutation, AllocateRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllocateRiskMutation, AllocateRiskMutationVariables>(AllocateRiskDocument, options);
      }
export type AllocateRiskMutationHookResult = ReturnType<typeof useAllocateRiskMutation>;
export type AllocateRiskMutationResult = Apollo.MutationResult<AllocateRiskMutation>;
export type AllocateRiskMutationOptions = Apollo.BaseMutationOptions<AllocateRiskMutation, AllocateRiskMutationVariables>;
export const EditChemicalDocument = gql`
    mutation EditChemical($id: String!, $chemicalSupplierId: String, $baselineFluidAnalysisDate: DateTime, $scaling: Boolean, $bacteria: Boolean, $co2: Boolean, $o2: Boolean, $h2s: Boolean, $continuousInjection: Boolean, $injectionRate: Float, $downholeBatch: Boolean, $inhibitorPipelineBatch: Boolean, $bacteriaTreatment: Boolean, $scaleTreatment: Boolean, $batchFrequency: Int, $comment: String) {
  editChemical(
    id: $id
    chemicalSupplierId: $chemicalSupplierId
    baselineFluidAnalysisDate: $baselineFluidAnalysisDate
    scaling: $scaling
    bacteria: $bacteria
    co2: $co2
    o2: $o2
    h2s: $h2s
    continuousInjection: $continuousInjection
    injectionRate: $injectionRate
    downholeBatch: $downholeBatch
    inhibitorPipelineBatch: $inhibitorPipelineBatch
    bacteriaTreatment: $bacteriaTreatment
    scaleTreatment: $scaleTreatment
    batchFrequency: $batchFrequency
    comment: $comment
  ) {
    chemical {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditChemicalMutationFn = Apollo.MutationFunction<EditChemicalMutation, EditChemicalMutationVariables>;

/**
 * __useEditChemicalMutation__
 *
 * To run a mutation, you first call `useEditChemicalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditChemicalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editChemicalMutation, { data, loading, error }] = useEditChemicalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      chemicalSupplierId: // value for 'chemicalSupplierId'
 *      baselineFluidAnalysisDate: // value for 'baselineFluidAnalysisDate'
 *      scaling: // value for 'scaling'
 *      bacteria: // value for 'bacteria'
 *      co2: // value for 'co2'
 *      o2: // value for 'o2'
 *      h2s: // value for 'h2s'
 *      continuousInjection: // value for 'continuousInjection'
 *      injectionRate: // value for 'injectionRate'
 *      downholeBatch: // value for 'downholeBatch'
 *      inhibitorPipelineBatch: // value for 'inhibitorPipelineBatch'
 *      bacteriaTreatment: // value for 'bacteriaTreatment'
 *      scaleTreatment: // value for 'scaleTreatment'
 *      batchFrequency: // value for 'batchFrequency'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useEditChemicalMutation(baseOptions?: Apollo.MutationHookOptions<EditChemicalMutation, EditChemicalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditChemicalMutation, EditChemicalMutationVariables>(EditChemicalDocument, options);
      }
export type EditChemicalMutationHookResult = ReturnType<typeof useEditChemicalMutation>;
export type EditChemicalMutationResult = Apollo.MutationResult<EditChemicalMutation>;
export type EditChemicalMutationOptions = Apollo.BaseMutationOptions<EditChemicalMutation, EditChemicalMutationVariables>;
export const AddChemicalDocument = gql`
    mutation AddChemical($id: String!) {
  addChemical(id: $id) {
    chemical {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddChemicalMutationFn = Apollo.MutationFunction<AddChemicalMutation, AddChemicalMutationVariables>;

/**
 * __useAddChemicalMutation__
 *
 * To run a mutation, you first call `useAddChemicalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChemicalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChemicalMutation, { data, loading, error }] = useAddChemicalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddChemicalMutation(baseOptions?: Apollo.MutationHookOptions<AddChemicalMutation, AddChemicalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddChemicalMutation, AddChemicalMutationVariables>(AddChemicalDocument, options);
      }
export type AddChemicalMutationHookResult = ReturnType<typeof useAddChemicalMutation>;
export type AddChemicalMutationResult = Apollo.MutationResult<AddChemicalMutation>;
export type AddChemicalMutationOptions = Apollo.BaseMutationOptions<AddChemicalMutation, AddChemicalMutationVariables>;
export const DeleteChemicalDocument = gql`
    mutation DeleteChemical($id: String!) {
  deleteChemical(id: $id) {
    chemical {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeleteChemicalMutationFn = Apollo.MutationFunction<DeleteChemicalMutation, DeleteChemicalMutationVariables>;

/**
 * __useDeleteChemicalMutation__
 *
 * To run a mutation, you first call `useDeleteChemicalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChemicalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChemicalMutation, { data, loading, error }] = useDeleteChemicalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteChemicalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChemicalMutation, DeleteChemicalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChemicalMutation, DeleteChemicalMutationVariables>(DeleteChemicalDocument, options);
      }
export type DeleteChemicalMutationHookResult = ReturnType<typeof useDeleteChemicalMutation>;
export type DeleteChemicalMutationResult = Apollo.MutationResult<DeleteChemicalMutation>;
export type DeleteChemicalMutationOptions = Apollo.BaseMutationOptions<DeleteChemicalMutation, DeleteChemicalMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserCountDocument = gql`
    query UserCount {
  userCount
}
    `;

/**
 * __useUserCountQuery__
 *
 * To run a query within a React component, call `useUserCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCountQuery(baseOptions?: Apollo.QueryHookOptions<UserCountQuery, UserCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCountQuery, UserCountQueryVariables>(UserCountDocument, options);
      }
export function useUserCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCountQuery, UserCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCountQuery, UserCountQueryVariables>(UserCountDocument, options);
        }
export type UserCountQueryHookResult = ReturnType<typeof useUserCountQuery>;
export type UserCountLazyQueryHookResult = ReturnType<typeof useUserCountLazyQuery>;
export type UserCountQueryResult = Apollo.QueryResult<UserCountQuery, UserCountQueryVariables>;
export const PipelinesByIdDocument = gql`
    query PipelinesById($navigationInput: NavigationInput!, $skip: Int!, $take: Int!) {
  pipelinesById(navigationInput: $navigationInput, skip: $skip, take: $take) {
    pipelines {
      id
      license
      segment
      flowCalculationDirection
      from
      fromFeature
      to
      toFeature
      currentStatus
      currentSubstance
      firstLicenseDate
      length
      type
      grade
      yieldStrength
      outsideDiameter
      wallThickness
      material
      mop
      internalProtection
      piggable
      piggingFrequency
      createdBy {
        id
        email
      }
      createdAt
      updatedBy {
        id
        email
      }
      updatedAt
      authorized
    }
    count
  }
}
    `;

/**
 * __usePipelinesByIdQuery__
 *
 * To run a query within a React component, call `usePipelinesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelinesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelinesByIdQuery({
 *   variables: {
 *      navigationInput: // value for 'navigationInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePipelinesByIdQuery(baseOptions: Apollo.QueryHookOptions<PipelinesByIdQuery, PipelinesByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelinesByIdQuery, PipelinesByIdQueryVariables>(PipelinesByIdDocument, options);
      }
export function usePipelinesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelinesByIdQuery, PipelinesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelinesByIdQuery, PipelinesByIdQueryVariables>(PipelinesByIdDocument, options);
        }
export type PipelinesByIdQueryHookResult = ReturnType<typeof usePipelinesByIdQuery>;
export type PipelinesByIdLazyQueryHookResult = ReturnType<typeof usePipelinesByIdLazyQuery>;
export type PipelinesByIdQueryResult = Apollo.QueryResult<PipelinesByIdQuery, PipelinesByIdQueryVariables>;
export const PigRunsByPipelineIdDocument = gql`
    query PigRunsByPipelineId($pipelineId: String!) {
  pigRunsByPipelineId(pipelineId: $pipelineId) {
    id
    pigType
    dateIn
    dateOut
    isolationValveFunctionTest
    pigSenderReceiverInspection
    comment
    operatorId
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __usePigRunsByPipelineIdQuery__
 *
 * To run a query within a React component, call `usePigRunsByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigRunsByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigRunsByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function usePigRunsByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<PigRunsByPipelineIdQuery, PigRunsByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PigRunsByPipelineIdQuery, PigRunsByPipelineIdQueryVariables>(PigRunsByPipelineIdDocument, options);
      }
export function usePigRunsByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PigRunsByPipelineIdQuery, PigRunsByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PigRunsByPipelineIdQuery, PigRunsByPipelineIdQueryVariables>(PigRunsByPipelineIdDocument, options);
        }
export type PigRunsByPipelineIdQueryHookResult = ReturnType<typeof usePigRunsByPipelineIdQuery>;
export type PigRunsByPipelineIdLazyQueryHookResult = ReturnType<typeof usePigRunsByPipelineIdLazyQuery>;
export type PigRunsByPipelineIdQueryResult = Apollo.QueryResult<PigRunsByPipelineIdQuery, PigRunsByPipelineIdQueryVariables>;
export const SearchNavigationOptionsDocument = gql`
    query SearchNavigationOptions {
  searchNavigationOptions {
    table
    field
    nullable
    type
    enumObjectArray {
      serverEnum
      databaseEnum
    }
  }
}
    `;

/**
 * __useSearchNavigationOptionsQuery__
 *
 * To run a query within a React component, call `useSearchNavigationOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchNavigationOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchNavigationOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchNavigationOptionsQuery(baseOptions?: Apollo.QueryHookOptions<SearchNavigationOptionsQuery, SearchNavigationOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchNavigationOptionsQuery, SearchNavigationOptionsQueryVariables>(SearchNavigationOptionsDocument, options);
      }
export function useSearchNavigationOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchNavigationOptionsQuery, SearchNavigationOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchNavigationOptionsQuery, SearchNavigationOptionsQueryVariables>(SearchNavigationOptionsDocument, options);
        }
export type SearchNavigationOptionsQueryHookResult = ReturnType<typeof useSearchNavigationOptionsQuery>;
export type SearchNavigationOptionsLazyQueryHookResult = ReturnType<typeof useSearchNavigationOptionsLazyQuery>;
export type SearchNavigationOptionsQueryResult = Apollo.QueryResult<SearchNavigationOptionsQuery, SearchNavigationOptionsQueryVariables>;
export const OperationAndHavingEnumDocument = gql`
    query OperationAndHavingEnum {
  validators {
    operationEnum {
      equals
      not
      gt
      gte
      lt
      lte
      contains
      startsWith
      endsWith
    }
    havingEnum {
      _min
      _max
      _count
      _any
    }
  }
}
    `;

/**
 * __useOperationAndHavingEnumQuery__
 *
 * To run a query within a React component, call `useOperationAndHavingEnumQuery` and pass it any options that fit your needs.
 * When your component renders, `useOperationAndHavingEnumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOperationAndHavingEnumQuery({
 *   variables: {
 *   },
 * });
 */
export function useOperationAndHavingEnumQuery(baseOptions?: Apollo.QueryHookOptions<OperationAndHavingEnumQuery, OperationAndHavingEnumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OperationAndHavingEnumQuery, OperationAndHavingEnumQueryVariables>(OperationAndHavingEnumDocument, options);
      }
export function useOperationAndHavingEnumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperationAndHavingEnumQuery, OperationAndHavingEnumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OperationAndHavingEnumQuery, OperationAndHavingEnumQueryVariables>(OperationAndHavingEnumDocument, options);
        }
export type OperationAndHavingEnumQueryHookResult = ReturnType<typeof useOperationAndHavingEnumQuery>;
export type OperationAndHavingEnumLazyQueryHookResult = ReturnType<typeof useOperationAndHavingEnumLazyQuery>;
export type OperationAndHavingEnumQueryResult = Apollo.QueryResult<OperationAndHavingEnumQuery, OperationAndHavingEnumQueryVariables>;
export const PipelineBatchesByPipelineIdDocument = gql`
    query PipelineBatchesByPipelineId($pipelineId: String!) {
  pipelineBatchesByPipelineId(pipelineId: $pipelineId) {
    id
    date
    product {
      id
      product
      cost
      solubility
    }
    cost
    chemicalVolume
    diluentVolume
    comment
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __usePipelineBatchesByPipelineIdQuery__
 *
 * To run a query within a React component, call `usePipelineBatchesByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelineBatchesByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelineBatchesByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function usePipelineBatchesByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<PipelineBatchesByPipelineIdQuery, PipelineBatchesByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelineBatchesByPipelineIdQuery, PipelineBatchesByPipelineIdQueryVariables>(PipelineBatchesByPipelineIdDocument, options);
      }
export function usePipelineBatchesByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelineBatchesByPipelineIdQuery, PipelineBatchesByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelineBatchesByPipelineIdQuery, PipelineBatchesByPipelineIdQueryVariables>(PipelineBatchesByPipelineIdDocument, options);
        }
export type PipelineBatchesByPipelineIdQueryHookResult = ReturnType<typeof usePipelineBatchesByPipelineIdQuery>;
export type PipelineBatchesByPipelineIdLazyQueryHookResult = ReturnType<typeof usePipelineBatchesByPipelineIdLazyQuery>;
export type PipelineBatchesByPipelineIdQueryResult = Apollo.QueryResult<PipelineBatchesByPipelineIdQuery, PipelineBatchesByPipelineIdQueryVariables>;
export const WellBatchesByWellIdDocument = gql`
    query WellBatchesByWellId($wellId: String!) {
  wellBatchesByWellId(wellId: $wellId) {
    id
    date
    product {
      id
      product
      cost
      solubility
    }
    cost
    chemicalVolume
    diluentVolume
    comment
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __useWellBatchesByWellIdQuery__
 *
 * To run a query within a React component, call `useWellBatchesByWellIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWellBatchesByWellIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellBatchesByWellIdQuery({
 *   variables: {
 *      wellId: // value for 'wellId'
 *   },
 * });
 */
export function useWellBatchesByWellIdQuery(baseOptions: Apollo.QueryHookOptions<WellBatchesByWellIdQuery, WellBatchesByWellIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WellBatchesByWellIdQuery, WellBatchesByWellIdQueryVariables>(WellBatchesByWellIdDocument, options);
      }
export function useWellBatchesByWellIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WellBatchesByWellIdQuery, WellBatchesByWellIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WellBatchesByWellIdQuery, WellBatchesByWellIdQueryVariables>(WellBatchesByWellIdDocument, options);
        }
export type WellBatchesByWellIdQueryHookResult = ReturnType<typeof useWellBatchesByWellIdQuery>;
export type WellBatchesByWellIdLazyQueryHookResult = ReturnType<typeof useWellBatchesByWellIdLazyQuery>;
export type WellBatchesByWellIdQueryResult = Apollo.QueryResult<WellBatchesByWellIdQuery, WellBatchesByWellIdQueryVariables>;
export const ValidatorsPipelineDocument = gql`
    query ValidatorsPipeline {
  validatorsPipeline {
    licenseMatchPattern
    segmentMatchPattern
    fromToMatchPattern
    fromToFeatureEnum {
      serverEnum
      databaseEnum
    }
    statusEnum {
      serverEnum
      databaseEnum
    }
    substanceEnum {
      serverEnum
      databaseEnum
    }
    lengthMatchPattern
    typeEnum {
      serverEnum
      databaseEnum
    }
    gradeEnum {
      serverEnum
      databaseEnum
    }
    yieldStrengthMatchPattern
    outsideDiameterMatchPattern
    wallThicknessMatchPattern
    materialEnum {
      serverEnum
      databaseEnum
    }
    mopMatchPattern
    internalProtectionEnum {
      serverEnum
      databaseEnum
    }
    flowCalculationDirectionEnum {
      serverEnum
      databaseEnum
    }
    limitingSpecEnum {
      serverEnum
      databaseEnum
    }
    environmentProximityToEnum {
      serverEnum
      databaseEnum
    }
    geotechnicalFacingEnum {
      serverEnum
      databaseEnum
    }
    solubilityEnum {
      serverEnum
      databaseEnum
    }
    batchProductEnum {
      serverEnum
      databaseEnum
    }
    pigTypeEnum {
      serverEnum
      databaseEnum
    }
    pigInspectionEnum {
      serverEnum
      databaseEnum
    }
    operatorEnum {
      serverEnum
      databaseEnum
    }
    chemicalSupplierEnum {
      serverEnum
      databaseEnum
    }
  }
}
    `;

/**
 * __useValidatorsPipelineQuery__
 *
 * To run a query within a React component, call `useValidatorsPipelineQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsPipelineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsPipelineQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsPipelineQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsPipelineQuery, ValidatorsPipelineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsPipelineQuery, ValidatorsPipelineQueryVariables>(ValidatorsPipelineDocument, options);
      }
export function useValidatorsPipelineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsPipelineQuery, ValidatorsPipelineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsPipelineQuery, ValidatorsPipelineQueryVariables>(ValidatorsPipelineDocument, options);
        }
export type ValidatorsPipelineQueryHookResult = ReturnType<typeof useValidatorsPipelineQuery>;
export type ValidatorsPipelineLazyQueryHookResult = ReturnType<typeof useValidatorsPipelineLazyQuery>;
export type ValidatorsPipelineQueryResult = Apollo.QueryResult<ValidatorsPipelineQuery, ValidatorsPipelineQueryVariables>;
export const GetValidatorsDocument = gql`
    query getValidators {
  validators {
    licenseMatchPattern
    segmentMatchPattern
    substanceEnum {
      NaturalGas
      FreshWater
      SaltWater
      CrudeOil
      OilWellEffluent
      LVPProducts
      FuelGas
      SourNaturalGas
    }
    fromToMatchPattern
    fromToFeatureEnum {
      BlindEnd
      Battery
      Pipeline
      Satellite
      StorageTank
      InjectionPlant
      Well
      CompressorStation
      MeterStation
      PumpStation
      GasProcessingPlant
      UndergroundCapOrTieIn
      Header
    }
    statusEnum {
      Operating
      Discontinued
      Abandoned
      Removed
      ToBeConstructed
      Active
      Cancelled
      New
      NotConstructed
    }
    lengthMatchPattern
    typeEnum {
      Type515
      Type2306
      Type3406
      Type3408
      Type6063
      Type6351
      Type5A
      Type5L
      Type5LX
      TypeA106
      TypeA120
      TypeA53
      TypeAMERON
      TypeB515
      TypeB51S
      TypeB5IS
      TypeCENTRON
      TypeCIBA
      TypeFSLP
      TypeREDTHR
      TypeSMITH
      TypeSTAR
      TypeTBS
      TypeWSLP
      TypeZ2451
      TypeZ2453
    }
    gradeEnum {
      GradeA
      Grade3592
      GradeB
      GradeX42
      GradeBW1
      Grade2500
      Grade3591
      Grade2901
      GradeT4
      Grade300
      Grade3593
      Grade11
      GradeJ55
      Grade2250
      GradeX52
      Grade2750
      Grade2902
      Grade25
      Grade241
      Grade2413
      Grade2411
      Grade155
      Grade150
      Grade1000
      Grade800
      GradeT1A
      Grade2010
      GradeT4A
      Grade1250
      Grade17
      Grade900
      GradeT1B
      Grade810
      Grade35
      Grade5
      Grade9
      Grade200
      Grade1200
      Grade1103
    }
    yieldStrengthMatchPattern
    outsideDiameterMatchPattern
    wallThicknessMatchPattern
    materialEnum {
      Steel
      PolyvinylChloride
      Composite
      Fiberglass
      Aluminum
      Polyethylene
      CelluloseAcetateButyrate
      Unknown
      AsbestosCement
    }
    mopMatchPattern
    internalProtectionEnum {
      Uncoated
      FreeStandingSlipLined
      Unknown
      Cement
      ExpandedPolyethylene
      ThinFilm
    }
    pigTypeEnum {
      Scrapper
      PigType4inArgus
      PigType6inargus
      PigType6inArgus
      ScraperP400
      PigType3inPurpleScraper
      ScraperP304
      PigType3inscapper
      PigType3inscrapper
      PigType3inscraper
      Foam
      Shutin
      RedStubby
      Redscraper
      PigType3inGSCR
      PigType2inGSCR
      NoSender
      PigType2ingscr
      PigType2inGSCR_GFP
      PigType4inGSCR
      PigType2inPSCR_FLM
      PigType3inPSCR
      Highline
      PigType2inPSCR
      PigType3_scrapper
      ScraperP401
      ScraperP300
      ScraperP301
      ScraperP309
      ScraperP314
      ScaperP314
      ScaperPP309
      ScraperP204
      ScraperP208
      PigType3inArgus
      PigType2inpurple
      Ball
      Black3inBall
      PigType3inWhite
      PigType3
      SIMAY2018
      ScraperP206
      ScraperP200
      PigType3inRscr
      PigType3inPurpleStubby
      PigType3inSCRAPER
      Red3inscraper
      PigType3inGreenDisc
      PigType4inGreenDisc
      PigType4green2disc
      PigType4gree2disc
      PigType3ingreendisc
      PigType3inpurpledisc
      PigType2inPurpleDisc
      disc
      PigType2purple2disc
      PigType3inpurple2disc
      PigType2green2disc
      bullet
      PigType8inFoam
      PigType3inscr
      ScraperP305
      ScraperP312
      ScraperP303
      ScraperP311
      ScrapperP307
      PigType4inpurplescraper
      Torpedo
      PigType4in
      PigType3inStubby
      Stubby
      PigType3in
      redball
      PigType2inStubby
      PigType1inStubby
      PigType3inBrownRibbed
      PigType3inGreenRibbed
      PigType3inBlueRibbed
      BlueRibbed
      M_D_Foamy
      PigType6inGreenRibbed
      BlueinScraper
      Red4inscraper
      Blue3inscraper
      PigType4inBlueDisc
      PigType8inBlackDisc
      PigType4inGreendisc
      PigType6inGreenDisc
      PigType6inscrapper
      PigType4inscrapper
      PigType4inFoam
      PigType3inredscrape
      GSCR
      PigType4GreenStubby
      PigType4_GreenRibbed
      PigType4Green
      PigType3inpurplescraper
      PigType6ingreenscraper
      Purple3inDisc
    }
    flowCalculationDirectionEnum {
      Upstream
      Downstream
    }
    pigInspectionEnum {
      Failed
      Good
    }
    limitingSpecEnum {
      ANSI150
      ANSI300
      ANSI600
    }
    environmentProximityToEnum {
      WB1
      WB3
      WB4
      WB5
      WC1
      WC2
      WC3
      WC4
    }
    geotechnicalFacingEnum {
      N
      NE
      E
      SE
      S
      SW
      W
      NW
    }
    solubilityEnum {
      Oil
      Water
    }
  }
}
    `;

/**
 * __useGetValidatorsQuery__
 *
 * To run a query within a React component, call `useGetValidatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidatorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetValidatorsQuery(baseOptions?: Apollo.QueryHookOptions<GetValidatorsQuery, GetValidatorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetValidatorsQuery, GetValidatorsQueryVariables>(GetValidatorsDocument, options);
      }
export function useGetValidatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetValidatorsQuery, GetValidatorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetValidatorsQuery, GetValidatorsQueryVariables>(GetValidatorsDocument, options);
        }
export type GetValidatorsQueryHookResult = ReturnType<typeof useGetValidatorsQuery>;
export type GetValidatorsLazyQueryHookResult = ReturnType<typeof useGetValidatorsLazyQuery>;
export type GetValidatorsQueryResult = Apollo.QueryResult<GetValidatorsQuery, GetValidatorsQueryVariables>;
export const ValidatorFlowCalculationDirectionDocument = gql`
    query ValidatorFlowCalculationDirection {
  validators {
    flowCalculationDirectionEnum {
      Upstream
      Downstream
    }
  }
}
    `;

/**
 * __useValidatorFlowCalculationDirectionQuery__
 *
 * To run a query within a React component, call `useValidatorFlowCalculationDirectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorFlowCalculationDirectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorFlowCalculationDirectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorFlowCalculationDirectionQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorFlowCalculationDirectionQuery, ValidatorFlowCalculationDirectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorFlowCalculationDirectionQuery, ValidatorFlowCalculationDirectionQueryVariables>(ValidatorFlowCalculationDirectionDocument, options);
      }
export function useValidatorFlowCalculationDirectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorFlowCalculationDirectionQuery, ValidatorFlowCalculationDirectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorFlowCalculationDirectionQuery, ValidatorFlowCalculationDirectionQueryVariables>(ValidatorFlowCalculationDirectionDocument, options);
        }
export type ValidatorFlowCalculationDirectionQueryHookResult = ReturnType<typeof useValidatorFlowCalculationDirectionQuery>;
export type ValidatorFlowCalculationDirectionLazyQueryHookResult = ReturnType<typeof useValidatorFlowCalculationDirectionLazyQuery>;
export type ValidatorFlowCalculationDirectionQueryResult = Apollo.QueryResult<ValidatorFlowCalculationDirectionQuery, ValidatorFlowCalculationDirectionQueryVariables>;
export const ValidatorsLicenseChangeDocument = gql`
    query ValidatorsLicenseChange {
  validators {
    statusEnum {
      Operating
      Discontinued
      Abandoned
      Removed
      ToBeConstructed
      Active
      Cancelled
      New
      NotConstructed
    }
    substanceEnum {
      NaturalGas
      FreshWater
      SaltWater
      CrudeOil
      OilWellEffluent
      LVPProducts
      FuelGas
      SourNaturalGas
    }
  }
}
    `;

/**
 * __useValidatorsLicenseChangeQuery__
 *
 * To run a query within a React component, call `useValidatorsLicenseChangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsLicenseChangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsLicenseChangeQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsLicenseChangeQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsLicenseChangeQuery, ValidatorsLicenseChangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsLicenseChangeQuery, ValidatorsLicenseChangeQueryVariables>(ValidatorsLicenseChangeDocument, options);
      }
export function useValidatorsLicenseChangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsLicenseChangeQuery, ValidatorsLicenseChangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsLicenseChangeQuery, ValidatorsLicenseChangeQueryVariables>(ValidatorsLicenseChangeDocument, options);
        }
export type ValidatorsLicenseChangeQueryHookResult = ReturnType<typeof useValidatorsLicenseChangeQuery>;
export type ValidatorsLicenseChangeLazyQueryHookResult = ReturnType<typeof useValidatorsLicenseChangeLazyQuery>;
export type ValidatorsLicenseChangeQueryResult = Apollo.QueryResult<ValidatorsLicenseChangeQuery, ValidatorsLicenseChangeQueryVariables>;
export const ValidatorsMechanicalPropertiesDocument = gql`
    query ValidatorsMechanicalProperties {
  validators {
    typeEnum {
      Type515
      Type2306
      Type3406
      Type3408
      Type6063
      Type6351
      Type5A
      Type5L
      Type5LX
      TypeA106
      TypeA120
      TypeA53
      TypeAMERON
      TypeB515
      TypeB51S
      TypeB5IS
      TypeCENTRON
      TypeCIBA
      TypeFSLP
      TypeREDTHR
      TypeSMITH
      TypeSTAR
      TypeTBS
      TypeWSLP
      TypeZ2451
      TypeZ2453
    }
    gradeEnum {
      GradeA
      Grade3592
      GradeB
      GradeX42
      GradeBW1
      Grade2500
      Grade3591
      Grade2901
      GradeT4
      Grade300
      Grade3593
      Grade11
      GradeJ55
      Grade2250
      GradeX52
      Grade2750
      Grade25
      Grade2902
      Grade241
      Grade2413
      Grade2411
      Grade155
      Grade150
      Grade1000
      Grade800
      GradeT1A
      Grade2010
      GradeT4A
      Grade1250
      Grade17
      Grade900
      GradeT1B
      Grade810
      Grade35
      Grade5
      Grade9
      Grade200
      Grade1200
      Grade1103
    }
    yieldStrengthMatchPattern
    lengthMatchPattern
    outsideDiameterMatchPattern
    wallThicknessMatchPattern
    materialEnum {
      Steel
      PolyvinylChloride
      Composite
      Fiberglass
      Aluminum
      Polyethylene
      CelluloseAcetateButyrate
      Unknown
      AsbestosCement
    }
    mopMatchPattern
    internalProtectionEnum {
      Uncoated
      FreeStandingSlipLined
      Unknown
      Cement
      ExpandedPolyethylene
      ThinFilm
    }
  }
}
    `;

/**
 * __useValidatorsMechanicalPropertiesQuery__
 *
 * To run a query within a React component, call `useValidatorsMechanicalPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsMechanicalPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsMechanicalPropertiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsMechanicalPropertiesQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsMechanicalPropertiesQuery, ValidatorsMechanicalPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsMechanicalPropertiesQuery, ValidatorsMechanicalPropertiesQueryVariables>(ValidatorsMechanicalPropertiesDocument, options);
      }
export function useValidatorsMechanicalPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsMechanicalPropertiesQuery, ValidatorsMechanicalPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsMechanicalPropertiesQuery, ValidatorsMechanicalPropertiesQueryVariables>(ValidatorsMechanicalPropertiesDocument, options);
        }
export type ValidatorsMechanicalPropertiesQueryHookResult = ReturnType<typeof useValidatorsMechanicalPropertiesQuery>;
export type ValidatorsMechanicalPropertiesLazyQueryHookResult = ReturnType<typeof useValidatorsMechanicalPropertiesLazyQuery>;
export type ValidatorsMechanicalPropertiesQueryResult = Apollo.QueryResult<ValidatorsMechanicalPropertiesQuery, ValidatorsMechanicalPropertiesQueryVariables>;
export const ValidatorsPressureTestDocument = gql`
    query ValidatorsPressureTest {
  validators {
    limitingSpecEnum {
      ANSI150
      ANSI300
      ANSI600
    }
  }
}
    `;

/**
 * __useValidatorsPressureTestQuery__
 *
 * To run a query within a React component, call `useValidatorsPressureTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsPressureTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsPressureTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsPressureTestQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsPressureTestQuery, ValidatorsPressureTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsPressureTestQuery, ValidatorsPressureTestQueryVariables>(ValidatorsPressureTestDocument, options);
      }
export function useValidatorsPressureTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsPressureTestQuery, ValidatorsPressureTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsPressureTestQuery, ValidatorsPressureTestQueryVariables>(ValidatorsPressureTestDocument, options);
        }
export type ValidatorsPressureTestQueryHookResult = ReturnType<typeof useValidatorsPressureTestQuery>;
export type ValidatorsPressureTestLazyQueryHookResult = ReturnType<typeof useValidatorsPressureTestLazyQuery>;
export type ValidatorsPressureTestQueryResult = Apollo.QueryResult<ValidatorsPressureTestQuery, ValidatorsPressureTestQueryVariables>;
export const ValidatorsRiskDocument = gql`
    query ValidatorsRisk {
  validators {
    environmentProximityToEnum {
      WB1
      WB3
      WB4
      WB5
      WC1
      WC2
      WC3
      WC4
    }
    geotechnicalFacingEnum {
      N
      NE
      E
      SE
      S
      SW
      W
      NW
    }
    typeEnum {
      Type515
      Type2306
      Type3406
      Type3408
      Type6063
      Type6351
      Type5A
      Type5L
      Type5LX
      TypeA106
      TypeA120
      TypeA53
      TypeAMERON
      TypeB515
      TypeB51S
      TypeB5IS
      TypeCENTRON
      TypeCIBA
      TypeFSLP
      TypeREDTHR
      TypeSMITH
      TypeSTAR
      TypeTBS
      TypeWSLP
      TypeZ2451
      TypeZ2453
    }
    materialEnum {
      Steel
      PolyvinylChloride
      Composite
      Fiberglass
      Aluminum
      Polyethylene
      CelluloseAcetateButyrate
      Unknown
      AsbestosCement
    }
  }
}
    `;

/**
 * __useValidatorsRiskQuery__
 *
 * To run a query within a React component, call `useValidatorsRiskQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsRiskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsRiskQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsRiskQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsRiskQuery, ValidatorsRiskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsRiskQuery, ValidatorsRiskQueryVariables>(ValidatorsRiskDocument, options);
      }
export function useValidatorsRiskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsRiskQuery, ValidatorsRiskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsRiskQuery, ValidatorsRiskQueryVariables>(ValidatorsRiskDocument, options);
        }
export type ValidatorsRiskQueryHookResult = ReturnType<typeof useValidatorsRiskQuery>;
export type ValidatorsRiskLazyQueryHookResult = ReturnType<typeof useValidatorsRiskLazyQuery>;
export type ValidatorsRiskQueryResult = Apollo.QueryResult<ValidatorsRiskQuery, ValidatorsRiskQueryVariables>;
export const ValidatorUserRoleDocument = gql`
    query ValidatorUserRole {
  validators {
    userRoleEnum {
      ADMIN
      ENGINEER
      OFFICE
      OPERATOR
      CHEMICAL
      CATHODIC
      CONTRACTOR
    }
  }
}
    `;

/**
 * __useValidatorUserRoleQuery__
 *
 * To run a query within a React component, call `useValidatorUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorUserRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorUserRoleQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorUserRoleQuery, ValidatorUserRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorUserRoleQuery, ValidatorUserRoleQueryVariables>(ValidatorUserRoleDocument, options);
      }
export function useValidatorUserRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorUserRoleQuery, ValidatorUserRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorUserRoleQuery, ValidatorUserRoleQueryVariables>(ValidatorUserRoleDocument, options);
        }
export type ValidatorUserRoleQueryHookResult = ReturnType<typeof useValidatorUserRoleQuery>;
export type ValidatorUserRoleLazyQueryHookResult = ReturnType<typeof useValidatorUserRoleLazyQuery>;
export type ValidatorUserRoleQueryResult = Apollo.QueryResult<ValidatorUserRoleQuery, ValidatorUserRoleQueryVariables>;
export const LicenseChangesByPipelineIdDocument = gql`
    query LicenseChangesByPipelineId($pipelineId: String!) {
  licenseChangesByPipelineId(pipelineId: $pipelineId) {
    id
    status
    substance
    date
    comment
    linkToDocumentation
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __useLicenseChangesByPipelineIdQuery__
 *
 * To run a query within a React component, call `useLicenseChangesByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLicenseChangesByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLicenseChangesByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useLicenseChangesByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<LicenseChangesByPipelineIdQuery, LicenseChangesByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LicenseChangesByPipelineIdQuery, LicenseChangesByPipelineIdQueryVariables>(LicenseChangesByPipelineIdDocument, options);
      }
export function useLicenseChangesByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LicenseChangesByPipelineIdQuery, LicenseChangesByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LicenseChangesByPipelineIdQuery, LicenseChangesByPipelineIdQueryVariables>(LicenseChangesByPipelineIdDocument, options);
        }
export type LicenseChangesByPipelineIdQueryHookResult = ReturnType<typeof useLicenseChangesByPipelineIdQuery>;
export type LicenseChangesByPipelineIdLazyQueryHookResult = ReturnType<typeof useLicenseChangesByPipelineIdLazyQuery>;
export type LicenseChangesByPipelineIdQueryResult = Apollo.QueryResult<LicenseChangesByPipelineIdQuery, LicenseChangesByPipelineIdQueryVariables>;
export const PressureTestsByPipelineIdDocument = gql`
    query PressureTestsByPipelineId($pipelineId: String!) {
  pressureTestsByPipelineId(pipelineId: $pipelineId) {
    id
    requiredWTForMop
    mopTestPressure
    limitingSpec
    maxPressureOfLimitingSpec
    pressureTestPressure
    requiredWTForTestPressure
    pressureTestCorrosionAllowance
    waterForPigging
    infoSentOutDate
    ddsDate
    pressureTestDate
    pressureTestReceivedDate
    integritySheetUpdated
    comment
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __usePressureTestsByPipelineIdQuery__
 *
 * To run a query within a React component, call `usePressureTestsByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePressureTestsByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePressureTestsByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function usePressureTestsByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<PressureTestsByPipelineIdQuery, PressureTestsByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PressureTestsByPipelineIdQuery, PressureTestsByPipelineIdQueryVariables>(PressureTestsByPipelineIdDocument, options);
      }
export function usePressureTestsByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PressureTestsByPipelineIdQuery, PressureTestsByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PressureTestsByPipelineIdQuery, PressureTestsByPipelineIdQueryVariables>(PressureTestsByPipelineIdDocument, options);
        }
export type PressureTestsByPipelineIdQueryHookResult = ReturnType<typeof usePressureTestsByPipelineIdQuery>;
export type PressureTestsByPipelineIdLazyQueryHookResult = ReturnType<typeof usePressureTestsByPipelineIdLazyQuery>;
export type PressureTestsByPipelineIdQueryResult = Apollo.QueryResult<PressureTestsByPipelineIdQuery, PressureTestsByPipelineIdQueryVariables>;
export const WellsByPipelineIdDocument = gql`
    query WellsByPipelineId($pipelineId: String!) {
  wellsByPipelineId(pipelineId: $pipelineId) {
    id
    name
    oil
    water
    gas
    gasAssociatedLiquids
    totalFluids
    firstProduction
    lastProduction
    firstInjection
    lastInjection
    fdcRecId
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __useWellsByPipelineIdQuery__
 *
 * To run a query within a React component, call `useWellsByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWellsByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellsByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useWellsByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<WellsByPipelineIdQuery, WellsByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WellsByPipelineIdQuery, WellsByPipelineIdQueryVariables>(WellsByPipelineIdDocument, options);
      }
export function useWellsByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WellsByPipelineIdQuery, WellsByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WellsByPipelineIdQuery, WellsByPipelineIdQueryVariables>(WellsByPipelineIdDocument, options);
        }
export type WellsByPipelineIdQueryHookResult = ReturnType<typeof useWellsByPipelineIdQuery>;
export type WellsByPipelineIdLazyQueryHookResult = ReturnType<typeof useWellsByPipelineIdLazyQuery>;
export type WellsByPipelineIdQueryResult = Apollo.QueryResult<WellsByPipelineIdQuery, WellsByPipelineIdQueryVariables>;
export const WellsGroupByPipelineIdDocument = gql`
    query WellsGroupByPipelineId($pipelineId: String!) {
  wellsGroupByPipelineId(pipelineId: $pipelineId) {
    oil
    water
    gas
    gasAssociatedLiquids
    firstProduction
    totalFluids
    lastProduction
    firstInjection
    lastInjection
  }
}
    `;

/**
 * __useWellsGroupByPipelineIdQuery__
 *
 * To run a query within a React component, call `useWellsGroupByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWellsGroupByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellsGroupByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useWellsGroupByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<WellsGroupByPipelineIdQuery, WellsGroupByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WellsGroupByPipelineIdQuery, WellsGroupByPipelineIdQueryVariables>(WellsGroupByPipelineIdDocument, options);
      }
export function useWellsGroupByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WellsGroupByPipelineIdQuery, WellsGroupByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WellsGroupByPipelineIdQuery, WellsGroupByPipelineIdQueryVariables>(WellsGroupByPipelineIdDocument, options);
        }
export type WellsGroupByPipelineIdQueryHookResult = ReturnType<typeof useWellsGroupByPipelineIdQuery>;
export type WellsGroupByPipelineIdLazyQueryHookResult = ReturnType<typeof useWellsGroupByPipelineIdLazyQuery>;
export type WellsGroupByPipelineIdQueryResult = Apollo.QueryResult<WellsGroupByPipelineIdQuery, WellsGroupByPipelineIdQueryVariables>;
export const WellOptionsDocument = gql`
    query WellOptions($pipelineId: String!) {
  wellOptions(pipelineId: $pipelineId) {
    facility
    satellite
    id
    source
    disabled
  }
}
    `;

/**
 * __useWellOptionsQuery__
 *
 * To run a query within a React component, call `useWellOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWellOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellOptionsQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useWellOptionsQuery(baseOptions: Apollo.QueryHookOptions<WellOptionsQuery, WellOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WellOptionsQuery, WellOptionsQueryVariables>(WellOptionsDocument, options);
      }
export function useWellOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WellOptionsQuery, WellOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WellOptionsQuery, WellOptionsQueryVariables>(WellOptionsDocument, options);
        }
export type WellOptionsQueryHookResult = ReturnType<typeof useWellOptionsQuery>;
export type WellOptionsLazyQueryHookResult = ReturnType<typeof useWellOptionsLazyQuery>;
export type WellOptionsQueryResult = Apollo.QueryResult<WellOptionsQuery, WellOptionsQueryVariables>;
export const SalesPointsByPipelineIdDocument = gql`
    query SalesPointsByPipelineId($pipelineId: String!) {
  salesPointsByPipelineId(pipelineId: $pipelineId) {
    id
    name
    oil
    water
    gas
    gasAssociatedLiquids
    totalFluids
    firstProduction
    lastProduction
    firstInjection
    lastInjection
    fdcRecId
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __useSalesPointsByPipelineIdQuery__
 *
 * To run a query within a React component, call `useSalesPointsByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalesPointsByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesPointsByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useSalesPointsByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<SalesPointsByPipelineIdQuery, SalesPointsByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SalesPointsByPipelineIdQuery, SalesPointsByPipelineIdQueryVariables>(SalesPointsByPipelineIdDocument, options);
      }
export function useSalesPointsByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SalesPointsByPipelineIdQuery, SalesPointsByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SalesPointsByPipelineIdQuery, SalesPointsByPipelineIdQueryVariables>(SalesPointsByPipelineIdDocument, options);
        }
export type SalesPointsByPipelineIdQueryHookResult = ReturnType<typeof useSalesPointsByPipelineIdQuery>;
export type SalesPointsByPipelineIdLazyQueryHookResult = ReturnType<typeof useSalesPointsByPipelineIdLazyQuery>;
export type SalesPointsByPipelineIdQueryResult = Apollo.QueryResult<SalesPointsByPipelineIdQuery, SalesPointsByPipelineIdQueryVariables>;
export const SalesPointsGroupByPipelineIdDocument = gql`
    query SalesPointsGroupByPipelineId($pipelineId: String!) {
  salesPointsGroupByPipelineId(pipelineId: $pipelineId) {
    oil
    water
    gas
    gasAssociatedLiquids
    totalFluids
    firstProduction
    lastProduction
    firstInjection
    lastInjection
  }
}
    `;

/**
 * __useSalesPointsGroupByPipelineIdQuery__
 *
 * To run a query within a React component, call `useSalesPointsGroupByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalesPointsGroupByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesPointsGroupByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useSalesPointsGroupByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<SalesPointsGroupByPipelineIdQuery, SalesPointsGroupByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SalesPointsGroupByPipelineIdQuery, SalesPointsGroupByPipelineIdQueryVariables>(SalesPointsGroupByPipelineIdDocument, options);
      }
export function useSalesPointsGroupByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SalesPointsGroupByPipelineIdQuery, SalesPointsGroupByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SalesPointsGroupByPipelineIdQuery, SalesPointsGroupByPipelineIdQueryVariables>(SalesPointsGroupByPipelineIdDocument, options);
        }
export type SalesPointsGroupByPipelineIdQueryHookResult = ReturnType<typeof useSalesPointsGroupByPipelineIdQuery>;
export type SalesPointsGroupByPipelineIdLazyQueryHookResult = ReturnType<typeof useSalesPointsGroupByPipelineIdLazyQuery>;
export type SalesPointsGroupByPipelineIdQueryResult = Apollo.QueryResult<SalesPointsGroupByPipelineIdQuery, SalesPointsGroupByPipelineIdQueryVariables>;
export const SalesPointOptionsDocument = gql`
    query SalesPointOptions($pipelineId: String!) {
  salesPointOptions(pipelineId: $pipelineId) {
    facility
    satellite
    id
    source
    disabled
  }
}
    `;

/**
 * __useSalesPointOptionsQuery__
 *
 * To run a query within a React component, call `useSalesPointOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalesPointOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesPointOptionsQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useSalesPointOptionsQuery(baseOptions: Apollo.QueryHookOptions<SalesPointOptionsQuery, SalesPointOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SalesPointOptionsQuery, SalesPointOptionsQueryVariables>(SalesPointOptionsDocument, options);
      }
export function useSalesPointOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SalesPointOptionsQuery, SalesPointOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SalesPointOptionsQuery, SalesPointOptionsQueryVariables>(SalesPointOptionsDocument, options);
        }
export type SalesPointOptionsQueryHookResult = ReturnType<typeof useSalesPointOptionsQuery>;
export type SalesPointOptionsLazyQueryHookResult = ReturnType<typeof useSalesPointOptionsLazyQuery>;
export type SalesPointOptionsQueryResult = Apollo.QueryResult<SalesPointOptionsQuery, SalesPointOptionsQueryVariables>;
export const ConnectedPipelinesByPipelineIdDocument = gql`
    query ConnectedPipelinesByPipelineId($id: String!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  connectedPipelinesByPipelineId(
    id: $id
    flowCalculationDirection: $flowCalculationDirection
  ) {
    pipelinesFlow {
      id
      name
      oil
      water
      gas
      gasAssociatedLiquids
      totalFluids
      firstProduction
      lastProduction
      firstInjection
      lastInjection
      authorized
      createdBy {
        id
        email
      }
      createdAt
      updatedBy {
        id
        email
      }
      updatedAt
    }
    sourceGroupBy {
      oil
      water
      gas
      gasAssociatedLiquids
      totalFluids
      firstProduction
      lastProduction
      firstInjection
      lastInjection
    }
  }
}
    `;

/**
 * __useConnectedPipelinesByPipelineIdQuery__
 *
 * To run a query within a React component, call `useConnectedPipelinesByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useConnectedPipelinesByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConnectedPipelinesByPipelineIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
 *   },
 * });
 */
export function useConnectedPipelinesByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<ConnectedPipelinesByPipelineIdQuery, ConnectedPipelinesByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConnectedPipelinesByPipelineIdQuery, ConnectedPipelinesByPipelineIdQueryVariables>(ConnectedPipelinesByPipelineIdDocument, options);
      }
export function useConnectedPipelinesByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConnectedPipelinesByPipelineIdQuery, ConnectedPipelinesByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConnectedPipelinesByPipelineIdQuery, ConnectedPipelinesByPipelineIdQueryVariables>(ConnectedPipelinesByPipelineIdDocument, options);
        }
export type ConnectedPipelinesByPipelineIdQueryHookResult = ReturnType<typeof useConnectedPipelinesByPipelineIdQuery>;
export type ConnectedPipelinesByPipelineIdLazyQueryHookResult = ReturnType<typeof useConnectedPipelinesByPipelineIdLazyQuery>;
export type ConnectedPipelinesByPipelineIdQueryResult = Apollo.QueryResult<ConnectedPipelinesByPipelineIdQuery, ConnectedPipelinesByPipelineIdQueryVariables>;
export const PipelineFlowDocument = gql`
    query PipelineFlow($id: String!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  pipelineFlow(id: $id, flowCalculationDirection: $flowCalculationDirection) {
    oil
    water
    gas
    gasAssociatedLiquids
    totalFluids
    firstProduction
    lastProduction
    firstInjection
    lastInjection
  }
}
    `;

/**
 * __usePipelineFlowQuery__
 *
 * To run a query within a React component, call `usePipelineFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelineFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelineFlowQuery({
 *   variables: {
 *      id: // value for 'id'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
 *   },
 * });
 */
export function usePipelineFlowQuery(baseOptions: Apollo.QueryHookOptions<PipelineFlowQuery, PipelineFlowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelineFlowQuery, PipelineFlowQueryVariables>(PipelineFlowDocument, options);
      }
export function usePipelineFlowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelineFlowQuery, PipelineFlowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelineFlowQuery, PipelineFlowQueryVariables>(PipelineFlowDocument, options);
        }
export type PipelineFlowQueryHookResult = ReturnType<typeof usePipelineFlowQuery>;
export type PipelineFlowLazyQueryHookResult = ReturnType<typeof usePipelineFlowLazyQuery>;
export type PipelineFlowQueryResult = Apollo.QueryResult<PipelineFlowQuery, PipelineFlowQueryVariables>;
export const PipelineOptionsDocument = gql`
    query PipelineOptions($id: String!) {
  pipelineOptions(id: $id) {
    facility
    satellite
    id
    source
    disabled
  }
}
    `;

/**
 * __usePipelineOptionsQuery__
 *
 * To run a query within a React component, call `usePipelineOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelineOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelineOptionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePipelineOptionsQuery(baseOptions: Apollo.QueryHookOptions<PipelineOptionsQuery, PipelineOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelineOptionsQuery, PipelineOptionsQueryVariables>(PipelineOptionsDocument, options);
      }
export function usePipelineOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelineOptionsQuery, PipelineOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelineOptionsQuery, PipelineOptionsQueryVariables>(PipelineOptionsDocument, options);
        }
export type PipelineOptionsQueryHookResult = ReturnType<typeof usePipelineOptionsQuery>;
export type PipelineOptionsLazyQueryHookResult = ReturnType<typeof usePipelineOptionsLazyQuery>;
export type PipelineOptionsQueryResult = Apollo.QueryResult<PipelineOptionsQuery, PipelineOptionsQueryVariables>;
export const RiskByIdDocument = gql`
    query RiskById($id: String!) {
  riskById(id: $id) {
    id
    aerialReview
    environmentProximityTo
    geotechnicalSlopeAngleS1
    geotechnicalFacingS1
    geotechnicalHeightS1
    geotechnicalSlopeAngleS2
    geotechnicalFacingS2
    geotechnicalHeightS2
    dateSlopeChecked
    repairTimeDays
    releaseTimeDays
    costPerM3Released
    consequenceEnviro
    consequenceAsset
    probabilityInterior
    probabilityExterior
    consequenceMax
    riskPotentialGeo
    riskPotentialInternal
    riskPotentialExternal
    oilReleaseCost
    gasReleaseCost
    consequencePeople
    probabilityGeo
    safeguardInternalProtection
    safeguardPigging
    safeguardChemicalInhibition
    probabilityInteriorWithSafeguards
    riskPotentialInternalWithSafeguards
    safeguardExternalCoating
    safeguardCathodic
    probabilityExteriorWithSafeguards
    riskPotentialExternalWithSafeguards
    comment
    createdBy {
      id
      email
    }
    createdAt
    updatedBy {
      id
      email
    }
    updatedAt
    authorized
  }
}
    `;

/**
 * __useRiskByIdQuery__
 *
 * To run a query within a React component, call `useRiskByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRiskByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRiskByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRiskByIdQuery(baseOptions: Apollo.QueryHookOptions<RiskByIdQuery, RiskByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RiskByIdQuery, RiskByIdQueryVariables>(RiskByIdDocument, options);
      }
export function useRiskByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RiskByIdQuery, RiskByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RiskByIdQuery, RiskByIdQueryVariables>(RiskByIdDocument, options);
        }
export type RiskByIdQueryHookResult = ReturnType<typeof useRiskByIdQuery>;
export type RiskByIdLazyQueryHookResult = ReturnType<typeof useRiskByIdLazyQuery>;
export type RiskByIdQueryResult = Apollo.QueryResult<RiskByIdQuery, RiskByIdQueryVariables>;
export const ChemicalByIdDocument = gql`
    query ChemicalById($id: String!) {
  chemicalById(id: $id) {
    id
    chemicalSupplierId
    baselineFluidAnalysisDate
    scaling
    bacteria
    co2
    o2
    h2s
    continuousInjection
    injectionRate
    downholeBatch
    inhibitorPipelineBatch
    bacteriaTreatment
    scaleTreatment
    batchFrequency
    comment
    createdAt
    updatedAt
    authorized
    createdBy {
      id
      email
    }
    updatedBy {
      id
      email
    }
  }
}
    `;

/**
 * __useChemicalByIdQuery__
 *
 * To run a query within a React component, call `useChemicalByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChemicalByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChemicalByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChemicalByIdQuery(baseOptions: Apollo.QueryHookOptions<ChemicalByIdQuery, ChemicalByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChemicalByIdQuery, ChemicalByIdQueryVariables>(ChemicalByIdDocument, options);
      }
export function useChemicalByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChemicalByIdQuery, ChemicalByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChemicalByIdQuery, ChemicalByIdQueryVariables>(ChemicalByIdDocument, options);
        }
export type ChemicalByIdQueryHookResult = ReturnType<typeof useChemicalByIdQuery>;
export type ChemicalByIdLazyQueryHookResult = ReturnType<typeof useChemicalByIdLazyQuery>;
export type ChemicalByIdQueryResult = Apollo.QueryResult<ChemicalByIdQuery, ChemicalByIdQueryVariables>;
export const PipelinesFlowDocument = gql`
    query PipelinesFlow($idList: [String]!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  pipelinesFlow(
    idList: $idList
    flowCalculationDirection: $flowCalculationDirection
  ) {
    id
    name
    oil
    water
    gas
    gasAssociatedLiquids
    totalFluids
    firstProduction
    lastProduction
    firstInjection
    lastInjection
  }
}
    `;

/**
 * __usePipelinesFlowQuery__
 *
 * To run a query within a React component, call `usePipelinesFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelinesFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelinesFlowQuery({
 *   variables: {
 *      idList: // value for 'idList'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
 *   },
 * });
 */
export function usePipelinesFlowQuery(baseOptions: Apollo.QueryHookOptions<PipelinesFlowQuery, PipelinesFlowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelinesFlowQuery, PipelinesFlowQueryVariables>(PipelinesFlowDocument, options);
      }
export function usePipelinesFlowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelinesFlowQuery, PipelinesFlowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelinesFlowQuery, PipelinesFlowQueryVariables>(PipelinesFlowDocument, options);
        }
export type PipelinesFlowQueryHookResult = ReturnType<typeof usePipelinesFlowQuery>;
export type PipelinesFlowLazyQueryHookResult = ReturnType<typeof usePipelinesFlowLazyQuery>;
export type PipelinesFlowQueryResult = Apollo.QueryResult<PipelinesFlowQuery, PipelinesFlowQueryVariables>;
export const SideBarDocument = gql`
    query SideBar {
  sideBar {
    id
    name
    satellites {
      id
      name
    }
  }
}
    `;

/**
 * __useSideBarQuery__
 *
 * To run a query within a React component, call `useSideBarQuery` and pass it any options that fit your needs.
 * When your component renders, `useSideBarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSideBarQuery({
 *   variables: {
 *   },
 * });
 */
export function useSideBarQuery(baseOptions?: Apollo.QueryHookOptions<SideBarQuery, SideBarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SideBarQuery, SideBarQueryVariables>(SideBarDocument, options);
      }
export function useSideBarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SideBarQuery, SideBarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SideBarQuery, SideBarQueryVariables>(SideBarDocument, options);
        }
export type SideBarQueryHookResult = ReturnType<typeof useSideBarQuery>;
export type SideBarLazyQueryHookResult = ReturnType<typeof useSideBarLazyQuery>;
export type SideBarQueryResult = Apollo.QueryResult<SideBarQuery, SideBarQueryVariables>;
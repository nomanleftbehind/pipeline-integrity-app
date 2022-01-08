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

export type AuthPayload = {
  errors?: Maybe<Array<Maybe<FieldError>>>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Facility = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['String'];
  name: Scalars['String'];
  satellites?: Maybe<Array<Maybe<Satellite>>>;
  updatedAt: Scalars['DateTime'];
};

export type FacilityCreateInput = {
  name: Scalars['String'];
  satellites?: Maybe<Array<Maybe<SatelliteCreateInput>>>;
};

export type FacilitySatelliteSideBar = {
  facilityId: Scalars['String'];
  facilityName: Scalars['String'];
  satelliteId: Scalars['String'];
  satelliteName: Scalars['String'];
};

export type FacilityUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FieldError = {
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
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

export type InjectionPoint = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil: Scalars['Float'];
  pipeline?: Maybe<Pipeline>;
  pvNodeId?: Maybe<Scalars['String']>;
  pvUnitId?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  water: Scalars['Float'];
};

export type InjectionPointCreateInput = {
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil: Scalars['Float'];
  pvNodeId?: Maybe<Scalars['String']>;
  pvUnitId?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  water: Scalars['Float'];
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
  addPigRun?: Maybe<PigRun>;
  addPressureTest?: Maybe<PressureTest>;
  connectSource?: Maybe<Pipeline>;
  connectUpstreamPipeline?: Maybe<Pipeline>;
  createFacility?: Maybe<Facility>;
  deletePigRun?: Maybe<PigRun>;
  deletePipeline?: Maybe<Pipeline>;
  deletePressureTest?: Maybe<PressureTest>;
  deleteSatellite?: Maybe<Satellite>;
  disconnectSource?: Maybe<Pipeline>;
  disconnectUpstreamPipeline?: Maybe<Pipeline>;
  duplicatePipeline?: Maybe<Pipeline>;
  editFacility?: Maybe<Facility>;
  editInjectionPoint?: Maybe<InjectionPoint>;
  editPigRun?: Maybe<PigRun>;
  editPipeline?: Maybe<Pipeline>;
  editPressureTest?: Maybe<PressureTest>;
  editSatellite?: Maybe<Satellite>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
};


export type MutationAddPigRunArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddPressureTestArgs = {
  pipelineId: Scalars['String'];
};


export type MutationConnectSourceArgs = {
  id: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationConnectUpstreamPipelineArgs = {
  id: Scalars['String'];
  upstreamId: Scalars['String'];
};


export type MutationCreateFacilityArgs = {
  data: FacilityCreateInput;
};


export type MutationDeletePigRunArgs = {
  id: Scalars['String'];
};


export type MutationDeletePipelineArgs = {
  id: Scalars['String'];
};


export type MutationDeletePressureTestArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSatelliteArgs = {
  id: Scalars['String'];
};


export type MutationDisconnectSourceArgs = {
  id: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationDisconnectUpstreamPipelineArgs = {
  id: Scalars['String'];
  upstreamId: Scalars['String'];
};


export type MutationDuplicatePipelineArgs = {
  id: Scalars['String'];
};


export type MutationEditFacilityArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationEditInjectionPointArgs = {
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil?: Maybe<Scalars['Float']>;
  pipelineId?: Maybe<Scalars['String']>;
  pvNodeId?: Maybe<Scalars['String']>;
  pvUnitId?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['Float']>;
};


export type MutationEditPigRunArgs = {
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  operatorId?: Maybe<Scalars['String']>;
  pigType?: Maybe<PigTypeEnum>;
  pipelineId?: Maybe<Scalars['String']>;
};


export type MutationEditPipelineArgs = {
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
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
  to?: Maybe<Scalars['String']>;
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  wallThickness?: Maybe<Scalars['Float']>;
  yieldStrength?: Maybe<Scalars['Int']>;
};


export type MutationEditPressureTestArgs = {
  comment?: Maybe<Scalars['String']>;
  ddsDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  pipelineId?: Maybe<Scalars['String']>;
  pressureTestDate?: Maybe<Scalars['DateTime']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
};


export type MutationEditSatelliteArgs = {
  facilityUniqueInput?: Maybe<FacilityUniqueInput>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type PigRun = {
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  operator?: Maybe<User>;
  pigType?: Maybe<PigTypeEnum>;
  pipeline: Pipeline;
  updatedAt: Scalars['DateTime'];
};

export enum PigTypeEnum {
  Foam = 'Foam',
  Gscr = 'GSCR',
  Pscr = 'PSCR',
  Scrapper = 'Scrapper'
}

export type PigTypeEnumObject = {
  Foam: Scalars['String'];
  GSCR: Scalars['String'];
  PSCR: Scalars['String'];
  Scrapper: Scalars['String'];
};

export type Pipeline = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  downstream?: Maybe<Array<Maybe<Pipeline>>>;
  from: Scalars['String'];
  fromFeature?: Maybe<FromToFeatureEnum>;
  grade?: Maybe<GradeEnum>;
  id: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  injectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  internalProtection?: Maybe<InternalProtectionEnum>;
  length: Scalars['Float'];
  license: Scalars['String'];
  licenseDate?: Maybe<Scalars['DateTime']>;
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
  satellite?: Maybe<Satellite>;
  segment: Scalars['String'];
  status: StatusEnum;
  substance: SubstanceEnum;
  to: Scalars['String'];
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  updatedAt: Scalars['DateTime'];
  upstream?: Maybe<Array<Maybe<Pipeline>>>;
  wallThickness?: Maybe<Scalars['Float']>;
  yieldStrength?: Maybe<Scalars['Int']>;
};

export type PipelineCreateInput = {
  downstream?: Maybe<Array<Maybe<PipelineCreateInput>>>;
  from: Scalars['String'];
  fromFeature?: Maybe<FromToFeatureEnum>;
  grade?: Maybe<GradeEnum>;
  injectionPoints?: Maybe<Array<Maybe<InjectionPointCreateInput>>>;
  internalProtection?: Maybe<InternalProtectionEnum>;
  length: Scalars['Float'];
  license: Scalars['String'];
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  segment: Scalars['String'];
  status: StatusEnum;
  substance: SubstanceEnum;
  to: Scalars['String'];
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  upstream?: Maybe<Array<Maybe<PipelineCreateInput>>>;
  wallThickness?: Maybe<Scalars['Float']>;
};

export type PipelineFlow = {
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil: Scalars['Float'];
  water: Scalars['Float'];
};

export type PipelineOptions = {
  facility: Scalars['String'];
  id: Scalars['String'];
  license: Scalars['String'];
  satellite: Scalars['String'];
  segment: Scalars['String'];
  substance: SubstanceEnum;
};

export type PipelineUniqueInput = {
  id?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
};

export type PressureTest = {
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  ddsDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  pipeline: Pipeline;
  pressureTestDate?: Maybe<Scalars['DateTime']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  allFacilities?: Maybe<Array<Maybe<Facility>>>;
  allInjectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  allSatellites?: Maybe<Array<Maybe<Satellite>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  pigRunsByPipelineId?: Maybe<Array<Maybe<PigRun>>>;
  pipelineById?: Maybe<Pipeline>;
  pipelineFlow?: Maybe<Array<Maybe<PipelineFlow>>>;
  pipelineOptions?: Maybe<Array<Maybe<PipelineOptions>>>;
  pipelinesById?: Maybe<Array<Maybe<Pipeline>>>;
  pipelinesByUser?: Maybe<Array<Maybe<Pipeline>>>;
  pressureTestsByPipelineId?: Maybe<Array<Maybe<PressureTest>>>;
  sideBar?: Maybe<Array<Maybe<SideBar>>>;
  sourceOptions?: Maybe<Array<Maybe<SourceOptions>>>;
  validators?: Maybe<Validator>;
};


export type QueryPigRunsByPipelineIdArgs = {
  pipelineId?: Maybe<Scalars['String']>;
};


export type QueryPipelineByIdArgs = {
  id: Scalars['String'];
};


export type QueryPipelineFlowArgs = {
  id: Array<Maybe<Scalars['String']>>;
};


export type QueryPipelinesByIdArgs = {
  facilityId?: Maybe<Scalars['String']>;
  noSatellite?: Maybe<Scalars['String']>;
  satelliteId?: Maybe<Scalars['String']>;
};


export type QueryPipelinesByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryPressureTestsByPipelineIdArgs = {
  pipelineId?: Maybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Satellite = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  facility?: Maybe<Facility>;
  id: Scalars['String'];
  name: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<Pipeline>>>;
  updatedAt: Scalars['DateTime'];
};

export type SatelliteCreateInput = {
  injectionPoints?: Maybe<Array<Maybe<InjectionPointCreateInput>>>;
  name: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<PipelineCreateInput>>>;
};

export type SatelliteSideBar = {
  satelliteId: Scalars['String'];
  satelliteName: Scalars['String'];
};

export type SatelliteUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SideBar = {
  facilityId: Scalars['String'];
  facilityName: Scalars['String'];
  satellites: Array<SatelliteSideBar>;
};

export type SourceOptions = {
  facility: Scalars['String'];
  id: Scalars['String'];
  satellite: Scalars['String'];
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
  facilities?: Maybe<Array<Maybe<Facility>>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  injectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  lastName: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<Pipeline>>>;
  role: Role;
  satellites?: Maybe<Array<Maybe<Satellite>>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  facilities?: Maybe<Array<Maybe<FacilityCreateInput>>>;
  firstName: Scalars['String'];
  injectionPoints?: Maybe<Array<Maybe<InjectionPointCreateInput>>>;
  lastName: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<PipelineCreateInput>>>;
  satellites?: Maybe<Array<Maybe<SatelliteCreateInput>>>;
};

export type UserUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type Validator = {
  anyTextMatchPattern: Scalars['String'];
  fromToFeatureEnum: FromToFeatureEnumObject;
  fromToMatchPattern: Scalars['String'];
  gradeEnum: GradeEnumObject;
  internalProtectionEnum: InternalProtectionEnumObject;
  lengthMatchPattern: Scalars['String'];
  licenseMatchPattern: Scalars['String'];
  limitingSpecEnum: LimitingSpecEnumObject;
  materialEnum: MaterialEnumObject;
  mopMatchPattern: Scalars['String'];
  outsideDiameterMatchPattern: Scalars['String'];
  pigTypeEnum: PigTypeEnumObject;
  segmentMatchPattern: Scalars['String'];
  statusEnum: StatusEnumObject;
  substanceEnum: SubstanceEnumObject;
  typeEnum: TypeEnumObject;
  wallThicknessMatchPattern: Scalars['String'];
  yieldStrengthMatchPattern: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: { token?: string | null | undefined, user?: { id: string, email: string, firstName: string, lastName: string, role: Role } | null | undefined, errors?: Array<{ field?: string | null | undefined, message?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type DeletePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePipelineMutation = { deletePipeline?: { id: string, license: string, segment: string } | null | undefined };

export type DuplicatePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicatePipelineMutation = { duplicatePipeline?: { id: string, license: string, segment: string } | null | undefined };

export type ConnectUpstreamPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  upstreamId: Scalars['String'];
}>;


export type ConnectUpstreamPipelineMutation = { connectUpstreamPipeline?: { id: string, upstream?: Array<{ id: string } | null | undefined> | null | undefined } | null | undefined };

export type DisconnectUpstreamPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  upstreamId: Scalars['String'];
}>;


export type DisconnectUpstreamPipelineMutation = { disconnectUpstreamPipeline?: { id: string, upstream?: Array<{ id: string } | null | undefined> | null | undefined } | null | undefined };

export type ConnectSourceMutationVariables = Exact<{
  id: Scalars['String'];
  sourceId: Scalars['String'];
}>;


export type ConnectSourceMutation = { connectSource?: { id: string, injectionPoints?: Array<{ id: string } | null | undefined> | null | undefined } | null | undefined };

export type DisconnectSourceMutationVariables = Exact<{
  id: Scalars['String'];
  sourceId: Scalars['String'];
}>;


export type DisconnectSourceMutation = { disconnectSource?: { id: string, injectionPoints?: Array<{ id: string } | null | undefined> | null | undefined } | null | undefined };

export type EditPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  satelliteId?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
  substance?: Maybe<SubstanceEnum>;
  from?: Maybe<Scalars['String']>;
  fromFeature?: Maybe<FromToFeatureEnum>;
  to?: Maybe<Scalars['String']>;
  toFeature?: Maybe<FromToFeatureEnum>;
  status?: Maybe<StatusEnum>;
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


export type EditPipelineMutation = { editPipeline?: { id: string, license: string, segment: string } | null | undefined };

export type EditPressureTestMutationVariables = Exact<{
  id: Scalars['String'];
  pipelineId?: Maybe<Scalars['String']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  ddsDate?: Maybe<Scalars['DateTime']>;
  pressureTestDate?: Maybe<Scalars['DateTime']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type EditPressureTestMutation = { editPressureTest?: { id: string } | null | undefined };

export type AddPressureTestMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddPressureTestMutation = { addPressureTest?: { id: string } | null | undefined };

export type DeletePressureTestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePressureTestMutation = { deletePressureTest?: { id: string } | null | undefined };

export type EditPigRunMutationVariables = Exact<{
  id: Scalars['String'];
  pipelineId?: Maybe<Scalars['String']>;
  pigType?: Maybe<PigTypeEnum>;
  date?: Maybe<Scalars['DateTime']>;
  comment?: Maybe<Scalars['String']>;
  operatorId?: Maybe<Scalars['String']>;
}>;


export type EditPigRunMutation = { editPigRun?: { id: string } | null | undefined };

export type AddPigRunMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddPigRunMutation = { addPigRun?: { id: string } | null | undefined };

export type DeletePigRunMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePigRunMutation = { deletePigRun?: { id: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, email: string, firstName: string, lastName: string, role: Role } | null | undefined };

export type PipelinesByIdQueryQueryVariables = Exact<{
  satelliteId?: Maybe<Scalars['String']>;
  facilityId?: Maybe<Scalars['String']>;
  noSatellite?: Maybe<Scalars['String']>;
}>;


export type PipelinesByIdQueryQuery = { pipelinesById?: Array<{ id: string, createdAt: string, updatedAt: string, license: string, segment: string, substance: SubstanceEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status: StatusEnum, licenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, createdBy: { email: string }, satellite?: { id: string, facility?: { id: string } | null | undefined } | null | undefined, injectionPoints?: Array<{ id: string, source: string, oil: number, water: number, gas: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined> | null | undefined, upstream?: Array<{ id: string, license: string, segment: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type PipelineByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PipelineByIdQuery = { pipelineById?: { id: string, license: string, segment: string, substance: SubstanceEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status: StatusEnum, licenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, createdAt: string, updatedAt: string, createdBy: { email: string }, upstream?: Array<{ license: string, segment: string } | null | undefined> | null | undefined, downstream?: Array<{ license: string, segment: string } | null | undefined> | null | undefined, satellite?: { name: string } | null | undefined, injectionPoints?: Array<{ source: string } | null | undefined> | null | undefined } | null | undefined };

export type PipelineOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PipelineOptionsQuery = { pipelineOptions?: Array<{ facility: string, satellite: string, substance: SubstanceEnum, id: string, license: string, segment: string } | null | undefined> | null | undefined };

export type SourceOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SourceOptionsQuery = { sourceOptions?: Array<{ facility: string, satellite: string, id: string, source: string } | null | undefined> | null | undefined };

export type PigRunsByPipelineIdQueryVariables = Exact<{
  pipelineId?: Maybe<Scalars['String']>;
}>;


export type PigRunsByPipelineIdQuery = { pigRunsByPipelineId?: Array<{ id: string, pigType?: PigTypeEnum | null | undefined, date?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, pipeline: { license: string, segment: string }, operator?: { email: string } | null | undefined, createdBy: { email: string } } | null | undefined> | null | undefined };

export type ValidatorsPigRunQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPigRunQuery = { validators?: { anyTextMatchPattern: string, pigTypeEnum: { GSCR: string, PSCR: string, Foam: string, Scrapper: string } } | null | undefined };

export type GetValidatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValidatorsQuery = { validators?: { licenseMatchPattern: string, segmentMatchPattern: string, fromToMatchPattern: string, lengthMatchPattern: string, yieldStrengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string }, fromToFeatureEnum: { BlindEnd: string, Battery: string, Pipeline: string, Satellite: string, StorageTank: string, InjectionPlant: string, Well: string, CompressorStation: string, MeterStation: string, PumpStation: string, GasProcessingPlant: string, UndergroundCapOrTieIn: string, Header: string }, statusEnum: { Operating: string, Discontinued: string, Abandoned: string, Removed: string, ToBeConstructed: string, Active: string, Cancelled: string, New: string, NotConstructed: string }, typeEnum: { Type515: string, Type2306: string, Type3406: string, Type3408: string, Type6063: string, Type6351: string, Type5A: string, Type5L: string, Type5LX: string, TypeA106: string, TypeA120: string, TypeA53: string, TypeAMERON: string, TypeB515: string, TypeB51S: string, TypeB5IS: string, TypeCENTRON: string, TypeCIBA: string, TypeFSLP: string, TypeREDTHR: string, TypeSMITH: string, TypeSTAR: string, TypeTBS: string, TypeWSLP: string, TypeZ2451: string, TypeZ2453: string }, gradeEnum: { GradeA: string, Grade3592: string, GradeB: string, GradeX42: string, GradeBW1: string, Grade2500: string, Grade3591: string, Grade2901: string, GradeT4: string, Grade300: string, Grade3593: string, Grade11: string, GradeJ55: string, Grade2250: string, GradeX52: string, Grade2750: string, Grade2902: string, Grade25: string, Grade241: string, Grade2413: string, Grade2411: string, Grade155: string, Grade150: string, Grade1000: string, Grade800: string, GradeT1A: string, Grade2010: string, GradeT4A: string, Grade1250: string, Grade17: string, Grade900: string, GradeT1B: string, Grade810: string, Grade35: string, Grade5: string, Grade9: string, Grade200: string, Grade1200: string, Grade1103: string }, materialEnum: { Steel: string, PolyvinylChloride: string, Composite: string, Fiberglass: string, Aluminum: string, Polyethylene: string, CelluloseAcetateButyrate: string, Unknown: string, AsbestosCement: string }, internalProtectionEnum: { Uncoated: string, FreeStandingSlipLined: string, Unknown: string, Cement: string, ExpandedPolyethylene: string, ThinFilm: string }, pigTypeEnum: { GSCR: string, PSCR: string, Foam: string, Scrapper: string }, limitingSpecEnum: { ANSI150: string, ANSI300: string, ANSI600: string } } | null | undefined };

export type ValidatorSubstanceQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorSubstanceQuery = { validators?: { substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string } } | null | undefined };

export type ValidatorsPressureTestQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPressureTestQuery = { validators?: { anyTextMatchPattern: string, limitingSpecEnum: { ANSI150: string, ANSI300: string, ANSI600: string } } | null | undefined };

export type PressureTestsByPipelineIdQueryVariables = Exact<{
  pipelineId?: Maybe<Scalars['String']>;
}>;


export type PressureTestsByPipelineIdQuery = { pressureTestsByPipelineId?: Array<{ id: string, limitingSpec?: LimitingSpecEnum | null | undefined, infoSentOutDate?: string | null | undefined, ddsDate?: string | null | undefined, pressureTestDate?: string | null | undefined, pressureTestReceivedDate?: string | null | undefined, integritySheetUpdated?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, pipeline: { license: string, segment: string }, createdBy: { email: string } } | null | undefined> | null | undefined };

export type PipelineFlowQueryVariables = Exact<{
  pipelineFlowId: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type PipelineFlowQuery = { pipelineFlow?: Array<{ id: string, oil: number, water: number, gas: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined> | null | undefined };

export type SideBarQueryVariables = Exact<{ [key: string]: never; }>;


export type SideBarQuery = { sideBar?: Array<{ facilityId: string, facilityName: string, satellites: Array<{ satelliteId: string, satelliteName: string }> } | null | undefined> | null | undefined };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      firstName
      lastName
      role
    }
    errors {
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
export const DeletePipelineDocument = gql`
    mutation deletePipeline($id: String!) {
  deletePipeline(id: $id) {
    id
    license
    segment
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
    mutation duplicatePipeline($id: String!) {
  duplicatePipeline(id: $id) {
    id
    license
    segment
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
export const ConnectUpstreamPipelineDocument = gql`
    mutation connectUpstreamPipeline($id: String!, $upstreamId: String!) {
  connectUpstreamPipeline(id: $id, upstreamId: $upstreamId) {
    id
    upstream {
      id
    }
  }
}
    `;
export type ConnectUpstreamPipelineMutationFn = Apollo.MutationFunction<ConnectUpstreamPipelineMutation, ConnectUpstreamPipelineMutationVariables>;

/**
 * __useConnectUpstreamPipelineMutation__
 *
 * To run a mutation, you first call `useConnectUpstreamPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectUpstreamPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectUpstreamPipelineMutation, { data, loading, error }] = useConnectUpstreamPipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      upstreamId: // value for 'upstreamId'
 *   },
 * });
 */
export function useConnectUpstreamPipelineMutation(baseOptions?: Apollo.MutationHookOptions<ConnectUpstreamPipelineMutation, ConnectUpstreamPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectUpstreamPipelineMutation, ConnectUpstreamPipelineMutationVariables>(ConnectUpstreamPipelineDocument, options);
      }
export type ConnectUpstreamPipelineMutationHookResult = ReturnType<typeof useConnectUpstreamPipelineMutation>;
export type ConnectUpstreamPipelineMutationResult = Apollo.MutationResult<ConnectUpstreamPipelineMutation>;
export type ConnectUpstreamPipelineMutationOptions = Apollo.BaseMutationOptions<ConnectUpstreamPipelineMutation, ConnectUpstreamPipelineMutationVariables>;
export const DisconnectUpstreamPipelineDocument = gql`
    mutation disconnectUpstreamPipeline($id: String!, $upstreamId: String!) {
  disconnectUpstreamPipeline(id: $id, upstreamId: $upstreamId) {
    id
    upstream {
      id
    }
  }
}
    `;
export type DisconnectUpstreamPipelineMutationFn = Apollo.MutationFunction<DisconnectUpstreamPipelineMutation, DisconnectUpstreamPipelineMutationVariables>;

/**
 * __useDisconnectUpstreamPipelineMutation__
 *
 * To run a mutation, you first call `useDisconnectUpstreamPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectUpstreamPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectUpstreamPipelineMutation, { data, loading, error }] = useDisconnectUpstreamPipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      upstreamId: // value for 'upstreamId'
 *   },
 * });
 */
export function useDisconnectUpstreamPipelineMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectUpstreamPipelineMutation, DisconnectUpstreamPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectUpstreamPipelineMutation, DisconnectUpstreamPipelineMutationVariables>(DisconnectUpstreamPipelineDocument, options);
      }
export type DisconnectUpstreamPipelineMutationHookResult = ReturnType<typeof useDisconnectUpstreamPipelineMutation>;
export type DisconnectUpstreamPipelineMutationResult = Apollo.MutationResult<DisconnectUpstreamPipelineMutation>;
export type DisconnectUpstreamPipelineMutationOptions = Apollo.BaseMutationOptions<DisconnectUpstreamPipelineMutation, DisconnectUpstreamPipelineMutationVariables>;
export const ConnectSourceDocument = gql`
    mutation connectSource($id: String!, $sourceId: String!) {
  connectSource(id: $id, sourceId: $sourceId) {
    id
    injectionPoints {
      id
    }
  }
}
    `;
export type ConnectSourceMutationFn = Apollo.MutationFunction<ConnectSourceMutation, ConnectSourceMutationVariables>;

/**
 * __useConnectSourceMutation__
 *
 * To run a mutation, you first call `useConnectSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectSourceMutation, { data, loading, error }] = useConnectSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      sourceId: // value for 'sourceId'
 *   },
 * });
 */
export function useConnectSourceMutation(baseOptions?: Apollo.MutationHookOptions<ConnectSourceMutation, ConnectSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectSourceMutation, ConnectSourceMutationVariables>(ConnectSourceDocument, options);
      }
export type ConnectSourceMutationHookResult = ReturnType<typeof useConnectSourceMutation>;
export type ConnectSourceMutationResult = Apollo.MutationResult<ConnectSourceMutation>;
export type ConnectSourceMutationOptions = Apollo.BaseMutationOptions<ConnectSourceMutation, ConnectSourceMutationVariables>;
export const DisconnectSourceDocument = gql`
    mutation disconnectSource($id: String!, $sourceId: String!) {
  disconnectSource(id: $id, sourceId: $sourceId) {
    id
    injectionPoints {
      id
    }
  }
}
    `;
export type DisconnectSourceMutationFn = Apollo.MutationFunction<DisconnectSourceMutation, DisconnectSourceMutationVariables>;

/**
 * __useDisconnectSourceMutation__
 *
 * To run a mutation, you first call `useDisconnectSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectSourceMutation, { data, loading, error }] = useDisconnectSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      sourceId: // value for 'sourceId'
 *   },
 * });
 */
export function useDisconnectSourceMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectSourceMutation, DisconnectSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectSourceMutation, DisconnectSourceMutationVariables>(DisconnectSourceDocument, options);
      }
export type DisconnectSourceMutationHookResult = ReturnType<typeof useDisconnectSourceMutation>;
export type DisconnectSourceMutationResult = Apollo.MutationResult<DisconnectSourceMutation>;
export type DisconnectSourceMutationOptions = Apollo.BaseMutationOptions<DisconnectSourceMutation, DisconnectSourceMutationVariables>;
export const EditPipelineDocument = gql`
    mutation EditPipeline($id: String!, $satelliteId: String, $license: String, $segment: String, $substance: SubstanceEnum, $from: String, $fromFeature: FromToFeatureEnum, $to: String, $toFeature: FromToFeatureEnum, $status: StatusEnum, $licenseDate: DateTime, $length: Float, $type: TypeEnum, $grade: GradeEnum, $yieldStrength: Int, $outsideDiameter: Float, $wallThickness: Float, $material: MaterialEnum, $mop: Int, $internalProtection: InternalProtectionEnum, $piggable: Boolean, $piggingFrequency: Int) {
  editPipeline(
    id: $id
    satelliteId: $satelliteId
    license: $license
    segment: $segment
    substance: $substance
    from: $from
    fromFeature: $fromFeature
    to: $to
    toFeature: $toFeature
    status: $status
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
    id
    license
    segment
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
 *      substance: // value for 'substance'
 *      from: // value for 'from'
 *      fromFeature: // value for 'fromFeature'
 *      to: // value for 'to'
 *      toFeature: // value for 'toFeature'
 *      status: // value for 'status'
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
export const EditPressureTestDocument = gql`
    mutation EditPressureTest($id: String!, $pipelineId: String, $limitingSpec: LimitingSpecEnum, $infoSentOutDate: DateTime, $ddsDate: DateTime, $pressureTestDate: DateTime, $pressureTestReceivedDate: DateTime, $integritySheetUpdated: DateTime, $comment: String) {
  editPressureTest(
    id: $id
    pipelineId: $pipelineId
    limitingSpec: $limitingSpec
    infoSentOutDate: $infoSentOutDate
    ddsDate: $ddsDate
    pressureTestDate: $pressureTestDate
    pressureTestReceivedDate: $pressureTestReceivedDate
    integritySheetUpdated: $integritySheetUpdated
    comment: $comment
  ) {
    id
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
 *      pipelineId: // value for 'pipelineId'
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
    id
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
    id
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
    mutation EditPigRun($id: String!, $pipelineId: String, $pigType: PigTypeEnum, $date: DateTime, $comment: String, $operatorId: String) {
  editPigRun(
    id: $id
    pipelineId: $pipelineId
    pigType: $pigType
    date: $date
    comment: $comment
    operatorId: $operatorId
  ) {
    id
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
 *      pipelineId: // value for 'pipelineId'
 *      pigType: // value for 'pigType'
 *      date: // value for 'date'
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
    id
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
    id
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
export const PipelinesByIdQueryDocument = gql`
    query pipelinesByIdQuery($satelliteId: String, $facilityId: String, $noSatellite: String) {
  pipelinesById(
    satelliteId: $satelliteId
    facilityId: $facilityId
    noSatellite: $noSatellite
  ) {
    id
    createdAt
    updatedAt
    createdBy {
      email
    }
    license
    segment
    substance
    from
    fromFeature
    to
    toFeature
    status
    licenseDate
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
    satellite {
      id
      facility {
        id
      }
    }
    injectionPoints {
      id
      source
      oil
      water
      gas
      firstProduction
      lastProduction
      firstInjection
      lastInjection
    }
    upstream {
      id
      license
      segment
    }
  }
}
    `;

/**
 * __usePipelinesByIdQueryQuery__
 *
 * To run a query within a React component, call `usePipelinesByIdQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelinesByIdQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelinesByIdQueryQuery({
 *   variables: {
 *      satelliteId: // value for 'satelliteId'
 *      facilityId: // value for 'facilityId'
 *      noSatellite: // value for 'noSatellite'
 *   },
 * });
 */
export function usePipelinesByIdQueryQuery(baseOptions?: Apollo.QueryHookOptions<PipelinesByIdQueryQuery, PipelinesByIdQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelinesByIdQueryQuery, PipelinesByIdQueryQueryVariables>(PipelinesByIdQueryDocument, options);
      }
export function usePipelinesByIdQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelinesByIdQueryQuery, PipelinesByIdQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelinesByIdQueryQuery, PipelinesByIdQueryQueryVariables>(PipelinesByIdQueryDocument, options);
        }
export type PipelinesByIdQueryQueryHookResult = ReturnType<typeof usePipelinesByIdQueryQuery>;
export type PipelinesByIdQueryLazyQueryHookResult = ReturnType<typeof usePipelinesByIdQueryLazyQuery>;
export type PipelinesByIdQueryQueryResult = Apollo.QueryResult<PipelinesByIdQueryQuery, PipelinesByIdQueryQueryVariables>;
export const PipelineByIdDocument = gql`
    query PipelineById($id: String!) {
  pipelineById(id: $id) {
    id
    license
    segment
    substance
    from
    fromFeature
    to
    toFeature
    status
    licenseDate
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
      email
    }
    createdAt
    updatedAt
    upstream {
      license
      segment
    }
    downstream {
      license
      segment
    }
    satellite {
      name
    }
    injectionPoints {
      source
    }
  }
}
    `;

/**
 * __usePipelineByIdQuery__
 *
 * To run a query within a React component, call `usePipelineByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePipelineByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelineByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePipelineByIdQuery(baseOptions: Apollo.QueryHookOptions<PipelineByIdQuery, PipelineByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PipelineByIdQuery, PipelineByIdQueryVariables>(PipelineByIdDocument, options);
      }
export function usePipelineByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PipelineByIdQuery, PipelineByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PipelineByIdQuery, PipelineByIdQueryVariables>(PipelineByIdDocument, options);
        }
export type PipelineByIdQueryHookResult = ReturnType<typeof usePipelineByIdQuery>;
export type PipelineByIdLazyQueryHookResult = ReturnType<typeof usePipelineByIdLazyQuery>;
export type PipelineByIdQueryResult = Apollo.QueryResult<PipelineByIdQuery, PipelineByIdQueryVariables>;
export const PipelineOptionsDocument = gql`
    query pipelineOptions {
  pipelineOptions {
    facility
    satellite
    substance
    id
    license
    segment
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
 *   },
 * });
 */
export function usePipelineOptionsQuery(baseOptions?: Apollo.QueryHookOptions<PipelineOptionsQuery, PipelineOptionsQueryVariables>) {
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
export const SourceOptionsDocument = gql`
    query sourceOptions {
  sourceOptions {
    facility
    satellite
    id
    source
  }
}
    `;

/**
 * __useSourceOptionsQuery__
 *
 * To run a query within a React component, call `useSourceOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSourceOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSourceOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSourceOptionsQuery(baseOptions?: Apollo.QueryHookOptions<SourceOptionsQuery, SourceOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SourceOptionsQuery, SourceOptionsQueryVariables>(SourceOptionsDocument, options);
      }
export function useSourceOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SourceOptionsQuery, SourceOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SourceOptionsQuery, SourceOptionsQueryVariables>(SourceOptionsDocument, options);
        }
export type SourceOptionsQueryHookResult = ReturnType<typeof useSourceOptionsQuery>;
export type SourceOptionsLazyQueryHookResult = ReturnType<typeof useSourceOptionsLazyQuery>;
export type SourceOptionsQueryResult = Apollo.QueryResult<SourceOptionsQuery, SourceOptionsQueryVariables>;
export const PigRunsByPipelineIdDocument = gql`
    query PigRunsByPipelineId($pipelineId: String) {
  pigRunsByPipelineId(pipelineId: $pipelineId) {
    id
    pigType
    date
    comment
    pipeline {
      license
      segment
    }
    operator {
      email
    }
    createdBy {
      email
    }
    createdAt
    updatedAt
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
export function usePigRunsByPipelineIdQuery(baseOptions?: Apollo.QueryHookOptions<PigRunsByPipelineIdQuery, PigRunsByPipelineIdQueryVariables>) {
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
export const ValidatorsPigRunDocument = gql`
    query ValidatorsPigRun {
  validators {
    pigTypeEnum {
      GSCR
      PSCR
      Foam
      Scrapper
    }
    anyTextMatchPattern
  }
}
    `;

/**
 * __useValidatorsPigRunQuery__
 *
 * To run a query within a React component, call `useValidatorsPigRunQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsPigRunQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsPigRunQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsPigRunQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsPigRunQuery, ValidatorsPigRunQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsPigRunQuery, ValidatorsPigRunQueryVariables>(ValidatorsPigRunDocument, options);
      }
export function useValidatorsPigRunLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsPigRunQuery, ValidatorsPigRunQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsPigRunQuery, ValidatorsPigRunQueryVariables>(ValidatorsPigRunDocument, options);
        }
export type ValidatorsPigRunQueryHookResult = ReturnType<typeof useValidatorsPigRunQuery>;
export type ValidatorsPigRunLazyQueryHookResult = ReturnType<typeof useValidatorsPigRunLazyQuery>;
export type ValidatorsPigRunQueryResult = Apollo.QueryResult<ValidatorsPigRunQuery, ValidatorsPigRunQueryVariables>;
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
      GSCR
      PSCR
      Foam
      Scrapper
    }
    limitingSpecEnum {
      ANSI150
      ANSI300
      ANSI600
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
export const ValidatorSubstanceDocument = gql`
    query validatorSubstance {
  validators {
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
 * __useValidatorSubstanceQuery__
 *
 * To run a query within a React component, call `useValidatorSubstanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorSubstanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorSubstanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorSubstanceQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorSubstanceQuery, ValidatorSubstanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorSubstanceQuery, ValidatorSubstanceQueryVariables>(ValidatorSubstanceDocument, options);
      }
export function useValidatorSubstanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorSubstanceQuery, ValidatorSubstanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorSubstanceQuery, ValidatorSubstanceQueryVariables>(ValidatorSubstanceDocument, options);
        }
export type ValidatorSubstanceQueryHookResult = ReturnType<typeof useValidatorSubstanceQuery>;
export type ValidatorSubstanceLazyQueryHookResult = ReturnType<typeof useValidatorSubstanceLazyQuery>;
export type ValidatorSubstanceQueryResult = Apollo.QueryResult<ValidatorSubstanceQuery, ValidatorSubstanceQueryVariables>;
export const ValidatorsPressureTestDocument = gql`
    query validatorsPressureTest {
  validators {
    limitingSpecEnum {
      ANSI150
      ANSI300
      ANSI600
    }
    anyTextMatchPattern
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
export const PressureTestsByPipelineIdDocument = gql`
    query PressureTestsByPipelineId($pipelineId: String) {
  pressureTestsByPipelineId(pipelineId: $pipelineId) {
    id
    pipeline {
      license
      segment
    }
    limitingSpec
    infoSentOutDate
    ddsDate
    pressureTestDate
    pressureTestReceivedDate
    integritySheetUpdated
    comment
    createdBy {
      email
    }
    createdAt
    updatedAt
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
export function usePressureTestsByPipelineIdQuery(baseOptions?: Apollo.QueryHookOptions<PressureTestsByPipelineIdQuery, PressureTestsByPipelineIdQueryVariables>) {
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
export const PipelineFlowDocument = gql`
    query PipelineFlow($pipelineFlowId: [String]!) {
  pipelineFlow(id: $pipelineFlowId) {
    id
    oil
    water
    gas
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
 *      pipelineFlowId: // value for 'pipelineFlowId'
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
export const SideBarDocument = gql`
    query SideBar {
  sideBar {
    facilityId
    facilityName
    satellites {
      satelliteId
      satelliteName
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
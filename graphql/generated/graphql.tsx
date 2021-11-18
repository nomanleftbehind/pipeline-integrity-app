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
  satellite?: Maybe<Satellite>;
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
  createFacility?: Maybe<Facility>;
  deleteInjectionPointFromPipeline?: Maybe<InjectionPoint>;
  deletePipeline?: Maybe<Pipeline>;
  deleteSatellite?: Maybe<Satellite>;
  duplicatePipeline?: Maybe<Pipeline>;
  editFacility?: Maybe<Facility>;
  editInjectionPoint?: Maybe<InjectionPoint>;
  editPipeline?: Maybe<Pipeline>;
  editSatellite?: Maybe<Satellite>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
};


export type MutationCreateFacilityArgs = {
  data: FacilityCreateInput;
};


export type MutationDeleteInjectionPointFromPipelineArgs = {
  id: Scalars['String'];
};


export type MutationDeletePipelineArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSatelliteArgs = {
  id: Scalars['String'];
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
  satelliteId?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['Float']>;
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

export type PipelineUniqueInput = {
  id?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
};

export type Query = {
  allFacilities?: Maybe<Array<Maybe<Facility>>>;
  allInjectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  allSatellites?: Maybe<Array<Maybe<Satellite>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  pipelineById?: Maybe<Pipeline>;
  pipelinesById?: Maybe<Array<Maybe<Pipeline>>>;
  pipelinesByUser?: Maybe<Array<Maybe<Pipeline>>>;
  validators?: Maybe<Validator>;
};


export type QueryPipelineByIdArgs = {
  id: Scalars['String'];
};


export type QueryPipelinesByIdArgs = {
  facilityId?: Maybe<Scalars['String']>;
  satelliteId?: Maybe<Scalars['String']>;
};


export type QueryPipelinesByUserArgs = {
  userUniqueInput: UserUniqueInput;
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
  injectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  name: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<Pipeline>>>;
  updatedAt: Scalars['DateTime'];
};

export type SatelliteCreateInput = {
  injectionPoints?: Maybe<Array<Maybe<InjectionPointCreateInput>>>;
  name: Scalars['String'];
  pipelines?: Maybe<Array<Maybe<PipelineCreateInput>>>;
};

export type SatelliteUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  fromToFeatureEnum: FromToFeatureEnumObject;
  fromToMatchPattern: Scalars['String'];
  gradeEnum: GradeEnumObject;
  internalProtectionEnum: InternalProtectionEnumObject;
  lengthMatchPattern: Scalars['String'];
  licenseMatchPattern: Scalars['String'];
  materialEnum: MaterialEnumObject;
  mopMatchPattern: Scalars['String'];
  outsideDiameterMatchPattern: Scalars['String'];
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

export type DeleteInjectionPointFromPipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteInjectionPointFromPipelineMutation = { deleteInjectionPointFromPipeline?: { id: string, source: string } | null | undefined };

export type ChangeInjectionPointToPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  pipelineId?: Maybe<Scalars['String']>;
}>;


export type ChangeInjectionPointToPipelineMutation = { editInjectionPoint?: { id: string, source: string, pipeline?: { id: string, license: string, segment: string } | null | undefined } | null | undefined };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, email: string, firstName: string, lastName: string, role: Role } | null | undefined };

export type PipelinesByIdQueryQueryVariables = Exact<{
  satelliteId?: Maybe<Scalars['String']>;
  facilityId?: Maybe<Scalars['String']>;
}>;


export type PipelinesByIdQueryQuery = { pipelinesById?: Array<{ id: string, createdAt: string, license: string, segment: string, substance: SubstanceEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status: StatusEnum, licenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, satellite?: { id: string, facility?: { id: string } | null | undefined } | null | undefined, injectionPoints?: Array<{ id: string, source: string, oil: number, gas: number, water: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type PipelineByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PipelineByIdQuery = { pipelineById?: { id: string, license: string, segment: string, substance: SubstanceEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status: StatusEnum, licenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, createdAt: string, updatedAt: string, createdBy: { email: string }, upstream?: Array<{ id: string, license: string, segment: string } | null | undefined> | null | undefined, downstream?: Array<{ id: string, license: string, segment: string } | null | undefined> | null | undefined, satellite?: { id: string, name: string } | null | undefined, injectionPoints?: Array<{ id: string, source: string } | null | undefined> | null | undefined } | null | undefined };

export type AllInjectionPointsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllInjectionPointsQueryQuery = { allInjectionPoints?: Array<{ id: string, source: string, pipeline?: { id: string, license: string, segment: string } | null | undefined, satellite?: { id: string, name: string, facility?: { id: string, name: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type GetValidatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValidatorsQuery = { validators?: { licenseMatchPattern: string, segmentMatchPattern: string, fromToMatchPattern: string, lengthMatchPattern: string, yieldStrengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string }, fromToFeatureEnum: { BlindEnd: string, Battery: string, Pipeline: string, Satellite: string, StorageTank: string, InjectionPlant: string, Well: string, CompressorStation: string, MeterStation: string, PumpStation: string, GasProcessingPlant: string, UndergroundCapOrTieIn: string, Header: string }, statusEnum: { Operating: string, Discontinued: string, Abandoned: string, Removed: string, ToBeConstructed: string, Active: string, Cancelled: string, New: string, NotConstructed: string }, typeEnum: { Type515: string, Type2306: string, Type3406: string, Type3408: string, Type6063: string, Type6351: string, Type5A: string, Type5L: string, Type5LX: string, TypeA106: string, TypeA120: string, TypeA53: string, TypeAMERON: string, TypeB515: string, TypeB51S: string, TypeB5IS: string, TypeCENTRON: string, TypeCIBA: string, TypeFSLP: string, TypeREDTHR: string, TypeSMITH: string, TypeSTAR: string, TypeTBS: string, TypeWSLP: string, TypeZ2451: string, TypeZ2453: string }, gradeEnum: { GradeA: string, Grade3592: string, GradeB: string, GradeX42: string, GradeBW1: string, Grade2500: string, Grade3591: string, Grade2901: string, GradeT4: string, Grade300: string, Grade3593: string, Grade11: string, GradeJ55: string, Grade2250: string, GradeX52: string, Grade2750: string, Grade2902: string, Grade25: string, Grade241: string, Grade2413: string, Grade2411: string, Grade155: string, Grade150: string, Grade1000: string, Grade800: string, GradeT1A: string, Grade2010: string, GradeT4A: string, Grade1250: string, Grade17: string, Grade900: string, GradeT1B: string, Grade810: string, Grade35: string, Grade5: string, Grade9: string, Grade200: string, Grade1200: string, Grade1103: string }, materialEnum: { Steel: string, PolyvinylChloride: string, Composite: string, Fiberglass: string, Aluminum: string, Polyethylene: string, CelluloseAcetateButyrate: string, Unknown: string, AsbestosCement: string }, internalProtectionEnum: { Uncoated: string, FreeStandingSlipLined: string, Unknown: string, Cement: string, ExpandedPolyethylene: string, ThinFilm: string } } | null | undefined };

export type FacilitiesSideBarQueryVariables = Exact<{ [key: string]: never; }>;


export type FacilitiesSideBarQuery = { allFacilities?: Array<{ id: string, name: string, satellites?: Array<{ id: string, name: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined };


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
export const DeleteInjectionPointFromPipelineDocument = gql`
    mutation deleteInjectionPointFromPipeline($id: String!) {
  deleteInjectionPointFromPipeline(id: $id) {
    id
    source
  }
}
    `;
export type DeleteInjectionPointFromPipelineMutationFn = Apollo.MutationFunction<DeleteInjectionPointFromPipelineMutation, DeleteInjectionPointFromPipelineMutationVariables>;

/**
 * __useDeleteInjectionPointFromPipelineMutation__
 *
 * To run a mutation, you first call `useDeleteInjectionPointFromPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInjectionPointFromPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInjectionPointFromPipelineMutation, { data, loading, error }] = useDeleteInjectionPointFromPipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInjectionPointFromPipelineMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInjectionPointFromPipelineMutation, DeleteInjectionPointFromPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInjectionPointFromPipelineMutation, DeleteInjectionPointFromPipelineMutationVariables>(DeleteInjectionPointFromPipelineDocument, options);
      }
export type DeleteInjectionPointFromPipelineMutationHookResult = ReturnType<typeof useDeleteInjectionPointFromPipelineMutation>;
export type DeleteInjectionPointFromPipelineMutationResult = Apollo.MutationResult<DeleteInjectionPointFromPipelineMutation>;
export type DeleteInjectionPointFromPipelineMutationOptions = Apollo.BaseMutationOptions<DeleteInjectionPointFromPipelineMutation, DeleteInjectionPointFromPipelineMutationVariables>;
export const ChangeInjectionPointToPipelineDocument = gql`
    mutation changeInjectionPointToPipeline($id: String!, $pipelineId: String) {
  editInjectionPoint(id: $id, pipelineId: $pipelineId) {
    id
    source
    pipeline {
      id
      license
      segment
    }
  }
}
    `;
export type ChangeInjectionPointToPipelineMutationFn = Apollo.MutationFunction<ChangeInjectionPointToPipelineMutation, ChangeInjectionPointToPipelineMutationVariables>;

/**
 * __useChangeInjectionPointToPipelineMutation__
 *
 * To run a mutation, you first call `useChangeInjectionPointToPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeInjectionPointToPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeInjectionPointToPipelineMutation, { data, loading, error }] = useChangeInjectionPointToPipelineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useChangeInjectionPointToPipelineMutation(baseOptions?: Apollo.MutationHookOptions<ChangeInjectionPointToPipelineMutation, ChangeInjectionPointToPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeInjectionPointToPipelineMutation, ChangeInjectionPointToPipelineMutationVariables>(ChangeInjectionPointToPipelineDocument, options);
      }
export type ChangeInjectionPointToPipelineMutationHookResult = ReturnType<typeof useChangeInjectionPointToPipelineMutation>;
export type ChangeInjectionPointToPipelineMutationResult = Apollo.MutationResult<ChangeInjectionPointToPipelineMutation>;
export type ChangeInjectionPointToPipelineMutationOptions = Apollo.BaseMutationOptions<ChangeInjectionPointToPipelineMutation, ChangeInjectionPointToPipelineMutationVariables>;
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
    query pipelinesByIdQuery($satelliteId: String, $facilityId: String) {
  pipelinesById(satelliteId: $satelliteId, facilityId: $facilityId) {
    id
    createdAt
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
      gas
      water
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
      id
      license
      segment
    }
    downstream {
      id
      license
      segment
    }
    satellite {
      id
      name
    }
    injectionPoints {
      id
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
export const AllInjectionPointsQueryDocument = gql`
    query allInjectionPointsQuery {
  allInjectionPoints {
    id
    source
    pipeline {
      id
      license
      segment
    }
    satellite {
      id
      name
      facility {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useAllInjectionPointsQueryQuery__
 *
 * To run a query within a React component, call `useAllInjectionPointsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllInjectionPointsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllInjectionPointsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllInjectionPointsQueryQuery(baseOptions?: Apollo.QueryHookOptions<AllInjectionPointsQueryQuery, AllInjectionPointsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllInjectionPointsQueryQuery, AllInjectionPointsQueryQueryVariables>(AllInjectionPointsQueryDocument, options);
      }
export function useAllInjectionPointsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllInjectionPointsQueryQuery, AllInjectionPointsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllInjectionPointsQueryQuery, AllInjectionPointsQueryQueryVariables>(AllInjectionPointsQueryDocument, options);
        }
export type AllInjectionPointsQueryQueryHookResult = ReturnType<typeof useAllInjectionPointsQueryQuery>;
export type AllInjectionPointsQueryLazyQueryHookResult = ReturnType<typeof useAllInjectionPointsQueryLazyQuery>;
export type AllInjectionPointsQueryQueryResult = Apollo.QueryResult<AllInjectionPointsQueryQuery, AllInjectionPointsQueryQueryVariables>;
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
export const FacilitiesSideBarDocument = gql`
    query FacilitiesSideBar {
  allFacilities {
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
 * __useFacilitiesSideBarQuery__
 *
 * To run a query within a React component, call `useFacilitiesSideBarQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacilitiesSideBarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFacilitiesSideBarQuery({
 *   variables: {
 *   },
 * });
 */
export function useFacilitiesSideBarQuery(baseOptions?: Apollo.QueryHookOptions<FacilitiesSideBarQuery, FacilitiesSideBarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FacilitiesSideBarQuery, FacilitiesSideBarQueryVariables>(FacilitiesSideBarDocument, options);
      }
export function useFacilitiesSideBarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FacilitiesSideBarQuery, FacilitiesSideBarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FacilitiesSideBarQuery, FacilitiesSideBarQueryVariables>(FacilitiesSideBarDocument, options);
        }
export type FacilitiesSideBarQueryHookResult = ReturnType<typeof useFacilitiesSideBarQuery>;
export type FacilitiesSideBarLazyQueryHookResult = ReturnType<typeof useFacilitiesSideBarLazyQuery>;
export type FacilitiesSideBarQueryResult = Apollo.QueryResult<FacilitiesSideBarQuery, FacilitiesSideBarQueryVariables>;
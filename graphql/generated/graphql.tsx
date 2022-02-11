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
  user?: Maybe<User>;
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
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
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

export type InjectionPoint = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  gas: Scalars['Float'];
  gasAssociatedLiquids: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil: Scalars['Float'];
  pipeline?: Maybe<Pipeline>;
  pvNodeId?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  totalFluids: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
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

export type LicenseChange = {
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
  addLicenseChange?: Maybe<LicenseChange>;
  addPigRun?: Maybe<PigRun>;
  addPressureTest?: Maybe<PressureTest>;
  addRisk?: Maybe<Risk>;
  connectPipeline?: Maybe<Pipeline>;
  connectSource?: Maybe<Pipeline>;
  createFacility?: Maybe<Facility>;
  deleteLicenseChange?: Maybe<LicenseChange>;
  deletePigRun?: Maybe<PigRun>;
  deletePipeline?: Maybe<Pipeline>;
  deletePressureTest?: Maybe<PressureTest>;
  deleteRisk?: Maybe<Risk>;
  deleteSatellite?: Maybe<Satellite>;
  disconnectPipeline?: Maybe<Pipeline>;
  disconnectSource?: Maybe<Pipeline>;
  duplicatePipeline?: Maybe<Pipeline>;
  editFacility?: Maybe<Facility>;
  editInjectionPoint?: Maybe<InjectionPoint>;
  editLicenseChange?: Maybe<LicenseChange>;
  editPigRun?: Maybe<PigRun>;
  editPipeline?: Maybe<Pipeline>;
  editPressureTest?: Maybe<PressureTest>;
  editRisk?: Maybe<Risk>;
  editSatellite?: Maybe<Satellite>;
  login?: Maybe<AuthPayload>;
  logout?: Maybe<Scalars['String']>;
  signup?: Maybe<AuthPayload>;
};


export type MutationAddLicenseChangeArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddPigRunArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddPressureTestArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddRiskArgs = {
  id: Scalars['String'];
};


export type MutationConnectPipelineArgs = {
  connectPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
};


export type MutationConnectSourceArgs = {
  id: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationCreateFacilityArgs = {
  data: FacilityCreateInput;
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


export type MutationDeletePressureTestArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRiskArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSatelliteArgs = {
  id: Scalars['String'];
};


export type MutationDisconnectPipelineArgs = {
  disconnectPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
};


export type MutationDisconnectSourceArgs = {
  id: Scalars['String'];
  sourceId: Scalars['String'];
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
  source?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['Float']>;
};


export type MutationEditLicenseChangeArgs = {
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  linkToDocumentation?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
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


export type MutationEditRiskArgs = {
  arielReview?: Maybe<Scalars['Boolean']>;
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
  probabilityGeo?: Maybe<Scalars['Float']>;
  releaseTimeDays?: Maybe<Scalars['Int']>;
  repairTimeDays?: Maybe<Scalars['Int']>;
  riskPeople?: Maybe<Scalars['Int']>;
  safeguardExternalCoating?: Maybe<Scalars['Boolean']>;
  safeguardInternalProtection?: Maybe<Scalars['Boolean']>;
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
  userCreateInput: UserCreateInput;
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
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  dateIn: Scalars['DateTime'];
  dateOut?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  operator?: Maybe<User>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
  pigType?: Maybe<PigTypeEnum>;
  pipeline: Pipeline;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export enum PigTypeEnum {
  Ball = 'Ball',
  Blue3inscraper = 'Blue3inscraper',
  BlueRibbed = 'BlueRibbed',
  Foam = 'Foam',
  Gscr = 'GSCR',
  Highline = 'Highline',
  MDFoamy = 'M_D_Foamy',
  NoSender = 'NoSender',
  PigType2green2disc = 'PigType2green2disc',
  PigType2inGscr = 'PigType2inGSCR',
  PigType2inGscrGfp = 'PigType2inGSCR_GFP',
  PigType2inPscr = 'PigType2inPSCR',
  PigType2inPscrFlm = 'PigType2inPSCR_FLM',
  PigType2inPurpleDisc = 'PigType2inPurpleDisc',
  PigType2ingscr = 'PigType2ingscr',
  PigType2purple2disc = 'PigType2purple2disc',
  PigType3 = 'PigType3',
  PigType3BlueRibbed = 'PigType3BlueRibbed',
  PigType3BrownRibbed = 'PigType3BrownRibbed',
  PigType3GreenRibbed = 'PigType3GreenRibbed',
  PigType3Scrapper = 'PigType3_scrapper',
  PigType3inArgus = 'PigType3inARGUS',
  PigType3inArgus = 'PigType3inArgus',
  PigType3inBlueRibbed = 'PigType3inBlueRibbed',
  PigType3inGscr = 'PigType3inGSCR',
  PigType3inGreenDisc = 'PigType3inGreenDisc',
  PigType3inGreenRibbed = 'PigType3inGreenRibbed',
  PigType3inGscr = 'PigType3inGscr',
  PigType3inPscr = 'PigType3inPSCR',
  PigType3inPurpleScraper = 'PigType3inPurpleScraper',
  PigType3inPurpleStubby = 'PigType3inPurpleStubby',
  PigType3inRscr = 'PigType3inRscr',
  PigType3inScraper = 'PigType3inSCRAPER',
  PigType3inStubby = 'PigType3inStubby',
  PigType3inbluescraper = 'PigType3inbluescraper',
  PigType3ingreendisc = 'PigType3ingreendisc',
  PigType3inpurple2disc = 'PigType3inpurple2disc',
  PigType3inpurpledisc = 'PigType3inpurpledisc',
  PigType3inredscrape = 'PigType3inredscrape',
  PigType3inscapper = 'PigType3inscapper',
  PigType3inscr = 'PigType3inscr',
  PigType3inscraper = 'PigType3inscraper',
  PigType3inscrapper = 'PigType3inscrapper',
  PigType4GreenRibbed = 'PigType4_GreenRibbed',
  PigType4gree2disc = 'PigType4gree2disc',
  PigType4green2disc = 'PigType4green2disc',
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
  PigType6ingreenscraper = 'PigType6ingreenscraper',
  PigType6inscrapper = 'PigType6inscrapper',
  PigType8inBlackDisc = 'PigType8inBlackDisc',
  PigType8inFoam = 'PigType8inFoam',
  Purple3inDisc = 'Purple3inDisc',
  Reverseflowduetotaqa = 'REVERSEFLOWDUETOTAQA',
  Red3inscraper = 'Red3inscraper',
  Red4inscraper = 'Red4inscraper',
  RedStubby = 'RedStubby',
  Simay2018 = 'SIMAY2018',
  SiGoingtotaqa = 'SI_GOINGTOTAQA',
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
  Torpedo = 'Torpedo',
  Bullet = 'bullet',
  Disc = 'disc'
}

export type PigTypeEnumObject = {
  Ball: Scalars['String'];
  Blue3inscraper: Scalars['String'];
  BlueRibbed: Scalars['String'];
  Foam: Scalars['String'];
  GSCR: Scalars['String'];
  Highline: Scalars['String'];
  M_D_Foamy: Scalars['String'];
  NoSender: Scalars['String'];
  PigType2green2disc: Scalars['String'];
  PigType2inGSCR: Scalars['String'];
  PigType2inGSCR_GFP: Scalars['String'];
  PigType2inPSCR: Scalars['String'];
  PigType2inPSCR_FLM: Scalars['String'];
  PigType2inPurpleDisc: Scalars['String'];
  PigType2ingscr: Scalars['String'];
  PigType2purple2disc: Scalars['String'];
  PigType3: Scalars['String'];
  PigType3BlueRibbed: Scalars['String'];
  PigType3BrownRibbed: Scalars['String'];
  PigType3GreenRibbed: Scalars['String'];
  PigType3_scrapper: Scalars['String'];
  PigType3inARGUS: Scalars['String'];
  PigType3inArgus: Scalars['String'];
  PigType3inBlueRibbed: Scalars['String'];
  PigType3inGSCR: Scalars['String'];
  PigType3inGreenDisc: Scalars['String'];
  PigType3inGreenRibbed: Scalars['String'];
  PigType3inGscr: Scalars['String'];
  PigType3inPSCR: Scalars['String'];
  PigType3inPurpleScraper: Scalars['String'];
  PigType3inPurpleStubby: Scalars['String'];
  PigType3inRscr: Scalars['String'];
  PigType3inSCRAPER: Scalars['String'];
  PigType3inStubby: Scalars['String'];
  PigType3inbluescraper: Scalars['String'];
  PigType3ingreendisc: Scalars['String'];
  PigType3inpurple2disc: Scalars['String'];
  PigType3inpurpledisc: Scalars['String'];
  PigType3inredscrape: Scalars['String'];
  PigType3inscapper: Scalars['String'];
  PigType3inscr: Scalars['String'];
  PigType3inscraper: Scalars['String'];
  PigType3inscrapper: Scalars['String'];
  PigType4_GreenRibbed: Scalars['String'];
  PigType4gree2disc: Scalars['String'];
  PigType4green2disc: Scalars['String'];
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
  PigType6ingreenscraper: Scalars['String'];
  PigType6inscrapper: Scalars['String'];
  PigType8inBlackDisc: Scalars['String'];
  PigType8inFoam: Scalars['String'];
  Purple3inDisc: Scalars['String'];
  REVERSEFLOWDUETOTAQA: Scalars['String'];
  Red3inscraper: Scalars['String'];
  Red4inscraper: Scalars['String'];
  RedStubby: Scalars['String'];
  SIMAY2018: Scalars['String'];
  SI_GOINGTOTAQA: Scalars['String'];
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
  Torpedo: Scalars['String'];
  bullet: Scalars['String'];
  disc: Scalars['String'];
};

export type Pipeline = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  downstream?: Maybe<Array<Maybe<Pipeline>>>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  from: Scalars['String'];
  fromFeature?: Maybe<FromToFeatureEnum>;
  grade?: Maybe<GradeEnum>;
  id: Scalars['String'];
  injectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  internalProtection?: Maybe<InternalProtectionEnum>;
  length: Scalars['Float'];
  license: Scalars['String'];
  licenseChanges?: Maybe<Array<Maybe<LicenseChange>>>;
  licenseDate?: Maybe<Scalars['DateTime']>;
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  pigRuns?: Maybe<Array<Maybe<PigRun>>>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
  pressureTests?: Maybe<Array<Maybe<PressureTest>>>;
  risk?: Maybe<Risk>;
  satellite?: Maybe<Satellite>;
  segment: Scalars['String'];
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
  to: Scalars['String'];
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
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
  gasAssociatedLiquids: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  oil: Scalars['Float'];
  totalFluids: Scalars['Float'];
  water: Scalars['Float'];
};

export type PipelineOptions = {
  facility: Scalars['String'];
  id: Scalars['String'];
  license: Scalars['String'];
  satellite: Scalars['String'];
  segment: Scalars['String'];
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
  updatedBy: User;
};

export type Query = {
  allFacilities?: Maybe<Array<Maybe<Facility>>>;
  allInjectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  allSatellites?: Maybe<Array<Maybe<Satellite>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  licenseChangesByPipelineId?: Maybe<Array<Maybe<LicenseChange>>>;
  me?: Maybe<User>;
  pigRunsByPipelineId?: Maybe<Array<Maybe<PigRun>>>;
  pipelineById?: Maybe<Pipeline>;
  pipelineFlow?: Maybe<Array<Maybe<PipelineFlow>>>;
  pipelineOptions?: Maybe<Array<Maybe<PipelineOptions>>>;
  pipelinesById?: Maybe<Array<Maybe<Pipeline>>>;
  pipelinesByUser?: Maybe<Array<Maybe<Pipeline>>>;
  pressureTestsByPipelineId?: Maybe<Array<Maybe<PressureTest>>>;
  riskById?: Maybe<Risk>;
  sideBar?: Maybe<Array<Maybe<SideBar>>>;
  sourceOptions?: Maybe<Array<Maybe<SourceOptions>>>;
  validators?: Maybe<Validator>;
};


export type QueryLicenseChangesByPipelineIdArgs = {
  pipelineId?: Maybe<Scalars['String']>;
};


export type QueryPigRunsByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryPipelineByIdArgs = {
  id: Scalars['String'];
};


export type QueryPipelineFlowArgs = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  idList: Array<Maybe<Scalars['String']>>;
};


export type QueryPipelinesByIdArgs = {
  id?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['String']>;
};


export type QueryPipelinesByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryPressureTestsByPipelineIdArgs = {
  pipelineId?: Maybe<Scalars['String']>;
};


export type QueryRiskByIdArgs = {
  id: Scalars['String'];
};

export type Risk = {
  arielReview?: Maybe<Scalars['Boolean']>;
  assetRisk?: Maybe<Scalars['Int']>;
  costPerM3Released?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  dateSlopeChecked?: Maybe<Scalars['DateTime']>;
  enviroRisk?: Maybe<Scalars['Int']>;
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
  probabilityGeo?: Maybe<Scalars['Float']>;
  probabilityInterior?: Maybe<Scalars['Int']>;
  releaseTimeDays?: Maybe<Scalars['Int']>;
  repairTimeDays?: Maybe<Scalars['Int']>;
  riskPeople?: Maybe<Scalars['Int']>;
  safeguardExternalCoating?: Maybe<Scalars['Boolean']>;
  safeguardInternalProtection?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};


export type RiskAssetRiskArgs = {
  gas?: Maybe<Scalars['Float']>;
  oil?: Maybe<Scalars['Float']>;
  water?: Maybe<Scalars['Float']>;
};


export type RiskCostPerM3ReleasedArgs = {
  gas?: Maybe<Scalars['Float']>;
  oil?: Maybe<Scalars['Float']>;
  substance?: Maybe<SubstanceEnum>;
  water?: Maybe<Scalars['Float']>;
};


export type RiskEnviroRiskArgs = {
  gas?: Maybe<Scalars['Float']>;
  oil?: Maybe<Scalars['Float']>;
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
  water?: Maybe<Scalars['Float']>;
};


export type RiskProbabilityInteriorArgs = {
  material?: Maybe<MaterialEnum>;
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
  type?: Maybe<TypeEnum>;
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
  injectionPoints?: Maybe<Array<Maybe<InjectionPointCreateInput>>>;
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

export type SideBar = {
  id: Scalars['String'];
  name: Scalars['String'];
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
  facilitiesCreated?: Maybe<Array<Maybe<Facility>>>;
  facilitiesUpdated?: Maybe<Array<Maybe<Facility>>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  injectionPointsCreated?: Maybe<Array<Maybe<InjectionPoint>>>;
  injectionPointsUpdated?: Maybe<Array<Maybe<InjectionPoint>>>;
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
};

export type UserCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<UserRoleEnum>;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Contractor = 'CONTRACTOR',
  User = 'USER'
}

export type UserRoleEnumObject = {
  ADMIN: Scalars['String'];
  CONTRACTOR: Scalars['String'];
  USER: Scalars['String'];
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
  internalProtectionEnum: InternalProtectionEnumObject;
  lengthMatchPattern: Scalars['String'];
  licenseMatchPattern: Scalars['String'];
  limitingSpecEnum: LimitingSpecEnumObject;
  materialEnum: MaterialEnumObject;
  mopMatchPattern: Scalars['String'];
  outsideDiameterMatchPattern: Scalars['String'];
  pigInspectionEnum: PigInspectionEnumObject;
  pigTypeEnum: PigTypeEnumObject;
  segmentMatchPattern: Scalars['String'];
  statusEnum: StatusEnumObject;
  substanceEnum: SubstanceEnumObject;
  typeEnum: TypeEnumObject;
  userRoleEnum: UserRoleEnumObject;
  wallThicknessMatchPattern: Scalars['String'];
  yieldStrengthMatchPattern: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, errors?: Array<{ field?: string | null | undefined, message?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type SignupMutationVariables = Exact<{
  userCreateInput: UserCreateInput;
}>;


export type SignupMutation = { signup?: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, errors?: Array<{ field?: string | null | undefined, message?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type DeletePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePipelineMutation = { deletePipeline?: { id: string, license: string, segment: string } | null | undefined };

export type DuplicatePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicatePipelineMutation = { duplicatePipeline?: { id: string, license: string, segment: string } | null | undefined };

export type ConnectPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  connectPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type ConnectPipelineMutation = { connectPipeline?: { id: string } | null | undefined };

export type DisconnectPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  disconnectPipelineId: Scalars['String'];
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type DisconnectPipelineMutation = { disconnectPipeline?: { id: string } | null | undefined };

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
  pigType?: Maybe<PigTypeEnum>;
  dateIn?: Maybe<Scalars['DateTime']>;
  dateOut?: Maybe<Scalars['DateTime']>;
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
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

export type EditRiskMutationVariables = Exact<{
  id: Scalars['String'];
  arielReview?: Maybe<Scalars['Boolean']>;
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
  riskPeople?: Maybe<Scalars['Int']>;
  probabilityGeo?: Maybe<Scalars['Float']>;
  safeguardInternalProtection?: Maybe<Scalars['Boolean']>;
  safeguardExternalCoating?: Maybe<Scalars['Boolean']>;
}>;


export type EditRiskMutation = { editRisk?: { id: string } | null | undefined };

export type AddRiskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddRiskMutation = { addRisk?: { id: string } | null | undefined };

export type DeleteRiskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRiskMutation = { deleteRisk?: { id: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined };

export type PipelinesByIdQueryQueryVariables = Exact<{
  table?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
}>;


export type PipelinesByIdQueryQuery = { pipelinesById?: Array<{ id: string, license: string, segment: string, substance?: SubstanceEnum | null | undefined, flowCalculationDirection: FlowCalculationDirectionEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status?: StatusEnum | null | undefined, licenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, createdAt: string, updatedAt: string, satellite?: { id: string, facility?: { id: string } | null | undefined } | null | undefined, injectionPoints?: Array<{ id: string, source: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined> | null | undefined, upstream?: Array<{ id: string, license: string, segment: string } | null | undefined> | null | undefined, createdBy: { email: string }, updatedBy: { email: string } } | null | undefined> | null | undefined };

export type PipelineByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PipelineByIdQuery = { pipelineById?: { id: string, license: string, segment: string, substance?: SubstanceEnum | null | undefined, flowCalculationDirection: FlowCalculationDirectionEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status?: StatusEnum | null | undefined, licenseDate?: string | null | undefined, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, createdAt: string, updatedAt: string, createdBy: { email: string }, updatedBy: { email: string }, upstream?: Array<{ license: string, segment: string } | null | undefined> | null | undefined, downstream?: Array<{ license: string, segment: string } | null | undefined> | null | undefined, satellite?: { name: string } | null | undefined, injectionPoints?: Array<{ source: string } | null | undefined> | null | undefined } | null | undefined };

export type PipelineOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PipelineOptionsQuery = { pipelineOptions?: Array<{ facility: string, satellite: string, id: string, license: string, segment: string } | null | undefined> | null | undefined };

export type SourceOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SourceOptionsQuery = { sourceOptions?: Array<{ facility: string, satellite: string, id: string, source: string } | null | undefined> | null | undefined };

export type PigRunsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PigRunsByPipelineIdQuery = { pigRunsByPipelineId?: Array<{ id: string, pigType?: PigTypeEnum | null | undefined, dateIn: string, dateOut?: string | null | undefined, isolationValveFunctionTest?: PigInspectionEnum | null | undefined, pigSenderReceiverInspection?: PigInspectionEnum | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, operator?: { email: string } | null | undefined, createdBy: { email: string }, updatedBy: { email: string } } | null | undefined> | null | undefined };

export type ValidatorsPigRunQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPigRunQuery = { validators?: { anyTextMatchPattern: string, pigTypeEnum: { Scrapper: string, PigType4inArgus: string, PigType6inArgus: string, ScraperP400: string, PigType3inPurpleScraper: string, ScraperP304: string, PigType3inscapper: string, PigType3inscrapper: string, PigType3inscraper: string, Foam: string, RedStubby: string, PigType3inGSCR: string, PigType2inGSCR: string, NoSender: string, PigType2ingscr: string, PigType2inGSCR_GFP: string, PigType4inGSCR: string, PigType2inPSCR_FLM: string, PigType3inPSCR: string, Highline: string, PigType2inPSCR: string, PigType3_scrapper: string, ScraperP401: string, ScraperP300: string, ScraperP301: string, ScraperP309: string, ScraperP314: string, ScaperP314: string, ScaperPP309: string, ScraperP204: string, ScraperP208: string, PigType3inArgus: string, Ball: string, REVERSEFLOWDUETOTAQA: string, PigType3: string, SIMAY2018: string, ScraperP206: string, ScraperP200: string, PigType3inRscr: string, PigType3inPurpleStubby: string, PigType3inSCRAPER: string, Red3inscraper: string, PigType3inGreenDisc: string, PigType4inGreenDisc: string, PigType4green2disc: string, PigType4gree2disc: string, PigType3ingreendisc: string, PigType3inpurpledisc: string, PigType2inPurpleDisc: string, disc: string, PigType2purple2disc: string, Shutin: string, PigType3inpurple2disc: string, PigType2green2disc: string, bullet: string, PigType8inFoam: string, PigType3inscr: string, ScraperP305: string, ScraperP312: string, ScraperP303: string, ScraperP311: string, ScrapperP307: string, PigType4inpurplescraper: string, Torpedo: string, PigType3BrownRibbed: string, PigType3GreenRibbed: string, PigType3inBlueRibbed: string, PigType3inGreenRibbed: string, PigType3BlueRibbed: string, BlueRibbed: string, M_D_Foamy: string, PigType6inGreenRibbed: string, SI_GOINGTOTAQA: string, Red4inscraper: string, Blue3inscraper: string, PigType3inARGUS: string, PigType4inBlueDisc: string, PigType8inBlackDisc: string, PigType4inGreendisc: string, PigType6inGreenDisc: string, PigType6inscrapper: string, PigType4inscrapper: string, PigType4inFoam: string, PigType3inredscrape: string, GSCR: string, PigType3inStubby: string, PigType4_GreenRibbed: string, PigType3inbluescraper: string, PigType6ingreenscraper: string, Purple3inDisc: string, PigType3inGscr: string }, pigInspectionEnum: { Failed: string, Good: string } } | null | undefined };

export type GetValidatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValidatorsQuery = { validators?: { licenseMatchPattern: string, segmentMatchPattern: string, fromToMatchPattern: string, lengthMatchPattern: string, yieldStrengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string }, fromToFeatureEnum: { BlindEnd: string, Battery: string, Pipeline: string, Satellite: string, StorageTank: string, InjectionPlant: string, Well: string, CompressorStation: string, MeterStation: string, PumpStation: string, GasProcessingPlant: string, UndergroundCapOrTieIn: string, Header: string }, statusEnum: { Operating: string, Discontinued: string, Abandoned: string, Removed: string, ToBeConstructed: string, Active: string, Cancelled: string, New: string, NotConstructed: string }, typeEnum: { Type515: string, Type2306: string, Type3406: string, Type3408: string, Type6063: string, Type6351: string, Type5A: string, Type5L: string, Type5LX: string, TypeA106: string, TypeA120: string, TypeA53: string, TypeAMERON: string, TypeB515: string, TypeB51S: string, TypeB5IS: string, TypeCENTRON: string, TypeCIBA: string, TypeFSLP: string, TypeREDTHR: string, TypeSMITH: string, TypeSTAR: string, TypeTBS: string, TypeWSLP: string, TypeZ2451: string, TypeZ2453: string }, gradeEnum: { GradeA: string, Grade3592: string, GradeB: string, GradeX42: string, GradeBW1: string, Grade2500: string, Grade3591: string, Grade2901: string, GradeT4: string, Grade300: string, Grade3593: string, Grade11: string, GradeJ55: string, Grade2250: string, GradeX52: string, Grade2750: string, Grade2902: string, Grade25: string, Grade241: string, Grade2413: string, Grade2411: string, Grade155: string, Grade150: string, Grade1000: string, Grade800: string, GradeT1A: string, Grade2010: string, GradeT4A: string, Grade1250: string, Grade17: string, Grade900: string, GradeT1B: string, Grade810: string, Grade35: string, Grade5: string, Grade9: string, Grade200: string, Grade1200: string, Grade1103: string }, materialEnum: { Steel: string, PolyvinylChloride: string, Composite: string, Fiberglass: string, Aluminum: string, Polyethylene: string, CelluloseAcetateButyrate: string, Unknown: string, AsbestosCement: string }, internalProtectionEnum: { Uncoated: string, FreeStandingSlipLined: string, Unknown: string, Cement: string, ExpandedPolyethylene: string, ThinFilm: string }, pigTypeEnum: { Scrapper: string, PigType4inArgus: string, PigType6inArgus: string, ScraperP400: string, PigType3inPurpleScraper: string, ScraperP304: string, PigType3inscapper: string, PigType3inscrapper: string, PigType3inscraper: string, Foam: string, RedStubby: string, PigType3inGSCR: string, PigType2inGSCR: string, NoSender: string, PigType2ingscr: string, PigType2inGSCR_GFP: string, PigType4inGSCR: string, PigType2inPSCR_FLM: string, PigType3inPSCR: string, Highline: string, PigType2inPSCR: string, PigType3_scrapper: string, ScraperP401: string, ScraperP300: string, ScraperP301: string, ScraperP309: string, ScraperP314: string, ScaperP314: string, ScaperPP309: string, ScraperP204: string, ScraperP208: string, PigType3inArgus: string, Ball: string, REVERSEFLOWDUETOTAQA: string, PigType3: string, SIMAY2018: string, ScraperP206: string, ScraperP200: string, PigType3inRscr: string, PigType3inPurpleStubby: string, PigType3inSCRAPER: string, Red3inscraper: string, PigType3inGreenDisc: string, PigType4inGreenDisc: string, PigType4green2disc: string, PigType4gree2disc: string, PigType3ingreendisc: string, PigType3inpurpledisc: string, PigType2inPurpleDisc: string, disc: string, PigType2purple2disc: string, Shutin: string, PigType3inpurple2disc: string, PigType2green2disc: string, bullet: string, PigType8inFoam: string, PigType3inscr: string, ScraperP305: string, ScraperP312: string, ScraperP303: string, ScraperP311: string, ScrapperP307: string, PigType4inpurplescraper: string, Torpedo: string, PigType3BrownRibbed: string, PigType3GreenRibbed: string, PigType3inBlueRibbed: string, PigType3inGreenRibbed: string, PigType3BlueRibbed: string, BlueRibbed: string, M_D_Foamy: string, PigType6inGreenRibbed: string, SI_GOINGTOTAQA: string, Red4inscraper: string, Blue3inscraper: string, PigType3inARGUS: string, PigType4inBlueDisc: string, PigType8inBlackDisc: string, PigType4inGreendisc: string, PigType6inGreenDisc: string, PigType6inscrapper: string, PigType4inscrapper: string, PigType4inFoam: string, PigType3inredscrape: string, GSCR: string, PigType3inStubby: string, PigType4_GreenRibbed: string, PigType3inbluescraper: string, PigType6ingreenscraper: string, Purple3inDisc: string, PigType3inGscr: string }, pigInspectionEnum: { Failed: string, Good: string }, limitingSpecEnum: { ANSI150: string, ANSI300: string, ANSI600: string }, environmentProximityToEnum: { WB1: string, WB3: string, WB4: string, WB5: string, WC1: string, WC2: string, WC3: string, WC4: string }, geotechnicalFacingEnum: { N: string, NE: string, E: string, SE: string, S: string, SW: string, W: string, NW: string } } | null | undefined };

export type ValidatorSubstanceQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorSubstanceQuery = { validators?: { substanceEnum: { NaturalGas: string, FreshWater: string, SaltWater: string, CrudeOil: string, OilWellEffluent: string, LVPProducts: string, FuelGas: string, SourNaturalGas: string } } | null | undefined };

export type ValidatorsPressureTestQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPressureTestQuery = { validators?: { anyTextMatchPattern: string, limitingSpecEnum: { ANSI150: string, ANSI300: string, ANSI600: string } } | null | undefined };

export type ValidatorsRiskQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsRiskQuery = { validators?: { environmentProximityToEnum: { WB1: string, WB3: string, WB4: string, WB5: string, WC1: string, WC2: string, WC3: string, WC4: string }, geotechnicalFacingEnum: { N: string, NE: string, E: string, SE: string, S: string, SW: string, W: string, NW: string } } | null | undefined };

export type ValidatorUserRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorUserRoleQuery = { validators?: { userRoleEnum: { USER: string, ADMIN: string, CONTRACTOR: string } } | null | undefined };

export type PressureTestsByPipelineIdQueryVariables = Exact<{
  pipelineId?: Maybe<Scalars['String']>;
}>;


export type PressureTestsByPipelineIdQuery = { pressureTestsByPipelineId?: Array<{ id: string, limitingSpec?: LimitingSpecEnum | null | undefined, infoSentOutDate?: string | null | undefined, ddsDate?: string | null | undefined, pressureTestDate?: string | null | undefined, pressureTestReceivedDate?: string | null | undefined, integritySheetUpdated?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, pipeline: { license: string, segment: string }, createdBy: { email: string }, updatedBy: { email: string } } | null | undefined> | null | undefined };

export type RiskByIdQueryVariables = Exact<{
  id: Scalars['String'];
  substance?: Maybe<SubstanceEnum>;
  oil?: Maybe<Scalars['Float']>;
  water?: Maybe<Scalars['Float']>;
  gas?: Maybe<Scalars['Float']>;
  status?: Maybe<StatusEnum>;
  type?: Maybe<TypeEnum>;
  material?: Maybe<MaterialEnum>;
}>;


export type RiskByIdQuery = { riskById?: { id: string, arielReview?: boolean | null | undefined, environmentProximityTo?: EnvironmentProximityToEnum | null | undefined, geotechnicalSlopeAngleS1?: number | null | undefined, geotechnicalFacingS1?: GeotechnicalFacingEnum | null | undefined, geotechnicalHeightS1?: number | null | undefined, geotechnicalSlopeAngleS2?: number | null | undefined, geotechnicalFacingS2?: GeotechnicalFacingEnum | null | undefined, geotechnicalHeightS2?: number | null | undefined, dateSlopeChecked?: string | null | undefined, repairTimeDays?: number | null | undefined, releaseTimeDays?: number | null | undefined, costPerM3Released?: number | null | undefined, enviroRisk?: number | null | undefined, assetRisk?: number | null | undefined, probabilityInterior?: number | null | undefined, oilReleaseCost?: number | null | undefined, gasReleaseCost?: number | null | undefined, riskPeople?: number | null | undefined, probabilityGeo?: number | null | undefined, safeguardInternalProtection?: boolean | null | undefined, safeguardExternalCoating?: boolean | null | undefined, createdAt: string, updatedAt: string, createdBy: { email: string }, updatedBy: { email: string } } | null | undefined };

export type PipelineFlowQueryVariables = Exact<{
  idList: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type PipelineFlowQuery = { pipelineFlow?: Array<{ id: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined> | null | undefined };

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
    errors {
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
export const ConnectPipelineDocument = gql`
    mutation ConnectPipeline($id: String!, $connectPipelineId: String!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  connectPipeline(
    id: $id
    connectPipelineId: $connectPipelineId
    flowCalculationDirection: $flowCalculationDirection
  ) {
    id
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
 *      id: // value for 'id'
 *      connectPipelineId: // value for 'connectPipelineId'
 *      flowCalculationDirection: // value for 'flowCalculationDirection'
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
    mutation DisconnectPipeline($id: String!, $disconnectPipelineId: String!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  disconnectPipeline(
    id: $id
    disconnectPipelineId: $disconnectPipelineId
    flowCalculationDirection: $flowCalculationDirection
  ) {
    id
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
 *      id: // value for 'id'
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
export const ConnectSourceDocument = gql`
    mutation ConnectSource($id: String!, $sourceId: String!) {
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
    mutation DisconnectSource($id: String!, $sourceId: String!) {
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
export const EditRiskDocument = gql`
    mutation EditRisk($id: String!, $arielReview: Boolean, $environmentProximityTo: EnvironmentProximityToEnum, $geotechnicalSlopeAngleS1: Int, $geotechnicalFacingS1: GeotechnicalFacingEnum, $geotechnicalHeightS1: Int, $geotechnicalSlopeAngleS2: Int, $geotechnicalFacingS2: GeotechnicalFacingEnum, $geotechnicalHeightS2: Int, $dateSlopeChecked: DateTime, $repairTimeDays: Int, $releaseTimeDays: Int, $oilReleaseCost: Float, $gasReleaseCost: Float, $riskPeople: Int, $probabilityGeo: Float, $safeguardInternalProtection: Boolean, $safeguardExternalCoating: Boolean) {
  editRisk(
    id: $id
    arielReview: $arielReview
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
    riskPeople: $riskPeople
    probabilityGeo: $probabilityGeo
    safeguardInternalProtection: $safeguardInternalProtection
    safeguardExternalCoating: $safeguardExternalCoating
  ) {
    id
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
 *      arielReview: // value for 'arielReview'
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
 *      riskPeople: // value for 'riskPeople'
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
    id
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
    id
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
    query pipelinesByIdQuery($table: String, $id: String) {
  pipelinesById(table: $table, id: $id) {
    id
    license
    segment
    substance
    flowCalculationDirection
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
      gasAssociatedLiquids
      totalFluids
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
    createdBy {
      email
    }
    createdAt
    updatedBy {
      email
    }
    updatedAt
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
 *      table: // value for 'table'
 *      id: // value for 'id'
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
    flowCalculationDirection
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
    updatedBy {
      email
    }
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
    query PigRunsByPipelineId($pipelineId: String!) {
  pigRunsByPipelineId(pipelineId: $pipelineId) {
    id
    pigType
    dateIn
    dateOut
    isolationValveFunctionTest
    pigSenderReceiverInspection
    comment
    operator {
      email
    }
    createdBy {
      email
    }
    createdAt
    updatedBy {
      email
    }
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
export const ValidatorsPigRunDocument = gql`
    query ValidatorsPigRun {
  validators {
    pigTypeEnum {
      Scrapper
      PigType4inArgus
      PigType6inArgus
      ScraperP400
      PigType3inPurpleScraper
      ScraperP304
      PigType3inscapper
      PigType3inscrapper
      PigType3inscraper
      Foam
      RedStubby
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
      Ball
      REVERSEFLOWDUETOTAQA
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
      Shutin
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
      PigType3BrownRibbed
      PigType3GreenRibbed
      PigType3inBlueRibbed
      PigType3inGreenRibbed
      PigType3BlueRibbed
      BlueRibbed
      M_D_Foamy
      PigType6inGreenRibbed
      SI_GOINGTOTAQA
      Red4inscraper
      Blue3inscraper
      PigType3inARGUS
      PigType4inBlueDisc
      PigType8inBlackDisc
      PigType4inGreendisc
      PigType6inGreenDisc
      PigType6inscrapper
      PigType4inscrapper
      PigType4inFoam
      PigType3inredscrape
      GSCR
      PigType3inStubby
      PigType4_GreenRibbed
      PigType3inbluescraper
      PigType6ingreenscraper
      Purple3inDisc
      PigType3inGscr
    }
    pigInspectionEnum {
      Failed
      Good
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
      Scrapper
      PigType4inArgus
      PigType6inArgus
      ScraperP400
      PigType3inPurpleScraper
      ScraperP304
      PigType3inscapper
      PigType3inscrapper
      PigType3inscraper
      Foam
      RedStubby
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
      Ball
      REVERSEFLOWDUETOTAQA
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
      Shutin
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
      PigType3BrownRibbed
      PigType3GreenRibbed
      PigType3inBlueRibbed
      PigType3inGreenRibbed
      PigType3BlueRibbed
      BlueRibbed
      M_D_Foamy
      PigType6inGreenRibbed
      SI_GOINGTOTAQA
      Red4inscraper
      Blue3inscraper
      PigType3inARGUS
      PigType4inBlueDisc
      PigType8inBlackDisc
      PigType4inGreendisc
      PigType6inGreenDisc
      PigType6inscrapper
      PigType4inscrapper
      PigType4inFoam
      PigType3inredscrape
      GSCR
      PigType3inStubby
      PigType4_GreenRibbed
      PigType3inbluescraper
      PigType6ingreenscraper
      Purple3inDisc
      PigType3inGscr
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
      USER
      ADMIN
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
    updatedBy {
      email
    }
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
export const RiskByIdDocument = gql`
    query RiskById($id: String!, $substance: SubstanceEnum, $oil: Float, $water: Float, $gas: Float, $status: StatusEnum, $type: TypeEnum, $material: MaterialEnum) {
  riskById(id: $id) {
    id
    arielReview
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
    costPerM3Released(substance: $substance, oil: $oil, water: $water, gas: $gas)
    enviroRisk(
      substance: $substance
      status: $status
      oil: $oil
      water: $water
      gas: $gas
    )
    assetRisk(oil: $oil, water: $water, gas: $gas)
    probabilityInterior(
      substance: $substance
      status: $status
      type: $type
      material: $material
    )
    oilReleaseCost
    gasReleaseCost
    riskPeople
    probabilityGeo
    safeguardInternalProtection
    safeguardExternalCoating
    createdBy {
      email
    }
    createdAt
    updatedBy {
      email
    }
    updatedAt
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
 *      substance: // value for 'substance'
 *      oil: // value for 'oil'
 *      water: // value for 'water'
 *      gas: // value for 'gas'
 *      status: // value for 'status'
 *      type: // value for 'type'
 *      material: // value for 'material'
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
export const PipelineFlowDocument = gql`
    query PipelineFlow($idList: [String]!, $flowCalculationDirection: FlowCalculationDirectionEnum!) {
  pipelineFlow(
    idList: $idList
    flowCalculationDirection: $flowCalculationDirection
  ) {
    id
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
 *      idList: // value for 'idList'
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
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
  DateTime: string;
};

export type AllocationInput = {
  userId: Scalars['String'];
};

export type AllocationPayload = {
  error?: Maybe<FieldError>;
  success?: Maybe<FieldError>;
};

export type AllocationProgressObject = {
  numberOfItems: Scalars['Int'];
  progress: Scalars['Int'];
  userId: Scalars['String'];
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

export type CathodicSurvey = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  correctionDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  date: Scalars['DateTime'];
  deficiencies?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  pipeline: Pipeline;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
};

export type CathodicSurveyPayload = {
  cathodicSurvey?: Maybe<CathodicSurvey>;
  error?: Maybe<FieldError>;
};

export type ChangePasswordInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
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
  createdById: Scalars['String'];
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
  updatedById: Scalars['String'];
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

export type Company = {
  authorized: Scalars['Boolean'];
  cathodicSurveys?: Maybe<Array<Maybe<CathodicSurvey>>>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type ConnectSourceInput = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
  pipelineId: Scalars['String'];
};

export type DisconnectSourceInput = {
  id: Scalars['String'];
  /** Pass this object if well or sales point is being explicitly disconnected from pipeline, as opposed to implicitly by connecting the well or sales point to another pipeline */
  pipelineInfo?: Maybe<DisconnectSourceOptionalInput>;
};

export type DisconnectSourceOptionalInput = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  pipelineId: Scalars['String'];
};

export type EditCathodicSurveyInput = {
  comment?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  correctionDate?: Maybe<Scalars['DateTime']>;
  date?: Maybe<Scalars['DateTime']>;
  deficiencies?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
};

export type EditChemicalInput = {
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

export type EditGeotechnicalInput = {
  comment?: Maybe<Scalars['String']>;
  dateSlopeChecked?: Maybe<Scalars['DateTime']>;
  facingS1?: Maybe<GeotechnicalFacingEnum>;
  facingS2?: Maybe<GeotechnicalFacingEnum>;
  heightS1?: Maybe<Scalars['Int']>;
  heightS2?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  slopeAngleS1?: Maybe<Scalars['Int']>;
  slopeAngleS2?: Maybe<Scalars['Int']>;
};

export type EditLicenseChangeInput = {
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  from?: Maybe<Scalars['String']>;
  fromFeatureId?: Maybe<Scalars['String']>;
  gradeId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  internalProtectionId?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Float']>;
  linkToDocumentation?: Maybe<Scalars['String']>;
  materialId?: Maybe<Scalars['String']>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  pipelineTypeId?: Maybe<Scalars['String']>;
  statusId?: Maybe<Scalars['String']>;
  substanceId?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  toFeatureId?: Maybe<Scalars['String']>;
  wallThickness?: Maybe<Scalars['Float']>;
  yieldStrength?: Maybe<Scalars['Int']>;
};

export type EditPipelineBatchInput = {
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
};

export type EditPipelineInput = {
  comment?: Maybe<Scalars['String']>;
  flowCalculationDirection?: Maybe<FlowCalculationDirectionEnum>;
  id: Scalars['String'];
  license?: Maybe<Scalars['String']>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
  satelliteId?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
};

export type EditPressureTestInput = {
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  ddsDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
};

export type EditRiskInput = {
  aerialReview?: Maybe<Scalars['Boolean']>;
  comment?: Maybe<Scalars['String']>;
  consequencePeople?: Maybe<Scalars['Int']>;
  environmentId?: Maybe<Scalars['String']>;
  gasReleaseCost?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  oilReleaseCost?: Maybe<Scalars['Float']>;
  probabilityGeo?: Maybe<Scalars['Int']>;
  releaseTimeDays?: Maybe<Scalars['Int']>;
  repairTimeDays?: Maybe<Scalars['Int']>;
  safeguardExternalCoating?: Maybe<Scalars['Int']>;
  safeguardInternalProtection?: Maybe<Scalars['Int']>;
};

export type EditSalesPointInput = {
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  gas?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  oil?: Maybe<Scalars['Float']>;
  pipelineId: Scalars['String'];
  water?: Maybe<Scalars['Float']>;
};

export type EditWellBatchInput = {
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
};

export type EditWellInput = {
  fdcRecId?: Maybe<Scalars['String']>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  gas?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  oil?: Maybe<Scalars['Float']>;
  pipelineId: Scalars['String'];
  water?: Maybe<Scalars['Float']>;
};

export type EnumObject = {
  databaseEnum: Scalars['String'];
  serverEnum: Scalars['String'];
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

export type Geotechnical = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  dateSlopeChecked?: Maybe<Scalars['DateTime']>;
  facingS1?: Maybe<GeotechnicalFacingEnum>;
  facingS2?: Maybe<GeotechnicalFacingEnum>;
  heightS1?: Maybe<Scalars['Int']>;
  heightS2?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  pipeline: Pipeline;
  slopeAngleS1?: Maybe<Scalars['Int']>;
  slopeAngleS2?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
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

export type GeotechnicalPayload = {
  error?: Maybe<FieldError>;
  geotechnical?: Maybe<Geotechnical>;
};

export enum HavingEnum {
  Any = 'any',
  Count = 'count',
  First = 'first',
  Last = 'last',
  Maximum = 'maximum',
  Minimum = 'minimum'
}

export type HierarchyInput = {
  id: Scalars['String'];
  table: TableEnum;
};

export type LicenseChange = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  date: Scalars['DateTime'];
  from: Scalars['String'];
  fromFeatureId?: Maybe<Scalars['String']>;
  gradeId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  internalProtectionId?: Maybe<Scalars['String']>;
  length: Scalars['Float'];
  linkToDocumentation?: Maybe<Scalars['String']>;
  materialId?: Maybe<Scalars['String']>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  pipeline: Pipeline;
  pipelineTypeId?: Maybe<Scalars['String']>;
  statusId: Scalars['String'];
  substanceId: Scalars['String'];
  to: Scalars['String'];
  toFeatureId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
  wallThickness?: Maybe<Scalars['Float']>;
  yieldStrength?: Maybe<Scalars['Int']>;
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

export type Mutation = {
  addCathodicSurvey?: Maybe<CathodicSurveyPayload>;
  addChemical?: Maybe<ChemicalPayload>;
  addGeotechnical?: Maybe<GeotechnicalPayload>;
  addLicenseChange?: Maybe<LicenseChangePayload>;
  addPigRun?: Maybe<PigRunPayload>;
  addPipelineBatch?: Maybe<PipelineBatchPayload>;
  addPressureTest?: Maybe<PressureTestPayload>;
  addRisk?: Maybe<RiskPayload>;
  addWellBatch?: Maybe<WellBatchPayload>;
  allocateChronologicalEdge?: Maybe<AllocationPayload>;
  allocatePipelineFlow?: Maybe<AllocationPayload>;
  allocatePressureTest?: Maybe<AllocationPayload>;
  allocateRisk?: Maybe<AllocationPayload>;
  allocateSalesPointFlow?: Maybe<AllocationPayload>;
  allocateWellFlow?: Maybe<AllocationPayload>;
  changePassword: AuthPayload;
  connectPipeline?: Maybe<PipelinesOnPipelinesPayload>;
  connectSalesPoint?: Maybe<SalesPointPayload>;
  connectWell?: Maybe<WellPayload>;
  createFacility?: Maybe<Facility>;
  deleteCathodicSurvey?: Maybe<CathodicSurveyPayload>;
  deleteChemical?: Maybe<ChemicalPayload>;
  deleteGeotechnical?: Maybe<GeotechnicalPayload>;
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
  editCathodicSurvey?: Maybe<CathodicSurveyPayload>;
  editChemical?: Maybe<ChemicalPayload>;
  editFacility?: Maybe<Facility>;
  editGeotechnical?: Maybe<GeotechnicalPayload>;
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
  forgotPassword: Scalars['Boolean'];
  login: AuthPayload;
  logout: Scalars['Boolean'];
  signup: AuthPayload;
  testAllocate?: Maybe<Scalars['String']>;
};


export type MutationAddCathodicSurveyArgs = {
  pipelineId: Scalars['String'];
};


export type MutationAddChemicalArgs = {
  id: Scalars['String'];
};


export type MutationAddGeotechnicalArgs = {
  pipelineId: Scalars['String'];
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


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationConnectPipelineArgs = {
  connectNewPipelineId: Scalars['String'];
  connectedPipelineId?: Maybe<Scalars['String']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  pipelineId: Scalars['String'];
};


export type MutationConnectSalesPointArgs = {
  data: ConnectSourceInput;
};


export type MutationConnectWellArgs = {
  data: ConnectSourceInput;
};


export type MutationCreateFacilityArgs = {
  data: FacilityCreateInput;
};


export type MutationDeleteCathodicSurveyArgs = {
  id: Scalars['String'];
};


export type MutationDeleteChemicalArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGeotechnicalArgs = {
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
  data: DisconnectSourceInput;
};


export type MutationDisconnectWellArgs = {
  data: DisconnectSourceInput;
};


export type MutationDuplicatePipelineArgs = {
  id: Scalars['String'];
};


export type MutationEditCathodicSurveyArgs = {
  data: EditCathodicSurveyInput;
};


export type MutationEditChemicalArgs = {
  data: EditChemicalInput;
};


export type MutationEditFacilityArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationEditGeotechnicalArgs = {
  data: EditGeotechnicalInput;
};


export type MutationEditLicenseChangeArgs = {
  data: EditLicenseChangeInput;
};


export type MutationEditPigRunArgs = {
  comment?: Maybe<Scalars['String']>;
  dateIn?: Maybe<Scalars['DateTime']>;
  dateOut?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  operatorId?: Maybe<Scalars['String']>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
  pigTypeId?: Maybe<Scalars['String']>;
};


export type MutationEditPipelineArgs = {
  data: EditPipelineInput;
};


export type MutationEditPipelineBatchArgs = {
  data: EditPipelineBatchInput;
};


export type MutationEditPressureTestArgs = {
  data: EditPressureTestInput;
};


export type MutationEditRiskArgs = {
  data: EditRiskInput;
};


export type MutationEditSalesPointArgs = {
  data: EditSalesPointInput;
};


export type MutationEditSatelliteArgs = {
  facilityUniqueInput?: Maybe<FacilityUniqueInput>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationEditWellArgs = {
  data: EditWellInput;
};


export type MutationEditWellBatchArgs = {
  data: EditWellBatchInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  userRegisterInput: UserRegisterInput;
};


export type MutationTestAllocateArgs = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
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

export enum PigInspectionEnum {
  Failed = 'Failed',
  Good = 'Good'
}

export type PigRun = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  dateIn: Scalars['DateTime'];
  dateOut?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isolationValveFunctionTest?: Maybe<PigInspectionEnum>;
  operator?: Maybe<User>;
  operatorId?: Maybe<Scalars['String']>;
  pigSenderReceiverInspection?: Maybe<PigInspectionEnum>;
  pigTypeId?: Maybe<Scalars['String']>;
  pipeline: Pipeline;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
};

export type PigRunPayload = {
  error?: Maybe<FieldError>;
  pigRun?: Maybe<PigRun>;
};

export type Pipeline = {
  authorized: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  currentFrom?: Maybe<Scalars['String']>;
  currentFromFeature?: Maybe<Scalars['String']>;
  currentStatus?: Maybe<Scalars['String']>;
  currentSubstance?: Maybe<Scalars['String']>;
  currentTo?: Maybe<Scalars['String']>;
  currentToFeature?: Maybe<Scalars['String']>;
  downstream?: Maybe<Array<Maybe<Pipeline>>>;
  firstInjection?: Maybe<Scalars['DateTime']>;
  firstLicenseDate?: Maybe<Scalars['DateTime']>;
  firstProduction?: Maybe<Scalars['DateTime']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
  gas: Scalars['Float'];
  gasAssociatedLiquids: Scalars['Float'];
  id: Scalars['String'];
  lastInjection?: Maybe<Scalars['DateTime']>;
  lastProduction?: Maybe<Scalars['DateTime']>;
  license: Scalars['String'];
  licenseChanges?: Maybe<Array<Maybe<LicenseChange>>>;
  oil: Scalars['Float'];
  pigRuns?: Maybe<Array<Maybe<PigRun>>>;
  piggable?: Maybe<Scalars['Boolean']>;
  piggingFrequency?: Maybe<Scalars['Int']>;
  pressureTests?: Maybe<Array<Maybe<PressureTest>>>;
  risk?: Maybe<Risk>;
  salesPoints?: Maybe<Array<Maybe<SalesPoint>>>;
  satellite?: Maybe<Satellite>;
  satelliteId?: Maybe<Scalars['String']>;
  segment: Scalars['String'];
  totalFluids: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
  upstream?: Maybe<Array<Maybe<Pipeline>>>;
  water: Scalars['Float'];
  wells?: Maybe<Array<Maybe<Well>>>;
};

export type PipelineBatch = {
  authorized: Scalars['Boolean'];
  chemicalVolume?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  date: Scalars['DateTime'];
  diluentVolume?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  pipeline: Pipeline;
  product: BatchProduct;
  productId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
};

export type PipelineBatchPayload = {
  error?: Maybe<FieldError>;
  pipelineBatch?: Maybe<PipelineBatch>;
};

export type PipelineCreateInput = {
  downstream?: Maybe<Array<Maybe<PipelineCreateInput>>>;
  from: Scalars['String'];
  length: Scalars['Float'];
  license: Scalars['String'];
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  segment: Scalars['String'];
  to: Scalars['String'];
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
  createdById: Scalars['String'];
  date: Scalars['DateTime'];
  ddsDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  infoSentOutDate?: Maybe<Scalars['DateTime']>;
  integritySheetUpdated?: Maybe<Scalars['DateTime']>;
  limitingSpec?: Maybe<LimitingSpecEnum>;
  maxPressureOfLimitingSpec?: Maybe<Scalars['Float']>;
  mopTestPressure?: Maybe<Scalars['Float']>;
  pipeline: Pipeline;
  pressureTestCorrosionAllowance?: Maybe<Scalars['Float']>;
  pressureTestPressure?: Maybe<Scalars['Float']>;
  pressureTestReceivedDate?: Maybe<Scalars['DateTime']>;
  requiredWTForMop?: Maybe<Scalars['Float']>;
  requiredWTForTestPressure?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['String'];
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
  cathodicSurveysByPipelineId?: Maybe<Array<Maybe<CathodicSurvey>>>;
  chemicalById?: Maybe<Chemical>;
  connectedPipelinesByPipelineId?: Maybe<PipelinesFlowAndSourceGroupBy>;
  geotechnicalsByPipelineId?: Maybe<Array<Maybe<Geotechnical>>>;
  licenseChangesByPipelineId?: Maybe<Array<Maybe<LicenseChange>>>;
  me?: Maybe<User>;
  pigRunsByPipelineId?: Maybe<Array<Maybe<PigRun>>>;
  pipelineBatchesByPipelineId?: Maybe<Array<Maybe<PipelineBatch>>>;
  pipelineFlow?: Maybe<PipelineFlow>;
  pipelineId?: Maybe<Pipeline>;
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
  validators?: Maybe<ValidatorsUserRole>;
  validatorsPipeline?: Maybe<ValidatorsPipeline>;
  wellBatchesByWellId?: Maybe<Array<Maybe<WellBatch>>>;
  wellOptions?: Maybe<Array<Maybe<SourceOptions>>>;
  wellsByPipelineId?: Maybe<Array<Maybe<Well>>>;
  wellsGroupByPipelineId?: Maybe<SourceGroupBy>;
};


export type QueryCathodicSurveysByPipelineIdArgs = {
  pipelineId: Scalars['String'];
};


export type QueryChemicalByIdArgs = {
  id: Scalars['String'];
};


export type QueryConnectedPipelinesByPipelineIdArgs = {
  flowCalculationDirection: FlowCalculationDirectionEnum;
  id: Scalars['String'];
};


export type QueryGeotechnicalsByPipelineIdArgs = {
  pipelineId: Scalars['String'];
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


export type QueryPipelineIdArgs = {
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
  createdById: Scalars['String'];
  environmentId?: Maybe<Scalars['String']>;
  gasReleaseCost?: Maybe<Scalars['Float']>;
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
  updatedById: Scalars['String'];
};

export type RiskPayload = {
  error?: Maybe<FieldError>;
  risk?: Maybe<Risk>;
};

export type SalesPoint = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
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
  updatedById: Scalars['String'];
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

export type Subscription = {
  chronologicalEdgeAllocationProgress: AllocationProgressObject;
  pipelineFlowAllocationProgress: AllocationProgressObject;
  pressureTestAllocationProgress: AllocationProgressObject;
  riskAllocationProgress: AllocationProgressObject;
  salesPointFlowAllocationProgress: AllocationProgressObject;
  wellFlowAllocationProgress: AllocationProgressObject;
};


export type SubscriptionChronologicalEdgeAllocationProgressArgs = {
  data: AllocationInput;
};


export type SubscriptionPipelineFlowAllocationProgressArgs = {
  data: AllocationInput;
};


export type SubscriptionPressureTestAllocationProgressArgs = {
  data: AllocationInput;
};


export type SubscriptionRiskAllocationProgressArgs = {
  data: AllocationInput;
};


export type SubscriptionSalesPointFlowAllocationProgressArgs = {
  data: AllocationInput;
};


export type SubscriptionWellFlowAllocationProgressArgs = {
  data: AllocationInput;
};

export enum TableEnum {
  CathodicSurveys = 'cathodicSurveys',
  Chemical = 'chemical',
  DownstreamPipelines = 'downstreamPipelines',
  Facility = 'facility',
  GeotechnicalParameters = 'geotechnicalParameters',
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
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: UserRoleEnum;
};

export type UserRegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: UserRoleEnum;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Cathodic = 'CATHODIC',
  Chemical = 'CHEMICAL',
  Contractor = 'CONTRACTOR',
  Engineer = 'ENGINEER',
  Office = 'OFFICE',
  Operator = 'OPERATOR',
  Regulatory = 'REGULATORY'
}

export type UserUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ValidatorsPipeline = {
  batchProductEnum: Array<EnumObject>;
  chemicalSupplierEnum: Array<EnumObject>;
  companyEnum: Array<EnumObject>;
  flowCalculationDirectionEnum: Array<EnumObject>;
  fromToFeatureEnum: Array<EnumObject>;
  fromToMatchPattern: Scalars['String'];
  geotechnicalFacingEnum: Array<EnumObject>;
  gradeEnum: Array<EnumObject>;
  havingEnum: Array<EnumObject>;
  internalProtectionEnum: Array<EnumObject>;
  lengthMatchPattern: Scalars['String'];
  licenseMatchPattern: Scalars['String'];
  limitingSpecEnum: Array<EnumObject>;
  materialEnum: Array<EnumObject>;
  mopMatchPattern: Scalars['String'];
  operationEnum: Array<EnumObject>;
  operatorEnum: Array<EnumObject>;
  outsideDiameterMatchPattern: Scalars['String'];
  pigInspectionEnum: Array<EnumObject>;
  pigTypeEnum: Array<EnumObject>;
  pipelineTypeEnum: Array<EnumObject>;
  riskEnvironmentEnum: Array<EnumObject>;
  satelliteEnum: Array<EnumObject>;
  segmentMatchPattern: Scalars['String'];
  solubilityEnum: Array<EnumObject>;
  statusEnum: Array<EnumObject>;
  substanceEnum: Array<EnumObject>;
  wallThicknessMatchPattern: Scalars['String'];
  yieldStrengthMatchPattern: Scalars['String'];
};

export type ValidatorsUserRole = {
  userRoleEnum: Array<EnumObject>;
};

export type Well = {
  authorized: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
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
  updatedById: Scalars['String'];
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


export type LoginMutation = { login: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, error?: { field: string, message: string } | null | undefined } };

export type SignupMutationVariables = Exact<{
  userRegisterInput: UserRegisterInput;
}>;


export type SignupMutation = { signup: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, error?: { field: string, message: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { forgotPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword: { user?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined, error?: { field: string, message: string } | null | undefined } };

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
  data: ConnectSourceInput;
}>;


export type ConnectWellMutation = { connectWell?: { well?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DisconnectWellMutationVariables = Exact<{
  data: DisconnectSourceInput;
}>;


export type DisconnectWellMutation = { disconnectWell?: { well?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type ConnectSalesPointMutationVariables = Exact<{
  data: ConnectSourceInput;
}>;


export type ConnectSalesPointMutation = { connectSalesPoint?: { salesPoint?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DisconnectSalesPointMutationVariables = Exact<{
  data: DisconnectSourceInput;
}>;


export type DisconnectSalesPointMutation = { disconnectSalesPoint?: { salesPoint?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditPipelineMutationVariables = Exact<{
  data: EditPipelineInput;
}>;


export type EditPipelineMutation = { editPipeline?: { pipeline?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditLicenseChangeMutationVariables = Exact<{
  data: EditLicenseChangeInput;
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
  data: EditPressureTestInput;
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
  pigTypeId?: Maybe<Scalars['String']>;
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
  data: EditPipelineBatchInput;
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
  data: EditWellBatchInput;
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
  data: EditRiskInput;
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

export type EditGeotechnicalMutationVariables = Exact<{
  data: EditGeotechnicalInput;
}>;


export type EditGeotechnicalMutation = { editGeotechnical?: { geotechnical?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddGeotechnicalMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddGeotechnicalMutation = { addGeotechnical?: { geotechnical?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeleteGeotechnicalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGeotechnicalMutation = { deleteGeotechnical?: { geotechnical?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditCathodicSurveyMutationVariables = Exact<{
  data: EditCathodicSurveyInput;
}>;


export type EditCathodicSurveyMutation = { editCathodicSurvey?: { cathodicSurvey?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AddCathodicSurveyMutationVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type AddCathodicSurveyMutation = { addCathodicSurvey?: { cathodicSurvey?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type DeleteCathodicSurveyMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCathodicSurveyMutation = { deleteCathodicSurvey?: { cathodicSurvey?: { id: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type EditChemicalMutationVariables = Exact<{
  data: EditChemicalInput;
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

export type AllocatePipelineFlowMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocatePipelineFlowMutation = { allocatePipelineFlow?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AllocateWellFlowMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocateWellFlowMutation = { allocateWellFlow?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AllocateSalesPointFlowMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocateSalesPointFlowMutation = { allocateSalesPointFlow?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AllocateRiskMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocateRiskMutation = { allocateRisk?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AllocatePressureTestMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocatePressureTestMutation = { allocatePressureTest?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type AllocateChronologicalEdgeMutationVariables = Exact<{ [key: string]: never; }>;


export type AllocateChronologicalEdgeMutation = { allocateChronologicalEdge?: { success?: { field: string, message: string } | null | undefined, error?: { field: string, message: string } | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, email: string, firstName: string, lastName: string, role: UserRoleEnum } | null | undefined };

export type UserCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCountQuery = { userCount?: number | null | undefined };

export type PipelinesByIdQueryVariables = Exact<{
  navigationInput: NavigationInput;
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type PipelinesByIdQuery = { pipelinesById: { count: number, pipelines?: Array<{ id: string, license: string, segment: string, flowCalculationDirection: FlowCalculationDirectionEnum, piggable?: boolean | null | undefined, piggingFrequency?: number | null | undefined, comment?: string | null | undefined, satelliteId?: string | null | undefined, currentFrom?: string | null | undefined, currentFromFeature?: string | null | undefined, currentTo?: string | null | undefined, currentToFeature?: string | null | undefined, currentStatus?: string | null | undefined, currentSubstance?: string | null | undefined, firstLicenseDate?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined } };

export type PigRunsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PigRunsByPipelineIdQuery = { pigRunsByPipelineId?: Array<{ id: string, pigTypeId?: string | null | undefined, dateIn: string, dateOut?: string | null | undefined, isolationValveFunctionTest?: PigInspectionEnum | null | undefined, pigSenderReceiverInspection?: PigInspectionEnum | null | undefined, comment?: string | null | undefined, operatorId?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type SearchNavigationOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchNavigationOptionsQuery = { searchNavigationOptions: Array<{ table: TableEnum, field: string, nullable: boolean, type: string, enumObjectArray?: Array<{ serverEnum: string, databaseEnum: string }> | null | undefined }> };

export type PipelineBatchesByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PipelineBatchesByPipelineIdQuery = { pipelineBatchesByPipelineId?: Array<{ id: string, date: string, cost?: number | null | undefined, chemicalVolume?: number | null | undefined, diluentVolume?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, product: { id: string, product: string, cost?: number | null | undefined, solubility: SolubilityEnum }, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type WellBatchesByWellIdQueryVariables = Exact<{
  wellId: Scalars['String'];
}>;


export type WellBatchesByWellIdQuery = { wellBatchesByWellId?: Array<{ id: string, date: string, cost?: number | null | undefined, chemicalVolume?: number | null | undefined, diluentVolume?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, product: { id: string, product: string, cost?: number | null | undefined, solubility: SolubilityEnum }, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type ValidatorsPipelineQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsPipelineQuery = { validatorsPipeline?: { licenseMatchPattern: string, segmentMatchPattern: string, fromToMatchPattern: string, lengthMatchPattern: string, yieldStrengthMatchPattern: string, outsideDiameterMatchPattern: string, wallThicknessMatchPattern: string, mopMatchPattern: string, flowCalculationDirectionEnum: Array<{ serverEnum: string, databaseEnum: string }>, satelliteEnum: Array<{ serverEnum: string, databaseEnum: string }>, fromToFeatureEnum: Array<{ serverEnum: string, databaseEnum: string }>, statusEnum: Array<{ serverEnum: string, databaseEnum: string }>, substanceEnum: Array<{ serverEnum: string, databaseEnum: string }>, pipelineTypeEnum: Array<{ serverEnum: string, databaseEnum: string }>, gradeEnum: Array<{ serverEnum: string, databaseEnum: string }>, materialEnum: Array<{ serverEnum: string, databaseEnum: string }>, internalProtectionEnum: Array<{ serverEnum: string, databaseEnum: string }>, limitingSpecEnum: Array<{ serverEnum: string, databaseEnum: string }>, riskEnvironmentEnum: Array<{ serverEnum: string, databaseEnum: string }>, geotechnicalFacingEnum: Array<{ serverEnum: string, databaseEnum: string }>, solubilityEnum: Array<{ serverEnum: string, databaseEnum: string }>, batchProductEnum: Array<{ serverEnum: string, databaseEnum: string }>, pigTypeEnum: Array<{ serverEnum: string, databaseEnum: string }>, pigInspectionEnum: Array<{ serverEnum: string, databaseEnum: string }>, operatorEnum: Array<{ serverEnum: string, databaseEnum: string }>, chemicalSupplierEnum: Array<{ serverEnum: string, databaseEnum: string }>, companyEnum: Array<{ serverEnum: string, databaseEnum: string }>, operationEnum: Array<{ serverEnum: string, databaseEnum: string }>, havingEnum: Array<{ serverEnum: string, databaseEnum: string }> } | null | undefined };

export type ValidatorsUserRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorsUserRoleQuery = { validators?: { userRoleEnum: Array<{ serverEnum: string, databaseEnum: string }> } | null | undefined };

export type LicenseChangesByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type LicenseChangesByPipelineIdQuery = { licenseChangesByPipelineId?: Array<{ id: string, date: string, statusId: string, substanceId: string, from: string, fromFeatureId?: string | null | undefined, to: string, toFeatureId?: string | null | undefined, length: number, pipelineTypeId?: string | null | undefined, gradeId?: string | null | undefined, yieldStrength?: number | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, materialId?: string | null | undefined, mop?: number | null | undefined, internalProtectionId?: string | null | undefined, comment?: string | null | undefined, linkToDocumentation?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type PressureTestsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type PressureTestsByPipelineIdQuery = { pressureTestsByPipelineId?: Array<{ id: string, requiredWTForMop?: number | null | undefined, mopTestPressure?: number | null | undefined, limitingSpec?: LimitingSpecEnum | null | undefined, maxPressureOfLimitingSpec?: number | null | undefined, pressureTestPressure?: number | null | undefined, requiredWTForTestPressure?: number | null | undefined, pressureTestCorrosionAllowance?: number | null | undefined, waterForPigging?: number | null | undefined, infoSentOutDate?: string | null | undefined, ddsDate?: string | null | undefined, date: string, pressureTestReceivedDate?: string | null | undefined, integritySheetUpdated?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

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


export type RiskByIdQuery = { riskById?: { id: string, aerialReview?: boolean | null | undefined, environmentId?: string | null | undefined, repairTimeDays?: number | null | undefined, releaseTimeDays?: number | null | undefined, costPerM3Released?: number | null | undefined, consequenceEnviro?: number | null | undefined, consequenceAsset?: number | null | undefined, probabilityInterior?: number | null | undefined, probabilityExterior?: number | null | undefined, consequenceMax?: number | null | undefined, riskPotentialGeo?: number | null | undefined, riskPotentialInternal?: number | null | undefined, riskPotentialExternal?: number | null | undefined, oilReleaseCost?: number | null | undefined, gasReleaseCost?: number | null | undefined, consequencePeople?: number | null | undefined, probabilityGeo?: number | null | undefined, safeguardInternalProtection?: number | null | undefined, safeguardPigging?: number | null | undefined, safeguardChemicalInhibition?: number | null | undefined, probabilityInteriorWithSafeguards?: number | null | undefined, riskPotentialInternalWithSafeguards?: number | null | undefined, safeguardExternalCoating?: number | null | undefined, safeguardCathodic?: number | null | undefined, probabilityExteriorWithSafeguards?: number | null | undefined, riskPotentialExternalWithSafeguards?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined };

export type GeotechnicalsByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type GeotechnicalsByPipelineIdQuery = { geotechnicalsByPipelineId?: Array<{ id: string, slopeAngleS1?: number | null | undefined, facingS1?: GeotechnicalFacingEnum | null | undefined, heightS1?: number | null | undefined, slopeAngleS2?: number | null | undefined, facingS2?: GeotechnicalFacingEnum | null | undefined, heightS2?: number | null | undefined, dateSlopeChecked?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type ChemicalByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ChemicalByIdQuery = { chemicalById?: { id: string, chemicalSupplierId?: string | null | undefined, baselineFluidAnalysisDate?: string | null | undefined, scaling?: boolean | null | undefined, bacteria?: boolean | null | undefined, co2?: boolean | null | undefined, o2?: boolean | null | undefined, h2s?: boolean | null | undefined, continuousInjection?: boolean | null | undefined, injectionRate?: number | null | undefined, downholeBatch?: boolean | null | undefined, inhibitorPipelineBatch?: boolean | null | undefined, bacteriaTreatment?: boolean | null | undefined, scaleTreatment?: boolean | null | undefined, batchFrequency?: number | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined };

export type CathodicSurveysByPipelineIdQueryVariables = Exact<{
  pipelineId: Scalars['String'];
}>;


export type CathodicSurveysByPipelineIdQuery = { cathodicSurveysByPipelineId?: Array<{ id: string, date: string, companyId?: string | null | undefined, deficiencies?: boolean | null | undefined, correctionDate?: string | null | undefined, comment?: string | null | undefined, createdAt: string, updatedAt: string, authorized: boolean, createdBy: { id: string, email: string }, updatedBy: { id: string, email: string } } | null | undefined> | null | undefined };

export type PipelinesFlowQueryVariables = Exact<{
  idList: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  flowCalculationDirection: FlowCalculationDirectionEnum;
}>;


export type PipelinesFlowQuery = { pipelinesFlow?: Array<{ id: string, name: string, oil: number, water: number, gas: number, gasAssociatedLiquids: number, totalFluids: number, firstProduction?: string | null | undefined, lastProduction?: string | null | undefined, firstInjection?: string | null | undefined, lastInjection?: string | null | undefined } | null | undefined> | null | undefined };

export type SideBarQueryVariables = Exact<{ [key: string]: never; }>;


export type SideBarQuery = { sideBar?: Array<{ id: string, name: string, satellites: Array<{ id: string, name: string }> } | null | undefined> | null | undefined };

export type PipelineFlowAllocationProgressSubscriptionVariables = Exact<{
  data: AllocationInput;
}>;


export type PipelineFlowAllocationProgressSubscription = { pipelineFlowAllocationProgress: { progress: number, numberOfItems: number } };

export type WellFlowAllocationProgressSubscriptionVariables = Exact<{
  data: AllocationInput;
}>;


export type WellFlowAllocationProgressSubscription = { wellFlowAllocationProgress: { progress: number, numberOfItems: number } };

export type SalesPointFlowAllocationProgressSubscriptionVariables = Exact<{
  data: AllocationInput;
}>;


export type SalesPointFlowAllocationProgressSubscription = { salesPointFlowAllocationProgress: { progress: number, numberOfItems: number } };

export type RiskAllocationProgressSubscriptionVariables = Exact<{
  data: AllocationInput;
}>;


export type RiskAllocationProgressSubscription = { riskAllocationProgress: { progress: number, numberOfItems: number } };

export type ChronologicalEdgeAllocationProgressSubscriptionVariables = Exact<{
  data: AllocationInput;
}>;


export type ChronologicalEdgeAllocationProgressSubscription = { chronologicalEdgeAllocationProgress: { progress: number, numberOfItems: number } };

export type PressureTestAllocationProgressSubscriptionVariables = Exact<{
  data: AllocationInput;
}>;


export type PressureTestAllocationProgressSubscription = { pressureTestAllocationProgress: { progress: number, numberOfItems: number } };


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
    mutation Signup($userRegisterInput: UserRegisterInput!) {
  signup(userRegisterInput: $userRegisterInput) {
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
 *      userRegisterInput: // value for 'userRegisterInput'
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput) {
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
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
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
    mutation ConnectWell($data: ConnectSourceInput!) {
  connectWell(data: $data) {
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
 *      data: // value for 'data'
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
    mutation DisconnectWell($data: DisconnectSourceInput!) {
  disconnectWell(data: $data) {
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
 *      data: // value for 'data'
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
    mutation ConnectSalesPoint($data: ConnectSourceInput!) {
  connectSalesPoint(data: $data) {
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
 *      data: // value for 'data'
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
    mutation DisconnectSalesPoint($data: DisconnectSourceInput!) {
  disconnectSalesPoint(data: $data) {
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
 *      data: // value for 'data'
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
    mutation EditPipeline($data: EditPipelineInput!) {
  editPipeline(data: $data) {
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
 *      data: // value for 'data'
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
    mutation EditLicenseChange($data: EditLicenseChangeInput!) {
  editLicenseChange(data: $data) {
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
 *      data: // value for 'data'
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
    mutation EditPressureTest($data: EditPressureTestInput!) {
  editPressureTest(data: $data) {
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
 *      data: // value for 'data'
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
    mutation EditPigRun($id: String!, $pigTypeId: String, $dateIn: DateTime, $dateOut: DateTime, $isolationValveFunctionTest: PigInspectionEnum, $pigSenderReceiverInspection: PigInspectionEnum, $comment: String, $operatorId: String) {
  editPigRun(
    id: $id
    pigTypeId: $pigTypeId
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
 *      pigTypeId: // value for 'pigTypeId'
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
    mutation EditPipelineBatch($data: EditPipelineBatchInput!) {
  editPipelineBatch(data: $data) {
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
 *      data: // value for 'data'
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
    mutation EditWellBatch($data: EditWellBatchInput!) {
  editWellBatch(data: $data) {
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
 *      data: // value for 'data'
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
    mutation EditRisk($data: EditRiskInput!) {
  editRisk(data: $data) {
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
 *      data: // value for 'data'
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
export const EditGeotechnicalDocument = gql`
    mutation EditGeotechnical($data: EditGeotechnicalInput!) {
  editGeotechnical(data: $data) {
    geotechnical {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditGeotechnicalMutationFn = Apollo.MutationFunction<EditGeotechnicalMutation, EditGeotechnicalMutationVariables>;

/**
 * __useEditGeotechnicalMutation__
 *
 * To run a mutation, you first call `useEditGeotechnicalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGeotechnicalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGeotechnicalMutation, { data, loading, error }] = useEditGeotechnicalMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditGeotechnicalMutation(baseOptions?: Apollo.MutationHookOptions<EditGeotechnicalMutation, EditGeotechnicalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditGeotechnicalMutation, EditGeotechnicalMutationVariables>(EditGeotechnicalDocument, options);
      }
export type EditGeotechnicalMutationHookResult = ReturnType<typeof useEditGeotechnicalMutation>;
export type EditGeotechnicalMutationResult = Apollo.MutationResult<EditGeotechnicalMutation>;
export type EditGeotechnicalMutationOptions = Apollo.BaseMutationOptions<EditGeotechnicalMutation, EditGeotechnicalMutationVariables>;
export const AddGeotechnicalDocument = gql`
    mutation AddGeotechnical($pipelineId: String!) {
  addGeotechnical(pipelineId: $pipelineId) {
    geotechnical {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddGeotechnicalMutationFn = Apollo.MutationFunction<AddGeotechnicalMutation, AddGeotechnicalMutationVariables>;

/**
 * __useAddGeotechnicalMutation__
 *
 * To run a mutation, you first call `useAddGeotechnicalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGeotechnicalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGeotechnicalMutation, { data, loading, error }] = useAddGeotechnicalMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useAddGeotechnicalMutation(baseOptions?: Apollo.MutationHookOptions<AddGeotechnicalMutation, AddGeotechnicalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGeotechnicalMutation, AddGeotechnicalMutationVariables>(AddGeotechnicalDocument, options);
      }
export type AddGeotechnicalMutationHookResult = ReturnType<typeof useAddGeotechnicalMutation>;
export type AddGeotechnicalMutationResult = Apollo.MutationResult<AddGeotechnicalMutation>;
export type AddGeotechnicalMutationOptions = Apollo.BaseMutationOptions<AddGeotechnicalMutation, AddGeotechnicalMutationVariables>;
export const DeleteGeotechnicalDocument = gql`
    mutation DeleteGeotechnical($id: String!) {
  deleteGeotechnical(id: $id) {
    geotechnical {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeleteGeotechnicalMutationFn = Apollo.MutationFunction<DeleteGeotechnicalMutation, DeleteGeotechnicalMutationVariables>;

/**
 * __useDeleteGeotechnicalMutation__
 *
 * To run a mutation, you first call `useDeleteGeotechnicalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGeotechnicalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGeotechnicalMutation, { data, loading, error }] = useDeleteGeotechnicalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGeotechnicalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGeotechnicalMutation, DeleteGeotechnicalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGeotechnicalMutation, DeleteGeotechnicalMutationVariables>(DeleteGeotechnicalDocument, options);
      }
export type DeleteGeotechnicalMutationHookResult = ReturnType<typeof useDeleteGeotechnicalMutation>;
export type DeleteGeotechnicalMutationResult = Apollo.MutationResult<DeleteGeotechnicalMutation>;
export type DeleteGeotechnicalMutationOptions = Apollo.BaseMutationOptions<DeleteGeotechnicalMutation, DeleteGeotechnicalMutationVariables>;
export const EditCathodicSurveyDocument = gql`
    mutation EditCathodicSurvey($data: EditCathodicSurveyInput!) {
  editCathodicSurvey(data: $data) {
    cathodicSurvey {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type EditCathodicSurveyMutationFn = Apollo.MutationFunction<EditCathodicSurveyMutation, EditCathodicSurveyMutationVariables>;

/**
 * __useEditCathodicSurveyMutation__
 *
 * To run a mutation, you first call `useEditCathodicSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCathodicSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCathodicSurveyMutation, { data, loading, error }] = useEditCathodicSurveyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditCathodicSurveyMutation(baseOptions?: Apollo.MutationHookOptions<EditCathodicSurveyMutation, EditCathodicSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCathodicSurveyMutation, EditCathodicSurveyMutationVariables>(EditCathodicSurveyDocument, options);
      }
export type EditCathodicSurveyMutationHookResult = ReturnType<typeof useEditCathodicSurveyMutation>;
export type EditCathodicSurveyMutationResult = Apollo.MutationResult<EditCathodicSurveyMutation>;
export type EditCathodicSurveyMutationOptions = Apollo.BaseMutationOptions<EditCathodicSurveyMutation, EditCathodicSurveyMutationVariables>;
export const AddCathodicSurveyDocument = gql`
    mutation AddCathodicSurvey($pipelineId: String!) {
  addCathodicSurvey(pipelineId: $pipelineId) {
    cathodicSurvey {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type AddCathodicSurveyMutationFn = Apollo.MutationFunction<AddCathodicSurveyMutation, AddCathodicSurveyMutationVariables>;

/**
 * __useAddCathodicSurveyMutation__
 *
 * To run a mutation, you first call `useAddCathodicSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCathodicSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCathodicSurveyMutation, { data, loading, error }] = useAddCathodicSurveyMutation({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useAddCathodicSurveyMutation(baseOptions?: Apollo.MutationHookOptions<AddCathodicSurveyMutation, AddCathodicSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCathodicSurveyMutation, AddCathodicSurveyMutationVariables>(AddCathodicSurveyDocument, options);
      }
export type AddCathodicSurveyMutationHookResult = ReturnType<typeof useAddCathodicSurveyMutation>;
export type AddCathodicSurveyMutationResult = Apollo.MutationResult<AddCathodicSurveyMutation>;
export type AddCathodicSurveyMutationOptions = Apollo.BaseMutationOptions<AddCathodicSurveyMutation, AddCathodicSurveyMutationVariables>;
export const DeleteCathodicSurveyDocument = gql`
    mutation DeleteCathodicSurvey($id: String!) {
  deleteCathodicSurvey(id: $id) {
    cathodicSurvey {
      id
    }
    error {
      field
      message
    }
  }
}
    `;
export type DeleteCathodicSurveyMutationFn = Apollo.MutationFunction<DeleteCathodicSurveyMutation, DeleteCathodicSurveyMutationVariables>;

/**
 * __useDeleteCathodicSurveyMutation__
 *
 * To run a mutation, you first call `useDeleteCathodicSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCathodicSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCathodicSurveyMutation, { data, loading, error }] = useDeleteCathodicSurveyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCathodicSurveyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCathodicSurveyMutation, DeleteCathodicSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCathodicSurveyMutation, DeleteCathodicSurveyMutationVariables>(DeleteCathodicSurveyDocument, options);
      }
export type DeleteCathodicSurveyMutationHookResult = ReturnType<typeof useDeleteCathodicSurveyMutation>;
export type DeleteCathodicSurveyMutationResult = Apollo.MutationResult<DeleteCathodicSurveyMutation>;
export type DeleteCathodicSurveyMutationOptions = Apollo.BaseMutationOptions<DeleteCathodicSurveyMutation, DeleteCathodicSurveyMutationVariables>;
export const EditChemicalDocument = gql`
    mutation EditChemical($data: EditChemicalInput!) {
  editChemical(data: $data) {
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
 *      data: // value for 'data'
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
export const AllocatePipelineFlowDocument = gql`
    mutation AllocatePipelineFlow {
  allocatePipelineFlow {
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
export type AllocatePipelineFlowMutationFn = Apollo.MutationFunction<AllocatePipelineFlowMutation, AllocatePipelineFlowMutationVariables>;

/**
 * __useAllocatePipelineFlowMutation__
 *
 * To run a mutation, you first call `useAllocatePipelineFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocatePipelineFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocatePipelineFlowMutation, { data, loading, error }] = useAllocatePipelineFlowMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllocatePipelineFlowMutation(baseOptions?: Apollo.MutationHookOptions<AllocatePipelineFlowMutation, AllocatePipelineFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllocatePipelineFlowMutation, AllocatePipelineFlowMutationVariables>(AllocatePipelineFlowDocument, options);
      }
export type AllocatePipelineFlowMutationHookResult = ReturnType<typeof useAllocatePipelineFlowMutation>;
export type AllocatePipelineFlowMutationResult = Apollo.MutationResult<AllocatePipelineFlowMutation>;
export type AllocatePipelineFlowMutationOptions = Apollo.BaseMutationOptions<AllocatePipelineFlowMutation, AllocatePipelineFlowMutationVariables>;
export const AllocateWellFlowDocument = gql`
    mutation AllocateWellFlow {
  allocateWellFlow {
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
export type AllocateWellFlowMutationFn = Apollo.MutationFunction<AllocateWellFlowMutation, AllocateWellFlowMutationVariables>;

/**
 * __useAllocateWellFlowMutation__
 *
 * To run a mutation, you first call `useAllocateWellFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocateWellFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocateWellFlowMutation, { data, loading, error }] = useAllocateWellFlowMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllocateWellFlowMutation(baseOptions?: Apollo.MutationHookOptions<AllocateWellFlowMutation, AllocateWellFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllocateWellFlowMutation, AllocateWellFlowMutationVariables>(AllocateWellFlowDocument, options);
      }
export type AllocateWellFlowMutationHookResult = ReturnType<typeof useAllocateWellFlowMutation>;
export type AllocateWellFlowMutationResult = Apollo.MutationResult<AllocateWellFlowMutation>;
export type AllocateWellFlowMutationOptions = Apollo.BaseMutationOptions<AllocateWellFlowMutation, AllocateWellFlowMutationVariables>;
export const AllocateSalesPointFlowDocument = gql`
    mutation AllocateSalesPointFlow {
  allocateSalesPointFlow {
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
export type AllocateSalesPointFlowMutationFn = Apollo.MutationFunction<AllocateSalesPointFlowMutation, AllocateSalesPointFlowMutationVariables>;

/**
 * __useAllocateSalesPointFlowMutation__
 *
 * To run a mutation, you first call `useAllocateSalesPointFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocateSalesPointFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocateSalesPointFlowMutation, { data, loading, error }] = useAllocateSalesPointFlowMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllocateSalesPointFlowMutation(baseOptions?: Apollo.MutationHookOptions<AllocateSalesPointFlowMutation, AllocateSalesPointFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllocateSalesPointFlowMutation, AllocateSalesPointFlowMutationVariables>(AllocateSalesPointFlowDocument, options);
      }
export type AllocateSalesPointFlowMutationHookResult = ReturnType<typeof useAllocateSalesPointFlowMutation>;
export type AllocateSalesPointFlowMutationResult = Apollo.MutationResult<AllocateSalesPointFlowMutation>;
export type AllocateSalesPointFlowMutationOptions = Apollo.BaseMutationOptions<AllocateSalesPointFlowMutation, AllocateSalesPointFlowMutationVariables>;
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
export const AllocatePressureTestDocument = gql`
    mutation AllocatePressureTest {
  allocatePressureTest {
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
export type AllocatePressureTestMutationFn = Apollo.MutationFunction<AllocatePressureTestMutation, AllocatePressureTestMutationVariables>;

/**
 * __useAllocatePressureTestMutation__
 *
 * To run a mutation, you first call `useAllocatePressureTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocatePressureTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocatePressureTestMutation, { data, loading, error }] = useAllocatePressureTestMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllocatePressureTestMutation(baseOptions?: Apollo.MutationHookOptions<AllocatePressureTestMutation, AllocatePressureTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllocatePressureTestMutation, AllocatePressureTestMutationVariables>(AllocatePressureTestDocument, options);
      }
export type AllocatePressureTestMutationHookResult = ReturnType<typeof useAllocatePressureTestMutation>;
export type AllocatePressureTestMutationResult = Apollo.MutationResult<AllocatePressureTestMutation>;
export type AllocatePressureTestMutationOptions = Apollo.BaseMutationOptions<AllocatePressureTestMutation, AllocatePressureTestMutationVariables>;
export const AllocateChronologicalEdgeDocument = gql`
    mutation AllocateChronologicalEdge {
  allocateChronologicalEdge {
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
export type AllocateChronologicalEdgeMutationFn = Apollo.MutationFunction<AllocateChronologicalEdgeMutation, AllocateChronologicalEdgeMutationVariables>;

/**
 * __useAllocateChronologicalEdgeMutation__
 *
 * To run a mutation, you first call `useAllocateChronologicalEdgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocateChronologicalEdgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocateChronologicalEdgeMutation, { data, loading, error }] = useAllocateChronologicalEdgeMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllocateChronologicalEdgeMutation(baseOptions?: Apollo.MutationHookOptions<AllocateChronologicalEdgeMutation, AllocateChronologicalEdgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllocateChronologicalEdgeMutation, AllocateChronologicalEdgeMutationVariables>(AllocateChronologicalEdgeDocument, options);
      }
export type AllocateChronologicalEdgeMutationHookResult = ReturnType<typeof useAllocateChronologicalEdgeMutation>;
export type AllocateChronologicalEdgeMutationResult = Apollo.MutationResult<AllocateChronologicalEdgeMutation>;
export type AllocateChronologicalEdgeMutationOptions = Apollo.BaseMutationOptions<AllocateChronologicalEdgeMutation, AllocateChronologicalEdgeMutationVariables>;
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
      piggable
      piggingFrequency
      comment
      satelliteId
      currentFrom
      currentFromFeature
      currentTo
      currentToFeature
      currentStatus
      currentSubstance
      firstLicenseDate
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
    pigTypeId
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
    flowCalculationDirectionEnum {
      serverEnum
      databaseEnum
    }
    satelliteEnum {
      serverEnum
      databaseEnum
    }
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
    pipelineTypeEnum {
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
    limitingSpecEnum {
      serverEnum
      databaseEnum
    }
    riskEnvironmentEnum {
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
    companyEnum {
      serverEnum
      databaseEnum
    }
    operationEnum {
      serverEnum
      databaseEnum
    }
    havingEnum {
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
export const ValidatorsUserRoleDocument = gql`
    query ValidatorsUserRole {
  validators {
    userRoleEnum {
      serverEnum
      databaseEnum
    }
  }
}
    `;

/**
 * __useValidatorsUserRoleQuery__
 *
 * To run a query within a React component, call `useValidatorsUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorsUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorsUserRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidatorsUserRoleQuery(baseOptions?: Apollo.QueryHookOptions<ValidatorsUserRoleQuery, ValidatorsUserRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorsUserRoleQuery, ValidatorsUserRoleQueryVariables>(ValidatorsUserRoleDocument, options);
      }
export function useValidatorsUserRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorsUserRoleQuery, ValidatorsUserRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorsUserRoleQuery, ValidatorsUserRoleQueryVariables>(ValidatorsUserRoleDocument, options);
        }
export type ValidatorsUserRoleQueryHookResult = ReturnType<typeof useValidatorsUserRoleQuery>;
export type ValidatorsUserRoleLazyQueryHookResult = ReturnType<typeof useValidatorsUserRoleLazyQuery>;
export type ValidatorsUserRoleQueryResult = Apollo.QueryResult<ValidatorsUserRoleQuery, ValidatorsUserRoleQueryVariables>;
export const LicenseChangesByPipelineIdDocument = gql`
    query LicenseChangesByPipelineId($pipelineId: String!) {
  licenseChangesByPipelineId(pipelineId: $pipelineId) {
    id
    date
    statusId
    substanceId
    from
    fromFeatureId
    to
    toFeatureId
    length
    pipelineTypeId
    gradeId
    yieldStrength
    outsideDiameter
    wallThickness
    materialId
    mop
    internalProtectionId
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
    date
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
    environmentId
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
export const GeotechnicalsByPipelineIdDocument = gql`
    query GeotechnicalsByPipelineId($pipelineId: String!) {
  geotechnicalsByPipelineId(pipelineId: $pipelineId) {
    id
    slopeAngleS1
    facingS1
    heightS1
    slopeAngleS2
    facingS2
    heightS2
    dateSlopeChecked
    comment
    createdAt
    updatedAt
    createdBy {
      id
      email
    }
    updatedBy {
      id
      email
    }
    authorized
  }
}
    `;

/**
 * __useGeotechnicalsByPipelineIdQuery__
 *
 * To run a query within a React component, call `useGeotechnicalsByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeotechnicalsByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeotechnicalsByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useGeotechnicalsByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<GeotechnicalsByPipelineIdQuery, GeotechnicalsByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeotechnicalsByPipelineIdQuery, GeotechnicalsByPipelineIdQueryVariables>(GeotechnicalsByPipelineIdDocument, options);
      }
export function useGeotechnicalsByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeotechnicalsByPipelineIdQuery, GeotechnicalsByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeotechnicalsByPipelineIdQuery, GeotechnicalsByPipelineIdQueryVariables>(GeotechnicalsByPipelineIdDocument, options);
        }
export type GeotechnicalsByPipelineIdQueryHookResult = ReturnType<typeof useGeotechnicalsByPipelineIdQuery>;
export type GeotechnicalsByPipelineIdLazyQueryHookResult = ReturnType<typeof useGeotechnicalsByPipelineIdLazyQuery>;
export type GeotechnicalsByPipelineIdQueryResult = Apollo.QueryResult<GeotechnicalsByPipelineIdQuery, GeotechnicalsByPipelineIdQueryVariables>;
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
export const CathodicSurveysByPipelineIdDocument = gql`
    query CathodicSurveysByPipelineId($pipelineId: String!) {
  cathodicSurveysByPipelineId(pipelineId: $pipelineId) {
    id
    date
    companyId
    deficiencies
    correctionDate
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
 * __useCathodicSurveysByPipelineIdQuery__
 *
 * To run a query within a React component, call `useCathodicSurveysByPipelineIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCathodicSurveysByPipelineIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCathodicSurveysByPipelineIdQuery({
 *   variables: {
 *      pipelineId: // value for 'pipelineId'
 *   },
 * });
 */
export function useCathodicSurveysByPipelineIdQuery(baseOptions: Apollo.QueryHookOptions<CathodicSurveysByPipelineIdQuery, CathodicSurveysByPipelineIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CathodicSurveysByPipelineIdQuery, CathodicSurveysByPipelineIdQueryVariables>(CathodicSurveysByPipelineIdDocument, options);
      }
export function useCathodicSurveysByPipelineIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CathodicSurveysByPipelineIdQuery, CathodicSurveysByPipelineIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CathodicSurveysByPipelineIdQuery, CathodicSurveysByPipelineIdQueryVariables>(CathodicSurveysByPipelineIdDocument, options);
        }
export type CathodicSurveysByPipelineIdQueryHookResult = ReturnType<typeof useCathodicSurveysByPipelineIdQuery>;
export type CathodicSurveysByPipelineIdLazyQueryHookResult = ReturnType<typeof useCathodicSurveysByPipelineIdLazyQuery>;
export type CathodicSurveysByPipelineIdQueryResult = Apollo.QueryResult<CathodicSurveysByPipelineIdQuery, CathodicSurveysByPipelineIdQueryVariables>;
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
export const PipelineFlowAllocationProgressDocument = gql`
    subscription PipelineFlowAllocationProgress($data: AllocationInput!) {
  pipelineFlowAllocationProgress(data: $data) {
    progress
    numberOfItems
  }
}
    `;

/**
 * __usePipelineFlowAllocationProgressSubscription__
 *
 * To run a query within a React component, call `usePipelineFlowAllocationProgressSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePipelineFlowAllocationProgressSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePipelineFlowAllocationProgressSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePipelineFlowAllocationProgressSubscription(baseOptions: Apollo.SubscriptionHookOptions<PipelineFlowAllocationProgressSubscription, PipelineFlowAllocationProgressSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PipelineFlowAllocationProgressSubscription, PipelineFlowAllocationProgressSubscriptionVariables>(PipelineFlowAllocationProgressDocument, options);
      }
export type PipelineFlowAllocationProgressSubscriptionHookResult = ReturnType<typeof usePipelineFlowAllocationProgressSubscription>;
export type PipelineFlowAllocationProgressSubscriptionResult = Apollo.SubscriptionResult<PipelineFlowAllocationProgressSubscription>;
export const WellFlowAllocationProgressDocument = gql`
    subscription WellFlowAllocationProgress($data: AllocationInput!) {
  wellFlowAllocationProgress(data: $data) {
    progress
    numberOfItems
  }
}
    `;

/**
 * __useWellFlowAllocationProgressSubscription__
 *
 * To run a query within a React component, call `useWellFlowAllocationProgressSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWellFlowAllocationProgressSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellFlowAllocationProgressSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useWellFlowAllocationProgressSubscription(baseOptions: Apollo.SubscriptionHookOptions<WellFlowAllocationProgressSubscription, WellFlowAllocationProgressSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WellFlowAllocationProgressSubscription, WellFlowAllocationProgressSubscriptionVariables>(WellFlowAllocationProgressDocument, options);
      }
export type WellFlowAllocationProgressSubscriptionHookResult = ReturnType<typeof useWellFlowAllocationProgressSubscription>;
export type WellFlowAllocationProgressSubscriptionResult = Apollo.SubscriptionResult<WellFlowAllocationProgressSubscription>;
export const SalesPointFlowAllocationProgressDocument = gql`
    subscription SalesPointFlowAllocationProgress($data: AllocationInput!) {
  salesPointFlowAllocationProgress(data: $data) {
    progress
    numberOfItems
  }
}
    `;

/**
 * __useSalesPointFlowAllocationProgressSubscription__
 *
 * To run a query within a React component, call `useSalesPointFlowAllocationProgressSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSalesPointFlowAllocationProgressSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesPointFlowAllocationProgressSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSalesPointFlowAllocationProgressSubscription(baseOptions: Apollo.SubscriptionHookOptions<SalesPointFlowAllocationProgressSubscription, SalesPointFlowAllocationProgressSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SalesPointFlowAllocationProgressSubscription, SalesPointFlowAllocationProgressSubscriptionVariables>(SalesPointFlowAllocationProgressDocument, options);
      }
export type SalesPointFlowAllocationProgressSubscriptionHookResult = ReturnType<typeof useSalesPointFlowAllocationProgressSubscription>;
export type SalesPointFlowAllocationProgressSubscriptionResult = Apollo.SubscriptionResult<SalesPointFlowAllocationProgressSubscription>;
export const RiskAllocationProgressDocument = gql`
    subscription RiskAllocationProgress($data: AllocationInput!) {
  riskAllocationProgress(data: $data) {
    progress
    numberOfItems
  }
}
    `;

/**
 * __useRiskAllocationProgressSubscription__
 *
 * To run a query within a React component, call `useRiskAllocationProgressSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRiskAllocationProgressSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRiskAllocationProgressSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRiskAllocationProgressSubscription(baseOptions: Apollo.SubscriptionHookOptions<RiskAllocationProgressSubscription, RiskAllocationProgressSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RiskAllocationProgressSubscription, RiskAllocationProgressSubscriptionVariables>(RiskAllocationProgressDocument, options);
      }
export type RiskAllocationProgressSubscriptionHookResult = ReturnType<typeof useRiskAllocationProgressSubscription>;
export type RiskAllocationProgressSubscriptionResult = Apollo.SubscriptionResult<RiskAllocationProgressSubscription>;
export const ChronologicalEdgeAllocationProgressDocument = gql`
    subscription ChronologicalEdgeAllocationProgress($data: AllocationInput!) {
  chronologicalEdgeAllocationProgress(data: $data) {
    progress
    numberOfItems
  }
}
    `;

/**
 * __useChronologicalEdgeAllocationProgressSubscription__
 *
 * To run a query within a React component, call `useChronologicalEdgeAllocationProgressSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChronologicalEdgeAllocationProgressSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChronologicalEdgeAllocationProgressSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChronologicalEdgeAllocationProgressSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChronologicalEdgeAllocationProgressSubscription, ChronologicalEdgeAllocationProgressSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChronologicalEdgeAllocationProgressSubscription, ChronologicalEdgeAllocationProgressSubscriptionVariables>(ChronologicalEdgeAllocationProgressDocument, options);
      }
export type ChronologicalEdgeAllocationProgressSubscriptionHookResult = ReturnType<typeof useChronologicalEdgeAllocationProgressSubscription>;
export type ChronologicalEdgeAllocationProgressSubscriptionResult = Apollo.SubscriptionResult<ChronologicalEdgeAllocationProgressSubscription>;
export const PressureTestAllocationProgressDocument = gql`
    subscription PressureTestAllocationProgress($data: AllocationInput!) {
  pressureTestAllocationProgress(data: $data) {
    progress
    numberOfItems
  }
}
    `;

/**
 * __usePressureTestAllocationProgressSubscription__
 *
 * To run a query within a React component, call `usePressureTestAllocationProgressSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePressureTestAllocationProgressSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePressureTestAllocationProgressSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePressureTestAllocationProgressSubscription(baseOptions: Apollo.SubscriptionHookOptions<PressureTestAllocationProgressSubscription, PressureTestAllocationProgressSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PressureTestAllocationProgressSubscription, PressureTestAllocationProgressSubscriptionVariables>(PressureTestAllocationProgressDocument, options);
      }
export type PressureTestAllocationProgressSubscriptionHookResult = ReturnType<typeof usePressureTestAllocationProgressSubscription>;
export type PressureTestAllocationProgressSubscriptionResult = Apollo.SubscriptionResult<PressureTestAllocationProgressSubscription>;
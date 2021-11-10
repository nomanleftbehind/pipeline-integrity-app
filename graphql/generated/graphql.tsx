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
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  errors?: Maybe<Array<Maybe<FieldError>>>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Edge = {
  __typename?: 'Edge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Pipeline>;
};

export type Facility = {
  __typename?: 'Facility';
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
  __typename?: 'FieldError';
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

export type InjectionPoint = {
  __typename?: 'InjectionPoint';
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

export type Mutation = {
  __typename?: 'Mutation';
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
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
  satelliteUniqueInput?: Maybe<SatelliteUniqueInput>;
  segment?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  substance?: Maybe<SubstanceEnum>;
  to?: Maybe<Scalars['String']>;
  toFeature?: Maybe<FromToFeatureEnum>;
  type?: Maybe<TypeEnum>;
  wallThickness?: Maybe<Scalars['Float']>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type Pipeline = {
  __typename?: 'Pipeline';
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
  material?: Maybe<MaterialEnum>;
  mop?: Maybe<Scalars['Int']>;
  outsideDiameter?: Maybe<Scalars['Float']>;
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
  __typename?: 'Query';
  allFacilities?: Maybe<Array<Maybe<Facility>>>;
  allInjectionPoints?: Maybe<Array<Maybe<InjectionPoint>>>;
  allSatellites?: Maybe<Array<Maybe<Satellite>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  pipelinesById?: Maybe<Array<Maybe<Pipeline>>>;
  pipelinesByUser?: Maybe<Array<Maybe<Pipeline>>>;
};


export type QueryPipelinesByIdArgs = {
  facilityId?: Maybe<Scalars['String']>;
  satelliteId?: Maybe<Scalars['String']>;
};


export type QueryPipelinesByUserArgs = {
  userUniqueInput: UserUniqueInput;
};

export type Response = {
  __typename?: 'Response';
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Satellite = {
  __typename?: 'Satellite';
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

export type User = {
  __typename?: 'User';
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type DeletePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePipelineMutation = { __typename?: 'Mutation', deletePipeline?: { __typename?: 'Pipeline', id: string, license: string, segment: string } | null | undefined };

export type DuplicatePipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicatePipelineMutation = { __typename?: 'Mutation', duplicatePipeline?: { __typename?: 'Pipeline', id: string, license: string, segment: string } | null | undefined };

export type DeleteInjectionPointFromPipelineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteInjectionPointFromPipelineMutation = { __typename?: 'Mutation', deleteInjectionPointFromPipeline?: { __typename?: 'InjectionPoint', id: string, source: string } | null | undefined };

export type ChangeInjectionPointToPipelineMutationVariables = Exact<{
  id: Scalars['String'];
  pipelineId?: Maybe<Scalars['String']>;
}>;


export type ChangeInjectionPointToPipelineMutation = { __typename?: 'Mutation', editInjectionPoint?: { __typename?: 'InjectionPoint', id: string, source: string, pipeline?: { __typename?: 'Pipeline', id: string, license: string, segment: string } | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role } | null | undefined };

export type PipelinesByIdQueryQueryVariables = Exact<{
  satelliteId?: Maybe<Scalars['String']>;
  facilityId?: Maybe<Scalars['String']>;
}>;


export type PipelinesByIdQueryQuery = { __typename?: 'Query', pipelinesById?: Array<{ __typename?: 'Pipeline', id: string, createdAt: any, license: string, segment: string, substance: SubstanceEnum, from: string, fromFeature?: FromToFeatureEnum | null | undefined, to: string, toFeature?: FromToFeatureEnum | null | undefined, status: StatusEnum, length: number, type?: TypeEnum | null | undefined, grade?: GradeEnum | null | undefined, outsideDiameter?: number | null | undefined, wallThickness?: number | null | undefined, material?: MaterialEnum | null | undefined, mop?: number | null | undefined, internalProtection?: InternalProtectionEnum | null | undefined, satellite?: { __typename?: 'Satellite', id: string, facility?: { __typename?: 'Facility', id: string } | null | undefined } | null | undefined, injectionPoints?: Array<{ __typename?: 'InjectionPoint', id: string, source: string, oil: number, gas: number, water: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type AllInjectionPointsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllInjectionPointsQueryQuery = { __typename?: 'Query', allInjectionPoints?: Array<{ __typename?: 'InjectionPoint', id: string, source: string, pipeline?: { __typename?: 'Pipeline', id: string, license: string, segment: string } | null | undefined, satellite?: { __typename?: 'Satellite', id: string, name: string, facility?: { __typename?: 'Facility', id: string, name: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined };


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
    length
    type
    grade
    outsideDiameter
    wallThickness
    material
    mop
    internalProtection
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
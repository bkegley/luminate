import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql'
import {CuppingSessionDocument, SessionCoffeeDocument, ScoreSheetDocument} from './models'
import {Context} from './startServer'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = {[X in Exclude<keyof T, K>]?: T[X]} & {[P in K]-?: NonNullable<T[P]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  ScoreFloat: any
  _FieldSet: any
}

export type Brewer = {
  __typename?: 'Brewer'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export type BrewerConnection = {
  __typename?: 'BrewerConnection'
  pageInfo: PageInfo
  edges: Array<BrewerEdge>
}

export type BrewerEdge = {
  __typename?: 'BrewerEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Brewer>
}

export enum BrewerType {
  Autodrip = 'AUTODRIP',
  FullImmersion = 'FULL_IMMERSION',
  Pourover = 'POUROVER',
  Espresso = 'ESPRESSO',
}

export type BrewGuide = {
  __typename?: 'BrewGuide'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  recipe?: Maybe<Recipe>
}

export type BrewGuideConnection = {
  __typename?: 'BrewGuideConnection'
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<BrewGuideEdge>>>
}

export type BrewGuideEdge = {
  __typename?: 'BrewGuideEdge'
  cursor: Scalars['String']
  node: BrewGuide
}

export type BrewingSession = {
  __typename?: 'BrewingSession'
  id: Scalars['ID']
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type BrewingSessionConnection = {
  __typename?: 'BrewingSessionConnection'
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<BrewingSessionEdge>>>
}

export type BrewingSessionEdge = {
  __typename?: 'BrewingSessionEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<BrewingSession>
}

export enum BurrSet {
  ConicalBurr = 'CONICAL_BURR',
  FlatBurr = 'FLAT_BURR',
  Blade = 'BLADE',
}

export type Coffee = {
  __typename?: 'Coffee'
  id: Scalars['ID']
}

export type CreateBrewerInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export type CreateBrewGuideInput = {
  name: Scalars['String']
  recipeId: Scalars['ID']
}

export type CreateBrewingSessionInput = {
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type CreateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type CreateDeviceInput = {
  name: Scalars['String']
}

export type CreateEvaluationInput = {
  date?: Maybe<Scalars['String']>
}

export type CreateGrinderInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type CreateRecipeInput = {
  name: Scalars['String']
  brewerId: Scalars['ID']
  grinderId: Scalars['ID']
  grindSetting?: Maybe<Scalars['Int']>
  note?: Maybe<Scalars['String']>
}

export type CreateScoreSheetInput = {
  userId?: Maybe<Scalars['ID']>
  fragranceAroma?: Maybe<Scalars['ScoreFloat']>
  flavor?: Maybe<Scalars['ScoreFloat']>
  aftertaste?: Maybe<Scalars['ScoreFloat']>
  acidity?: Maybe<Scalars['ScoreFloat']>
  body?: Maybe<Scalars['ScoreFloat']>
  uniformity?: Maybe<Scalars['ScoreFloat']>
  cleanCup?: Maybe<Scalars['ScoreFloat']>
  balance?: Maybe<Scalars['ScoreFloat']>
  sweetness?: Maybe<Scalars['ScoreFloat']>
  overall?: Maybe<Scalars['ScoreFloat']>
  taints?: Maybe<DefectScoreInput>
  defects?: Maybe<DefectScoreInput>
}

export type CuppingSession = {
  __typename?: 'CuppingSession'
  id: Scalars['ID']
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  locked?: Maybe<Scalars['Boolean']>
  sessionCoffees?: Maybe<Array<Maybe<SessionCoffee>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type CuppingSessionConnection = {
  __typename?: 'CuppingSessionConnection'
  pageInfo: PageInfo
  edges: Array<CuppingSessionEdge>
}

export type CuppingSessionEdge = {
  __typename?: 'CuppingSessionEdge'
  cursor: Scalars['String']
  node: CuppingSession
}

export type DefectScore = {
  __typename?: 'DefectScore'
  numberOfCups?: Maybe<Scalars['Int']>
  intensity?: Maybe<Scalars['Float']>
}

export type DefectScoreInput = {
  numberOfCups?: Maybe<Scalars['Int']>
  intensity?: Maybe<Scalars['Float']>
}

export type Device = {
  __typename?: 'Device'
  id: Scalars['ID']
  name: Scalars['String']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type DeviceConnection = {
  __typename?: 'DeviceConnection'
  pageInfo: PageInfo
  edges: Array<DeviceEdge>
}

export type DeviceEdge = {
  __typename?: 'DeviceEdge'
  cursor: Scalars['String']
  node: Device
}

export type Evaluation = {
  __typename?: 'Evaluation'
  id: Scalars['ID']
  date?: Maybe<Scalars['String']>
}

export type EvaluationConnection = {
  __typename?: 'EvaluationConnection'
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<EvaluationEdge>>>
}

export type EvaluationEdge = {
  __typename?: 'EvaluationEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Evaluation>
}

export type Grinder = {
  __typename?: 'Grinder'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type GrinderConnection = {
  __typename?: 'GrinderConnection'
  pageInfo: PageInfo
  edges: Array<GrinderEdge>
}

export type GrinderEdge = {
  __typename?: 'GrinderEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Grinder>
}

export type Mutation = {
  __typename?: 'Mutation'
  createBrewer?: Maybe<Brewer>
  updateBrewer?: Maybe<Brewer>
  deleteBrewer?: Maybe<Scalars['Boolean']>
  createBrewGuide?: Maybe<BrewGuide>
  updateBrewGuide?: Maybe<BrewGuide>
  deleteBrewGuide?: Maybe<Scalars['Boolean']>
  createBrewingSession?: Maybe<BrewingSession>
  updateBrewingSession?: Maybe<BrewingSession>
  deleteBrewingSession?: Maybe<Scalars['Boolean']>
  createCuppingSession?: Maybe<CuppingSession>
  updateCuppingSession?: Maybe<CuppingSession>
  deleteCuppingSession?: Maybe<CuppingSession>
  updateCuppingSessionCoffees?: Maybe<CuppingSession>
  lockCuppingSession?: Maybe<CuppingSession>
  createDevice?: Maybe<Device>
  updateDevice?: Maybe<Device>
  deleteDevice?: Maybe<Device>
  createEvaluation?: Maybe<Evaluation>
  updateEvaluation?: Maybe<Evaluation>
  deleteEvaluation?: Maybe<Scalars['Boolean']>
  createGrinder?: Maybe<Grinder>
  updateGrinder?: Maybe<Grinder>
  deleteGrinder?: Maybe<Scalars['Boolean']>
  createRecipe?: Maybe<Recipe>
  updateRecipe?: Maybe<Recipe>
  deleteRecipe?: Maybe<Scalars['Boolean']>
  createScoreSheet?: Maybe<ScoreSheet>
  updateScoreSheet?: Maybe<ScoreSheet>
  deleteScoreSheet?: Maybe<CuppingSession>
}

export type MutationCreateBrewerArgs = {
  input: CreateBrewerInput
}

export type MutationUpdateBrewerArgs = {
  id: Scalars['ID']
  input: UpdateBrewerInput
}

export type MutationDeleteBrewerArgs = {
  id: Scalars['ID']
}

export type MutationCreateBrewGuideArgs = {
  input: CreateBrewGuideInput
}

export type MutationUpdateBrewGuideArgs = {
  id: Scalars['ID']
  input: UpdateBrewGuideInput
}

export type MutationDeleteBrewGuideArgs = {
  id: Scalars['ID']
}

export type MutationCreateBrewingSessionArgs = {
  input?: Maybe<CreateBrewingSessionInput>
}

export type MutationUpdateBrewingSessionArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateBrewingSessionInput>
}

export type MutationDeleteBrewingSessionArgs = {
  id: Scalars['ID']
}

export type MutationCreateCuppingSessionArgs = {
  input: CreateCuppingSessionInput
}

export type MutationUpdateCuppingSessionArgs = {
  id: Scalars['ID']
  input: UpdateCuppingSessionInput
}

export type MutationDeleteCuppingSessionArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCuppingSessionCoffeesArgs = {
  id: Scalars['ID']
  sessionCoffees: Array<SessionCoffeeInput>
}

export type MutationLockCuppingSessionArgs = {
  id: Scalars['ID']
}

export type MutationCreateDeviceArgs = {
  input: CreateDeviceInput
}

export type MutationUpdateDeviceArgs = {
  id: Scalars['ID']
  input: UpdateDeviceInput
}

export type MutationDeleteDeviceArgs = {
  id: Scalars['ID']
}

export type MutationCreateEvaluationArgs = {
  input?: Maybe<CreateEvaluationInput>
}

export type MutationUpdateEvaluationArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateEvaluationInput>
}

export type MutationDeleteEvaluationArgs = {
  id: Scalars['ID']
}

export type MutationCreateGrinderArgs = {
  input: CreateGrinderInput
}

export type MutationUpdateGrinderArgs = {
  id: Scalars['ID']
  input: UpdateGrinderInput
}

export type MutationDeleteGrinderArgs = {
  id: Scalars['ID']
}

export type MutationCreateRecipeArgs = {
  input?: Maybe<CreateRecipeInput>
}

export type MutationUpdateRecipeArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateRecipeInput>
}

export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']
}

export type MutationCreateScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  input: CreateScoreSheetInput
}

export type MutationUpdateScoreSheetArgs = {
  scoreSheetId: Scalars['ID']
  sessionCoffeeId: Scalars['ID']
  input: UpdateScoreSheetInput
}

export type MutationDeleteScoreSheetArgs = {
  id: Scalars['ID']
}

export enum OperatorEnum {
  Eq = 'eq',
  Ne = 'ne',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Contains = 'contains',
  ContainsSensitive = 'containsSensitive',
}

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage?: Maybe<Scalars['Boolean']>
  prevCursor?: Maybe<Scalars['String']>
  nextCursor?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  listBrewers: BrewerConnection
  getBrewer?: Maybe<Brewer>
  listBrewGuides: BrewGuideConnection
  getBrewGuide?: Maybe<BrewGuide>
  listBrewingSessions?: Maybe<BrewingSessionConnection>
  getBrewingSession?: Maybe<BrewingSession>
  listCuppingSessions: CuppingSessionConnection
  getCuppingSession?: Maybe<CuppingSession>
  getCuppingSessionCoffee?: Maybe<SessionCoffee>
  listDevices: DeviceConnection
  getDevice?: Maybe<Device>
  listEvaluations?: Maybe<EvaluationConnection>
  getEvaluation?: Maybe<Evaluation>
  listGrinders: GrinderConnection
  getGrinder?: Maybe<Grinder>
  listRecipes: RecipeConnection
  getRecipe?: Maybe<Recipe>
  listScoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
  getScoreSheet?: Maybe<ScoreSheet>
}

export type QueryGetBrewerArgs = {
  id: Scalars['ID']
}

export type QueryGetBrewGuideArgs = {
  id: Scalars['ID']
}

export type QueryGetBrewingSessionArgs = {
  id: Scalars['ID']
}

export type QueryListCuppingSessionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetCuppingSessionArgs = {
  id: Scalars['ID']
}

export type QueryGetCuppingSessionCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryListDevicesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetDeviceArgs = {
  id: Scalars['ID']
}

export type QueryGetEvaluationArgs = {
  id: Scalars['ID']
}

export type QueryGetGrinderArgs = {
  id: Scalars['ID']
}

export type QueryGetRecipeArgs = {
  id: Scalars['ID']
}

export type QueryListScoreSheetsArgs = {
  sessionCoffeeId: Scalars['ID']
}

export type QueryGetScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  scoreSheetId: Scalars['ID']
}

export type QueryInput = {
  field: Scalars['String']
  value?: Maybe<Scalars['String']>
  operator?: Maybe<OperatorEnum>
}

export type Recipe = {
  __typename?: 'Recipe'
  id: Scalars['ID']
  name: Scalars['String']
  grinder: Grinder
  grindSetting?: Maybe<Scalars['Int']>
  brewer: Brewer
  note?: Maybe<Scalars['String']>
}

export type RecipeConnection = {
  __typename?: 'RecipeConnection'
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<RecipeEdge>>>
}

export type RecipeEdge = {
  __typename?: 'RecipeEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Recipe>
}

export type ScoreSheet = {
  __typename?: 'ScoreSheet'
  id: Scalars['ID']
  totalScore?: Maybe<Scalars['Float']>
  fragranceAroma?: Maybe<Scalars['ScoreFloat']>
  flavor?: Maybe<Scalars['ScoreFloat']>
  aftertaste?: Maybe<Scalars['ScoreFloat']>
  acidity?: Maybe<Scalars['ScoreFloat']>
  body?: Maybe<Scalars['ScoreFloat']>
  uniformity?: Maybe<Scalars['ScoreFloat']>
  cleanCup?: Maybe<Scalars['ScoreFloat']>
  balance?: Maybe<Scalars['ScoreFloat']>
  sweetness?: Maybe<Scalars['ScoreFloat']>
  overall?: Maybe<Scalars['ScoreFloat']>
  taints?: Maybe<DefectScore>
  defects?: Maybe<DefectScore>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
  user?: Maybe<User>
}

export type SessionCoffee = {
  __typename?: 'SessionCoffee'
  id: Scalars['ID']
  sampleNumber: Scalars['ID']
  coffee: Coffee
  averageScore?: Maybe<Scalars['Float']>
  scoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
}

export type SessionCoffeeInput = {
  sampleNumber: Scalars['ID']
  coffee: Scalars['ID']
}

export type UpdateBrewerInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export type UpdateBrewGuideInput = {
  name?: Maybe<Scalars['String']>
  recipeId?: Maybe<Scalars['ID']>
}

export type UpdateBrewingSessionInput = {
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type UpdateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type UpdateDeviceInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateEvaluationInput = {
  date?: Maybe<Scalars['String']>
}

export type UpdateGrinderInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type UpdateRecipeInput = {
  name: Scalars['String']
  brewerId: Scalars['ID']
  grinderId: Scalars['ID']
  grindSetting?: Maybe<Scalars['Int']>
  note?: Maybe<Scalars['String']>
}

export type UpdateScoreSheetInput = {
  userId?: Maybe<Scalars['ID']>
  fragranceAroma?: Maybe<Scalars['ScoreFloat']>
  flavor?: Maybe<Scalars['ScoreFloat']>
  aftertaste?: Maybe<Scalars['ScoreFloat']>
  acidity?: Maybe<Scalars['ScoreFloat']>
  body?: Maybe<Scalars['ScoreFloat']>
  uniformity?: Maybe<Scalars['ScoreFloat']>
  cleanCup?: Maybe<Scalars['ScoreFloat']>
  balance?: Maybe<Scalars['ScoreFloat']>
  sweetness?: Maybe<Scalars['ScoreFloat']>
  overall?: Maybe<Scalars['ScoreFloat']>
  taints?: Maybe<DefectScoreInput>
  defects?: Maybe<DefectScoreInput>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type ReferenceResolver<TResult, TReference, TContext> = (
  reference: TReference,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{[key in TKey]: TResult}, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, {[key in TKey]: TResult}, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>
  BrewerConnection: ResolverTypeWrapper<BrewerConnection>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  String: ResolverTypeWrapper<Scalars['String']>
  BrewerEdge: ResolverTypeWrapper<BrewerEdge>
  Brewer: ResolverTypeWrapper<Brewer>
  ID: ResolverTypeWrapper<Scalars['ID']>
  BrewerType: BrewerType
  BrewGuideConnection: ResolverTypeWrapper<BrewGuideConnection>
  BrewGuideEdge: ResolverTypeWrapper<BrewGuideEdge>
  BrewGuide: ResolverTypeWrapper<BrewGuide>
  Recipe: ResolverTypeWrapper<Recipe>
  Grinder: ResolverTypeWrapper<Grinder>
  BurrSet: BurrSet
  Int: ResolverTypeWrapper<Scalars['Int']>
  BrewingSessionConnection: ResolverTypeWrapper<BrewingSessionConnection>
  BrewingSessionEdge: ResolverTypeWrapper<BrewingSessionEdge>
  BrewingSession: ResolverTypeWrapper<BrewingSession>
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  CuppingSessionConnection: ResolverTypeWrapper<
    Omit<CuppingSessionConnection, 'edges'> & {edges: Array<ResolversTypes['CuppingSessionEdge']>}
  >
  CuppingSessionEdge: ResolverTypeWrapper<Omit<CuppingSessionEdge, 'node'> & {node: ResolversTypes['CuppingSession']}>
  CuppingSession: ResolverTypeWrapper<CuppingSessionDocument>
  SessionCoffee: ResolverTypeWrapper<SessionCoffeeDocument>
  Coffee: ResolverTypeWrapper<Coffee>
  Float: ResolverTypeWrapper<Scalars['Float']>
  ScoreSheet: ResolverTypeWrapper<ScoreSheetDocument>
  ScoreFloat: ResolverTypeWrapper<Scalars['ScoreFloat']>
  DefectScore: ResolverTypeWrapper<DefectScore>
  User: ResolverTypeWrapper<User>
  DeviceConnection: ResolverTypeWrapper<DeviceConnection>
  DeviceEdge: ResolverTypeWrapper<DeviceEdge>
  Device: ResolverTypeWrapper<Device>
  EvaluationConnection: ResolverTypeWrapper<EvaluationConnection>
  EvaluationEdge: ResolverTypeWrapper<EvaluationEdge>
  Evaluation: ResolverTypeWrapper<Evaluation>
  GrinderConnection: ResolverTypeWrapper<GrinderConnection>
  GrinderEdge: ResolverTypeWrapper<GrinderEdge>
  RecipeConnection: ResolverTypeWrapper<RecipeConnection>
  RecipeEdge: ResolverTypeWrapper<RecipeEdge>
  Mutation: ResolverTypeWrapper<{}>
  CreateBrewerInput: CreateBrewerInput
  UpdateBrewerInput: UpdateBrewerInput
  CreateBrewGuideInput: CreateBrewGuideInput
  UpdateBrewGuideInput: UpdateBrewGuideInput
  CreateBrewingSessionInput: CreateBrewingSessionInput
  UpdateBrewingSessionInput: UpdateBrewingSessionInput
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  CreateDeviceInput: CreateDeviceInput
  UpdateDeviceInput: UpdateDeviceInput
  CreateEvaluationInput: CreateEvaluationInput
  UpdateEvaluationInput: UpdateEvaluationInput
  CreateGrinderInput: CreateGrinderInput
  UpdateGrinderInput: UpdateGrinderInput
  CreateRecipeInput: CreateRecipeInput
  UpdateRecipeInput: UpdateRecipeInput
  CreateScoreSheetInput: CreateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  BrewerConnection: BrewerConnection
  PageInfo: PageInfo
  Boolean: Scalars['Boolean']
  String: Scalars['String']
  BrewerEdge: BrewerEdge
  Brewer: Brewer
  ID: Scalars['ID']
  BrewerType: BrewerType
  BrewGuideConnection: BrewGuideConnection
  BrewGuideEdge: BrewGuideEdge
  BrewGuide: BrewGuide
  Recipe: Recipe
  Grinder: Grinder
  BurrSet: BurrSet
  Int: Scalars['Int']
  BrewingSessionConnection: BrewingSessionConnection
  BrewingSessionEdge: BrewingSessionEdge
  BrewingSession: BrewingSession
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  CuppingSessionConnection: Omit<CuppingSessionConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['CuppingSessionEdge']>
  }
  CuppingSessionEdge: Omit<CuppingSessionEdge, 'node'> & {node: ResolversParentTypes['CuppingSession']}
  CuppingSession: CuppingSessionDocument
  SessionCoffee: SessionCoffeeDocument
  Coffee: Coffee
  Float: Scalars['Float']
  ScoreSheet: ScoreSheetDocument
  ScoreFloat: Scalars['ScoreFloat']
  DefectScore: DefectScore
  User: User
  DeviceConnection: DeviceConnection
  DeviceEdge: DeviceEdge
  Device: Device
  EvaluationConnection: EvaluationConnection
  EvaluationEdge: EvaluationEdge
  Evaluation: Evaluation
  GrinderConnection: GrinderConnection
  GrinderEdge: GrinderEdge
  RecipeConnection: RecipeConnection
  RecipeEdge: RecipeEdge
  Mutation: {}
  CreateBrewerInput: CreateBrewerInput
  UpdateBrewerInput: UpdateBrewerInput
  CreateBrewGuideInput: CreateBrewGuideInput
  UpdateBrewGuideInput: UpdateBrewGuideInput
  CreateBrewingSessionInput: CreateBrewingSessionInput
  UpdateBrewingSessionInput: UpdateBrewingSessionInput
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  CreateDeviceInput: CreateDeviceInput
  UpdateDeviceInput: UpdateDeviceInput
  CreateEvaluationInput: CreateEvaluationInput
  UpdateEvaluationInput: UpdateEvaluationInput
  CreateGrinderInput: CreateGrinderInput
  UpdateGrinderInput: UpdateGrinderInput
  CreateRecipeInput: CreateRecipeInput
  UpdateRecipeInput: UpdateRecipeInput
  CreateScoreSheetInput: CreateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  listBrewers?: Resolver<ResolversTypes['BrewerConnection'], ParentType, ContextType>
  getBrewer?: Resolver<
    Maybe<ResolversTypes['Brewer']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetBrewerArgs, 'id'>
  >
  listBrewGuides?: Resolver<ResolversTypes['BrewGuideConnection'], ParentType, ContextType>
  getBrewGuide?: Resolver<
    Maybe<ResolversTypes['BrewGuide']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetBrewGuideArgs, 'id'>
  >
  listBrewingSessions?: Resolver<Maybe<ResolversTypes['BrewingSessionConnection']>, ParentType, ContextType>
  getBrewingSession?: Resolver<
    Maybe<ResolversTypes['BrewingSession']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetBrewingSessionArgs, 'id'>
  >
  listCuppingSessions?: Resolver<
    ResolversTypes['CuppingSessionConnection'],
    ParentType,
    ContextType,
    QueryListCuppingSessionsArgs
  >
  getCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCuppingSessionArgs, 'id'>
  >
  getCuppingSessionCoffee?: Resolver<
    Maybe<ResolversTypes['SessionCoffee']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCuppingSessionCoffeeArgs, 'id'>
  >
  listDevices?: Resolver<ResolversTypes['DeviceConnection'], ParentType, ContextType, QueryListDevicesArgs>
  getDevice?: Resolver<
    Maybe<ResolversTypes['Device']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetDeviceArgs, 'id'>
  >
  listEvaluations?: Resolver<Maybe<ResolversTypes['EvaluationConnection']>, ParentType, ContextType>
  getEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEvaluationArgs, 'id'>
  >
  listGrinders?: Resolver<ResolversTypes['GrinderConnection'], ParentType, ContextType>
  getGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetGrinderArgs, 'id'>
  >
  listRecipes?: Resolver<ResolversTypes['RecipeConnection'], ParentType, ContextType>
  getRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRecipeArgs, 'id'>
  >
  listScoreSheets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ScoreSheet']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryListScoreSheetsArgs, 'sessionCoffeeId'>
  >
  getScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetScoreSheetArgs, 'sessionCoffeeId' | 'scoreSheetId'>
  >
}>

export type BrewerConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewerConnection'] = ResolversParentTypes['BrewerConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['BrewerEdge']>, ParentType, ContextType>
}>

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}>

export type BrewerEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewerEdge'] = ResolversParentTypes['BrewerEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Brewer']>, ParentType, ContextType>
}>

export type BrewerResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Brewer'] = ResolversParentTypes['Brewer']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['BrewerType']>, ParentType, ContextType>
}>

export type BrewGuideConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewGuideConnection'] = ResolversParentTypes['BrewGuideConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['BrewGuideEdge']>>>, ParentType, ContextType>
}>

export type BrewGuideEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewGuideEdge'] = ResolversParentTypes['BrewGuideEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['BrewGuide'], ParentType, ContextType>
}>

export type BrewGuideResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewGuide'] = ResolversParentTypes['BrewGuide']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  recipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>
}>

export type RecipeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  grinder?: Resolver<ResolversTypes['Grinder'], ParentType, ContextType>
  grindSetting?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  brewer?: Resolver<ResolversTypes['Brewer'], ParentType, ContextType>
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}>

export type GrinderResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Grinder'] = ResolversParentTypes['Grinder']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  burrSet?: Resolver<Maybe<ResolversTypes['BurrSet']>, ParentType, ContextType>
}>

export type BrewingSessionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewingSessionConnection'] = ResolversParentTypes['BrewingSessionConnection']
> = ResolversObject<{
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['BrewingSessionEdge']>>>, ParentType, ContextType>
}>

export type BrewingSessionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewingSessionEdge'] = ResolversParentTypes['BrewingSessionEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['BrewingSession']>, ParentType, ContextType>
}>

export type BrewingSessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewingSession'] = ResolversParentTypes['BrewingSession']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}>

export type CuppingSessionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSessionConnection'] = ResolversParentTypes['CuppingSessionConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['CuppingSessionEdge']>, ParentType, ContextType>
}>

export type CuppingSessionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSessionEdge'] = ResolversParentTypes['CuppingSessionEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['CuppingSession'], ParentType, ContextType>
}>

export type CuppingSessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSession'] = ResolversParentTypes['CuppingSession']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['CuppingSession']>,
    {__typename: 'CuppingSession'} & Pick<ParentType, 'id'>,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  internalId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  sessionCoffees?: Resolver<Maybe<Array<Maybe<ResolversTypes['SessionCoffee']>>>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type SessionCoffeeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SessionCoffee'] = ResolversParentTypes['SessionCoffee']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  sampleNumber?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  coffee?: Resolver<ResolversTypes['Coffee'], ParentType, ContextType>
  averageScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  scoreSheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['ScoreSheet']>>>, ParentType, ContextType>
}>

export type CoffeeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Coffee'] = ResolversParentTypes['Coffee']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Coffee']>,
    {__typename: 'Coffee'} & Pick<ParentType, 'id'>,
    ContextType
  >
}>

export type ScoreSheetResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ScoreSheet'] = ResolversParentTypes['ScoreSheet']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    {__typename: 'ScoreSheet'} & Pick<ParentType, 'id'>,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  totalScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  fragranceAroma?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  flavor?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  aftertaste?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  acidity?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  body?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  uniformity?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  cleanCup?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  balance?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  sweetness?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  overall?: Resolver<Maybe<ResolversTypes['ScoreFloat']>, ParentType, ContextType>
  taints?: Resolver<Maybe<ResolversTypes['DefectScore']>, ParentType, ContextType>
  defects?: Resolver<Maybe<ResolversTypes['DefectScore']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}>

export interface ScoreFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ScoreFloat'], any> {
  name: 'ScoreFloat'
}

export type DefectScoreResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DefectScore'] = ResolversParentTypes['DefectScore']
> = ResolversObject<{
  numberOfCups?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  intensity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    {__typename: 'User'} & Pick<ParentType, 'id'>,
    ContextType
  >
}>

export type DeviceConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DeviceConnection'] = ResolversParentTypes['DeviceConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['DeviceEdge']>, ParentType, ContextType>
}>

export type DeviceEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DeviceEdge'] = ResolversParentTypes['DeviceEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Device'], ParentType, ContextType>
}>

export type DeviceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type EvaluationConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['EvaluationConnection'] = ResolversParentTypes['EvaluationConnection']
> = ResolversObject<{
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['EvaluationEdge']>>>, ParentType, ContextType>
}>

export type EvaluationEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['EvaluationEdge'] = ResolversParentTypes['EvaluationEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Evaluation']>, ParentType, ContextType>
}>

export type EvaluationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Evaluation'] = ResolversParentTypes['Evaluation']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}>

export type GrinderConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GrinderConnection'] = ResolversParentTypes['GrinderConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['GrinderEdge']>, ParentType, ContextType>
}>

export type GrinderEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GrinderEdge'] = ResolversParentTypes['GrinderEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Grinder']>, ParentType, ContextType>
}>

export type RecipeConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RecipeConnection'] = ResolversParentTypes['RecipeConnection']
> = ResolversObject<{
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['RecipeEdge']>>>, ParentType, ContextType>
}>

export type RecipeEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RecipeEdge'] = ResolversParentTypes['RecipeEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createBrewer?: Resolver<
    Maybe<ResolversTypes['Brewer']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateBrewerArgs, 'input'>
  >
  updateBrewer?: Resolver<
    Maybe<ResolversTypes['Brewer']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBrewerArgs, 'id' | 'input'>
  >
  deleteBrewer?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBrewerArgs, 'id'>
  >
  createBrewGuide?: Resolver<
    Maybe<ResolversTypes['BrewGuide']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateBrewGuideArgs, 'input'>
  >
  updateBrewGuide?: Resolver<
    Maybe<ResolversTypes['BrewGuide']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBrewGuideArgs, 'id' | 'input'>
  >
  deleteBrewGuide?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBrewGuideArgs, 'id'>
  >
  createBrewingSession?: Resolver<
    Maybe<ResolversTypes['BrewingSession']>,
    ParentType,
    ContextType,
    MutationCreateBrewingSessionArgs
  >
  updateBrewingSession?: Resolver<
    Maybe<ResolversTypes['BrewingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBrewingSessionArgs, 'id'>
  >
  deleteBrewingSession?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBrewingSessionArgs, 'id'>
  >
  createCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCuppingSessionArgs, 'input'>
  >
  updateCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCuppingSessionArgs, 'id' | 'input'>
  >
  deleteCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCuppingSessionArgs, 'id'>
  >
  updateCuppingSessionCoffees?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCuppingSessionCoffeesArgs, 'id' | 'sessionCoffees'>
  >
  lockCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationLockCuppingSessionArgs, 'id'>
  >
  createDevice?: Resolver<
    Maybe<ResolversTypes['Device']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateDeviceArgs, 'input'>
  >
  updateDevice?: Resolver<
    Maybe<ResolversTypes['Device']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDeviceArgs, 'id' | 'input'>
  >
  deleteDevice?: Resolver<
    Maybe<ResolversTypes['Device']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDeviceArgs, 'id'>
  >
  createEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    MutationCreateEvaluationArgs
  >
  updateEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEvaluationArgs, 'id'>
  >
  deleteEvaluation?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEvaluationArgs, 'id'>
  >
  createGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateGrinderArgs, 'input'>
  >
  updateGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGrinderArgs, 'id' | 'input'>
  >
  deleteGrinder?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGrinderArgs, 'id'>
  >
  createRecipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, MutationCreateRecipeArgs>
  updateRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRecipeArgs, 'id'>
  >
  deleteRecipe?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRecipeArgs, 'id'>
  >
  createScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateScoreSheetArgs, 'sessionCoffeeId' | 'input'>
  >
  updateScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateScoreSheetArgs, 'scoreSheetId' | 'sessionCoffeeId' | 'input'>
  >
  deleteScoreSheet?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteScoreSheetArgs, 'id'>
  >
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  BrewerConnection?: BrewerConnectionResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  BrewerEdge?: BrewerEdgeResolvers<ContextType>
  Brewer?: BrewerResolvers<ContextType>
  BrewGuideConnection?: BrewGuideConnectionResolvers<ContextType>
  BrewGuideEdge?: BrewGuideEdgeResolvers<ContextType>
  BrewGuide?: BrewGuideResolvers<ContextType>
  Recipe?: RecipeResolvers<ContextType>
  Grinder?: GrinderResolvers<ContextType>
  BrewingSessionConnection?: BrewingSessionConnectionResolvers<ContextType>
  BrewingSessionEdge?: BrewingSessionEdgeResolvers<ContextType>
  BrewingSession?: BrewingSessionResolvers<ContextType>
  CuppingSessionConnection?: CuppingSessionConnectionResolvers<ContextType>
  CuppingSessionEdge?: CuppingSessionEdgeResolvers<ContextType>
  CuppingSession?: CuppingSessionResolvers<ContextType>
  SessionCoffee?: SessionCoffeeResolvers<ContextType>
  Coffee?: CoffeeResolvers<ContextType>
  ScoreSheet?: ScoreSheetResolvers<ContextType>
  ScoreFloat?: GraphQLScalarType
  DefectScore?: DefectScoreResolvers<ContextType>
  User?: UserResolvers<ContextType>
  DeviceConnection?: DeviceConnectionResolvers<ContextType>
  DeviceEdge?: DeviceEdgeResolvers<ContextType>
  Device?: DeviceResolvers<ContextType>
  EvaluationConnection?: EvaluationConnectionResolvers<ContextType>
  EvaluationEdge?: EvaluationEdgeResolvers<ContextType>
  Evaluation?: EvaluationResolvers<ContextType>
  GrinderConnection?: GrinderConnectionResolvers<ContextType>
  GrinderEdge?: GrinderEdgeResolvers<ContextType>
  RecipeConnection?: RecipeConnectionResolvers<ContextType>
  RecipeEdge?: RecipeEdgeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

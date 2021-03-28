import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql'
import {CuppingSessionDocument, SessionCoffeeDocument, ScoreSheetDocument} from './models'
import {Context} from './startServer'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
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

export type Query = {
  __typename?: 'Query'
  getBrewGuide?: Maybe<BrewGuide>
  getBrewer?: Maybe<Brewer>
  getBrewingSession?: Maybe<BrewingSession>
  getCuppingSession?: Maybe<CuppingSession>
  getCuppingSessionCoffee?: Maybe<SessionCoffee>
  getEvaluation?: Maybe<Evaluation>
  getGrinder?: Maybe<Grinder>
  getRecipe?: Maybe<Recipe>
  getScoreSheet?: Maybe<ScoreSheet>
  listBrewGuides: BrewGuideConnection
  listBrewers: BrewerConnection
  listBrewingSessions?: Maybe<BrewingSessionConnection>
  listCuppingSessions: CuppingSessionConnection
  listEvaluations?: Maybe<EvaluationConnection>
  listGrinders: GrinderConnection
  listRecipes: RecipeConnection
  listScoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
}

export type QueryGetBrewGuideArgs = {
  id: Scalars['ID']
}

export type QueryGetBrewerArgs = {
  id: Scalars['ID']
}

export type QueryGetBrewingSessionArgs = {
  id: Scalars['ID']
}

export type QueryGetCuppingSessionArgs = {
  id: Scalars['ID']
}

export type QueryGetCuppingSessionCoffeeArgs = {
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

export type QueryGetScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  scoreSheetId: Scalars['ID']
}

export type QueryListBrewersArgs = {
  limit?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
}

export type QueryListCuppingSessionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryListScoreSheetsArgs = {
  sessionCoffeeId: Scalars['ID']
}

export type CreateBrewGuideInput = {
  name: Scalars['String']
  recipeId: Scalars['ID']
}

export type UpdateBrewGuideInput = {
  name?: Maybe<Scalars['String']>
  recipeId?: Maybe<Scalars['ID']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createBrewGuide?: Maybe<BrewGuide>
  createBrewer?: Maybe<Brewer>
  createBrewingSession?: Maybe<BrewingSession>
  createCuppingSession?: Maybe<CuppingSession>
  createEvaluation?: Maybe<Evaluation>
  createGrinder?: Maybe<Grinder>
  createRecipe?: Maybe<Recipe>
  createScoreSheet?: Maybe<ScoreSheet>
  deleteBrewGuide?: Maybe<Scalars['Boolean']>
  deleteBrewer?: Maybe<Scalars['Boolean']>
  deleteBrewingSession?: Maybe<Scalars['Boolean']>
  deleteCuppingSession?: Maybe<Scalars['Boolean']>
  deleteEvaluation?: Maybe<Scalars['Boolean']>
  deleteGrinder?: Maybe<Scalars['Boolean']>
  deleteRecipe?: Maybe<Scalars['Boolean']>
  deleteScoreSheet?: Maybe<CuppingSession>
  lockCuppingSession?: Maybe<CuppingSession>
  updateBrewGuide?: Maybe<BrewGuide>
  updateBrewer?: Maybe<Brewer>
  updateBrewingSession?: Maybe<BrewingSession>
  updateCuppingSession?: Maybe<CuppingSession>
  updateCuppingSessionCoffees?: Maybe<CuppingSession>
  updateEvaluation?: Maybe<Evaluation>
  updateGrinder?: Maybe<Grinder>
  updateRecipe?: Maybe<Recipe>
  updateScoreSheet?: Maybe<ScoreSheet>
}

export type MutationCreateBrewGuideArgs = {
  input: CreateBrewGuideInput
}

export type MutationCreateBrewerArgs = {
  input: CreateBrewerInput
}

export type MutationCreateBrewingSessionArgs = {
  input?: Maybe<CreateBrewingSessionInput>
}

export type MutationCreateCuppingSessionArgs = {
  input: CreateCuppingSessionInput
}

export type MutationCreateEvaluationArgs = {
  input?: Maybe<CreateEvaluationInput>
}

export type MutationCreateGrinderArgs = {
  input: CreateGrinderInput
}

export type MutationCreateRecipeArgs = {
  input?: Maybe<CreateRecipeInput>
}

export type MutationCreateScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  input: CreateScoreSheetInput
}

export type MutationDeleteBrewGuideArgs = {
  id: Scalars['ID']
}

export type MutationDeleteBrewerArgs = {
  id: Scalars['ID']
}

export type MutationDeleteBrewingSessionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteCuppingSessionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteEvaluationArgs = {
  id: Scalars['ID']
}

export type MutationDeleteGrinderArgs = {
  id: Scalars['ID']
}

export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']
}

export type MutationDeleteScoreSheetArgs = {
  id: Scalars['ID']
}

export type MutationLockCuppingSessionArgs = {
  id: Scalars['ID']
}

export type MutationUpdateBrewGuideArgs = {
  id: Scalars['ID']
  input: UpdateBrewGuideInput
}

export type MutationUpdateBrewerArgs = {
  id: Scalars['ID']
  input: UpdateBrewerInput
}

export type MutationUpdateBrewingSessionArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateBrewingSessionInput>
}

export type MutationUpdateCuppingSessionArgs = {
  id: Scalars['ID']
  input: UpdateCuppingSessionInput
}

export type MutationUpdateCuppingSessionCoffeesArgs = {
  id: Scalars['ID']
  sessionCoffees: Array<SessionCoffeeInput>
}

export type MutationUpdateEvaluationArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateEvaluationInput>
}

export type MutationUpdateGrinderArgs = {
  id: Scalars['ID']
  input: UpdateGrinderInput
}

export type MutationUpdateRecipeArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateRecipeInput>
}

export type MutationUpdateScoreSheetArgs = {
  scoreSheetId: Scalars['ID']
  sessionCoffeeId: Scalars['ID']
  input: UpdateScoreSheetInput
}

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage?: Maybe<Scalars['Boolean']>
  nextCursor?: Maybe<Scalars['String']>
  prevCursor?: Maybe<Scalars['String']>
}

export type Brewer = {
  __typename?: 'Brewer'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export enum BrewerType {
  Autodrip = 'AUTODRIP',
  FullImmersion = 'FULL_IMMERSION',
  Pourover = 'POUROVER',
  Espresso = 'ESPRESSO',
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

export type CreateBrewerInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export type UpdateBrewerInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export type BrewingSession = {
  __typename?: 'BrewingSession'
  id: Scalars['ID']
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  brewGuide?: Maybe<BrewGuide>
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

export type CreateBrewingSessionInput = {
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  brewGuideId?: Maybe<Scalars['ID']>
}

export type UpdateBrewingSessionInput = {
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  brewGuideId?: Maybe<Scalars['ID']>
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

export type SessionCoffee = {
  __typename?: 'SessionCoffee'
  id: Scalars['ID']
  sampleNumber: Scalars['ID']
  coffee: Coffee
  averageScore?: Maybe<Scalars['Float']>
  scoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
}

export type Coffee = {
  __typename?: 'Coffee'
  id: Scalars['ID']
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

export type CreateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type UpdateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type SessionCoffeeInput = {
  sampleNumber: Scalars['ID']
  coffee: Scalars['ID']
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

export type CreateEvaluationInput = {
  date?: Maybe<Scalars['String']>
}

export type UpdateEvaluationInput = {
  date?: Maybe<Scalars['String']>
}

export type Grinder = {
  __typename?: 'Grinder'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export enum BurrSet {
  ConicalBurr = 'CONICAL_BURR',
  FlatBurr = 'FLAT_BURR',
  Blade = 'BLADE',
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

export type CreateGrinderInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type UpdateGrinderInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
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

export type CreateRecipeInput = {
  name: Scalars['String']
  brewerId: Scalars['ID']
  grinderId: Scalars['ID']
  grindSetting?: Maybe<Scalars['Int']>
  note?: Maybe<Scalars['String']>
}

export type UpdateRecipeInput = {
  name: Scalars['String']
  brewerId: Scalars['ID']
  grinderId: Scalars['ID']
  grindSetting?: Maybe<Scalars['Int']>
  note?: Maybe<Scalars['String']>
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

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
}

export type DefectScore = {
  __typename?: 'DefectScore'
  numberOfCups?: Maybe<Scalars['Int']>
  intensity?: Maybe<Scalars['Float']>
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

export type DefectScoreInput = {
  numberOfCups?: Maybe<Scalars['Int']>
  intensity?: Maybe<Scalars['Float']>
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

export type QueryInput = {
  field: Scalars['String']
  value?: Maybe<Scalars['String']>
  operator?: Maybe<OperatorEnum>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ReferenceResolver<TResult, TReference, TContext> = (
  reference: TReference,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>
type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>
type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>
export type GraphQLRecursivePick<T, S> = {[K in keyof T & keyof S]: ScalarCheck<T[K], S[K]>}

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

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
  BrewGuide: ResolverTypeWrapper<BrewGuide>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  BrewGuideConnection: ResolverTypeWrapper<BrewGuideConnection>
  BrewGuideEdge: ResolverTypeWrapper<BrewGuideEdge>
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  CreateBrewGuideInput: CreateBrewGuideInput
  UpdateBrewGuideInput: UpdateBrewGuideInput
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Brewer: ResolverTypeWrapper<Brewer>
  BrewerType: BrewerType
  BrewerConnection: ResolverTypeWrapper<BrewerConnection>
  BrewerEdge: ResolverTypeWrapper<BrewerEdge>
  CreateBrewerInput: CreateBrewerInput
  UpdateBrewerInput: UpdateBrewerInput
  BrewingSession: ResolverTypeWrapper<BrewingSession>
  BrewingSessionConnection: ResolverTypeWrapper<BrewingSessionConnection>
  BrewingSessionEdge: ResolverTypeWrapper<BrewingSessionEdge>
  CreateBrewingSessionInput: CreateBrewingSessionInput
  UpdateBrewingSessionInput: UpdateBrewingSessionInput
  CuppingSession: ResolverTypeWrapper<CuppingSessionDocument>
  SessionCoffee: ResolverTypeWrapper<SessionCoffeeDocument>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Coffee: ResolverTypeWrapper<Coffee>
  CuppingSessionConnection: ResolverTypeWrapper<
    Omit<CuppingSessionConnection, 'edges'> & {edges: Array<ResolversTypes['CuppingSessionEdge']>}
  >
  CuppingSessionEdge: ResolverTypeWrapper<Omit<CuppingSessionEdge, 'node'> & {node: ResolversTypes['CuppingSession']}>
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  Evaluation: ResolverTypeWrapper<Evaluation>
  EvaluationConnection: ResolverTypeWrapper<EvaluationConnection>
  EvaluationEdge: ResolverTypeWrapper<EvaluationEdge>
  CreateEvaluationInput: CreateEvaluationInput
  UpdateEvaluationInput: UpdateEvaluationInput
  Grinder: ResolverTypeWrapper<Grinder>
  BurrSet: BurrSet
  GrinderConnection: ResolverTypeWrapper<GrinderConnection>
  GrinderEdge: ResolverTypeWrapper<GrinderEdge>
  CreateGrinderInput: CreateGrinderInput
  UpdateGrinderInput: UpdateGrinderInput
  Recipe: ResolverTypeWrapper<Recipe>
  RecipeConnection: ResolverTypeWrapper<RecipeConnection>
  RecipeEdge: ResolverTypeWrapper<RecipeEdge>
  CreateRecipeInput: CreateRecipeInput
  UpdateRecipeInput: UpdateRecipeInput
  ScoreSheet: ResolverTypeWrapper<ScoreSheetDocument>
  User: ResolverTypeWrapper<User>
  DefectScore: ResolverTypeWrapper<DefectScore>
  ScoreFloat: ResolverTypeWrapper<Scalars['ScoreFloat']>
  CreateScoreSheetInput: CreateScoreSheetInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  OperatorEnum: OperatorEnum
  QueryInput: QueryInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BrewGuide: BrewGuide
  ID: Scalars['ID']
  String: Scalars['String']
  BrewGuideConnection: BrewGuideConnection
  BrewGuideEdge: BrewGuideEdge
  Query: {}
  Int: Scalars['Int']
  CreateBrewGuideInput: CreateBrewGuideInput
  UpdateBrewGuideInput: UpdateBrewGuideInput
  Mutation: {}
  Boolean: Scalars['Boolean']
  PageInfo: PageInfo
  Brewer: Brewer
  BrewerConnection: BrewerConnection
  BrewerEdge: BrewerEdge
  CreateBrewerInput: CreateBrewerInput
  UpdateBrewerInput: UpdateBrewerInput
  BrewingSession: BrewingSession
  BrewingSessionConnection: BrewingSessionConnection
  BrewingSessionEdge: BrewingSessionEdge
  CreateBrewingSessionInput: CreateBrewingSessionInput
  UpdateBrewingSessionInput: UpdateBrewingSessionInput
  CuppingSession: CuppingSessionDocument
  SessionCoffee: SessionCoffeeDocument
  Float: Scalars['Float']
  Coffee: Coffee
  CuppingSessionConnection: Omit<CuppingSessionConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['CuppingSessionEdge']>
  }
  CuppingSessionEdge: Omit<CuppingSessionEdge, 'node'> & {node: ResolversParentTypes['CuppingSession']}
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  Evaluation: Evaluation
  EvaluationConnection: EvaluationConnection
  EvaluationEdge: EvaluationEdge
  CreateEvaluationInput: CreateEvaluationInput
  UpdateEvaluationInput: UpdateEvaluationInput
  Grinder: Grinder
  GrinderConnection: GrinderConnection
  GrinderEdge: GrinderEdge
  CreateGrinderInput: CreateGrinderInput
  UpdateGrinderInput: UpdateGrinderInput
  Recipe: Recipe
  RecipeConnection: RecipeConnection
  RecipeEdge: RecipeEdge
  CreateRecipeInput: CreateRecipeInput
  UpdateRecipeInput: UpdateRecipeInput
  ScoreSheet: ScoreSheetDocument
  User: User
  DefectScore: DefectScore
  ScoreFloat: Scalars['ScoreFloat']
  CreateScoreSheetInput: CreateScoreSheetInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  QueryInput: QueryInput
}>

export type BrewGuideResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewGuide'] = ResolversParentTypes['BrewGuide']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  recipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewGuideConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewGuideConnection'] = ResolversParentTypes['BrewGuideConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['BrewGuideEdge']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewGuideEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewGuideEdge'] = ResolversParentTypes['BrewGuideEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['BrewGuide'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  getBrewGuide?: Resolver<
    Maybe<ResolversTypes['BrewGuide']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetBrewGuideArgs, 'id'>
  >
  getBrewer?: Resolver<
    Maybe<ResolversTypes['Brewer']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetBrewerArgs, 'id'>
  >
  getBrewingSession?: Resolver<
    Maybe<ResolversTypes['BrewingSession']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetBrewingSessionArgs, 'id'>
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
  getEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEvaluationArgs, 'id'>
  >
  getGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetGrinderArgs, 'id'>
  >
  getRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRecipeArgs, 'id'>
  >
  getScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetScoreSheetArgs, 'sessionCoffeeId' | 'scoreSheetId'>
  >
  listBrewGuides?: Resolver<ResolversTypes['BrewGuideConnection'], ParentType, ContextType>
  listBrewers?: Resolver<
    ResolversTypes['BrewerConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListBrewersArgs, never>
  >
  listBrewingSessions?: Resolver<Maybe<ResolversTypes['BrewingSessionConnection']>, ParentType, ContextType>
  listCuppingSessions?: Resolver<
    ResolversTypes['CuppingSessionConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListCuppingSessionsArgs, never>
  >
  listEvaluations?: Resolver<Maybe<ResolversTypes['EvaluationConnection']>, ParentType, ContextType>
  listGrinders?: Resolver<ResolversTypes['GrinderConnection'], ParentType, ContextType>
  listRecipes?: Resolver<ResolversTypes['RecipeConnection'], ParentType, ContextType>
  listScoreSheets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ScoreSheet']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryListScoreSheetsArgs, 'sessionCoffeeId'>
  >
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createBrewGuide?: Resolver<
    Maybe<ResolversTypes['BrewGuide']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateBrewGuideArgs, 'input'>
  >
  createBrewer?: Resolver<
    Maybe<ResolversTypes['Brewer']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateBrewerArgs, 'input'>
  >
  createBrewingSession?: Resolver<
    Maybe<ResolversTypes['BrewingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateBrewingSessionArgs, never>
  >
  createCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCuppingSessionArgs, 'input'>
  >
  createEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateEvaluationArgs, never>
  >
  createGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateGrinderArgs, 'input'>
  >
  createRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateRecipeArgs, never>
  >
  createScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateScoreSheetArgs, 'sessionCoffeeId' | 'input'>
  >
  deleteBrewGuide?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBrewGuideArgs, 'id'>
  >
  deleteBrewer?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBrewerArgs, 'id'>
  >
  deleteBrewingSession?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBrewingSessionArgs, 'id'>
  >
  deleteCuppingSession?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCuppingSessionArgs, 'id'>
  >
  deleteEvaluation?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEvaluationArgs, 'id'>
  >
  deleteGrinder?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGrinderArgs, 'id'>
  >
  deleteRecipe?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRecipeArgs, 'id'>
  >
  deleteScoreSheet?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteScoreSheetArgs, 'id'>
  >
  lockCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationLockCuppingSessionArgs, 'id'>
  >
  updateBrewGuide?: Resolver<
    Maybe<ResolversTypes['BrewGuide']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBrewGuideArgs, 'id' | 'input'>
  >
  updateBrewer?: Resolver<
    Maybe<ResolversTypes['Brewer']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBrewerArgs, 'id' | 'input'>
  >
  updateBrewingSession?: Resolver<
    Maybe<ResolversTypes['BrewingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBrewingSessionArgs, 'id'>
  >
  updateCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCuppingSessionArgs, 'id' | 'input'>
  >
  updateCuppingSessionCoffees?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCuppingSessionCoffeesArgs, 'id' | 'sessionCoffees'>
  >
  updateEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEvaluationArgs, 'id'>
  >
  updateGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGrinderArgs, 'id' | 'input'>
  >
  updateRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRecipeArgs, 'id'>
  >
  updateScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateScoreSheetArgs, 'scoreSheetId' | 'sessionCoffeeId' | 'input'>
  >
}>

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewerResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Brewer'] = ResolversParentTypes['Brewer']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['BrewerType']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewerConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewerConnection'] = ResolversParentTypes['BrewerConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['BrewerEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewerEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewerEdge'] = ResolversParentTypes['BrewerEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Brewer']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewingSessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewingSession'] = ResolversParentTypes['BrewingSession']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  brewGuide?: Resolver<Maybe<ResolversTypes['BrewGuide']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewingSessionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewingSessionConnection'] = ResolversParentTypes['BrewingSessionConnection']
> = ResolversObject<{
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['BrewingSessionEdge']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type BrewingSessionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BrewingSessionEdge'] = ResolversParentTypes['BrewingSessionEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['BrewingSession']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CuppingSessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSession'] = ResolversParentTypes['CuppingSession']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['CuppingSession']>,
    {__typename: 'CuppingSession'} & GraphQLRecursivePick<ParentType, {id: true}>,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  internalId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  sessionCoffees?: Resolver<Maybe<Array<Maybe<ResolversTypes['SessionCoffee']>>>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CoffeeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Coffee'] = ResolversParentTypes['Coffee']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Coffee']>,
    {__typename: 'Coffee'} & GraphQLRecursivePick<ParentType, {id: true}>,
    ContextType
  >

  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CuppingSessionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSessionConnection'] = ResolversParentTypes['CuppingSessionConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['CuppingSessionEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CuppingSessionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSessionEdge'] = ResolversParentTypes['CuppingSessionEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['CuppingSession'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EvaluationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Evaluation'] = ResolversParentTypes['Evaluation']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EvaluationConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['EvaluationConnection'] = ResolversParentTypes['EvaluationConnection']
> = ResolversObject<{
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['EvaluationEdge']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EvaluationEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['EvaluationEdge'] = ResolversParentTypes['EvaluationEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Evaluation']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GrinderResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Grinder'] = ResolversParentTypes['Grinder']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  burrSet?: Resolver<Maybe<ResolversTypes['BurrSet']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GrinderConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GrinderConnection'] = ResolversParentTypes['GrinderConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['GrinderEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GrinderEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GrinderEdge'] = ResolversParentTypes['GrinderEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Grinder']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RecipeConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RecipeConnection'] = ResolversParentTypes['RecipeConnection']
> = ResolversObject<{
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['RecipeEdge']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RecipeEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RecipeEdge'] = ResolversParentTypes['RecipeEdge']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ScoreSheetResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ScoreSheet'] = ResolversParentTypes['ScoreSheet']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    {__typename: 'ScoreSheet'} & GraphQLRecursivePick<ParentType, {id: true}>,
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    {__typename: 'User'} & GraphQLRecursivePick<ParentType, {id: true}>,
    ContextType
  >

  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type DefectScoreResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DefectScore'] = ResolversParentTypes['DefectScore']
> = ResolversObject<{
  numberOfCups?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  intensity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface ScoreFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ScoreFloat'], any> {
  name: 'ScoreFloat'
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  BrewGuide?: BrewGuideResolvers<ContextType>
  BrewGuideConnection?: BrewGuideConnectionResolvers<ContextType>
  BrewGuideEdge?: BrewGuideEdgeResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Brewer?: BrewerResolvers<ContextType>
  BrewerConnection?: BrewerConnectionResolvers<ContextType>
  BrewerEdge?: BrewerEdgeResolvers<ContextType>
  BrewingSession?: BrewingSessionResolvers<ContextType>
  BrewingSessionConnection?: BrewingSessionConnectionResolvers<ContextType>
  BrewingSessionEdge?: BrewingSessionEdgeResolvers<ContextType>
  CuppingSession?: CuppingSessionResolvers<ContextType>
  SessionCoffee?: SessionCoffeeResolvers<ContextType>
  Coffee?: CoffeeResolvers<ContextType>
  CuppingSessionConnection?: CuppingSessionConnectionResolvers<ContextType>
  CuppingSessionEdge?: CuppingSessionEdgeResolvers<ContextType>
  Evaluation?: EvaluationResolvers<ContextType>
  EvaluationConnection?: EvaluationConnectionResolvers<ContextType>
  EvaluationEdge?: EvaluationEdgeResolvers<ContextType>
  Grinder?: GrinderResolvers<ContextType>
  GrinderConnection?: GrinderConnectionResolvers<ContextType>
  GrinderEdge?: GrinderEdgeResolvers<ContextType>
  Recipe?: RecipeResolvers<ContextType>
  RecipeConnection?: RecipeConnectionResolvers<ContextType>
  RecipeEdge?: RecipeEdgeResolvers<ContextType>
  ScoreSheet?: ScoreSheetResolvers<ContextType>
  User?: UserResolvers<ContextType>
  DefectScore?: DefectScoreResolvers<ContextType>
  ScoreFloat?: GraphQLScalarType
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

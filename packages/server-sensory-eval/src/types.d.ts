import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql'
import {CuppingSessionDocument, SessionCoffeeDocument, ScoreSheetDocument} from '@luminate/mongo'
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

export type Coffee = {
  __typename?: 'Coffee'
  id: Scalars['ID']
}

export type CreateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type CreateScoreSheetInput = {
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

export type Mutation = {
  __typename?: 'Mutation'
  createCuppingSession?: Maybe<CuppingSession>
  updateCuppingSession?: Maybe<CuppingSession>
  deleteCuppingSession?: Maybe<CuppingSession>
  createScoreSheet?: Maybe<CuppingSession>
  updateScoreSheet?: Maybe<CuppingSession>
  deleteScoreSheet?: Maybe<CuppingSession>
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
  listCuppingSessions: CuppingSessionConnection
  getCuppingSession?: Maybe<CuppingSession>
}

export type QueryListCuppingSessionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetCuppingSessionArgs = {
  id: Scalars['ID']
}

export type QueryInput = {
  field: Scalars['String']
  value?: Maybe<Scalars['String']>
  operator?: Maybe<OperatorEnum>
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
}

export type SessionCoffee = {
  __typename?: 'SessionCoffee'
  id: Scalars['ID']
  sampleNumber: Scalars['ID']
  coffee: Coffee
  scoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
}

export type SessionCoffeeInput = {
  sampleNumber: Scalars['ID']
  coffee?: Maybe<Scalars['ID']>
}

export type UpdateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  sessionCoffees?: Maybe<Array<Maybe<SessionCoffeeInput>>>
}

export type UpdateScoreSheetInput = {
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
  String: ResolverTypeWrapper<Scalars['String']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  CuppingSessionConnection: ResolverTypeWrapper<
    Omit<CuppingSessionConnection, 'edges'> & {edges: Array<ResolversTypes['CuppingSessionEdge']>}
  >
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CuppingSessionEdge: ResolverTypeWrapper<Omit<CuppingSessionEdge, 'node'> & {node: ResolversTypes['CuppingSession']}>
  CuppingSession: ResolverTypeWrapper<CuppingSessionDocument>
  ID: ResolverTypeWrapper<Scalars['ID']>
  SessionCoffee: ResolverTypeWrapper<SessionCoffeeDocument>
  Coffee: ResolverTypeWrapper<Coffee>
  ScoreSheet: ResolverTypeWrapper<ScoreSheetDocument>
  Float: ResolverTypeWrapper<Scalars['Float']>
  ScoreFloat: ResolverTypeWrapper<Scalars['ScoreFloat']>
  DefectScore: ResolverTypeWrapper<DefectScore>
  Mutation: ResolverTypeWrapper<{}>
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  CreateScoreSheetInput: CreateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  String: Scalars['String']
  Int: Scalars['Int']
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  CuppingSessionConnection: Omit<CuppingSessionConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['CuppingSessionEdge']>
  }
  PageInfo: PageInfo
  Boolean: Scalars['Boolean']
  CuppingSessionEdge: Omit<CuppingSessionEdge, 'node'> & {node: ResolversParentTypes['CuppingSession']}
  CuppingSession: CuppingSessionDocument
  ID: Scalars['ID']
  SessionCoffee: SessionCoffeeDocument
  Coffee: Coffee
  ScoreSheet: ScoreSheetDocument
  Float: Scalars['Float']
  ScoreFloat: Scalars['ScoreFloat']
  DefectScore: DefectScore
  Mutation: {}
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  CreateScoreSheetInput: CreateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
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
}>

export type CuppingSessionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSessionConnection'] = ResolversParentTypes['CuppingSessionConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['CuppingSessionEdge']>, ParentType, ContextType>
}>

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
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
  createScoreSheet?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateScoreSheetArgs, 'sessionCoffeeId' | 'input'>
  >
  updateScoreSheet?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
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
  CuppingSessionConnection?: CuppingSessionConnectionResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  CuppingSessionEdge?: CuppingSessionEdgeResolvers<ContextType>
  CuppingSession?: CuppingSessionResolvers<ContextType>
  SessionCoffee?: SessionCoffeeResolvers<ContextType>
  Coffee?: CoffeeResolvers<ContextType>
  ScoreSheet?: ScoreSheetResolvers<ContextType>
  ScoreFloat?: GraphQLScalarType
  DefectScore?: DefectScoreResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

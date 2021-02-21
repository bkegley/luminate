import {GraphQLResolveInfo} from 'graphql'
import {CoffeeDocument, CountryDocument, FarmDocument, NoteDocument, RegionDocument, VarietyDocument} from './models'
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
  _FieldSet: any
}

export type Coffee = {
  __typename?: 'Coffee'
  id: Scalars['ID']
  name: Scalars['String']
  country?: Maybe<Country>
  region?: Maybe<Region>
  varieties: Array<Variety>
  elevation?: Maybe<Scalars['String']>
  components?: Maybe<Array<Maybe<CoffeeComponent>>>
  notes?: Maybe<Array<Maybe<Note>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type CoffeeNotesArgs = {
  fields?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type CoffeeComponent = {
  __typename?: 'CoffeeComponent'
  coffee: CoffeeSummary
  percentage: Scalars['Float']
}

export type CoffeeConnection = {
  __typename?: 'CoffeeConnection'
  pageInfo: PageInfo
  edges: Array<CoffeeEdge>
}

export type CoffeeEdge = {
  __typename?: 'CoffeeEdge'
  cursor: Scalars['String']
  node: Coffee
}

export type CoffeeSummary = {
  __typename?: 'CoffeeSummary'
  id: Scalars['ID']
  name: Scalars['String']
}

export type ComponentInput = {
  coffee: Scalars['ID']
  percentage: Scalars['Float']
}

export type Country = {
  __typename?: 'Country'
  id: Scalars['ID']
  name: Scalars['String']
  regions?: Maybe<Array<Maybe<Region>>>
}

export type CountryConnection = {
  __typename?: 'CountryConnection'
  pageInfo: PageInfo
  edges: Array<CountryEdge>
}

export type CountryEdge = {
  __typename?: 'CountryEdge'
  cursor: Scalars['String']
  node: Country
}

export type CreateCoffeeInput = {
  name: Scalars['String']
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  farm?: Maybe<Scalars['ID']>
  farmZone?: Maybe<Scalars['ID']>
  varieties?: Maybe<Array<Maybe<Scalars['ID']>>>
  elevation?: Maybe<Scalars['String']>
  components?: Maybe<Array<Maybe<ComponentInput>>>
}

export type CreateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type CreateFarmZoneInput = {
  name: Scalars['String']
}

export type CreateNoteInput = {
  entityId: Scalars['ID']
  content: Scalars['String']
  field: Scalars['String']
}

export type CreateVarietyInput = {
  name: Scalars['String']
}

export type Farm = {
  __typename?: 'Farm'
  id: Scalars['ID']
  name: Scalars['String']
  country?: Maybe<Country>
  region?: Maybe<Region>
  farmZones: Array<FarmZone>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type FarmConnection = {
  __typename?: 'FarmConnection'
  pageInfo: PageInfo
  edges: Array<FarmEdge>
}

export type FarmEdge = {
  __typename?: 'FarmEdge'
  cursor: Scalars['String']
  node: Farm
}

export type FarmZone = {
  __typename?: 'FarmZone'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createCoffee?: Maybe<Coffee>
  createFarm?: Maybe<Farm>
  createFarmZone?: Maybe<Farm>
  createNote?: Maybe<Note>
  createVariety?: Maybe<Variety>
  deleteCoffee?: Maybe<Coffee>
  deleteFarm?: Maybe<Farm>
  deleteFarmZone?: Maybe<Farm>
  deleteNote?: Maybe<Note>
  deleteVariety?: Maybe<Variety>
  makeVarietyPublic?: Maybe<Scalars['Boolean']>
  updateCoffee?: Maybe<Coffee>
  updateCoffeePermissionsForAccount?: Maybe<Scalars['Boolean']>
  updateFarm?: Maybe<Farm>
  updateFarmZone?: Maybe<Farm>
  updateNote?: Maybe<Note>
  updateVariety?: Maybe<Variety>
}

export type MutationCreateCoffeeArgs = {
  input: CreateCoffeeInput
}

export type MutationCreateFarmArgs = {
  input: CreateFarmInput
}

export type MutationCreateFarmZoneArgs = {
  farmId: Scalars['ID']
  input?: Maybe<CreateFarmZoneInput>
}

export type MutationCreateNoteArgs = {
  input?: Maybe<CreateNoteInput>
}

export type MutationCreateVarietyArgs = {
  input: CreateVarietyInput
}

export type MutationDeleteCoffeeArgs = {
  id: Scalars['ID']
}

export type MutationDeleteFarmArgs = {
  id: Scalars['ID']
}

export type MutationDeleteFarmZoneArgs = {
  id: Scalars['ID']
}

export type MutationDeleteNoteArgs = {
  id: Scalars['ID']
}

export type MutationDeleteVarietyArgs = {
  id: Scalars['ID']
}

export type MutationMakeVarietyPublicArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCoffeeArgs = {
  id: Scalars['ID']
  input: UpdateCoffeeInput
}

export type MutationUpdateCoffeePermissionsForAccountArgs = {
  coffeeId: Scalars['ID']
  accountId: Scalars['ID']
  permissionTypes: Array<PermissionTypeEnum>
}

export type MutationUpdateFarmArgs = {
  id: Scalars['ID']
  input: UpdateFarmInput
}

export type MutationUpdateFarmZoneArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateFarmZoneInput>
}

export type MutationUpdateNoteArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateNoteInput>
}

export type MutationUpdateVarietyArgs = {
  id: Scalars['ID']
  input: UpdateVarietyInput
}

export type Note = {
  __typename?: 'Note'
  id: Scalars['ID']
  content: Scalars['String']
  field: Scalars['String']
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
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

export enum PermissionTypeEnum {
  Read = 'read',
  Write = 'write',
  Admin = 'admin',
}

export type Query = {
  __typename?: 'Query'
  getCoffee?: Maybe<Coffee>
  getCountry?: Maybe<Country>
  getFarm?: Maybe<Farm>
  getRegion?: Maybe<Region>
  getVariety?: Maybe<Variety>
  listCoffees: CoffeeConnection
  listCountries: CountryConnection
  listFarms: FarmConnection
  listRegions: RegionConnection
  listVarieties: VarietyConnection
}

export type QueryGetCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryGetCountryArgs = {
  id: Scalars['ID']
}

export type QueryGetFarmArgs = {
  id: Scalars['ID']
}

export type QueryGetRegionArgs = {
  id: Scalars['ID']
}

export type QueryGetVarietyArgs = {
  id: Scalars['ID']
}

export type QueryListCoffeesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListCountriesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListFarmsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListRegionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListVarietiesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryInput = {
  field: Scalars['String']
  value?: Maybe<Scalars['String']>
  operator?: Maybe<OperatorEnum>
}

export type Region = {
  __typename?: 'Region'
  id: Scalars['ID']
  name: Scalars['String']
  country?: Maybe<Country>
  farms?: Maybe<Array<Maybe<Farm>>>
}

export type RegionConnection = {
  __typename?: 'RegionConnection'
  pageInfo: PageInfo
  edges: Array<RegionEdge>
}

export type RegionEdge = {
  __typename?: 'RegionEdge'
  cursor: Scalars['String']
  node: Region
}

export type UpdateCoffeeInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  farm?: Maybe<Scalars['ID']>
  farmZone?: Maybe<Scalars['ID']>
  varieties?: Maybe<Array<Maybe<Scalars['ID']>>>
  elevation?: Maybe<Scalars['String']>
  components?: Maybe<Array<Maybe<ComponentInput>>>
}

export type UpdateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type UpdateFarmZoneInput = {
  name: Scalars['String']
}

export type UpdateNoteInput = {
  entityId?: Maybe<Scalars['ID']>
  content?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
}

export type UpdateVarietyInput = {
  name?: Maybe<Scalars['String']>
}

export type Variety = {
  __typename?: 'Variety'
  id: Scalars['ID']
  name: Scalars['String']
  background?: Maybe<Scalars['String']>
  coffees?: Maybe<Array<Maybe<Coffee>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type VarietyConnection = {
  __typename?: 'VarietyConnection'
  pageInfo: PageInfo
  edges: Array<VarietyEdge>
}

export type VarietyEdge = {
  __typename?: 'VarietyEdge'
  cursor: Scalars['String']
  node: Variety
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
  Query: ResolverTypeWrapper<{}>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Coffee: ResolverTypeWrapper<CoffeeDocument>
  String: ResolverTypeWrapper<Scalars['String']>
  Country: ResolverTypeWrapper<CountryDocument>
  Region: ResolverTypeWrapper<RegionDocument>
  Farm: ResolverTypeWrapper<FarmDocument>
  FarmZone: ResolverTypeWrapper<FarmZone>
  Variety: ResolverTypeWrapper<VarietyDocument>
  CoffeeComponent: ResolverTypeWrapper<CoffeeComponent>
  CoffeeSummary: ResolverTypeWrapper<CoffeeSummary>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Note: ResolverTypeWrapper<NoteDocument>
  Int: ResolverTypeWrapper<Scalars['Int']>
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  CoffeeConnection: ResolverTypeWrapper<Omit<CoffeeConnection, 'edges'> & {edges: Array<ResolversTypes['CoffeeEdge']>}>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CoffeeEdge: ResolverTypeWrapper<Omit<CoffeeEdge, 'node'> & {node: ResolversTypes['Coffee']}>
  CountryConnection: ResolverTypeWrapper<
    Omit<CountryConnection, 'edges'> & {edges: Array<ResolversTypes['CountryEdge']>}
  >
  CountryEdge: ResolverTypeWrapper<Omit<CountryEdge, 'node'> & {node: ResolversTypes['Country']}>
  FarmConnection: ResolverTypeWrapper<Omit<FarmConnection, 'edges'> & {edges: Array<ResolversTypes['FarmEdge']>}>
  FarmEdge: ResolverTypeWrapper<Omit<FarmEdge, 'node'> & {node: ResolversTypes['Farm']}>
  RegionConnection: ResolverTypeWrapper<Omit<RegionConnection, 'edges'> & {edges: Array<ResolversTypes['RegionEdge']>}>
  RegionEdge: ResolverTypeWrapper<Omit<RegionEdge, 'node'> & {node: ResolversTypes['Region']}>
  VarietyConnection: ResolverTypeWrapper<
    Omit<VarietyConnection, 'edges'> & {edges: Array<ResolversTypes['VarietyEdge']>}
  >
  VarietyEdge: ResolverTypeWrapper<Omit<VarietyEdge, 'node'> & {node: ResolversTypes['Variety']}>
  Mutation: ResolverTypeWrapper<{}>
  CreateCoffeeInput: CreateCoffeeInput
  ComponentInput: ComponentInput
  CreateFarmInput: CreateFarmInput
  CreateFarmZoneInput: CreateFarmZoneInput
  CreateNoteInput: CreateNoteInput
  CreateVarietyInput: CreateVarietyInput
  UpdateCoffeeInput: UpdateCoffeeInput
  PermissionTypeEnum: PermissionTypeEnum
  UpdateFarmInput: UpdateFarmInput
  UpdateFarmZoneInput: UpdateFarmZoneInput
  UpdateNoteInput: UpdateNoteInput
  UpdateVarietyInput: UpdateVarietyInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  ID: Scalars['ID']
  Coffee: CoffeeDocument
  String: Scalars['String']
  Country: CountryDocument
  Region: RegionDocument
  Farm: FarmDocument
  FarmZone: FarmZone
  Variety: VarietyDocument
  CoffeeComponent: CoffeeComponent
  CoffeeSummary: CoffeeSummary
  Float: Scalars['Float']
  Note: NoteDocument
  Int: Scalars['Int']
  QueryInput: QueryInput
  CoffeeConnection: Omit<CoffeeConnection, 'edges'> & {edges: Array<ResolversParentTypes['CoffeeEdge']>}
  PageInfo: PageInfo
  Boolean: Scalars['Boolean']
  CoffeeEdge: Omit<CoffeeEdge, 'node'> & {node: ResolversParentTypes['Coffee']}
  CountryConnection: Omit<CountryConnection, 'edges'> & {edges: Array<ResolversParentTypes['CountryEdge']>}
  CountryEdge: Omit<CountryEdge, 'node'> & {node: ResolversParentTypes['Country']}
  FarmConnection: Omit<FarmConnection, 'edges'> & {edges: Array<ResolversParentTypes['FarmEdge']>}
  FarmEdge: Omit<FarmEdge, 'node'> & {node: ResolversParentTypes['Farm']}
  RegionConnection: Omit<RegionConnection, 'edges'> & {edges: Array<ResolversParentTypes['RegionEdge']>}
  RegionEdge: Omit<RegionEdge, 'node'> & {node: ResolversParentTypes['Region']}
  VarietyConnection: Omit<VarietyConnection, 'edges'> & {edges: Array<ResolversParentTypes['VarietyEdge']>}
  VarietyEdge: Omit<VarietyEdge, 'node'> & {node: ResolversParentTypes['Variety']}
  Mutation: {}
  CreateCoffeeInput: CreateCoffeeInput
  ComponentInput: ComponentInput
  CreateFarmInput: CreateFarmInput
  CreateFarmZoneInput: CreateFarmZoneInput
  CreateNoteInput: CreateNoteInput
  CreateVarietyInput: CreateVarietyInput
  UpdateCoffeeInput: UpdateCoffeeInput
  UpdateFarmInput: UpdateFarmInput
  UpdateFarmZoneInput: UpdateFarmZoneInput
  UpdateNoteInput: UpdateNoteInput
  UpdateVarietyInput: UpdateVarietyInput
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  getCoffee?: Resolver<
    Maybe<ResolversTypes['Coffee']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCoffeeArgs, 'id'>
  >
  getCountry?: Resolver<
    Maybe<ResolversTypes['Country']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCountryArgs, 'id'>
  >
  getFarm?: Resolver<Maybe<ResolversTypes['Farm']>, ParentType, ContextType, RequireFields<QueryGetFarmArgs, 'id'>>
  getRegion?: Resolver<
    Maybe<ResolversTypes['Region']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRegionArgs, 'id'>
  >
  getVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetVarietyArgs, 'id'>
  >
  listCoffees?: Resolver<
    ResolversTypes['CoffeeConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListCoffeesArgs, never>
  >
  listCountries?: Resolver<
    ResolversTypes['CountryConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListCountriesArgs, never>
  >
  listFarms?: Resolver<
    ResolversTypes['FarmConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListFarmsArgs, never>
  >
  listRegions?: Resolver<
    ResolversTypes['RegionConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListRegionsArgs, never>
  >
  listVarieties?: Resolver<
    ResolversTypes['VarietyConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListVarietiesArgs, never>
  >
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>
  varieties?: Resolver<Array<ResolversTypes['Variety']>, ParentType, ContextType>
  elevation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  components?: Resolver<Maybe<Array<Maybe<ResolversTypes['CoffeeComponent']>>>, ParentType, ContextType>
  notes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Note']>>>,
    ParentType,
    ContextType,
    RequireFields<CoffeeNotesArgs, never>
  >
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CountryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  regions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Region']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RegionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>
  farms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Farm']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type FarmResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Farm'] = ResolversParentTypes['Farm']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>
  farmZones?: Resolver<Array<ResolversTypes['FarmZone']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type FarmZoneResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['FarmZone'] = ResolversParentTypes['FarmZone']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type VarietyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Variety'] = ResolversParentTypes['Variety']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  coffees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Coffee']>>>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CoffeeComponentResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoffeeComponent'] = ResolversParentTypes['CoffeeComponent']
> = ResolversObject<{
  coffee?: Resolver<ResolversTypes['CoffeeSummary'], ParentType, ContextType>
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CoffeeSummaryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoffeeSummary'] = ResolversParentTypes['CoffeeSummary']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type NoteResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CoffeeConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoffeeConnection'] = ResolversParentTypes['CoffeeConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['CoffeeEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CoffeeEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoffeeEdge'] = ResolversParentTypes['CoffeeEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Coffee'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CountryConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CountryConnection'] = ResolversParentTypes['CountryConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['CountryEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CountryEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CountryEdge'] = ResolversParentTypes['CountryEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Country'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type FarmConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['FarmConnection'] = ResolversParentTypes['FarmConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['FarmEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type FarmEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['FarmEdge'] = ResolversParentTypes['FarmEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Farm'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RegionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RegionConnection'] = ResolversParentTypes['RegionConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['RegionEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RegionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RegionEdge'] = ResolversParentTypes['RegionEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Region'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type VarietyConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VarietyConnection'] = ResolversParentTypes['VarietyConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['VarietyEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type VarietyEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VarietyEdge'] = ResolversParentTypes['VarietyEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Variety'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createCoffee?: Resolver<
    Maybe<ResolversTypes['Coffee']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCoffeeArgs, 'input'>
  >
  createFarm?: Resolver<
    Maybe<ResolversTypes['Farm']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateFarmArgs, 'input'>
  >
  createFarmZone?: Resolver<
    Maybe<ResolversTypes['Farm']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateFarmZoneArgs, 'farmId'>
  >
  createNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateNoteArgs, never>
  >
  createVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateVarietyArgs, 'input'>
  >
  deleteCoffee?: Resolver<
    Maybe<ResolversTypes['Coffee']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCoffeeArgs, 'id'>
  >
  deleteFarm?: Resolver<
    Maybe<ResolversTypes['Farm']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFarmArgs, 'id'>
  >
  deleteFarmZone?: Resolver<
    Maybe<ResolversTypes['Farm']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFarmZoneArgs, 'id'>
  >
  deleteNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteNoteArgs, 'id'>
  >
  deleteVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteVarietyArgs, 'id'>
  >
  makeVarietyPublic?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationMakeVarietyPublicArgs, 'id'>
  >
  updateCoffee?: Resolver<
    Maybe<ResolversTypes['Coffee']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCoffeeArgs, 'id' | 'input'>
  >
  updateCoffeePermissionsForAccount?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCoffeePermissionsForAccountArgs, 'coffeeId' | 'accountId' | 'permissionTypes'>
  >
  updateFarm?: Resolver<
    Maybe<ResolversTypes['Farm']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFarmArgs, 'id' | 'input'>
  >
  updateFarmZone?: Resolver<
    Maybe<ResolversTypes['Farm']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFarmZoneArgs, 'id'>
  >
  updateNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateNoteArgs, 'id'>
  >
  updateVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVarietyArgs, 'id' | 'input'>
  >
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Coffee?: CoffeeResolvers<ContextType>
  Country?: CountryResolvers<ContextType>
  Region?: RegionResolvers<ContextType>
  Farm?: FarmResolvers<ContextType>
  FarmZone?: FarmZoneResolvers<ContextType>
  Variety?: VarietyResolvers<ContextType>
  CoffeeComponent?: CoffeeComponentResolvers<ContextType>
  CoffeeSummary?: CoffeeSummaryResolvers<ContextType>
  Note?: NoteResolvers<ContextType>
  CoffeeConnection?: CoffeeConnectionResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  CoffeeEdge?: CoffeeEdgeResolvers<ContextType>
  CountryConnection?: CountryConnectionResolvers<ContextType>
  CountryEdge?: CountryEdgeResolvers<ContextType>
  FarmConnection?: FarmConnectionResolvers<ContextType>
  FarmEdge?: FarmEdgeResolvers<ContextType>
  RegionConnection?: RegionConnectionResolvers<ContextType>
  RegionEdge?: RegionEdgeResolvers<ContextType>
  VarietyConnection?: VarietyConnectionResolvers<ContextType>
  VarietyEdge?: VarietyEdgeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

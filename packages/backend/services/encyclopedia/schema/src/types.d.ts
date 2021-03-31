import {GraphQLResolveInfo} from 'graphql'
import {Context} from './startServer'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
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
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type CoffeeComponent = {
  __typename?: 'CoffeeComponent'
  coffee: CoffeeSummary
  percentage: Scalars['Float']
}

export type CoffeeSummary = {
  __typename?: 'CoffeeSummary'
  id: Scalars['ID']
  name: Scalars['String']
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

export type ComponentInput = {
  coffee: Scalars['ID']
  percentage: Scalars['Float']
}

export type Query = {
  __typename?: 'Query'
  getCoffee?: Maybe<Coffee>
  getCountry?: Maybe<Country>
  getEntityPosts: PostConnection
  getFarm?: Maybe<Farm>
  getPost?: Maybe<Post>
  getRegion?: Maybe<Region>
  getVariety?: Maybe<Variety>
  getView?: Maybe<View>
  listCoffees: CoffeeConnection
  listCountries: CountryConnection
  listFarms: FarmConnection
  listPosts: PostConnection
  listRegions: RegionConnection
  listVarieties: VarietyConnection
  listViews?: Maybe<ViewConnection>
}

export type QueryGetCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryGetCountryArgs = {
  id: Scalars['ID']
}

export type QueryGetEntityPostsArgs = {
  id: Scalars['ID']
}

export type QueryGetFarmArgs = {
  id: Scalars['ID']
}

export type QueryGetPostArgs = {
  id: Scalars['ID']
}

export type QueryGetRegionArgs = {
  id: Scalars['ID']
}

export type QueryGetVarietyArgs = {
  id: Scalars['ID']
}

export type QueryGetViewArgs = {
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

export type QueryListPostsArgs = {
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

export type QueryListViewsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export enum PermissionTypeEnum {
  Read = 'read',
  Write = 'write',
  Admin = 'admin',
}

export type Mutation = {
  __typename?: 'Mutation'
  createCoffee?: Maybe<Coffee>
  createFarm?: Maybe<Farm>
  createFarmZone?: Maybe<Farm>
  createPost?: Maybe<Post>
  createVariety?: Maybe<Variety>
  createView?: Maybe<View>
  deleteCoffee?: Maybe<Coffee>
  deleteFarm?: Maybe<Farm>
  deleteFarmZone?: Maybe<Farm>
  deletePost?: Maybe<Post>
  deleteVariety?: Maybe<Variety>
  deleteView?: Maybe<Scalars['Boolean']>
  makeVarietyPublic?: Maybe<Scalars['Boolean']>
  togglePin?: Maybe<Scalars['Boolean']>
  updateCoffee?: Maybe<Coffee>
  updateCoffeePermissionsForAccount?: Maybe<Scalars['Boolean']>
  updateFarm?: Maybe<Farm>
  updateFarmZone?: Maybe<Farm>
  updatePost?: Maybe<Post>
  updateVariety?: Maybe<Variety>
  updateView?: Maybe<View>
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

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationCreateVarietyArgs = {
  input: CreateVarietyInput
}

export type MutationCreateViewArgs = {
  input: CreateViewInput
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

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteVarietyArgs = {
  id: Scalars['ID']
}

export type MutationDeleteViewArgs = {
  id: Scalars['ID']
}

export type MutationMakeVarietyPublicArgs = {
  id: Scalars['ID']
}

export type MutationTogglePinArgs = {
  id: Scalars['ID']
  entityId: Scalars['ID']
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

export type MutationUpdatePostArgs = {
  id: Scalars['ID']
  input: UpdatePostInput
}

export type MutationUpdateVarietyArgs = {
  id: Scalars['ID']
  input: UpdateVarietyInput
}

export type MutationUpdateViewArgs = {
  id: Scalars['ID']
  input: UpdateViewInput
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

export type FarmZone = {
  __typename?: 'FarmZone'
  id: Scalars['ID']
  name: Scalars['String']
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

export type CreateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type UpdateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type CreateFarmZoneInput = {
  name: Scalars['String']
}

export type UpdateFarmZoneInput = {
  name: Scalars['String']
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  pinned?: Maybe<Scalars['Boolean']>
  relations?: Maybe<Array<Maybe<EntityRelation>>>
  content: Scalars['String']
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type PostPinnedArgs = {
  entityId: Scalars['ID']
}

export type EntityRelation = {
  __typename?: 'EntityRelation'
  id: Scalars['ID']
  type?: Maybe<EntityType>
  pinned?: Maybe<Scalars['Boolean']>
}

export enum EntityType {
  Coffee = 'Coffee',
  Country = 'Country',
  Variety = 'Variety',
}

export type PostConnection = {
  __typename?: 'PostConnection'
  pageInfo: PageInfo
  edges: Array<PostEdge>
}

export type PostEdge = {
  __typename?: 'PostEdge'
  node: Post
  cursor: Scalars['String']
}

export type EntityRelationInput = {
  id: Scalars['ID']
  type: EntityType
  pinned?: Maybe<Scalars['Boolean']>
}

export type CreatePostInput = {
  title?: Maybe<Scalars['String']>
  relations?: Maybe<Array<Maybe<EntityRelationInput>>>
  content: Scalars['String']
}

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>
  relations?: Maybe<Array<Maybe<EntityRelationInput>>>
  content: Scalars['String']
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

export type CreateVarietyInput = {
  name: Scalars['String']
}

export type UpdateVarietyInput = {
  name?: Maybe<Scalars['String']>
}

export enum CoffeeField {
  Name = 'name',
  Elevation = 'elevation',
}

export type CoffeeView = {
  __typename?: 'CoffeeView'
  fields?: Maybe<Array<Maybe<CoffeeField>>>
}

export type View = {
  __typename?: 'View'
  id: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type ViewConnection = {
  __typename?: 'ViewConnection'
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ViewEdge>>>
}

export enum ViewEntity {
  Coffee = 'Coffee',
}

export type ViewEdge = {
  __typename?: 'ViewEdge'
  node?: Maybe<View>
  cursor: Scalars['String']
}

export type CreateViewInput = {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type UpdateViewInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage?: Maybe<Scalars['Boolean']>
  nextCursor?: Maybe<Scalars['String']>
  prevCursor?: Maybe<Scalars['String']>
}

export enum OperatorEnum {
  Contains = 'contains',
  ContainsSensitive = 'containsSensitive',
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
}

export type QueryInput = {
  field: Scalars['String']
  operator?: Maybe<OperatorEnum>
  value?: Maybe<Scalars['String']>
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
  Coffee: ResolverTypeWrapper<Coffee>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  CoffeeComponent: ResolverTypeWrapper<CoffeeComponent>
  Float: ResolverTypeWrapper<Scalars['Float']>
  CoffeeSummary: ResolverTypeWrapper<CoffeeSummary>
  CoffeeConnection: ResolverTypeWrapper<CoffeeConnection>
  CoffeeEdge: ResolverTypeWrapper<CoffeeEdge>
  CreateCoffeeInput: CreateCoffeeInput
  UpdateCoffeeInput: UpdateCoffeeInput
  ComponentInput: ComponentInput
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  PermissionTypeEnum: PermissionTypeEnum
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Country: ResolverTypeWrapper<Country>
  CountryConnection: ResolverTypeWrapper<CountryConnection>
  CountryEdge: ResolverTypeWrapper<CountryEdge>
  Farm: ResolverTypeWrapper<Farm>
  FarmZone: ResolverTypeWrapper<FarmZone>
  FarmConnection: ResolverTypeWrapper<FarmConnection>
  FarmEdge: ResolverTypeWrapper<FarmEdge>
  CreateFarmInput: CreateFarmInput
  UpdateFarmInput: UpdateFarmInput
  CreateFarmZoneInput: CreateFarmZoneInput
  UpdateFarmZoneInput: UpdateFarmZoneInput
  Post: ResolverTypeWrapper<Post>
  EntityRelation: ResolverTypeWrapper<EntityRelation>
  EntityType: EntityType
  PostConnection: ResolverTypeWrapper<PostConnection>
  PostEdge: ResolverTypeWrapper<PostEdge>
  EntityRelationInput: EntityRelationInput
  CreatePostInput: CreatePostInput
  UpdatePostInput: UpdatePostInput
  Region: ResolverTypeWrapper<Region>
  RegionConnection: ResolverTypeWrapper<RegionConnection>
  RegionEdge: ResolverTypeWrapper<RegionEdge>
  Variety: ResolverTypeWrapper<Variety>
  VarietyConnection: ResolverTypeWrapper<VarietyConnection>
  VarietyEdge: ResolverTypeWrapper<VarietyEdge>
  CreateVarietyInput: CreateVarietyInput
  UpdateVarietyInput: UpdateVarietyInput
  CoffeeField: CoffeeField
  CoffeeView: ResolverTypeWrapper<CoffeeView>
  View: ResolverTypeWrapper<View>
  ViewConnection: ResolverTypeWrapper<ViewConnection>
  ViewEntity: ViewEntity
  ViewEdge: ResolverTypeWrapper<ViewEdge>
  CreateViewInput: CreateViewInput
  UpdateViewInput: UpdateViewInput
  PageInfo: ResolverTypeWrapper<PageInfo>
  OperatorEnum: OperatorEnum
  QueryInput: QueryInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Coffee: Coffee
  ID: Scalars['ID']
  String: Scalars['String']
  CoffeeComponent: CoffeeComponent
  Float: Scalars['Float']
  CoffeeSummary: CoffeeSummary
  CoffeeConnection: CoffeeConnection
  CoffeeEdge: CoffeeEdge
  CreateCoffeeInput: CreateCoffeeInput
  UpdateCoffeeInput: UpdateCoffeeInput
  ComponentInput: ComponentInput
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  Country: Country
  CountryConnection: CountryConnection
  CountryEdge: CountryEdge
  Farm: Farm
  FarmZone: FarmZone
  FarmConnection: FarmConnection
  FarmEdge: FarmEdge
  CreateFarmInput: CreateFarmInput
  UpdateFarmInput: UpdateFarmInput
  CreateFarmZoneInput: CreateFarmZoneInput
  UpdateFarmZoneInput: UpdateFarmZoneInput
  Post: Post
  EntityRelation: EntityRelation
  PostConnection: PostConnection
  PostEdge: PostEdge
  EntityRelationInput: EntityRelationInput
  CreatePostInput: CreatePostInput
  UpdatePostInput: UpdatePostInput
  Region: Region
  RegionConnection: RegionConnection
  RegionEdge: RegionEdge
  Variety: Variety
  VarietyConnection: VarietyConnection
  VarietyEdge: VarietyEdge
  CreateVarietyInput: CreateVarietyInput
  UpdateVarietyInput: UpdateVarietyInput
  CoffeeView: CoffeeView
  View: View
  ViewConnection: ViewConnection
  ViewEdge: ViewEdge
  CreateViewInput: CreateViewInput
  UpdateViewInput: UpdateViewInput
  PageInfo: PageInfo
  QueryInput: QueryInput
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

export type CoffeeConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoffeeConnection'] = ResolversParentTypes['CoffeeConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['CoffeeEdge']>, ParentType, ContextType>
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
  getEntityPosts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetEntityPostsArgs, 'id'>
  >
  getFarm?: Resolver<Maybe<ResolversTypes['Farm']>, ParentType, ContextType, RequireFields<QueryGetFarmArgs, 'id'>>
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostArgs, 'id'>>
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
  getView?: Resolver<Maybe<ResolversTypes['View']>, ParentType, ContextType, RequireFields<QueryGetViewArgs, 'id'>>
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
  listPosts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListPostsArgs, never>
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
  listViews?: Resolver<
    Maybe<ResolversTypes['ViewConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryListViewsArgs, never>
  >
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
  createPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'input'>
  >
  createVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateVarietyArgs, 'input'>
  >
  createView?: Resolver<
    Maybe<ResolversTypes['View']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateViewArgs, 'input'>
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
  deletePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'id'>
  >
  deleteVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteVarietyArgs, 'id'>
  >
  deleteView?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteViewArgs, 'id'>
  >
  makeVarietyPublic?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationMakeVarietyPublicArgs, 'id'>
  >
  togglePin?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationTogglePinArgs, 'id' | 'entityId'>
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
  updatePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'id' | 'input'>
  >
  updateVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVarietyArgs, 'id' | 'input'>
  >
  updateView?: Resolver<
    Maybe<ResolversTypes['View']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateViewArgs, 'id' | 'input'>
  >
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

export type PostResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  pinned?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<PostPinnedArgs, 'entityId'>
  >
  relations?: Resolver<Maybe<Array<Maybe<ResolversTypes['EntityRelation']>>>, ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EntityRelationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['EntityRelation'] = ResolversParentTypes['EntityRelation']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['EntityType']>, ParentType, ContextType>
  pinned?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PostConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PostEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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

export type CoffeeViewResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoffeeView'] = ResolversParentTypes['CoffeeView']
> = ResolversObject<{
  fields?: Resolver<Maybe<Array<Maybe<ResolversTypes['CoffeeField']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ViewResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['View'] = ResolversParentTypes['View']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ViewConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ViewConnection'] = ResolversParentTypes['ViewConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['ViewEdge']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ViewEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ViewEdge'] = ResolversParentTypes['ViewEdge']
> = ResolversObject<{
  node?: Resolver<Maybe<ResolversTypes['View']>, ParentType, ContextType>
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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

export type Resolvers<ContextType = Context> = ResolversObject<{
  Coffee?: CoffeeResolvers<ContextType>
  CoffeeComponent?: CoffeeComponentResolvers<ContextType>
  CoffeeSummary?: CoffeeSummaryResolvers<ContextType>
  CoffeeConnection?: CoffeeConnectionResolvers<ContextType>
  CoffeeEdge?: CoffeeEdgeResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Country?: CountryResolvers<ContextType>
  CountryConnection?: CountryConnectionResolvers<ContextType>
  CountryEdge?: CountryEdgeResolvers<ContextType>
  Farm?: FarmResolvers<ContextType>
  FarmZone?: FarmZoneResolvers<ContextType>
  FarmConnection?: FarmConnectionResolvers<ContextType>
  FarmEdge?: FarmEdgeResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  EntityRelation?: EntityRelationResolvers<ContextType>
  PostConnection?: PostConnectionResolvers<ContextType>
  PostEdge?: PostEdgeResolvers<ContextType>
  Region?: RegionResolvers<ContextType>
  RegionConnection?: RegionConnectionResolvers<ContextType>
  RegionEdge?: RegionEdgeResolvers<ContextType>
  Variety?: VarietyResolvers<ContextType>
  VarietyConnection?: VarietyConnectionResolvers<ContextType>
  VarietyEdge?: VarietyEdgeResolvers<ContextType>
  CoffeeView?: CoffeeViewResolvers<ContextType>
  View?: ViewResolvers<ContextType>
  ViewConnection?: ViewConnectionResolvers<ContextType>
  ViewEdge?: ViewEdgeResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

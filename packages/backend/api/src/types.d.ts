import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql'
import {Context} from './application/ApplicationModule'
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
  ScoreFloat: any
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  name: Scalars['String']
  users?: Maybe<Array<User>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type AccountConnection = {
  __typename?: 'AccountConnection'
  pageInfo: PageInfo
  edges: Array<AccountEdge>
}

export type AccountEdge = {
  __typename?: 'AccountEdge'
  cursor: Scalars['String']
  node: Account
}

export type CreateAccountInput = {
  name: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
}

export type UpdateAccountInput = {
  name?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  getAccount?: Maybe<Account>
  getBrewGuide?: Maybe<BrewGuide>
  getBrewer?: Maybe<Brewer>
  getBrewingSession?: Maybe<BrewingSession>
  getCoffee?: Maybe<Coffee>
  getCountry?: Maybe<Country>
  getCuppingSession?: Maybe<CuppingSession>
  getCuppingSessionCoffee?: Maybe<SessionCoffee>
  getEntityPosts: PostConnection
  getEvaluation?: Maybe<Evaluation>
  getFarm?: Maybe<Farm>
  getGrinder?: Maybe<Grinder>
  getPost?: Maybe<Post>
  getRecipe?: Maybe<Recipe>
  getRegion?: Maybe<Region>
  getRole?: Maybe<Role>
  getScoreSheet?: Maybe<ScoreSheet>
  getUser?: Maybe<User>
  getVariety?: Maybe<Variety>
  getView?: Maybe<View>
  listAccounts: AccountConnection
  listBrewGuides: BrewGuideConnection
  listBrewers: BrewerConnection
  listBrewingSessions?: Maybe<BrewingSessionConnection>
  listCoffees: CoffeeConnection
  listCountries: CountryConnection
  listCuppingSessions: CuppingSessionConnection
  listEvaluations?: Maybe<EvaluationConnection>
  listFarms: FarmConnection
  listGrinders: GrinderConnection
  listPosts: PostConnection
  listRecipes: RecipeConnection
  listRegions: RegionConnection
  listRoles: RoleConnection
  listScoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
  listUsers: UserConnection
  listVarieties: VarietyConnection
  listViews?: Maybe<ViewConnection>
  me?: Maybe<Me>
}

export type QueryGetAccountArgs = {
  id: Scalars['ID']
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

export type QueryGetCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryGetCountryArgs = {
  id: Scalars['ID']
}

export type QueryGetCuppingSessionArgs = {
  id: Scalars['ID']
}

export type QueryGetCuppingSessionCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryGetEntityPostsArgs = {
  id: Scalars['ID']
}

export type QueryGetEvaluationArgs = {
  id: Scalars['ID']
}

export type QueryGetFarmArgs = {
  id: Scalars['ID']
}

export type QueryGetGrinderArgs = {
  id: Scalars['ID']
}

export type QueryGetPostArgs = {
  id: Scalars['ID']
}

export type QueryGetRecipeArgs = {
  id: Scalars['ID']
}

export type QueryGetRegionArgs = {
  id: Scalars['ID']
}

export type QueryGetRoleArgs = {
  id: Scalars['ID']
}

export type QueryGetScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  scoreSheetId: Scalars['ID']
}

export type QueryGetUserArgs = {
  id: Scalars['ID']
}

export type QueryGetVarietyArgs = {
  id: Scalars['ID']
}

export type QueryGetViewArgs = {
  id: Scalars['ID']
}

export type QueryListAccountsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListBrewersArgs = {
  limit?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
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

export type QueryListCuppingSessionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
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

export type QueryListRolesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListScoreSheetsArgs = {
  sessionCoffeeId: Scalars['ID']
}

export type QueryListUsersArgs = {
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

export type Mutation = {
  __typename?: 'Mutation'
  addUserToAccount?: Maybe<Scalars['Boolean']>
  createAccount?: Maybe<Account>
  createBrewGuide?: Maybe<BrewGuide>
  createBrewer?: Maybe<Brewer>
  createBrewingSession?: Maybe<BrewingSession>
  createCoffee?: Maybe<Coffee>
  createCuppingSession?: Maybe<CuppingSession>
  createEvaluation?: Maybe<Evaluation>
  createFarm?: Maybe<Farm>
  createFarmZone?: Maybe<Farm>
  createGrinder?: Maybe<Grinder>
  createPost?: Maybe<Post>
  createRecipe?: Maybe<Recipe>
  createRole?: Maybe<Role>
  createScoreSheet?: Maybe<ScoreSheet>
  createUser?: Maybe<User>
  createVariety?: Maybe<Variety>
  createView?: Maybe<View>
  deleteAccount?: Maybe<Account>
  deleteBrewGuide?: Maybe<Scalars['Boolean']>
  deleteBrewer?: Maybe<Scalars['Boolean']>
  deleteBrewingSession?: Maybe<Scalars['Boolean']>
  deleteCoffee?: Maybe<Coffee>
  deleteCuppingSession?: Maybe<Scalars['Boolean']>
  deleteEvaluation?: Maybe<Scalars['Boolean']>
  deleteFarm?: Maybe<Farm>
  deleteFarmZone?: Maybe<Farm>
  deleteGrinder?: Maybe<Scalars['Boolean']>
  deletePost?: Maybe<Post>
  deleteRecipe?: Maybe<Scalars['Boolean']>
  deleteRole?: Maybe<Role>
  deleteScoreSheet?: Maybe<CuppingSession>
  deleteUser?: Maybe<Scalars['Boolean']>
  deleteVariety?: Maybe<Variety>
  deleteView?: Maybe<Scalars['Boolean']>
  lockCuppingSession?: Maybe<CuppingSession>
  login?: Maybe<Scalars['String']>
  logout: Scalars['Boolean']
  makeVarietyPublic?: Maybe<Scalars['Boolean']>
  refreshToken?: Maybe<Scalars['String']>
  switchAccount?: Maybe<Scalars['Boolean']>
  togglePin?: Maybe<Scalars['Boolean']>
  updateAccount?: Maybe<Account>
  updateBrewGuide?: Maybe<BrewGuide>
  updateBrewer?: Maybe<Brewer>
  updateBrewingSession?: Maybe<BrewingSession>
  updateCoffee?: Maybe<Coffee>
  updateCoffeePermissionsForAccount?: Maybe<Scalars['Boolean']>
  updateCuppingSession?: Maybe<CuppingSession>
  updateCuppingSessionCoffees?: Maybe<CuppingSession>
  updateEvaluation?: Maybe<Evaluation>
  updateFarm?: Maybe<Farm>
  updateFarmZone?: Maybe<Farm>
  updateGrinder?: Maybe<Grinder>
  updateMe?: Maybe<User>
  updatePassword: Scalars['Boolean']
  updatePost?: Maybe<Post>
  updateRecipe?: Maybe<Recipe>
  updateRole?: Maybe<Role>
  updateScoreSheet?: Maybe<ScoreSheet>
  updateUser?: Maybe<User>
  updateUserRoles?: Maybe<User>
  updateVariety?: Maybe<Variety>
  updateView?: Maybe<View>
}

export type MutationAddUserToAccountArgs = {
  accountId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationCreateAccountArgs = {
  input: CreateAccountInput
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

export type MutationCreateCoffeeArgs = {
  input: CreateCoffeeInput
}

export type MutationCreateCuppingSessionArgs = {
  input: CreateCuppingSessionInput
}

export type MutationCreateEvaluationArgs = {
  input?: Maybe<CreateEvaluationInput>
}

export type MutationCreateFarmArgs = {
  input: CreateFarmInput
}

export type MutationCreateFarmZoneArgs = {
  farmId: Scalars['ID']
  input?: Maybe<CreateFarmZoneInput>
}

export type MutationCreateGrinderArgs = {
  input: CreateGrinderInput
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationCreateRecipeArgs = {
  input?: Maybe<CreateRecipeInput>
}

export type MutationCreateRoleArgs = {
  input: CreateRoleInput
}

export type MutationCreateScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  input: CreateScoreSheetInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationCreateVarietyArgs = {
  input: CreateVarietyInput
}

export type MutationCreateViewArgs = {
  input: CreateViewInput
}

export type MutationDeleteAccountArgs = {
  id: Scalars['ID']
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

export type MutationDeleteCoffeeArgs = {
  id: Scalars['ID']
}

export type MutationDeleteCuppingSessionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteEvaluationArgs = {
  id: Scalars['ID']
}

export type MutationDeleteFarmArgs = {
  id: Scalars['ID']
}

export type MutationDeleteFarmZoneArgs = {
  id: Scalars['ID']
}

export type MutationDeleteGrinderArgs = {
  id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']
}

export type MutationDeleteRoleArgs = {
  id: Scalars['ID']
}

export type MutationDeleteScoreSheetArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationDeleteVarietyArgs = {
  id: Scalars['ID']
}

export type MutationDeleteViewArgs = {
  id: Scalars['ID']
}

export type MutationLockCuppingSessionArgs = {
  id: Scalars['ID']
}

export type MutationLoginArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type MutationMakeVarietyPublicArgs = {
  id: Scalars['ID']
}

export type MutationSwitchAccountArgs = {
  accountId: Scalars['ID']
}

export type MutationTogglePinArgs = {
  id: Scalars['ID']
  entityId: Scalars['ID']
}

export type MutationUpdateAccountArgs = {
  id: Scalars['ID']
  input: UpdateAccountInput
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

export type MutationUpdateCoffeeArgs = {
  id: Scalars['ID']
  input: UpdateCoffeeInput
}

export type MutationUpdateCoffeePermissionsForAccountArgs = {
  coffeeId: Scalars['ID']
  accountId: Scalars['ID']
  permissionTypes: Array<PermissionTypeEnum>
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

export type MutationUpdateFarmArgs = {
  id: Scalars['ID']
  input: UpdateFarmInput
}

export type MutationUpdateFarmZoneArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateFarmZoneInput>
}

export type MutationUpdateGrinderArgs = {
  id: Scalars['ID']
  input: UpdateGrinderInput
}

export type MutationUpdateMeArgs = {
  input?: Maybe<UpdateMeInput>
}

export type MutationUpdatePasswordArgs = {
  id: Scalars['ID']
  input: UpdatePasswordInput
}

export type MutationUpdatePostArgs = {
  id: Scalars['ID']
  input: UpdatePostInput
}

export type MutationUpdateRecipeArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateRecipeInput>
}

export type MutationUpdateRoleArgs = {
  id: Scalars['ID']
  input: UpdateRoleInput
}

export type MutationUpdateScoreSheetArgs = {
  scoreSheetId: Scalars['ID']
  sessionCoffeeId: Scalars['ID']
  input: UpdateScoreSheetInput
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  input: UpdateUserInput
}

export type MutationUpdateUserRolesArgs = {
  id: Scalars['ID']
  roles?: Maybe<Array<Scalars['ID']>>
}

export type MutationUpdateVarietyArgs = {
  id: Scalars['ID']
  input: UpdateVarietyInput
}

export type MutationUpdateViewArgs = {
  id: Scalars['ID']
  input: UpdateViewInput
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

export type CreateBrewGuideInput = {
  name: Scalars['String']
  recipeId: Scalars['ID']
}

export type UpdateBrewGuideInput = {
  name?: Maybe<Scalars['String']>
  recipeId?: Maybe<Scalars['ID']>
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

export type Coffee = {
  __typename?: 'Coffee'
  components?: Maybe<Array<Maybe<CoffeeComponent>>>
  country?: Maybe<Country>
  createdAt: Scalars['String']
  elevation?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  region?: Maybe<Region>
  updatedAt: Scalars['String']
  varieties: Array<Variety>
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

export type Role = {
  __typename?: 'Role'
  id: Scalars['ID']
  name: Scalars['String']
  scopes: Array<Scalars['String']>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type RoleConnection = {
  __typename?: 'RoleConnection'
  pageInfo: PageInfo
  edges: Array<RoleEdge>
}

export type RoleEdge = {
  __typename?: 'RoleEdge'
  cursor: Scalars['String']
  node: Role
}

export type CreateRoleInput = {
  name: Scalars['String']
  scopes?: Maybe<Array<Scalars['String']>>
}

export type UpdateRoleInput = {
  name?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['String']>>
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

export type User = UserInterface & {
  __typename?: 'User'
  accounts: Array<Account>
  createdAt: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  lastName?: Maybe<Scalars['String']>
  roles: Array<Role>
  scopes: Array<Scalars['String']>
  theme?: Maybe<Theme>
  updatedAt: Scalars['String']
  username: Scalars['String']
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

export type UserInterface = {
  id: Scalars['ID']
  username: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  accounts: Array<Account>
  roles: Array<Role>
  scopes: Array<Scalars['String']>
  theme?: Maybe<Theme>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Me = UserInterface & {
  __typename?: 'Me'
  id: Scalars['ID']
  username: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  account?: Maybe<Account>
  accounts: Array<Account>
  roles: Array<Role>
  scopes: Array<Scalars['String']>
  theme?: Maybe<Theme>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type UserConnection = {
  __typename?: 'UserConnection'
  pageInfo: PageInfo
  edges: Array<UserEdge>
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor: Scalars['String']
  node: User
}

export type CreateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username: Scalars['String']
  password: Scalars['String']
  roles?: Maybe<Array<Scalars['ID']>>
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type UpdateMeInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  theme?: Maybe<Theme>
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
  jsonString?: Maybe<Scalars['String']>
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
  jsonString?: Maybe<Scalars['String']>
}

export type UpdateViewInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  jsonString?: Maybe<Scalars['String']>
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

export enum PermissionTypeEnum {
  Read = 'read',
  Write = 'write',
  Admin = 'admin',
}

export type QueryInput = {
  field: Scalars['String']
  operator?: Maybe<OperatorEnum>
  value?: Maybe<Scalars['String']>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

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
  Account: ResolverTypeWrapper<Account>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  AccountConnection: ResolverTypeWrapper<AccountConnection>
  AccountEdge: ResolverTypeWrapper<AccountEdge>
  CreateAccountInput: CreateAccountInput
  UpdateAccountInput: UpdateAccountInput
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  BrewGuide: ResolverTypeWrapper<BrewGuide>
  BrewGuideConnection: ResolverTypeWrapper<BrewGuideConnection>
  BrewGuideEdge: ResolverTypeWrapper<BrewGuideEdge>
  CreateBrewGuideInput: CreateBrewGuideInput
  UpdateBrewGuideInput: UpdateBrewGuideInput
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
  Coffee: ResolverTypeWrapper<Coffee>
  CoffeeComponent: ResolverTypeWrapper<CoffeeComponent>
  Float: ResolverTypeWrapper<Scalars['Float']>
  CoffeeSummary: ResolverTypeWrapper<CoffeeSummary>
  CoffeeConnection: ResolverTypeWrapper<CoffeeConnection>
  CoffeeEdge: ResolverTypeWrapper<CoffeeEdge>
  CreateCoffeeInput: CreateCoffeeInput
  UpdateCoffeeInput: UpdateCoffeeInput
  ComponentInput: ComponentInput
  Country: ResolverTypeWrapper<Country>
  CountryConnection: ResolverTypeWrapper<CountryConnection>
  CountryEdge: ResolverTypeWrapper<CountryEdge>
  CuppingSession: ResolverTypeWrapper<CuppingSession>
  SessionCoffee: ResolverTypeWrapper<SessionCoffee>
  CuppingSessionConnection: ResolverTypeWrapper<CuppingSessionConnection>
  CuppingSessionEdge: ResolverTypeWrapper<CuppingSessionEdge>
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  Evaluation: ResolverTypeWrapper<Evaluation>
  EvaluationConnection: ResolverTypeWrapper<EvaluationConnection>
  EvaluationEdge: ResolverTypeWrapper<EvaluationEdge>
  CreateEvaluationInput: CreateEvaluationInput
  UpdateEvaluationInput: UpdateEvaluationInput
  Farm: ResolverTypeWrapper<Farm>
  FarmZone: ResolverTypeWrapper<FarmZone>
  FarmConnection: ResolverTypeWrapper<FarmConnection>
  FarmEdge: ResolverTypeWrapper<FarmEdge>
  CreateFarmInput: CreateFarmInput
  UpdateFarmInput: UpdateFarmInput
  CreateFarmZoneInput: CreateFarmZoneInput
  UpdateFarmZoneInput: UpdateFarmZoneInput
  Grinder: ResolverTypeWrapper<Grinder>
  BurrSet: BurrSet
  GrinderConnection: ResolverTypeWrapper<GrinderConnection>
  GrinderEdge: ResolverTypeWrapper<GrinderEdge>
  CreateGrinderInput: CreateGrinderInput
  UpdateGrinderInput: UpdateGrinderInput
  Post: ResolverTypeWrapper<Post>
  EntityRelation: ResolverTypeWrapper<EntityRelation>
  EntityType: EntityType
  PostConnection: ResolverTypeWrapper<PostConnection>
  PostEdge: ResolverTypeWrapper<PostEdge>
  EntityRelationInput: EntityRelationInput
  CreatePostInput: CreatePostInput
  UpdatePostInput: UpdatePostInput
  Recipe: ResolverTypeWrapper<Recipe>
  RecipeConnection: ResolverTypeWrapper<RecipeConnection>
  RecipeEdge: ResolverTypeWrapper<RecipeEdge>
  CreateRecipeInput: CreateRecipeInput
  UpdateRecipeInput: UpdateRecipeInput
  Region: ResolverTypeWrapper<Region>
  RegionConnection: ResolverTypeWrapper<RegionConnection>
  RegionEdge: ResolverTypeWrapper<RegionEdge>
  Role: ResolverTypeWrapper<Role>
  RoleConnection: ResolverTypeWrapper<RoleConnection>
  RoleEdge: ResolverTypeWrapper<RoleEdge>
  CreateRoleInput: CreateRoleInput
  UpdateRoleInput: UpdateRoleInput
  ScoreSheet: ResolverTypeWrapper<ScoreSheet>
  User: ResolverTypeWrapper<User>
  DefectScore: ResolverTypeWrapper<DefectScore>
  ScoreFloat: ResolverTypeWrapper<Scalars['ScoreFloat']>
  CreateScoreSheetInput: CreateScoreSheetInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  UserInterface: ResolversTypes['User'] | ResolversTypes['Me']
  Me: ResolverTypeWrapper<Me>
  Theme: Theme
  UserConnection: ResolverTypeWrapper<UserConnection>
  UserEdge: ResolverTypeWrapper<UserEdge>
  CreateUserInput: CreateUserInput
  UpdateUserInput: UpdateUserInput
  UpdatePasswordInput: UpdatePasswordInput
  UpdateMeInput: UpdateMeInput
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
  OperatorEnum: OperatorEnum
  PermissionTypeEnum: PermissionTypeEnum
  QueryInput: QueryInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account
  ID: Scalars['ID']
  String: Scalars['String']
  AccountConnection: AccountConnection
  AccountEdge: AccountEdge
  CreateAccountInput: CreateAccountInput
  UpdateAccountInput: UpdateAccountInput
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  BrewGuide: BrewGuide
  BrewGuideConnection: BrewGuideConnection
  BrewGuideEdge: BrewGuideEdge
  CreateBrewGuideInput: CreateBrewGuideInput
  UpdateBrewGuideInput: UpdateBrewGuideInput
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
  Coffee: Coffee
  CoffeeComponent: CoffeeComponent
  Float: Scalars['Float']
  CoffeeSummary: CoffeeSummary
  CoffeeConnection: CoffeeConnection
  CoffeeEdge: CoffeeEdge
  CreateCoffeeInput: CreateCoffeeInput
  UpdateCoffeeInput: UpdateCoffeeInput
  ComponentInput: ComponentInput
  Country: Country
  CountryConnection: CountryConnection
  CountryEdge: CountryEdge
  CuppingSession: CuppingSession
  SessionCoffee: SessionCoffee
  CuppingSessionConnection: CuppingSessionConnection
  CuppingSessionEdge: CuppingSessionEdge
  CreateCuppingSessionInput: CreateCuppingSessionInput
  UpdateCuppingSessionInput: UpdateCuppingSessionInput
  SessionCoffeeInput: SessionCoffeeInput
  Evaluation: Evaluation
  EvaluationConnection: EvaluationConnection
  EvaluationEdge: EvaluationEdge
  CreateEvaluationInput: CreateEvaluationInput
  UpdateEvaluationInput: UpdateEvaluationInput
  Farm: Farm
  FarmZone: FarmZone
  FarmConnection: FarmConnection
  FarmEdge: FarmEdge
  CreateFarmInput: CreateFarmInput
  UpdateFarmInput: UpdateFarmInput
  CreateFarmZoneInput: CreateFarmZoneInput
  UpdateFarmZoneInput: UpdateFarmZoneInput
  Grinder: Grinder
  GrinderConnection: GrinderConnection
  GrinderEdge: GrinderEdge
  CreateGrinderInput: CreateGrinderInput
  UpdateGrinderInput: UpdateGrinderInput
  Post: Post
  EntityRelation: EntityRelation
  PostConnection: PostConnection
  PostEdge: PostEdge
  EntityRelationInput: EntityRelationInput
  CreatePostInput: CreatePostInput
  UpdatePostInput: UpdatePostInput
  Recipe: Recipe
  RecipeConnection: RecipeConnection
  RecipeEdge: RecipeEdge
  CreateRecipeInput: CreateRecipeInput
  UpdateRecipeInput: UpdateRecipeInput
  Region: Region
  RegionConnection: RegionConnection
  RegionEdge: RegionEdge
  Role: Role
  RoleConnection: RoleConnection
  RoleEdge: RoleEdge
  CreateRoleInput: CreateRoleInput
  UpdateRoleInput: UpdateRoleInput
  ScoreSheet: ScoreSheet
  User: User
  DefectScore: DefectScore
  ScoreFloat: Scalars['ScoreFloat']
  CreateScoreSheetInput: CreateScoreSheetInput
  UpdateScoreSheetInput: UpdateScoreSheetInput
  DefectScoreInput: DefectScoreInput
  UserInterface: ResolversParentTypes['User'] | ResolversParentTypes['Me']
  Me: Me
  UserConnection: UserConnection
  UserEdge: UserEdge
  CreateUserInput: CreateUserInput
  UpdateUserInput: UpdateUserInput
  UpdatePasswordInput: UpdatePasswordInput
  UpdateMeInput: UpdateMeInput
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
  QueryInput: QueryInput
}>

export type AccountResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AccountConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AccountConnection'] = ResolversParentTypes['AccountConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['AccountEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AccountEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AccountEdge'] = ResolversParentTypes['AccountEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  getAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAccountArgs, 'id'>
  >
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
  getEntityPosts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetEntityPostsArgs, 'id'>
  >
  getEvaluation?: Resolver<
    Maybe<ResolversTypes['Evaluation']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEvaluationArgs, 'id'>
  >
  getFarm?: Resolver<Maybe<ResolversTypes['Farm']>, ParentType, ContextType, RequireFields<QueryGetFarmArgs, 'id'>>
  getGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetGrinderArgs, 'id'>
  >
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostArgs, 'id'>>
  getRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRecipeArgs, 'id'>
  >
  getRegion?: Resolver<
    Maybe<ResolversTypes['Region']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRegionArgs, 'id'>
  >
  getRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryGetRoleArgs, 'id'>>
  getScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetScoreSheetArgs, 'sessionCoffeeId' | 'scoreSheetId'>
  >
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>
  getVariety?: Resolver<
    Maybe<ResolversTypes['Variety']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetVarietyArgs, 'id'>
  >
  getView?: Resolver<Maybe<ResolversTypes['View']>, ParentType, ContextType, RequireFields<QueryGetViewArgs, 'id'>>
  listAccounts?: Resolver<
    ResolversTypes['AccountConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListAccountsArgs, never>
  >
  listBrewGuides?: Resolver<ResolversTypes['BrewGuideConnection'], ParentType, ContextType>
  listBrewers?: Resolver<
    ResolversTypes['BrewerConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListBrewersArgs, never>
  >
  listBrewingSessions?: Resolver<Maybe<ResolversTypes['BrewingSessionConnection']>, ParentType, ContextType>
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
  listCuppingSessions?: Resolver<
    ResolversTypes['CuppingSessionConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListCuppingSessionsArgs, never>
  >
  listEvaluations?: Resolver<Maybe<ResolversTypes['EvaluationConnection']>, ParentType, ContextType>
  listFarms?: Resolver<
    ResolversTypes['FarmConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListFarmsArgs, never>
  >
  listGrinders?: Resolver<ResolversTypes['GrinderConnection'], ParentType, ContextType>
  listPosts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListPostsArgs, never>
  >
  listRecipes?: Resolver<ResolversTypes['RecipeConnection'], ParentType, ContextType>
  listRegions?: Resolver<
    ResolversTypes['RegionConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListRegionsArgs, never>
  >
  listRoles?: Resolver<
    ResolversTypes['RoleConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListRolesArgs, never>
  >
  listScoreSheets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ScoreSheet']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryListScoreSheetsArgs, 'sessionCoffeeId'>
  >
  listUsers?: Resolver<
    ResolversTypes['UserConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListUsersArgs, never>
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
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  addUserToAccount?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddUserToAccountArgs, 'accountId' | 'userId'>
  >
  createAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateAccountArgs, 'input'>
  >
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
  createCoffee?: Resolver<
    Maybe<ResolversTypes['Coffee']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCoffeeArgs, 'input'>
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
  createGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateGrinderArgs, 'input'>
  >
  createPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'input'>
  >
  createRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateRecipeArgs, never>
  >
  createRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoleArgs, 'input'>
  >
  createScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateScoreSheetArgs, 'sessionCoffeeId' | 'input'>
  >
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
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
  deleteAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAccountArgs, 'id'>
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
  deleteCoffee?: Resolver<
    Maybe<ResolversTypes['Coffee']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCoffeeArgs, 'id'>
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
  deleteGrinder?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGrinderArgs, 'id'>
  >
  deletePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'id'>
  >
  deleteRecipe?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRecipeArgs, 'id'>
  >
  deleteRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRoleArgs, 'id'>
  >
  deleteScoreSheet?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteScoreSheetArgs, 'id'>
  >
  deleteUser?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'id'>
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
  lockCuppingSession?: Resolver<
    Maybe<ResolversTypes['CuppingSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationLockCuppingSessionArgs, 'id'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  makeVarietyPublic?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationMakeVarietyPublicArgs, 'id'>
  >
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  switchAccount?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSwitchAccountArgs, 'accountId'>
  >
  togglePin?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationTogglePinArgs, 'id' | 'entityId'>
  >
  updateAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAccountArgs, 'id' | 'input'>
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
  updateGrinder?: Resolver<
    Maybe<ResolversTypes['Grinder']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGrinderArgs, 'id' | 'input'>
  >
  updateMe?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMeArgs, never>
  >
  updatePassword?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePasswordArgs, 'id' | 'input'>
  >
  updatePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'id' | 'input'>
  >
  updateRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRecipeArgs, 'id'>
  >
  updateRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoleArgs, 'id' | 'input'>
  >
  updateScoreSheet?: Resolver<
    Maybe<ResolversTypes['ScoreSheet']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateScoreSheetArgs, 'scoreSheetId' | 'sessionCoffeeId' | 'input'>
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'id' | 'input'>
  >
  updateUserRoles?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserRolesArgs, 'id'>
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

export type CoffeeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Coffee'] = ResolversParentTypes['Coffee']
> = ResolversObject<{
  components?: Resolver<Maybe<Array<Maybe<ResolversTypes['CoffeeComponent']>>>, ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  elevation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  varieties?: Resolver<Array<ResolversTypes['Variety']>, ParentType, ContextType>
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

export type CuppingSessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CuppingSession'] = ResolversParentTypes['CuppingSession']
> = ResolversObject<{
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

export type RoleResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  scopes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RoleConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RoleConnection'] = ResolversParentTypes['RoleConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['RoleEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RoleEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RoleEdge'] = ResolversParentTypes['RoleEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Role'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ScoreSheetResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ScoreSheet'] = ResolversParentTypes['ScoreSheet']
> = ResolversObject<{
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
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>
  scopes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  theme?: Resolver<Maybe<ResolversTypes['Theme']>, ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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

export type UserInterfaceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserInterface'] = ResolversParentTypes['UserInterface']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'Me', ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>
  scopes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  theme?: Resolver<Maybe<ResolversTypes['Theme']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type MeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>
  scopes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  theme?: Resolver<Maybe<ResolversTypes['Theme']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>
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
  jsonString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>
  AccountConnection?: AccountConnectionResolvers<ContextType>
  AccountEdge?: AccountEdgeResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  BrewGuide?: BrewGuideResolvers<ContextType>
  BrewGuideConnection?: BrewGuideConnectionResolvers<ContextType>
  BrewGuideEdge?: BrewGuideEdgeResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Brewer?: BrewerResolvers<ContextType>
  BrewerConnection?: BrewerConnectionResolvers<ContextType>
  BrewerEdge?: BrewerEdgeResolvers<ContextType>
  BrewingSession?: BrewingSessionResolvers<ContextType>
  BrewingSessionConnection?: BrewingSessionConnectionResolvers<ContextType>
  BrewingSessionEdge?: BrewingSessionEdgeResolvers<ContextType>
  Coffee?: CoffeeResolvers<ContextType>
  CoffeeComponent?: CoffeeComponentResolvers<ContextType>
  CoffeeSummary?: CoffeeSummaryResolvers<ContextType>
  CoffeeConnection?: CoffeeConnectionResolvers<ContextType>
  CoffeeEdge?: CoffeeEdgeResolvers<ContextType>
  Country?: CountryResolvers<ContextType>
  CountryConnection?: CountryConnectionResolvers<ContextType>
  CountryEdge?: CountryEdgeResolvers<ContextType>
  CuppingSession?: CuppingSessionResolvers<ContextType>
  SessionCoffee?: SessionCoffeeResolvers<ContextType>
  CuppingSessionConnection?: CuppingSessionConnectionResolvers<ContextType>
  CuppingSessionEdge?: CuppingSessionEdgeResolvers<ContextType>
  Evaluation?: EvaluationResolvers<ContextType>
  EvaluationConnection?: EvaluationConnectionResolvers<ContextType>
  EvaluationEdge?: EvaluationEdgeResolvers<ContextType>
  Farm?: FarmResolvers<ContextType>
  FarmZone?: FarmZoneResolvers<ContextType>
  FarmConnection?: FarmConnectionResolvers<ContextType>
  FarmEdge?: FarmEdgeResolvers<ContextType>
  Grinder?: GrinderResolvers<ContextType>
  GrinderConnection?: GrinderConnectionResolvers<ContextType>
  GrinderEdge?: GrinderEdgeResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  EntityRelation?: EntityRelationResolvers<ContextType>
  PostConnection?: PostConnectionResolvers<ContextType>
  PostEdge?: PostEdgeResolvers<ContextType>
  Recipe?: RecipeResolvers<ContextType>
  RecipeConnection?: RecipeConnectionResolvers<ContextType>
  RecipeEdge?: RecipeEdgeResolvers<ContextType>
  Region?: RegionResolvers<ContextType>
  RegionConnection?: RegionConnectionResolvers<ContextType>
  RegionEdge?: RegionEdgeResolvers<ContextType>
  Role?: RoleResolvers<ContextType>
  RoleConnection?: RoleConnectionResolvers<ContextType>
  RoleEdge?: RoleEdgeResolvers<ContextType>
  ScoreSheet?: ScoreSheetResolvers<ContextType>
  User?: UserResolvers<ContextType>
  DefectScore?: DefectScoreResolvers<ContextType>
  ScoreFloat?: GraphQLScalarType
  UserInterface?: UserInterfaceResolvers<ContextType>
  Me?: MeResolvers<ContextType>
  UserConnection?: UserConnectionResolvers<ContextType>
  UserEdge?: UserEdgeResolvers<ContextType>
  Variety?: VarietyResolvers<ContextType>
  VarietyConnection?: VarietyConnectionResolvers<ContextType>
  VarietyEdge?: VarietyEdgeResolvers<ContextType>
  CoffeeView?: CoffeeViewResolvers<ContextType>
  View?: ViewResolvers<ContextType>
  ViewConnection?: ViewConnectionResolvers<ContextType>
  ViewEdge?: ViewEdgeResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

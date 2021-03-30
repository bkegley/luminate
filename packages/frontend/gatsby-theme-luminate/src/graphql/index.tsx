import {gql} from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type MutationSuccessResponse<T extends (...args: any[]) => any[]> = ThenArg<
  ReturnType<ThenArg<ReturnType<T>>[0]>
>
const defaultOptions = {}
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
  __typename: 'Account'
  id: Scalars['ID']
  name: Scalars['String']
  users?: Maybe<Array<User>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type AccountConnection = {
  __typename: 'AccountConnection'
  pageInfo: PageInfo
  edges: Array<AccountEdge>
}

export type AccountEdge = {
  __typename: 'AccountEdge'
  cursor: Scalars['String']
  node: Account
}

export type Brewer = {
  __typename: 'Brewer'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<BrewerType>
}

export type BrewerConnection = {
  __typename: 'BrewerConnection'
  pageInfo: PageInfo
  edges: Array<BrewerEdge>
}

export type BrewerEdge = {
  __typename: 'BrewerEdge'
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
  __typename: 'BrewGuide'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  recipe?: Maybe<Recipe>
}

export type BrewGuideConnection = {
  __typename: 'BrewGuideConnection'
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<BrewGuideEdge>>>
}

export type BrewGuideEdge = {
  __typename: 'BrewGuideEdge'
  cursor: Scalars['String']
  node: BrewGuide
}

export type BrewingSession = {
  __typename: 'BrewingSession'
  id: Scalars['ID']
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  brewGuide?: Maybe<BrewGuide>
}

export type BrewingSessionConnection = {
  __typename: 'BrewingSessionConnection'
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<BrewingSessionEdge>>>
}

export type BrewingSessionEdge = {
  __typename: 'BrewingSessionEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<BrewingSession>
}

export enum BurrSet {
  ConicalBurr = 'CONICAL_BURR',
  FlatBurr = 'FLAT_BURR',
  Blade = 'BLADE',
}

export type Coffee = {
  __typename: 'Coffee'
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
  __typename: 'CoffeeComponent'
  coffee: CoffeeSummary
  percentage: Scalars['Float']
}

export type CoffeeConnection = {
  __typename: 'CoffeeConnection'
  pageInfo: PageInfo
  edges: Array<CoffeeEdge>
}

export type CoffeeEdge = {
  __typename: 'CoffeeEdge'
  cursor: Scalars['String']
  node: Coffee
}

export enum CoffeeField {
  Name = 'name',
  Elevation = 'elevation',
}

export type CoffeeSummary = {
  __typename: 'CoffeeSummary'
  id: Scalars['ID']
  name: Scalars['String']
}

export type CoffeeView = {
  __typename: 'CoffeeView'
  fields?: Maybe<Array<Maybe<CoffeeField>>>
}

export type ComponentInput = {
  coffee: Scalars['ID']
  percentage: Scalars['Float']
}

export type Country = {
  __typename: 'Country'
  id: Scalars['ID']
  name: Scalars['String']
  regions?: Maybe<Array<Maybe<Region>>>
}

export type CountryConnection = {
  __typename: 'CountryConnection'
  pageInfo: PageInfo
  edges: Array<CountryEdge>
}

export type CountryEdge = {
  __typename: 'CountryEdge'
  cursor: Scalars['String']
  node: Country
}

export type CreateAccountInput = {
  name: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
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
  brewGuideId?: Maybe<Scalars['ID']>
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

export type CreateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type CreateEvaluationInput = {
  date?: Maybe<Scalars['String']>
}

export type CreateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type CreateFarmZoneInput = {
  name: Scalars['String']
}

export type CreateGrinderInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type CreatePostInput = {
  title?: Maybe<Scalars['String']>
  relations?: Maybe<Array<Maybe<EntityRelationInput>>>
  content: Scalars['String']
}

export type CreateRecipeInput = {
  name: Scalars['String']
  brewerId: Scalars['ID']
  grinderId: Scalars['ID']
  grindSetting?: Maybe<Scalars['Int']>
  note?: Maybe<Scalars['String']>
}

export type CreateRoleInput = {
  name: Scalars['String']
  scopes?: Maybe<Array<Scalars['String']>>
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

export type CreateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username: Scalars['String']
  password: Scalars['String']
  roles?: Maybe<Array<Scalars['ID']>>
}

export type CreateVarietyInput = {
  name: Scalars['String']
}

export type CreateViewInput = {
  entity: ViewEntity
  entityId: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type CuppingSession = {
  __typename: 'CuppingSession'
  id: Scalars['ID']
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  locked?: Maybe<Scalars['Boolean']>
  sessionCoffees?: Maybe<Array<Maybe<SessionCoffee>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type CuppingSessionConnection = {
  __typename: 'CuppingSessionConnection'
  pageInfo: PageInfo
  edges: Array<CuppingSessionEdge>
}

export type CuppingSessionEdge = {
  __typename: 'CuppingSessionEdge'
  cursor: Scalars['String']
  node: CuppingSession
}

export type DefectScore = {
  __typename: 'DefectScore'
  numberOfCups?: Maybe<Scalars['Int']>
  intensity?: Maybe<Scalars['Float']>
}

export type DefectScoreInput = {
  numberOfCups?: Maybe<Scalars['Int']>
  intensity?: Maybe<Scalars['Float']>
}

export type EntityRelation = {
  __typename: 'EntityRelation'
  id: Scalars['ID']
  type?: Maybe<EntityType>
  pinned?: Maybe<Scalars['Boolean']>
}

export type EntityRelationInput = {
  id: Scalars['ID']
  type: EntityType
  pinned?: Maybe<Scalars['Boolean']>
}

export enum EntityType {
  Coffee = 'Coffee',
  Country = 'Country',
  Variety = 'Variety',
}

export type Evaluation = {
  __typename: 'Evaluation'
  id: Scalars['ID']
  date?: Maybe<Scalars['String']>
}

export type EvaluationConnection = {
  __typename: 'EvaluationConnection'
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<EvaluationEdge>>>
}

export type EvaluationEdge = {
  __typename: 'EvaluationEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Evaluation>
}

export type Farm = {
  __typename: 'Farm'
  id: Scalars['ID']
  name: Scalars['String']
  country?: Maybe<Country>
  region?: Maybe<Region>
  farmZones: Array<FarmZone>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type FarmConnection = {
  __typename: 'FarmConnection'
  pageInfo: PageInfo
  edges: Array<FarmEdge>
}

export type FarmEdge = {
  __typename: 'FarmEdge'
  cursor: Scalars['String']
  node: Farm
}

export type FarmZone = {
  __typename: 'FarmZone'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Grinder = {
  __typename: 'Grinder'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type GrinderConnection = {
  __typename: 'GrinderConnection'
  pageInfo: PageInfo
  edges: Array<GrinderEdge>
}

export type GrinderEdge = {
  __typename: 'GrinderEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Grinder>
}

export type Me = UserInterface & {
  __typename: 'Me'
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

export type Mutation = {
  __typename: 'Mutation'
  createAccount?: Maybe<Account>
  updateAccount?: Maybe<Account>
  deleteAccount?: Maybe<Account>
  addUserToAccount?: Maybe<Scalars['Boolean']>
  createRole?: Maybe<Role>
  updateRole?: Maybe<Role>
  deleteRole?: Maybe<Role>
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  updateUserRoles?: Maybe<User>
  deleteUser?: Maybe<Scalars['Boolean']>
  updatePassword: Scalars['Boolean']
  login?: Maybe<Scalars['String']>
  logout: Scalars['Boolean']
  switchAccount?: Maybe<Scalars['Boolean']>
  refreshToken?: Maybe<Scalars['String']>
  updateMe?: Maybe<User>
  createCoffee?: Maybe<Coffee>
  updateCoffee?: Maybe<Coffee>
  deleteCoffee?: Maybe<Coffee>
  updateCoffeePermissionsForAccount?: Maybe<Scalars['Boolean']>
  createFarm?: Maybe<Farm>
  updateFarm?: Maybe<Farm>
  deleteFarm?: Maybe<Farm>
  createFarmZone?: Maybe<Farm>
  updateFarmZone?: Maybe<Farm>
  deleteFarmZone?: Maybe<Farm>
  createPost?: Maybe<Post>
  updatePost?: Maybe<Post>
  deletePost?: Maybe<Post>
  togglePin?: Maybe<Scalars['Boolean']>
  createVariety?: Maybe<Variety>
  updateVariety?: Maybe<Variety>
  deleteVariety?: Maybe<Variety>
  makeVarietyPublic?: Maybe<Scalars['Boolean']>
  createView?: Maybe<View>
  updateView?: Maybe<View>
  deleteView?: Maybe<Scalars['Boolean']>
  createBrewGuide?: Maybe<BrewGuide>
  updateBrewGuide?: Maybe<BrewGuide>
  deleteBrewGuide?: Maybe<Scalars['Boolean']>
  createBrewer?: Maybe<Brewer>
  updateBrewer?: Maybe<Brewer>
  deleteBrewer?: Maybe<Scalars['Boolean']>
  createBrewingSession?: Maybe<BrewingSession>
  updateBrewingSession?: Maybe<BrewingSession>
  deleteBrewingSession?: Maybe<Scalars['Boolean']>
  createCuppingSession?: Maybe<CuppingSession>
  updateCuppingSession?: Maybe<CuppingSession>
  deleteCuppingSession?: Maybe<Scalars['Boolean']>
  updateCuppingSessionCoffees?: Maybe<CuppingSession>
  lockCuppingSession?: Maybe<CuppingSession>
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

export type MutationCreateAccountArgs = {
  input: CreateAccountInput
}

export type MutationUpdateAccountArgs = {
  id: Scalars['ID']
  input: UpdateAccountInput
}

export type MutationDeleteAccountArgs = {
  id: Scalars['ID']
}

export type MutationAddUserToAccountArgs = {
  accountId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationCreateRoleArgs = {
  input: CreateRoleInput
}

export type MutationUpdateRoleArgs = {
  id: Scalars['ID']
  input: UpdateRoleInput
}

export type MutationDeleteRoleArgs = {
  id: Scalars['ID']
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  input: UpdateUserInput
}

export type MutationUpdateUserRolesArgs = {
  id: Scalars['ID']
  roles?: Maybe<Array<Scalars['ID']>>
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationUpdatePasswordArgs = {
  id: Scalars['ID']
  input: UpdatePasswordInput
}

export type MutationLoginArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type MutationSwitchAccountArgs = {
  accountId: Scalars['ID']
}

export type MutationUpdateMeArgs = {
  input?: Maybe<UpdateMeInput>
}

export type MutationCreateCoffeeArgs = {
  input: CreateCoffeeInput
}

export type MutationUpdateCoffeeArgs = {
  id: Scalars['ID']
  input: UpdateCoffeeInput
}

export type MutationDeleteCoffeeArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCoffeePermissionsForAccountArgs = {
  coffeeId: Scalars['ID']
  accountId: Scalars['ID']
  permissionTypes: Array<PermissionTypeEnum>
}

export type MutationCreateFarmArgs = {
  input: CreateFarmInput
}

export type MutationUpdateFarmArgs = {
  id: Scalars['ID']
  input: UpdateFarmInput
}

export type MutationDeleteFarmArgs = {
  id: Scalars['ID']
}

export type MutationCreateFarmZoneArgs = {
  farmId: Scalars['ID']
  input?: Maybe<CreateFarmZoneInput>
}

export type MutationUpdateFarmZoneArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateFarmZoneInput>
}

export type MutationDeleteFarmZoneArgs = {
  id: Scalars['ID']
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationUpdatePostArgs = {
  id: Scalars['ID']
  input: UpdatePostInput
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationTogglePinArgs = {
  id: Scalars['ID']
  entityId: Scalars['ID']
}

export type MutationCreateVarietyArgs = {
  input: CreateVarietyInput
}

export type MutationUpdateVarietyArgs = {
  id: Scalars['ID']
  input: UpdateVarietyInput
}

export type MutationDeleteVarietyArgs = {
  id: Scalars['ID']
}

export type MutationMakeVarietyPublicArgs = {
  id: Scalars['ID']
}

export type MutationCreateViewArgs = {
  input: CreateViewInput
}

export type MutationUpdateViewArgs = {
  id: Scalars['ID']
  input: UpdateViewInput
}

export type MutationDeleteViewArgs = {
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
  Contains = 'contains',
  ContainsSensitive = 'containsSensitive',
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
}

export type PageInfo = {
  __typename: 'PageInfo'
  hasNextPage?: Maybe<Scalars['Boolean']>
  nextCursor?: Maybe<Scalars['String']>
  prevCursor?: Maybe<Scalars['String']>
}

export enum PermissionTypeEnum {
  Read = 'read',
  Write = 'write',
  Admin = 'admin',
}

export type Post = {
  __typename: 'Post'
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

export type PostConnection = {
  __typename: 'PostConnection'
  pageInfo: PageInfo
  edges: Array<PostEdge>
}

export type PostEdge = {
  __typename: 'PostEdge'
  node: Post
  cursor: Scalars['String']
}

export type Query = {
  __typename: 'Query'
  listAccounts: AccountConnection
  getAccount?: Maybe<Account>
  listRoles: RoleConnection
  getRole?: Maybe<Role>
  listUsers: UserConnection
  getUser?: Maybe<User>
  me?: Maybe<Me>
  listCoffees: CoffeeConnection
  getCoffee?: Maybe<Coffee>
  listCountries: CountryConnection
  getCountry?: Maybe<Country>
  listFarms: FarmConnection
  getFarm?: Maybe<Farm>
  listPosts: PostConnection
  getEntityPosts: PostConnection
  getPost?: Maybe<Post>
  listRegions: RegionConnection
  getRegion?: Maybe<Region>
  listVarieties: VarietyConnection
  getVariety?: Maybe<Variety>
  listViews?: Maybe<ViewConnection>
  getView?: Maybe<View>
  listBrewGuides: BrewGuideConnection
  getBrewGuide?: Maybe<BrewGuide>
  listBrewers: BrewerConnection
  getBrewer?: Maybe<Brewer>
  listBrewingSessions?: Maybe<BrewingSessionConnection>
  getBrewingSession?: Maybe<BrewingSession>
  listCuppingSessions: CuppingSessionConnection
  getCuppingSession?: Maybe<CuppingSession>
  getCuppingSessionCoffee?: Maybe<SessionCoffee>
  listEvaluations?: Maybe<EvaluationConnection>
  getEvaluation?: Maybe<Evaluation>
  listGrinders: GrinderConnection
  getGrinder?: Maybe<Grinder>
  listRecipes: RecipeConnection
  getRecipe?: Maybe<Recipe>
  listScoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
  getScoreSheet?: Maybe<ScoreSheet>
}

export type QueryListAccountsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetAccountArgs = {
  id: Scalars['ID']
}

export type QueryListRolesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetRoleArgs = {
  id: Scalars['ID']
}

export type QueryListUsersArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetUserArgs = {
  id: Scalars['ID']
}

export type QueryListCoffeesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryListCountriesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetCountryArgs = {
  id: Scalars['ID']
}

export type QueryListFarmsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetFarmArgs = {
  id: Scalars['ID']
}

export type QueryListPostsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetEntityPostsArgs = {
  id: Scalars['ID']
}

export type QueryGetPostArgs = {
  id: Scalars['ID']
}

export type QueryListRegionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetRegionArgs = {
  id: Scalars['ID']
}

export type QueryListVarietiesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetVarietyArgs = {
  id: Scalars['ID']
}

export type QueryListViewsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetViewArgs = {
  id: Scalars['ID']
}

export type QueryGetBrewGuideArgs = {
  id: Scalars['ID']
}

export type QueryListBrewersArgs = {
  limit?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
}

export type QueryGetBrewerArgs = {
  id: Scalars['ID']
}

export type QueryGetBrewingSessionArgs = {
  id: Scalars['ID']
}

export type QueryListCuppingSessionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
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

export type QueryListScoreSheetsArgs = {
  sessionCoffeeId: Scalars['ID']
}

export type QueryGetScoreSheetArgs = {
  sessionCoffeeId: Scalars['ID']
  scoreSheetId: Scalars['ID']
}

export type QueryInput = {
  field: Scalars['String']
  operator?: Maybe<OperatorEnum>
  value?: Maybe<Scalars['String']>
}

export type Recipe = {
  __typename: 'Recipe'
  id: Scalars['ID']
  name: Scalars['String']
  grinder: Grinder
  grindSetting?: Maybe<Scalars['Int']>
  brewer: Brewer
  note?: Maybe<Scalars['String']>
}

export type RecipeConnection = {
  __typename: 'RecipeConnection'
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<RecipeEdge>>>
}

export type RecipeEdge = {
  __typename: 'RecipeEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Recipe>
}

export type Region = {
  __typename: 'Region'
  id: Scalars['ID']
  name: Scalars['String']
  country?: Maybe<Country>
  farms?: Maybe<Array<Maybe<Farm>>>
}

export type RegionConnection = {
  __typename: 'RegionConnection'
  pageInfo: PageInfo
  edges: Array<RegionEdge>
}

export type RegionEdge = {
  __typename: 'RegionEdge'
  cursor: Scalars['String']
  node: Region
}

export type Role = {
  __typename: 'Role'
  id: Scalars['ID']
  name: Scalars['String']
  scopes: Array<Scalars['String']>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type RoleConnection = {
  __typename: 'RoleConnection'
  pageInfo: PageInfo
  edges: Array<RoleEdge>
}

export type RoleEdge = {
  __typename: 'RoleEdge'
  cursor: Scalars['String']
  node: Role
}

export type ScoreSheet = {
  __typename: 'ScoreSheet'
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
  __typename: 'SessionCoffee'
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

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type UpdateAccountInput = {
  name?: Maybe<Scalars['String']>
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
  brewGuideId?: Maybe<Scalars['ID']>
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

export type UpdateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type UpdateEvaluationInput = {
  date?: Maybe<Scalars['String']>
}

export type UpdateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type UpdateFarmZoneInput = {
  name: Scalars['String']
}

export type UpdateGrinderInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  burrSet?: Maybe<BurrSet>
}

export type UpdateMeInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  theme?: Maybe<Theme>
}

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>
  relations?: Maybe<Array<Maybe<EntityRelationInput>>>
  content: Scalars['String']
}

export type UpdateRecipeInput = {
  name: Scalars['String']
  brewerId: Scalars['ID']
  grinderId: Scalars['ID']
  grindSetting?: Maybe<Scalars['Int']>
  note?: Maybe<Scalars['String']>
}

export type UpdateRoleInput = {
  name?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['String']>>
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

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdateVarietyInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateViewInput = {
  name?: Maybe<Scalars['String']>
}

export type User = UserInterface & {
  __typename: 'User'
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

export type UserConnection = {
  __typename: 'UserConnection'
  pageInfo: PageInfo
  edges: Array<UserEdge>
}

export type UserEdge = {
  __typename: 'UserEdge'
  cursor: Scalars['String']
  node: User
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

export type Variety = {
  __typename: 'Variety'
  id: Scalars['ID']
  name: Scalars['String']
  background?: Maybe<Scalars['String']>
  coffees?: Maybe<Array<Maybe<Coffee>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type VarietyConnection = {
  __typename: 'VarietyConnection'
  pageInfo: PageInfo
  edges: Array<VarietyEdge>
}

export type VarietyEdge = {
  __typename: 'VarietyEdge'
  cursor: Scalars['String']
  node: Variety
}

export type View = {
  __typename: 'View'
  id: Scalars['ID']
}

export type ViewConnection = {
  __typename: 'ViewConnection'
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ViewEdge>>>
}

export type ViewEdge = {
  __typename: 'ViewEdge'
  node?: Maybe<View>
  cursor: Scalars['String']
}

export enum ViewEntity {
  Coffee = 'Coffee',
}

export type SwitchAccountMutationVariables = Exact<{
  accountId: Scalars['ID']
}>

export type SwitchAccountMutation = {__typename: 'Mutation'} & Pick<Mutation, 'switchAccount'>

export type MeQueryVariables = Exact<{[key: string]: never}>

export type MeQuery = {__typename: 'Query'} & {me?: Maybe<{__typename: 'Me'} & UserFragmentFragment>}

export type RefreshTokenMutationVariables = Exact<{[key: string]: never}>

export type RefreshTokenMutation = {__typename: 'Mutation'} & Pick<Mutation, 'refreshToken'>

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {__typename: 'Mutation'} & Pick<Mutation, 'login'>

export type LogoutMutationVariables = Exact<{[key: string]: never}>

export type LogoutMutation = {__typename: 'Mutation'} & Pick<Mutation, 'logout'>

export type UserFragmentFragment = {__typename: 'Me'} & Pick<
  Me,
  'id' | 'username' | 'firstName' | 'lastName' | 'scopes' | 'theme'
> & {
    account?: Maybe<{__typename: 'Account'} & Pick<Account, 'id' | 'name'>>
    accounts: Array<{__typename: 'Account'} & Pick<Account, 'id' | 'name'>>
    roles: Array<{__typename: 'Role'} & Pick<Role, 'id' | 'name'>>
  }

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on Me {
    id
    username
    firstName
    lastName
    account {
      id
      name
    }
    accounts {
      id
      name
    }
    roles {
      id
      name
    }
    scopes
    theme
  }
`
export const SwitchAccountDocument = gql`
  mutation SwitchAccount($accountId: ID!) {
    switchAccount(accountId: $accountId)
  }
`
export type SwitchAccountMutationFn = Apollo.MutationFunction<SwitchAccountMutation, SwitchAccountMutationVariables>

/**
 * __useSwitchAccountMutation__
 *
 * To run a mutation, you first call `useSwitchAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchAccountMutation, { data, loading, error }] = useSwitchAccountMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useSwitchAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<SwitchAccountMutation, SwitchAccountMutationVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<SwitchAccountMutation, SwitchAccountMutationVariables>(SwitchAccountDocument, options)
}
export type SwitchAccountMutationHookResult = ReturnType<typeof useSwitchAccountMutation>
export type SwitchAccountMutationResult = Apollo.MutationResult<SwitchAccountMutation>
export type SwitchAccountMutationOptions = Apollo.BaseMutationOptions<
  SwitchAccountMutation,
  SwitchAccountMutationVariables
>
export const MeDocument = gql`
  query me {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`

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
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const RefreshTokenDocument = gql`
  mutation refreshToken {
    refreshToken
  }
`
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options)
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

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
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>

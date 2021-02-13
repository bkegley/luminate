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
  notes?: Maybe<Array<Maybe<Note>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type CoffeeNotesArgs = {
  fields?: Maybe<Array<Maybe<Scalars['String']>>>
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

export type CoffeeSummary = {
  __typename: 'CoffeeSummary'
  id: Scalars['ID']
  name: Scalars['String']
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

export type CreateNoteInput = {
  entityId: Scalars['ID']
  content: Scalars['String']
  field: Scalars['String']
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
  createNote?: Maybe<Note>
  updateNote?: Maybe<Note>
  deleteNote?: Maybe<Note>
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
  createVariety?: Maybe<Variety>
  updateVariety?: Maybe<Variety>
  deleteVariety?: Maybe<Variety>
  makeVarietyPublic?: Maybe<Scalars['Boolean']>
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

export type MutationCreateNoteArgs = {
  input?: Maybe<CreateNoteInput>
}

export type MutationUpdateNoteArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateNoteInput>
}

export type MutationDeleteNoteArgs = {
  id: Scalars['ID']
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

export type Note = {
  __typename: 'Note'
  id: Scalars['ID']
  content: Scalars['String']
  field: Scalars['String']
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
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
  listRegions: RegionConnection
  getRegion?: Maybe<Region>
  listVarieties: VarietyConnection
  getVariety?: Maybe<Variety>
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

export type UpdateNoteInput = {
  entityId?: Maybe<Scalars['ID']>
  content?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
}

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
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

export type User = UserInterface & {
  __typename: 'User'
  id: Scalars['ID']
  username: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  accounts: Array<Account>
  roles: Array<Role>
  scopes: Array<Scalars['String']>
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

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput
}>

export type CreateAccountMutation = {__typename: 'Mutation'} & {
  createAccount?: Maybe<{__typename: 'Account'} & Pick<Account, 'id' | 'name'>>
}

export type AddUserToAccountMutationVariables = Exact<{
  accountId: Scalars['ID']
  userId: Scalars['ID']
}>

export type AddUserToAccountMutation = {__typename: 'Mutation'} & Pick<Mutation, 'addUserToAccount'>

export type ListBrewersQueryVariables = Exact<{[key: string]: never}>

export type ListBrewersQuery = {__typename: 'Query'} & {
  listBrewers: {__typename: 'BrewerConnection'} & {
    pageInfo: {__typename: 'PageInfo'} & Pick<PageInfo, 'hasNextPage' | 'nextCursor' | 'prevCursor'>
    edges: Array<{__typename: 'BrewerEdge'} & {node?: Maybe<{__typename: 'Brewer'} & BrewerFragmentFragment>}>
  }
}

export type GetBrewerQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetBrewerQuery = {__typename: 'Query'} & {
  getBrewer?: Maybe<{__typename: 'Brewer'} & BrewerFragmentFragment>
}

export type CreateBrewerMutationVariables = Exact<{
  input: CreateBrewerInput
}>

export type CreateBrewerMutation = {__typename: 'Mutation'} & {
  createBrewer?: Maybe<{__typename: 'Brewer'} & BrewerFragmentFragment>
}

export type UpdateBrewerMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateBrewerInput
}>

export type UpdateBrewerMutation = {__typename: 'Mutation'} & {
  updateBrewer?: Maybe<{__typename: 'Brewer'} & BrewerFragmentFragment>
}

export type BrewerFragmentFragment = {__typename: 'Brewer'} & Pick<Brewer, 'id' | 'name' | 'description' | 'type'>

export type ListCoffeesQueryVariables = Exact<{[key: string]: never}>

export type ListCoffeesQuery = {__typename: 'Query'} & {
  listCoffees: {__typename: 'CoffeeConnection'} & {
    edges: Array<{__typename: 'CoffeeEdge'} & {node: {__typename: 'Coffee'} & Pick<Coffee, 'id' | 'name'>}>
  }
}

export type ListCoffeesTableQueryVariables = Exact<{[key: string]: never}>

export type ListCoffeesTableQuery = {__typename: 'Query'} & {
  listCoffees: {__typename: 'CoffeeConnection'} & {
    edges: Array<
      {__typename: 'CoffeeEdge'} & {
        node: {__typename: 'Coffee'} & Pick<Coffee, 'id' | 'name' | 'createdAt' | 'updatedAt'> & {
            country?: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
          }
      }
    >
  }
}

export type GetCoffeeQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetCoffeeQuery = {__typename: 'Query'} & {
  getCoffee?: Maybe<{__typename: 'Coffee'} & CoffeeFragmentFragment>
}

export type CreateCoffeeMutationVariables = Exact<{
  input: CreateCoffeeInput
}>

export type CreateCoffeeMutation = {__typename: 'Mutation'} & {
  createCoffee?: Maybe<{__typename: 'Coffee'} & CoffeeFragmentFragment>
}

export type UpdateCoffeeMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateCoffeeInput
}>

export type UpdateCoffeeMutation = {__typename: 'Mutation'} & {
  updateCoffee?: Maybe<{__typename: 'Coffee'} & CoffeeFragmentFragment>
}

export type DeleteCoffeeMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteCoffeeMutation = {__typename: 'Mutation'} & {
  deleteCoffee?: Maybe<{__typename: 'Coffee'} & Pick<Coffee, 'id'>>
}

export type UpdateCoffeePermissionsMutationVariables = Exact<{
  coffeeId: Scalars['ID']
  accountId: Scalars['ID']
  permissionTypes: Array<PermissionTypeEnum> | PermissionTypeEnum
}>

export type UpdateCoffeePermissionsMutation = {__typename: 'Mutation'} & Pick<
  Mutation,
  'updateCoffeePermissionsForAccount'
>

export type CoffeeFragmentFragment = {__typename: 'Coffee'} & Pick<
  Coffee,
  'id' | 'name' | 'elevation' | 'createdAt' | 'updatedAt'
> & {
    country?: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
    region?: Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>
    varieties: Array<{__typename: 'Variety'} & Pick<Variety, 'id' | 'name'>>
  }

export type ListCountriesQueryVariables = Exact<{[key: string]: never}>

export type ListCountriesQuery = {__typename: 'Query'} & {
  listCountries: {__typename: 'CountryConnection'} & {
    edges: Array<{__typename: 'CountryEdge'} & {node: {__typename: 'Country'} & Pick<Country, 'id' | 'name'>}>
  }
}

export type ListCountriesTableQueryVariables = Exact<{[key: string]: never}>

export type ListCountriesTableQuery = {__typename: 'Query'} & {
  listCountries: {__typename: 'CountryConnection'} & {
    edges: Array<{__typename: 'CountryEdge'} & {node: {__typename: 'Country'} & Pick<Country, 'id' | 'name'>}>
  }
}

export type ListAllCountriesQueryVariables = Exact<{[key: string]: never}>

export type ListAllCountriesQuery = {__typename: 'Query'} & {
  listCountries: {__typename: 'CountryConnection'} & {
    edges: Array<{__typename: 'CountryEdge'} & {node: {__typename: 'Country'} & Pick<Country, 'id' | 'name'>}>
  }
}

export type GetCountryQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetCountryQuery = {__typename: 'Query'} & {
  getCountry?: Maybe<{__typename: 'Country'} & CountryFragmentFragment>
}

export type CountryFragmentFragment = {__typename: 'Country'} & Pick<Country, 'id' | 'name'> & {
    regions?: Maybe<Array<Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>>>
  }

export type ListCuppingSessionsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
}>

export type ListCuppingSessionsQuery = {__typename: 'Query'} & {
  listCuppingSessions: {__typename: 'CuppingSessionConnection'} & {
    edges: Array<
      {__typename: 'CuppingSessionEdge'} & {
        node: {__typename: 'CuppingSession'} & Pick<
          CuppingSession,
          'id' | 'description' | 'internalId' | 'locked' | 'createdAt' | 'updatedAt'
        >
      }
    >
  }
}

export type GetCuppingSessionQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetCuppingSessionQuery = {__typename: 'Query'} & {
  getCuppingSession?: Maybe<{__typename: 'CuppingSession'} & CupppingSessionFragmentFragment>
}

export type GetCuppingSessionWithScoreSheetsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetCuppingSessionWithScoreSheetsQuery = {__typename: 'Query'} & {
  getCuppingSession?: Maybe<{__typename: 'CuppingSession'} & CuppingSessionWithScoreSheetsFragmentFragment>
}

export type GetCuppingSessionCoffeeQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetCuppingSessionCoffeeQuery = {__typename: 'Query'} & {
  getCuppingSessionCoffee?: Maybe<{__typename: 'SessionCoffee'} & SessionCoffeeWithScoreSheetsFragmentFragment>
}

export type GetScoreSheetQueryVariables = Exact<{
  sessionCoffeeId: Scalars['ID']
  scoreSheetId: Scalars['ID']
}>

export type GetScoreSheetQuery = {__typename: 'Query'} & {
  getScoreSheet?: Maybe<{__typename: 'ScoreSheet'} & ScoreSheetFragmentFragment>
}

export type CreateCuppingSessionMutationVariables = Exact<{
  input: CreateCuppingSessionInput
}>

export type CreateCuppingSessionMutation = {__typename: 'Mutation'} & {
  createCuppingSession?: Maybe<{__typename: 'CuppingSession'} & CupppingSessionFragmentFragment>
}

export type UpdateCuppingSessionMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateCuppingSessionInput
}>

export type UpdateCuppingSessionMutation = {__typename: 'Mutation'} & {
  updateCuppingSession?: Maybe<{__typename: 'CuppingSession'} & CupppingSessionFragmentFragment>
}

export type UpdateCuppingSessionCoffeesMutationVariables = Exact<{
  id: Scalars['ID']
  sessionCoffees: Array<SessionCoffeeInput> | SessionCoffeeInput
}>

export type UpdateCuppingSessionCoffeesMutation = {__typename: 'Mutation'} & {
  updateCuppingSessionCoffees?: Maybe<{__typename: 'CuppingSession'} & CupppingSessionFragmentFragment>
}

export type LockCuppingSessionMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type LockCuppingSessionMutation = {__typename: 'Mutation'} & {
  lockCuppingSession?: Maybe<{__typename: 'CuppingSession'} & CupppingSessionFragmentFragment>
}

export type DeleteCuppingSessionMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteCuppingSessionMutation = {__typename: 'Mutation'} & Pick<Mutation, 'deleteCuppingSession'>

export type CreateScoreSheetMutationVariables = Exact<{
  sessionCoffeeId: Scalars['ID']
  input: CreateScoreSheetInput
}>

export type CreateScoreSheetMutation = {__typename: 'Mutation'} & {
  createScoreSheet?: Maybe<{__typename: 'ScoreSheet'} & ScoreSheetFragmentFragment>
}

export type UpdateScoreSheetMutationVariables = Exact<{
  scoreSheetId: Scalars['ID']
  sessionCoffeeId: Scalars['ID']
  input: UpdateScoreSheetInput
}>

export type UpdateScoreSheetMutation = {__typename: 'Mutation'} & {
  updateScoreSheet?: Maybe<{__typename: 'ScoreSheet'} & ScoreSheetFragmentFragment>
}

export type CupppingSessionFragmentFragment = {__typename: 'CuppingSession'} & Pick<
  CuppingSession,
  'id' | 'description' | 'internalId' | 'locked' | 'createdAt' | 'updatedAt'
> & {sessionCoffees?: Maybe<Array<Maybe<{__typename: 'SessionCoffee'} & SessionCoffeeFragmentFragment>>>}

export type CuppingSessionWithScoreSheetsFragmentFragment = {__typename: 'CuppingSession'} & Pick<
  CuppingSession,
  'id' | 'description' | 'internalId' | 'locked' | 'createdAt' | 'updatedAt'
> & {sessionCoffees?: Maybe<Array<Maybe<{__typename: 'SessionCoffee'} & SessionCoffeeWithScoreSheetsFragmentFragment>>>}

export type SessionCoffeeWithScoreSheetsFragmentFragment = {__typename: 'SessionCoffee'} & Pick<
  SessionCoffee,
  'id' | 'sampleNumber' | 'averageScore'
> & {
    coffee: {__typename: 'Coffee'} & Pick<Coffee, 'id' | 'name'>
    scoreSheets?: Maybe<Array<Maybe<{__typename: 'ScoreSheet'} & ScoreSheetFragmentFragment>>>
  }

export type SessionCoffeeFragmentFragment = {__typename: 'SessionCoffee'} & Pick<
  SessionCoffee,
  'id' | 'sampleNumber'
> & {coffee: {__typename: 'Coffee'} & Pick<Coffee, 'id' | 'name'>}

export type ScoreSheetFragmentFragment = {__typename: 'ScoreSheet'} & Pick<
  ScoreSheet,
  | 'id'
  | 'totalScore'
  | 'fragranceAroma'
  | 'flavor'
  | 'aftertaste'
  | 'acidity'
  | 'body'
  | 'uniformity'
  | 'cleanCup'
  | 'balance'
  | 'sweetness'
  | 'overall'
> & {
    user?: Maybe<{__typename: 'User'} & Pick<User, 'id' | 'username'>>
    taints?: Maybe<{__typename: 'DefectScore'} & Pick<DefectScore, 'numberOfCups' | 'intensity'>>
    defects?: Maybe<{__typename: 'DefectScore'} & Pick<DefectScore, 'numberOfCups' | 'intensity'>>
  }

export type ListFarmsQueryVariables = Exact<{[key: string]: never}>

export type ListFarmsQuery = {__typename: 'Query'} & {
  listFarms: {__typename: 'FarmConnection'} & {
    edges: Array<{__typename: 'FarmEdge'} & {node: {__typename: 'Farm'} & Pick<Farm, 'id' | 'name'>}>
  }
}

export type ListFarmsTableQueryVariables = Exact<{[key: string]: never}>

export type ListFarmsTableQuery = {__typename: 'Query'} & {
  listFarms: {__typename: 'FarmConnection'} & {
    edges: Array<
      {__typename: 'FarmEdge'} & {
        node: {__typename: 'Farm'} & Pick<Farm, 'id' | 'name' | 'createdAt' | 'updatedAt'> & {
            country?: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
          }
      }
    >
  }
}

export type GetFarmQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetFarmQuery = {__typename: 'Query'} & {getFarm?: Maybe<{__typename: 'Farm'} & FarmFragmentFragment>}

export type CreateFarmMutationVariables = Exact<{
  input: CreateFarmInput
}>

export type CreateFarmMutation = {__typename: 'Mutation'} & {
  createFarm?: Maybe<{__typename: 'Farm'} & FarmFragmentFragment>
}

export type UpdateFarmMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateFarmInput
}>

export type UpdateFarmMutation = {__typename: 'Mutation'} & {
  updateFarm?: Maybe<{__typename: 'Farm'} & FarmFragmentFragment>
}

export type DeleteFarmMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteFarmMutation = {__typename: 'Mutation'} & {
  deleteFarm?: Maybe<{__typename: 'Farm'} & Pick<Farm, 'id'>>
}

export type FarmFragmentFragment = {__typename: 'Farm'} & Pick<Farm, 'id' | 'name' | 'createdAt' | 'updatedAt'> & {
    country?: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
    region?: Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>
    farmZones: Array<{__typename: 'FarmZone'} & Pick<FarmZone, 'id' | 'name'>>
  }

export type ListRegionsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput> | QueryInput>
}>

export type ListRegionsQuery = {__typename: 'Query'} & {
  listRegions: {__typename: 'RegionConnection'} & {
    edges: Array<{__typename: 'RegionEdge'} & {node: {__typename: 'Region'} & Pick<Region, 'id' | 'name'>}>
  }
}

export type ListRegionsTableQueryVariables = Exact<{[key: string]: never}>

export type ListRegionsTableQuery = {__typename: 'Query'} & {
  listRegions: {__typename: 'RegionConnection'} & {
    edges: Array<
      {__typename: 'RegionEdge'} & {
        node: {__typename: 'Region'} & Pick<Region, 'id' | 'name'> & {
            country?: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
          }
      }
    >
  }
}

export type GetRegionQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetRegionQuery = {__typename: 'Query'} & {
  getRegion?: Maybe<{__typename: 'Region'} & RegionFragmentFragment>
}

export type RegionFragmentFragment = {__typename: 'Region'} & Pick<Region, 'id' | 'name'> & {
    country?: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
    farms?: Maybe<Array<Maybe<{__typename: 'Farm'} & Pick<Farm, 'id' | 'name'>>>>
  }

export type UserSearchQueryVariables = Exact<{
  searchText?: Maybe<Scalars['String']>
}>

export type UserSearchQuery = {__typename: 'Query'} & {
  listUsers: {__typename: 'UserConnection'} & {
    edges: Array<{__typename: 'UserEdge'} & {node: {__typename: 'User'} & Pick<User, 'id' | 'username'>}>
  }
}

export type ListVarietiesQueryVariables = Exact<{[key: string]: never}>

export type ListVarietiesQuery = {__typename: 'Query'} & {
  listVarieties: {__typename: 'VarietyConnection'} & {
    edges: Array<{__typename: 'VarietyEdge'} & {node: {__typename: 'Variety'} & Pick<Variety, 'id' | 'name'>}>
  }
}

export type ListVarietiesTableQueryVariables = Exact<{[key: string]: never}>

export type ListVarietiesTableQuery = {__typename: 'Query'} & {
  listVarieties: {__typename: 'VarietyConnection'} & {
    edges: Array<
      {__typename: 'VarietyEdge'} & {
        node: {__typename: 'Variety'} & Pick<Variety, 'id' | 'name' | 'createdAt' | 'updatedAt'>
      }
    >
  }
}

export type GetVarietyQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetVarietyQuery = {__typename: 'Query'} & {
  getVariety?: Maybe<{__typename: 'Variety'} & VarietyFragmentFragment>
}

export type CreateVarietyMutationVariables = Exact<{
  input: CreateVarietyInput
}>

export type CreateVarietyMutation = {__typename: 'Mutation'} & {
  createVariety?: Maybe<{__typename: 'Variety'} & VarietyFragmentFragment>
}

export type UpdateVarietyMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateVarietyInput
}>

export type UpdateVarietyMutation = {__typename: 'Mutation'} & {
  updateVariety?: Maybe<{__typename: 'Variety'} & VarietyFragmentFragment>
}

export type DeleteVarietyMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteVarietyMutation = {__typename: 'Mutation'} & {
  deleteVariety?: Maybe<{__typename: 'Variety'} & Pick<Variety, 'id'>>
}

export type VarietyFragmentFragment = {__typename: 'Variety'} & Pick<
  Variety,
  'id' | 'name' | 'background' | 'createdAt' | 'updatedAt'
> & {coffees?: Maybe<Array<Maybe<{__typename: 'Coffee'} & Pick<Coffee, 'id' | 'name'>>>>}

export const BrewerFragmentFragmentDoc = gql`
  fragment BrewerFragment on Brewer {
    id
    name
    description
    type
  }
`
export const CoffeeFragmentFragmentDoc = gql`
  fragment CoffeeFragment on Coffee {
    id
    name
    country {
      id
      name
    }
    region {
      id
      name
    }
    varieties {
      id
      name
    }
    elevation
    createdAt
    updatedAt
  }
`
export const CountryFragmentFragmentDoc = gql`
  fragment CountryFragment on Country {
    id
    name
    regions {
      id
      name
    }
  }
`
export const SessionCoffeeFragmentFragmentDoc = gql`
  fragment SessionCoffeeFragment on SessionCoffee {
    id
    sampleNumber
    coffee {
      id
      name
    }
  }
`
export const CupppingSessionFragmentFragmentDoc = gql`
  fragment CupppingSessionFragment on CuppingSession {
    id
    description
    internalId
    locked
    sessionCoffees {
      ...SessionCoffeeFragment
    }
    createdAt
    updatedAt
  }
  ${SessionCoffeeFragmentFragmentDoc}
`
export const ScoreSheetFragmentFragmentDoc = gql`
  fragment ScoreSheetFragment on ScoreSheet {
    id
    user {
      id
      username
    }
    totalScore
    fragranceAroma
    flavor
    aftertaste
    acidity
    body
    uniformity
    cleanCup
    balance
    sweetness
    overall
    taints {
      numberOfCups
      intensity
    }
    defects {
      numberOfCups
      intensity
    }
  }
`
export const SessionCoffeeWithScoreSheetsFragmentFragmentDoc = gql`
  fragment SessionCoffeeWithScoreSheetsFragment on SessionCoffee {
    id
    sampleNumber
    coffee {
      id
      name
    }
    averageScore
    scoreSheets {
      ...ScoreSheetFragment
    }
  }
  ${ScoreSheetFragmentFragmentDoc}
`
export const CuppingSessionWithScoreSheetsFragmentFragmentDoc = gql`
  fragment CuppingSessionWithScoreSheetsFragment on CuppingSession {
    id
    description
    internalId
    locked
    sessionCoffees {
      ...SessionCoffeeWithScoreSheetsFragment
    }
    createdAt
    updatedAt
  }
  ${SessionCoffeeWithScoreSheetsFragmentFragmentDoc}
`
export const FarmFragmentFragmentDoc = gql`
  fragment FarmFragment on Farm {
    id
    name
    country {
      id
      name
    }
    region {
      id
      name
    }
    farmZones {
      id
      name
    }
    createdAt
    updatedAt
  }
`
export const RegionFragmentFragmentDoc = gql`
  fragment RegionFragment on Region {
    id
    name
    country {
      id
      name
    }
    farms {
      id
      name
    }
  }
`
export const VarietyFragmentFragmentDoc = gql`
  fragment VarietyFragment on Variety {
    id
    name
    background
    coffees {
      id
      name
    }
    createdAt
    updatedAt
  }
`
export const CreateAccountDocument = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
      name
    }
  }
`
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>,
) {
  return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, baseOptions)
}
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<
  CreateAccountMutation,
  CreateAccountMutationVariables
>
export const AddUserToAccountDocument = gql`
  mutation AddUserToAccount($accountId: ID!, $userId: ID!) {
    addUserToAccount(accountId: $accountId, userId: $userId)
  }
`
export type AddUserToAccountMutationFn = Apollo.MutationFunction<
  AddUserToAccountMutation,
  AddUserToAccountMutationVariables
>

/**
 * __useAddUserToAccountMutation__
 *
 * To run a mutation, you first call `useAddUserToAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToAccountMutation, { data, loading, error }] = useAddUserToAccountMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddUserToAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<AddUserToAccountMutation, AddUserToAccountMutationVariables>,
) {
  return Apollo.useMutation<AddUserToAccountMutation, AddUserToAccountMutationVariables>(
    AddUserToAccountDocument,
    baseOptions,
  )
}
export type AddUserToAccountMutationHookResult = ReturnType<typeof useAddUserToAccountMutation>
export type AddUserToAccountMutationResult = Apollo.MutationResult<AddUserToAccountMutation>
export type AddUserToAccountMutationOptions = Apollo.BaseMutationOptions<
  AddUserToAccountMutation,
  AddUserToAccountMutationVariables
>
export const ListBrewersDocument = gql`
  query ListBrewers {
    listBrewers {
      pageInfo {
        hasNextPage
        nextCursor
        prevCursor
      }
      edges {
        node {
          ...BrewerFragment
        }
      }
    }
  }
  ${BrewerFragmentFragmentDoc}
`

/**
 * __useListBrewersQuery__
 *
 * To run a query within a React component, call `useListBrewersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBrewersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBrewersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListBrewersQuery(
  baseOptions?: Apollo.QueryHookOptions<ListBrewersQuery, ListBrewersQueryVariables>,
) {
  return Apollo.useQuery<ListBrewersQuery, ListBrewersQueryVariables>(ListBrewersDocument, baseOptions)
}
export function useListBrewersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListBrewersQuery, ListBrewersQueryVariables>,
) {
  return Apollo.useLazyQuery<ListBrewersQuery, ListBrewersQueryVariables>(ListBrewersDocument, baseOptions)
}
export type ListBrewersQueryHookResult = ReturnType<typeof useListBrewersQuery>
export type ListBrewersLazyQueryHookResult = ReturnType<typeof useListBrewersLazyQuery>
export type ListBrewersQueryResult = Apollo.QueryResult<ListBrewersQuery, ListBrewersQueryVariables>
export const GetBrewerDocument = gql`
  query GetBrewer($id: ID!) {
    getBrewer(id: $id) {
      ...BrewerFragment
    }
  }
  ${BrewerFragmentFragmentDoc}
`

/**
 * __useGetBrewerQuery__
 *
 * To run a query within a React component, call `useGetBrewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrewerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrewerQuery(baseOptions: Apollo.QueryHookOptions<GetBrewerQuery, GetBrewerQueryVariables>) {
  return Apollo.useQuery<GetBrewerQuery, GetBrewerQueryVariables>(GetBrewerDocument, baseOptions)
}
export function useGetBrewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBrewerQuery, GetBrewerQueryVariables>,
) {
  return Apollo.useLazyQuery<GetBrewerQuery, GetBrewerQueryVariables>(GetBrewerDocument, baseOptions)
}
export type GetBrewerQueryHookResult = ReturnType<typeof useGetBrewerQuery>
export type GetBrewerLazyQueryHookResult = ReturnType<typeof useGetBrewerLazyQuery>
export type GetBrewerQueryResult = Apollo.QueryResult<GetBrewerQuery, GetBrewerQueryVariables>
export const CreateBrewerDocument = gql`
  mutation CreateBrewer($input: CreateBrewerInput!) {
    createBrewer(input: $input) {
      ...BrewerFragment
    }
  }
  ${BrewerFragmentFragmentDoc}
`
export type CreateBrewerMutationFn = Apollo.MutationFunction<CreateBrewerMutation, CreateBrewerMutationVariables>

/**
 * __useCreateBrewerMutation__
 *
 * To run a mutation, you first call `useCreateBrewerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrewerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBrewerMutation, { data, loading, error }] = useCreateBrewerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBrewerMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBrewerMutation, CreateBrewerMutationVariables>,
) {
  return Apollo.useMutation<CreateBrewerMutation, CreateBrewerMutationVariables>(CreateBrewerDocument, baseOptions)
}
export type CreateBrewerMutationHookResult = ReturnType<typeof useCreateBrewerMutation>
export type CreateBrewerMutationResult = Apollo.MutationResult<CreateBrewerMutation>
export type CreateBrewerMutationOptions = Apollo.BaseMutationOptions<
  CreateBrewerMutation,
  CreateBrewerMutationVariables
>
export const UpdateBrewerDocument = gql`
  mutation UpdateBrewer($id: ID!, $input: UpdateBrewerInput!) {
    updateBrewer(id: $id, input: $input) {
      ...BrewerFragment
    }
  }
  ${BrewerFragmentFragmentDoc}
`
export type UpdateBrewerMutationFn = Apollo.MutationFunction<UpdateBrewerMutation, UpdateBrewerMutationVariables>

/**
 * __useUpdateBrewerMutation__
 *
 * To run a mutation, you first call `useUpdateBrewerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrewerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrewerMutation, { data, loading, error }] = useUpdateBrewerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBrewerMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBrewerMutation, UpdateBrewerMutationVariables>,
) {
  return Apollo.useMutation<UpdateBrewerMutation, UpdateBrewerMutationVariables>(UpdateBrewerDocument, baseOptions)
}
export type UpdateBrewerMutationHookResult = ReturnType<typeof useUpdateBrewerMutation>
export type UpdateBrewerMutationResult = Apollo.MutationResult<UpdateBrewerMutation>
export type UpdateBrewerMutationOptions = Apollo.BaseMutationOptions<
  UpdateBrewerMutation,
  UpdateBrewerMutationVariables
>
export const ListCoffeesDocument = gql`
  query ListCoffees {
    listCoffees {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListCoffeesQuery__
 *
 * To run a query within a React component, call `useListCoffeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCoffeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCoffeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCoffeesQuery(
  baseOptions?: Apollo.QueryHookOptions<ListCoffeesQuery, ListCoffeesQueryVariables>,
) {
  return Apollo.useQuery<ListCoffeesQuery, ListCoffeesQueryVariables>(ListCoffeesDocument, baseOptions)
}
export function useListCoffeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCoffeesQuery, ListCoffeesQueryVariables>,
) {
  return Apollo.useLazyQuery<ListCoffeesQuery, ListCoffeesQueryVariables>(ListCoffeesDocument, baseOptions)
}
export type ListCoffeesQueryHookResult = ReturnType<typeof useListCoffeesQuery>
export type ListCoffeesLazyQueryHookResult = ReturnType<typeof useListCoffeesLazyQuery>
export type ListCoffeesQueryResult = Apollo.QueryResult<ListCoffeesQuery, ListCoffeesQueryVariables>
export const ListCoffeesTableDocument = gql`
  query ListCoffeesTable {
    listCoffees {
      edges {
        node {
          id
          name
          country {
            id
            name
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useListCoffeesTableQuery__
 *
 * To run a query within a React component, call `useListCoffeesTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCoffeesTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCoffeesTableQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCoffeesTableQuery(
  baseOptions?: Apollo.QueryHookOptions<ListCoffeesTableQuery, ListCoffeesTableQueryVariables>,
) {
  return Apollo.useQuery<ListCoffeesTableQuery, ListCoffeesTableQueryVariables>(ListCoffeesTableDocument, baseOptions)
}
export function useListCoffeesTableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCoffeesTableQuery, ListCoffeesTableQueryVariables>,
) {
  return Apollo.useLazyQuery<ListCoffeesTableQuery, ListCoffeesTableQueryVariables>(
    ListCoffeesTableDocument,
    baseOptions,
  )
}
export type ListCoffeesTableQueryHookResult = ReturnType<typeof useListCoffeesTableQuery>
export type ListCoffeesTableLazyQueryHookResult = ReturnType<typeof useListCoffeesTableLazyQuery>
export type ListCoffeesTableQueryResult = Apollo.QueryResult<ListCoffeesTableQuery, ListCoffeesTableQueryVariables>
export const GetCoffeeDocument = gql`
  query GetCoffee($id: ID!) {
    getCoffee(id: $id) {
      ...CoffeeFragment
    }
  }
  ${CoffeeFragmentFragmentDoc}
`

/**
 * __useGetCoffeeQuery__
 *
 * To run a query within a React component, call `useGetCoffeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoffeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoffeeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCoffeeQuery(baseOptions: Apollo.QueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>) {
  return Apollo.useQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, baseOptions)
}
export function useGetCoffeeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, baseOptions)
}
export type GetCoffeeQueryHookResult = ReturnType<typeof useGetCoffeeQuery>
export type GetCoffeeLazyQueryHookResult = ReturnType<typeof useGetCoffeeLazyQuery>
export type GetCoffeeQueryResult = Apollo.QueryResult<GetCoffeeQuery, GetCoffeeQueryVariables>
export const CreateCoffeeDocument = gql`
  mutation CreateCoffee($input: CreateCoffeeInput!) {
    createCoffee(input: $input) {
      ...CoffeeFragment
    }
  }
  ${CoffeeFragmentFragmentDoc}
`
export type CreateCoffeeMutationFn = Apollo.MutationFunction<CreateCoffeeMutation, CreateCoffeeMutationVariables>

/**
 * __useCreateCoffeeMutation__
 *
 * To run a mutation, you first call `useCreateCoffeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCoffeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCoffeeMutation, { data, loading, error }] = useCreateCoffeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCoffeeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCoffeeMutation, CreateCoffeeMutationVariables>,
) {
  return Apollo.useMutation<CreateCoffeeMutation, CreateCoffeeMutationVariables>(CreateCoffeeDocument, baseOptions)
}
export type CreateCoffeeMutationHookResult = ReturnType<typeof useCreateCoffeeMutation>
export type CreateCoffeeMutationResult = Apollo.MutationResult<CreateCoffeeMutation>
export type CreateCoffeeMutationOptions = Apollo.BaseMutationOptions<
  CreateCoffeeMutation,
  CreateCoffeeMutationVariables
>
export const UpdateCoffeeDocument = gql`
  mutation UpdateCoffee($id: ID!, $input: UpdateCoffeeInput!) {
    updateCoffee(id: $id, input: $input) {
      ...CoffeeFragment
    }
  }
  ${CoffeeFragmentFragmentDoc}
`
export type UpdateCoffeeMutationFn = Apollo.MutationFunction<UpdateCoffeeMutation, UpdateCoffeeMutationVariables>

/**
 * __useUpdateCoffeeMutation__
 *
 * To run a mutation, you first call `useUpdateCoffeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCoffeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCoffeeMutation, { data, loading, error }] = useUpdateCoffeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCoffeeMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCoffeeMutation, UpdateCoffeeMutationVariables>,
) {
  return Apollo.useMutation<UpdateCoffeeMutation, UpdateCoffeeMutationVariables>(UpdateCoffeeDocument, baseOptions)
}
export type UpdateCoffeeMutationHookResult = ReturnType<typeof useUpdateCoffeeMutation>
export type UpdateCoffeeMutationResult = Apollo.MutationResult<UpdateCoffeeMutation>
export type UpdateCoffeeMutationOptions = Apollo.BaseMutationOptions<
  UpdateCoffeeMutation,
  UpdateCoffeeMutationVariables
>
export const DeleteCoffeeDocument = gql`
  mutation DeleteCoffee($id: ID!) {
    deleteCoffee(id: $id) {
      id
    }
  }
`
export type DeleteCoffeeMutationFn = Apollo.MutationFunction<DeleteCoffeeMutation, DeleteCoffeeMutationVariables>

/**
 * __useDeleteCoffeeMutation__
 *
 * To run a mutation, you first call `useDeleteCoffeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCoffeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCoffeeMutation, { data, loading, error }] = useDeleteCoffeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCoffeeMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCoffeeMutation, DeleteCoffeeMutationVariables>,
) {
  return Apollo.useMutation<DeleteCoffeeMutation, DeleteCoffeeMutationVariables>(DeleteCoffeeDocument, baseOptions)
}
export type DeleteCoffeeMutationHookResult = ReturnType<typeof useDeleteCoffeeMutation>
export type DeleteCoffeeMutationResult = Apollo.MutationResult<DeleteCoffeeMutation>
export type DeleteCoffeeMutationOptions = Apollo.BaseMutationOptions<
  DeleteCoffeeMutation,
  DeleteCoffeeMutationVariables
>
export const UpdateCoffeePermissionsDocument = gql`
  mutation UpdateCoffeePermissions($coffeeId: ID!, $accountId: ID!, $permissionTypes: [PermissionTypeEnum!]!) {
    updateCoffeePermissionsForAccount(coffeeId: $coffeeId, accountId: $accountId, permissionTypes: $permissionTypes)
  }
`
export type UpdateCoffeePermissionsMutationFn = Apollo.MutationFunction<
  UpdateCoffeePermissionsMutation,
  UpdateCoffeePermissionsMutationVariables
>

/**
 * __useUpdateCoffeePermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateCoffeePermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCoffeePermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCoffeePermissionsMutation, { data, loading, error }] = useUpdateCoffeePermissionsMutation({
 *   variables: {
 *      coffeeId: // value for 'coffeeId'
 *      accountId: // value for 'accountId'
 *      permissionTypes: // value for 'permissionTypes'
 *   },
 * });
 */
export function useUpdateCoffeePermissionsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCoffeePermissionsMutation, UpdateCoffeePermissionsMutationVariables>,
) {
  return Apollo.useMutation<UpdateCoffeePermissionsMutation, UpdateCoffeePermissionsMutationVariables>(
    UpdateCoffeePermissionsDocument,
    baseOptions,
  )
}
export type UpdateCoffeePermissionsMutationHookResult = ReturnType<typeof useUpdateCoffeePermissionsMutation>
export type UpdateCoffeePermissionsMutationResult = Apollo.MutationResult<UpdateCoffeePermissionsMutation>
export type UpdateCoffeePermissionsMutationOptions = Apollo.BaseMutationOptions<
  UpdateCoffeePermissionsMutation,
  UpdateCoffeePermissionsMutationVariables
>
export const ListCountriesDocument = gql`
  query ListCountries {
    listCountries {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListCountriesQuery__
 *
 * To run a query within a React component, call `useListCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>,
) {
  return Apollo.useQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, baseOptions)
}
export function useListCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>,
) {
  return Apollo.useLazyQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, baseOptions)
}
export type ListCountriesQueryHookResult = ReturnType<typeof useListCountriesQuery>
export type ListCountriesLazyQueryHookResult = ReturnType<typeof useListCountriesLazyQuery>
export type ListCountriesQueryResult = Apollo.QueryResult<ListCountriesQuery, ListCountriesQueryVariables>
export const ListCountriesTableDocument = gql`
  query ListCountriesTable {
    listCountries {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListCountriesTableQuery__
 *
 * To run a query within a React component, call `useListCountriesTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCountriesTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCountriesTableQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCountriesTableQuery(
  baseOptions?: Apollo.QueryHookOptions<ListCountriesTableQuery, ListCountriesTableQueryVariables>,
) {
  return Apollo.useQuery<ListCountriesTableQuery, ListCountriesTableQueryVariables>(
    ListCountriesTableDocument,
    baseOptions,
  )
}
export function useListCountriesTableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCountriesTableQuery, ListCountriesTableQueryVariables>,
) {
  return Apollo.useLazyQuery<ListCountriesTableQuery, ListCountriesTableQueryVariables>(
    ListCountriesTableDocument,
    baseOptions,
  )
}
export type ListCountriesTableQueryHookResult = ReturnType<typeof useListCountriesTableQuery>
export type ListCountriesTableLazyQueryHookResult = ReturnType<typeof useListCountriesTableLazyQuery>
export type ListCountriesTableQueryResult = Apollo.QueryResult<
  ListCountriesTableQuery,
  ListCountriesTableQueryVariables
>
export const ListAllCountriesDocument = gql`
  query ListAllCountries {
    listCountries(limit: 500) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListAllCountriesQuery__
 *
 * To run a query within a React component, call `useListAllCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAllCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAllCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListAllCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<ListAllCountriesQuery, ListAllCountriesQueryVariables>,
) {
  return Apollo.useQuery<ListAllCountriesQuery, ListAllCountriesQueryVariables>(ListAllCountriesDocument, baseOptions)
}
export function useListAllCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListAllCountriesQuery, ListAllCountriesQueryVariables>,
) {
  return Apollo.useLazyQuery<ListAllCountriesQuery, ListAllCountriesQueryVariables>(
    ListAllCountriesDocument,
    baseOptions,
  )
}
export type ListAllCountriesQueryHookResult = ReturnType<typeof useListAllCountriesQuery>
export type ListAllCountriesLazyQueryHookResult = ReturnType<typeof useListAllCountriesLazyQuery>
export type ListAllCountriesQueryResult = Apollo.QueryResult<ListAllCountriesQuery, ListAllCountriesQueryVariables>
export const GetCountryDocument = gql`
  query GetCountry($id: ID!) {
    getCountry(id: $id) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`

/**
 * __useGetCountryQuery__
 *
 * To run a query within a React component, call `useGetCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCountryQuery(baseOptions: Apollo.QueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
  return Apollo.useQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, baseOptions)
}
export function useGetCountryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, baseOptions)
}
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>
export type GetCountryLazyQueryHookResult = ReturnType<typeof useGetCountryLazyQuery>
export type GetCountryQueryResult = Apollo.QueryResult<GetCountryQuery, GetCountryQueryVariables>
export const ListCuppingSessionsDocument = gql`
  query ListCuppingSessions($cursor: String, $limit: Int) {
    listCuppingSessions(cursor: $cursor, limit: $limit) {
      edges {
        node {
          id
          description
          internalId
          locked
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useListCuppingSessionsQuery__
 *
 * To run a query within a React component, call `useListCuppingSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCuppingSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCuppingSessionsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListCuppingSessionsQuery(
  baseOptions?: Apollo.QueryHookOptions<ListCuppingSessionsQuery, ListCuppingSessionsQueryVariables>,
) {
  return Apollo.useQuery<ListCuppingSessionsQuery, ListCuppingSessionsQueryVariables>(
    ListCuppingSessionsDocument,
    baseOptions,
  )
}
export function useListCuppingSessionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCuppingSessionsQuery, ListCuppingSessionsQueryVariables>,
) {
  return Apollo.useLazyQuery<ListCuppingSessionsQuery, ListCuppingSessionsQueryVariables>(
    ListCuppingSessionsDocument,
    baseOptions,
  )
}
export type ListCuppingSessionsQueryHookResult = ReturnType<typeof useListCuppingSessionsQuery>
export type ListCuppingSessionsLazyQueryHookResult = ReturnType<typeof useListCuppingSessionsLazyQuery>
export type ListCuppingSessionsQueryResult = Apollo.QueryResult<
  ListCuppingSessionsQuery,
  ListCuppingSessionsQueryVariables
>
export const GetCuppingSessionDocument = gql`
  query GetCuppingSession($id: ID!) {
    getCuppingSession(id: $id) {
      ...CupppingSessionFragment
    }
  }
  ${CupppingSessionFragmentFragmentDoc}
`

/**
 * __useGetCuppingSessionQuery__
 *
 * To run a query within a React component, call `useGetCuppingSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCuppingSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCuppingSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCuppingSessionQuery(
  baseOptions: Apollo.QueryHookOptions<GetCuppingSessionQuery, GetCuppingSessionQueryVariables>,
) {
  return Apollo.useQuery<GetCuppingSessionQuery, GetCuppingSessionQueryVariables>(
    GetCuppingSessionDocument,
    baseOptions,
  )
}
export function useGetCuppingSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCuppingSessionQuery, GetCuppingSessionQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCuppingSessionQuery, GetCuppingSessionQueryVariables>(
    GetCuppingSessionDocument,
    baseOptions,
  )
}
export type GetCuppingSessionQueryHookResult = ReturnType<typeof useGetCuppingSessionQuery>
export type GetCuppingSessionLazyQueryHookResult = ReturnType<typeof useGetCuppingSessionLazyQuery>
export type GetCuppingSessionQueryResult = Apollo.QueryResult<GetCuppingSessionQuery, GetCuppingSessionQueryVariables>
export const GetCuppingSessionWithScoreSheetsDocument = gql`
  query GetCuppingSessionWithScoreSheets($id: ID!) {
    getCuppingSession(id: $id) {
      ...CuppingSessionWithScoreSheetsFragment
    }
  }
  ${CuppingSessionWithScoreSheetsFragmentFragmentDoc}
`

/**
 * __useGetCuppingSessionWithScoreSheetsQuery__
 *
 * To run a query within a React component, call `useGetCuppingSessionWithScoreSheetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCuppingSessionWithScoreSheetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCuppingSessionWithScoreSheetsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCuppingSessionWithScoreSheetsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCuppingSessionWithScoreSheetsQuery,
    GetCuppingSessionWithScoreSheetsQueryVariables
  >,
) {
  return Apollo.useQuery<GetCuppingSessionWithScoreSheetsQuery, GetCuppingSessionWithScoreSheetsQueryVariables>(
    GetCuppingSessionWithScoreSheetsDocument,
    baseOptions,
  )
}
export function useGetCuppingSessionWithScoreSheetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCuppingSessionWithScoreSheetsQuery,
    GetCuppingSessionWithScoreSheetsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetCuppingSessionWithScoreSheetsQuery, GetCuppingSessionWithScoreSheetsQueryVariables>(
    GetCuppingSessionWithScoreSheetsDocument,
    baseOptions,
  )
}
export type GetCuppingSessionWithScoreSheetsQueryHookResult = ReturnType<
  typeof useGetCuppingSessionWithScoreSheetsQuery
>
export type GetCuppingSessionWithScoreSheetsLazyQueryHookResult = ReturnType<
  typeof useGetCuppingSessionWithScoreSheetsLazyQuery
>
export type GetCuppingSessionWithScoreSheetsQueryResult = Apollo.QueryResult<
  GetCuppingSessionWithScoreSheetsQuery,
  GetCuppingSessionWithScoreSheetsQueryVariables
>
export const GetCuppingSessionCoffeeDocument = gql`
  query GetCuppingSessionCoffee($id: ID!) {
    getCuppingSessionCoffee(id: $id) {
      ...SessionCoffeeWithScoreSheetsFragment
    }
  }
  ${SessionCoffeeWithScoreSheetsFragmentFragmentDoc}
`

/**
 * __useGetCuppingSessionCoffeeQuery__
 *
 * To run a query within a React component, call `useGetCuppingSessionCoffeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCuppingSessionCoffeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCuppingSessionCoffeeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCuppingSessionCoffeeQuery(
  baseOptions: Apollo.QueryHookOptions<GetCuppingSessionCoffeeQuery, GetCuppingSessionCoffeeQueryVariables>,
) {
  return Apollo.useQuery<GetCuppingSessionCoffeeQuery, GetCuppingSessionCoffeeQueryVariables>(
    GetCuppingSessionCoffeeDocument,
    baseOptions,
  )
}
export function useGetCuppingSessionCoffeeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCuppingSessionCoffeeQuery, GetCuppingSessionCoffeeQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCuppingSessionCoffeeQuery, GetCuppingSessionCoffeeQueryVariables>(
    GetCuppingSessionCoffeeDocument,
    baseOptions,
  )
}
export type GetCuppingSessionCoffeeQueryHookResult = ReturnType<typeof useGetCuppingSessionCoffeeQuery>
export type GetCuppingSessionCoffeeLazyQueryHookResult = ReturnType<typeof useGetCuppingSessionCoffeeLazyQuery>
export type GetCuppingSessionCoffeeQueryResult = Apollo.QueryResult<
  GetCuppingSessionCoffeeQuery,
  GetCuppingSessionCoffeeQueryVariables
>
export const GetScoreSheetDocument = gql`
  query GetScoreSheet($sessionCoffeeId: ID!, $scoreSheetId: ID!) {
    getScoreSheet(sessionCoffeeId: $sessionCoffeeId, scoreSheetId: $scoreSheetId) {
      ...ScoreSheetFragment
    }
  }
  ${ScoreSheetFragmentFragmentDoc}
`

/**
 * __useGetScoreSheetQuery__
 *
 * To run a query within a React component, call `useGetScoreSheetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScoreSheetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScoreSheetQuery({
 *   variables: {
 *      sessionCoffeeId: // value for 'sessionCoffeeId'
 *      scoreSheetId: // value for 'scoreSheetId'
 *   },
 * });
 */
export function useGetScoreSheetQuery(
  baseOptions: Apollo.QueryHookOptions<GetScoreSheetQuery, GetScoreSheetQueryVariables>,
) {
  return Apollo.useQuery<GetScoreSheetQuery, GetScoreSheetQueryVariables>(GetScoreSheetDocument, baseOptions)
}
export function useGetScoreSheetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScoreSheetQuery, GetScoreSheetQueryVariables>,
) {
  return Apollo.useLazyQuery<GetScoreSheetQuery, GetScoreSheetQueryVariables>(GetScoreSheetDocument, baseOptions)
}
export type GetScoreSheetQueryHookResult = ReturnType<typeof useGetScoreSheetQuery>
export type GetScoreSheetLazyQueryHookResult = ReturnType<typeof useGetScoreSheetLazyQuery>
export type GetScoreSheetQueryResult = Apollo.QueryResult<GetScoreSheetQuery, GetScoreSheetQueryVariables>
export const CreateCuppingSessionDocument = gql`
  mutation CreateCuppingSession($input: CreateCuppingSessionInput!) {
    createCuppingSession(input: $input) {
      ...CupppingSessionFragment
    }
  }
  ${CupppingSessionFragmentFragmentDoc}
`
export type CreateCuppingSessionMutationFn = Apollo.MutationFunction<
  CreateCuppingSessionMutation,
  CreateCuppingSessionMutationVariables
>

/**
 * __useCreateCuppingSessionMutation__
 *
 * To run a mutation, you first call `useCreateCuppingSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCuppingSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCuppingSessionMutation, { data, loading, error }] = useCreateCuppingSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCuppingSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCuppingSessionMutation, CreateCuppingSessionMutationVariables>,
) {
  return Apollo.useMutation<CreateCuppingSessionMutation, CreateCuppingSessionMutationVariables>(
    CreateCuppingSessionDocument,
    baseOptions,
  )
}
export type CreateCuppingSessionMutationHookResult = ReturnType<typeof useCreateCuppingSessionMutation>
export type CreateCuppingSessionMutationResult = Apollo.MutationResult<CreateCuppingSessionMutation>
export type CreateCuppingSessionMutationOptions = Apollo.BaseMutationOptions<
  CreateCuppingSessionMutation,
  CreateCuppingSessionMutationVariables
>
export const UpdateCuppingSessionDocument = gql`
  mutation UpdateCuppingSession($id: ID!, $input: UpdateCuppingSessionInput!) {
    updateCuppingSession(id: $id, input: $input) {
      ...CupppingSessionFragment
    }
  }
  ${CupppingSessionFragmentFragmentDoc}
`
export type UpdateCuppingSessionMutationFn = Apollo.MutationFunction<
  UpdateCuppingSessionMutation,
  UpdateCuppingSessionMutationVariables
>

/**
 * __useUpdateCuppingSessionMutation__
 *
 * To run a mutation, you first call `useUpdateCuppingSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCuppingSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCuppingSessionMutation, { data, loading, error }] = useUpdateCuppingSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCuppingSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCuppingSessionMutation, UpdateCuppingSessionMutationVariables>,
) {
  return Apollo.useMutation<UpdateCuppingSessionMutation, UpdateCuppingSessionMutationVariables>(
    UpdateCuppingSessionDocument,
    baseOptions,
  )
}
export type UpdateCuppingSessionMutationHookResult = ReturnType<typeof useUpdateCuppingSessionMutation>
export type UpdateCuppingSessionMutationResult = Apollo.MutationResult<UpdateCuppingSessionMutation>
export type UpdateCuppingSessionMutationOptions = Apollo.BaseMutationOptions<
  UpdateCuppingSessionMutation,
  UpdateCuppingSessionMutationVariables
>
export const UpdateCuppingSessionCoffeesDocument = gql`
  mutation UpdateCuppingSessionCoffees($id: ID!, $sessionCoffees: [SessionCoffeeInput!]!) {
    updateCuppingSessionCoffees(id: $id, sessionCoffees: $sessionCoffees) {
      ...CupppingSessionFragment
    }
  }
  ${CupppingSessionFragmentFragmentDoc}
`
export type UpdateCuppingSessionCoffeesMutationFn = Apollo.MutationFunction<
  UpdateCuppingSessionCoffeesMutation,
  UpdateCuppingSessionCoffeesMutationVariables
>

/**
 * __useUpdateCuppingSessionCoffeesMutation__
 *
 * To run a mutation, you first call `useUpdateCuppingSessionCoffeesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCuppingSessionCoffeesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCuppingSessionCoffeesMutation, { data, loading, error }] = useUpdateCuppingSessionCoffeesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      sessionCoffees: // value for 'sessionCoffees'
 *   },
 * });
 */
export function useUpdateCuppingSessionCoffeesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCuppingSessionCoffeesMutation,
    UpdateCuppingSessionCoffeesMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateCuppingSessionCoffeesMutation, UpdateCuppingSessionCoffeesMutationVariables>(
    UpdateCuppingSessionCoffeesDocument,
    baseOptions,
  )
}
export type UpdateCuppingSessionCoffeesMutationHookResult = ReturnType<typeof useUpdateCuppingSessionCoffeesMutation>
export type UpdateCuppingSessionCoffeesMutationResult = Apollo.MutationResult<UpdateCuppingSessionCoffeesMutation>
export type UpdateCuppingSessionCoffeesMutationOptions = Apollo.BaseMutationOptions<
  UpdateCuppingSessionCoffeesMutation,
  UpdateCuppingSessionCoffeesMutationVariables
>
export const LockCuppingSessionDocument = gql`
  mutation LockCuppingSession($id: ID!) {
    lockCuppingSession(id: $id) {
      ...CupppingSessionFragment
    }
  }
  ${CupppingSessionFragmentFragmentDoc}
`
export type LockCuppingSessionMutationFn = Apollo.MutationFunction<
  LockCuppingSessionMutation,
  LockCuppingSessionMutationVariables
>

/**
 * __useLockCuppingSessionMutation__
 *
 * To run a mutation, you first call `useLockCuppingSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLockCuppingSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lockCuppingSessionMutation, { data, loading, error }] = useLockCuppingSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLockCuppingSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<LockCuppingSessionMutation, LockCuppingSessionMutationVariables>,
) {
  return Apollo.useMutation<LockCuppingSessionMutation, LockCuppingSessionMutationVariables>(
    LockCuppingSessionDocument,
    baseOptions,
  )
}
export type LockCuppingSessionMutationHookResult = ReturnType<typeof useLockCuppingSessionMutation>
export type LockCuppingSessionMutationResult = Apollo.MutationResult<LockCuppingSessionMutation>
export type LockCuppingSessionMutationOptions = Apollo.BaseMutationOptions<
  LockCuppingSessionMutation,
  LockCuppingSessionMutationVariables
>
export const DeleteCuppingSessionDocument = gql`
  mutation DeleteCuppingSession($id: ID!) {
    deleteCuppingSession(id: $id)
  }
`
export type DeleteCuppingSessionMutationFn = Apollo.MutationFunction<
  DeleteCuppingSessionMutation,
  DeleteCuppingSessionMutationVariables
>

/**
 * __useDeleteCuppingSessionMutation__
 *
 * To run a mutation, you first call `useDeleteCuppingSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCuppingSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCuppingSessionMutation, { data, loading, error }] = useDeleteCuppingSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCuppingSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCuppingSessionMutation, DeleteCuppingSessionMutationVariables>,
) {
  return Apollo.useMutation<DeleteCuppingSessionMutation, DeleteCuppingSessionMutationVariables>(
    DeleteCuppingSessionDocument,
    baseOptions,
  )
}
export type DeleteCuppingSessionMutationHookResult = ReturnType<typeof useDeleteCuppingSessionMutation>
export type DeleteCuppingSessionMutationResult = Apollo.MutationResult<DeleteCuppingSessionMutation>
export type DeleteCuppingSessionMutationOptions = Apollo.BaseMutationOptions<
  DeleteCuppingSessionMutation,
  DeleteCuppingSessionMutationVariables
>
export const CreateScoreSheetDocument = gql`
  mutation CreateScoreSheet($sessionCoffeeId: ID!, $input: CreateScoreSheetInput!) {
    createScoreSheet(sessionCoffeeId: $sessionCoffeeId, input: $input) {
      ...ScoreSheetFragment
    }
  }
  ${ScoreSheetFragmentFragmentDoc}
`
export type CreateScoreSheetMutationFn = Apollo.MutationFunction<
  CreateScoreSheetMutation,
  CreateScoreSheetMutationVariables
>

/**
 * __useCreateScoreSheetMutation__
 *
 * To run a mutation, you first call `useCreateScoreSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScoreSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScoreSheetMutation, { data, loading, error }] = useCreateScoreSheetMutation({
 *   variables: {
 *      sessionCoffeeId: // value for 'sessionCoffeeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScoreSheetMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateScoreSheetMutation, CreateScoreSheetMutationVariables>,
) {
  return Apollo.useMutation<CreateScoreSheetMutation, CreateScoreSheetMutationVariables>(
    CreateScoreSheetDocument,
    baseOptions,
  )
}
export type CreateScoreSheetMutationHookResult = ReturnType<typeof useCreateScoreSheetMutation>
export type CreateScoreSheetMutationResult = Apollo.MutationResult<CreateScoreSheetMutation>
export type CreateScoreSheetMutationOptions = Apollo.BaseMutationOptions<
  CreateScoreSheetMutation,
  CreateScoreSheetMutationVariables
>
export const UpdateScoreSheetDocument = gql`
  mutation UpdateScoreSheet($scoreSheetId: ID!, $sessionCoffeeId: ID!, $input: UpdateScoreSheetInput!) {
    updateScoreSheet(scoreSheetId: $scoreSheetId, sessionCoffeeId: $sessionCoffeeId, input: $input) {
      ...ScoreSheetFragment
    }
  }
  ${ScoreSheetFragmentFragmentDoc}
`
export type UpdateScoreSheetMutationFn = Apollo.MutationFunction<
  UpdateScoreSheetMutation,
  UpdateScoreSheetMutationVariables
>

/**
 * __useUpdateScoreSheetMutation__
 *
 * To run a mutation, you first call `useUpdateScoreSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScoreSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScoreSheetMutation, { data, loading, error }] = useUpdateScoreSheetMutation({
 *   variables: {
 *      scoreSheetId: // value for 'scoreSheetId'
 *      sessionCoffeeId: // value for 'sessionCoffeeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateScoreSheetMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateScoreSheetMutation, UpdateScoreSheetMutationVariables>,
) {
  return Apollo.useMutation<UpdateScoreSheetMutation, UpdateScoreSheetMutationVariables>(
    UpdateScoreSheetDocument,
    baseOptions,
  )
}
export type UpdateScoreSheetMutationHookResult = ReturnType<typeof useUpdateScoreSheetMutation>
export type UpdateScoreSheetMutationResult = Apollo.MutationResult<UpdateScoreSheetMutation>
export type UpdateScoreSheetMutationOptions = Apollo.BaseMutationOptions<
  UpdateScoreSheetMutation,
  UpdateScoreSheetMutationVariables
>
export const ListFarmsDocument = gql`
  query ListFarms {
    listFarms {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListFarmsQuery__
 *
 * To run a query within a React component, call `useListFarmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFarmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFarmsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListFarmsQuery(baseOptions?: Apollo.QueryHookOptions<ListFarmsQuery, ListFarmsQueryVariables>) {
  return Apollo.useQuery<ListFarmsQuery, ListFarmsQueryVariables>(ListFarmsDocument, baseOptions)
}
export function useListFarmsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListFarmsQuery, ListFarmsQueryVariables>,
) {
  return Apollo.useLazyQuery<ListFarmsQuery, ListFarmsQueryVariables>(ListFarmsDocument, baseOptions)
}
export type ListFarmsQueryHookResult = ReturnType<typeof useListFarmsQuery>
export type ListFarmsLazyQueryHookResult = ReturnType<typeof useListFarmsLazyQuery>
export type ListFarmsQueryResult = Apollo.QueryResult<ListFarmsQuery, ListFarmsQueryVariables>
export const ListFarmsTableDocument = gql`
  query ListFarmsTable {
    listFarms {
      edges {
        node {
          id
          name
          country {
            id
            name
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useListFarmsTableQuery__
 *
 * To run a query within a React component, call `useListFarmsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFarmsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFarmsTableQuery({
 *   variables: {
 *   },
 * });
 */
export function useListFarmsTableQuery(
  baseOptions?: Apollo.QueryHookOptions<ListFarmsTableQuery, ListFarmsTableQueryVariables>,
) {
  return Apollo.useQuery<ListFarmsTableQuery, ListFarmsTableQueryVariables>(ListFarmsTableDocument, baseOptions)
}
export function useListFarmsTableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListFarmsTableQuery, ListFarmsTableQueryVariables>,
) {
  return Apollo.useLazyQuery<ListFarmsTableQuery, ListFarmsTableQueryVariables>(ListFarmsTableDocument, baseOptions)
}
export type ListFarmsTableQueryHookResult = ReturnType<typeof useListFarmsTableQuery>
export type ListFarmsTableLazyQueryHookResult = ReturnType<typeof useListFarmsTableLazyQuery>
export type ListFarmsTableQueryResult = Apollo.QueryResult<ListFarmsTableQuery, ListFarmsTableQueryVariables>
export const GetFarmDocument = gql`
  query GetFarm($id: ID!) {
    getFarm(id: $id) {
      ...FarmFragment
    }
  }
  ${FarmFragmentFragmentDoc}
`

/**
 * __useGetFarmQuery__
 *
 * To run a query within a React component, call `useGetFarmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFarmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFarmQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFarmQuery(baseOptions: Apollo.QueryHookOptions<GetFarmQuery, GetFarmQueryVariables>) {
  return Apollo.useQuery<GetFarmQuery, GetFarmQueryVariables>(GetFarmDocument, baseOptions)
}
export function useGetFarmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFarmQuery, GetFarmQueryVariables>) {
  return Apollo.useLazyQuery<GetFarmQuery, GetFarmQueryVariables>(GetFarmDocument, baseOptions)
}
export type GetFarmQueryHookResult = ReturnType<typeof useGetFarmQuery>
export type GetFarmLazyQueryHookResult = ReturnType<typeof useGetFarmLazyQuery>
export type GetFarmQueryResult = Apollo.QueryResult<GetFarmQuery, GetFarmQueryVariables>
export const CreateFarmDocument = gql`
  mutation CreateFarm($input: CreateFarmInput!) {
    createFarm(input: $input) {
      ...FarmFragment
    }
  }
  ${FarmFragmentFragmentDoc}
`
export type CreateFarmMutationFn = Apollo.MutationFunction<CreateFarmMutation, CreateFarmMutationVariables>

/**
 * __useCreateFarmMutation__
 *
 * To run a mutation, you first call `useCreateFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFarmMutation, { data, loading, error }] = useCreateFarmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFarmMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateFarmMutation, CreateFarmMutationVariables>,
) {
  return Apollo.useMutation<CreateFarmMutation, CreateFarmMutationVariables>(CreateFarmDocument, baseOptions)
}
export type CreateFarmMutationHookResult = ReturnType<typeof useCreateFarmMutation>
export type CreateFarmMutationResult = Apollo.MutationResult<CreateFarmMutation>
export type CreateFarmMutationOptions = Apollo.BaseMutationOptions<CreateFarmMutation, CreateFarmMutationVariables>
export const UpdateFarmDocument = gql`
  mutation UpdateFarm($id: ID!, $input: UpdateFarmInput!) {
    updateFarm(id: $id, input: $input) {
      ...FarmFragment
    }
  }
  ${FarmFragmentFragmentDoc}
`
export type UpdateFarmMutationFn = Apollo.MutationFunction<UpdateFarmMutation, UpdateFarmMutationVariables>

/**
 * __useUpdateFarmMutation__
 *
 * To run a mutation, you first call `useUpdateFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFarmMutation, { data, loading, error }] = useUpdateFarmMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFarmMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateFarmMutation, UpdateFarmMutationVariables>,
) {
  return Apollo.useMutation<UpdateFarmMutation, UpdateFarmMutationVariables>(UpdateFarmDocument, baseOptions)
}
export type UpdateFarmMutationHookResult = ReturnType<typeof useUpdateFarmMutation>
export type UpdateFarmMutationResult = Apollo.MutationResult<UpdateFarmMutation>
export type UpdateFarmMutationOptions = Apollo.BaseMutationOptions<UpdateFarmMutation, UpdateFarmMutationVariables>
export const DeleteFarmDocument = gql`
  mutation DeleteFarm($id: ID!) {
    deleteFarm(id: $id) {
      id
    }
  }
`
export type DeleteFarmMutationFn = Apollo.MutationFunction<DeleteFarmMutation, DeleteFarmMutationVariables>

/**
 * __useDeleteFarmMutation__
 *
 * To run a mutation, you first call `useDeleteFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFarmMutation, { data, loading, error }] = useDeleteFarmMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFarmMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteFarmMutation, DeleteFarmMutationVariables>,
) {
  return Apollo.useMutation<DeleteFarmMutation, DeleteFarmMutationVariables>(DeleteFarmDocument, baseOptions)
}
export type DeleteFarmMutationHookResult = ReturnType<typeof useDeleteFarmMutation>
export type DeleteFarmMutationResult = Apollo.MutationResult<DeleteFarmMutation>
export type DeleteFarmMutationOptions = Apollo.BaseMutationOptions<DeleteFarmMutation, DeleteFarmMutationVariables>
export const ListRegionsDocument = gql`
  query ListRegions($cursor: String, $limit: Int, $query: [QueryInput!]) {
    listRegions(cursor: $cursor, limit: $limit, query: $query) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListRegionsQuery__
 *
 * To run a query within a React component, call `useListRegionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRegionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRegionsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useListRegionsQuery(
  baseOptions?: Apollo.QueryHookOptions<ListRegionsQuery, ListRegionsQueryVariables>,
) {
  return Apollo.useQuery<ListRegionsQuery, ListRegionsQueryVariables>(ListRegionsDocument, baseOptions)
}
export function useListRegionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListRegionsQuery, ListRegionsQueryVariables>,
) {
  return Apollo.useLazyQuery<ListRegionsQuery, ListRegionsQueryVariables>(ListRegionsDocument, baseOptions)
}
export type ListRegionsQueryHookResult = ReturnType<typeof useListRegionsQuery>
export type ListRegionsLazyQueryHookResult = ReturnType<typeof useListRegionsLazyQuery>
export type ListRegionsQueryResult = Apollo.QueryResult<ListRegionsQuery, ListRegionsQueryVariables>
export const ListRegionsTableDocument = gql`
  query ListRegionsTable {
    listRegions {
      edges {
        node {
          id
          name
          country {
            id
            name
          }
        }
      }
    }
  }
`

/**
 * __useListRegionsTableQuery__
 *
 * To run a query within a React component, call `useListRegionsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRegionsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRegionsTableQuery({
 *   variables: {
 *   },
 * });
 */
export function useListRegionsTableQuery(
  baseOptions?: Apollo.QueryHookOptions<ListRegionsTableQuery, ListRegionsTableQueryVariables>,
) {
  return Apollo.useQuery<ListRegionsTableQuery, ListRegionsTableQueryVariables>(ListRegionsTableDocument, baseOptions)
}
export function useListRegionsTableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListRegionsTableQuery, ListRegionsTableQueryVariables>,
) {
  return Apollo.useLazyQuery<ListRegionsTableQuery, ListRegionsTableQueryVariables>(
    ListRegionsTableDocument,
    baseOptions,
  )
}
export type ListRegionsTableQueryHookResult = ReturnType<typeof useListRegionsTableQuery>
export type ListRegionsTableLazyQueryHookResult = ReturnType<typeof useListRegionsTableLazyQuery>
export type ListRegionsTableQueryResult = Apollo.QueryResult<ListRegionsTableQuery, ListRegionsTableQueryVariables>
export const GetRegionDocument = gql`
  query GetRegion($id: ID!) {
    getRegion(id: $id) {
      ...RegionFragment
    }
  }
  ${RegionFragmentFragmentDoc}
`

/**
 * __useGetRegionQuery__
 *
 * To run a query within a React component, call `useGetRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRegionQuery(baseOptions: Apollo.QueryHookOptions<GetRegionQuery, GetRegionQueryVariables>) {
  return Apollo.useQuery<GetRegionQuery, GetRegionQueryVariables>(GetRegionDocument, baseOptions)
}
export function useGetRegionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRegionQuery, GetRegionQueryVariables>,
) {
  return Apollo.useLazyQuery<GetRegionQuery, GetRegionQueryVariables>(GetRegionDocument, baseOptions)
}
export type GetRegionQueryHookResult = ReturnType<typeof useGetRegionQuery>
export type GetRegionLazyQueryHookResult = ReturnType<typeof useGetRegionLazyQuery>
export type GetRegionQueryResult = Apollo.QueryResult<GetRegionQuery, GetRegionQueryVariables>
export const UserSearchDocument = gql`
  query UserSearch($searchText: String) {
    listUsers(query: [{field: "username", operator: contains, value: $searchText}]) {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`

/**
 * __useUserSearchQuery__
 *
 * To run a query within a React component, call `useUserSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSearchQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useUserSearchQuery(baseOptions?: Apollo.QueryHookOptions<UserSearchQuery, UserSearchQueryVariables>) {
  return Apollo.useQuery<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, baseOptions)
}
export function useUserSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSearchQuery, UserSearchQueryVariables>,
) {
  return Apollo.useLazyQuery<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, baseOptions)
}
export type UserSearchQueryHookResult = ReturnType<typeof useUserSearchQuery>
export type UserSearchLazyQueryHookResult = ReturnType<typeof useUserSearchLazyQuery>
export type UserSearchQueryResult = Apollo.QueryResult<UserSearchQuery, UserSearchQueryVariables>
export const ListVarietiesDocument = gql`
  query ListVarieties {
    listVarieties {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useListVarietiesQuery__
 *
 * To run a query within a React component, call `useListVarietiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListVarietiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListVarietiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListVarietiesQuery(
  baseOptions?: Apollo.QueryHookOptions<ListVarietiesQuery, ListVarietiesQueryVariables>,
) {
  return Apollo.useQuery<ListVarietiesQuery, ListVarietiesQueryVariables>(ListVarietiesDocument, baseOptions)
}
export function useListVarietiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListVarietiesQuery, ListVarietiesQueryVariables>,
) {
  return Apollo.useLazyQuery<ListVarietiesQuery, ListVarietiesQueryVariables>(ListVarietiesDocument, baseOptions)
}
export type ListVarietiesQueryHookResult = ReturnType<typeof useListVarietiesQuery>
export type ListVarietiesLazyQueryHookResult = ReturnType<typeof useListVarietiesLazyQuery>
export type ListVarietiesQueryResult = Apollo.QueryResult<ListVarietiesQuery, ListVarietiesQueryVariables>
export const ListVarietiesTableDocument = gql`
  query ListVarietiesTable {
    listVarieties {
      edges {
        node {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useListVarietiesTableQuery__
 *
 * To run a query within a React component, call `useListVarietiesTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useListVarietiesTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListVarietiesTableQuery({
 *   variables: {
 *   },
 * });
 */
export function useListVarietiesTableQuery(
  baseOptions?: Apollo.QueryHookOptions<ListVarietiesTableQuery, ListVarietiesTableQueryVariables>,
) {
  return Apollo.useQuery<ListVarietiesTableQuery, ListVarietiesTableQueryVariables>(
    ListVarietiesTableDocument,
    baseOptions,
  )
}
export function useListVarietiesTableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListVarietiesTableQuery, ListVarietiesTableQueryVariables>,
) {
  return Apollo.useLazyQuery<ListVarietiesTableQuery, ListVarietiesTableQueryVariables>(
    ListVarietiesTableDocument,
    baseOptions,
  )
}
export type ListVarietiesTableQueryHookResult = ReturnType<typeof useListVarietiesTableQuery>
export type ListVarietiesTableLazyQueryHookResult = ReturnType<typeof useListVarietiesTableLazyQuery>
export type ListVarietiesTableQueryResult = Apollo.QueryResult<
  ListVarietiesTableQuery,
  ListVarietiesTableQueryVariables
>
export const GetVarietyDocument = gql`
  query GetVariety($id: ID!) {
    getVariety(id: $id) {
      ...VarietyFragment
    }
  }
  ${VarietyFragmentFragmentDoc}
`

/**
 * __useGetVarietyQuery__
 *
 * To run a query within a React component, call `useGetVarietyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVarietyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVarietyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVarietyQuery(baseOptions: Apollo.QueryHookOptions<GetVarietyQuery, GetVarietyQueryVariables>) {
  return Apollo.useQuery<GetVarietyQuery, GetVarietyQueryVariables>(GetVarietyDocument, baseOptions)
}
export function useGetVarietyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetVarietyQuery, GetVarietyQueryVariables>,
) {
  return Apollo.useLazyQuery<GetVarietyQuery, GetVarietyQueryVariables>(GetVarietyDocument, baseOptions)
}
export type GetVarietyQueryHookResult = ReturnType<typeof useGetVarietyQuery>
export type GetVarietyLazyQueryHookResult = ReturnType<typeof useGetVarietyLazyQuery>
export type GetVarietyQueryResult = Apollo.QueryResult<GetVarietyQuery, GetVarietyQueryVariables>
export const CreateVarietyDocument = gql`
  mutation CreateVariety($input: CreateVarietyInput!) {
    createVariety(input: $input) {
      ...VarietyFragment
    }
  }
  ${VarietyFragmentFragmentDoc}
`
export type CreateVarietyMutationFn = Apollo.MutationFunction<CreateVarietyMutation, CreateVarietyMutationVariables>

/**
 * __useCreateVarietyMutation__
 *
 * To run a mutation, you first call `useCreateVarietyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVarietyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVarietyMutation, { data, loading, error }] = useCreateVarietyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVarietyMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateVarietyMutation, CreateVarietyMutationVariables>,
) {
  return Apollo.useMutation<CreateVarietyMutation, CreateVarietyMutationVariables>(CreateVarietyDocument, baseOptions)
}
export type CreateVarietyMutationHookResult = ReturnType<typeof useCreateVarietyMutation>
export type CreateVarietyMutationResult = Apollo.MutationResult<CreateVarietyMutation>
export type CreateVarietyMutationOptions = Apollo.BaseMutationOptions<
  CreateVarietyMutation,
  CreateVarietyMutationVariables
>
export const UpdateVarietyDocument = gql`
  mutation UpdateVariety($id: ID!, $input: UpdateVarietyInput!) {
    updateVariety(id: $id, input: $input) {
      ...VarietyFragment
    }
  }
  ${VarietyFragmentFragmentDoc}
`
export type UpdateVarietyMutationFn = Apollo.MutationFunction<UpdateVarietyMutation, UpdateVarietyMutationVariables>

/**
 * __useUpdateVarietyMutation__
 *
 * To run a mutation, you first call `useUpdateVarietyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVarietyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVarietyMutation, { data, loading, error }] = useUpdateVarietyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVarietyMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateVarietyMutation, UpdateVarietyMutationVariables>,
) {
  return Apollo.useMutation<UpdateVarietyMutation, UpdateVarietyMutationVariables>(UpdateVarietyDocument, baseOptions)
}
export type UpdateVarietyMutationHookResult = ReturnType<typeof useUpdateVarietyMutation>
export type UpdateVarietyMutationResult = Apollo.MutationResult<UpdateVarietyMutation>
export type UpdateVarietyMutationOptions = Apollo.BaseMutationOptions<
  UpdateVarietyMutation,
  UpdateVarietyMutationVariables
>
export const DeleteVarietyDocument = gql`
  mutation DeleteVariety($id: ID!) {
    deleteVariety(id: $id) {
      id
    }
  }
`
export type DeleteVarietyMutationFn = Apollo.MutationFunction<DeleteVarietyMutation, DeleteVarietyMutationVariables>

/**
 * __useDeleteVarietyMutation__
 *
 * To run a mutation, you first call `useDeleteVarietyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVarietyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVarietyMutation, { data, loading, error }] = useDeleteVarietyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVarietyMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteVarietyMutation, DeleteVarietyMutationVariables>,
) {
  return Apollo.useMutation<DeleteVarietyMutation, DeleteVarietyMutationVariables>(DeleteVarietyDocument, baseOptions)
}
export type DeleteVarietyMutationHookResult = ReturnType<typeof useDeleteVarietyMutation>
export type DeleteVarietyMutationResult = Apollo.MutationResult<DeleteVarietyMutation>
export type DeleteVarietyMutationOptions = Apollo.BaseMutationOptions<
  DeleteVarietyMutation,
  DeleteVarietyMutationVariables
>

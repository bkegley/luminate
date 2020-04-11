import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
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
  /** Valid cupping score input */
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
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
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

export type CreateCoffeeInput = {
  name: Scalars['String']
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
  farm?: Maybe<Scalars['ID']>
  farmZone?: Maybe<Scalars['ID']>
  varieties?: Maybe<Array<Maybe<Scalars['ID']>>>
  elevation?: Maybe<Scalars['String']>
  components?: Maybe<Array<Maybe<ComponentInput>>>
}

export type CreateCountryInput = {
  name: Scalars['String']
}

export type CreateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
}

export type CreateDeviceInput = {
  name: Scalars['String']
}

export type CreateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
}

export type CreateFarmZoneInput = {
  name: Scalars['String']
}

export type CreateNoteInput = {
  entityId: Scalars['ID']
  content: Scalars['String']
  field: Scalars['String']
}

export type CreateRegionInput = {
  name: Scalars['String']
  country?: Maybe<Scalars['ID']>
}

export type CreateRoleInput = {
  name: Scalars['String']
  scopes?: Maybe<Array<Scalars['String']>>
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

export type Device = {
  __typename: 'Device'
  id: Scalars['ID']
  name: Scalars['String']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type DeviceConnection = {
  __typename: 'DeviceConnection'
  pageInfo: PageInfo
  edges: Array<DeviceEdge>
}

export type DeviceEdge = {
  __typename: 'DeviceEdge'
  cursor: Scalars['String']
  node: Device
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
  deleteUser?: Maybe<User>
  updatePassword: Scalars['Boolean']
  login?: Maybe<Scalars['Boolean']>
  logout: Scalars['Boolean']
  switchAccount?: Maybe<Scalars['Boolean']>
  refreshToken?: Maybe<Scalars['Boolean']>
  createNote?: Maybe<Note>
  updateNote?: Maybe<Note>
  deleteNote?: Maybe<Note>
  createCoffee?: Maybe<Coffee>
  updateCoffee?: Maybe<Coffee>
  deleteCoffee?: Maybe<Coffee>
  updateCoffeePermissionsForAccount?: Maybe<Scalars['Boolean']>
  createCountry?: Maybe<Country>
  updateCountry?: Maybe<Country>
  deleteCountry?: Maybe<Country>
  createDevice?: Maybe<Device>
  updateDevice?: Maybe<Device>
  deleteDevice?: Maybe<Device>
  updateDevicePermissionsForAccount?: Maybe<Scalars['Boolean']>
  createFarm?: Maybe<Farm>
  updateFarm?: Maybe<Farm>
  deleteFarm?: Maybe<Farm>
  createFarmZone?: Maybe<Farm>
  updateFarmZone?: Maybe<Farm>
  deleteFarmZone?: Maybe<Farm>
  createRegion?: Maybe<Region>
  updateRegion?: Maybe<Region>
  deleteRegion?: Maybe<Region>
  createVariety?: Maybe<Variety>
  updateVariety?: Maybe<Variety>
  deleteVariety?: Maybe<Variety>
  makeVarietyPublic?: Maybe<Scalars['Boolean']>
  createCuppingSession?: Maybe<CuppingSession>
  updateCuppingSession?: Maybe<CuppingSession>
  deleteCuppingSession?: Maybe<CuppingSession>
  createScoreSheet?: Maybe<CuppingSession>
  updateScoreSheet?: Maybe<CuppingSession>
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

export type MutationCreateCountryArgs = {
  input: CreateCountryInput
}

export type MutationUpdateCountryArgs = {
  id: Scalars['ID']
  input: UpdateCountryInput
}

export type MutationDeleteCountryArgs = {
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

export type MutationUpdateDevicePermissionsForAccountArgs = {
  DeviceId: Scalars['ID']
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

export type MutationCreateRegionArgs = {
  input: CreateRegionInput
}

export type MutationUpdateRegionArgs = {
  id: Scalars['ID']
  input: UpdateRegionInput
}

export type MutationDeleteRegionArgs = {
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

export type Note = {
  __typename: 'Note'
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
  __typename: 'PageInfo'
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
  __typename: 'Query'
  listAccounts: AccountConnection
  getAccount?: Maybe<Account>
  listRoles: RoleConnection
  getRole?: Maybe<Role>
  listUsers: UserConnection
  getUser?: Maybe<User>
  me?: Maybe<User>
  listCoffees: CoffeeConnection
  getCoffee?: Maybe<Coffee>
  listCountries: CountryConnection
  getCountry?: Maybe<Country>
  listDevices: DeviceConnection
  getDevice?: Maybe<Device>
  listFarms: FarmConnection
  getFarm?: Maybe<Farm>
  listRegions: RegionConnection
  getRegion?: Maybe<Region>
  listVarieties: VarietyConnection
  getVariety?: Maybe<Variety>
  listCuppingSessions: CuppingSessionConnection
  getCuppingSession?: Maybe<CuppingSession>
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

export type QueryListDevicesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryGetDeviceArgs = {
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

export type Region = {
  __typename: 'Region'
  id: Scalars['ID']
  name: Scalars['String']
  country?: Maybe<Country>
  farms?: Maybe<Array<Maybe<Farm>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
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
}

export type SessionCoffee = {
  __typename: 'SessionCoffee'
  id: Scalars['ID']
  sampleNumber: Scalars['ID']
  coffee: Coffee
  scoreSheets?: Maybe<Array<Maybe<ScoreSheet>>>
}

export type SessionCoffeeInput = {
  sampleNumber: Scalars['ID']
  coffee?: Maybe<Scalars['ID']>
}

export type UpdateAccountInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateCoffeeInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
  farm?: Maybe<Scalars['ID']>
  farmZone?: Maybe<Scalars['ID']>
  varieties?: Maybe<Array<Maybe<Scalars['ID']>>>
  elevation?: Maybe<Scalars['String']>
  components?: Maybe<Array<Maybe<ComponentInput>>>
}

export type UpdateCountryInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateCuppingSessionInput = {
  internalId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  sessionCoffees?: Maybe<Array<Maybe<SessionCoffeeInput>>>
}

export type UpdateDeviceInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
}

export type UpdateFarmZoneInput = {
  name: Scalars['String']
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

export type UpdateRegionInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
}

export type UpdateRoleInput = {
  name?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['String']>>
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

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Scalars['ID']>>
}

export type UpdateVarietyInput = {
  name?: Maybe<Scalars['String']>
}

export type User = {
  __typename: 'User'
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

export type ListRolesQueryVariables = {
  cursor?: Maybe<Scalars['String']>
}

export type ListRolesQuery = {__typename: 'Query'} & {
  listRoles: {__typename: 'RoleConnection'} & {
    pageInfo: {__typename: 'PageInfo'} & Pick<PageInfo, 'hasNextPage' | 'nextCursor' | 'prevCursor'>
    edges: Array<{__typename: 'RoleEdge'} & {node: {__typename: 'Role'} & RoleFragmentFragment}>
  }
}

export type GetRoleQueryVariables = {
  id: Scalars['ID']
}

export type GetRoleQuery = {__typename: 'Query'} & {getRole: Maybe<{__typename: 'Role'} & RoleFragmentFragment>}

export type CreateRoleMutationVariables = {
  input: CreateRoleInput
}

export type CreateRoleMutation = {__typename: 'Mutation'} & {
  createRole: Maybe<{__typename: 'Role'} & RoleFragmentFragment>
}

export type UpdateRoleMutationVariables = {
  id: Scalars['ID']
  input: UpdateRoleInput
}

export type UpdateRoleMutation = {__typename: 'Mutation'} & {
  updateRole: Maybe<{__typename: 'Role'} & RoleFragmentFragment>
}

export type DeleteRoleMutationVariables = {
  id: Scalars['ID']
}

export type DeleteRoleMutation = {__typename: 'Mutation'} & {deleteRole: Maybe<{__typename: 'Role'} & Pick<Role, 'id'>>}

export type RoleFragmentFragment = {__typename: 'Role'} & Pick<
  Role,
  'id' | 'name' | 'scopes' | 'createdAt' | 'updatedAt'
>

export type ListUsersQueryVariables = {
  cursor?: Maybe<Scalars['String']>
}

export type ListUsersQuery = {__typename: 'Query'} & {
  listUsers: {__typename: 'UserConnection'} & {
    pageInfo: {__typename: 'PageInfo'} & Pick<PageInfo, 'hasNextPage' | 'nextCursor' | 'prevCursor'>
    edges: Array<{__typename: 'UserEdge'} & {node: {__typename: 'User'} & UserFragmentFragment}>
  }
}

export type GetUserQueryVariables = {
  id: Scalars['ID']
}

export type GetUserQuery = {__typename: 'Query'} & {getUser: Maybe<{__typename: 'User'} & UserFragmentFragment>}

export type CreateUserMutationVariables = {
  input: CreateUserInput
}

export type CreateUserMutation = {__typename: 'Mutation'} & {
  createUser: Maybe<{__typename: 'User'} & UserFragmentFragment>
}

export type UpdateUserMutationVariables = {
  id: Scalars['ID']
  input: UpdateUserInput
}

export type UpdateUserMutation = {__typename: 'Mutation'} & {
  updateUser: Maybe<{__typename: 'User'} & UserFragmentFragment>
}

export type DeleteUserMutationVariables = {
  id: Scalars['ID']
}

export type DeleteUserMutation = {__typename: 'Mutation'} & {deleteUser: Maybe<{__typename: 'User'} & Pick<User, 'id'>>}

export type UserFragmentFragment = {__typename: 'User'} & Pick<
  User,
  'id' | 'username' | 'firstName' | 'lastName' | 'scopes'
> & {roles: Array<{__typename: 'Role'} & Pick<Role, 'id' | 'name'>>}

export const RoleFragmentFragmentDoc = gql`
  fragment RoleFragment on Role {
    id
    name
    scopes
    createdAt
    updatedAt
  }
`
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    username
    firstName
    lastName
    roles {
      id
      name
    }
    scopes
  }
`
export const ListRolesDocument = gql`
  query listRoles($cursor: String) {
    listRoles(limit: 10, cursor: $cursor) {
      pageInfo {
        hasNextPage
        nextCursor
        prevCursor
      }
      edges {
        node {
          ...RoleFragment
        }
      }
    }
  }
  ${RoleFragmentFragmentDoc}
`

/**
 * __useListRolesQuery__
 *
 * To run a query within a React component, call `useListRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRolesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useListRolesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListRolesQuery, ListRolesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ListRolesQuery, ListRolesQueryVariables>(ListRolesDocument, baseOptions)
}
export function useListRolesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListRolesQuery, ListRolesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ListRolesQuery, ListRolesQueryVariables>(ListRolesDocument, baseOptions)
}
export type ListRolesQueryHookResult = ReturnType<typeof useListRolesQuery>
export type ListRolesLazyQueryHookResult = ReturnType<typeof useListRolesLazyQuery>
export type ListRolesQueryResult = ApolloReactCommon.QueryResult<ListRolesQuery, ListRolesQueryVariables>
export const GetRoleDocument = gql`
  query getRole($id: ID!) {
    getRole(id: $id) {
      ...RoleFragment
    }
  }
  ${RoleFragmentFragmentDoc}
`

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
  return ApolloReactHooks.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, baseOptions)
}
export function useGetRoleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, baseOptions)
}
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>
export type GetRoleQueryResult = ApolloReactCommon.QueryResult<GetRoleQuery, GetRoleQueryVariables>
export const CreateRoleDocument = gql`
  mutation createRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      ...RoleFragment
    }
  }
  ${RoleFragmentFragmentDoc}
`
export type CreateRoleMutationFn = ApolloReactCommon.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, baseOptions)
}
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>
export type CreateRoleMutationResult = ApolloReactCommon.MutationResult<CreateRoleMutation>
export type CreateRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRoleMutation,
  CreateRoleMutationVariables
>
export const UpdateRoleDocument = gql`
  mutation updateRole($id: ID!, $input: UpdateRoleInput!) {
    updateRole(id: $id, input: $input) {
      ...RoleFragment
    }
  }
  ${RoleFragmentFragmentDoc}
`
export type UpdateRoleMutationFn = ApolloReactCommon.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, baseOptions)
}
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>
export type UpdateRoleMutationResult = ApolloReactCommon.MutationResult<UpdateRoleMutation>
export type UpdateRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>
export const DeleteRoleDocument = gql`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id) {
      id
    }
  }
`
export type DeleteRoleMutationFn = ApolloReactCommon.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, baseOptions)
}
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>
export type DeleteRoleMutationResult = ApolloReactCommon.MutationResult<DeleteRoleMutation>
export type DeleteRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>
export const ListUsersDocument = gql`
  query listUsers($cursor: String) {
    listUsers(limit: 10, cursor: $cursor) {
      pageInfo {
        hasNextPage
        nextCursor
        prevCursor
      }
      edges {
        node {
          ...UserFragment
        }
      }
    }
  }
  ${UserFragmentFragmentDoc}
`

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useListUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions)
}
export function useListUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions)
}
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>
export type ListUsersQueryResult = ApolloReactCommon.QueryResult<ListUsersQuery, ListUsersQueryVariables>
export const GetUserDocument = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions)
}
export function useGetUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>
export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions)
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions)
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const DeleteUserDocument = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions)
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

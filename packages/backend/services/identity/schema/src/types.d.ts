import {GraphQLResolveInfo} from 'graphql'
import {RoleDocument, UserDocument} from './models'
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
  _FieldSet: any
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

export type City = {
  __typename?: 'City'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type CreateAccountInput = {
  name: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
}

export type CreateRoleInput = {
  name: Scalars['String']
  scopes?: Maybe<Array<Scalars['String']>>
}

export type CreateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username: Scalars['String']
  password: Scalars['String']
  roles?: Maybe<Array<Scalars['ID']>>
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
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
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
  deleteUser?: Maybe<User>
  updatePassword: Scalars['Boolean']
  login?: Maybe<Scalars['Boolean']>
  logout: Scalars['Boolean']
  switchAccount?: Maybe<Scalars['Boolean']>
  refreshToken?: Maybe<Scalars['Boolean']>
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
  listAccounts: AccountConnection
  getAccount?: Maybe<Account>
  listRoles: RoleConnection
  getRole?: Maybe<Role>
  listUsers: UserConnection
  listStations?: Maybe<Array<Maybe<Station>>>
  getUser?: Maybe<User>
  me?: Maybe<Me>
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

export type QueryInput = {
  field: Scalars['String']
  value?: Maybe<Scalars['String']>
  operator?: Maybe<OperatorEnum>
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

export type Station = {
  __typename?: 'Station'
  id: Scalars['ID']
  description?: Maybe<Scalars['String']>
  city?: Maybe<City>
}

export type UpdateAccountInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type UpdateRoleInput = {
  name?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['String']>>
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type User = UserInterface & {
  __typename?: 'User'
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
  __typename?: 'UserConnection'
  pageInfo: PageInfo
  edges: Array<UserEdge>
}

export type UserEdge = {
  __typename?: 'UserEdge'
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
  AccountConnection: ResolverTypeWrapper<
    Omit<AccountConnection, 'edges'> & {edges: Array<ResolversTypes['AccountEdge']>}
  >
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  AccountEdge: ResolverTypeWrapper<Omit<AccountEdge, 'node'> & {node: ResolversTypes['Account']}>
  Account: ResolverTypeWrapper<Omit<Account, 'users'> & {users?: Maybe<Array<ResolversTypes['User']>>}>
  ID: ResolverTypeWrapper<Scalars['ID']>
  User: ResolverTypeWrapper<UserDocument>
  UserInterface: ResolverTypeWrapper<
    Omit<UserInterface, 'accounts' | 'roles'> & {
      accounts: Array<ResolversTypes['Account']>
      roles: Array<ResolversTypes['Role']>
    }
  >
  Role: ResolverTypeWrapper<RoleDocument>
  RoleConnection: ResolverTypeWrapper<Omit<RoleConnection, 'edges'> & {edges: Array<ResolversTypes['RoleEdge']>}>
  RoleEdge: ResolverTypeWrapper<Omit<RoleEdge, 'node'> & {node: ResolversTypes['Role']}>
  UserConnection: ResolverTypeWrapper<Omit<UserConnection, 'edges'> & {edges: Array<ResolversTypes['UserEdge']>}>
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & {node: ResolversTypes['User']}>
  Station: ResolverTypeWrapper<Station>
  City: ResolverTypeWrapper<City>
  Me: ResolverTypeWrapper<UserDocument>
  Mutation: ResolverTypeWrapper<{}>
  CreateAccountInput: CreateAccountInput
  UpdateAccountInput: UpdateAccountInput
  CreateRoleInput: CreateRoleInput
  UpdateRoleInput: UpdateRoleInput
  CreateUserInput: CreateUserInput
  UpdateUserInput: UpdateUserInput
  UpdatePasswordInput: UpdatePasswordInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  String: Scalars['String']
  Int: Scalars['Int']
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  AccountConnection: Omit<AccountConnection, 'edges'> & {edges: Array<ResolversParentTypes['AccountEdge']>}
  PageInfo: PageInfo
  Boolean: Scalars['Boolean']
  AccountEdge: Omit<AccountEdge, 'node'> & {node: ResolversParentTypes['Account']}
  Account: Omit<Account, 'users'> & {users?: Maybe<Array<ResolversParentTypes['User']>>}
  ID: Scalars['ID']
  User: UserDocument
  UserInterface: Omit<UserInterface, 'accounts' | 'roles'> & {
    accounts: Array<ResolversParentTypes['Account']>
    roles: Array<ResolversParentTypes['Role']>
  }
  Role: RoleDocument
  RoleConnection: Omit<RoleConnection, 'edges'> & {edges: Array<ResolversParentTypes['RoleEdge']>}
  RoleEdge: Omit<RoleEdge, 'node'> & {node: ResolversParentTypes['Role']}
  UserConnection: Omit<UserConnection, 'edges'> & {edges: Array<ResolversParentTypes['UserEdge']>}
  UserEdge: Omit<UserEdge, 'node'> & {node: ResolversParentTypes['User']}
  Station: Station
  City: City
  Me: UserDocument
  Mutation: {}
  CreateAccountInput: CreateAccountInput
  UpdateAccountInput: UpdateAccountInput
  CreateRoleInput: CreateRoleInput
  UpdateRoleInput: UpdateRoleInput
  CreateUserInput: CreateUserInput
  UpdateUserInput: UpdateUserInput
  UpdatePasswordInput: UpdatePasswordInput
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  listAccounts?: Resolver<ResolversTypes['AccountConnection'], ParentType, ContextType, QueryListAccountsArgs>
  getAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAccountArgs, 'id'>
  >
  listRoles?: Resolver<ResolversTypes['RoleConnection'], ParentType, ContextType, QueryListRolesArgs>
  getRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryGetRoleArgs, 'id'>>
  listUsers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, QueryListUsersArgs>
  listStations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Station']>>>, ParentType, ContextType>
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>
}>

export type AccountConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AccountConnection'] = ResolversParentTypes['AccountConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['AccountEdge']>, ParentType, ContextType>
}>

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}>

export type AccountEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AccountEdge'] = ResolversParentTypes['AccountEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>
  scopes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

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
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
}>

export type RoleConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RoleConnection'] = ResolversParentTypes['RoleConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['RoleEdge']>, ParentType, ContextType>
}>

export type RoleEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RoleEdge'] = ResolversParentTypes['RoleEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Role'], ParentType, ContextType>
}>

export type UserConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>
}>

export type UserEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>
}>

export type StationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Station'] = ResolversParentTypes['Station']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>
}>

export type CityResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateAccountArgs, 'input'>
  >
  updateAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAccountArgs, 'id' | 'input'>
  >
  deleteAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAccountArgs, 'id'>
  >
  addUserToAccount?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddUserToAccountArgs, 'accountId' | 'userId'>
  >
  createRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoleArgs, 'input'>
  >
  updateRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoleArgs, 'id' | 'input'>
  >
  deleteRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRoleArgs, 'id'>
  >
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
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
  deleteUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'id'>
  >
  updatePassword?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePasswordArgs, 'id' | 'input'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  switchAccount?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSwitchAccountArgs, 'accountId'>
  >
  refreshToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  AccountConnection?: AccountConnectionResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  AccountEdge?: AccountEdgeResolvers<ContextType>
  Account?: AccountResolvers<ContextType>
  User?: UserResolvers<ContextType>
  UserInterface?: UserInterfaceResolvers
  Role?: RoleResolvers<ContextType>
  RoleConnection?: RoleConnectionResolvers<ContextType>
  RoleEdge?: RoleEdgeResolvers<ContextType>
  UserConnection?: UserConnectionResolvers<ContextType>
  UserEdge?: UserEdgeResolvers<ContextType>
  Station?: StationResolvers<ContextType>
  City?: CityResolvers<ContextType>
  Me?: MeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

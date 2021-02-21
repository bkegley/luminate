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
  theme?: Maybe<Theme>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addUserToAccount?: Maybe<Scalars['Boolean']>
  createAccount?: Maybe<Account>
  createRole?: Maybe<Role>
  createUser?: Maybe<User>
  deleteAccount?: Maybe<Account>
  deleteRole?: Maybe<Role>
  deleteUser?: Maybe<Scalars['Boolean']>
  login?: Maybe<Scalars['String']>
  logout: Scalars['Boolean']
  refreshToken?: Maybe<Scalars['String']>
  switchAccount?: Maybe<Scalars['Boolean']>
  updateAccount?: Maybe<Account>
  updateMe?: Maybe<User>
  updatePassword: Scalars['Boolean']
  updateRole?: Maybe<Role>
  updateUser?: Maybe<User>
  updateUserRoles?: Maybe<User>
}

export type MutationAddUserToAccountArgs = {
  accountId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationCreateAccountArgs = {
  input: CreateAccountInput
}

export type MutationCreateRoleArgs = {
  input: CreateRoleInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteAccountArgs = {
  id: Scalars['ID']
}

export type MutationDeleteRoleArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationLoginArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type MutationSwitchAccountArgs = {
  accountId: Scalars['ID']
}

export type MutationUpdateAccountArgs = {
  id: Scalars['ID']
  input: UpdateAccountInput
}

export type MutationUpdateMeArgs = {
  input?: Maybe<UpdateMeInput>
}

export type MutationUpdatePasswordArgs = {
  id: Scalars['ID']
  input: UpdatePasswordInput
}

export type MutationUpdateRoleArgs = {
  id: Scalars['ID']
  input: UpdateRoleInput
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  input: UpdateUserInput
}

export type MutationUpdateUserRolesArgs = {
  id: Scalars['ID']
  roles?: Maybe<Array<Scalars['ID']>>
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
  __typename?: 'PageInfo'
  hasNextPage?: Maybe<Scalars['Boolean']>
  nextCursor?: Maybe<Scalars['String']>
  prevCursor?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  getAccount?: Maybe<Account>
  getRole?: Maybe<Role>
  getUser?: Maybe<User>
  listAccounts: AccountConnection
  listRoles: RoleConnection
  listUsers: UserConnection
  me?: Maybe<Me>
}

export type QueryGetAccountArgs = {
  id: Scalars['ID']
}

export type QueryGetRoleArgs = {
  id: Scalars['ID']
}

export type QueryGetUserArgs = {
  id: Scalars['ID']
}

export type QueryListAccountsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListRolesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryListUsersArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<QueryInput>>
}

export type QueryInput = {
  field: Scalars['String']
  operator?: Maybe<OperatorEnum>
  value?: Maybe<Scalars['String']>
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

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type UpdateAccountInput = {
  name?: Maybe<Scalars['String']>
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
  theme?: Maybe<Theme>
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
  theme?: Maybe<Theme>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
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
  Account: ResolverTypeWrapper<Account>
  String: ResolverTypeWrapper<Scalars['String']>
  User: ResolverTypeWrapper<User>
  UserInterface: ResolversTypes['User'] | ResolversTypes['Me']
  Role: ResolverTypeWrapper<Role>
  Theme: Theme
  Int: ResolverTypeWrapper<Scalars['Int']>
  QueryInput: QueryInput
  OperatorEnum: OperatorEnum
  AccountConnection: ResolverTypeWrapper<AccountConnection>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  AccountEdge: ResolverTypeWrapper<AccountEdge>
  RoleConnection: ResolverTypeWrapper<RoleConnection>
  RoleEdge: ResolverTypeWrapper<RoleEdge>
  UserConnection: ResolverTypeWrapper<UserConnection>
  UserEdge: ResolverTypeWrapper<UserEdge>
  Me: ResolverTypeWrapper<Me>
  Mutation: ResolverTypeWrapper<{}>
  CreateAccountInput: CreateAccountInput
  CreateRoleInput: CreateRoleInput
  CreateUserInput: CreateUserInput
  UpdateAccountInput: UpdateAccountInput
  UpdateMeInput: UpdateMeInput
  UpdatePasswordInput: UpdatePasswordInput
  UpdateRoleInput: UpdateRoleInput
  UpdateUserInput: UpdateUserInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  ID: Scalars['ID']
  Account: Account
  String: Scalars['String']
  User: User
  UserInterface: ResolversParentTypes['User'] | ResolversParentTypes['Me']
  Role: Role
  Int: Scalars['Int']
  QueryInput: QueryInput
  AccountConnection: AccountConnection
  PageInfo: PageInfo
  Boolean: Scalars['Boolean']
  AccountEdge: AccountEdge
  RoleConnection: RoleConnection
  RoleEdge: RoleEdge
  UserConnection: UserConnection
  UserEdge: UserEdge
  Me: Me
  Mutation: {}
  CreateAccountInput: CreateAccountInput
  CreateRoleInput: CreateRoleInput
  CreateUserInput: CreateUserInput
  UpdateAccountInput: UpdateAccountInput
  UpdateMeInput: UpdateMeInput
  UpdatePasswordInput: UpdatePasswordInput
  UpdateRoleInput: UpdateRoleInput
  UpdateUserInput: UpdateUserInput
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
  getRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryGetRoleArgs, 'id'>>
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>
  listAccounts?: Resolver<
    ResolversTypes['AccountConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListAccountsArgs, never>
  >
  listRoles?: Resolver<
    ResolversTypes['RoleConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListRolesArgs, never>
  >
  listUsers?: Resolver<
    ResolversTypes['UserConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryListUsersArgs, never>
  >
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>
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

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    {__typename: 'User'} & GraphQLRecursivePick<ParentType, {id: true}>,
    ContextType
  >
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
  theme?: Resolver<Maybe<ResolversTypes['Theme']>, ParentType, ContextType>
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

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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
  createRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoleArgs, 'input'>
  >
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >
  deleteAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAccountArgs, 'id'>
  >
  deleteRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRoleArgs, 'id'>
  >
  deleteUser?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'id'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  switchAccount?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSwitchAccountArgs, 'accountId'>
  >
  updateAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAccountArgs, 'id' | 'input'>
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
  updateRole?: Resolver<
    Maybe<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoleArgs, 'id' | 'input'>
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
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Account?: AccountResolvers<ContextType>
  User?: UserResolvers<ContextType>
  UserInterface?: UserInterfaceResolvers<ContextType>
  Role?: RoleResolvers<ContextType>
  AccountConnection?: AccountConnectionResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  AccountEdge?: AccountEdgeResolvers<ContextType>
  RoleConnection?: RoleConnectionResolvers<ContextType>
  RoleEdge?: RoleEdgeResolvers<ContextType>
  UserConnection?: UserConnectionResolvers<ContextType>
  UserEdge?: UserEdgeResolvers<ContextType>
  Me?: MeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>

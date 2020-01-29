import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
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
  __typename: 'Coffee'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  country?: Maybe<Country>
  region?: Maybe<Region>
  varieties?: Maybe<Array<Maybe<Variety>>>
  elevation?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type CoffeeConnection = {
  __typename: 'CoffeeConnection'
  pageInfo: PageInfo
  edges: Array<CoffeeEdge>
}

export type CoffeeEdge = {
  __typename: 'CoffeeEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Coffee>
}

export type Country = {
  __typename: 'Country'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  regions?: Maybe<Array<Maybe<Region>>>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type CountryConnection = {
  __typename: 'CountryConnection'
  pageInfo: PageInfo
  edges: Array<CountryEdge>
}

export type CountryEdge = {
  __typename: 'CountryEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Country>
}

export type CreateCoffeeInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
  farm?: Maybe<Scalars['ID']>
  farmZone?: Maybe<Scalars['ID']>
  varieties?: Maybe<Array<Maybe<Scalars['ID']>>>
  elevation?: Maybe<Scalars['String']>
}

export type CreateCountryInput = {
  name?: Maybe<Scalars['String']>
}

export type CreateCuppingInput = {
  description?: Maybe<Scalars['String']>
}

export type CreateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
}

export type CreateFarmZoneInput = {
  name?: Maybe<Scalars['String']>
  farm?: Maybe<Scalars['ID']>
}

export type CreateRegionInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
}

export type CreateRoastInput = {
  name?: Maybe<Scalars['String']>
}

export type CreateRoleInput = {
  name: Scalars['String']
  scopes?: Maybe<Array<Scalars['ID']>>
}

export type CreateScopeInput = {
  resource: Scalars['String']
  operation: OperationEnum
}

export type CreateUserInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username: Scalars['String']
  password: Scalars['String']
  roles?: Maybe<Array<Scalars['ID']>>
}

export type CreateVarietyInput = {
  name?: Maybe<Scalars['String']>
}

export type Cupping = {
  __typename: 'Cupping'
  id: Scalars['ID']
  description?: Maybe<Scalars['String']>
  coffees?: Maybe<Array<Maybe<CuppingCoffee>>>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type CuppingCoffee = {
  __typename: 'CuppingCoffee'
  sessionCoffeeId: Scalars['ID']
  coffee: Coffee
}

export type CuppingCoffeeInput = {
  sessionCoffeeId: Scalars['ID']
  coffee?: Maybe<Scalars['ID']>
}

export type CuppingConnection = {
  __typename: 'CuppingConnection'
  pageInfo: PageInfo
  edges: Array<CuppingEdge>
}

export type CuppingEdge = {
  __typename: 'CuppingEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Cupping>
}

export type Farm = {
  __typename: 'Farm'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  country?: Maybe<Country>
  region?: Maybe<Region>
  farmZones?: Maybe<Array<Maybe<FarmZone>>>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type FarmConnection = {
  __typename: 'FarmConnection'
  pageInfo: PageInfo
  edges: Array<FarmEdge>
}

export type FarmEdge = {
  __typename: 'FarmEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Farm>
}

export type FarmZone = {
  __typename: 'FarmZone'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  country?: Maybe<Country>
  region?: Maybe<Region>
  farm?: Maybe<Farm>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type FarmZoneConnection = {
  __typename: 'FarmZoneConnection'
  pageInfo: PageInfo
  edges: Array<FarmZoneEdge>
}

export type FarmZoneEdge = {
  __typename: 'FarmZoneEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<FarmZone>
}

export type Mutation = {
  __typename: 'Mutation'
  createRole?: Maybe<Role>
  updateRole?: Maybe<Role>
  deleteRole?: Maybe<Role>
  createScope?: Maybe<Scope>
  updateScope?: Maybe<Scope>
  deleteScope?: Maybe<Scope>
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  deleteUser?: Maybe<User>
  updatePassword?: Maybe<Scalars['Boolean']>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']>
  createCoffee?: Maybe<Coffee>
  updateCoffee?: Maybe<Coffee>
  deleteCoffee?: Maybe<Coffee>
  createCountry?: Maybe<Country>
  updateCountry?: Maybe<Country>
  deleteCountry?: Maybe<Country>
  createFarm?: Maybe<Farm>
  updateFarm?: Maybe<Farm>
  deleteFarm?: Maybe<Farm>
  createFarmZone?: Maybe<FarmZone>
  updateFarmZone?: Maybe<FarmZone>
  deleteFarmZone?: Maybe<FarmZone>
  createRegion?: Maybe<Region>
  updateRegion?: Maybe<Region>
  deleteRegion?: Maybe<Region>
  createRoast?: Maybe<Roast>
  updateRoast?: Maybe<Roast>
  deleteRoast?: Maybe<Roast>
  createVariety?: Maybe<Variety>
  updateVariety?: Maybe<Variety>
  deleteVariety?: Maybe<Variety>
  createCupping?: Maybe<Cupping>
  updateCupping?: Maybe<Cupping>
  deleteCupping?: Maybe<Cupping>
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

export type MutationCreateScopeArgs = {
  input: CreateScopeInput
}

export type MutationUpdateScopeArgs = {
  id: Scalars['ID']
  input: UpdateScopeInput
}

export type MutationDeleteScopeArgs = {
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
  input: CreateFarmZoneInput
}

export type MutationUpdateFarmZoneArgs = {
  id: Scalars['ID']
  input: UpdateFarmZoneInput
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

export type MutationCreateRoastArgs = {
  input: CreateRoastInput
}

export type MutationUpdateRoastArgs = {
  id: Scalars['ID']
  input: UpdateRoastInput
}

export type MutationDeleteRoastArgs = {
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

export type MutationCreateCuppingArgs = {
  input: CreateCuppingInput
}

export type MutationUpdateCuppingArgs = {
  id: Scalars['ID']
  input: UpdateCuppingInput
}

export type MutationDeleteCuppingArgs = {
  id: Scalars['ID']
}

export enum OperationEnum {
  Read = 'read',
  Write = 'write',
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

export type Query = {
  __typename: 'Query'
  listRoles: RoleConnection
  getRole?: Maybe<Role>
  listScopes: ScopeConnection
  getScope?: Maybe<Scope>
  listUsers: UserConnection
  getUser?: Maybe<User>
  hydrateMe?: Maybe<User>
  listCoffees: CoffeeConnection
  getCoffee?: Maybe<Coffee>
  listCountries: CountryConnection
  getCountry?: Maybe<Country>
  listFarms: FarmConnection
  getFarm?: Maybe<Farm>
  listFarmZones: FarmZoneConnection
  getFarmZone?: Maybe<FarmZone>
  listRegions: RegionConnection
  getRegion?: Maybe<Region>
  listRoasts: RoastConnection
  getRoast?: Maybe<Roast>
  listVarieties: VarietyConnection
  getVariety?: Maybe<Variety>
  listCuppings: CuppingConnection
  getCupping?: Maybe<Cupping>
}

export type QueryListRolesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetRoleArgs = {
  id: Scalars['ID']
}

export type QueryListScopesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetScopeArgs = {
  id: Scalars['ID']
}

export type QueryListUsersArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetUserArgs = {
  id: Scalars['ID']
}

export type QueryListCoffeesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetCoffeeArgs = {
  id: Scalars['ID']
}

export type QueryListCountriesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetCountryArgs = {
  id: Scalars['ID']
}

export type QueryListFarmsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetFarmArgs = {
  id: Scalars['ID']
}

export type QueryListFarmZonesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetFarmZoneArgs = {
  id: Scalars['ID']
}

export type QueryListRegionsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetRegionArgs = {
  id: Scalars['ID']
}

export type QueryListRoastsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetRoastArgs = {
  id: Scalars['ID']
}

export type QueryListVarietiesArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetVarietyArgs = {
  id: Scalars['ID']
}

export type QueryListCuppingsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type QueryGetCuppingArgs = {
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
  name?: Maybe<Scalars['String']>
  country?: Maybe<Country>
  farms?: Maybe<Array<Maybe<Farm>>>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type RegionConnection = {
  __typename: 'RegionConnection'
  pageInfo: PageInfo
  edges: Array<RegionEdge>
}

export type RegionEdge = {
  __typename: 'RegionEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Region>
}

export type Roast = {
  __typename: 'Roast'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type RoastConnection = {
  __typename: 'RoastConnection'
  pageInfo: PageInfo
  edges: Array<RoastEdge>
}

export type RoastEdge = {
  __typename: 'RoastEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Roast>
}

export type Role = {
  __typename: 'Role'
  id: Scalars['ID']
  name: Scalars['String']
  scopes?: Maybe<Array<Scope>>
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
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Role>
}

export type Scope = {
  __typename: 'Scope'
  id: Scalars['ID']
  name: Scalars['String']
  resource?: Maybe<Scalars['String']>
  operation?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type ScopeConnection = {
  __typename: 'ScopeConnection'
  pageInfo: PageInfo
  edges: Array<ScopeEdge>
}

export type ScopeEdge = {
  __typename: 'ScopeEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Scope>
}

export type UpdateCoffeeInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
  farm?: Maybe<Scalars['ID']>
  farmZone?: Maybe<Scalars['ID']>
  varieties?: Maybe<Array<Maybe<Scalars['ID']>>>
  elevation?: Maybe<Scalars['String']>
}

export type UpdateCountryInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateCuppingInput = {
  description?: Maybe<Scalars['String']>
  coffees?: Maybe<Array<Maybe<CuppingCoffeeInput>>>
}

export type UpdateFarmInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
  region?: Maybe<Scalars['ID']>
}

export type UpdateFarmZoneInput = {
  name?: Maybe<Scalars['String']>
  farm?: Maybe<Scalars['ID']>
}

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type UpdateRegionInput = {
  name?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['ID']>
}

export type UpdateRoastInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateRoleInput = {
  name?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['ID']>>
}

export type UpdateScopeInput = {
  resource: Scalars['String']
  operation: OperationEnum
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
  username?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<Role>>>
  scopes?: Maybe<Array<Maybe<Scope>>>
}

export type UserConnection = {
  __typename: 'UserConnection'
  pageInfo: PageInfo
  edges: Array<UserEdge>
}

export type UserEdge = {
  __typename: 'UserEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<User>
}

export type Variety = {
  __typename: 'Variety'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  background?: Maybe<Scalars['String']>
  coffees?: Maybe<Array<Maybe<Coffee>>>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type VarietyConnection = {
  __typename: 'VarietyConnection'
  pageInfo: PageInfo
  edges: Array<VarietyEdge>
}

export type VarietyEdge = {
  __typename: 'VarietyEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Variety>
}

export type ListCoffeesQueryVariables = {}

export type ListCoffeesQuery = {__typename: 'Query'} & {
  listCoffees: {__typename: 'CoffeeConnection'} & {
    edges: Array<{__typename: 'CoffeeEdge'} & {node: Maybe<{__typename: 'Coffee'} & Pick<Coffee, 'id' | 'name'>>}>
  }
}

export type GetCoffeeQueryVariables = {
  id: Scalars['ID']
}

export type GetCoffeeQuery = {__typename: 'Query'} & {getCoffee: Maybe<{__typename: 'Coffee'} & CoffeeFragmentFragment>}

export type UpdateCoffeeMutationVariables = {
  id: Scalars['ID']
  input: UpdateCoffeeInput
}

export type UpdateCoffeeMutation = {__typename: 'Mutation'} & {
  updateCoffee: Maybe<{__typename: 'Coffee'} & CoffeeFragmentFragment>
}

export type CoffeeFragmentFragment = {__typename: 'Coffee'} & Pick<
  Coffee,
  'id' | 'name' | 'elevation' | 'createdAt' | 'updatedAt'
> & {
    country: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
    region: Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>
    varieties: Maybe<Array<Maybe<{__typename: 'Variety'} & Pick<Variety, 'id' | 'name'>>>>
  }

export type ListCountriesQueryVariables = {}

export type ListCountriesQuery = {__typename: 'Query'} & {
  listCountries: {__typename: 'CountryConnection'} & {
    edges: Array<{__typename: 'CountryEdge'} & {node: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>}>
  }
}

export type GetCountryQueryVariables = {
  id: Scalars['ID']
}

export type GetCountryQuery = {__typename: 'Query'} & {
  getCountry: Maybe<{__typename: 'Country'} & CountryFragmentFragment>
}

export type CreateCountryMutationVariables = {
  input: CreateCountryInput
}

export type CreateCountryMutation = {__typename: 'Mutation'} & {
  createCountry: Maybe<{__typename: 'Country'} & CountryFragmentFragment>
}

export type UpdateCountryMutationVariables = {
  id: Scalars['ID']
  input: UpdateCountryInput
}

export type UpdateCountryMutation = {__typename: 'Mutation'} & {
  updateCountry: Maybe<{__typename: 'Country'} & CountryFragmentFragment>
}

export type CountryFragmentFragment = {__typename: 'Country'} & Pick<
  Country,
  'id' | 'name' | 'createdAt' | 'updatedAt'
> & {regions: Maybe<Array<Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>>>}

export type ListFarmsQueryVariables = {}

export type ListFarmsQuery = {__typename: 'Query'} & {
  listFarms: {__typename: 'FarmConnection'} & {
    edges: Array<{__typename: 'FarmEdge'} & {node: Maybe<{__typename: 'Farm'} & Pick<Farm, 'id' | 'name'>>}>
  }
}

export type GetFarmQueryVariables = {
  id: Scalars['ID']
}

export type GetFarmQuery = {__typename: 'Query'} & {getFarm: Maybe<{__typename: 'Farm'} & FarmFragmentFragment>}

export type CreateFarmMutationVariables = {
  input: CreateFarmInput
}

export type CreateFarmMutation = {__typename: 'Mutation'} & {
  createFarm: Maybe<{__typename: 'Farm'} & FarmFragmentFragment>
}

export type UpdateFarmMutationVariables = {
  id: Scalars['ID']
  input: UpdateFarmInput
}

export type UpdateFarmMutation = {__typename: 'Mutation'} & {
  updateFarm: Maybe<{__typename: 'Farm'} & FarmFragmentFragment>
}

export type FarmFragmentFragment = {__typename: 'Farm'} & Pick<Farm, 'id' | 'name' | 'createdAt' | 'updatedAt'> & {
    country: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
    region: Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>
    farmZones: Maybe<Array<Maybe<{__typename: 'FarmZone'} & Pick<FarmZone, 'id' | 'name' | 'createdAt' | 'updatedAt'>>>>
  }

export type ListRegionsQueryVariables = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  query?: Maybe<Array<Maybe<QueryInput>>>
}

export type ListRegionsQuery = {__typename: 'Query'} & {
  listRegions: {__typename: 'RegionConnection'} & {
    edges: Array<{__typename: 'RegionEdge'} & {node: Maybe<{__typename: 'Region'} & Pick<Region, 'id' | 'name'>>}>
  }
}

export type GetRegionQueryVariables = {
  id: Scalars['ID']
}

export type GetRegionQuery = {__typename: 'Query'} & {getRegion: Maybe<{__typename: 'Region'} & RegionFragmentFragment>}

export type CreateRegionMutationVariables = {
  input: CreateRegionInput
}

export type CreateRegionMutation = {__typename: 'Mutation'} & {
  createRegion: Maybe<{__typename: 'Region'} & RegionFragmentFragment>
}

export type UpdateRegionMutationVariables = {
  id: Scalars['ID']
  input: UpdateRegionInput
}

export type UpdateRegionMutation = {__typename: 'Mutation'} & {
  updateRegion: Maybe<{__typename: 'Region'} & RegionFragmentFragment>
}

export type RegionFragmentFragment = {__typename: 'Region'} & Pick<
  Region,
  'id' | 'name' | 'createdAt' | 'updatedAt'
> & {
    country: Maybe<{__typename: 'Country'} & Pick<Country, 'id' | 'name'>>
    farms: Maybe<Array<Maybe<{__typename: 'Farm'} & Pick<Farm, 'id'>>>>
  }

export type LoginMutationVariables = {
  username: Scalars['String']
  password: Scalars['String']
}

export type LoginMutation = {__typename: 'Mutation'} & {
  login: Maybe<{__typename: 'User'} & Pick<User, 'id' | 'username' | 'firstName' | 'lastName'>>
}

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
    createdAt
    updatedAt
  }
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
      createdAt
      updatedAt
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
    }
    createdAt
    updatedAt
  }
`
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListCoffeesQuery, ListCoffeesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ListCoffeesQuery, ListCoffeesQueryVariables>(ListCoffeesDocument, baseOptions)
}
export function useListCoffeesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListCoffeesQuery, ListCoffeesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ListCoffeesQuery, ListCoffeesQueryVariables>(ListCoffeesDocument, baseOptions)
}
export type ListCoffeesQueryHookResult = ReturnType<typeof useListCoffeesQuery>
export type ListCoffeesLazyQueryHookResult = ReturnType<typeof useListCoffeesLazyQuery>
export type ListCoffeesQueryResult = ApolloReactCommon.QueryResult<ListCoffeesQuery, ListCoffeesQueryVariables>
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
export function useGetCoffeeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, baseOptions)
}
export function useGetCoffeeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, baseOptions)
}
export type GetCoffeeQueryHookResult = ReturnType<typeof useGetCoffeeQuery>
export type GetCoffeeLazyQueryHookResult = ReturnType<typeof useGetCoffeeLazyQuery>
export type GetCoffeeQueryResult = ApolloReactCommon.QueryResult<GetCoffeeQuery, GetCoffeeQueryVariables>
export const UpdateCoffeeDocument = gql`
  mutation UpdateCoffee($id: ID!, $input: UpdateCoffeeInput!) {
    updateCoffee(id: $id, input: $input) {
      ...CoffeeFragment
    }
  }
  ${CoffeeFragmentFragmentDoc}
`
export type UpdateCoffeeMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCoffeeMutation,
  UpdateCoffeeMutationVariables
>

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCoffeeMutation, UpdateCoffeeMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateCoffeeMutation, UpdateCoffeeMutationVariables>(
    UpdateCoffeeDocument,
    baseOptions,
  )
}
export type UpdateCoffeeMutationHookResult = ReturnType<typeof useUpdateCoffeeMutation>
export type UpdateCoffeeMutationResult = ApolloReactCommon.MutationResult<UpdateCoffeeMutation>
export type UpdateCoffeeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCoffeeMutation,
  UpdateCoffeeMutationVariables
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, baseOptions)
}
export function useListCountriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ListCountriesQuery, ListCountriesQueryVariables>(
    ListCountriesDocument,
    baseOptions,
  )
}
export type ListCountriesQueryHookResult = ReturnType<typeof useListCountriesQuery>
export type ListCountriesLazyQueryHookResult = ReturnType<typeof useListCountriesLazyQuery>
export type ListCountriesQueryResult = ApolloReactCommon.QueryResult<ListCountriesQuery, ListCountriesQueryVariables>
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
export function useGetCountryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCountryQuery, GetCountryQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, baseOptions)
}
export function useGetCountryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, baseOptions)
}
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>
export type GetCountryLazyQueryHookResult = ReturnType<typeof useGetCountryLazyQuery>
export type GetCountryQueryResult = ApolloReactCommon.QueryResult<GetCountryQuery, GetCountryQueryVariables>
export const CreateCountryDocument = gql`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`
export type CreateCountryMutationFn = ApolloReactCommon.MutationFunction<
  CreateCountryMutation,
  CreateCountryMutationVariables
>

/**
 * __useCreateCountryMutation__
 *
 * To run a mutation, you first call `useCreateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCountryMutation, { data, loading, error }] = useCreateCountryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCountryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCountryMutation, CreateCountryMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateCountryMutation, CreateCountryMutationVariables>(
    CreateCountryDocument,
    baseOptions,
  )
}
export type CreateCountryMutationHookResult = ReturnType<typeof useCreateCountryMutation>
export type CreateCountryMutationResult = ApolloReactCommon.MutationResult<CreateCountryMutation>
export type CreateCountryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCountryMutation,
  CreateCountryMutationVariables
>
export const UpdateCountryDocument = gql`
  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {
    updateCountry(id: $id, input: $input) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`
export type UpdateCountryMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCountryMutation,
  UpdateCountryMutationVariables
>

/**
 * __useUpdateCountryMutation__
 *
 * To run a mutation, you first call `useUpdateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCountryMutation, { data, loading, error }] = useUpdateCountryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCountryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCountryMutation, UpdateCountryMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateCountryMutation, UpdateCountryMutationVariables>(
    UpdateCountryDocument,
    baseOptions,
  )
}
export type UpdateCountryMutationHookResult = ReturnType<typeof useUpdateCountryMutation>
export type UpdateCountryMutationResult = ApolloReactCommon.MutationResult<UpdateCountryMutation>
export type UpdateCountryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCountryMutation,
  UpdateCountryMutationVariables
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
export function useListFarmsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListFarmsQuery, ListFarmsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ListFarmsQuery, ListFarmsQueryVariables>(ListFarmsDocument, baseOptions)
}
export function useListFarmsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListFarmsQuery, ListFarmsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ListFarmsQuery, ListFarmsQueryVariables>(ListFarmsDocument, baseOptions)
}
export type ListFarmsQueryHookResult = ReturnType<typeof useListFarmsQuery>
export type ListFarmsLazyQueryHookResult = ReturnType<typeof useListFarmsLazyQuery>
export type ListFarmsQueryResult = ApolloReactCommon.QueryResult<ListFarmsQuery, ListFarmsQueryVariables>
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
export function useGetFarmQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFarmQuery, GetFarmQueryVariables>) {
  return ApolloReactHooks.useQuery<GetFarmQuery, GetFarmQueryVariables>(GetFarmDocument, baseOptions)
}
export function useGetFarmLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFarmQuery, GetFarmQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetFarmQuery, GetFarmQueryVariables>(GetFarmDocument, baseOptions)
}
export type GetFarmQueryHookResult = ReturnType<typeof useGetFarmQuery>
export type GetFarmLazyQueryHookResult = ReturnType<typeof useGetFarmLazyQuery>
export type GetFarmQueryResult = ApolloReactCommon.QueryResult<GetFarmQuery, GetFarmQueryVariables>
export const CreateFarmDocument = gql`
  mutation CreateFarm($input: CreateFarmInput!) {
    createFarm(input: $input) {
      ...FarmFragment
    }
  }
  ${FarmFragmentFragmentDoc}
`
export type CreateFarmMutationFn = ApolloReactCommon.MutationFunction<CreateFarmMutation, CreateFarmMutationVariables>

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFarmMutation, CreateFarmMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateFarmMutation, CreateFarmMutationVariables>(CreateFarmDocument, baseOptions)
}
export type CreateFarmMutationHookResult = ReturnType<typeof useCreateFarmMutation>
export type CreateFarmMutationResult = ApolloReactCommon.MutationResult<CreateFarmMutation>
export type CreateFarmMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateFarmMutation,
  CreateFarmMutationVariables
>
export const UpdateFarmDocument = gql`
  mutation UpdateFarm($id: ID!, $input: UpdateFarmInput!) {
    updateFarm(id: $id, input: $input) {
      ...FarmFragment
    }
  }
  ${FarmFragmentFragmentDoc}
`
export type UpdateFarmMutationFn = ApolloReactCommon.MutationFunction<UpdateFarmMutation, UpdateFarmMutationVariables>

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFarmMutation, UpdateFarmMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateFarmMutation, UpdateFarmMutationVariables>(UpdateFarmDocument, baseOptions)
}
export type UpdateFarmMutationHookResult = ReturnType<typeof useUpdateFarmMutation>
export type UpdateFarmMutationResult = ApolloReactCommon.MutationResult<UpdateFarmMutation>
export type UpdateFarmMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateFarmMutation,
  UpdateFarmMutationVariables
>
export const ListRegionsDocument = gql`
  query ListRegions($cursor: String, $limit: Int, $query: [QueryInput]) {
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListRegionsQuery, ListRegionsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ListRegionsQuery, ListRegionsQueryVariables>(ListRegionsDocument, baseOptions)
}
export function useListRegionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListRegionsQuery, ListRegionsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ListRegionsQuery, ListRegionsQueryVariables>(ListRegionsDocument, baseOptions)
}
export type ListRegionsQueryHookResult = ReturnType<typeof useListRegionsQuery>
export type ListRegionsLazyQueryHookResult = ReturnType<typeof useListRegionsLazyQuery>
export type ListRegionsQueryResult = ApolloReactCommon.QueryResult<ListRegionsQuery, ListRegionsQueryVariables>
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
export function useGetRegionQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetRegionQuery, GetRegionQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetRegionQuery, GetRegionQueryVariables>(GetRegionDocument, baseOptions)
}
export function useGetRegionLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRegionQuery, GetRegionQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetRegionQuery, GetRegionQueryVariables>(GetRegionDocument, baseOptions)
}
export type GetRegionQueryHookResult = ReturnType<typeof useGetRegionQuery>
export type GetRegionLazyQueryHookResult = ReturnType<typeof useGetRegionLazyQuery>
export type GetRegionQueryResult = ApolloReactCommon.QueryResult<GetRegionQuery, GetRegionQueryVariables>
export const CreateRegionDocument = gql`
  mutation CreateRegion($input: CreateRegionInput!) {
    createRegion(input: $input) {
      ...RegionFragment
    }
  }
  ${RegionFragmentFragmentDoc}
`
export type CreateRegionMutationFn = ApolloReactCommon.MutationFunction<
  CreateRegionMutation,
  CreateRegionMutationVariables
>

/**
 * __useCreateRegionMutation__
 *
 * To run a mutation, you first call `useCreateRegionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRegionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRegionMutation, { data, loading, error }] = useCreateRegionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRegionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRegionMutation, CreateRegionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateRegionMutation, CreateRegionMutationVariables>(
    CreateRegionDocument,
    baseOptions,
  )
}
export type CreateRegionMutationHookResult = ReturnType<typeof useCreateRegionMutation>
export type CreateRegionMutationResult = ApolloReactCommon.MutationResult<CreateRegionMutation>
export type CreateRegionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRegionMutation,
  CreateRegionMutationVariables
>
export const UpdateRegionDocument = gql`
  mutation UpdateRegion($id: ID!, $input: UpdateRegionInput!) {
    updateRegion(id: $id, input: $input) {
      ...RegionFragment
    }
  }
  ${RegionFragmentFragmentDoc}
`
export type UpdateRegionMutationFn = ApolloReactCommon.MutationFunction<
  UpdateRegionMutation,
  UpdateRegionMutationVariables
>

/**
 * __useUpdateRegionMutation__
 *
 * To run a mutation, you first call `useUpdateRegionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRegionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRegionMutation, { data, loading, error }] = useUpdateRegionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRegionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRegionMutation, UpdateRegionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateRegionMutation, UpdateRegionMutationVariables>(
    UpdateRegionDocument,
    baseOptions,
  )
}
export type UpdateRegionMutationHookResult = ReturnType<typeof useUpdateRegionMutation>
export type UpdateRegionMutationResult = ApolloReactCommon.MutationResult<UpdateRegionMutation>
export type UpdateRegionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateRegionMutation,
  UpdateRegionMutationVariables
>
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      firstName
      lastName
    }
  }
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>

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
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>

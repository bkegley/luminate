import gql from 'graphql-tag'
export const RoleFragment = gql`
  fragment RoleFragment on Role {
    id
    name
    scopes {
      id
      name
      resource
      operation
    }
    createdAt
    updatedAt
  }
`
export const ScopeFragment = gql`
  fragment ScopeFragment on Scope {
    id
    name
    resource
    operation
    createdAt
    updatedAt
  }
`
export const UserFragment = gql`
  fragment UserFragment on User {
    id
    username
    firstName
    lastName
    roles {
      id
      name
    }
    scopes {
      id
      name
      resource
      operation
    }
  }
`
export const ListRolesGql = gql`
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
  ${RoleFragment}
`
export const GetRoleGql = gql`
  query getRole($id: ID!) {
    getRole(id: $id) {
      ...RoleFragment
    }
  }
  ${RoleFragment}
`
export const CreateRoleGql = gql`
  mutation createRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      ...RoleFragment
    }
  }
  ${RoleFragment}
`
export const UpdateRoleGql = gql`
  mutation updateRole($id: ID!, $input: UpdateRoleInput!) {
    updateRole(id: $id, input: $input) {
      ...RoleFragment
    }
  }
  ${RoleFragment}
`
export const DeleteRoleGql = gql`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id) {
      id
    }
  }
`
export const ListScopesGql = gql`
  query listScopes($cursor: String) {
    listScopes(limit: 10, cursor: $cursor) {
      pageInfo {
        hasNextPage
        nextCursor
        prevCursor
      }
      edges {
        node {
          ...ScopeFragment
        }
      }
    }
  }
  ${ScopeFragment}
`
export const GetScopeGql = gql`
  query getScope($id: ID!) {
    getScope(id: $id) {
      ...ScopeFragment
    }
  }
  ${ScopeFragment}
`
export const CreateScopeGql = gql`
  mutation createScope($input: CreateScopeInput!) {
    createScope(input: $input) {
      ...ScopeFragment
    }
  }
  ${ScopeFragment}
`
export const UpdateScopeGql = gql`
  mutation updateScope($id: ID!, $input: UpdateScopeInput!) {
    updateScope(id: $id, input: $input) {
      ...ScopeFragment
    }
  }
  ${ScopeFragment}
`
export const DeleteScopeGql = gql`
  mutation deleteScope($id: ID!) {
    deleteScope(id: $id) {
      id
    }
  }
`
export const ListUsersGql = gql`
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
  ${UserFragment}
`
export const GetUserGql = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
export const CreateUserGql = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
export const UpdateUserGql = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
export const DeleteUserGql = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

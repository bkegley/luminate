import gql from 'graphql-tag'
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
export const HydrateMeGql = gql`
  query hydrateMe {
    hydrateMe {
      ...UserFragment
    }
  }
  ${UserFragment}
`
export const LoginGql = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
export const LogoutGql = gql`
  mutation logout {
    logout
  }
`

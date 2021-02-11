import React from 'react'
import {UserProvider} from './src/context'
import {ApolloProvider, HttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import createClient from './src/createClient'
import 'typeface-inter'

const Wrapper = ({children, authWrapper, uri}) => {
  const [token, setToken] = React.useState()
  const link = new HttpLink({uri})

  const setAuthorizationLink = React.useCallback(
    () =>
      setContext((_request, previousContext) => {
        return {
          headers: {
            ...previousContext.headers,
            authorization: `Bearer ${token}`,
          },
        }
      }),
    [token],
  )

  const client = createClient({link: setAuthorizationLink.concat(link)})

  return (
    <ApolloProvider client={client}>
      {authWrapper ? <UserProvider setToken={setToken}>{children}</UserProvider> : children}
    </ApolloProvider>
  )
}

export const wrapRootElement = ({element}, {authWrapper = true, uri = 'http://localhost:3000/graphql'}) => {
  return (
    <Wrapper authWrapper={authWrapper} uri={uri}>
      {element}
    </Wrapper>
  )
}

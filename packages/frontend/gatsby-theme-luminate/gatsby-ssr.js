import React from 'react'
import {UserProvider} from './src/context'
import {ApolloProvider} from '@apollo/client'
import createClient from './src/createClient'
import fetch from 'cross-fetch'

export const wrapRootElement = ({element}, {authWrapper = true, uri = 'http://localhost:3000/graphql'}) => {
  const client = createClient({uri, fetch})
  return (
    <ApolloProvider client={client}>
      {authWrapper ? <UserProvider>{element}</UserProvider> : element}
      {element}
    </ApolloProvider>
  )
}

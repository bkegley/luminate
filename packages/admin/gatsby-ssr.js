import React from 'react'
import {ApolloProvider} from '@apollo/react-hooks'
import createClient from './src/createClient'
import fetch from 'cross-fetch'

const client = createClient({uri: 'http://localhost:3000/graphql', fetch})

export const wrapRootElement = ({element}) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

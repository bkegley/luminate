import React from 'react'
import {ApolloProvider} from '@apollo/react-hooks'
import createClient from './src/createClient'

const client = createClient({uri: 'http://localhost:3000/graphql'})

export const wrapRootElement = ({element}) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

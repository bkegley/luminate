import React from 'react'
import {UserProvider} from './src/context'
import {ApolloProvider} from '@apollo/react-hooks'
import createClient from './src/createClient'
import {ThemeProvider} from 'theme-ui'
import theme from './src/theme'
import fetch from 'cross-fetch'

export const wrapRootElement = ({element}, {authWrapper = true, uri = 'http://localhost:3000/graphql'}) => {
  const client = createClient({uri, fetch})
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        {authWrapper ? <UserProvider>{element}</UserProvider> : element}
        {element}
      </ApolloProvider>
    </ThemeProvider>
  )
}

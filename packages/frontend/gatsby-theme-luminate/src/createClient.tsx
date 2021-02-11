import {ApolloClient, ApolloClientOptions, InMemoryCache} from '@apollo/client'

const cache = new InMemoryCache()

const createClient = (config: ApolloClientOptions<any>) => {
  return new ApolloClient({...config, cache})
}

export default createClient

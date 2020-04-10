import ApolloClient, {PresetConfig} from 'apollo-boost'

const createClient = (config: PresetConfig) => {
  return new ApolloClient({...config, credentials: 'include'})
}

export default createClient

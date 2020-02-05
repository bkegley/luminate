import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {ScopeDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Scope {
    id: ID!
    name: String!
    resource: String
    operation: String
    category: String
    createdAt: String!
    updatedAt: String!
  }

  type ScopeConnection {
    pageInfo: PageInfo!
    edges: [ScopeEdge!]!
  }

  type ScopeEdge {
    cursor: String
    node: Scope
  }

  enum OperationEnum {
    read
    write
  }

  input CreateScopeInput {
    resource: String!
    operation: OperationEnum!
  }

  input UpdateScopeInput {
    resource: String!
    operation: OperationEnum!
  }

  extend type Query {
    listScopes(cursor: String, limit: Int, query: [QueryInput]): ScopeConnection!
    getScope(id: ID!): Scope
  }

  extend type Mutation {
    createScope(input: CreateScopeInput!): Scope
    updateScope(id: ID!, input: UpdateScopeInput!): Scope
    deleteScope(id: ID!): Scope
  }
`

const resolvers: Resolvers = {
  Query: {
    listScopes: async (parent, args, {models, user}) => {
      const {Scope} = models
      const results = await createConnectionResults({user, args, model: Scope})
      return results
    },
    getScope: async (parent, {id}, {loaders}, info) => {
      const {scopes} = loaders
      return scopes.load(id)
    },
  },
  Mutation: {
    createScope: async (parent, {input}, {models, user}) => {
      const {Scope} = models
      const scope = await Scope.createByUser(user, {...input, type: ['scope']})
      return scope
    },
    updateScope: async (parent, {id, input}, {models, user}) => {
      const {Scope} = models
      const scope = await Scope.findByIdAndUpdateByUser(user, id, input, {new: true})
      return scope
    },
    deleteScope: async (parent, {id}, {models, user}) => {
      const {Scope} = models
      const scope = await Scope.findByIdAndDeleteByUser(user, id, {})
      if (!scope) {
        throw new ApolloError('Document not found')
      }
      return scope
    },
  },
}

export interface ScopeLoaders {
  scopes: LoaderFn<ScopeDocument>
}

export const loaders: ScopeLoaders = {
  scopes: async (ids, models, user) => {
    const {Scope} = models
    const scopes = await Scope.findByUser(user, {_id: ids})
    return ids.map(id => {
      const scope = scopes.find(scope => scope._id.toString() === id.toString())
      if (!scope) return null
      return scope
    })
  },
}

export const schema = {typeDefs, resolvers}

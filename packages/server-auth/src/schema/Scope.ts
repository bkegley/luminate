import {gql} from 'apollo-server-express'
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
    listScopes: async (parent, args, {models}) => {
      const {Scope} = models
      const results = await createConnectionResults({args, model: Scope})
      return results
    },
    getScope: async (parent, {id}, {loaders}, info) => {
      const {scopes} = loaders
      return scopes.load(id)
    },
  },
  Mutation: {
    createScope: async (parent, {input}, {models}) => {
      const {Scope} = models
      const scope = await new Scope({...input, type: ['scope']}).save()
      return scope
    },
    updateScope: async (parent, {id, input}, {models}) => {
      const {Scope} = models
      const scope = await Scope.findByIdAndUpdate(id, input, {new: true})
      return scope
    },
    deleteScope: async (parent, {id}, {models}) => {
      const {Scope} = models
      const scope = await Scope.findByIdAndDelete(id)
      return scope
    },
  },
}

export interface ScopeLoaders {
  scopes: LoaderFn<ScopeDocument>
}

export const loaders: ScopeLoaders = {
  scopes: async (ids, models) => {
    const {Scope} = models
    const scopes = await Scope.find({_id: ids})
    return ids.map(id => {
      const scope = scopes.find(scope => scope._id.toString() === id.toString())
      if (!scope) throw new Error('Document not found')
      return scope
    })
  },
}

export const schema = {typeDefs, resolvers}

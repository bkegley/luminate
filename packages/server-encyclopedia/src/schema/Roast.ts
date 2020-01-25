import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {RoastDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Roast @key(fields: "id") {
    id: ID!
    name: String
    createdAt: String
    updatedAt: String
  }

  type RoastConnection {
    pageInfo: PageInfo!
    edges: [RoastEdge!]!
  }

  type RoastEdge {
    cursor: String
    node: Roast
  }

  input CreateRoastInput {
    name: String
  }

  input UpdateRoastInput {
    name: String
  }

  extend type Query {
    listRoasts(cursor: String, limit: Int, query: [QueryInput]): RoastConnection!
    getRoast(id: ID!): Roast
  }

  extend type Mutation {
    createRoast(input: CreateRoastInput!): Roast
    updateRoast(id: ID!, input: UpdateRoastInput!): Roast
    deleteRoast(id: ID!): Roast
  }
`

const resolvers: Resolvers = {
  Query: {
    listRoasts: async (parent, args, {models}) => {
      const {Roast} = models
      const results = await createConnectionResults({args, model: Roast})
      return results
    },
    getRoast: async (parent, {id}, {loaders}, info) => {
      const {roasts} = loaders
      return roasts.load(id)
    },
  },
  Mutation: {
    createRoast: async (parent, {input}, {models}) => {
      const {Roast} = models
      const roast = await new Roast(input).save()
      return roast
    },
    updateRoast: async (parent, {id, input}, {models}) => {
      const {Roast} = models
      const roast = await Roast.findByIdAndUpdate(id, input, {new: true})
      return roast
    },
    deleteRoast: async (parent, {id}, {models}) => {
      const {Roast} = models
      const roast = await Roast.findByIdAndDelete(id)
      return roast
    },
  },
  Roast: {
    __resolveReference: (object, {loaders}) => {
      const {roasts} = loaders
      return roasts.load(object.id)
    },
  },
}

export interface RoastLoaders {
  roasts: LoaderFn<RoastDocument>
}

export const loaders: RoastLoaders = {
  roasts: async (ids, models) => {
    const {Roast} = models
    const roasts = await Roast.find({_id: ids})
    return ids.map(id => {
      const roast = roasts.find(roast => roast._id.toString() === id.toString())
      if (!roast) throw new Error('Document not found')
      return roast
    })
  },
}

export const schema = {typeDefs, resolvers}

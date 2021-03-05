import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {VarietyMapper} from '../../infra/mappers'
import {CreateVarietyInput} from '../../types'
import {GetVarietyQuery, ListVarietiesQuery} from '../queries'

@Resolver('Variety')
export class VarietyResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listVarieties')
  async listVarieties() {
    const query = new ListVarietiesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getVariety')
  async getVariety(@Args('id') id: string) {
    const query = new GetVarietyQuery(id)
    const variety = await this.queryBus.execute(query)

    return VarietyMapper.toDTO(variety)
  }

  @Mutation('createVariety')
  async createVariety(@Args('input') input: CreateVarietyInput) {}

  @Mutation('updateVariety')
  async updateVariety(@Args('id') id: string, @Args('input') input: CreateVarietyInput) {}

  @Mutation('deleteVariety')
  async deleteVariety(@Args('id') id: string) {}
}
//import {gql} from 'apollo-server-express'
//import {Resolvers} from '../types'

//const resolvers: Resolvers = {
//Query: {
//listVarieties: async (parent, args, {services}) => {
//return services.variety.getConnectionResults(args)
//},
//getVariety: async (parent, {id}, {services}) => {
//return services.variety.getById(id)
//},
//},
//Mutation: {
//createVariety: async (parent, {input}, {services}) => {
//return services.variety.create(input)
//},
//updateVariety: async (parent, {id, input}, {services}) => {
//return services.variety.updateById(id, input)
//},
//deleteVariety: async (parent, {id}, {services}) => {
//return services.variety.deleteById(id)
//},
//makeVarietyPublic: async (parent, {id}, {services}) => {
//// TODO: implement this
//return false
//// const {Variety} = models
//// const variety = await Variety.makeEntityPublicByUser(user, id)
//// return !!variety
//},
//},
//Variety: {
//coffees: async (parent, args, {services}) => {
//return services.coffee.listByVarietyId(parent.id)
//},
//},
//}

//export const schema = {typeDefs, resolvers}

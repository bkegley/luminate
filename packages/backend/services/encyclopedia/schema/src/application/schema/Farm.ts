import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Query, Resolver} from '@nestjs/graphql'
import {FarmMapper} from '../../infra/mappers'
import {GetFarmQuery, ListFarmsQuery} from '../queries'

@Resolver('Farm')
export class FarmResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listFarms')
  async listFarms() {
    const query = new ListFarmsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getFarm')
  async getFarm(@Args('id') id: string) {
    const query = new GetFarmQuery(id)
    const farm = await this.queryBus.execute(query)

    return FarmMapper.toDTO(farm)
  }
}
//import {gql} from 'apollo-server-express'
//import {Resolvers} from '../types'

//const resolvers: Resolvers = {
//Query: {
//listFarms: async (parent, args, {services}) => {
//return services.farm.getConnectionResults(args)
//},
//getFarm: async (parent, {id}, {services}, info) => {
//return services.farm.getById(id)
//},
//},
//Mutation: {
//createFarm: async (parent, {input}, {services}) => {
//return services.farm.create(input)
//},
//updateFarm: async (parent, {id, input}, {services}) => {
//return services.farm.updateById(id, input)
//},
//deleteFarm: async (parent, {id}, {services}) => {
//return services.farm.deleteById(id)
//},
//createFarmZone: async (parent, {farmId, input}, {services}) => {
//return services.farm.createFarmZone(farmId, input)
//},
//updateFarmZone: async (parent, {id, input}, {services}) => {
//return services.farm.updateFarmZoneById(id, input)
//},
//deleteFarmZone: async (parent, {id}, {services}) => {
//return services.farm.deleteFarmZoneById(id)
//},
//},
//Farm: {
//country: async (parent, args, {services}) => {
//if (!parent.country) return null
//return services.country.getById(parent.country)
//},
//region: async (parent, args, {services}) => {
//if (!parent.region) return null
//return services.region.getById(parent.region)
//},
//},
//}

//export const schema = {typeDefs, resolvers}

import {Args, Mutation, Query, Resolver, ResolveField, Parent} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {CreateCoffeeInput, UpdateCoffeeInput} from '../../types'
import {CreateCoffeeCommand, DeleteCoffeeCommand, UpdateCoffeeCommand} from '../commands'
import {CoffeeMapper, CountryMapper, RegionMapper} from '../../infra/mappers'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'
import {GetCoffeeQuery, GetCountryQuery, GetRegionQuery, ListCoffeesQuery, ListVarietiesQuery} from '../queries'

@Resolver('Coffee')
export class CoffeeResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listCoffees')
  async listCoffees() {
    const query = new ListCoffeesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getCoffee')
  async getCoffee(@Args('id') id: string) {
    const query = new GetCoffeeQuery(id)
    const coffee: CoffeeAggregate = await this.queryBus.execute(query)

    if (!coffee) {
      return null
    }

    return CoffeeMapper.toDTO(coffee)
  }

  @Mutation('createCoffee')
  async createCoffee(@Args('input') input: CreateCoffeeInput) {
    const command = new CreateCoffeeCommand(input)
    const coffee: CoffeeAggregate = await this.commandBus.execute(command)

    return CoffeeMapper.toDTO(coffee)
  }

  @Mutation('updateCoffee')
  async updateCoffee(@Args('id') id: string, @Args('input') input: UpdateCoffeeInput) {
    const command = new UpdateCoffeeCommand(id, input)
    const coffee: CoffeeAggregate = await this.commandBus.execute(command)

    return CoffeeMapper.toDTO(coffee)
  }

  @Mutation('deleteCoffee')
  async deleteCoffee(@Args('id') id: string) {
    const command = new DeleteCoffeeCommand(id)
    return this.commandBus.execute(command)
  }

  @ResolveField()
  async country(@Parent() coffee: any) {
    if (!coffee.country) {
      return null
    }
    const query = new GetCountryQuery(coffee.country)
    const country = await this.queryBus.execute(query)
    return CountryMapper.toDTO(country)
  }

  @ResolveField()
  async region(@Parent() coffee: any) {
    if (!coffee.region) {
      return null
    }
    const query = new GetRegionQuery(coffee.region)
    const region = await this.queryBus.execute(query)
    return RegionMapper.toDTO(region)
  }

  @ResolveField()
  async varieties(@Parent() coffee: any) {
    if (!coffee.varieties || !coffee.varieties.length) {
      return []
    }

    const query = new ListVarietiesQuery({conditions: {_id: coffee.varieties}})
    // TODO: fix return type on list query
    const varieties = await this.queryBus.execute(query)

    return varieties.edges.map((edge: any) => edge.node)
  }
}

//const resolvers: Resolvers = {
//Query: {
//listCoffees: async (parent, args, {services}) => {
//return services.coffee.getConnectionResults(args)
//},
//getCoffee: async (parent, {id}, {services}) => {
//return services.coffee.getById(id)
//},
//},
//Mutation: {
//createCoffee: async (parent, {input}, {services}) => {
//return services.coffee.create(input)
//},
//updateCoffee: async (parent, {id, input}, {services}) => {
//return services.coffee.updateById(id, input)
//},
//deleteCoffee: async (parent, {id}, {services}) => {
//return services.coffee.deleteById(id)
//},
//updateCoffeePermissionsForAccount: async (parent, {coffeeId, accountId, permissionTypes}, {services}) => {
//const coffee = await services.coffee.updateEntityPermissionsForAccount({
//entityId: coffeeId,
//accountId,
//permissions: permissionTypes,
//})
//return !!coffee
//},
//},
//Coffee: {
//__resolveReference: async (object, {services}) => {
//return services.coffee.getById(object.id)
//},
//country: async (parent, args, {services}) => {
//if (!parent.country) return null
//return services.country.getById(parent.country)
//},
//notes: async (parent, {fields}, {services}) => {
//const notes = await services.note.listByEntityId(parent.id)
//return fields ? (notes ? notes.filter(note => fields.includes(note.field)) : []) : notes ? notes : []
//},
//region: async (parent, args, {services}) => {
//if (!parent.region) return null
//return services.region.getById(parent.region)
//},
//varieties: async (parent, args, {services}) => {
//if (!parent.varieties) return []
//return (await Promise.all(parent.varieties.map((id: string) => services.variety.getById(id)))).filter(
//Boolean,
//) as VarietyDocument[]
//},
//},
//CoffeeComponent: {
//coffee: async (parent, args, {services}) => {
//const summaryCoffee = await services.coffee.getById(parent.coffee.id)
//return {
//...parent.coffee,
//coffee: summaryCoffee,
//}
//},
//},
//}

//export const schema = {typeDefs, resolvers}

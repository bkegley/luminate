import {Args, Mutation, Query, Resolver, ResolveField, Parent, Context} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {CreateCoffeeInput, QueryInput, UpdateCoffeeInput} from '../../types'
import {CreateCoffeeCommand, DeleteCoffeeCommand, UpdateCoffeeCommand} from '../commands'
import {CoffeeMapper, CountryMapper, RegionMapper, VarietyMapper} from '../../infra/mappers'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'
import {GetCoffeeQuery, ListCoffeesQuery} from '../queries'
import {CountryLoader, RegionLoader, VarietyLoader} from '../../infra/loaders'
import {VarietyAggregate} from '../../domain/Variety/Variety'
import {AuthGuard} from '../guards/AuthGuard'
import {Scopes} from '@luminate/graphql-utils'
import {UseGuards} from '@nestjs/common'
import {Token} from '@luminate/mongo-utils'

@Resolver('Coffee')
@UseGuards(AuthGuard)
export class CoffeeResolvers {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly countryLoader: CountryLoader,
    private readonly regionLoader: RegionLoader,
    private readonly varietyLoader: VarietyLoader,
  ) {}

  @Query('listCoffees')
  @Scopes('read:coffee')
  async listCoffees(
    @Args('cursor') cursor: string,
    @Args('limit') limit: number,
    @Args('query') query: QueryInput[],
    @Context('user') user: Token,
  ) {
    const coffeeQuery = new ListCoffeesQuery(user, {cursor, limit, query})
    return this.queryBus.execute(coffeeQuery)
  }

  @Query('getCoffee')
  @Scopes('read:coffee')
  async getCoffee(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetCoffeeQuery(user, id)
    const coffee: CoffeeAggregate = await this.queryBus.execute(query)

    if (!coffee) {
      return null
    }

    return CoffeeMapper.toDTO(coffee)
  }

  @Mutation('createCoffee')
  @Scopes('write:coffee')
  async createCoffee(@Args('input') input: CreateCoffeeInput, @Context('user') user: Token) {
    const command = new CreateCoffeeCommand(user, input)
    const coffee: CoffeeAggregate = await this.commandBus.execute(command)

    return CoffeeMapper.toDTO(coffee)
  }

  @Mutation('updateCoffee')
  @Scopes('write:coffee')
  async updateCoffee(@Args('id') id: string, @Args('input') input: UpdateCoffeeInput, @Context('user') user: Token) {
    const command = new UpdateCoffeeCommand(user, id, input)
    const coffee: CoffeeAggregate = await this.commandBus.execute(command)

    return CoffeeMapper.toDTO(coffee)
  }

  @Mutation('deleteCoffee')
  @Scopes('write:coffee')
  async deleteCoffee(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteCoffeeCommand(user, id)
    return this.commandBus.execute(command)
  }

  @ResolveField()
  @Scopes('read:country')
  async country(@Parent() coffee: any) {
    if (!coffee.country) {
      return null
    }
    const country = await this.countryLoader.getById(coffee.country)
    return CountryMapper.toDTO(country)
  }

  @ResolveField()
  @Scopes('read:region')
  async region(@Parent() coffee: any) {
    if (!coffee.region) {
      return null
    }
    const region = await this.regionLoader.getById(coffee.region)
    return RegionMapper.toDTO(region)
  }

  @ResolveField()
  @Scopes('read:varieties')
  async varieties(@Parent() coffee: any) {
    if (!coffee.varieties || !coffee.varieties.length) {
      return []
    }

    const varieties = await Promise.all<VarietyAggregate>(
      coffee.varieties.map((variety: string) => this.varietyLoader.getById(variety)),
    )

    return varieties.map(variety => (variety ? VarietyMapper.toDTO(variety) : null)).filter(Boolean)
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

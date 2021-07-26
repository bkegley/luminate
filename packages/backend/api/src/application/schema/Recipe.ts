import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {BrewerMapper, GrinderMapper, RecipeMapper} from '../../infra/mappers'
import {CreateRecipeInput, UpdateRecipeInput} from '../../types'
import {CreateRecipeCommand} from '../commands'
import {DeleteRecipeCommand} from '../commands/Recipe/DeleteRecipe'
import {UpdateRecipeCommand} from '../commands/Recipe/UpdateRecipe'
import {AuthGuard} from '../guards'
import {GetRecipeQuery} from '../queries/Recipe/GetRecipeQuery'
import {ListRecipesQuery} from '../queries/Recipe/ListRecipesQuery'

@Resolver('Recipe')
@UseGuards(AuthGuard)
export class RecipeResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listRecipes')
  async listRecipes(@Context('user') user: Token) {
    const query = new ListRecipesQuery(user)
    return this.queryBus.execute(query)
  }

  @Query('getRecipe')
  async getRecipe(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetRecipeQuery(user, id)
    const recipe = await this.queryBus.execute(query)
    return RecipeMapper.toDTO(recipe)
  }

  @Mutation('createRecipe')
  async createRecipe(@Args('input') input: CreateRecipeInput, @Context('user') user: Token) {
    const command = new CreateRecipeCommand(user, input)
    const response = await this.commandBus.execute(command)
    const recipeDTO = RecipeMapper.toDTO(response.recipe)
    return {
      ...recipeDTO,
      grinder: GrinderMapper.toDTO(response.grinder),
      brewer: BrewerMapper.toDTO(response.brewer),
    }
  }

  @Mutation('updateRecipe')
  async updateRecipe(@Args('id') id: string, @Args('input') input: UpdateRecipeInput, @Context('user') user: Token) {
    const command = new UpdateRecipeCommand(user, id, input)
    const recipe = await this.commandBus.execute(command)

    return RecipeMapper.toDTO(recipe)
  }

  @Mutation('deleteRecipe')
  async deleteRecipe(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteRecipeCommand(user, id)
    return await this.commandBus.execute(command)
  }
}

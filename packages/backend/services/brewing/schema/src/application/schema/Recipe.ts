import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {BrewerMapper, GrinderMapper, RecipeMapper} from '../../infra/mappers'
import {UpdateRecipeInput} from '../../types'
import {CreateRecipeCommand} from '../commands'
import {DeleteRecipeCommand} from '../commands/Recipe/DeleteRecipe'
import {UpdateRecipeCommand} from '../commands/Recipe/UpdateRecipe'
import {GetRecipeQuery} from '../queries/Recipe/GetRecipeQuery'
import {ListRecipesQuery} from '../queries/Recipe/ListRecipesQuery'

@Resolver('Recipe')
export class RecipeResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listRecipes')
  async listRecipes() {
    const query = new ListRecipesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getRecipe')
  async getRecipe(@Args('id') id: string) {
    const query = new GetRecipeQuery(id)
    const recipe = await this.queryBus.execute(query)
    return RecipeMapper.toDTO(recipe)
  }

  @Mutation('createRecipe')
  async createRecipe(@Args('input') input: any) {
    const command = new CreateRecipeCommand(input)
    const response = await this.commandBus.execute(command)
    const recipeDTO = RecipeMapper.toDTO(response.recipe)
    return {
      ...recipeDTO,
      grinder: GrinderMapper.toDTO(response.grinder),
      brewer: BrewerMapper.toDTO(response.brewer),
    }
  }

  @Mutation('updateRecipe')
  async updateRecipe(@Args('id') id: string, @Args('input') input: UpdateRecipeInput) {
    const command = new UpdateRecipeCommand(id, input)
    const recipe = await this.commandBus.execute(command)

    return RecipeMapper.toDTO(recipe)
  }

  @Mutation('deleteRecipe')
  async deleteRecipe(@Args('id') id: string) {
    const command = new DeleteRecipeCommand(id)
    return await this.commandBus.execute(command)
  }
}

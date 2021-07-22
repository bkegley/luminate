import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {DeleteRecipeCommand, IDeleteRecipeCommandHandler} from '.'
import {Recipe} from '../../../../domain/Recipe'
import {RecipeMapper} from '../../../../infra/mappers'
import {RecipesRepo} from '../../../../infra/repos'

@CommandHandler(DeleteRecipeCommand)
export class DeleteRecipeCommandHandler implements IDeleteRecipeCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly recipeRepo: RecipesRepo) {}

  async execute(command: DeleteRecipeCommand) {
    return new Promise<Recipe>(async (resolve, reject) => {
      const recipeDoc = await this.recipeRepo.getById(command.id)

      if (!recipeDoc) {
        reject('Recipe does not exist')
        return
      }

      const recipe = RecipeMapper.toDomain(recipeDoc)
      recipe.delete()

      this.recipeRepo
        .delete(command.id)
        .then(() => {
          recipe.events.forEach(event => this.eventBus.publish(event))
          resolve(recipe)
        })
        .catch(err => {
          reject(err)
        })
    }).catch()
  }
}

import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {DeleteRecipeCommand, IDeleteRecipeCommandHandler} from '.'
import {InMemoryRecipeRepository} from '../../../../infra/repositories'

@CommandHandler(DeleteRecipeCommand)
export class DeleteRecipeCommandHandler implements IDeleteRecipeCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly recipeRepo: InMemoryRecipeRepository) {}

  async execute(command: DeleteRecipeCommand) {
    return new Promise<boolean>(async (resolve, reject) => {
      const recipe = await this.recipeRepo.getById(command.id)

      if (!recipe) {
        reject('Recipe does not exist')
        return
      }

      recipe.delete()

      this.recipeRepo
        .delete(recipe.getEntityId())
        .then(() => {
          recipe.events.forEach(event => this.eventBus.publish(event))
          resolve(true)
        })
        .catch(err => {
          reject(err)
        })
    }).catch()
  }
}

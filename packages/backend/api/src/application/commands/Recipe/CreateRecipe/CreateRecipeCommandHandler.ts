import {CreateRecipeCommand, ICreateRecipeCommandHandler} from '.'
import {GrindersRepo, BrewersRepo, RecipesRepo} from '../../../../infra/repos'
import {Recipe} from '../../../../domain/Recipe'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {RecipeMapper} from '../../../../infra/mappers'

@CommandHandler(CreateRecipeCommand)
export class CreateRecipeCommandHandler implements ICreateRecipeCommandHandler {
  constructor(
    private eventBus: EventBus,
    private recipeRepo: RecipesRepo,
    private brewerRepo: BrewersRepo,
    private grinderRepo: GrindersRepo,
  ) {}

  public execute(command: CreateRecipeCommand) {
    return new Promise<Recipe>(async (resolve, reject) => {
      const [existingRecipe, brewer, grinder] = await Promise.all([
        this.recipeRepo.getByName(command.name),
        this.brewerRepo.getById(command.brewerId),
        this.grinderRepo.getById(command.grinderId),
      ])

      if (existingRecipe) {
        reject('Recipe already exists')
        return
      }

      if (!brewer) {
        reject('Brewer does not exist')
        return
      }

      if (!grinder) {
        reject('Grinder does not exist')
        return
      }

      const recipe = RecipeMapper.toDomain(command)

      this.recipeRepo
        .save(recipe)
        .then(() => {
          recipe.events.forEach(event => this.eventBus.publish(event))
          resolve(recipe)
        })
        .catch(reject)
    })
  }
}

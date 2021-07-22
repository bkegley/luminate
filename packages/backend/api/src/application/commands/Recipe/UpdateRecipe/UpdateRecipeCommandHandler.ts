import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {IUpdateRecipeCommandHandler} from '.'
import {Recipe} from '../../../../domain/Recipe'
import {RecipeMapper} from '../../../../infra/mappers'
import {BrewersRepo, GrindersRepo, RecipesRepo} from '../../../../infra/repos'
import {UpdateRecipeCommand} from './UpdateRecipeCommand'

@CommandHandler(UpdateRecipeCommand)
export class UpdateRecipeCommandHandler implements IUpdateRecipeCommandHandler {
  constructor(
    private readonly eventBus: EventBus,
    private readonly recipeRepo: RecipesRepo,
    private readonly brewerRepo: BrewersRepo,
    private readonly grinderRepo: GrindersRepo,
  ) {}

  async execute(command: UpdateRecipeCommand) {
    return new Promise<Recipe>(async (resolve, reject) => {
      const {input, id} = command

      const [existingRecipe, brewer, grinder] = await Promise.all([
        this.recipeRepo.getById(id),
        this.brewerRepo.getById(input.brewerId),
        this.grinderRepo.getById(input.grinderId),
      ])

      if (!existingRecipe) {
        reject('Recipe does not exist')
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

      const recipe = RecipeMapper.toDomain(existingRecipe)
      const attrs = RecipeMapper.toAttrs(input)

      recipe.update(attrs)

      await this.recipeRepo
        .save(recipe)
        .then(() => {
          recipe.events.forEach(event => this.eventBus.publish(event))
          resolve(recipe)
        })
        .catch(reject)
    })
  }
}

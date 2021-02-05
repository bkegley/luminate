import {EntityId} from '@luminate/services-shared'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {IUpdateRecipeCommandHandler, UpdateRecipeDTO} from '.'
import {Recipe, RecipeAttributes} from '../../../../domain/Recipe'
import {CoffeeWeight} from '../../../../domain/Recipe/CoffeeWeight'
import {GrinderGrindSetting} from '../../../../domain/Recipe/GrinderGrindSetting'
import {RecipeName} from '../../../../domain/Recipe/RecipeName'
import {RecipeNote} from '../../../../domain/Recipe/RecipeNote'
import {WaterWeight} from '../../../../domain/Recipe/WaterWeight'
import {Weight} from '../../../../domain/Weight'
import {
  InMemoryBrewerRepository,
  InMemoryGrinderRepository,
  InMemoryRecipeRepository,
} from '../../../../infra/repositories'
import {UpdateRecipeCommand} from './UpdateRecipeCommand'

@CommandHandler(UpdateRecipeCommand)
export class UpdateRecipeCommandHandler implements IUpdateRecipeCommandHandler {
  constructor(
    private readonly eventBus: EventBus,
    private readonly recipeRepo: InMemoryRecipeRepository,
    private readonly brewerRepo: InMemoryBrewerRepository,
    private readonly grinderRepo: InMemoryGrinderRepository,
  ) {}

  async execute(command: UpdateRecipeCommand) {
    return new Promise<UpdateRecipeDTO>(async (resolve, reject) => {
      const {name, brewerId, grinderId, grindSetting, note} = command.input

      const [existingRecipe, brewer, grinder] = await Promise.all([
        this.recipeRepo.getByName(name),
        this.brewerRepo.getById(brewerId),
        this.grinderRepo.getById(grinderId),
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

      let args: RecipeAttributes = {
        name: RecipeName.create({value: name}),
        brewerId: EntityId.create(brewerId),
        grinderId: EntityId.create(grinderId),
        waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      }

      if (grindSetting) {
        const recipeGrindSetting = GrinderGrindSetting.create({value: grindSetting})
        args.grindSetting = recipeGrindSetting
      }

      if (note) {
        const recipeNote = RecipeNote.create({value: note})
        args.note = recipeNote
      }

      const recipe = Recipe.create(args)

      this.recipeRepo
        .save(recipe)
        .then(() => {
          recipe.events.forEach(event => this.eventBus.publish(event))
          resolve({
            recipe,
            brewer,
            grinder,
          })
        })
        .catch(reject)
    })
  }
}

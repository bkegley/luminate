import {ICommandHandler} from '../ICommandHandler'
import {CreateRecipeCommand} from './CreateRecipeCommand'
import {IRecipeRepository, IBrewerRepository, IGrinderRepository} from '../../repositories'
import {IEventRegistry} from '../../infra'
import {Recipe} from '../../domain/Recipe'
import {RecipeName} from '../../domain/Recipe/RecipeName'
import {RecipeAttributes} from '../../domain/Recipe'
import {BrewerId} from '../../domain/Brewer/BrewerId'
import {EntityId} from '../../shared'
import {GrinderGrindSetting} from '../../domain/Recipe/GrinderGrindSetting'
import {RecipeNote} from '../../domain/Recipe/RecipeNote'
import {GrinderId} from '../../domain/Grinder/GrinderId'
import {CreateRecipeDTO} from './CreateRecipeDTO'
import {BrewerMapper, RecipeMapper, GrinderMapper} from '../../mappers'
import {WaterWeight} from '../../domain/Recipe/WaterWeight'
import {CoffeeWeight} from '../../domain/Recipe/CoffeeWeight'
import {Weight} from '../../domain/Weight'

export class CreateRecipeCommandHandler implements ICommandHandler<CreateRecipeCommand, CreateRecipeDTO> {
  constructor(
    private eventRegistry: IEventRegistry,
    private recipeRepo: IRecipeRepository,
    private brewerRepo: IBrewerRepository,
    private grinderRepo: IGrinderRepository,
  ) {}

  public handle(command: CreateRecipeCommand) {
    return new Promise<CreateRecipeDTO>(async (resolve, reject) => {
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

      let args: RecipeAttributes = {
        name: RecipeName.create({value: command.name}),
        brewerId: BrewerId.create(EntityId.create(command.brewerId)),
        grinderId: GrinderId.create(EntityId.create(command.grinderId)),
        waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      }

      if (command.grindSetting) {
        const grindSetting = GrinderGrindSetting.create({value: command.grindSetting})
        args.grindSetting = grindSetting
      }

      if (command.note) {
        const note = RecipeNote.create({value: command.note})
        args.note = note
      }

      const recipe = Recipe.create(args)

      this.recipeRepo
        .save(recipe)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(recipe)
          this.eventRegistry.publishEvents()
          resolve({
            ...RecipeMapper.toDTO(recipe),
            brewer: BrewerMapper.toDTO(brewer),
            grinder: GrinderMapper.toDTO(grinder),
          })
        })
        .catch(reject)
    })
  }
}

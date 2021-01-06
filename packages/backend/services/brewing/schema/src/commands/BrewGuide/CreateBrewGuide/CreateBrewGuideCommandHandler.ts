import {CreateBrewGuideCommand, ICreateBrewGuideCommandHandler} from '.'
import {IEventRegistry} from '../../../infra'
import {IBrewGuideRepository} from '../../../repositories/IBrewGuideRepository'
import {BrewGuide} from '../../../domain/BrewGuide'
import {BrewGuideName} from '../../../domain/BrewGuide/BrewGuideName'
import {EntityId} from '../../../shared'
import {IRecipeRepository} from '../../../repositories'

export class CreateBrewGuideCommandHander implements ICreateBrewGuideCommandHandler {
  constructor(
    private eventRegistry: IEventRegistry,
    private brewGuideRepo: IBrewGuideRepository,
    private recipeRepo: IRecipeRepository,
  ) {}

  public handle(command: CreateBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const [existingBrewGuide, existingRecipe] = await Promise.all([
        this.brewGuideRepo.getByName(command.name),
        this.recipeRepo.getById(command.recipeId),
      ])

      if (existingBrewGuide) {
        reject('Brew guide already exists')
        return
      }

      if (!existingRecipe) {
        reject('Recipe does not exist')
        return
      }

      const brewGuide = BrewGuide.create({
        name: BrewGuideName.create({value: command.name}),
        recipeId: EntityId.create(command.recipeId),
      })

      this.brewGuideRepo
        .save(brewGuide)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(brewGuide)
          this.eventRegistry.publishEvents()
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}
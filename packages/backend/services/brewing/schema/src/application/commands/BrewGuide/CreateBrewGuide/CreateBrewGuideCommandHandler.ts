import {CreateBrewGuideCommand, ICreateBrewGuideCommandHandler} from '.'
import {BrewGuide} from '../../../../domain/BrewGuide'
import {BrewGuideName} from '../../../../domain/BrewGuide/BrewGuideName'
import {EntityId} from '@luminate/services-shared'
import {InMemoryBrewGuideRepository, InMemoryRecipeRepository} from '../../../../infra/repositories'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(CreateBrewGuideCommand)
export class CreateBrewGuideCommandHander implements ICreateBrewGuideCommandHandler {
  constructor(
    private eventBus: EventBus,
    private brewGuideRepo: InMemoryBrewGuideRepository,
    private recipeRepo: InMemoryRecipeRepository,
  ) {}

  public execute(command: CreateBrewGuideCommand) {
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
          brewGuide.events.forEach(event => this.eventBus.publish(event))
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

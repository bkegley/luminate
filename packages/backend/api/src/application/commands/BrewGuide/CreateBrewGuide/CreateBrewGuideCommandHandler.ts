import {CreateBrewGuideCommand, ICreateBrewGuideCommandHandler} from '.'
import {BrewGuide} from '../../../../domain/BrewGuide'
import {BrewGuideName} from '../../../../domain/BrewGuide/BrewGuideName'
import {EntityId} from '@luminate/ddd'
import {BrewGuidesRepo, RecipesRepo} from '../../../../infra/repos'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(CreateBrewGuideCommand)
export class CreateBrewGuideCommandHander implements ICreateBrewGuideCommandHandler {
  constructor(private eventBus: EventBus, private brewGuideRepo: BrewGuidesRepo, private recipeRepo: RecipesRepo) {}

  public execute(command: CreateBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const [existingBrewGuide, existingRecipe] = await Promise.all([
        this.brewGuideRepo.getByName(command.user, command.name),
        this.recipeRepo.getById(command.user, command.recipeId),
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
        .create(command.user, brewGuide)
        .then(() => {
          brewGuide.events.forEach(event => this.eventBus.publish(event))
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

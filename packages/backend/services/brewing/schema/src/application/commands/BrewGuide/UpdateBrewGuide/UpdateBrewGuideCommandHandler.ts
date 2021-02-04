import {UpdateBrewGuideCommand, IUpdateBrewGuideCommandHandler} from '.'
import {InMemoryBrewGuideRepository} from '../../../../infra/repositories'
import {BrewGuideAttributes, BrewGuide} from '../../../../domain/BrewGuide'
import {BrewGuideName} from '../../../../domain/BrewGuide/BrewGuideName'
import {EntityId} from '@luminate/services-shared'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(UpdateBrewGuideCommand)
export class UpdateBrewGuideCommandHandler implements IUpdateBrewGuideCommandHandler {
  constructor(private eventBus: EventBus, private brewGuideRepo: InMemoryBrewGuideRepository) {}

  public async execute(command: UpdateBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const brewGuide = await this.brewGuideRepo.getById(command.id)

      if (!brewGuide) {
        reject('BrewGuide does not exist')
        return
      }

      const brewGuideAttrs: BrewGuideAttributes = {
        name: brewGuide.name,
        recipeId: brewGuide.recipeId,
      }

      if (command.name) {
        brewGuideAttrs.name = BrewGuideName.create({value: command.name})
        brewGuide.markedFields.set('name', command.name)
      }

      if (command.recipeId) {
        brewGuideAttrs.recipeId = EntityId.create(command.recipeId)
        brewGuide.markedFields.set('recipeId', command.recipeId)
      }

      brewGuide.update(brewGuideAttrs)

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

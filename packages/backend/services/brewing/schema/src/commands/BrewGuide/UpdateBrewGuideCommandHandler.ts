import {ICommandHandler} from '../ICommandHandler'
import {UpdateBrewGuideCommand} from './UpdateBrewGuideCommand'
import {IEventRegistry} from '../../infra'
import {IBrewGuideRepository} from '../../repositories'
import {BrewGuideAttributes} from '../../domain/BrewGuide'
import {BrewGuideName} from '../../domain/BrewGuide/BrewGuideName'
import {EntityId} from '../../shared'

export class UpdateBrewGuideCommandHandler implements ICommandHandler<UpdateBrewGuideCommand, any> {
  constructor(private eventRegistry: IEventRegistry, private brewGuideRepo: IBrewGuideRepository) {}

  public async handle(command: UpdateBrewGuideCommand) {
    return new Promise(async (resolve, reject) => {
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
          this.eventRegistry.markAggregateForPublish(brewGuide)
          this.eventRegistry.publishEvents()
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

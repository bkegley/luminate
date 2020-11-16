import {DeleteBrewGuideCommand} from './DeleteBrewGuideCommand'
import {ICommandHandler} from '..'
import {IBrewGuideRepository} from '../../repositories'
import {IEventRegistry} from '../../infra'
import {BrewGuide} from '../../domain/BrewGuide'

export class DeleteBrewGuideCommandHandler implements ICommandHandler<DeleteBrewGuideCommand, BrewGuide> {
  constructor(private eventRegistry: IEventRegistry, private brewGuideRepo: IBrewGuideRepository) {}

  public handle(command: DeleteBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const brewGuide = await this.brewGuideRepo.getById(command.id)

      if (!brewGuide) {
        reject('BrewGuide does not exist')
        return
      }

      brewGuide.delete()

      this.brewGuideRepo
        .delete(command.id)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(brewGuide)
          this.eventRegistry.publishEvents()
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

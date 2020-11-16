import {DeleteBrewingSessionCommand, IDeleteBrewingSessionCommandHandler} from '.'
import {IEventRegistry} from '../../../infra'
import {IBrewingSessionRepository} from '../../../repositories'
import {BrewingSession} from '../../../domain/BrewingSession'

export class DeleteBrewingSessionCommandHandler implements IDeleteBrewingSessionCommandHandler {
  constructor(private eventRegistry: IEventRegistry, private brewingSessionRepo: IBrewingSessionRepository) {}

  public handle(command: DeleteBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const brewingSession = await this.brewingSessionRepo.getById(command.id)

      if (!brewingSession) {
        reject('BrewingSession does not exist')
        return
      }

      brewingSession.delete()

      await this.brewingSessionRepo
        .delete(command.id)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(brewingSession)
          this.eventRegistry.publishEvents()
          resolve(brewingSession)
        })
        .catch(reject)
    })
  }
}

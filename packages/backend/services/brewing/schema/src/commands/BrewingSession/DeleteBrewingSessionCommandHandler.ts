import {ICommandHandler} from '../ICommandHandler'
import {DeleteBrewingSessionCommand} from './DeleteBrewingSessionCommand'
import {IEventRegistry} from '../../infra'
import {IBrewingSessionRepository} from '../../repositories'

export class DeleteBrewingSessionCommandHandler implements ICommandHandler<DeleteBrewingSessionCommand, boolean> {
  constructor(private eventRegistry: IEventRegistry, private brewingSessionRepo: IBrewingSessionRepository) {}

  public handle(command: DeleteBrewingSessionCommand) {
    return new Promise<boolean>(async (resolve, reject) => {
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
          resolve(true)
        })
        .catch(reject)
    })
  }
}

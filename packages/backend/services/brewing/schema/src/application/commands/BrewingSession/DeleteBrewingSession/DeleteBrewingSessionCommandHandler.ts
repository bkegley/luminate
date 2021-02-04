import {DeleteBrewingSessionCommand, IDeleteBrewingSessionCommandHandler} from '.'
import {InMemoryBrewingSessionRepository} from '../../../../infra/repositories'
import {BrewingSession} from '../../../../domain/BrewingSession'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(DeleteBrewingSessionCommand)
export class DeleteBrewingSessionCommandHandler implements IDeleteBrewingSessionCommandHandler {
  constructor(private eventBus: EventBus, private brewingSessionRepo: InMemoryBrewingSessionRepository) {}

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
          brewingSession.events.forEach(event => this.eventBus.publish(event))
          resolve(brewingSession)
        })
        .catch(reject)
    })
  }
}

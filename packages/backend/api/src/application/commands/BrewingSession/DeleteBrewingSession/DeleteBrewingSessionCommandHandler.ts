import {DeleteBrewingSessionCommand, IDeleteBrewingSessionCommandHandler} from '.'
import {BrewingSessionsRepo} from '../../../../infra/repos'
import {BrewingSession} from '../../../../domain/BrewingSession'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {BrewingSessionMapper} from '../../../../infra/mappers'

@CommandHandler(DeleteBrewingSessionCommand)
export class DeleteBrewingSessionCommandHandler implements IDeleteBrewingSessionCommandHandler {
  constructor(private eventBus: EventBus, private brewingSessionRepo: BrewingSessionsRepo) {}

  public execute(command: DeleteBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const brewingSessionDoc = await this.brewingSessionRepo.getById(command.id)

      if (!brewingSessionDoc) {
        reject('BrewingSession does not exist')
        return
      }

      const brewingSession = BrewingSessionMapper.toDomain(brewingSessionDoc)

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

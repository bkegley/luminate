import {UpdateBrewingSessionCommand} from './UpdateBrewingSessionCommand'
import {ICommandHandler} from '../ICommandHandler'
import {BrewingSession, BrewingSessionAttributes} from '../../domain/BrewingSession'
import {IEventRegistry} from '../../infra'
import {IBrewingSessionRepository} from '../../repositories'
import {DateEntity} from '../../domain/Date'
import {BrewingSessionDescription} from '../../domain/BrewingSession/BrewingSessionDescription'

export class UpdateBrewingSessionCommandHandler
  implements ICommandHandler<UpdateBrewingSessionCommand, BrewingSession> {
  constructor(private eventRegistry: IEventRegistry, private brewingSessionRepo: IBrewingSessionRepository) {}

  public handle(command: UpdateBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const brewingSession = await this.brewingSessionRepo.getById(command.id)

      if (!brewingSession) {
        reject('BrewingSession does not exist')
        return
      }

      const attrs: BrewingSessionAttributes = {}

      if (command.date) {
        const date = DateEntity.create({value: command.date})
        attrs.date = date
      }

      if (command.description) {
        const description = BrewingSessionDescription.create({value: command.description})
        attrs.description = description
      }

      brewingSession.update(attrs)

      this.brewingSessionRepo
        .save(brewingSession)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(brewingSession)
          this.eventRegistry.publishEvents()
          resolve(brewingSession)
        })
        .catch(reject)
    })
  }
}

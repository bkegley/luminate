import {CreateBrewingSessionCommand} from './CreateBrewingSessionCommand'
import {ICommandHandler} from '../ICommandHandler'
import {IEventRegistry} from '../../infra'
import {IBrewingSessionRepository} from '../../repositories/IBrewingSessionRepository'
import {BrewingSession, BrewingSessionAttributes} from '../../domain/BrewingSession'
import {DateEntity} from '../../domain/Date'
import {BrewingSessionDescription} from '../../domain/BrewingSession/BrewingSessionDescription'
import {BrewingSessionMapper} from '../../mappers'

// TODO: update types
export class CreateBrewingSessionCommandHandler implements ICommandHandler<any, any> {
  constructor(private eventRegistry: IEventRegistry, private brewingSessionRepo: IBrewingSessionRepository) {}

  public async handle(command: CreateBrewingSessionCommand) {
    return new Promise<any>((resolve, reject) => {
      const brewingSessionArgs: BrewingSessionAttributes = {}

      if (command.date) {
        const date = DateEntity.create({value: command.date})
        brewingSessionArgs.date = date
      }

      if (command.description) {
        const description = BrewingSessionDescription.create({value: command.description})
        brewingSessionArgs.description = description
      }

      const brewingSession = BrewingSession.create(brewingSessionArgs)
      this.brewingSessionRepo
        .save(brewingSession)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(brewingSession)
          this.eventRegistry.publishEvents()
          resolve(BrewingSessionMapper.toDTO(brewingSession))
        })
        .catch(reject)
    })
  }
}

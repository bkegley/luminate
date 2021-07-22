import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CuppingSessionAggregate} from '../../../domain/CuppingSession'
import {CuppingSessionMapper} from '../../../infra/mappers'
import {CuppingSessionsRepo} from '../../../infra/repos'
import {CreateCuppingSessionCommand} from './CreateCuppingSessionCommand'

@CommandHandler(CreateCuppingSessionCommand)
export class CreateCuppingSessionCommandHandler implements ICommandHandler<CreateCuppingSessionCommand> {
  constructor(private readonly eventBus: EventBus, private readonly cuppingSessionsRepo: CuppingSessionsRepo) {}

  async execute(command: CreateCuppingSessionCommand) {
    return new Promise<CuppingSessionAggregate>(async (resolve, reject) => {
      if (command.internalId) {
        const existingCuppingSession = await this.cuppingSessionsRepo.getByInternalId(command.internalId)
        if (existingCuppingSession) {
          throw new Error('Cupping session already exists')
        }
      }

      const cuppingSession = CuppingSessionMapper.toDomain(command)

      await this.cuppingSessionsRepo
        .save(cuppingSession)
        .then(() => {
          cuppingSession.events.forEach(event => this.eventBus.publish(event))
          resolve(cuppingSession)
        })
        .catch(reject)
    })
  }
}

import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CuppingSessionAggregate} from '../../../domain/CuppingSession'
import {CuppingSessionMapper} from '../../../infra/mappers'
import {CuppingSessionsRepo} from '../../../infra/repos'
import {UpdateCuppingSessionCommand} from './UpdateCuppingSessionCommand'

@CommandHandler(UpdateCuppingSessionCommand)
export class UpdateCuppingSessionCommandHandler implements ICommandHandler<UpdateCuppingSessionCommand> {
  constructor(private readonly eventBus: EventBus, private readonly cuppingSessionsRepo: CuppingSessionsRepo) {}

  async execute(command: UpdateCuppingSessionCommand) {
    return new Promise<CuppingSessionAggregate>(async (resolve, reject) => {
      const cuppingSessionDoc = await this.cuppingSessionsRepo.getById(command.user, command.id)

      if (!cuppingSessionDoc) {
        return reject('Cupping session not found')
      }

      const cuppingSession = CuppingSessionMapper.toDomain(cuppingSessionDoc)
      const attrs = CuppingSessionMapper.toAttrs(command)

      cuppingSession.update(attrs)

      await this.cuppingSessionsRepo
        .save(command.user, cuppingSession)
        .then(() => {
          cuppingSession.events.forEach(event => this.eventBus.publish(event))
          resolve(cuppingSession)
        })
        .catch(reject)
    })
  }
}

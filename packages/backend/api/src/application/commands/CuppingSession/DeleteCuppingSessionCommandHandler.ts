import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CuppingSessionAggregate} from '../../../domain/CuppingSession'
import {CuppingSessionMapper} from '../../../infra/mappers'
import {CuppingSessionsRepo} from '../../../infra/repos'
import {DeleteCuppingSessionCommand} from './DeleteCuppingSessionCommand'

@CommandHandler(DeleteCuppingSessionCommand)
export class DeleteCuppingSessionCommandHandler implements ICommandHandler<DeleteCuppingSessionCommand> {
  constructor(private readonly eventBus: EventBus, private readonly cuppingSessionsRepo: CuppingSessionsRepo) {}

  async execute(command: DeleteCuppingSessionCommand) {
    return new Promise<CuppingSessionAggregate>(async (resolve, reject) => {
      const cuppingSessionDoc = await this.cuppingSessionsRepo.getById(command.id)

      if (!cuppingSessionDoc) {
        return false
      }

      const cuppingSession = CuppingSessionMapper.toDomain(cuppingSessionDoc)

      cuppingSession.delete()

      await this.cuppingSessionsRepo
        .delete(command.id)
        .then(() => {
          cuppingSession.events.forEach(event => this.eventBus.publish(event))
          resolve(cuppingSession)
        })
        .catch(reject)
    })
  }
}

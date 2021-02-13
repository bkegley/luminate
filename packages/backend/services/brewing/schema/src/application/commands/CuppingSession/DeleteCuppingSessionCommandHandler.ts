import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'
import {DeleteCuppingSessionCommand} from './DeleteCuppingSessionCommand'

@CommandHandler(DeleteCuppingSessionCommand)
export class DeleteCuppingSessionCommandHandler implements ICommandHandler<DeleteCuppingSessionCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository,
  ) {}

  async execute(command: DeleteCuppingSessionCommand) {
    const cuppingSession = await this.cuppingSessionsRepo.getById(command.id)

    if (!cuppingSession) {
      return false
    }

    cuppingSession.delete()

    await this.cuppingSessionsRepo.delete(cuppingSession.getEntityId())

    cuppingSession.events.forEach(event => this.eventBus.publish(event))
    return true
  }
}

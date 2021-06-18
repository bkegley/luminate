import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'
import {LockCuppingSessionCommand} from './LockCuppingSessionCommand'

@CommandHandler(LockCuppingSessionCommand)
export class LockCuppingSessionCommandHandler implements ICommandHandler<LockCuppingSessionCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository,
  ) {}

  async execute(command: LockCuppingSessionCommand) {
    const cuppingSession = await this.cuppingSessionsRepo.getById(command.id)

    if (!cuppingSession) {
      return null
    }

    cuppingSession.lock()

    await this.cuppingSessionsRepo.save(cuppingSession, cuppingSession.getEntityId())

    cuppingSession.events.forEach(event => this.eventBus.publish(event))

    return cuppingSession
  }
}

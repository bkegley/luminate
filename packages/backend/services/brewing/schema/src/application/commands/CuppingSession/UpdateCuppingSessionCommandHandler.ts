import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CuppingSessionAggregateAttributes} from '../../../domain/CuppingSession'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'
import {UpdateCuppingSessionCommand} from './UpdateCuppingSessionCommand'

@CommandHandler(UpdateCuppingSessionCommand)
export class UpdateCuppingSessionCommandHandler implements ICommandHandler<UpdateCuppingSessionCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository,
  ) {}

  async execute(command: UpdateCuppingSessionCommand) {
    const cuppingSession = await this.cuppingSessionsRepo.getById(command.id)

    const attrs: CuppingSessionAggregateAttributes = {}

    if (command.description) {
      attrs.description = command.description
    }

    if (command.internalId) {
      attrs.internalId = command.internalId
    }

    cuppingSession.update(attrs)

    await this.cuppingSessionsRepo.save(cuppingSession, cuppingSession.getEntityId())

    cuppingSession.events.forEach(event => this.eventBus.publish(event))

    return cuppingSession
  }
}

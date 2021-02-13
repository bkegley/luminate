import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CuppingSessionAggregate} from '../../../domain/CuppingSession'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'
import {CreateCuppingSessionCommand} from './CreateCuppingSessionCommand'

@CommandHandler(CreateCuppingSessionCommand)
export class CreateCuppingSessionCommandHandler implements ICommandHandler<CreateCuppingSessionCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository,
  ) {}

  async execute(command: CreateCuppingSessionCommand) {
    if (command.internalId) {
      const existingCuppingSession = await this.cuppingSessionsRepo.getByInternalId(command.internalId)
      if (existingCuppingSession) {
        throw new Error('Cupping session already exists')
      }
    }

    const cuppingSession = CuppingSessionAggregate.create({
      internalId: command.internalId,
      description: command.description,
    })

    await this.cuppingSessionsRepo.save(cuppingSession)

    cuppingSession.events.forEach(event => this.eventBus.publish(event))
    return cuppingSession
  }
}

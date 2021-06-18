import {EntityId} from '@luminate/services-shared'
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CuppingSessionAggregateAttributes} from '../../../domain/CuppingSession'
import {SessionCoffee} from '../../../domain/CuppingSession/SessionCoffee'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'
import {UpdateCuppingSessionCoffeesCommand} from './UpdateCuppingSessionCoffeesCommand'

@CommandHandler(UpdateCuppingSessionCoffeesCommand)
export class UpdateCuppingSessionCoffeesCommandHandler implements ICommandHandler<UpdateCuppingSessionCoffeesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository,
  ) {}

  async execute(command: UpdateCuppingSessionCoffeesCommand) {
    const cuppingSession = await this.cuppingSessionsRepo.getById(command.id)

    if (!cuppingSession) {
      return null
    }

    const attrs: CuppingSessionAggregateAttributes = {}

    const sessionCoffees = command.sessionCoffees.map(sessionCoffee => {
      const {coffee, sampleNumber} = sessionCoffee
      const coffeeId = EntityId.create(coffee)
      return SessionCoffee.create({coffeeId, sampleNumber})
    })

    attrs.sessionCoffees = sessionCoffees

    cuppingSession.update(attrs)

    await this.cuppingSessionsRepo.save(cuppingSession, cuppingSession.getEntityId())

    cuppingSession.events.forEach(event => this.eventBus.publish(event))

    return cuppingSession
  }
}

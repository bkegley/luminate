import {CreateBrewingSessionCommand, ICreateBrewingSessionCommandHandler} from '.'
import {BrewingSession, BrewingSessionAttributes} from '../../../../domain/BrewingSession'
import {DateEntity} from '../../../../domain/Date'
import {BrewingSessionDescription} from '../../../../domain/BrewingSession/BrewingSessionDescription'
import {InMemoryBrewGuideRepository, InMemoryBrewingSessionRepository} from '../../../../infra/repositories'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(CreateBrewingSessionCommand)
export class CreateBrewingSessionCommandHandler implements ICreateBrewingSessionCommandHandler {
  constructor(
    private eventBus: EventBus,
    private brewingSessionRepo: InMemoryBrewingSessionRepository,
    private brewGuideRepo: InMemoryBrewGuideRepository,
  ) {}

  public async execute(command: CreateBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const existingBrewGuide = await this.brewGuideRepo.getById(command.brewGuideId)
      if (!existingBrewGuide) {
        reject('Brew guide not found')
        return
      }

      const brewingSessionArgs: BrewingSessionAttributes = {
        brewGuideId: existingBrewGuide.getEntityId(),
      }

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
          brewingSession.events.forEach(event => this.eventBus.publish(event))
          resolve(brewingSession)
        })
        .catch(reject)
    })
  }
}

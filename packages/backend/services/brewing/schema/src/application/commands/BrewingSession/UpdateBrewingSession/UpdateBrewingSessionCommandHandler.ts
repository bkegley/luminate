import {UpdateBrewingSessionCommand, IUpdateBrewingSessionCommandHandler} from '.'
import {BrewingSession, BrewingSessionAttributes} from '../../../../domain/BrewingSession'
import {InMemoryBrewGuideRepository, InMemoryBrewingSessionRepository} from '../../../../infra/repositories'
import {DateEntity} from '../../../../domain/Date'
import {BrewingSessionDescription} from '../../../../domain/BrewingSession/BrewingSessionDescription'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(UpdateBrewingSessionCommand)
export class UpdateBrewingSessionCommandHandler implements IUpdateBrewingSessionCommandHandler {
  constructor(
    private eventBus: EventBus,
    private brewingSessionRepo: InMemoryBrewingSessionRepository,
    private brewGuideRepo: InMemoryBrewGuideRepository,
  ) {}

  public execute(command: UpdateBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const [brewingSession, brewGuide] = await Promise.all([
        this.brewingSessionRepo.getById(command.id),
        this.brewGuideRepo.getById(command.brewGuideId),
      ])

      if (!brewingSession) {
        reject('BrewingSession does not exist')
        return
      }

      if (!brewGuide) {
        reject('BrewGuide does not exist')
        return
      }

      const attrs: BrewingSessionAttributes = {
        brewGuideId: brewGuide.getEntityId(),
      }

      if (command.date) {
        const date = DateEntity.create({value: command.date})
        attrs.date = date
      }

      if (command.description) {
        const description = BrewingSessionDescription.create({value: command.description})
        attrs.description = description
      }

      brewingSession.update(attrs)

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

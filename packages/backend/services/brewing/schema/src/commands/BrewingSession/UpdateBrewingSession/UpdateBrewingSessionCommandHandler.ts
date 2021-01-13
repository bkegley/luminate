import {UpdateBrewingSessionCommand, IUpdateBrewingSessionCommandHandler} from '.'
import {BrewingSession, BrewingSessionAttributes} from '../../../domain/BrewingSession'
import {IEventRegistry} from '../../../infra'
import {IBrewingSessionRepository, IBrewGuideRepository} from '../../../repositories'
import {DateEntity} from '../../../domain/Date'
import {BrewingSessionDescription} from '../../../domain/BrewingSession/BrewingSessionDescription'

export class UpdateBrewingSessionCommandHandler implements IUpdateBrewingSessionCommandHandler {
  constructor(
    private eventRegistry: IEventRegistry,
    private brewingSessionRepo: IBrewingSessionRepository,
    private brewGuideRepo: IBrewGuideRepository,
  ) {}

  public handle(command: UpdateBrewingSessionCommand) {
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
          this.eventRegistry.markAggregateForPublish(brewingSession)
          this.eventRegistry.publishEvents()
          resolve(brewingSession)
        })
        .catch(reject)
    })
  }
}

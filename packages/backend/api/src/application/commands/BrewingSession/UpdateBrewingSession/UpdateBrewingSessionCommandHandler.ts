import {UpdateBrewingSessionCommand, IUpdateBrewingSessionCommandHandler} from '.'
import {BrewingSession} from '../../../../domain/BrewingSession'
import {BrewGuidesRepo, BrewingSessionsRepo} from '../../../../infra/repos'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {BrewingSessionMapper} from '../../../../infra/mappers'

@CommandHandler(UpdateBrewingSessionCommand)
export class UpdateBrewingSessionCommandHandler implements IUpdateBrewingSessionCommandHandler {
  constructor(
    private eventBus: EventBus,
    private brewingSessionRepo: BrewingSessionsRepo,
    private brewGuideRepo: BrewGuidesRepo,
  ) {}

  public execute(command: UpdateBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const [brewingSessionDoc, brewGuide] = await Promise.all([
        this.brewingSessionRepo.getById(command.user, command.id),
        this.brewGuideRepo.getById(command.user, command.brewGuideId),
      ])

      if (!brewingSessionDoc) {
        reject('BrewingSession does not exist')
        return
      }

      if (!brewGuide) {
        reject('BrewGuide does not exist')
        return
      }

      const brewingSession = BrewingSessionMapper.toDomain(brewingSessionDoc)
      const attrs = BrewingSessionMapper.toAttrs(command)

      brewingSession.update(attrs)

      this.brewingSessionRepo
        .save(command.user, brewingSession)
        .then(() => {
          brewingSession.events.forEach(event => this.eventBus.publish(event))
          resolve(brewingSession)
        })
        .catch(reject)
    })
  }
}

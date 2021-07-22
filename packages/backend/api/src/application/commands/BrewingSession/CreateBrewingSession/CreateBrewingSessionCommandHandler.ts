import {CreateBrewingSessionCommand, ICreateBrewingSessionCommandHandler} from '.'
import {BrewingSession} from '../../../../domain/BrewingSession'
import {BrewGuidesRepo, BrewingSessionsRepo} from '../../../../infra/repos'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {BrewingSessionMapper} from '../../../../infra/mappers'

@CommandHandler(CreateBrewingSessionCommand)
export class CreateBrewingSessionCommandHandler implements ICreateBrewingSessionCommandHandler {
  constructor(
    private eventBus: EventBus,
    private brewingSessionRepo: BrewingSessionsRepo,
    private brewGuideRepo: BrewGuidesRepo,
  ) {}

  public async execute(command: CreateBrewingSessionCommand) {
    return new Promise<BrewingSession>(async (resolve, reject) => {
      const existingBrewGuide = await this.brewGuideRepo.getById(command.brewGuideId)
      if (!existingBrewGuide) {
        reject('Brew guide not found')
        return
      }

      const brewingSession = BrewingSessionMapper.toDomain(command)

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

import {UpdateBrewGuideCommand, IUpdateBrewGuideCommandHandler} from '.'
import {BrewGuidesRepo} from '../../../../infra/repos'
import {BrewGuide} from '../../../../domain/BrewGuide'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {BrewGuideMapper} from '../../../../infra/mappers'

@CommandHandler(UpdateBrewGuideCommand)
export class UpdateBrewGuideCommandHandler implements IUpdateBrewGuideCommandHandler {
  constructor(private eventBus: EventBus, private brewGuideRepo: BrewGuidesRepo) {}

  public async execute(command: UpdateBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const brewGuideDoc = await this.brewGuideRepo.getById(command.user, command.id)

      if (!brewGuideDoc) {
        reject('BrewGuide does not exist')
        return
      }

      const brewGuide = BrewGuideMapper.toDomain(brewGuideDoc)
      const attrs = BrewGuideMapper.toAttrs(command)

      brewGuide.update(attrs)

      this.brewGuideRepo
        .save(command.user, brewGuide)
        .then(() => {
          brewGuide.events.forEach(event => this.eventBus.publish(event))
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

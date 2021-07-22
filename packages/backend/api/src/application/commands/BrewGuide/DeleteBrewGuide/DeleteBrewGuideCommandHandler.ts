import {DeleteBrewGuideCommand, IDeleteBrewGuideCommandHandler} from '.'
import {BrewGuidesRepo} from '../../../../infra/repos'
import {BrewGuide} from '../../../../domain/BrewGuide'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {BrewGuideMapper} from '../../../../infra/mappers'

@CommandHandler(DeleteBrewGuideCommand)
export class DeleteBrewGuideCommandHandler implements IDeleteBrewGuideCommandHandler {
  constructor(private eventBus: EventBus, private brewGuideRepo: BrewGuidesRepo) {}

  public execute(command: DeleteBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const brewGuideDoc = await this.brewGuideRepo.getById(command.id)

      if (!brewGuideDoc) {
        reject('BrewGuide does not exist')
        return
      }

      const brewGuide = BrewGuideMapper.toDomain(brewGuideDoc)
      brewGuide.delete()

      this.brewGuideRepo
        .delete(command.id.toString())
        .then(() => {
          brewGuide.events.forEach(event => this.eventBus.publish(event))
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

import {DeleteBrewGuideCommand, IDeleteBrewGuideCommandHandler} from '.'
import {InMemoryBrewGuideRepository} from '../../../../infra/repositories'
import {BrewGuide} from '../../../../domain/BrewGuide'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(DeleteBrewGuideCommand)
export class DeleteBrewGuideCommandHandler implements IDeleteBrewGuideCommandHandler {
  constructor(private eventBus: EventBus, private brewGuideRepo: InMemoryBrewGuideRepository) {}

  public execute(command: DeleteBrewGuideCommand) {
    return new Promise<BrewGuide>(async (resolve, reject) => {
      const brewGuide = await this.brewGuideRepo.getById(command.id)

      if (!brewGuide) {
        reject('BrewGuide does not exist')
        return
      }

      brewGuide.delete()

      this.brewGuideRepo
        .delete(command.id)
        .then(() => {
          brewGuide.events.forEach(event => this.eventBus.publish(event))
          resolve(brewGuide)
        })
        .catch(reject)
    })
  }
}

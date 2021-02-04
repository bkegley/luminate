import {DeleteBrewerCommand, IDeleteBrewerCommandHandler} from '.'
import {Brewer} from '../../../../domain/Brewer'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {InMemoryBrewerRepository} from '../../../../infra/repositories'

@CommandHandler(DeleteBrewerCommand)
export class DeleteBrewerCommandHandler implements IDeleteBrewerCommandHandler {
  constructor(private eventBus: EventBus, private brewersRepo: InMemoryBrewerRepository) {}

  public async execute(command: DeleteBrewerCommand) {
    return new Promise<Brewer>(async (resolve, reject) => {
      const brewer = await this.brewersRepo.getById(command.id)

      if (!brewer) {
        reject('Brewer does not exist')
        return
      }

      brewer.delete()

      this.brewersRepo
        .delete(brewer.getEntityId())
        .then(() => {
          brewer.events.forEach(event => this.eventBus.publish(event))
          resolve(brewer)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

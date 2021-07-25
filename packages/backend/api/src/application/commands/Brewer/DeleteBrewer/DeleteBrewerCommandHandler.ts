import {DeleteBrewerCommand, IDeleteBrewerCommandHandler} from '.'
import {Brewer} from '../../../../domain/Brewer'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {BrewersRepo} from '../../../../infra/repos'
import {BrewerMapper} from '../../../../infra/mappers'

@CommandHandler(DeleteBrewerCommand)
export class DeleteBrewerCommandHandler implements IDeleteBrewerCommandHandler {
  constructor(private eventBus: EventBus, private brewersRepo: BrewersRepo) {}

  public async execute(command: DeleteBrewerCommand) {
    return new Promise<Brewer>(async (resolve, reject) => {
      const brewerDocument = await this.brewersRepo.getById(command.user, command.id)

      if (!brewerDocument) {
        reject('Brewer does not exist')
        return
      }

      const brewer = BrewerMapper.toDomain(brewerDocument)

      brewer.delete()

      this.brewersRepo
        .delete(brewer.getEntityId().toString())
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

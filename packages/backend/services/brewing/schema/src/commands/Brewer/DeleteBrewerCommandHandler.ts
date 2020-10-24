import {DeleteBrewerCommand} from '.'
import {ICommandHandler} from '../ICommandHandler'
import {IBrewerRepository} from '../../repositories/IBrewerRepository'
import {IEventRegistry} from '../../infra'
import {Brewer} from '../../domain/Brewer'

export class DeleteBrewerCommandHandler implements ICommandHandler<DeleteBrewerCommand, Brewer> {
  private eventRegistry: IEventRegistry
  private brewersRepo: IBrewerRepository

  constructor(eventRegistry: IEventRegistry, brewersRepo: IBrewerRepository) {
    this.eventRegistry = eventRegistry
    this.brewersRepo = brewersRepo
  }

  public async handle(command: DeleteBrewerCommand) {
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
          this.eventRegistry.markAggregateForPublish(brewer)
          this.eventRegistry.publishEvents()
          resolve(brewer)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

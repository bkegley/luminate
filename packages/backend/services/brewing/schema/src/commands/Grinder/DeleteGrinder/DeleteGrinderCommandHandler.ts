import {DeleteGrinderCommand, IDeleteGrinderCommandHandler} from '.'
import {IGrinderRepository} from '../../../repositories/IGrinderRepository'
import {IEventRegistry} from '../../../infra'
import {Grinder} from '../../../domain/Grinder'

export class DeleteGrinderCommandHandler implements IDeleteGrinderCommandHandler {
  private eventRegistry: IEventRegistry
  private grindersRepo: IGrinderRepository

  constructor(eventRegistry: IEventRegistry, grindersRepo: IGrinderRepository) {
    this.eventRegistry = eventRegistry
    this.grindersRepo = grindersRepo
  }

  public async handle(command: DeleteGrinderCommand) {
    return new Promise<Grinder>(async (resolve, reject) => {
      const grinder = await this.grindersRepo.getById(command.id)

      if (!grinder) {
        reject('Grinder does not exist')
        return
      }

      grinder.delete()

      this.grindersRepo
        .delete(grinder.getEntityId())
        .then(() => {
          this.eventRegistry.markAggregateForPublish(grinder)
          this.eventRegistry.publishEvents()
          resolve(grinder)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

import {UpdateBrewerCommand, IUpdateBrewerCommandHandler} from '.'
import {Brewer} from '../../../domain/Brewer'
import {IEventRegistry} from '../../../infra'
import {IBrewerRepository} from '../../../repositories/IBrewerRepository'

export class UpdateBrewerCommandHandler implements IUpdateBrewerCommandHandler {
  private eventRegistry: IEventRegistry
  private brewerRepo: IBrewerRepository

  constructor(eventRegistry: IEventRegistry, brewerRepo: IBrewerRepository) {
    this.eventRegistry = eventRegistry
    this.brewerRepo = brewerRepo
  }

  public async handle(command: UpdateBrewerCommand) {
    return new Promise<Brewer>(async (resolve, reject) => {
      const [brewer, existingBrewerName] = await Promise.all([
        this.brewerRepo.getById(command.id),
        this.brewerRepo.getByName(command.name),
      ])

      if (!brewer) {
        reject('Brewer not found')
        return
      }

      if (existingBrewerName && brewer.name.value !== command.name.value) {
        reject('Brewer already exists')
        return
      }

      brewer.update(command)

      this.brewerRepo
        .save(brewer)
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

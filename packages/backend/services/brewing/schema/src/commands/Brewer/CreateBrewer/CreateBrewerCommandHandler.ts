import {CreateBrewerCommand, ICreateBrewerCommandHandler} from '.'
import {Brewer} from '../../../domain/Brewer'
import {IEventRegistry} from '../../../infra'
import {IBrewerRepository} from '../../../repositories/IBrewerRepository'

export class CreateBrewerCommandHandler implements ICreateBrewerCommandHandler {
  private eventRegistry: IEventRegistry
  private brewerRepo: IBrewerRepository

  constructor(eventRegistry: IEventRegistry, brewerRepo: IBrewerRepository) {
    this.eventRegistry = eventRegistry
    this.brewerRepo = brewerRepo
  }

  public async handle(command: CreateBrewerCommand) {
    return new Promise<Brewer>(async (resolve, reject) => {
      // Brewer name cannot already exist
      const existingBrewer = await this.brewerRepo.getByName(command.name)
      if (existingBrewer) {
        reject('Brewer already exists')
        return
      }

      const brewer = Brewer.create(command)

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

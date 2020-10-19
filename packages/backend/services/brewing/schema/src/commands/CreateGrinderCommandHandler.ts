import {ICommandHandler, CreateGrinderCommand} from '.'
import {Grinder} from '../domain/Grinder'
import {IEventRegistry} from '../infra'
import {IGrinderRepository} from '../repositories/IGrinderRepository'

export class CreateGrinderCommandHandler implements ICommandHandler<CreateGrinderCommand, Grinder> {
  private eventRegistry: IEventRegistry
  private grinderRepo: IGrinderRepository

  constructor(eventRegistry: IEventRegistry, grinderRepo: IGrinderRepository) {
    this.eventRegistry = eventRegistry
    this.grinderRepo = grinderRepo
  }

  public async handle(command: CreateGrinderCommand) {
    return new Promise<Grinder>(async (resolve, reject) => {
      // Grinder name cannot already exist
      const existingGrinder = await this.grinderRepo.getByName(command.name)
      if (existingGrinder) {
        reject('Grinder already exists')
        return
      }

      const grinder = Grinder.create(command)

      this.grinderRepo
        .save(grinder)
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

import {ICommandHandler, UpdateGrinderCommand} from '.'
import {Grinder} from '../domain/Grinder'
import {IEventRegistry} from '../infra'
import {IGrinderRepository} from '../repositories/IGrinderRepository'

export class UpdateGrinderCommandHandler implements ICommandHandler<UpdateGrinderCommand, Grinder> {
  private eventRegistry: IEventRegistry
  private grinderRepo: IGrinderRepository

  constructor(eventRegistry: IEventRegistry, grinderRepo: IGrinderRepository) {
    this.eventRegistry = eventRegistry
    this.grinderRepo = grinderRepo
  }

  public async handle(command: UpdateGrinderCommand) {
    return new Promise<Grinder>(async (resolve, reject) => {
      const [grinder, existingGrinderName] = await Promise.all([
        this.grinderRepo.getById(command.id),
        this.grinderRepo.getByName(command.name),
      ])

      if (!grinder) {
        reject('Grinder not found')
        return
      }

      if (existingGrinderName && grinder.name.value !== command.name.value) {
        reject('Grinder already exists')
        return
      }

      grinder.update(command)

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

import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateGrinderCommand, IUpdateGrinderCommandHandler} from '.'
import {Grinder} from '../../../../domain/Grinder'
import {InMemoryGrinderRepository} from '../../../../infra/repositories'

@CommandHandler(UpdateGrinderCommand)
export class UpdateGrinderCommandHandler implements IUpdateGrinderCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly grinderRepo: InMemoryGrinderRepository) {}

  public async execute(command: UpdateGrinderCommand) {
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
          grinder.events.forEach(event => this.eventBus.publish(event))
          resolve(grinder)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

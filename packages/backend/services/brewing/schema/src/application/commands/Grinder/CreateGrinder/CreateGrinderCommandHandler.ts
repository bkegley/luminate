import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {CreateGrinderCommand, ICreateGrinderCommandHandler} from '.'
import {Grinder} from '../../../../domain/Grinder'
import {InMemoryGrinderRepository} from '../../../../infra/repositories'

@CommandHandler(CreateGrinderCommand)
export class CreateGrinderCommandHandler implements ICreateGrinderCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly grinderRepo: InMemoryGrinderRepository) {}

  public async execute(command: CreateGrinderCommand) {
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
          grinder.events.forEach(event => this.eventBus.publish(event))
          resolve(grinder)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

import {DeleteGrinderCommand, IDeleteGrinderCommandHandler} from '.'
import {Grinder} from '../../../../domain/Grinder'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {InMemoryGrinderRepository} from '../../../../infra/repositories'

@CommandHandler(DeleteGrinderCommand)
export class DeleteGrinderCommandHandler implements IDeleteGrinderCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly grindersRepo: InMemoryGrinderRepository) {}

  public async execute(command: DeleteGrinderCommand) {
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
          grinder.events.forEach(event => this.eventBus.publish(event))
          resolve(grinder)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

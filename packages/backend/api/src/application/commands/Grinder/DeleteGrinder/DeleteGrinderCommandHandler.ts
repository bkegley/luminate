import {DeleteGrinderCommand, IDeleteGrinderCommandHandler} from '.'
import {Grinder} from '../../../../domain/Grinder'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {GrindersRepo} from '../../../../infra/repos'
import {GrinderMapper} from '../../../../infra/mappers'

@CommandHandler(DeleteGrinderCommand)
export class DeleteGrinderCommandHandler implements IDeleteGrinderCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly grindersRepo: GrindersRepo) {}

  public async execute(command: DeleteGrinderCommand) {
    return new Promise<Grinder>(async (resolve, reject) => {
      const grinderDoc = await this.grindersRepo.getById(command.user, command.id)

      if (!grinderDoc) {
        reject('Grinder does not exist')
        return
      }

      const grinder = GrinderMapper.toDomain(grinderDoc)
      grinder.delete()

      this.grindersRepo
        .delete(command.user, command.id)
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

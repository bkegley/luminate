import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateGrinderCommand, IUpdateGrinderCommandHandler} from '.'
import {Grinder} from '../../../../domain/Grinder'
import {GrinderMapper} from '../../../../infra/mappers'
import {GrindersRepo} from '../../../../infra/repos'

@CommandHandler(UpdateGrinderCommand)
export class UpdateGrinderCommandHandler implements IUpdateGrinderCommandHandler {
  constructor(private readonly eventBus: EventBus, private readonly grinderRepo: GrindersRepo) {}

  public async execute(command: UpdateGrinderCommand) {
    return new Promise<Grinder>(async (resolve, reject) => {
      const [grinderDoc, existingGrinderName] = await Promise.all([
        this.grinderRepo.getById(command.id),
        this.grinderRepo.getByName(command.name),
      ])

      if (!grinderDoc) {
        reject('Grinder not found')
        return
      }

      if (existingGrinderName && grinderDoc.name !== command.name) {
        reject('Grinder already exists')
        return
      }

      const grinder = GrinderMapper.toDomain(grinderDoc)
      const attrs = GrinderMapper.toAttrs(command)

      grinder.update(attrs)

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

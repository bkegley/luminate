import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateBrewerCommand, IUpdateBrewerCommandHandler} from '.'
import {Brewer} from '../../../../domain/Brewer'
import {InMemoryBrewerRepository} from '../../../../infra/repositories'

@CommandHandler(UpdateBrewerCommand)
export class UpdateBrewerCommandHandler implements IUpdateBrewerCommandHandler {
  constructor(private eventBus: EventBus, private brewerRepo: InMemoryBrewerRepository) {}

  public async execute(command: UpdateBrewerCommand) {
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
        .save(brewer, brewer.getEntityId())
        .then(() => {
          brewer.events.forEach(event => this.eventBus.publish(event))
          resolve(brewer)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

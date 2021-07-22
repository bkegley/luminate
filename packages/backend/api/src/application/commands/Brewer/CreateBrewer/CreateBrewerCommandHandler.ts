import {CreateBrewerCommand, ICreateBrewerCommandHandler} from '.'
import {Brewer} from '../../../../domain/Brewer'
import {BrewersRepo} from '../../../../infra/repos'
import {BrewerMapper} from '../../../../infra/mappers'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(CreateBrewerCommand)
export class CreateBrewerCommandHandler implements ICreateBrewerCommandHandler {
  constructor(private eventBus: EventBus, private brewerRepo: BrewersRepo) {}

  public async execute(command: CreateBrewerCommand) {
    return new Promise<Brewer>(async (resolve, reject) => {
      // Brewer name cannot already exist
      const existingBrewer = await this.brewerRepo.getByName(command.name)
      if (existingBrewer) {
        reject('Brewer already exists')
        return
      }

      const brewer = BrewerMapper.toDomain(command)

      this.brewerRepo
        .save(brewer)
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

import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateBrewerCommand, IUpdateBrewerCommandHandler} from '.'
import {Brewer} from '../../../../domain/Brewer'
import {BrewerMapper} from '../../../../infra/mappers'
import {BrewersRepo} from '../../../../infra/repos'

@CommandHandler(UpdateBrewerCommand)
export class UpdateBrewerCommandHandler implements IUpdateBrewerCommandHandler {
  constructor(private eventBus: EventBus, private brewerRepo: BrewersRepo) {}

  public async execute(command: UpdateBrewerCommand) {
    return new Promise<Brewer>(async (resolve, reject) => {
      const [brewerDocument, existingBrewerNameDocument] = await Promise.all([
        this.brewerRepo.getById(command.id),
        this.brewerRepo.getByName(command.name),
      ])

      if (!brewerDocument) {
        reject('Brewer not found')
        return
      }

      if (existingBrewerNameDocument && brewerDocument.name !== command.name) {
        reject('Brewer already exists')
        return
      }

      const brewer = BrewerMapper.toDomain(brewerDocument)
      const attrs = BrewerMapper.toAttrs(command)

      brewer.update(attrs)

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

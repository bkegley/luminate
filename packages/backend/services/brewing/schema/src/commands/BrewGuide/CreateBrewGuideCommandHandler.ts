import {ICommandHandler} from '../ICommandHandler'
import {CreateBrewGuideCommand} from './CreateBrewGuideCommand'
import {CreateBrewGuideDTO} from './CreateBrewGuideDTO'
import {IEventRegistry} from '../../infra'
import {IBrewGuideRepository} from '../../repositories/IBrewGuideRepository'
import {BrewGuide} from '../../domain/BrewGuide'
import {BrewGuideName} from '../../domain/BrewGuide/BrewGuideName'

export class CreateBrewGuideCommandHander implements ICommandHandler<CreateBrewGuideCommand, CreateBrewGuideDTO> {
  constructor(private eventRegistry: IEventRegistry, private brewGuideRepo: IBrewGuideRepository) {}

  public handle(command: CreateBrewGuideCommand) {
    return new Promise<CreateBrewGuideDTO>(async (resolve, reject) => {
      const existingBrewGuide = await this.brewGuideRepo.getByName(command.name)

      if (existingBrewGuide) {
        reject('Brew guide already exists')
        return
      }

      const brewGuide = BrewGuide.create({
        name: BrewGuideName.create({value: command.name}),
      })

      this.brewGuideRepo
        .save(brewGuide)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(brewGuide)
          this.eventRegistry.publishEvents()
          resolve(new CreateBrewGuideDTO(brewGuide))
        })
        .catch(reject)
    })
  }
}

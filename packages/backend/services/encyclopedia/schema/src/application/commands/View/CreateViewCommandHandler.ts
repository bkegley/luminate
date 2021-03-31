import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {ViewAggregate} from '../../../domain/View/View'
import {ViewMapper} from '../../../infra/mappers'
import {ViewsRepo} from '../../../infra/repos'
import {CreateViewCommand} from './CreateViewCommand'

@CommandHandler(CreateViewCommand)
export class CreateViewCommandHandler implements ICommandHandler<CreateViewCommand, ViewAggregate> {
  constructor(private readonly eventBus: EventBus, private readonly viewsRepo: ViewsRepo) {}

  async execute(command: CreateViewCommand) {
    const view = ViewAggregate.create({
      name: command.name,
      description: command.description,
    })

    await this.viewsRepo.create(command.user, ViewMapper.toPersistence(view))
    view.events.forEach(event => this.eventBus.publish(event))

    return view
  }
}

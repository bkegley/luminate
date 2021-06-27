import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateViewCommand} from '.'
import {ViewsRepo} from '../../../infra/repos'
import {ViewMapper} from '../../../infra/mappers'

@CommandHandler(UpdateViewCommand)
export class UpdateViewCommandHandler implements ICommandHandler<UpdateViewCommand> {
  constructor(private readonly viewsRepo: ViewsRepo) {}

  async execute(command: UpdateViewCommand) {
    const {user, ...viewObj} = command
    const viewDocument = await this.viewsRepo.getById(user, command.id)

    if (!viewDocument) {
      throw new Error('View does not exist')
    }

    const view = ViewMapper.toDomain(viewDocument)

    const attrs = ViewMapper.toAttrs(viewObj)

    view.update(attrs)

    await this.viewsRepo.save(user, view)
    return view
  }
}

import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {DeleteVarietyCommand} from '.'
import {VarietiesRepo} from '../../../infra/repos'

@CommandHandler(DeleteVarietyCommand)
export class DeleteVarietyCommandHandler implements ICommandHandler<DeleteVarietyCommand> {
  constructor(private readonly varietiesRepo: VarietiesRepo) {}

  async execute(command: DeleteVarietyCommand) {
    return this.varietiesRepo.delete(command.id)
  }
}

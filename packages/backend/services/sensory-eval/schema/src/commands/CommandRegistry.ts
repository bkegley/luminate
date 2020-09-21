import {Producer} from 'kafka-node'
import {
  CommandType,
  ICommandHandler,
  ICommandRegistry,
  CreateBrewerCommandHandler,
  DeleteBrewerCommandHandler,
  UpdateBrewerCommandHandler,
} from '.'

export class CommandRegistry implements ICommandRegistry {
  private producer: Producer

  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(producer: Producer) {
    this.producer = producer

    // register the handlers
    this.registerHandlers()
  }

  private registerHandlers() {
    // Brewer Handlers
    this.handlerRegistry.set(CommandType.CREATE_BREWER_COMMAND, new CreateBrewerCommandHandler(this.producer))
    this.handlerRegistry.set(CommandType.UPDATE_BREWER_COMMAND, new UpdateBrewerCommandHandler(this.producer))
    this.handlerRegistry.set(CommandType.DELETE_BREWER_COMMAND, new DeleteBrewerCommandHandler(this.producer))
  }

  public async process<T, K>(commandType: CommandType, command: T) {
    const commandHandler = this.handlerRegistry.get(commandType) as ICommandHandler<T, K>
    if (!commandHandler) {
      throw new Error(`${commandType} has no registered handler`)
    }

    return commandHandler.handle(command)
  }
}

import {
  CommandType,
  ICommandHandler,
  ICommandRegistry,
  CreateBrewerCommandHandler,
  DeleteBrewerCommandHandler,
  UpdateBrewerCommandHandler,
} from '.'
import {IEventRegistry} from '../infra'
import {IBrewerRepository} from '../repositories/IBrewerRepository'

export class CommandRegistry implements ICommandRegistry {
  private eventRegistry: IEventRegistry
  private brewerRepo: IBrewerRepository

  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(eventRegistry: IEventRegistry, brewerRepo: IBrewerRepository) {
    this.eventRegistry = eventRegistry
    this.brewerRepo = brewerRepo

    // register the handlers
    this.registerHandlers()
  }

  private registerHandlers() {
    // Brewer Handlers
    this.handlerRegistry.set(
      CommandType.CREATE_BREWER_COMMAND,
      new CreateBrewerCommandHandler(this.eventRegistry, this.brewerRepo),
    )
    this.handlerRegistry.set(
      CommandType.UPDATE_BREWER_COMMAND,
      new UpdateBrewerCommandHandler(this.eventRegistry, this.brewerRepo),
    )
    this.handlerRegistry.set(
      CommandType.DELETE_BREWER_COMMAND,
      new DeleteBrewerCommandHandler(this.eventRegistry, this.brewerRepo),
    )
  }

  public async process<T, K>(commandType: CommandType, command: T) {
    const commandHandler = this.handlerRegistry.get(commandType) as ICommandHandler<T, K>
    if (!commandHandler) {
      throw new Error(`${commandType} has no registered handler`)
    }

    return commandHandler.handle(command)
  }
}

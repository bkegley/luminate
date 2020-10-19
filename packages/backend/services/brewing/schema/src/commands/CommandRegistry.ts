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
import {IGrinderRepository} from '../repositories/IGrinderRepository'
import {CreateGrinderCommandHandler} from './CreateGrinderCommandHandler'
import {UpdateGrinderCommandHandler} from './UpdateGrinderCommandHandler'
import {DeleteGrinderCommandHandler} from './DeleteGrinderCommandHandler'

export class CommandRegistry implements ICommandRegistry {
  private eventRegistry: IEventRegistry
  private brewerRepo: IBrewerRepository
  private grinderRepo: IGrinderRepository

  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(eventRegistry: IEventRegistry, brewerRepo: IBrewerRepository, grinderRepo: IGrinderRepository) {
    this.eventRegistry = eventRegistry
    this.brewerRepo = brewerRepo
    this.grinderRepo = grinderRepo

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

    // Grinder Handlers
    this.handlerRegistry.set(
      CommandType.CREATE_GRINDER_COMMAND,
      new CreateGrinderCommandHandler(this.eventRegistry, this.grinderRepo),
    )
    this.handlerRegistry.set(
      CommandType.UPDATE_GRINDER_COMMAND,
      new UpdateGrinderCommandHandler(this.eventRegistry, this.grinderRepo),
    )
    this.handlerRegistry.set(
      CommandType.DELETE_GRINDER_COMMAND,
      new DeleteGrinderCommandHandler(this.eventRegistry, this.grinderRepo),
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

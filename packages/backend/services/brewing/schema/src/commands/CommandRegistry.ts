import {
  CommandType,
  CreateBrewGuideCommandHander,
  CreateBrewerCommandHandler,
  CreateBrewingSessionCommandHandler,
  CreateEvaluationCommandHandler,
  CreateGrinderCommandHandler,
  CreateRecipeCommandHandler,
  DeleteBrewGuideCommandHandler,
  DeleteBrewerCommandHandler,
  DeleteBrewingSessionCommandHandler,
  DeleteEvaluationCommandHandler,
  DeleteGrinderCommandHandler,
  ICommandHandler,
  ICommandRegistry,
  UpdateBrewGuideCommandHandler,
  UpdateBrewerCommandHandler,
  UpdateBrewingSessionCommandHandler,
  UpdateEvaluationCommandHandler,
  UpdateGrinderCommandHandler,
} from '.'
import {IEventRegistry} from '../infra'
import {
  IBrewerRepository,
  IGrinderRepository,
  IRecipeRepository,
  IBrewGuideRepository,
  IEvaluationRepository,
  IBrewingSessionRepository,
} from '../repositories'

export class CommandRegistry implements ICommandRegistry {
  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(
    private eventRegistry: IEventRegistry,
    private brewerRepo: IBrewerRepository,
    private brewGuideRepo: IBrewGuideRepository,
    private brewingSessionRepo: IBrewingSessionRepository,
    private evaluationRepo: IEvaluationRepository,
    private grinderRepo: IGrinderRepository,
    private recipeRepo: IRecipeRepository,
  ) {
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

    // Brew Guide Handlers
    this.handlerRegistry.set(
      CommandType.CREATE_BREW_GUIDE_COMMAND,
      new CreateBrewGuideCommandHander(this.eventRegistry, this.brewGuideRepo, this.recipeRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_BREW_GUIDE_COMMAND,
      new UpdateBrewGuideCommandHandler(this.eventRegistry, this.brewGuideRepo),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_BREW_GUIDE_COMMAND,
      new DeleteBrewGuideCommandHandler(this.eventRegistry, this.brewGuideRepo),
    )

    // BrewingSession Handlers
    this.handlerRegistry.set(
      CommandType.CREATE_BREWING_SESSION_COMMAND,
      new CreateBrewingSessionCommandHandler(this.eventRegistry, this.brewingSessionRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_BREWING_SESSION_COMMAND,
      new UpdateBrewingSessionCommandHandler(this.eventRegistry, this.brewingSessionRepo),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_BREWING_SESSION_COMMAND,
      new DeleteBrewingSessionCommandHandler(this.eventRegistry, this.brewingSessionRepo),
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

    // Evaluation Handlers
    this.handlerRegistry.set(
      CommandType.CREATE_EVALUATION_COMMAND,
      new CreateEvaluationCommandHandler(this.eventRegistry, this.evaluationRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_EVALUATION_COMMAND,
      new UpdateEvaluationCommandHandler(this.eventRegistry, this.evaluationRepo),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_EVALUATION_COMMAND,
      new DeleteEvaluationCommandHandler(this.eventRegistry, this.evaluationRepo),
    )

    // Recipe Handlers
    this.handlerRegistry.set(
      CommandType.CREATE_RECIPE_COMMAND,
      new CreateRecipeCommandHandler(this.eventRegistry, this.recipeRepo, this.brewerRepo, this.grinderRepo),
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

import {Container, TYPES} from '../src/utils'
import {Producer, KafkaClient} from 'kafka-node'
import {IEventRegistry, EventRegistry} from '../src/infra'
import {ICommandRegistry, CommandRegistry} from '../src/commands'
import {
  IBrewerRepository,
  InMemoryBrewerRepository,
  InMemoryGrinderRepository,
  InMemoryRecipeRepository,
  IBrewGuideRepository,
  InMemoryBrewGuideRepository,
  IGrinderRepository,
  IRecipeRepository,
  IEvaluationRepository,
  InMemoryEvaluationRepository,
} from '../src/repositories'
import {IBrewingSessionRepository} from '../src/repositories/IBrewingSessionRepository'
import {InMemoryBrewingSessionRepository} from '../src/repositories/BrewingSessionRepository'

/**
 *
 * Build a default `Container` useful for testing command path.
 * Override any of the defaults with `container.bind(existingKey)`
 *
 * Example:
 * ```ts
 * const container = buildTestContainer()
 * container.bind(TYPES.BrewerRepository, new MockBrewerRepository())
 * ```
 *
 */
export const buildCommandTestContainer = () => {
  const container = new Container()
  container.bind<Producer>(TYPES.KafkaProducer, new Producer(new KafkaClient()))
  container.bind<KafkaClient>(TYPES.KafkaProducer, new KafkaClient())
  container.bind<IEventRegistry>(
    TYPES.EventRegistry,
    resolver => new EventRegistry(resolver.resolve(TYPES.KafkaProducer)),
  )
  container.bind<ICommandRegistry>(
    TYPES.CommandRegistry,
    resolver =>
      new CommandRegistry(
        resolver.resolve(TYPES.EventRegistry),
        resolver.resolve(TYPES.BrewerRepository),
        resolver.resolve(TYPES.BrewGuideRepository),
        resolver.resolve(TYPES.BrewingSessionRepository),
        resolver.resolve(TYPES.EvaluationRepository),
        resolver.resolve(TYPES.GrinderRepository),
        resolver.resolve(TYPES.RecipeRepository),
      ),
  )

  container.bind<IBrewerRepository>(TYPES.BrewerRepository, new InMemoryBrewerRepository())
  container.bind<IBrewGuideRepository>(TYPES.BrewGuideRepository, new InMemoryBrewGuideRepository())
  container.bind<IBrewingSessionRepository>(TYPES.BrewingSessionRepository, new InMemoryBrewingSessionRepository())
  container.bind<IEvaluationRepository>(TYPES.EvaluationRepository, new InMemoryEvaluationRepository())
  container.bind<IGrinderRepository>(TYPES.GrinderRepository, new InMemoryGrinderRepository())
  container.bind<IRecipeRepository>(TYPES.RecipeRepository, new InMemoryRecipeRepository())

  return container
}

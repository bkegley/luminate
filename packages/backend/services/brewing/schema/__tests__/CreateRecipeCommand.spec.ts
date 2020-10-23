import {Container} from '../src/utils/Container'
import {KafkaClient, Producer} from 'kafka-node'
import {TYPES} from '../src/utils/types'
import {ICommandRegistry, CommandRegistry, CommandType} from '../src/commands'
import {
  InMemoryBrewerRepository,
  IBrewerRepository,
  IRecipeRepository,
  InMemoryRecipeRepository,
  IGrinderRepository,
  InMemoryGrinderRepository,
} from '../src/repositories'
import {IEventRegistry, EventRegistry} from '../src/infra'
import {CreateRecipeCommand} from '../src/commands/Recipe/CreateRecipeCommand'
import {CreateRecipeInput} from '../src/types'
import {CreateRecipeDTO} from '../src/commands/Recipe/CreateRecipeDTO'
import {Brewer} from '../src/domain/Brewer'
import {BrewerName} from '../src/domain/Brewer/BrewerName'
import {EntityId} from '../src/shared'
import {Grinder} from '../src/domain/Grinder'
import {GrinderName} from '../src/domain/Grinder/GrinderName'
import {EventType} from '../src/domain/EventType'

class MockBrewerRepository extends InMemoryBrewerRepository {
  async getById(id: EntityId | string) {
    const entityId = id instanceof EntityId ? id : EntityId.create(id)
    return Brewer.create({name: BrewerName.create({value: name})}, entityId)
  }
}

class MockGrinderRepository extends InMemoryGrinderRepository {
  async getById(id: EntityId | string) {
    const entityId = id instanceof EntityId ? id : EntityId.create(id)
    return Grinder.create({name: GrinderName.create({value: name})}, entityId)
  }
}

describe('CreateRecipeCommand', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()
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
          resolver.resolve(TYPES.GrinderRepository),
          resolver.resolve(TYPES.RecipeRepository),
        ),
    )

    container.bind<IBrewerRepository>(TYPES.BrewerRepository, new MockBrewerRepository())
    container.bind<IGrinderRepository>(TYPES.GrinderRepository, new MockGrinderRepository())
    container.bind<IRecipeRepository>(TYPES.RecipeRepository, new InMemoryRecipeRepository())
  })

  afterEach(() => {
    container = null
  })

  it('correctly handles a CreateRecipeCommand by publishing a RecipeCommandEvent', async () => {
    expect.assertions(1)
    const recipeName = 'Test Recipe'
    const input: CreateRecipeInput = {
      name: recipeName,
      brewerId: '123',
      grinderId: '456',
    }

    const createRecipeCommand = new CreateRecipeCommand(input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateRecipeCommand, CreateRecipeDTO>(CommandType.CREATE_RECIPE_COMMAND, createRecipeCommand)
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const data = JSON.parse(sentMessagePayloads[0].messages)

        const expected = {
          event: EventType.RECIPE_CREATED_EVENT,
          data: {
            name: recipeName,
          },
        }
        expect(data).toMatchObject(expected)
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
  })
})

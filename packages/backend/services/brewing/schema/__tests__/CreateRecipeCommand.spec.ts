import {Container} from '../src/utils/Container'
import {Producer} from 'kafka-node'
import {TYPES} from '../src/utils/types'
import {ICommandRegistry, CommandType} from '../src/commands'
import {
  InMemoryBrewerRepository,
  IBrewerRepository,
  IGrinderRepository,
  InMemoryGrinderRepository,
} from '../src/repositories'
import {CreateRecipeCommand} from '../src/commands/Recipe/CreateRecipeCommand'
import {CreateRecipeInput} from '../src/types'
import {CreateRecipeDTO} from '../src/commands/Recipe/CreateRecipeDTO'
import {Brewer} from '../src/domain/Brewer'
import {BrewerName} from '../src/domain/Brewer/BrewerName'
import {EntityId} from '../src/shared'
import {Grinder} from '../src/domain/Grinder'
import {GrinderName} from '../src/domain/Grinder/GrinderName'
import {EventType} from '../src/domain/EventType'
import {buildCommandTestContainer} from './buildCommandTestContainer'

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
    container = buildCommandTestContainer()
    container.bind<IBrewerRepository>(TYPES.BrewerRepository, new MockBrewerRepository())
    container.bind<IGrinderRepository>(TYPES.GrinderRepository, new MockGrinderRepository())
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

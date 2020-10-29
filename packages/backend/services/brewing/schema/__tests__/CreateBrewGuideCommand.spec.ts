import {Container} from '../src/utils/Container'
import {Producer} from 'kafka-node'
import {TYPES} from '../src/utils/types'
import {ICommandRegistry, CommandType, CreateBrewGuideDTO, CreateBrewGuideCommand} from '../src/commands'
import {CreateBrewGuideInput} from '../src/types'
import {EventType} from '../src/domain/EventType'
import {buildCommandTestContainer} from './buildCommandTestContainer'
import {InMemoryRecipeRepository, IRecipeRepository} from '../src/repositories'
import {EntityId} from '../src/shared'
import {Recipe} from '../src/domain/Recipe'

class MockRecipeRepository extends InMemoryRecipeRepository {
  async getById(id: EntityId | string) {
    return ('I exist' as unknown) as Recipe
  }
}

describe('CreateBrewGuideCommand', () => {
  let container: Container

  beforeEach(() => {
    container = buildCommandTestContainer()
    container.bind<IRecipeRepository>(TYPES.RecipeRepository, new MockRecipeRepository())
  })

  afterEach(() => {
    container = null
  })

  it('correctly handles a CreateBrewGuideCommand by publishing a BrewGuideCommandEvent', async () => {
    expect.assertions(1)
    const brewGuideName = 'Test BrewGuide'
    const input: CreateBrewGuideInput = {
      name: brewGuideName,
      recipeId: '12345',
    }

    const createBrewGuideCommand = new CreateBrewGuideCommand(input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateBrewGuideCommand, CreateBrewGuideDTO>(
        CommandType.CREATE_BREW_GUIDE_COMMAND,
        createBrewGuideCommand,
      )
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const data = JSON.parse(sentMessagePayloads[0].messages)

        const expected = {
          event: EventType.BREW_GUIDE_CREATED_EVENT,
          data: {
            name: brewGuideName,
          },
        }

        expect(data).toMatchObject(expected)
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
  })
})

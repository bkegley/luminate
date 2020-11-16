import {Container, TYPES} from '../src/utils'
import {buildCommandTestContainer} from './buildCommandTestContainer'
import {DeleteBrewGuideCommand, ICommandRegistry, CommandType} from '../src/commands'
import {Producer} from 'kafka-node'
import {InMemoryBrewGuideRepository, IBrewGuideRepository} from '../src/repositories'
import {EntityId} from '../src/shared'
import {BrewGuide} from '../src/domain/BrewGuide'
import {EventType} from '../src/domain/EventType'
import {BrewGuideName} from '../src/domain/BrewGuide/BrewGuideName'

class MockBrewGuideRepository extends InMemoryBrewGuideRepository {
  async getById(id: EntityId | string) {
    const brewGuideId = id instanceof EntityId ? id : EntityId.create(id)
    return BrewGuide.create(
      {
        name: BrewGuideName.create({value: 'Test Brew Guide'}),
        recipeId: EntityId.create(),
      },
      brewGuideId,
    )
  }
}

describe('DeleteBrewGuideCommand', () => {
  let container: Container
  beforeEach(() => {
    container = buildCommandTestContainer()
  })
  afterEach(() => {
    container = null
  })

  it('handles a delete command by publishing a BrewGuideDeletedEvent', async () => {
    expect.assertions(1)
    container.bind<IBrewGuideRepository>(TYPES.BrewGuideRepository, new MockBrewGuideRepository())

    const id = '12345'

    const deleteBrewGuideCommand = new DeleteBrewGuideCommand(id)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<DeleteBrewGuideCommand, boolean>(CommandType.DELETE_BREW_GUIDE_COMMAND, deleteBrewGuideCommand)
      .then(() => {
        const messagePayload = send.mock.calls[0][0]
        const message = JSON.parse(messagePayload[0].messages)
        const expected = {
          event: EventType.BREW_GUIDE_DELETED_EVENT,
          data: {
            id,
          },
        }
        expect(message).toMatchObject(expected)
      })
  })

  it('throws if brewGuide does not exist', async () => {
    expect.assertions(1)

    const id = '12345'
    const deleteBrewGuideCommand = new DeleteBrewGuideCommand(id)

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<DeleteBrewGuideCommand, BrewGuide>(CommandType.DELETE_BREW_GUIDE_COMMAND, deleteBrewGuideCommand)
      .then(res => {
        expect(res).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBeDefined()
      })
  })
})

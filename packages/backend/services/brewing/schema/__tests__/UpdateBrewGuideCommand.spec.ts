import {Container, TYPES} from '../src/utils'
import {buildCommandTestContainer} from './buildCommandTestContainer'
import {InMemoryBrewGuideRepository, IBrewGuideRepository} from '../src/repositories'
import {BrewGuide} from '../src/domain/BrewGuide'
import {EntityId} from '../src/shared'
import {BrewGuideName} from '../src/domain/BrewGuide/BrewGuideName'
import {UpdateBrewGuideCommand, ICommandRegistry, CommandType} from '../src/commands'
import {UpdateBrewGuideInput} from '../src/types'
import {Producer} from 'kafka-node'
import {EventType} from '../src/domain/EventType'

class MockBrewGuideRepository extends InMemoryBrewGuideRepository {
  async getById(id: EntityId) {
    return BrewGuide.create({name: BrewGuideName.create({value: 'BrewGuide'}), recipeId: EntityId.create()}, id)
  }
}
describe('UpdateBrewGuideCommand', () => {
  let container: Container
  beforeEach(() => {
    container = buildCommandTestContainer()
    container.bind<IBrewGuideRepository>(TYPES.BrewGuideRepository, new MockBrewGuideRepository())
  })

  afterEach(() => {
    container = null
  })

  it('should update a BrewGuide and publish a BrewGuideUpdatedEvent', () => {
    expect.assertions(1)

    const input: UpdateBrewGuideInput = {
      name: 'UpdatedName',
      recipeId: '123',
    }

    const command = new UpdateBrewGuideCommand('12345', input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process(CommandType.UPDATE_BREW_GUIDE_COMMAND, command)
      .then(() => {
        const messagePayload = send.mock.calls[0][0]
        const message = JSON.parse(messagePayload[0].messages)

        const expected = {
          event: EventType.BREW_GUIDE_UPDATED_EVENT,
          data: input,
        }

        expect(message).toMatchObject(expected)
      })
  })
})

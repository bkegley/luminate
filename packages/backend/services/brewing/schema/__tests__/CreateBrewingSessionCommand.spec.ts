import {Container} from '../src/utils/Container'
import {Producer} from 'kafka-node'
import {TYPES} from '../src/utils/types'
import {ICommandRegistry, CommandType, CreateBrewingSessionCommand} from '../src/commands'
import {CreateBrewingSessionInput} from '../src/types'
import {EventType} from '../src/domain/EventType'
import {buildCommandTestContainer} from './buildCommandTestContainer'

describe('CreateBrewingSessionCommand', () => {
  let container: Container

  beforeEach(() => {
    container = buildCommandTestContainer()
  })

  afterEach(() => {
    container = null
  })

  it('correctly handles a CreateBrewingSessionCommand by publishing a BrewingSessionCommandEvent', async () => {
    expect.assertions(1)
    const input: CreateBrewingSessionInput = {
      date: '2020-10-29',
    }

    const createBrewingSessionCommand = new CreateBrewingSessionCommand(input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateBrewingSessionCommand, any>(
        CommandType.CREATE_BREWING_SESSION_COMMAND,
        createBrewingSessionCommand,
      )
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const data = JSON.parse(sentMessagePayloads[0].messages)

        const expected = {
          event: EventType.BREWING_SESSION_CREATED_EVENT,
          data: {
            date: new Date(input.date).toString(),
          },
        }

        expect(data).toMatchObject(expected)
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
  })
})

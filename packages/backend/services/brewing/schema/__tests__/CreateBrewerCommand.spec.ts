import {Container} from '../src/utils/Container'
import {Producer} from 'kafka-node'
import {TYPES} from '../src/utils/types'
import {ICommandRegistry, CommandType, CreateBrewerCommand} from '../src/commands'
import {CreateBrewerInput} from '../src/types'
import {EventType} from '../src/domain/EventType'
import {buildCommandTestContainer} from './buildCommandTestContainer'

describe('CreateBrewerCommand', () => {
  let container: Container

  beforeEach(() => {
    container = buildCommandTestContainer()
  })

  afterEach(() => {
    container = null
  })

  it('correctly handles a CreateBrewerCommand by publishing a BrewerCommandEvent', async () => {
    expect.assertions(1)
    const brewerName = 'Test Brewer'
    const input: CreateBrewerInput = {
      name: brewerName,
    }

    const createBrewerCommand = new CreateBrewerCommand(input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process(CommandType.CREATE_BREWER_COMMAND, createBrewerCommand)
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const data = JSON.parse(sentMessagePayloads[0].messages)

        const expected = {
          event: EventType.BREWER_CREATED_EVENT,
          data: {
            name: brewerName,
          },
        }

        expect(data).toMatchObject(expected)
      })
      .catch(err => {
        console.log({err})
        expect(err).toBeUndefined()
      })
  })
})

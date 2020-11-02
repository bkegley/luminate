import {Container} from '../src/utils/Container'
import {Producer} from 'kafka-node'
import {TYPES} from '../src/utils/types'
import {ICommandRegistry, CommandType, CreateEvaluationCommand} from '../src/commands'
import {CreateEvaluationInput} from '../src/types'
import {EventType} from '../src/domain/EventType'
import {buildCommandTestContainer} from './buildCommandTestContainer'

describe('CreateEvaluationCommand', () => {
  let container: Container

  beforeEach(() => {
    container = buildCommandTestContainer()
  })

  afterEach(() => {
    container = null
  })

  it('correctly handles a CreateEvaluationCommand by publishing a EvaluationCreatedEvent', async () => {
    expect.assertions(1)
    const input: CreateEvaluationInput = {
      date: '2020-10-29',
    }

    const createEvaluationCommand = new CreateEvaluationCommand(input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateEvaluationCommand, any>(CommandType.CREATE_EVALUATION_COMMAND, createEvaluationCommand)
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const data = JSON.parse(sentMessagePayloads[0].messages)

        const expected = {
          event: EventType.EVALUATION_CREATED_EVENT,
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

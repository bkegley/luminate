import {buildCommandTestContainer} from './buildCommandTestContainer'
import {Container, TYPES} from '../src/utils'
import {UpdateEvaluationInput} from '../src/types'
import {Producer} from 'kafka-node'
import {ICommandRegistry, CommandType, UpdateEvaluationCommand, IUpdateEvaluationCommandHandler} from '../src/commands'
import {EventType} from '../src/domain/EventType'
import {EntityId} from '../src/shared'
import {InMemoryEvaluationRepository, IEvaluationRepository} from '../src/repositories'
import {Evaluation} from '../src/domain/Evaluation'
import {DateEntity} from '../src/domain/Date'

class MockEvaluationRepository extends InMemoryEvaluationRepository {
  async getById(id: EntityId | string) {
    const evaluationId = id instanceof EntityId ? id : EntityId.create(id)
    return Evaluation.create({}, evaluationId)
  }
}

describe('UpdateEvaluationCommand', () => {
  let container: Container

  beforeEach(() => {
    container = buildCommandTestContainer()
  })

  afterEach(() => {
    container = null
  })

  it('handles an UpdateEvaluationCommand by publishing an EvaluationUpdatedEvent', async () => {
    expect.assertions(1)

    container.bind<IEvaluationRepository>(TYPES.EvaluationRepository, new MockEvaluationRepository())

    const id = EntityId.create()

    const input: UpdateEvaluationInput = {
      date: '2020-11-01',
    }

    const updateEvaluationCommand = new UpdateEvaluationCommand(id.toString(), input)
    const producer = container.resolve<Producer>(TYPES.KafkaProducer)

    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<IUpdateEvaluationCommandHandler>(CommandType.UPDATE_EVALUATION_COMMAND, updateEvaluationCommand)
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const data = JSON.parse(sentMessagePayloads[0].messages)

        const expected = {
          event: EventType.EVALUATION_UPDATED_EVENT,
          data: {
            date: DateEntity.create({value: input.date}).value,
          },
        }
        expect(data).toMatchObject(expected)
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
  })

  it("throws if the evaluation doesn't exist", async () => {
    expect.assertions(1)
    const input: UpdateEvaluationInput = {}

    const updateEvaluationCommand = new UpdateEvaluationCommand('does not exist', input)
    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process(CommandType.UPDATE_EVALUATION_COMMAND, updateEvaluationCommand)
      .then(res => {
        expect(res).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBeDefined()
      })
  })
})

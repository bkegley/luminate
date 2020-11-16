import {Container, TYPES} from '../src/utils'
import {buildCommandTestContainer} from './buildCommandTestContainer'
import {DeleteEvaluationCommand, ICommandRegistry, CommandType} from '../src/commands'
import {Producer} from 'kafka-node'
import {InMemoryEvaluationRepository, IEvaluationRepository} from '../src/repositories'
import {EntityId} from '../src/shared'
import {Evaluation} from '../src/domain/Evaluation'
import {EventType} from '../src/domain/EventType'

class MockEvaluationRepository extends InMemoryEvaluationRepository {
  async getById(id: EntityId | string) {
    const evaluationId = id instanceof EntityId ? id : EntityId.create(id)
    return Evaluation.create({}, evaluationId)
  }
}

describe('DeleteEvaluationCommand', () => {
  let container: Container
  beforeEach(() => {
    container = buildCommandTestContainer()
  })
  afterEach(() => {
    container = null
  })

  it('handles a delete command by publishing a EvaluationDeletedEvent', async () => {
    expect.assertions(1)
    container.bind<IEvaluationRepository>(TYPES.EvaluationRepository, new MockEvaluationRepository())

    const id = '12345'

    const deleteEvaluationCommand = new DeleteEvaluationCommand(id)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<DeleteEvaluationCommand, boolean>(CommandType.DELETE_EVALUATION_COMMAND, deleteEvaluationCommand)
      .then(() => {
        const messagePayload = send.mock.calls[0][0]
        const message = JSON.parse(messagePayload[0].messages)
        const expected = {
          event: EventType.EVALUATION_DELETED_EVENT,
          data: {
            id,
          },
        }
        expect(message).toMatchObject(expected)
      })
  })

  it('throws if evaluation does not exist', async () => {
    expect.assertions(1)

    const id = '12345'
    const deleteEvaluationCommand = new DeleteEvaluationCommand(id)

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<DeleteEvaluationCommand, boolean>(CommandType.DELETE_EVALUATION_COMMAND, deleteEvaluationCommand)
      .then(res => {
        expect(res).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBeDefined()
      })
  })
})

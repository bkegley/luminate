import {CreateRoleCommand, CreateRoleCommandHandler} from '.'
import {Producer, KafkaClient} from 'kafka-node'

jest.mock('kafka-node')

const producer = new Producer(new KafkaClient())

describe('CreateRoleMutation', () => {
  it.skip('calls handle with the CreateRoleCommand', done => {
    const createRoleCommand = new CreateRoleCommand({
      name: 'TestRole',
      scopes: ['read:tests'],
      account: '12345',
    })

    const handler = new CreateRoleCommandHandler(producer)

    return handler
      .handle(createRoleCommand)
      .then(res => {
        expect(producer.send).toHaveBeenCalledWith()
        expect(res.scopes).toBe(createRoleCommand.scopes)
        done()
      })
      .catch(err => {
        console.log({err})
        done()
      })
  })
})

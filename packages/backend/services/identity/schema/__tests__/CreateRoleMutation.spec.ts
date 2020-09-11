import {Container} from '../src/utils/Container'
import {TYPES} from '../src/utils/types'
import {Producer, KafkaClient} from 'kafka-node'
import {
  IAccountsAggregate,
  IRolesAggregate,
  IUsersAggregate,
  AccountsAggregate,
  RolesAggregate,
  UsersAggregate,
} from '../src/aggregates'
import {ICommandRegistry, CommandRegistry, CreateRoleCommand, CommandType} from '../src/commands'
import {EventType} from '../src/events'

const container = new Container()
container.bind<Producer>(TYPES.KafkaProducer, new Producer(new KafkaClient()))
container.bind<KafkaClient>(TYPES.KafkaClient, new KafkaClient())
container.bind<ICommandRegistry>(
  TYPES.CommandRegistry,
  resolver =>
    new CommandRegistry(
      resolver.resolve(TYPES.KafkaProducer),
      resolver.resolve(TYPES.AccountsAggregate),
      resolver.resolve(TYPES.UsersAggregate),
      resolver.resolve(TYPES.RolesAggregate),
    ),
)
container.bind<IAccountsAggregate>(TYPES.AccountsAggregate, new AccountsAggregate())
container.bind<IRolesAggregate>(TYPES.RolesAggregate, new RolesAggregate())
container.bind<IUsersAggregate>(TYPES.UsersAggregate, new UsersAggregate())

describe('CreateRole Mutation', () => {
  it('correctly publishes the RoleCreatedEvent', async () => {
    expect.assertions(1)
    const input = {name: 'TestRole', scopes: ['read:tests'], account: 'TestAccount'}

    const createRoleCommand = new CreateRoleCommand(input)

    const producer = container.resolve<Producer>(TYPES.KafkaProducer)
    const send = jest.spyOn(producer, 'send')

    container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateRoleCommand, {name: string; scopes: string[]; account: string}>(
        CommandType.CREATE_ROLE_COMMAND,
        createRoleCommand,
      )
      .then(() => {
        const sentMessagePayloads = send.mock.calls[0][0]
        const message = JSON.parse(sentMessagePayloads[0].messages)
        const match = {event: EventType.ROLE_CREATED_EVENT, data: {scopes: input.scopes, name: input.name}}

        expect(message).toMatchObject(match)
      })
      .catch(err => {
        console.log({err})
      })
  })
})

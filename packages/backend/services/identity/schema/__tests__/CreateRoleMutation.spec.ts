import {Container} from '../src/utils/Container'
import {TYPES} from '../src/utils/types'
import {Producer, KafkaClient} from 'kafka-node'
import {ICommandRegistry, CommandRegistry, CreateRoleCommand, CommandType} from '../src/commands'
import {EventType} from '../src/events'
import {Types} from 'mongoose'
import {IAccountsRepo, IUsersRepo, IRolesRepo, AccountsRepo, RolesRepo, UsersRepo} from '../src/repos'

describe('CreateRoleCommand', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()
    container.bind<Producer>(TYPES.KafkaProducer, new Producer(new KafkaClient()))
    container.bind<KafkaClient>(TYPES.KafkaClient, new KafkaClient())
    container.bind<ICommandRegistry>(
      TYPES.CommandRegistry,
      resolver =>
        new CommandRegistry(
          resolver.resolve(TYPES.KafkaProducer),
          resolver.resolve(TYPES.AccountsRepo),
          resolver.resolve(TYPES.UsersRepo),
          resolver.resolve(TYPES.RolesRepo),
        ),
    )
    container.bind<IAccountsRepo>(TYPES.AccountsRepo, new AccountsRepo())
    container.bind<IRolesRepo>(TYPES.RolesRepo, new RolesRepo())
    container.bind<IUsersRepo>(TYPES.UsersRepo, new UsersRepo())
  })

  afterEach(() => {
    container = null
  })

  it('correctly handles the CreateRoleCommand by publishing a RoleCreatedEvent', async () => {
    expect.assertions(1)
    const account = new Types.ObjectId('Test Account').toHexString()
    const commandInput = {
      name: 'TestRole',
      scopes: ['read:tests'],
      account: account,
    }
    const createRoleCommand = new CreateRoleCommand(commandInput)

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
        const match = {
          event: EventType.ROLE_CREATED_EVENT,
          data: {
            scopes: commandInput.scopes,
            name: commandInput.name,
            readAccess: [commandInput.account],
            writeAccess: [commandInput.account],
            adminAccess: [commandInput.account],
          },
        }

        expect(message).toMatchObject(match)
      })
      .catch(err => {
        console.log({err})
      })
  })
  it.skip('throws an error if role name already exists on account', async () => {
    expect.assertions(1)
    const account = new Types.ObjectId('Test Account').toHexString()
    const commandInput = {
      name: 'TestRole',
      scopes: ['read:tests'],
      account: account,
    }

    const createRoleCommand = new CreateRoleCommand(commandInput)

    await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateRoleCommand, {name: string; scopes: string[]; account: string}>(
        CommandType.CREATE_ROLE_COMMAND,
        createRoleCommand,
      )
      .catch(() => {})

    const data = await container
      .resolve<ICommandRegistry>(TYPES.CommandRegistry)
      .process<CreateRoleCommand, {name: string; scopes: string[]; account: string}>(
        CommandType.CREATE_ROLE_COMMAND,
        createRoleCommand,
      )
      .catch(err => {
        expect(err).toBeDefined()
      })

    expect(data).toBeNull()
  })
})

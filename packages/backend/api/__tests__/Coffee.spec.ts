import {Test} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import {CommandBus, CqrsModule} from '@nestjs/cqrs'
import {Token} from '@luminate/mongo-utils'
import {CreateCoffeeCommand, CreateCoffeeCommandHandler} from '../src/application/commands'
import {CoffeesRepo} from '../src/infra/repos'
import {getModelToken} from '@nestjs/mongoose'
import {createModel} from './MockedModel'

const handlers = [CreateCoffeeCommandHandler]

const testUser: Token = {
  jti: '12345',
  sub: '12345',
  exp: 12345,
  iat: 12345,
}

describe('Coffee', () => {
  let app: INestApplication
  let commandBus: CommandBus

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [...handlers, CoffeesRepo, {provide: getModelToken('coffee'), useValue: createModel({hey: 'there'})}],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

    commandBus = moduleRef.get<CommandBus>(CommandBus)
  })

  it('issues a command', async () => {
    const command = new CreateCoffeeCommand(testUser, {name: 'Test Coffee'})
    await commandBus.execute(command)
  })

  afterAll(() => {
    app.close()
  })
})

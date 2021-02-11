import {Resolver, Context, Query, Mutation, Args} from '@nestjs/graphql'
import {UseGuards} from '@nestjs/common'
import {AuthGuard} from '../guards'
import {QueryBus, CommandBus} from '@nestjs/cqrs'
import {Response} from 'express'
import jwt from 'jsonwebtoken'
import {Token} from '@luminate/mongo-utils'
import {GetMeQuery} from '../queries'
import {UserMapper} from '../../infra/mappers/UserMapper'
import {LoginUserCommand, UpdateUserPasswordCommand, SwitchAccountCommand} from '../commands'
import {UpdatePasswordInput} from '../../types'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Query('me')
  async getMe(@Context('user') user: Token) {
    const query = new GetMeQuery(user)
    const me = await this.queryBus.execute(query)

    return UserMapper.toDTO(me)
  }

  @Mutation('login')
  async login(@Args('username') username: string, @Args('password') password: string, @Context('res') res: Response) {
    const command = new LoginUserCommand(username, password)
    const token = await this.commandBus.execute(command)

    if (!token) return false

    res.cookie('id', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    })
    return token
  }

  @UseGuards(AuthGuard)
  @Mutation('logout')
  async logout(@Context('user') user: Token, @Context('res') res: Response) {
    console.log({user})
    if (!user) {
      return false
    }

    res.cookie('id', '', {
      expires: new Date(0),
    })

    return true
  }

  @Mutation('refreshToken')
  async refreshToken(@Context('user') user: Token, @Context('res') res: Response) {
    if (!user) return null
    const {iat, exp, ...remainingToken} = user
    const token = jwt.sign(remainingToken, USER_AUTH_TOKEN, {expiresIn: '10m'})

    if (!token) {
      res.cookie('id', '', {
        expires: new Date(0),
      })
      return false
    }

    res.cookie('id', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    })
    return true
  }

  @UseGuards(AuthGuard)
  @Mutation('updatePassword')
  async updatePassword(@Args('id') id: string, @Args('input') input: UpdatePasswordInput) {
    const command = new UpdateUserPasswordCommand(id, input)
    return this.commandBus.execute(command)
  }

  @UseGuards(AuthGuard)
  @Mutation('switchAccount')
  async switchAccount(
    @Args('acccountId') accountId: string,
    @Context('user') user: Token,
    @Context('res') res: Response,
  ) {
    const command = new SwitchAccountCommand(user, accountId)
    const token = await this.commandBus.execute(command)

    if (!token) return false

    res.cookie('id', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    })
    return true
  }
}

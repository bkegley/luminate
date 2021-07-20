import {Resolver, Context, Query, Mutation, Args} from '@nestjs/graphql'
import {UseGuards} from '@nestjs/common'
import {AuthGuard} from '../guards'
import {QueryBus, CommandBus} from '@nestjs/cqrs'
import {Response} from 'express'
import {Token} from '@luminate/mongo-utils'
import {GetMeQuery} from '../queries'
import {UserMapper} from '../../infra/mappers/UserMapper'
import {LoginUserCommand, UpdateUserPasswordCommand, SwitchAccountCommand, LogoutUserCommand} from '../commands'
import {UpdatePasswordInput} from '../../types'
import {RefreshTokenCommand} from '../commands/User/RefreshTokenCommand'

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
    const response = await this.commandBus.execute(command)

    if (!response) return false

    const {jwtToken, refreshToken} = response

    res.cookie('lmt_ref', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    return jwtToken
  }

  @Mutation('logout')
  async logout(@Context('refreshToken') refreshToken: string, @Context('res') res: Response) {
    if (!refreshToken) {
      return false
    }

    const command = new LogoutUserCommand(refreshToken)
    const response = await this.commandBus.execute(command)

    res.clearCookie('lmt_ref')

    return response
  }

  @Mutation('refreshToken')
  async refreshToken(
    @Context('user') user: Token,
    @Context('refreshToken') refreshToken: string,
    @Context('res') res: Response,
  ) {
    const command = new RefreshTokenCommand(refreshToken, user)
    const token = await this.commandBus.execute(command)

    if (!token) {
      res.clearCookie('lmt_ref')
      return null
    }
    return token
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

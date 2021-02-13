import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {LoginUserCommand} from './LoginUserCommand'
import {ILoginUserCommandHandler} from '.'
import {RefreshTokensRepo, UsersRepo} from '../../../infra/repos'
import {TokenService} from '../../../infra/services/TokenService'

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ILoginUserCommandHandler {
  constructor(
    private eventBus: EventBus,
    private usersRepo: UsersRepo,
    private tokenService: TokenService,
    private refreshTokensRepo: RefreshTokensRepo,
  ) {}

  public async execute(command: LoginUserCommand) {
    const {username, password} = command

    // check for existing user
    const user = await this.usersRepo.getByUsername(username)

    if (!user) {
      return null
    }

    const matches = user.comparePassword(password)

    if (!matches) {
      return null
    }

    const jwtToken = await this.tokenService.createJwt(user)

    const refreshToken = this.tokenService.createRefreshToken(user)

    await this.refreshTokensRepo.save(refreshToken)

    user.events.forEach(event => this.eventBus.publish(event))

    return {
      jwtToken,
      refreshToken: refreshToken.token.value,
    }
  }
}

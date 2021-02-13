import {CommandHandler} from '@nestjs/cqrs'
import {RefreshTokensRepo, UsersRepo} from '../../../infra/repos'
import {RefreshTokenCommand, IRefreshTokenCommandHandler} from '.'
import {TokenService} from '../../../infra/services/TokenService'

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenComandHandler implements IRefreshTokenCommandHandler {
  constructor(
    private readonly refreshTokensRepo: RefreshTokensRepo,
    private readonly usersRepo: UsersRepo,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<string> {
    const refreshToken = await this.refreshTokensRepo.getByToken(command.refreshToken)
    if (!refreshToken) {
      return null
    }

    const {userId} = refreshToken
    const user = await this.usersRepo.getById(userId.toString())

    const token = await this.tokenService.createJwt(user, command.accessToken)

    return token
  }
}

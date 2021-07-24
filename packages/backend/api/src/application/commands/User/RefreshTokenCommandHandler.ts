import {CommandHandler} from '@nestjs/cqrs'
import {RefreshTokensRepo, UsersRepo} from '../../../infra/repos'
import {RefreshTokenCommand, IRefreshTokenCommandHandler} from '.'
import {TokenService} from '../../../infra/services/TokenService'
import {RefreshTokenMapper, UserMapper} from '../../../infra/mappers'

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler implements IRefreshTokenCommandHandler {
  constructor(
    private readonly refreshTokensRepo: RefreshTokensRepo,
    private readonly usersRepo: UsersRepo,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<string> {
    const refreshTokenDocument = await this.refreshTokensRepo.getByToken(command.refreshToken)
    if (!refreshTokenDocument) {
      return null
    }

    const refreshToken = RefreshTokenMapper.toDomain(refreshTokenDocument)

    const {userId} = refreshToken

    const userDocument = await this.usersRepo.getByIdForRefreshToken(userId.toString())
    const user = UserMapper.toDomain(userDocument)

    const token = await this.tokenService.createJwt(user, command.accessToken)

    return token
  }
}

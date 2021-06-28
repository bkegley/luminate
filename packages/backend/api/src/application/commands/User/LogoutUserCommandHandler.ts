import {CommandHandler} from '@nestjs/cqrs'
import {LogoutUserCommand} from './LogoutUserCommand'
import {RefreshTokensRepo} from '../../../infra/repos'
import {ILogoutUserCommandHandler} from '.'
import {RefreshTokenMapper} from '../../../infra/mappers'

@CommandHandler(LogoutUserCommand)
export class LogoutUserCommandHandler implements ILogoutUserCommandHandler {
  constructor(private readonly refreshTokensRepo: RefreshTokensRepo) {}

  async execute(command: LogoutUserCommand): Promise<boolean> {
    const tokenDocument = await this.refreshTokensRepo.getByToken(command.token)
    if (!tokenDocument) {
      return false
    }

    const token = RefreshTokenMapper.toDomain(tokenDocument)

    token.revoke()
    await this.refreshTokensRepo.save(token)
    return true
  }
}

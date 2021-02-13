import {CommandHandler} from '@nestjs/cqrs'
import {LogoutUserCommand} from './LogoutUserCommand'
import {RefreshTokensRepo} from '../../../infra/repos'
import {ILogoutUserCommandHandler} from '.'

@CommandHandler(LogoutUserCommand)
export class LogoutUserCommandHandler implements ILogoutUserCommandHandler {
  constructor(private readonly refreshTokensRepo: RefreshTokensRepo) {}

  async execute(command: LogoutUserCommand): Promise<boolean> {
    const token = await this.refreshTokensRepo.getByToken(command.token)
    if (!token) {
      return false
    }

    token.revoke()
    await this.refreshTokensRepo.save(token)
    return true
  }
}

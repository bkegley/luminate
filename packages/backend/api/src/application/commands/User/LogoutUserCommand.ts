export class LogoutUserCommand {
  token: string

  constructor(token: string) {
    this.token = token
  }
}

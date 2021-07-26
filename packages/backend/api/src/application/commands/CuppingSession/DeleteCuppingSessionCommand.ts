import {Token} from '@luminate/mongo-utils'

export class DeleteCuppingSessionCommand {
  constructor(public user: Token, public id: string) {}
}

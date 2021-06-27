import {Token} from '@luminate/mongo-utils'

export class DeletePostCommand {
  constructor(public user: Token, public id: string) {}
}

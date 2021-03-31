import {Token} from '@luminate/mongo-utils'

export class DeleteViewCommand {
  constructor(public user: Token, public id: string) {}
}

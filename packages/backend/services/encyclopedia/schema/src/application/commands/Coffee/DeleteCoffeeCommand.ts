import {Token} from '@luminate/mongo-utils'

export class DeleteCoffeeCommand {
  constructor(public user: Token, public id: string) {}
}

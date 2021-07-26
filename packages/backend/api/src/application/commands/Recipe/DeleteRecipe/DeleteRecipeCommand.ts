import {Token} from '@luminate/mongo-utils'

export class DeleteRecipeCommand {
  constructor(public user: Token, public id: string) {}
}

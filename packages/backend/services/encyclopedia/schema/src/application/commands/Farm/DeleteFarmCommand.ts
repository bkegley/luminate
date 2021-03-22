import {Token} from '@luminate/mongo-utils'

export class DeleteFarmCommand {
  constructor(public user: Token, public id: string) {}
}

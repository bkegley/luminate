import {Token} from '@luminate/mongo-utils'

export class DeleteBrewerCommand {
  constructor(public user: Token, public id: string) {}
}

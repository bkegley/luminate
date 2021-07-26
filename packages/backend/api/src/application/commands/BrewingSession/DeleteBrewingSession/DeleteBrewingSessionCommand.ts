import {Token} from '@luminate/mongo-utils'

export class DeleteBrewingSessionCommand {
  constructor(public user: Token, public id: string) {}
}

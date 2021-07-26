import {Token} from '@luminate/mongo-utils'

export class DeleteBrewGuideCommand {
  constructor(public user: Token, public id: string) {}
}

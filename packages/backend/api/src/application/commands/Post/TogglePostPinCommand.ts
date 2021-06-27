import {Token} from '@luminate/mongo-utils'

export class TogglePostPinCommand {
  constructor(public user: Token, public id: string, public entityId: string) {}
}

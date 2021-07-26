import {Token} from '@luminate/mongo-utils'

export class DeleteGrinderCommand {
  constructor(public user: Token, public id: string) {}
}

import {UpdateGrinderInput} from '../../../../types'

export class UpdateGrinderCommand {
  name: string
  description: string
  burrSet: string

  constructor(public id: string, input: UpdateGrinderInput) {
    this.name = input.name
    this.description = input.description
    this.burrSet = input.burrSet
  }
}

import {CreateGrinderInput} from '../types'
import {GrinderName} from '../domain/GrinderName'
import {GrinderDescription} from '../domain/GrinderDescription'
import {GrinderBurrSet, GrinderBurrSetEnum} from '../domain/GrinderBurrSet'

export class CreateGrinderCommand {
  name: GrinderName
  description: GrinderDescription
  burrSet: GrinderBurrSet

  constructor(input: CreateGrinderInput) {
    if (input.name) {
      this.name = GrinderName.create({value: input.name})
    }

    if (input.description) {
      this.description = GrinderDescription.create({value: input.description})
    }

    if (input.burrSet) {
      this.burrSet = GrinderBurrSet.create({value: (input.burrSet as unknown) as GrinderBurrSetEnum})
    }
  }
}

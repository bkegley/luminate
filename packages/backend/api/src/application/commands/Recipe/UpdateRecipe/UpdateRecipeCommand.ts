import {UpdateRecipeInput} from '../../../../types'

export class UpdateRecipeCommand {
  constructor(public id: string, public input: UpdateRecipeInput) {}
}

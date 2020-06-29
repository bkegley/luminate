import * as mongoose from 'mongoose'

export const extendSchema = (
  Schema: mongoose.Schema,
  definition: mongoose.SchemaDefinition,
  options?: mongoose.SchemaOptions,
) => {
  return new mongoose.Schema(
    {
      ...Schema.obj,
      ...definition,
    },
    options,
  )
}

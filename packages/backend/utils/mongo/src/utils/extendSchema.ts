import * as mongoose from 'mongoose'

export const extendSchema = <T>(
  Schema: mongoose.Schema,
  definition: mongoose.SchemaDefinition<T>,
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

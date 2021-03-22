import * as mongoose from 'mongoose'

export const extendSchema = <T>(
  Schema: mongoose.Schema,
  // FIX: types broken on current mongoose
  // @ts-ignore
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

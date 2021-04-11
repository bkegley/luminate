export const getFieldSelection = (field: string, obj: object) => {
  const fields = field.split('.')
  const recurseFieldSelection = () =>
    fields.reduce(
      (acc, field) => {
        if (!acc[field]) {
          throw new Error(`'${field}' is not a valid field selection`)
        }

        return acc[field]
      },
      //return Array.isArray(acc[field]) ? acc[field].map(inner => )
      obj,
    )

  return recurseFieldSelection()
}

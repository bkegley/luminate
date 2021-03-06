import mongoose from 'mongoose'

export const createMongoConnection = async (
  databaseUrl = process.env.DB_URL ||
    `mongodb://localhost:27017/${process.env.NODE_ENV !== 'production' ? `${process.env.NODE_ENV}-` : ''}${
      process.env.DB_NAME || 'luminate-server'
    }`,
) => {
  mongoose.set('useFindAndModify', false)
  await mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
    })
    .then(
      () => {
        console.log(`Connected to MongoDB at ${databaseUrl}`)
      },
      err => {
        process.exit(1)
      },
    )
}

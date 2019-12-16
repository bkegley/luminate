import mongoose from 'mongoose'

const createDbConnection = (
  databaseUrl = process.env.DB_URL ||
    `mongodb://localhost:27017/${process.env.NODE_ENV !== 'production' ? `${process.env.NODE_ENV}-` : ''}${process.env
      .DB_NAME || 'luminate-server'}`,
) => {
  mongoose.set('useFindAndModify', false)
  mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
    })
    .then(
      () => {
        console.log(`Connected to MongoDB at ${databaseUrl}`)
      },
      err => {
        console.log(`Mongodb connection error: \n${err}`)
      },
    )
}

export default createDbConnection

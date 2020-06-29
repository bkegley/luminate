export * from './createMongoConnection'
export * from './abstract'
export * from './utils'

let scopes = {}
try {
  scopes = require('./scopes')
} catch {
  console.warn('Scopes do not exist - You should generate them')
}

export {scopes}

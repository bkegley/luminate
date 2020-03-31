import createMongoConnection from './createMongoConnection'
import {models} from './models'
const {Role} = models

export enum ScopeResources {
  ACCOUNT = 'account',
  COFFEE = 'coffee',
  COUNTRY = 'country',
  CUPPING = 'cupping',
  DEVICE = 'device',
  FARM = 'farm',
  ORGANIZATION = 'organization',
  PERSON = 'person',
  USER = 'user',
  REGION = 'region',
  ROLE = 'role',
  SCOPE = 'scope',
  VARIETY = 'variety',
}

export enum ScopeOperations {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
}

const seedDatabase = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const scopes = Object.values(ScopeOperations)
    .map(operation => {
      return Object.values(ScopeResources).map(resource => `${operation}:${resource}`)
    })
    .reduce((acc, arr) => acc.concat(arr), [])
  await Role.findOneAndUpdate({name: 'Owner'}, {scopes, permissionType: 'public'}, {upsert: true})
  console.log('Updated Owner role to have all scopes')
}

export default seedDatabase

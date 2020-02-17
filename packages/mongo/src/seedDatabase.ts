import createMongoConnection from './createMongoConnection'
import {models} from './models'
import {ScopeOperations, ScopeResources} from '@luminate/graphql-utils'
const {Role} = models

const populateDb = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const scopes = Object.values(ScopeOperations)
    .map(operation => {
      return Object.values(ScopeResources).map(resource => `${operation}:${resource}`)
    })
    .reduce((acc, arr) => acc.concat(arr), [])
  await Role.findOneAndUpdate({name: 'Owner'}, {scopes, permissionType: 'public'}, {upsert: true})
  console.log('Updated Owner role to have all scopes')
  process.exit()
}

populateDb()

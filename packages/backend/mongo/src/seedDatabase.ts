import {models} from './models'
const {Role} = models
import {ScopeOperations, ScopeResources} from './abstract/scopeEnums'

const seedDatabase = async () => {
  const scopes = Object.values(ScopeOperations)
    .map(operation => {
      return Object.values(ScopeResources).map(resource => `${operation}:${resource}`)
    })
    .reduce((acc, arr) => acc.concat(arr), [])
  await Role.findOneAndUpdate({name: 'Owner'}, {scopes, permissionType: 'public'}, {upsert: true})
  console.log('Updated Owner role to have all scopes')
}

export default seedDatabase

import {RoleModel} from './infra/models'
import {ScopeOperations, ScopeResources} from '@luminate/mongo-utils'

export const seedDatabase = async () => {
  const scopes = Object.values(ScopeOperations)
    .map(operation => {
      return Object.values(ScopeResources).map(resource => `${operation}:${resource}`)
    })
    .reduce((acc, arr) => acc.concat(arr), [])
  await RoleModel.findOneAndUpdate({name: 'Owner'}, {scopes, permissionType: 'public'}, {upsert: true})
  console.log('Updated Owner role to have all scopes')
}

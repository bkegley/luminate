import {ScopeOperations, ScopeResources} from '@luminate/mongo-utils'

export const seedDatabase = async (roleModel: any) => {
  const scopes = Object.values(ScopeOperations)
    .map(operation => {
      return Object.values(ScopeResources).map(resource => `${operation}:${resource}`)
    })
    .reduce((acc, arr) => acc.concat(arr), [])
  await roleModel.updateOne({name: 'Owner'}, {scopes, permissionType: 'public'}, {upsert: true})
  console.log('Updated Owner role to have all scopes')
}

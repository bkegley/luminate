import resources from './resources'
import createMongoConnection from './createMongoConnection'
import {models} from './models'
const {Scope, Role} = models

const operations = ['read', 'write', 'admin'] as const

interface CreateScopeInput {
  resource: typeof resources[number]
  operation: typeof operations[number]
  name: string
}

const populateDb = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const scopeInputs = resources.reduce((acc, resource) => {
    return acc.concat(
      operations.map(operation => ({resource, operation, name: `${operation}:${resource}`, permissionType: 'public'})),
    )
  }, [] as CreateScopeInput[])

  const scopes = await Promise.all(
    scopeInputs.map(input => {
      return Scope.findOneAndUpdate({name: input.name}, input, {new: true, upsert: true})
    }),
  )

  console.log(`Updated ${scopes.length} scopes`)
  await Role.findOneAndUpdate(
    {name: 'Owner'},
    {$set: {scopes: scopes.map(scope => scope._id)}, permissionType: 'public'},
    {upsert: true},
  )
  console.log('Updated Owner role to have all scopes')
  process.exit()
}

populateDb()

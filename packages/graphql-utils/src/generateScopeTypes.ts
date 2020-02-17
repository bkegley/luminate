import fs from 'fs'
import path from 'path'
import {ScopeOperations, ScopeResources} from './scopeEnums'

const scopes = Object.keys(ScopeOperations).reduce((acc, operationKey) => {
  return Object.assign(
    acc,
    ...Object.keys(ScopeResources).map(resourceKey => {
      return {
        // @ts-ignore
        [`${ScopeOperations[operationKey]}:${ScopeResources[resourceKey]}`]: `${ScopeOperations[operationKey]}:${ScopeResources[resourceKey]}`,
      }
    }),
  )
}, {})

fs.writeFileSync(path.join(__dirname, 'scopes.ts'), `export const scopes = ${JSON.stringify(scopes)}`)

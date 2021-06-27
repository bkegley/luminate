import {Token} from '@luminate/graphql-utils'

export interface Context {
  user: Token | null
}

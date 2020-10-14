import {AuthenticationError, ForbiddenError} from 'apollo-server-express'
import express from 'express'
import jwt from 'jsonwebtoken'
import {RoleDocument, scopes} from '@luminate/mongo'

interface TokenInput {
  jti: string
  sub: string
  account?: {
    id: string
    name: string
  }
  accounts?: {
    id: string
    name: string
  }[]
  roles?: {
    id: string
    name: string
  }[]
  scopes?: string[]
}

export interface Token extends TokenInput {
  iat: number
  exp: number
}

// const createToken = (res: express.Response, input: TokenInput, secret: string) => {
//   const token = jwt.sign(input, secret, {expiresIn: '10m'})
//   res.cookie('id', token, {
//     httpOnly: false,
//     secure: process.env.NODE_ENV === 'production',
//   })
//   return token
// }

// const removeToken = (res: express.Response): void => {
//   res.cookie('id', '', {
//     expires: new Date(0),
//   })
// }

export const parseTokenFromRequest = (req: express.Request, secret: string) => {
  const data = jwt.verify(req.cookies.id, secret)
  return data as Token
}

export const parseUserFromRequest = (request: express.Request): Token | null => {
  const authHeader = (request.headers['x-auth-user'] as string) || null
  const user = authHeader ? JSON.parse(Buffer.from(authHeader, 'base64').toString('utf-8')) : null
  return user
}

export const hasRole = (user: Token | null, roleName: string) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(new AuthenticationError('Please authenticate'))
      return
    }
    const roles = (user.roles as unknown) as RoleDocument[] | undefined
    const hasRole = !!roles?.find(role => role.name === roleName)
    if (!hasRole) {
      reject(new ForbiddenError('You do not have permission to view this resource'))
      return
    }
    resolve()
  })
}

type ValidScopes = keyof typeof scopes

export const hasScopes = (user: Token | null, requiredScopes: ValidScopes[]) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(new AuthenticationError('Please authenticate'))
      return
    }

    const hasScopes = requiredScopes.every(requiredScope => !!user.scopes?.find(scope => scope === requiredScope))

    if (!hasScopes) {
      reject(new ForbiddenError('You do not have permission to view this resource'))
      return
    }
    resolve()
  })
}

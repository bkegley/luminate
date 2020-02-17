import mongoose from 'mongoose'
import {AuthenticationError, ForbiddenError} from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import express from 'express'
import {RoleDocument} from '@luminate/mongo'
import {scopes} from './scopes'

interface TokenInput {
  jti: string | mongoose.Types.ObjectId
  sub: string
  account?: {
    id: string | mongoose.Types.ObjectId
    name: string
  }
  accounts?: {
    id: string | mongoose.Types.ObjectId
    name: string
  }[]
  roles?: {
    id: string | mongoose.Types.ObjectId
    name: string
  }[]
  scopes?: string[]
}

export interface Token extends TokenInput {
  iat: number
  exp: number
}

const createToken = (res: express.Response, input: TokenInput, secret: string) => {
  const token = jwt.sign(input, secret, {expiresIn: '10s'})
  res.cookie('id', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
  })
  return token
}

const removeToken = (res: express.Response): void => {
  res.cookie('id', '', {
    expires: new Date(0),
  })
}

const parseToken = (token: string, secret: string) => {
  const data = jwt.verify(token, secret)
  return data as Token
}

const parseUserFromRequest = (request: express.Request): Token | null => {
  const authHeader = (request.headers['x-auth-user'] as string) || null
  const user = authHeader ? JSON.parse(Buffer.from(authHeader, 'base64').toString('utf-8')) : null
  return user
}

const hasRole = (user: Token | null, roleName: string) => {
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

const hasScopes = (user: Token | null, requiredScopes: ValidScopes[]) => {
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

export {createToken, removeToken, hasRole, hasScopes, parseToken, parseUserFromRequest}

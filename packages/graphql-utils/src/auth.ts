import mongoose from 'mongoose'
import {AuthenticationError, ForbiddenError} from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import express from 'express'
import {AuthenticatedUserDocument, RoleDocument} from '@luminate/mongo'

const createToken = (
  {userId, accountId}: {userId: string | mongoose.Types.ObjectId; accountId?: string | mongoose.Types.ObjectId},
  secret: string,
) => {
  const token = jwt.sign(
    {
      userId,
      accountId,
    },
    secret,
    {expiresIn: '1d'},
  )
  return token
}

interface Token {
  userId: string | mongoose.Types.ObjectId
  accountId?: mongoose.Types.ObjectId
  iat: string
  exp: string
}

const parseToken = (token: string, secret: string) => {
  const data = jwt.verify(token, secret)
  return data as Token
}

const parseUserFromRequest = (request: express.Request): AuthenticatedUserDocument | null => {
  const authHeader = (request.headers['x-auth-user'] as string) || null
  const user = authHeader ? JSON.parse(Buffer.from(authHeader, 'base64').toString('utf-8')) : null
  return user
}

const hasRole = (user: AuthenticatedUserDocument | null, roleName: string) => {
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

const hasScopes = (user: AuthenticatedUserDocument | null, requiredScopes: string[]) => {
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

export {createToken, hasRole, hasScopes, parseToken, parseUserFromRequest}

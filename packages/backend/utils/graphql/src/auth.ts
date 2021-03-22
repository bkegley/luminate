import express from 'express'
import jwt from 'jsonwebtoken'

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

export const parseTokenFromRequest = (req: express.Request, secret: string) => {
  if (!req.headers.authorization) return null
  const [bearer, token] = req.headers.authorization.split(' ')

  if (bearer !== 'Bearer') return null

  const data = jwt.verify(token, secret)
  return data as Token
}

export const parseUserFromRequest = (request: express.Request): Token | null => {
  const authHeader = (request.headers['x-auth-user'] as string) || null
  const user = authHeader ? JSON.parse(Buffer.from(authHeader, 'base64').toString('utf-8')) : null
  return user
}

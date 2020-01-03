import jwt from 'jsonwebtoken'
import express from 'express'
import {UserDocument} from '@luminate/mongo'

const createToken = (userId: string, secret: string) => {
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    {expiresIn: '30s'},
  )
  return token
}

interface Token {
  userId: string
  iat: string
  exp: string
}

const parseToken = (token: string, secret: string) => {
  const data = jwt.verify(token, secret)
  return data as Token
}

const parseUserFromRequest = (request: express.Request): UserDocument | null => {
  const authHeader = (request.headers['x-auth-user'] as string) || null
  const user = authHeader ? JSON.parse(Buffer.from(authHeader, 'base64').toString('utf-8')) : null
  return user
}

export {createToken, parseToken, parseUserFromRequest}

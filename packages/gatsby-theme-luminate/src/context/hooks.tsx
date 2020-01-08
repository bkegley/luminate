import React from 'react'
import {UserContext} from './UserProvider'

export const useUser = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be wrapped in a UserProvider')
  }

  const {hydrateMeta, ...remainingContext} = context

  return remainingContext
}

export const useLogin = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useLogin must be wrapped in a UserProvider')
  }

  const {login, loginMeta, data} = context

  return [login, {...loginMeta, data}] as const
}

export const useLogout = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useLogin must be wrapped in a UserProvider')
  }

  const {logout, logoutMeta, data} = context

  return [logout, {...logoutMeta, data}] as const
}

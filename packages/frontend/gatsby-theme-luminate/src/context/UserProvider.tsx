import React from 'react'
import {useLoginMutation, useLogoutMutation, useSwitchAccountMutation, useRefreshTokenMutation} from '../graphql'

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

interface IUserContext {
  user: Token | null
  login: ReturnType<typeof useLoginMutation>[0]
  loginMeta: ReturnType<typeof useLoginMutation>[1]
  logout: ReturnType<typeof useLogoutMutation>[0]
  logoutMeta: ReturnType<typeof useLogoutMutation>[1]
  switchAccount: ReturnType<typeof useSwitchAccountMutation>[0]
  switchAccountMeta: ReturnType<typeof useSwitchAccountMutation>[1]
}

// add initial context for gatsby builds
const initialContext = {
  user: null,
  loginMeta: {},
  logoutMeta: {},
  login: () => {},
  logout: () => {},
  switchAccount: () => {},
}

export const UserContext = React.createContext<IUserContext | undefined>(
  typeof window !== 'undefined' ? undefined : ((initialContext as unknown) as IUserContext),
)

interface Props {
  children: React.ReactNode
}

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null
  const cookieString = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return cookieString ? cookieString[2] : null
}

const parseJWT = (name: string) => {
  const cookie = getCookie(name)
  if (cookie) {
    return JSON.parse(atob(cookie.split('.')[1]))
  }
  return false
}

const UserProvider = ({children}: Props) => {
  const [shouldRefreshToken, setShouldRefreshToken] = React.useState(true)
  const [refreshToken, {error, loading, data, called}] = useRefreshTokenMutation()
  const [shouldStartRefreshTimer, setShouldStartRefreshTimer] = React.useState(true)

  React.useEffect(() => {
    if (shouldRefreshToken) {
      refreshToken()
    }
  }, [shouldRefreshToken])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      refreshToken()
      setShouldStartRefreshTimer(true)
    }, 1000 * 60 * 9)
    setShouldStartRefreshTimer(false)
    return () => clearTimeout(timeout)
  }, [shouldStartRefreshTimer])

  const [login, loginMeta] = useLoginMutation()
  const [logout, logoutMeta] = useLogoutMutation()
  const [switchAccount, switchAccountMeta] = useSwitchAccountMutation()

  const user: Token | false = parseJWT('id')

  const value: IUserContext = {
    user: user ? user : null,
    login: options => {
      return new Promise(async resolve => {
        const response = await login(options)
        setShouldRefreshToken(true)
        resolve(response)
      })
    },
    loginMeta,
    logout: options => {
      return new Promise(async resolve => {
        const response = await logout(options)
        setShouldRefreshToken(true)
        resolve(response)
      })
    },
    logoutMeta,
    switchAccount: options => {
      return new Promise(async resolve => {
        const response = await switchAccount(options)
        setShouldRefreshToken(true)
        resolve(response)
      })
    },
    switchAccountMeta,
  }

  const shouldRenderChildren = !loading && called

  return <UserContext.Provider value={value}>{shouldRenderChildren ? children : null}</UserContext.Provider>
}

export default UserProvider

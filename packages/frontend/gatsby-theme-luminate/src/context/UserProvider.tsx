import React from 'react'
import {useApolloClient} from '@apollo/client'
import {useLoginMutation, useLogoutMutation, useSwitchAccountMutation, useRefreshTokenMutation} from '../graphql'

export interface Token {
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
  theme: 'dark' | 'light'
  iat: number
  exp: number
}

interface IUserContext {
  user: Token | undefined
  login: ReturnType<typeof useLoginMutation>[0]
  loginMeta: ReturnType<typeof useLoginMutation>[1]
  logout: ReturnType<typeof useLogoutMutation>[0]
  logoutMeta: ReturnType<typeof useLogoutMutation>[1]
  switchAccount: ReturnType<typeof useSwitchAccountMutation>[0]
  switchAccountMeta: ReturnType<typeof useSwitchAccountMutation>[1]
}

// add initial context for gatsby builds
const initialContext = {
  // @ts-ignore
  user: undefined,
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
  setToken: React.Dispatch<string | undefined | ((prevState: string | undefined) => string | undefined)>
  children: React.ReactNode
}

const parseToken = (tokenString: string): Token => {
  return JSON.parse(atob(tokenString.split('.')[1]))
}

const UserProvider = ({children, setToken}: Props) => {
  const [user, setUser] = React.useState<Token | undefined>(undefined)
  const [shouldRefreshToken, setShouldRefreshToken] = React.useState(true)
  const [refreshToken, {error, loading, data, called}] = useRefreshTokenMutation()
  const [shouldStartRefreshTimer, setShouldStartRefreshTimer] = React.useState(true)
  const [hasCheckedCookie, setHasCheckedCookie] = React.useState(false)
  const client = useApolloClient()

  React.useEffect(() => {
    if (shouldRefreshToken) {
      refreshToken()
      setShouldRefreshToken(false)
    }
  }, [shouldRefreshToken])

  React.useEffect(() => {
    if (called && !loading) {
      setHasCheckedCookie(true)
    }
    if (data && data.refreshToken) {
      setUser(parseToken(data.refreshToken))
      setToken(data.refreshToken)
    }
  }, [called, data])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      refreshToken()
      setShouldStartRefreshTimer(true)
    }, 1000 * 60 * 13)
    setShouldStartRefreshTimer(false)
    return () => clearTimeout(timeout)
  }, [shouldStartRefreshTimer])

  const [login, loginMeta] = useLoginMutation()
  const [logout, logoutMeta] = useLogoutMutation()
  const [switchAccount, switchAccountMeta] = useSwitchAccountMutation()

  const value: IUserContext = {
    user: user,
    login: options => {
      return new Promise(async resolve => {
        const response = await login(options)
        if (response.data.login) {
          const token = response.data.login
          setUser(parseToken(token))
          setToken(token)
          setShouldRefreshToken(true)
        }
        resolve(response)
      })
    },
    loginMeta,
    logout: options => {
      return new Promise(async resolve => {
        const response = await logout(options)
        if (response.data.logout) {
          setToken(null)
          setUser(null)
          client.resetStore()
        }
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

  return <UserContext.Provider value={value}>{hasCheckedCookie ? children : null}</UserContext.Provider>
}

export default UserProvider

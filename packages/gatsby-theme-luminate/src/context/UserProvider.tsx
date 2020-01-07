import React from 'react'
import {
  useHydrateMeQuery,
  useLoginMutation,
  useLogoutMutation,
  UserFragmentFragment,
  HydrateMeQueryHookResult,
  LoginMutationResult,
  LogoutMutationResult,
} from '../graphql'

interface IUserContext {
  data: UserFragmentFragment | null
  hydrateMeta: HydrateMeQueryHookResult
  loginMeta: LoginMutationResult
  logoutMeta: LogoutMutationResult
  login: ({username, password}: {username: string; password: string}) => void
  logout: () => void
}

export const UserContext = React.createContext<IUserContext | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const UserProvider = ({children}: Props) => {
  const [data, setData] = React.useState<UserFragmentFragment | null>(null)

  // handle initial render (including page refreshes)
  const hydrateMeta = useHydrateMeQuery()
  React.useEffect(() => {
    if (hydrateMeta.data) {
      setData(hydrateMeta.data.hydrateMe)
    }
  }, [hydrateMeta.data])

  // handle login
  const [login, loginMeta] = useLoginMutation()
  React.useEffect(() => {
    if (loginMeta.called && loginMeta.data?.login) {
      setData(loginMeta.data.login)
    }
  }, [loginMeta.called, loginMeta.data])

  // handle logout
  const [logout, logoutMeta] = useLogoutMutation()
  React.useEffect(() => {
    if (logoutMeta.called && logoutMeta.data?.logout) {
      setData(null)
    }
  }, [logoutMeta.called, logoutMeta.data])

  const value: IUserContext = {
    data,
    hydrateMeta,
    loginMeta,
    logoutMeta,
    login: ({username, password}: {username: string; password: string}) => {
      login({variables: {username, password}})
    },
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider

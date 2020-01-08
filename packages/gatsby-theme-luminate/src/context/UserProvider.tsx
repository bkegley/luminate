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
  const [hasHydrated, setHasHydrated] = React.useState(false)

  // handle initial render (including page refreshes)
  const hydrateMeta = useHydrateMeQuery()
  React.useEffect(() => {
    if (hydrateMeta.data) {
      setData(hydrateMeta.data.hydrateMe)
      setHasHydrated(true)
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

  if (hydrateMeta.error) {
    console.log({error: hydrateMeta.error})
  }

  const renderChildren = hasHydrated && !hydrateMeta.loading && !hydrateMeta.error

  return <UserContext.Provider value={value}>{renderChildren ? children : null}</UserContext.Provider>
}

export default UserProvider

import React from 'react'
import {
  useHydrateMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSwitchAccountMutation,
  UserFragmentFragment,
  HydrateMeQueryHookResult,
  LoginMutationResult,
  LogoutMutationResult,
} from '../graphql'

type ModifiedHookResult<T> = Omit<T, 'data'>

interface ModifiedHydrateMeQueryHookResult extends ModifiedHookResult<HydrateMeQueryHookResult> {
  data: UserFragmentFragment | null
}

interface ModifiedLoginMutationResult extends ModifiedHookResult<LoginMutationResult> {
  data: UserFragmentFragment | null
}

interface ModifiedLogoutMutationResult extends ModifiedHookResult<LogoutMutationResult> {
  data: UserFragmentFragment | null
}

interface IUserContext {
  data: UserFragmentFragment | null
  hydrateMeta: ModifiedHydrateMeQueryHookResult
  loginMeta: ModifiedLoginMutationResult
  logoutMeta: ModifiedLogoutMutationResult
  login: ({username, password}: {username: string; password: string}) => void
  logout: () => void
  switchAccount: (accountId: string) => void
}

// add initial context for gatsby builds
const initialContext = {
  data: null,
  hydrateMeta: {},
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

  const [switchAccount, {data: switchAccountData, client}] = useSwitchAccountMutation()
  React.useEffect(() => {
    if (switchAccountData && switchAccountData.switchAccount) {
      client?.clearStore().then(() => {
        hydrateMeta.refetch()
      })
    }
  }, [switchAccountData])

  const value: IUserContext = {
    data,
    hydrateMeta: {
      ...hydrateMeta,
      data,
    },
    loginMeta: {
      ...loginMeta,
      data,
    },
    logoutMeta: {
      ...logoutMeta,
      data,
    },
    login: ({username, password}: {username: string; password: string}) => {
      login({variables: {username, password}})
    },
    logout,
    switchAccount: (accountId: string) => {
      switchAccount({variables: {accountId}})
    },
  }

  if (hydrateMeta.error) {
    console.log({error: hydrateMeta.error})
  }

  const renderChildren = hasHydrated && !hydrateMeta.loading && !hydrateMeta.error

  return <UserContext.Provider value={value}>{renderChildren ? children : null}</UserContext.Provider>
}

export default UserProvider

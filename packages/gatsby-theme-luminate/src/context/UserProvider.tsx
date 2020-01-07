import React from 'react'
import {useHydrateMeQuery, useLoginMutation, useLogoutMutation} from '../graphql'

interface ReducerState {
  loading: boolean
  error: any
  data: any
}

type ReducerActionTypes = keyof typeof types

interface ReducerAction {
  type: ReducerActionTypes
  [x: string]: any
}

interface IUserContext {
  user: Pick<ReducerState, 'data' | 'error' | 'loading'>
  login: ({username, password}: {username: string; password: string}) => void
  logout: () => void
}

export const UserContext = React.createContext<IUserContext | undefined>(undefined)

const types = {
  HYDRATE_USER: 'HYDRATE_USER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
}

const initialState: ReducerState = {
  loading: true, // initialize as true to avoid content flash before checking credentials
  error: null,
  data: null,
}

function reducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case 'HYDRATE_USER': {
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        data: action.data,
      }
    }
    case 'LOGIN': {
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        data: action.data,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        data: action.data,
      }
    }
    case 'UPDATE_PASSWORD': {
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        data: action.data,
      }
    }

    default: {
      throw new Error('Please provide a valid action type')
    }
  }
}

interface Props {
  children: React.ReactNode
}

const UserProvider = ({children}: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {error: userError, loading: userLoading, data: userData} = state

  console.log({userError, userLoading, userData})

  // handle initial render (including page refreshes)
  const {error: hydrateError, loading: hydrateLoading, data: hydrateData} = useHydrateMeQuery()
  React.useEffect(() => {
    console.log({hydrateData, hydrateError, hydrateLoading})
    dispatch({type: 'HYDRATE_USER', error: hydrateError, loading: hydrateLoading, data: hydrateData})
  }, [hydrateError, hydrateLoading, hydrateData])

  // handle login
  const [login, {error: loginError, loading: loginLoading, data: loginData, called: loginCalled}] = useLoginMutation()
  React.useEffect(() => {
    console.log({loginError, loginLoading, loginData, loginCalled})
    if (loginCalled) {
      dispatch({type: 'LOGIN', error: loginError, loading: loginLoading, data: loginData?.login})
    }
  }, [loginError, loginLoading, loginData, loginCalled])

  // handle logout
  const [
    logout,
    {error: logoutError, loading: logoutLoading, data: logoutData, called: logoutCalled},
  ] = useLogoutMutation()
  React.useEffect(() => {
    if (logoutCalled) {
      dispatch({type: 'LOGOUT', error: logoutError, loading: logoutLoading, data: logoutData})
    }
  }, [logoutError, logoutLoading, logoutData, logoutCalled])

  const value = React.useMemo(
    () => ({
      user: {
        error: userError,
        loading: userLoading,
        data: userData,
      },
      login: ({username, password}: {username: string; password: string}) => {
        login({variables: {username, password}})
      },
      logout,
    }),
    [userError, userLoading, userData],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider

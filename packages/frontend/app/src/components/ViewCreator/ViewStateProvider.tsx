import React from 'react'

export interface IViewStateContext {
  selectedRow: number | null
}

export const ViewStateContext = React.createContext<IViewStateContext | undefined>(undefined)

export interface ViewStateProviderProps {
  children: React.ReactNode
}

export const ViewStateProvider = ({children}: ViewStateProviderProps) => {
  const value = React.useMemo<IViewStateContext>(() => {
    return {
      selectedRow: null,
    }
  }, [])

  return <ViewStateContext.Provider value={value}>{children}</ViewStateContext.Provider>
}

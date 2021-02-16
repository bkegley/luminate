import React from 'react'

export interface IDarkModeContext {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const DarkModeContext = React.createContext<IDarkModeContext | undefined>(undefined)

export interface DarkModeProps {
  children: React.ReactNode
}

export const DarkModeProvider = ({children}: DarkModeProps) => {
  const [darkMode, setDarkMode] = React.useState(false)

  const value = React.useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => setDarkMode(old => !old),
    }),
    [darkMode],
  )

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
}

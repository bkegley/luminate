import React from 'react'

type Theme = 'dark' | 'light'

export interface IDarkModeContext {
  darkMode: Theme
  toggleDarkMode: () => void
  _setDarkMode: React.Dispatch<React.SetStateAction<Theme>>
}

export const DarkModeContext = React.createContext<IDarkModeContext | undefined>(undefined)

export interface DarkModeProps {
  children: React.ReactNode
  initialTheme: Theme
}

export const DarkModeProvider = ({children, initialTheme = 'dark'}: DarkModeProps) => {
  const [darkMode, setDarkMode] = React.useState(initialTheme)

  const value = React.useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => setDarkMode(old => (old === 'dark' ? 'light' : 'dark')),
      _setDarkMode: setDarkMode,
    }),
    [darkMode],
  )

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
}

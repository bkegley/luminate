import React from 'react'
import {DarkModeContext} from './DarkModeProvider'

export const useDarkMode = () => {
  const context = React.useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be wrapped in a DarkModeProvider component')
  }

  return context
}

import React from 'react'
import {ViewStateContext} from './'

export const useViewState = () => {
  const context = React.useContext(ViewStateContext)
  if (!context) {
    throw new Error('useViewState must be wrapped in a ViewStateProvider')
  }

  return context
}

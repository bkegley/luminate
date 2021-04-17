import React from 'react'
import {ViewStateContext, IViewStateContext} from './'
import {INode} from './types'

export const useViewState = <T extends INode>() => {
  const context = React.useContext(ViewStateContext)
  if (!context) {
    throw new Error('useViewState must be wrapped in a ViewStateProvider')
  }

  return context as IViewStateContext<T>
}

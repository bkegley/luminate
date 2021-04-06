import React from 'react'
import {Canvas} from './Canvas'
import {ConfigurationPanel} from './ConfigurationPanel'
import {ViewStateProvider} from './ViewStateProvider'

export const ViewCreator = () => {
  return (
    <ViewStateProvider>
      <div className="flex justify-between mt-20">
        <Canvas />
        <ConfigurationPanel />
      </div>
    </ViewStateProvider>
  )
}

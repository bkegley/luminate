import React from 'react'
import {useViewState} from './useViewState'
import {Tabs} from '@luminate/components'
import {ComponentSelector} from './ComponentSelector'

export const ConfigurationPanel = () => {
  const viewState = useViewState()

  return (
    <div>
      <Tabs tabs={['Editor', 'Components']}>
        {({activeTab}) => {
          switch (activeTab) {
            case 'Editor':
              return <ComponentEditor />
            case 'Components':
              return <ComponentSelector />
            default:
              return null
          }
        }}
      </Tabs>
    </div>
  )
}

const ComponentEditor = () => {
  return (
    <div>
      <p>this is our editor</p>
    </div>
  )
}

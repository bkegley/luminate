import React from 'react'
import {Card, Tabs} from '@luminate/components'
import {EditorPanel} from './EditorPanel'
import {ComponentsPanel} from './ComponentsPanel'

export const ConfigurationPanel = () => {
  return (
    <div>
      <Card>
        <div className="p-6">
          <Tabs tabs={['Editor', 'Components']}>
            {({activeTab}) => {
              switch (activeTab) {
                case 'Editor':
                  return <EditorPanel />
                case 'Components':
                  return <ComponentsPanel />
                default:
                  return null
              }
            }}
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

import React from 'react'
import {Card, Tabs} from '@luminate/components'
import {ComponentEditor} from './ComponentEditor'
import {ComponentSelector} from './ComponentSelector'

export const ConfigurationPanel = () => {
  return (
    <div>
      <Card>
        <div className="p-6">
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
      </Card>
    </div>
  )
}

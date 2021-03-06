import React from 'react'
import {LinkedEntityType, LinkedFieldNode} from '../types'
import {CoffeeLinkDisplay} from './CoffeeLinkDisplay'

interface LinkedFieldDisplayProps {
  item: LinkedFieldNode
}

export const LinkedFieldDisplay = ({item}: LinkedFieldDisplayProps) => {
  let Component = DefaultLinkedFieldDisplay

  switch (item.entityType) {
    case LinkedEntityType.COFFEE:
      Component = CoffeeLinkDisplay
      break
    default:
      break
  }
  return (
    <div>
      <Component item={item} />
    </div>
  )
}

const DefaultLinkedFieldDisplay = ({item}: LinkedFieldDisplayProps) => {
  return <pre>{JSON.stringify(item, null, 2)}</pre>
}

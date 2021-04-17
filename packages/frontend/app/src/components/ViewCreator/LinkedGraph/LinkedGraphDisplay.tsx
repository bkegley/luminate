import React from 'react'
import {LinkedGraphNode, LinkedGraphType} from '../types'
import {TimelineDisplay} from './TimelineDisplay'

interface LinkedGraphDisplayProps {
  item: LinkedGraphNode
}

export const LinkedGraphDisplay = ({item}: LinkedGraphDisplayProps) => {
  let Component = DefaultLinkedGraphDisplay

  switch (item.graphType) {
    case LinkedGraphType.TIMELINE:
      Component = TimelineDisplay
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

const DefaultLinkedGraphDisplay = ({item}: LinkedGraphDisplayProps) => {
  return <pre>{JSON.stringify(item, null, 2)}</pre>
}

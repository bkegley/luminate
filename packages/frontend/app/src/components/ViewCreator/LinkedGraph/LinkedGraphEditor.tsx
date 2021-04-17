import React from 'react'
import {LinkedGraphNode, LinkedGraphType} from '../types'
import {TimelineEditor} from './TimelineEditor'

export interface LinkedGraphEditorProps {
  item: LinkedGraphNode
}

export const LinkedGraphEditor = ({item}: LinkedGraphEditorProps) => {
  let Component: React.ReactNode | null = null
  switch (item.graphType) {
    case LinkedGraphType.TIMELINE:
      Component = TimelineEditor
      break
  }

  // @ts-ignore
  return <Component item={item} />
}

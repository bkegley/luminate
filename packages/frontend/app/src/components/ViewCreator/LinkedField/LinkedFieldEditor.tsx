import React from 'react'
import {LinkedEntityType, LinkedFieldNode} from '../types'
import {CoffeeLinkEditor} from './CoffeeLinkEditor'

interface LinkedFieldEditorProps {
  item: LinkedFieldNode
}

export const LinkedFieldEditor = ({item}: LinkedFieldEditorProps) => {
  let Component = DefaultLinkedFieldEditor

  switch (item.entityType) {
    case LinkedEntityType.COFFEE:
      Component = CoffeeLinkEditor
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

const DefaultLinkedFieldEditor = ({item}: LinkedFieldEditorProps) => {
  return <pre>{JSON.stringify(item, null, 2)}</pre>
}

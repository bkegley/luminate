import React from 'react'
import {HeadingEditor} from './Heading'
import {ParagraphEditor} from './Paragraph'
import {ItemType} from './types'
import {useViewState} from './useViewState'

export const ComponentEditor = () => {
  const {items, selectedItem} = useViewState()

  const item = items.find(item => item.id === selectedItem)

  if (!item) {
    return null
  }

  let Component = null
  switch (item.type) {
    case ItemType.HEADING:
      Component = HeadingEditor
      break

    case ItemType.PARAGRAPH:
      Component = ParagraphEditor
      break

    case ItemType.LINKED_FIELD:
      Component = null
      break
  }

  return (
    <div className="my-6">
      {Component ? (
        <Component
          // @ts-ignore
          item={item}
        />
      ) : null}
    </div>
  )
}

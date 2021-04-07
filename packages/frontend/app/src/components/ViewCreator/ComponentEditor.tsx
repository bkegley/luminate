import React from 'react'
import {HeadingEditor} from './Heading'
import {ParagraphEditor} from './Paragraph'
import {ItemType} from './types'
import {useViewState} from './useViewState'

export const ComponentEditor = () => {
  const {items, selectedItem} = useViewState()

  if (selectedItem === null) {
    return null
  }

  const item = items.find(item => item.id === selectedItem)

  let Component = null
  switch (item.type) {
    case ItemType.HEADING:
      Component = HeadingEditor
      break

    case ItemType.PARAGRAPH:
      Component = ParagraphEditor
      break

    case ItemType.EMBEDDED_DATA:
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

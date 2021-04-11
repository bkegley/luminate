import React from 'react'
import {HeadingEditor} from './Heading'
import {LinkedFieldEditor} from './LinkedField/LinkedFieldEditor'
import {ParagraphEditor} from './Paragraph'
import {NodeType} from './types'
import {useViewState} from './useViewState'

export const EditorPanel = () => {
  const {items, selectedItem} = useViewState()

  const item = items.find(item => item.id === selectedItem)

  if (!item) {
    return null
  }

  let Component = null
  switch (item.type) {
    case NodeType.HEADING:
      Component = HeadingEditor
      break

    case NodeType.PARAGRAPH:
      Component = ParagraphEditor
      break

    case NodeType.LINKED_FIELD:
      Component = LinkedFieldEditor
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

import React from 'react'
import {HeadingEditor} from './Heading'
import {LinkedFieldEditor} from './LinkedField/LinkedFieldEditor'
import {LinkedGraphEditor} from './LinkedGraph/LinkedGraphEditor'
import {ParagraphEditor} from './Paragraph'
import {NodeType} from './types'
import {useViewState} from './useViewState'

export const EditorPanel = () => {
  const {items, selectedItem} = useViewState()

  const _item = items.find(item => item.id === selectedItem)

  const [item, setItem] = React.useState(_item)

  React.useEffect(() => {
    setItem(_item)
  }, [_item?.id])

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

    case NodeType.LINKED_GRAPH:
      Component = LinkedGraphEditor
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

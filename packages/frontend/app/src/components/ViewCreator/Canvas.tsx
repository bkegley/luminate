import React from 'react'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {useViewState} from './useViewState'
import {ItemType} from './types'
import {HeadingDisplay} from './Heading'
import {ParagraphDisplay} from './Paragraph'

export const Canvas = () => {
  const {
    items,
    selectedItem,
    actions: {selectItem},
  } = useViewState()

  return (
    <div>
      <Droppable droppableId="list">
        {provided => {
          return (
            <div ref={provided.innerRef} className="p-4 bg-gray-700" {...provided.droppableProps}>
              {items.map((item, index) => {
                let Component: React.ReactNode | null = null
                switch (item.type) {
                  case ItemType.HEADING:
                    Component = HeadingDisplay
                    break

                  case ItemType.PARAGRAPH:
                    Component = ParagraphDisplay
                    break

                  case ItemType.EMBEDDED_DATA:
                    Component = null
                    break
                }
                return (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="my-2"
                        onClick={() => selectItem(item.id)}
                      >
                        {Component ? <Component item={item} selected={item.id === selectedItem} /> : null}
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}

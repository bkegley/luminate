import React from 'react'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {useViewState} from './useViewState'
import {NodeType} from './types'
import {HeadingDisplay} from './Heading'
import {ParagraphDisplay} from './Paragraph'
import {CanvasItem} from './CanvasItem'
import {LinkedFieldDisplay} from './LinkedField/LinkedFieldDisplay'

export const Canvas = () => {
  const {
    items,
    selectedItem,
    actions: {selectItem, removeItem},
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
                  case NodeType.HEADING:
                    Component = HeadingDisplay
                    break

                  case NodeType.PARAGRAPH:
                    Component = ParagraphDisplay
                    break

                  case NodeType.LINKED_FIELD:
                    Component = LinkedFieldDisplay
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
                        {Component ? (
                          <CanvasItem item={item} selected={item.id === selectedItem} removeItem={removeItem}>
                            {/* @ts-ignore */}
                            <Component item={item} />
                          </CanvasItem>
                        ) : null}
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

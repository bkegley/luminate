import React from 'react'
import {Card} from '@luminate/components'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {useViewState} from './useViewState'

export const Canvas = () => {
  const {
    items,
    actions: {selectItem},
  } = useViewState()

  return (
    <div>
      <Droppable droppableId="list">
        {provided => {
          return (
            <div ref={provided.innerRef} className="p-4 bg-gray-700" {...provided.droppableProps}>
              {items.map((item, index) => {
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
                        <Card>
                          <span className="p-4">
                            {item.id} - {item.text}
                          </span>
                        </Card>
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

import {Button, Card} from '@luminate/components'
import React from 'react'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd'

const reorder = (list: IItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

interface IItem {
  id: number
  text: string
}

export const Canvas = () => {
  const [list, setList] = React.useState<IItem[]>([{id: 0, text: 'hey there'}])
  const addNew = React.useCallback(() => {
    setList(list => list.concat({id: list.length + 1, text: 'new one!'}))
  }, [])
  const onDragEnd = React.useCallback((result: DropResult) => {
    const {source, destination} = result
    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      setList(list => reorder(list, source.index, destination.index))
    } else {
      console.log({source, destination})
    }
  }, [])

  return (
    <div>
      <div>
        <Button onClick={addNew}>New</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef} className="p-4 bg-gray-700" {...provided.droppableProps}>
                {list.map((item, index) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="my-2"
                        >
                          <Card>
                            <span className="p-4">{item.text}</span>
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
      </DragDropContext>
    </div>
  )
}

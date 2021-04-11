import React from 'react'
import {DragDropContext, DraggableLocation, DropResult} from 'react-beautiful-dnd'
import {Canvas} from './Canvas'
import {ConfigurationPanel} from './ConfigurationPanel'
import {INode, NodeType} from './types'
import {reorder} from './utils'

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

export interface IViewStateContext {
  items: INode[]
  selectedItem: string | null
  actions: {
    addNew: (item: DistributiveOmit<INode, 'id'>) => void
    updateItem: (item: INode) => void
    removeItem: (id: string) => void
    selectItem: (id: string) => void
  }
}

export const ViewStateContext = React.createContext<IViewStateContext | undefined>(undefined)

enum ActionType {
  DROP_ITEM = 'DROP_ITEM',
  ADD_NEW = 'ADD_NEW',
  UPDATE_ITEM = 'UPDATE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SELECT_ITEM = 'SELECT_ITEM',
}

type Action =
  | {
      type: ActionType.ADD_NEW
      item: INode
    }
  | {
      type: ActionType.UPDATE_ITEM
      item: INode
    }
  | {
      type: ActionType.REMOVE_ITEM
      id: string
    }
  | {
      type: ActionType.DROP_ITEM
      source: DraggableLocation
      destination: DraggableLocation
    }
  | {
      type: ActionType.SELECT_ITEM
      id: string
    }

interface IState {
  selectedItem: string | null
  items: INode[]
}

const initialState: IState = {
  selectedItem: null,
  items: [
    {
      id: 'random_id',
      type: NodeType.HEADING,
      data: {
        text: 'Set a Title',
        heading: 'h2',
      },
    },
  ],
}

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case ActionType.SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.id,
      }

    case ActionType.ADD_NEW:
      return {
        ...state,
        items: state.items.concat(action.item),
      }

    case ActionType.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item => (item.id === action.item.id ? action.item : item)),
      }

    case ActionType.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        selectedItem: state.selectedItem === action.id ? null : state.selectedItem,
      }

    case ActionType.DROP_ITEM:
      return {
        ...state,
        items: reorder(state.items, action.source.index, action.destination.index),
      }
  }
}

export const ViewCreator = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const addNew = React.useCallback((item: Exclude<INode, 'id'>) => {
    const id = Math.random().toString(36).substr(7)
    dispatch({type: ActionType.ADD_NEW, item: {...item, id}})
  }, [])

  const updateItem = React.useCallback((item: INode) => {
    dispatch({type: ActionType.UPDATE_ITEM, item})
  }, [])

  const removeItem = React.useCallback((id: string) => {
    dispatch({type: ActionType.REMOVE_ITEM, id})
  }, [])

  const selectItem = React.useCallback((id: string) => {
    dispatch({type: ActionType.SELECT_ITEM, id})
  }, [])

  const onDragEnd = React.useCallback((result: DropResult) => {
    const {source, destination} = result

    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      dispatch({type: ActionType.DROP_ITEM, source, destination})
    } else {
      console.log({source, destination})
    }
  }, [])

  const value = React.useMemo(() => {
    return {
      ...state,
      actions: {
        addNew,
        updateItem,
        removeItem,
        selectItem,
      },
    }
  }, [state])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ViewStateContext.Provider value={value}>
        <div className="grid grid-cols-2 gap-10 mt-20">
          <Canvas />
          <ConfigurationPanel />
        </div>
      </ViewStateContext.Provider>
    </DragDropContext>
  )
}

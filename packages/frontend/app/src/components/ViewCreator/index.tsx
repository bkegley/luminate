import React from 'react'
import {DragDropContext, DraggableLocation, DropResult} from 'react-beautiful-dnd'
import {Canvas} from './Canvas'
import {ConfigurationPanel} from './ConfigurationPanel'
import {IItem, ItemType} from './types'
import {reorder} from './utils'

export interface IViewStateContext {
  items: IItem[]
  selectedItem: number | null
  actions: {
    addNew: (item: IItem) => void
    updateItem: (item: IItem) => void
    removeItem: (id: number) => void
    selectItem: (id: number) => void
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
      item: IItem
    }
  | {
      type: ActionType.UPDATE_ITEM
      item: IItem
    }
  | {
      type: ActionType.REMOVE_ITEM
      id: number
    }
  | {
      type: ActionType.DROP_ITEM
      source: DraggableLocation
      destination: DraggableLocation
    }
  | {
      type: ActionType.SELECT_ITEM
      id: number
    }

interface IState {
  selectedItem: number | null
  items: IItem[]
}

const initialState: IState = {
  selectedItem: null,
  items: [
    {
      id: 0,
      type: ItemType.TITLE,
      text: 'Set a Title',
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

  const addNew = React.useCallback((item: IItem) => {
    dispatch({type: ActionType.ADD_NEW, item})
  }, [])

  const updateItem = React.useCallback((item: IItem) => {
    dispatch({type: ActionType.UPDATE_ITEM, item})
  }, [])

  const removeItem = React.useCallback((id: number) => {
    dispatch({type: ActionType.REMOVE_ITEM, id})
  }, [])

  const selectItem = React.useCallback((id: number) => {
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

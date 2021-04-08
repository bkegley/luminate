import React from 'react'
import {Button} from '@luminate/components'
import {ItemType} from './types'
import {useViewState} from './useViewState'
import {LinkedField} from './LinkedField'

const ComponentSelectorContext = React.createContext(undefined)

enum ActionType {
  UPDATE_SELECTION_TYPE = 'BACK_BUTTON_CLICK',
}

export enum SelectionType {
  PRIMITIVE = 'PRIMITIVE',
  LINKED_FIELD = 'LINKED_FIELD',
}

type Action = {
  type: ActionType.UPDATE_SELECTION_TYPE
  selectionType: SelectionType
}

interface State {
  selectionType: SelectionType
  prevSelectionType: SelectionType | null
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UPDATE_SELECTION_TYPE:
      return {
        ...state,
        // TODO: This should also remove all set options
        selectionType: action.selectionType,
        prevSelectionType: state.selectionType,
      }

    default:
      return state
  }
}

const initialState: State = {
  selectionType: SelectionType.PRIMITIVE,
  prevSelectionType: null,
}

export const ComponentSelector = () => {
  const [{selectionType, prevSelectionType}, dispatch] = React.useReducer(reducer, initialState)

  const handleSelectionTypeClick = React.useCallback((selectionType: SelectionType) => {
    dispatch({type: ActionType.UPDATE_SELECTION_TYPE, selectionType})
  }, [])

  return (
    <ComponentSelectorContext.Provider value={{selectionType, prevSelectionType, actions: {handleSelectionTypeClick}}}>
      <div className="my-6">
        {selectionType === SelectionType.PRIMITIVE ? (
          <PrimitivesList handleSelectionTypeClick={handleSelectionTypeClick} />
        ) : selectionType === SelectionType.LINKED_FIELD ? (
          <LinkedField handleSelectionTypeClick={handleSelectionTypeClick} />
        ) : (
          <div>3</div>
        )}
      </div>
    </ComponentSelectorContext.Provider>
  )
}

interface PrimitivesListProps {
  handleSelectionTypeClick: (selectionType: SelectionType) => void
}

const PrimitivesList = ({handleSelectionTypeClick}: PrimitivesListProps) => {
  const {
    actions: {addNew},
  } = useViewState()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Button
        variant="outline"
        onClick={() =>
          addNew({
            id: Math.floor(Math.random() * 1000),
            type: ItemType.HEADING,
            text: 'Placeholder Title',
            heading: 'h2',
          })
        }
      >
        Heading
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          addNew({
            id: Math.floor(Math.random() * 1000),
            type: ItemType.PARAGRAPH,
            text: 'Placeholder paragraph text',
          })
        }
      >
        Paragraph
      </Button>
      <Button variant="outline" onClick={() => handleSelectionTypeClick(SelectionType.LINKED_FIELD)}>
        Create Linked Field
      </Button>
    </div>
  )
}

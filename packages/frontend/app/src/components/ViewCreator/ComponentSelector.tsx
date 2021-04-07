import {Button, Icon, IconTypesEnum} from '@luminate/components'
import React from 'react'
import {ItemType} from './types'
import {useViewState} from './useViewState'

const ComponentSelectorContext = React.createContext(undefined)

enum ActionType {
  COMPONENT_TYPE_CLICK = 'COMPONENT_TYPE_CLICK',
  BACK_BUTTON_CLICK = 'BACK_BUTTON_CLICK',
}

enum ComponentType {
  COFFEE = 'COFFEE',
}

type Action =
  | {
      type: ActionType.COMPONENT_TYPE_CLICK
      data: ComponentType
    }
  | {
      type: ActionType.BACK_BUTTON_CLICK
    }

interface State {
  step: 1 | 2 | 3
  selectedComponent: ComponentType
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.COMPONENT_TYPE_CLICK:
      return state

    case ActionType.BACK_BUTTON_CLICK:
      return {
        ...state,
        // TODO: This should also remove all set options
        step: state.step === 1 ? 1 : state.step - 1,
      }

    default:
      return state
  }
}

export const ComponentSelector = () => {
  return (
    <ComponentSelectorContext.Provider value={undefined}>
      <ComponentList />
    </ComponentSelectorContext.Provider>
  )
}

const ComponentList = () => {
  const {
    actions: {addNew},
  } = useViewState()
  return (
    <div className="my-6">
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
      </div>
    </div>
  )
}

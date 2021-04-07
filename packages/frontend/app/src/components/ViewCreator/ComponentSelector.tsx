import {Icon, IconTypesEnum} from '@luminate/components'
import React from 'react'
import {useListCoffeesQuery} from '../../graphql'
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
    <div>
      <p>these are our components</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from(new Array(9)).map((_, index) => {
          return (
            <button
              type="button"
              onClick={() =>
                addNew({id: Math.floor(Math.random() * 1000), type: ItemType.TITLE, text: 'Default Title'})
              }
              key={index}
              className="relative rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="w-6 h-6 text-primary-400">
                <Icon type={IconTypesEnum.BEAKER} />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Coffee</p>
                </a>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const CoffeeSelector = () => {
  const {error, loading, data} = useListCoffeesQuery()
}

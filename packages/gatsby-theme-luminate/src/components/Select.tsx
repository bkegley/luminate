import React from 'react'
import {useSelect, UseComboboxState} from 'downshift'
import {Button} from './index'
import DownArrow from './DownArrow'

interface IItem {
  name: string
  value: string | number
}

export interface SelectProps {
  label: React.ReactNode
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void
  options: IItem[]
  initialSelectedItem?: IItem
}

const Select = ({onChange, options, initialSelectedItem, label}: SelectProps) => {
  const itemToString = (option: IItem | null) => (option ? option.name : '')

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString,
    initialSelectedItem,
    onSelectedItemChange: changes => {
      if (onChange) {
        onChange(changes)
      }
    },
  })

  return (
    <div className="relative">
      <label className="block mb-1" {...getLabelProps()}>
        {label}
      </label>
      <button
        className={`input flex items-center justify-between w-full ${isOpen ? 'border-b-0 rounded-b-none' : ''}`}
        type="button"
        {...getToggleButtonProps()}
      >
        <span>{selectedItem ? itemToString(selectedItem) : itemToString(options[0])}</span>
        <DownArrow />
      </button>
      {isOpen ? (
        <ul
          className="absolute z-50 w-full m-0 p-0 overflow-y-auto bg-white list-none left-0 right-0 input border-t-0 rounded-t-none shadow-sm rounded-md"
          style={{maxHeight: '250px'}}
          {...getMenuProps()}
        >
          {options.map((option, index) => {
            return (
              <li
                key={`${option.value}-${index}`}
                className={`py-2 px-3 ${highlightedIndex === index ? 'bg-gray-100' : ''} ${
                  selectedItem?.value === option.value ? 'text-primary-600' : ''
                }`}
                {...getItemProps({item: option, index})}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Select

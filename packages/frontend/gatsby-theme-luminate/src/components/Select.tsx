import React from 'react'
import {useSelect, UseComboboxState} from 'downshift'
import DownArrow from './DownArrow'

interface IItem {
  name: string
  value: string | number
}

export interface SelectProps {
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void
  options?: IItem[]
  initialSelectedItem?: IItem
  id?: string
}

const Select = ({onChange, options = [], initialSelectedItem, id}: SelectProps) => {
  const itemToString = (option: IItem | null) => (option ? option.name : '')

  const {isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps} = useSelect({
    items: options,
    itemToString,
    labelId: id || undefined,
    menuId: id || undefined,
    toggleButtonId: id || undefined,
    initialSelectedItem,
    onSelectedItemChange: changes => {
      if (onChange) {
        onChange(changes)
      }
    },
  })

  return (
    <div className="relative">
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
          className="absolute left-0 right-0 z-50 w-full p-0 m-0 overflow-y-auto list-none bg-white border-t-0 rounded-t-none input shadow-sm rounded-md"
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

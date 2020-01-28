/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useSelect, UseComboboxState} from 'downshift'
import {Box, Label, Button} from '@theme-ui/components'
import DownArrow from './DownArrow'
import defaultStyles, {IStyles} from './styles'

interface IItem {
  name: string
  value: string | number
}

export interface SelectProps {
  label: React.ReactNode
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void
  options: IItem[]
  styles?: IStyles
}

const Select = ({onChange, options, label, styles = defaultStyles}: SelectProps) => {
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
    onSelectedItemChange: changes => {
      if (onChange) {
        onChange(changes)
      }
    },
  })

  return (
    <Box sx={styles.root}>
      <Label sx={styles.label} {...getLabelProps()}>
        {label}
      </Label>
      <Button type="button" sx={styles.field} {...getToggleButtonProps()}>
        <span>{selectedItem ? itemToString(selectedItem) : itemToString(options[0])}</span>
        <DownArrow />
      </Button>
      {isOpen ? (
        <ul sx={styles.menu} {...getMenuProps()}>
          {options.map((option, index) => {
            return (
              <li
                key={`${option.value}-${index}`}
                sx={Object.assign(
                  {},
                  styles.item,
                  highlightedIndex === index ? styles.highlighted : null,
                  selectedItem?.value === option.value ? styles.selected : null,
                )}
                {...getItemProps({item: option, index})}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      ) : null}
    </Box>
  )
}

export default Select

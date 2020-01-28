/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useCombobox, UseComboboxState} from 'downshift'
import defaultStyles, {IStyles} from './styles'
import {Box, Button, Label, Input} from '@theme-ui/components'
import DownArrow from './DownArrow'

interface IItem {
  name: string
  value: string | number
}

export interface ComboboxProps {
  children?: React.ReactNode
  initialSelectedItem?: IItem
  label: React.ReactNode
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void
  onCreateNew?: (values: Partial<UseComboboxState<IItem>>) => void
  options: IItem[]
  styles?: IStyles
}

const Combobox = ({
  children,
  initialSelectedItem,
  options,
  label,
  onChange,
  onCreateNew,
  styles = defaultStyles,
}: ComboboxProps) => {
  const itemToString = (option: IItem | null) => (option ? option.name : '')
  const createNewOptions: IItem[] = onCreateNew ? [{name: '-- Create New --', value: '__createNew'}] : []
  const initialOptions = createNewOptions.concat(options)

  const [inputOptions, setInputOptions] = React.useState(initialOptions)

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    selectedItem,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    initialSelectedItem,
    items: inputOptions,
    onInputValueChange: ({inputValue}) => {
      if (inputValue) {
        setInputOptions(oldOptions =>
          oldOptions.filter(item => {
            if (item.value === '__createNew') return true
            return item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }),
        )
      } else {
        setInputOptions(initialOptions)
      }
    },
    itemToString,
    onSelectedItemChange: changes => {
      if (onCreateNew && changes.selectedItem?.value === '__createNew') {
        onCreateNew(changes)
      }
      if (onChange && changes.selectedItem?.value !== '__createNew') {
        onChange(changes)
      }
    },
  })

  return (
    <Box sx={styles.root}>
      <Box {...getComboboxProps()}>
        <Label sx={styles.label} {...getLabelProps()}>
          {label}
        </Label>
        <Box sx={{...styles.field, padding: 0}}>
          <Input sx={{border: 'none', width: '100%'}} {...getInputProps()} />
          <Button
            type="button"
            sx={{border: 'none', bg: 'inherit', color: 'inherit', '&:hover': {bg: 'inherit', color: 'inherit'}}}
            {...getToggleButtonProps()}
          >
            <DownArrow />
          </Button>
        </Box>
      </Box>
      {isOpen ? (
        <ul sx={styles.menu} {...getMenuProps()}>
          {children}
          {inputOptions.map((option, index) => {
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

export default Combobox

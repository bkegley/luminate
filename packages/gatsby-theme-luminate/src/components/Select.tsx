/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useSelect} from 'downshift'
import {Box, Label, Button} from '@theme-ui/components'
import DownArrow from './DownArrow'

interface IItem {
  name: string
  value: string | number
}

interface IStyles {
  root: object
  button: object
  label: object
  menu: object
  item: object
  highlighted: object
  selected: object
}

export interface SelectProps {
  options: IItem[]
  label: React.ReactNode
  styles?: IStyles
}

export const defaultStyles: IStyles = {
  root: {
    position: 'relative',
  },
  label: {},
  button: {
    variant: 'buttons.text',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    p: 2,
    color: 'inherit',
    bg: 'inherit',
    border: '1px solid black',
    textTransform: 'inherit',
    '&:hover': {bg: 'inherit', color: 'inherit'},
  },
  menu: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    margin: 0,
    padding: 0,
    maxHeight: 250,
    overflowY: 'auto',
    bg: 'white',
    listStyleType: 'none',
    top: 5,
    left: 0,
    right: 0,
    boxShadow: 'medium',
    borderRadius: 'medium',
  },
  item: {
    py: 2,
    px: 3,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
  },
  highlighted: {
    color: 'primary',
  },
  selected: {
    borderLeftColor: 'primary',
  },
}

const Select = ({options, label, styles = defaultStyles}: SelectProps) => {
  const itemToString = (option: IItem) => option.name

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({items: options, itemToString})

  return (
    <Box sx={styles.root}>
      <Label sx={styles.label} {...getLabelProps()}>
        {label}
      </Label>
      <Button type="button" sx={styles.button} {...getToggleButtonProps()}>
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

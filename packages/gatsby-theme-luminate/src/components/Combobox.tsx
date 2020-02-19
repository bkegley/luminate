/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useCombobox, UseComboboxState} from 'downshift'
import defaultStyles, {IStyles} from './styles'
import {Box, Button, Label, Input, Spinner} from 'theme-ui'
import DownArrow from './DownArrow'
import debounce from 'lodash.debounce'
import {DialogDisclosure, DialogStateReturn} from 'reakit'

interface IItem {
  name: string
  value: string
}

export interface ComboboxProps {
  children?: React.ReactNode
  initialSelectedItem?: IItem
  label: React.ReactNode
  onInputChange?: (inputValue: string | undefined) => void
  onInputChangeTimeout?: number
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void
  createNewDialog?: DialogStateReturn
  options?: IItem[]
  loading?: boolean
  styles?: IStyles
}

const Combobox = ({
  children,
  initialSelectedItem,
  options,
  label,
  onInputChange,
  onInputChangeTimeout = 700,
  onChange,
  loading,
  styles = defaultStyles,
  createNewDialog,
}: ComboboxProps) => {
  const itemToString = (option: IItem | null) => (option ? option.name : '')
  const createNewOptions: IItem[] = createNewDialog ? [{name: '-- Create New --', value: '__createNew'}] : []
  const initialOptions = options ? createNewOptions.concat(options) : createNewOptions

  const [inputOptions, setInputOptions] = React.useState(initialOptions)

  // update options on options prop change
  React.useEffect(() => {
    setInputOptions(initialOptions)
  }, [options])

  const handleInputChange = React.useCallback(
    debounce((value: string | undefined) => {
      if (onInputChange) {
        onInputChange(value)
      }
    }, onInputChangeTimeout),
    [onInputChange],
  )

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
    inputValue,
    setInputValue,
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
      if (Array.isArray(initialOptions) && inputValue === '') {
        setInputValue('')
      }
      if (onInputChange) {
        handleInputChange(inputValue)
      }
    },
    itemToString,
    onSelectedItemChange: changes => {
      if (onChange && changes.selectedItem?.value !== '__createNew') {
        onChange(changes)
      }
      if (Array.isArray(initialOptions)) {
        setInputValue('')
      }
    },
    stateReducer: (state, actionAndChanges) => {
      // prevent dropdown from closing on 'Create New' click
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (state.selectedItem?.value === '__createNew') {
            return {
              ...actionAndChanges.changes,
              inputValue: '',
              isOpen: state.isOpen,
              highlightedIndex: state.highlightedIndex,
            }
          }
          return actionAndChanges.changes
        default:
          return actionAndChanges.changes
      }
    },
  })

  React.useEffect(() => {
    setInputValue(initialSelectedItem?.name.toString() || '')
  }, [initialSelectedItem])

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
          {loading ? (
            <Box sx={{textAlign: 'center', py: 4}}>
              <Spinner strokeWidth={2} />
            </Box>
          ) : (
            inputOptions.map((option, index) => {
              if (option.value === '__createNew') {
                const {onClick, ...remainingProps} = getItemProps({item: option, index})
                return (
                  <DialogDisclosure
                    {...createNewDialog}
                    as="li"
                    key={`${option.value}-${index}`}
                    sx={Object.assign(
                      {},
                      styles.item,
                      highlightedIndex === index ? styles.highlighted : null,
                      selectedItem?.value === option.value ? styles.selected : null,
                    )}
                    {...remainingProps}
                  >
                    {option.name}
                  </DialogDisclosure>
                )
              }
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
            })
          )}
        </ul>
      ) : null}
    </Box>
  )
}

export default Combobox

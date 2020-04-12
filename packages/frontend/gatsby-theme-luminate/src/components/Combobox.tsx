import React from 'react'
import {useCombobox, UseComboboxState} from 'downshift'
import {Input, Button, Spinner} from './index'
import DownArrow from './DownArrow'
import debounce from 'lodash.debounce'
import {DialogDisclosure, DialogStateReturn} from 'reakit'

interface IItem {
  name: string
  value: string
}

export interface ComboboxProps {
  children?: React.ReactNode
  id?: string
  initialSelectedItem?: IItem
  // label: React.ReactNode
  onInputChange?: (inputValue: string | undefined) => void
  onInputChangeTimeout?: number
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void
  createNewDialog?: DialogStateReturn
  options?: IItem[]
  loading?: boolean
}

const Combobox = ({
  children,
  id,
  initialSelectedItem,
  options,
  // label,
  onInputChange,
  onInputChangeTimeout = 700,
  onChange,
  loading,
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
    inputId: id || undefined,
    labelId: id || undefined,
    menuId: id || undefined,
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
    <div className="relative">
      <div {...getComboboxProps()}>
        {/* <label className="block mb-1" {...getLabelProps()}>
          {label}
        </label> */}
        <div
          className={`input p-0 flex items-center justify-between w-full bg-white ${
            isOpen ? 'border-b-0 rounded-b-none' : ''
          }`}
        >
          <Input className="border-none flex-1 focus:border-primary-600" {...getInputProps()} />
          <div>
            <Button
              type="button"
              className="border-none bg-transparent hover:bg-transparent hover:text-gray-800"
              {...getToggleButtonProps()}
            >
              <DownArrow />
            </Button>
          </div>
        </div>
      </div>
      {isOpen ? (
        <ul
          className="absolute z-50 w-full m-0 p-0 overflow-y-auto bg-white list-none left-0 right-0 input border-t-0 rounded-t-none shadow-sm rounded-md"
          style={{maxHeight: '250px'}}
          {...getMenuProps()}
        >
          {children}
          {loading ? (
            <div className="text-center py-4">
              <Spinner />
            </div>
          ) : (
            inputOptions.map((option, index) => {
              if (option.value === '__createNew') {
                const {onClick, ...remainingProps} = getItemProps({item: option, index})
                return (
                  <DialogDisclosure
                    {...createNewDialog}
                    as="li"
                    key={`${option.value}-${index}`}
                    className={`py-2 px-3 ${highlightedIndex === index ? 'bg-gray-100' : ''} ${
                      selectedItem?.value === option.value ? 'text-primary-600' : ''
                    }`}
                    {...remainingProps}
                  >
                    {option.name}
                  </DialogDisclosure>
                )
              }
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
            })
          )}
        </ul>
      ) : null}
    </div>
  )
}

export default Combobox

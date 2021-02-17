import React from 'react';
import debounce from 'lodash.debounce';
import { useCombobox, UseComboboxState } from 'downshift';
import { Icon } from './Icon';
import { IconTypesEnum } from './IconTypes';
import { DialogDisclosure, DialogStateReturn } from 'reakit';

interface IItem {
  name: string;
  value: string;
}

export interface ComboboxProps {
  children?: React.ReactNode;
  id?: string;
  initialSelectedItem?: IItem;
  onInputChange?: (inputValue: string | undefined) => void;
  onInputChangeTimeout?: number;
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void;
  createNewDialog?: DialogStateReturn;
  options?: IItem[];
  loading?: boolean;
}

export const Combobox = ({
  children,
  id,
  initialSelectedItem,
  options,
  onInputChange,
  onInputChangeTimeout = 700,
  onChange,
  loading,
  createNewDialog,
}: ComboboxProps) => {
  const itemToString = (option: IItem | null) => (option ? option.name : '');
  const createNewOptions: IItem[] = createNewDialog
    ? [{ name: '-- Create New --', value: '__createNew' }]
    : [];
  const initialOptions = options
    ? createNewOptions.concat(options)
    : createNewOptions;

  const [inputOptions, setInputOptions] = React.useState(initialOptions);

  // update options on options prop change
  React.useEffect(() => {
    setInputOptions(initialOptions);
  }, [options]);

  const handleInputChange = React.useCallback(
    debounce((value: string | undefined) => {
      if (onInputChange) {
        onInputChange(value);
      }
    }, onInputChangeTimeout),
    [onInputChange]
  );

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    selectedItem,
    highlightedIndex,
    getItemProps,
    setInputValue,
  } = useCombobox({
    initialSelectedItem,
    inputId: id || undefined,
    labelId: id || undefined,
    menuId: id || undefined,
    items: inputOptions,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        setInputOptions((oldOptions) =>
          oldOptions.filter((item) => {
            if (item.value === '__createNew') return true;
            return (
              item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            );
          })
        );
      } else {
        setInputOptions(initialOptions);
      }
      if (Array.isArray(initialOptions) && inputValue === '') {
        setInputValue('');
      }
      if (onInputChange) {
        handleInputChange(inputValue);
      }
    },
    itemToString,
    onSelectedItemChange: (changes) => {
      if (onChange && changes.selectedItem?.value !== '__createNew') {
        onChange(changes);
      }
      if (Array.isArray(initialOptions)) {
        setInputValue('');
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
            };
          }
          return actionAndChanges.changes;
        default:
          return actionAndChanges.changes;
      }
    },
  });

  React.useEffect(() => {
    setInputValue(initialSelectedItem?.name.toString() || '');
  }, [initialSelectedItem]);

  return (
    <div className="relative">
      <div className="group" {...getComboboxProps()}>
        <button
          className="input relative w-full pr-10 text-left cursor-default"
          type="button"
          {...getToggleButtonProps()}
        >
          <span className="block truncate">
            {selectedItem
              ? itemToString(selectedItem)
              : itemToString(options ? options[0] : null)}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <span className="h-4 w-4">
              <Icon type={IconTypesEnum.CHEVRON_DOWN} />
            </span>
          </span>
        </button>
      </div>
      {isOpen ? (
        <ul
          className="input absolute mt-1 left-0 right-0 z-50 w-full p-0 m-0 overflow-y-auto list-none border-primary-300 dark:border-primary-100"
          style={{ maxHeight: '250px' }}
          {...getMenuProps()}
        >
          <div className="px-4 py-2">
            <input
              type="text"
              className="shadow-sm focus:ring-gray-300 focus:border-gray-300 dark:focus:border-gray-100 focus:bg-gray-200 dark:focus:bg-gray-700  block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
              {...getInputProps({ autoFocus: true })}
            />
          </div>
          {children}
          {loading ? (
            <div className="text-center py-4">
              <p>loading</p>
            </div>
          ) : (
            inputOptions.map((option, index) => {
              if (option.value === '__createNew') {
                const { onClick, ...remainingProps } = getItemProps({
                  item: option,
                  index,
                });
                return (
                  <DialogDisclosure
                    {...createNewDialog}
                    as="li"
                    key={`${option.value}-${index}`}
                    className={`py-2 px-3 ${
                      highlightedIndex === index
                        ? 'bg-gray-100 dark:bg-gray-900'
                        : ''
                    } ${
                      selectedItem?.value === option.value
                        ? 'text-primary-400'
                        : ''
                    }`}
                    {...remainingProps}
                  >
                    {option.name}
                  </DialogDisclosure>
                );
              }
              return (
                <li
                  key={`${option.value}-${index}`}
                  className={`py-2 px-3 ${
                    highlightedIndex === index
                      ? 'bg-gray-100 dark:bg-gray-900'
                      : ''
                  } ${
                    selectedItem?.value === option.value
                      ? 'text-primary-400'
                      : ''
                  }`}
                  {...getItemProps({ item: option, index })}
                >
                  {option.name}
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Combobox;

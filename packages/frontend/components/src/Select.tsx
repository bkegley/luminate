import React from 'react';
import { useSelect, UseComboboxState } from 'downshift';
import { Icon } from './Icon';
import { IconTypesEnum } from './IconTypes';

interface IItem {
  name: string;
  value: string | number;
}

export interface SelectProps {
  onChange?: (values: Partial<UseComboboxState<IItem>>) => void;
  options?: IItem[];
  initialSelectedItem?: IItem;
  id?: string;
}

export const Select = ({
  onChange,
  options = [],
  initialSelectedItem,
  id,
}: SelectProps) => {
  const itemToString = (option: IItem | null) => (option ? option.name : '');

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString,
    labelId: id || undefined,
    menuId: id || undefined,
    toggleButtonId: id || undefined,
    initialSelectedItem,
    onSelectedItemChange: changes => {
      if (onChange) {
        onChange(changes);
      }
    },
  });

  return (
    <div className="relative">
      <button
        className="input relative w-full pr-10 text-left cursor-default"
        type="button"
        {...getToggleButtonProps()}
      >
        <span className="block truncate">
          {selectedItem ? itemToString(selectedItem) : itemToString(options[0])}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <span className="h-4 w-4">
            <Icon type={IconTypesEnum.CHEVRON_DOWN} />
          </span>
        </span>
      </button>
      <ul
        className={`${
          !isOpen ? 'hidden' : ''
        } input absolute mt-1 left-0 right-0 z-50 w-full p-0 m-0 overflow-y-auto list-none border-primary-300 dark:border-primary-100`}
        style={{ maxHeight: '250px' }}
        {...getMenuProps()}
      >
        {options.map((option, index) => {
          return (
            <li
              key={`${option.value}-${index}`}
              className={`py-2 px-3 ${
                highlightedIndex === index ? 'bg-gray-100 dark:bg-gray-900' : ''
              } ${
                selectedItem?.value === option.value ? 'text-primary-400' : ''
              }`}
              {...getItemProps({ item: option, index })}
            >
              {option.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

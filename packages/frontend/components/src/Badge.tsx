import React from 'react';
import { Icon } from './Icon';
import { IconTypesEnum } from './IconTypes';

export interface BadgeProps {
  size?: 'small' | 'large';
  onCloseClick?: () => void;
  color?: 'primary' | 'secondary' | 'gray';
  children: React.ReactNode;
}

const colorHash: { [key in Required<BadgeProps>['color']]: string } = {
  primary:
    'bg-primary-200 text-primary-700 dark:bg-primary-500 dark:text-primary-100',
  secondary:
    'bg-secondary-200 text-secondary-700 dark:bg-secondary-500 dark:text-secondary-100',
  gray: 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-900',
};

const closeColorHash: { [key in Required<BadgeProps>['color']]: string } = {
  primary:
    'text-primary-400 dark:text-primary-100 hover:bg-primary-700 hover:text-primary-200 dark:hover:text-primary-500 focus:outline-none focus:bg-primary-500 focus:text-white',
  secondary:
    'text-secondary-400 dark:text-secondary-100 hover:bg-secondary-700 hover:text-secondary-200 dark:hover:text-secondary-500 focus:outline-none focus:bg-secondary-500 focus:text-white',
  gray:
    'text-gray-400 hover:bg-gray-700 hover:text-gray-200 focus:outline-none focus:bg-gray-500 focus:text-white',
};

const sizeHash: { [key in Required<BadgeProps>['size']]: string } = {
  small: 'px-2.5 py-0.5 text-xs',
  large: 'px-3 py-0.5 text-sm',
};

const closableSizeHash: { [key in Required<BadgeProps>['size']]: string } = {
  small: 'py-0.5 pl-2 pr-0.5 text-xs',
  large: 'py-0.5 pl-2.5 pr-1 text-sm',
};

export const Badge = ({
  size = 'small',
  color = 'primary',
  onCloseClick,
  children,
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        onCloseClick ? closableSizeHash[size] : sizeHash[size]
      } ${colorHash[color]}`}
    >
      {children}
      {onCloseClick ? (
        <button
          type="button"
          onClick={onCloseClick}
          className={`flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center ${closeColorHash[color]}`}
        >
          <span className="sr-only">Remove badge</span>
          <span className="h-2 w-2">
            <Icon type={IconTypesEnum.X} />
          </span>
        </button>
      ) : null}
    </span>
  );
};

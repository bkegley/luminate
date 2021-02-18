import React from 'react';
import { Transition } from '@headlessui/react';
import { Icon } from './Icon';
import { IconTypesEnum } from './IconTypes';

export interface ToggleProps {
  id?: string;
  initialValue?: boolean;
  onChange?: (on: boolean) => void;
  description?: string;
  variant?: 'primary' | 'secondary';
  onIcon?: IconTypesEnum;
  offIcon?: IconTypesEnum;
}

const colorHash: {
  [key in Required<ToggleProps>['variant']]: {
    background: string;
    ring: string;
    text: string;
  };
} = {
  primary: {
    background: 'bg-primary-400',
    ring: 'focus:ring-primary-500',
    text: 'text-primary-400',
  },
  secondary: {
    background: 'bg-secondary-300',
    ring: 'focus:ring-secondary-300',
    text: 'text-gray-900',
  },
};

export const Toggle = ({
  id,
  initialValue = false,
  onChange,
  variant = 'primary',
  description = 'Use toggle',
  onIcon = IconTypesEnum.CHECK,
  offIcon = IconTypesEnum.X,
}: ToggleProps) => {
  const [on, setOn] = React.useState(initialValue);

  const hasRendered = React.useRef(false);

  React.useEffect(() => {
    if (onChange) {
      if (!hasRendered.current) {
        hasRendered.current = true;
      } else {
        onChange(on);
      }
    }
  }, [on]);

  return (
    <button
      type="button"
      className={`${
        on ? colorHash[variant].background : 'bg-gray-200'
      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        colorHash[variant].ring
      }`}
      aria-pressed={!!on}
      aria-labelledby={id}
      onClick={() => setOn((old) => !old)}
    >
      <span className="sr-only">{description}</span>
      <span
        className={`${
          on ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <Transition
          show={!on}
          enter="transition-opacity ease-in duration-100"
          enterFrom="opacity-100"
          enterTo="opacity-0"
          leave="transition-opacity ease-out duration-200"
          leaveFrom="opacity-0"
          leaveTo="opacity-100"
        >
          <span
            className="absolute inset-0 h-full w-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="bg-white h-3 w-3 text-gray-400">
              <Icon type={offIcon} />
            </span>
          </span>
        </Transition>
        <Transition
          show={on}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <span
            className="absolute inset-0 h-full w-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span className={`bg-white h-3 w-3 ${colorHash[variant].text}`}>
              <Icon type={onIcon} />
            </span>
          </span>
        </Transition>
      </span>
    </button>
  );
};

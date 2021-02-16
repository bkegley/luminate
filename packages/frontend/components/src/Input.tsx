import React from 'react';
import { Icon } from './Icon';
import { IconTypesEnum } from './IconTypes';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  error?: string;
}

export const Input = ({ type = 'text', error, ...props }: InputProps) => {
  return (
    <>
      <div className="relative">
        <input
          type={type}
          {...props}
          className={`input ${error ? 'input-error' : ''}`}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="h-5 w-5 text-red-600">
              <Icon type={IconTypesEnum.EXCLAMATION_CIRCLE} />
            </span>
          </div>
        ) : null}
      </div>
      {error ? <p className="error mt-2 text-sm">{error}</p> : null}
    </>
  );
};

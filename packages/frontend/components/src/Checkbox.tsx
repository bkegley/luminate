import React from 'react';

export interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'className' | 'type'
  > {}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className="focus:ring-primary-200 h-4 w-4 text-primary-400 border-gray-300 rounded"
      {...props}
    />
  );
};

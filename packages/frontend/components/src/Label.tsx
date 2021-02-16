import React from 'react';

export interface LabelProps
  extends Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'className'
  > {}

export const Label = (props: LabelProps) => {
  return (
    <label
      className="font-medium text-gray-700 dark:text-gray-400"
      {...props}
    />
  );
};

import * as React from 'react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: ButtonSize;
  as?: React.ElementType;
}

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const sizeHash: { [key in ButtonSize]: string } = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-0.5 text-sm',
  md: 'px-3 py-1 text-base',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-xl',
};

export const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  ...props
}: ButtonProps) => {
  return React.createElement(
    as,
    { ...props, type, className: `btn btn-${variant} ${sizeHash[size]}` },
    children
  );
};

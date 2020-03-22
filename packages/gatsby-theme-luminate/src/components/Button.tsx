import React from 'react'
import {Button as ReakitButton, ButtonProps as ReakitButtonProps} from 'reakit'

export interface ButtonProps extends ReakitButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger'
  [x: string]: any
}
const Button = ({children, className, variant = 'primary', ...remainingProps}: ButtonProps) => {
  return (
    <ReakitButton className={`btn btn-${variant} ${className ? className : ''}`} {...remainingProps}>
      {children}
    </ReakitButton>
  )
}

export default Button

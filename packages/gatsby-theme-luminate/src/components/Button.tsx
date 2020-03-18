import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger'
  [x: string]: any
}
const Button = ({children, className, variant = 'primary', ...remainingProps}: ButtonProps) => {
  return (
    <button className={`btn btn-${variant} ${className ? className : ''}`} {...remainingProps}>
      {children}
    </button>
  )
}

export default Button

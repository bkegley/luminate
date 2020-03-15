import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'text' | 'danger'
  [x: string]: any
}
const Button = ({children, variant = 'primary', ...remainingProps}: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} {...remainingProps}>
      {children}
    </button>
  )
}

export default Button

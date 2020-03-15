import React from 'react'

export interface InputProps {
  className?: string
  [x: string]: any
}

const Input = ({className, ...remainingProps}: InputProps) => {
  return <input className={`input ${className ? className : ''}`} {...remainingProps} />
}

export default Input

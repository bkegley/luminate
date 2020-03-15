import React from 'react'

export interface InputProps {
  [x: string]: any
}

const Input = ({...remainingProps}: InputProps) => {
  return <input className="input" {...remainingProps} />
}

export default Input

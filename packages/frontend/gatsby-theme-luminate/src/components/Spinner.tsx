import React from 'react'

export interface SpinnerProps {
  size?: number | string
  color?: string
}

const Spinner = ({size = 24, color = 'primary-600'}: SpinnerProps) => {
  return (
    <div className="relative" style={{height: size, width: size}}>
      <div className={`spinner h-full w-full border-2 border-t-0 border-r-0 border-${color} rounded-full`} />
    </div>
  )
}

export default Spinner

import React from 'react'

export interface DownArrowProps {
  size?: number | string
}

const DownArrow = ({size = 16}: DownArrowProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{width: size, height: size}} viewBox="0 0 24 24" fill="currentcolor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )
}

export default DownArrow

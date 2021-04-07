import React from 'react'

export interface CanvasItemProps {
  selected: boolean
  children: React.ReactNode
}

export const CanvasItem = ({selected, children}: CanvasItemProps) => {
  return (
    <div
      className={`p-2 border-2 border-transparent ${
        selected ? 'border-secondary-200' : 'hover:border-gray-200 hover:border-dashed'
      }`}
    >
      {children}
    </div>
  )
}

import {Icon, IconTypesEnum} from '@luminate/components'
import React from 'react'
import {INode} from './types'

export interface CanvasItemProps {
  item: INode
  removeItem: (id: string) => void
  selected: boolean
  children: React.ReactNode
}

export const CanvasItem = ({item, removeItem, selected, children}: CanvasItemProps) => {
  return (
    <div
      className={`group relative p-2 border-2 border-transparent ${
        selected ? 'border-secondary-200' : 'hover:border-gray-200 hover:border-dashed'
      }`}
    >
      <div className="absolute top-0 right-0 w-4 h-4 text-red-600 hidden group-hover:block m-2">
        <button type="button" onClick={() => removeItem(item.id)}>
          <Icon type={IconTypesEnum.TRASH} />
        </button>
      </div>
      {children}
    </div>
  )
}

import React from 'react'
import {HeadingItem} from '../types'
import {CanvasItem} from '../CanvasItem'

export interface ParagraphDisplayProps {
  item: HeadingItem
  selected?: boolean
}

export const ParagraphDisplay = ({item, selected = false}: ParagraphDisplayProps) => {
  return (
    <CanvasItem selected={selected}>
      <p>{item.text}</p>
    </CanvasItem>
  )
}

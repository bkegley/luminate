import React from 'react'
import {HeadingItem} from '../types'

export interface ParagraphDisplayProps {
  item: HeadingItem
}

export const ParagraphDisplay = ({item}: ParagraphDisplayProps) => {
  return <p>{item.text}</p>
}

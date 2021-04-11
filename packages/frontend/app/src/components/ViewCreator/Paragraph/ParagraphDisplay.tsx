import React from 'react'
import {ParagraphNode} from '../types'

export interface ParagraphDisplayProps {
  item: ParagraphNode
}

export const ParagraphDisplay = ({item}: ParagraphDisplayProps) => {
  return <p>{item.data.text}</p>
}

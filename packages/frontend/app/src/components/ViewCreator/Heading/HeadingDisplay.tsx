import React from 'react'
import {Heading} from '@luminate/components'
import {HeadingItem} from '../types'
import {CanvasItem} from '../CanvasItem'

export interface HeadingDisplayProps {
  item: HeadingItem
  selected?: boolean
}

export const HeadingDisplay = ({item, selected = false}: HeadingDisplayProps) => {
  return (
    <CanvasItem selected={selected}>
      <Heading as={item.heading}>{item.text}</Heading>
    </CanvasItem>
  )
}

import React from 'react'
import {Heading} from '@luminate/components'
import {HeadingItem} from '../types'

export interface HeadingDisplayProps {
  item: HeadingItem
}

export const HeadingDisplay = ({item}: HeadingDisplayProps) => {
  return <Heading as={item.heading}>{item.text}</Heading>
}

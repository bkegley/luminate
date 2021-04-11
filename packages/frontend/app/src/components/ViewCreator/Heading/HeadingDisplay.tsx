import React from 'react'
import {Heading} from '@luminate/components'
import {HeadingNode} from '../types'

export interface HeadingDisplayProps {
  item: HeadingNode
}

export const HeadingDisplay = ({item}: HeadingDisplayProps) => {
  return <Heading as={item.data.heading}>{item.data.text}</Heading>
}

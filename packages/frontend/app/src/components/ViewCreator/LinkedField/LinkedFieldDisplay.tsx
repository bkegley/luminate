import React from 'react'
import {IItem} from '../types'

interface LinkedFieldDisplayProps {
  item: IItem
}

export const LinkedFieldDisplay = ({item}: LinkedFieldDisplayProps) => {
  return (
    <div>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  )
}

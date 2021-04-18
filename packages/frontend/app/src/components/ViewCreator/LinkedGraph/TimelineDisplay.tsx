import React from 'react'
import {Datum, Timeline} from '@luminate/charts'
import {LinkedTimelineNode} from '../types'

const xAccessor = (d: Datum) => d[0]
const yAccessor = (d: Datum) => d[1]

export interface TimelineDisplayProps {
  item: LinkedTimelineNode
}

export const TimelineDisplay = ({item}: TimelineDisplayProps) => {
  return (
    <div className="w-full h-96">
      <Timeline
        data={{id: item.id, type: 'line', lines: item.data.lines}}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
      />
    </div>
  )
}

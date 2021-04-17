import React from 'react'
import {ComponentEditor} from '../ComponentEditor'
import {LinkedTimelineNode} from '../types'
import {TimelineForm} from './TimelineForm'
import {useTimeline} from './useTimeline'

export interface TimelineEditorProps {
  item: LinkedTimelineNode
}

export const TimelineEditor = ({item}: TimelineEditorProps) => {
  const [lines, actions] = useTimeline(item.data.lines)

  React.useEffect(() => {
    actions.setData(item.data.lines)
  }, [item.id])

  return (
    <ComponentEditor title="Linked Graph">
      <ComponentEditor.Meta>
        <pre>{JSON.stringify(lines, null, 2)}</pre>
      </ComponentEditor.Meta>
      <TimelineForm item={item} lines={lines} actions={actions} />
    </ComponentEditor>
  )
}

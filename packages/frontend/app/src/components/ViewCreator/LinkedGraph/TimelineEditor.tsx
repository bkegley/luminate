import {Button} from '@luminate/components'
import React from 'react'
import {ComponentEditor} from '../ComponentEditor'
import {LinkedTimelineNode} from '../types'
import {useViewState} from '../useViewState'
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

  const {
    actions: {updateItem},
  } = useViewState<LinkedTimelineNode>()

  return (
    <ComponentEditor title="Linked Graph">
      <ComponentEditor.Meta>
        <pre>{JSON.stringify(lines, null, 2)}</pre>
      </ComponentEditor.Meta>
      <TimelineForm lines={lines} actions={actions} />
      <div className="mt-10 flex flex-row-reverse space-x-4 space-x-reverse">
        <div>
          <Button
            variant="outline"
            onClick={() =>
              updateItem({
                ...item,
                data: {
                  ...item.data,
                  lines,
                },
              })
            }
          >
            Save
          </Button>
        </div>
      </div>
    </ComponentEditor>
  )
}

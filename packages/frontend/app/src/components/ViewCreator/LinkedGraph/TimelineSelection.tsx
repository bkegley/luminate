import React from 'react'
import {Button} from '@luminate/components'
import {LinkedGraphType, LinkedTimelineNode, NodeType} from '../types'
import {useViewState} from '../useViewState'
import {useTimeline} from './useTimeline'
import {TimelineForm} from './TimelineForm'

export const TimelineSelection = () => {
  const [lines, actions] = useTimeline()

  const {
    actions: {addNew},
  } = useViewState<LinkedTimelineNode>()

  return (
    <div>
      <TimelineForm lines={lines} actions={actions} />
      <div className="mt-10 flex flex-row-reverse space-x-4 space-x-reverse">
        <div>
          <Button
            variant="outline"
            onClick={() =>
              addNew({
                type: NodeType.LINKED_GRAPH,
                graphType: LinkedGraphType.TIMELINE,
                data: {
                  type: 'line',
                  lines,
                },
              })
            }
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

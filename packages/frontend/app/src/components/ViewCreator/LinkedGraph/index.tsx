import React from 'react'
import {Button, Icon, IconTypesEnum} from '@luminate/components'
import {SelectionType} from '../ComponentsPanel'
import {TimelineSelection} from './TimelineSelection'

enum LinkedGraphType {
  TIMELINE = 'TIMELINE',
}

interface LinkedGraphProps {
  handleSelectionTypeClick: (selectionType: SelectionType) => void
}

export const LinkedGraph = ({handleSelectionTypeClick}: LinkedGraphProps) => {
  const [selectedGraph, setSelectedGraph] = React.useState<LinkedGraphType | null>(null)

  return (
    <div>
      <button onClick={() => handleSelectionTypeClick(SelectionType.PRIMITIVE)}>
        <div className="flex items-center space-x-1">
          <div className="h-4 w-4">
            <Icon type={IconTypesEnum.CHEVRON_DOUBLE_LEFT} />
          </div>
          <div>Go Back</div>
        </div>
      </button>
      <div className="mt-6">
        {!selectedGraph ? (
          <LinkTypeList setSelectedLink={setSelectedGraph} />
        ) : selectedGraph === LinkedGraphType.TIMELINE ? (
          <TimelineSelection />
        ) : null}
      </div>
    </div>
  )
}

interface LinkTypeListProps {
  setSelectedLink: (linkType: LinkedGraphType) => void
}

const LinkTypeList = ({setSelectedLink}: LinkTypeListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Button variant="outline" onClick={() => setSelectedLink(LinkedGraphType.TIMELINE)}>
        Timeline
      </Button>
    </div>
  )
}

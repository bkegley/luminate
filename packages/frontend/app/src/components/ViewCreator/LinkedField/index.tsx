import {Button, Icon, IconTypesEnum} from '@luminate/components'
import React from 'react'
import {SelectionType} from '../ComponentSelector'
import {CoffeeLinkSelection} from './CoffeeLinkSelection'

enum LinkedFieldType {
  COFFEE = 'COFFEE',
}

interface LinkedFieldProps {
  handleSelectionTypeClick: (selectionType: SelectionType) => void
}

export const LinkedField = ({handleSelectionTypeClick}: LinkedFieldProps) => {
  const [selectedLink, setSelectedLink] = React.useState<LinkedFieldType | null>(null)

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
        {!selectedLink ? (
          <LinkTypeList setSelectedLink={setSelectedLink} />
        ) : selectedLink === LinkedFieldType.COFFEE ? (
          <CoffeeLinkSelection />
        ) : null}
      </div>
    </div>
  )
}

interface LinkTypeListProps {
  setSelectedLink: (linkType: LinkedFieldType) => void
}

const LinkTypeList = ({setSelectedLink}: LinkTypeListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Button variant="outline" onClick={() => setSelectedLink(LinkedFieldType.COFFEE)}>
        Coffee
      </Button>
    </div>
  )
}

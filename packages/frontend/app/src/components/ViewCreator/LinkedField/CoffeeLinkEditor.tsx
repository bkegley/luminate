import React from 'react'
import {Button, Checkbox, Icon, IconTypesEnum, Input, Label} from '@luminate/components'
import {CoffeeLinkNode} from '../types'
import {useViewState} from '../useViewState'

interface CoffeeLinkEditorProps {
  item: CoffeeLinkNode
}

export const CoffeeLinkEditor = ({item}: CoffeeLinkEditorProps): JSX.Element => {
  const {
    actions: {updateItem, removeItem},
  } = useViewState()

  const [label, setLabel] = React.useState(item.data.label)
  const [hasLabel, setHasLabel] = React.useState(false)

  React.useEffect(() => {
    setLabel(item.data.label)
    setHasLabel(!!item.data.label)
  }, [item.id])

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="label">Label</Label>
        <div className="flex items-center space-x-2 w-full">
          <div>
            <Checkbox onChange={() => setHasLabel(old => !old)} checked={hasLabel} />
          </div>
          <div className="flex-1">
            <Input id="label" disabled={!hasLabel} value={label} onChange={e => setLabel(e.currentTarget.value)} />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-row-reverse space-x-4 space-x-reverse">
        <div>
          <Button onClick={() => updateItem({...item, data: {...item.data, label: hasLabel ? label : undefined}})}>
            Save
          </Button>
        </div>
        <div>
          <Button variant="danger" onClick={() => removeItem(item.id)}>
            <div className="h-5 w-5">
              <Icon type={IconTypesEnum.TRASH} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

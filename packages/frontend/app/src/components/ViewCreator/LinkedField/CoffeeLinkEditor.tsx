import React from 'react'
import {Badge, Button, Checkbox, Heading, Icon, IconTypesEnum, Input, Label} from '@luminate/components'
import {CoffeeLinkNode} from '../types'
import {useViewState} from '../useViewState'
import {useGetCoffeeQuery} from '../../../graphql'
import {ComponentEditor} from '../ComponentEditor'

interface CoffeeLinkEditorProps {
  item: CoffeeLinkNode
}

export const CoffeeLinkEditor = ({item}: CoffeeLinkEditorProps): JSX.Element => {
  const {error, loading, data} = useGetCoffeeQuery({variables: {id: item.data.id}})

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
    <ComponentEditor title={data.getCoffee.name} tags="Coffee">
      <ComponentEditor.Meta>
        {data.getCoffee.country ? (
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Country</dt>
            <dd>{data.getCoffee.country.name}</dd>
          </div>
        ) : null}
        {data.getCoffee.region ? (
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Region</dt>
            <dd>{data.getCoffee.region.name}</dd>
          </div>
        ) : null}
        {data.getCoffee.varieties?.length ? (
          <div className="col-span-2">
            <dt className="text-sm text-gray-500 dark:text-gray-400">Varieties</dt>
            <dd>{data.getCoffee.varieties.map(variety => variety.name).join(', ')}</dd>
          </div>
        ) : null}
      </ComponentEditor.Meta>
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
    </ComponentEditor>
  )
}

import {Button} from '@luminate/components'
import React from 'react'
import {useGetCoffeeQuery, useListCoffeesQuery} from '../../../graphql'
import {LinkedEntityType, NodeType} from '../types'
import {useViewState} from '../useViewState'

export const CoffeeLinkSelection = () => {
  const {error, loading, data} = useListCoffeesQuery()
  const [selectedCoffee, setSelectedCoffee] = React.useState<string | null>(null)

  if (!data) {
    return null
  }

  return (
    <div>
      {!selectedCoffee ? (
        <div>
          {data.listCoffees.edges.map(({node}) => {
            return (
              <div key={node.id}>
                <button onClick={() => setSelectedCoffee(node.id)}>{node.name}</button>
              </div>
            )
          })}
        </div>
      ) : (
        <CoffeeFieldSelection id={selectedCoffee} />
      )}
    </div>
  )
}

const CoffeeFieldSelection = ({id}: {id: string}) => {
  const {error, loading, data} = useGetCoffeeQuery({variables: {id}})
  const {
    actions: {addNew},
  } = useViewState()

  if (!data) {
    // TODO: handle loading/error states
    return null
  }
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="col-span-2">
        <dt className="text-sm text-gray-500 dark:text-gray-400">Name</dt>
        <dd>{data.getCoffee.name}</dd>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() =>
            addNew({
              type: NodeType.LINKED_FIELD,
              entityType: LinkedEntityType.COFFEE,
              data: {id: data.getCoffee.id, field: 'name'},
            })
          }
        >
          Add
        </Button>
      </div>
      <div className="col-span-2">
        <dt className="text-sm text-gray-500 dark:text-gray-400">Country</dt>
        <dd>{data.getCoffee.country.name}</dd>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() =>
            addNew({
              type: NodeType.LINKED_FIELD,
              entityType: LinkedEntityType.COFFEE,
              data: {id: data.getCoffee.id, field: 'country.name'},
            })
          }
        >
          Add
        </Button>
      </div>
      <div className="col-span-2">
        <dt className="text-sm text-gray-500 dark:text-gray-400">Region</dt>
        <dd>{data.getCoffee.region.name}</dd>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() =>
            addNew({
              type: NodeType.LINKED_FIELD,
              entityType: LinkedEntityType.COFFEE,
              data: {id: data.getCoffee.id, field: 'region.name'},
            })
          }
        >
          Add
        </Button>
      </div>
    </dl>
  )
}

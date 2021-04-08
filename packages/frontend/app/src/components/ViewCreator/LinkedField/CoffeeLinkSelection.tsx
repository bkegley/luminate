import {Button} from '@luminate/components'
import React from 'react'
import {useGetCoffeeQuery, useListCoffeesQuery} from '../../../graphql'
import {ItemType} from '../types'
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
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Button
        variant="outline"
        onClick={() => addNew({id: 1234, type: ItemType.LINKED_FIELD, entityType: data.getCoffee.__typename})}
      >
        Name
      </Button>
    </div>
  )
}

import React from 'react'
import {useGetCoffeeQuery} from '../../../graphql'
import {CoffeeLinkNode} from '../types'
import {getFieldSelection} from './utils'

interface CoffeeLinkDisplayProps {
  item: CoffeeLinkNode
}

export const CoffeeLinkDisplay = ({item}: CoffeeLinkDisplayProps) => {
  const {error, loading, data} = useGetCoffeeQuery({variables: {id: item.data.id}})

  if (!data) {
    // TODO: loading/error screen
    return null
  }
  return (
    <dl>
      {item.data.label ? <dt className="text-sm text-gray-500 dark:text-gray-400">{item.data.label}</dt> : null}
      <dd>{getFieldSelection(item.data.field, data.getCoffee)}</dd>
    </dl>
  )
}

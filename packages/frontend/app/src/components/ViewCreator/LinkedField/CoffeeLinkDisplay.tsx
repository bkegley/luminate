import React from 'react'
import {useGetCoffeeQuery} from '../../../graphql'
import {LinkedFieldNode} from '../types'

interface CoffeeLinkDisplayProps {
  item: LinkedFieldNode
}

export const CoffeeLinkDisplay = ({item}: CoffeeLinkDisplayProps) => {
  const {error, loading, data} = useGetCoffeeQuery({variables: {id}})
  return <div></div>
}

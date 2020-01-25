import React from 'react'
import {useListCoffeesQuery} from '../graphql'

const IndexPage = () => {
  const {error, loading, data} = useListCoffeesQuery()
  if (error || loading) {
    return null
  }
  return (
    <div>
      <h1>Index Page</h1>
      {data?.listCoffees.edges.map(coffee => {
        return coffee.node?.name
      })}
    </div>
  )
}

export default IndexPage

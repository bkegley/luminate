import React from 'react'
import {useListBrewersQuery} from '../../graphql'

const BrewersListView = () => {
  const {error, loading, data} = useListBrewersQuery()
  return (
    <div>
      <pre>{JSON.stringify({error, loading, data}, null, 2)}</pre>
    </div>
  )
}

export default BrewersListView

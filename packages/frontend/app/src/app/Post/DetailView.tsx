import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import {useGetPostQuery} from '../../graphql'

export const PostDetailView = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()

  const {error, loading, data} = useGetPostQuery({variables: {id}})

  return (
    <div>
      <pre>{JSON.stringify({error, loading, data}, null, 2)}</pre>
    </div>
  )
}

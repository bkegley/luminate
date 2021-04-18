import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import {useGetPostQuery} from '../../graphql'
import {PostUpdateForm} from './UpdateForm'

export const PostUpdatePage = (): JSX.Element => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
  const {error, loading, data} = useGetPostQuery({variables: {id}})

  if (!data) {
    return <div>loading</div>
  }

  return <PostUpdateForm post={data} />
}

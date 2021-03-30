import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import {useSerializer} from '../../components/Editor/useSerializer'
import {useGetPostQuery} from '../../graphql'
import {Node} from 'slate'
import {Page} from '@luminate/components'

export const PostDetailView = () => {
  const serializer = useSerializer()
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()

  const {error, loading, data} = useGetPostQuery({variables: {id}})

  const content: Node[] = data ? JSON.parse(data.getPost.content) : null

  return (
    <Page title={data?.getPost.title}>
      <p>{content ? serializer(content) : null}</p>
    </Page>
  )
}

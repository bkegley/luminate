import React from 'react'
import {Card, Heading, Icon, IconTypesEnum} from '@luminate/components'
import {Link} from 'react-router-dom'
import {useGetEntityPostsQuery, useTogglePinMutation} from '../../graphql'

export interface EntityPostListViewProps {
  entityId: string
}

export const EntityPostListView = ({entityId}: EntityPostListViewProps) => {
  const {error, loading, data} = useGetEntityPostsQuery({variables: {id: entityId}})

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {data.getEntityPosts.edges.map(({node}) => {
        return (
          <div key={node?.id}>
            <PostCard post={node} entityId={entityId} />
          </div>
        )
      })}
    </div>
  )
}

interface PostCardProps {
  post: {
    id: string
    title?: string
    pinned?: boolean
  }
  entityId: string
}

const PostCard = ({post, entityId}: PostCardProps) => {
  const [togglePin] = useTogglePinMutation({
    variables: {id: post.id, entityId},
    update: (cache, response) => {
      if (response.data?.togglePin) {
        cache.modify({
          id: cache.identify(post),
          fields: {
            pinned: curr => !curr,
          },
        })
      }
    },
  })
  return (
    <Card>
      <div className="p-4 flex justify-between">
        <Heading as="h3">{post.title}</Heading>
        <button
          className={`h-5 w-5 ${post.pinned ? 'text-primary-600 dark:text-secondary-300' : ''}`}
          onClick={() => togglePin()}
        >
          <Icon type={post.pinned ? IconTypesEnum.BOOKMARK_ALT : IconTypesEnum.BOOKMARK} />
        </button>
      </div>
      <Card.Footer>
        <Link to={`/posts/${post.id}`}>View More</Link>
      </Card.Footer>
    </Card>
  )
}

import React from 'react'
import {Card, Page} from '@luminate/components'
import {Link, useHistory, useRouteMatch} from 'react-router-dom'
import {Post, useListPostsQuery} from '../../graphql'

const PostsListView = () => {
  const {error, loading, data} = useListPostsQuery()
  const history = useHistory()
  const {url} = useRouteMatch()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Page title="Posts" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
      <Card>
        <div className="py-6">
          {data.listPosts.edges.map(({node}, index) => {
            return (
              <div key={node?.id}>
                <Link to={`${url}/${node?.id}`}>
                  <PostRow post={node} index={index} />
                </Link>
              </div>
            )
          })}
        </div>
      </Card>
    </Page>
  )
}

interface PostRowProps {
  post: Post
  index: number
}
const PostRow = ({post, index}: PostRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/4">{post.title}</div>
    </div>
  )
}

export default PostsListView

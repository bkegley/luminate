import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import {PostCreatePage} from './PostCreatePage'

export const PostsRouter = () => {
  const {url} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={url}>
        <p>list posts</p>
      </Route>
      <Route path={`${url}/create`}>
        <PostCreatePage />
      </Route>
      <Route path={`${url}/:id`}>
        <p>list posts</p>
      </Route>
    </Switch>
  )
}

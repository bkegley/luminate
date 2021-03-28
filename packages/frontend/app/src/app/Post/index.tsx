import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import {PostDetailView} from './DetailView'
import PostsListView from './ListView'
import {PostCreatePage} from './PostCreatePage'
import {PostUpdatePage} from './UpdatePage'

export const PostsRouter = () => {
  const {url} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={url}>
        <PostsListView />
      </Route>
      <Route path={`${url}/create`}>
        <PostCreatePage />
      </Route>
      <Route path={`${url}/:id/edit`}>
        <PostUpdatePage />
      </Route>
      <Route path={`${url}/:id`}>
        <PostDetailView />
      </Route>
    </Switch>
  )
}

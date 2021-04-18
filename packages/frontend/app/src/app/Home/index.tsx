import React from 'react'
import {Card, Heading, Page} from '@luminate/components'
import {useHistory} from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  return (
    <Page title="Home" primaryAction={{onClick: () => history.push('/posts/create'), as: 'a', text: 'Create Post'}}>
      <Card>
        <Heading as="h4">Welcome</Heading>
      </Card>
    </Page>
  )
}

export default Home

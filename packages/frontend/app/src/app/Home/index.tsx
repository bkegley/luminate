import React from 'react'
import {Card, Heading, Page} from '@luminate/components'
import {useHistory} from 'react-router-dom'
import {Donut} from '@luminate/charts'

const data = [
  {name: 'ducks', value: 10, color: 'text-red-600'},
  {name: 'geese', value: 15, color: 'text-primary-300'},
  {name: 'robins', value: 30},
  {name: 'orioles', value: 42},
  {name: 'ravens', value: 87},
  {name: 'pelicans', value: 26},
  {name: 'seagulls', value: 1},
  {name: 'flying-sharks', value: 14},
]

const Home = () => {
  const history = useHistory()

  return (
    <Page title="Home" primaryAction={{onClick: () => history.push('/posts/create'), as: 'a', text: 'Create Post'}}>
      <Card>
        <Heading as="h4">Welcome</Heading>
      </Card>
      <div className="w-full h-96">
        <Donut data={data} innerRadius={150} />
      </div>
    </Page>
  )
}

export default Home

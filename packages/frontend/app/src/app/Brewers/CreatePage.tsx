import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import BrewerCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const BrewerCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Brewer</Heading>
      <BrewerCreateForm onCancel={() => history.push('/coffees')} />
    </div>
  )
}

export default BrewerCreatePage

import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import CuppingSessionCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const CuppingSessionCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Cupping Session</Heading>
      <CuppingSessionCreateForm onCancel={() => history.push('/coffees')} />
    </div>
  )
}

export default CuppingSessionCreatePage

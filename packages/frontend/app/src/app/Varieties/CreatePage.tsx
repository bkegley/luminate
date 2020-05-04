import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import VarietyCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const VarietyCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Variety</Heading>
      <VarietyCreateForm onCancel={() => history.push('/varieties')} />
    </div>
  )
}

export default VarietyCreatePage

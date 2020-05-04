import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import FarmCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const FarmCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Farm</Heading>
      <FarmCreateForm onCancel={() => history.push('/farms')} />
    </div>
  )
}

export default FarmCreatePage

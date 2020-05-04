import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import RegionCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const RegionCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Region</Heading>
      <RegionCreateForm onCancel={() => history.push('/regions')} />
    </div>
  )
}

export default RegionCreatePage

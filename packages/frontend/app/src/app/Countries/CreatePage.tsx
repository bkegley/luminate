import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import CountryCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const CountryCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Country</Heading>
      <CountryCreateForm onCancel={() => history.push('/countries')} />
    </div>
  )
}

export default CountryCreatePage

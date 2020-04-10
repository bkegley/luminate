import React from 'react'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import CoffeeCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const CoffeeCreatePage = () => {
  const history = useHistory()
  return (
    <div>
      <Heading className="mb-4">Create Coffee</Heading>
      <CoffeeCreateForm onCancel={() => history.push('/app/coffees')} />
    </div>
  )
}

export default CoffeeCreatePage

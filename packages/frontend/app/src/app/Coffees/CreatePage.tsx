import React from 'react'
import CoffeeCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'
import {Page} from '@luminate/components'

const CoffeeCreatePage = () => {
  const history = useHistory()
  return (
    <Page title="Create Coffee">
      <CoffeeCreateForm onCancel={() => history.push('/coffees')} />
    </Page>
  )
}

export default CoffeeCreatePage

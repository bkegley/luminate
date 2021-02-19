import React from 'react'
import {Page} from '@luminate/components'
import FarmCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const FarmCreatePage = () => {
  const history = useHistory()
  return (
    <Page title="Create Farm">
      <FarmCreateForm onCancel={() => history.push('/farms')} />
    </Page>
  )
}

export default FarmCreatePage

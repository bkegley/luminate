import React from 'react'
import {useHistory} from 'react-router-dom'
import CuppingSessionCreateForm from './CreateForm'
import {Page} from '@luminate/components'

const CuppingSessionCreatePage = () => {
  const history = useHistory()
  return (
    <Page title="Create Cupping Session">
      <CuppingSessionCreateForm onCancel={() => history.push('/coffees')} />
    </Page>
  )
}

export default CuppingSessionCreatePage

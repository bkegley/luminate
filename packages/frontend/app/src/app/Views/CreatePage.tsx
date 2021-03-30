import React from 'react'
import {Page} from '@luminate/components'
import ViewCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const ViewCreatePage = () => {
  const history = useHistory()
  return (
    <Page title="Create View">
      <ViewCreateForm onCancel={() => history.push('/views')} />
    </Page>
  )
}

export default ViewCreatePage

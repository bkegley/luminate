import React from 'react'
import {Page} from '@luminate/components'
import VarietyCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const VarietyCreatePage = () => {
  const history = useHistory()
  return (
    <Page title="Create Variety">
      <VarietyCreateForm onCancel={() => history.push('/varieties')} />
    </Page>
  )
}

export default VarietyCreatePage

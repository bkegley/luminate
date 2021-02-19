import React from 'react'
import {Page} from '@luminate/components'
import ScoreSheetCreateForm from './CreateForm'

interface ScoreSheetCreatePageProps {
  sessionCoffeeId: string
}

const ScoreSheetCreatePage = ({sessionCoffeeId}: ScoreSheetCreatePageProps) => {
  return (
    <Page title="Create Score Sheet">
      <ScoreSheetCreateForm sessionCoffeeId={sessionCoffeeId} />
    </Page>
  )
}

export default ScoreSheetCreatePage

import React from 'react'
import ScoreSheetCreateForm from './CreateForm'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import {ChevronLeft} from 'react-feather'
import {useRouteMatch, Link} from 'react-router-dom'

interface ScoreSheetCreatePageProps {
  sessionCoffeeId: string
}

const ScoreSheetCreatePage = ({sessionCoffeeId}: ScoreSheetCreatePageProps) => {
  const match = useRouteMatch()
  return (
    <div>
      <div className="flex items-center text-primary-600">
        <ChevronLeft size={12} className="mr-px" />
        <Link to={match.url.replace('/create', '')}>Back</Link>
      </div>
      <Heading as="h3">Create Score Sheet</Heading>
      <ScoreSheetCreateForm sessionCoffeeId={sessionCoffeeId} />
    </div>
  )
}

export default ScoreSheetCreatePage

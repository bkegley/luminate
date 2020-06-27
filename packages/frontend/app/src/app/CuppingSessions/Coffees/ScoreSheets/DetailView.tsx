import React from 'react'
import {useGetScoreSheetQuery} from '../../../../graphql'
import {RouteComponentProps} from 'react-router-dom'
import {Heading} from '@luminate/gatsby-theme-luminate/src'

interface ScoreSheetDetailViewProps extends RouteComponentProps<{scoreSheetId: string; sessionCoffeeId: string}> {}

const ScoreSheetDetailView = ({match}: ScoreSheetDetailViewProps) => {
  const {error, loading, data} = useGetScoreSheetQuery({
    variables: {scoreSheetId: match.params.scoreSheetId, sessionCoffeeId: match.params.sessionCoffeeId},
  })
  return (
    <div>
      <Heading as="h2">Score Sheets</Heading>
      <pre>{JSON.stringify({error, loading, data}, null, 2)}</pre>
    </div>
  )
}

export default ScoreSheetDetailView

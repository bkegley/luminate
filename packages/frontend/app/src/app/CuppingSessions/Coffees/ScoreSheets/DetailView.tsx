import React from 'react'
import {useGetScoreSheetQuery} from '../../../../graphql'
import {RouteComponentProps} from 'react-router-dom'

interface ScoreSheetDetailViewProps extends RouteComponentProps<{scoreSheetId: string; sessionCoffeeId: string}> {}

const ScoreSheetDetailView = ({match}: ScoreSheetDetailViewProps) => {
  const {error, loading, data} = useGetScoreSheetQuery({
    variables: {scoreSheetId: match.params.scoreSheetId, sessionCoffeeId: match.params.sessionCoffeeId},
  })
  return (
    <div>
      <pre>{JSON.stringify({error, loading, data}, null, 2)}</pre>
    </div>
  )
}

export default ScoreSheetDetailView

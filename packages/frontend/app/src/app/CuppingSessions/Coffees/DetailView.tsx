import React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {useGetCuppingSessionCoffeeQuery} from '../../../graphql'
import {Link} from 'react-router-dom'

interface SessionCoffeeDetailViewProps extends RouteComponentProps<{sessionId: string; sessionCoffeeId: string}> {}

const SessionCoffeeDetailView = ({match}: SessionCoffeeDetailViewProps) => {
  console.log({match})
  const {error, loading, data} = useGetCuppingSessionCoffeeQuery({variables: {id: match.params.sessionCoffeeId}})
  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error!</div>
  const coffee = data.getCuppingSessionCoffee

  return (
    <div>
      <h1>{coffee?.sampleNumber}</h1>
      <p>Coffee: {coffee?.coffee.name}</p>
      <p>Average Score: {coffee?.averageScore}</p>
      <div>
        {coffee?.scoreSheets?.map(scoreSheet => {
          return (
            <Link to={`${match.url}/scoreSheets/${scoreSheet?.id}`} key={scoreSheet?.id}>
              <p>Total Score: {scoreSheet?.totalScore}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SessionCoffeeDetailView

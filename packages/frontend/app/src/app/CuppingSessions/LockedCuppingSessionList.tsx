import React from 'react'
import {SessionCoffee, useGetCuppingSessionWithScoreSheetsQuery} from '../../graphql'
import {Modal, useDialogState, Button, Card, Heading} from '@luminate/gatsby-theme-luminate/src'
import CreateScoreSheetForm from './Coffees/ScoreSheets/CreateForm'
import {Link, useLocation} from 'react-router-dom'

interface SessionScoringProps {
  cuppingSessionId: string
}

const SessionScoring = ({cuppingSessionId}: SessionScoringProps) => {
  const {data, error, loading} = useGetCuppingSessionWithScoreSheetsQuery({variables: {id: cuppingSessionId}})
  const location = useLocation()
  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error!</div>

  return (
    <div>
      <h1>Score Sheets</h1>
      <div className="flex justify-between">
        {data.getCuppingSession?.sessionCoffees?.map(sessionCoffee => {
          return <SessionCoffeeCard sessionCoffee={sessionCoffee} pathname={location.pathname} />
        })}
      </div>
    </div>
  )
}

interface SessionCoffeeCardProps {
  sessionCoffee: SessionCoffee | null
  pathname: string
}

const SessionCoffeeCard = ({sessionCoffee, pathname}: SessionCoffeeCardProps) => {
  if (!sessionCoffee) return null
  const createScoreSheetDialog = useDialogState()

  return (
    <>
      <Modal dialog={createScoreSheetDialog}>
        <div className="bg-white p-6">
          <CreateScoreSheetForm
            sessionCoffeeId={sessionCoffee.id}
            onCreateSuccess={() => createScoreSheetDialog.toggle()}
          />
        </div>
      </Modal>
      <Card className="p-3 w-1/4">
        <Link to={`${pathname}/coffees/${sessionCoffee.id}`}>
          <Heading as="h4">{sessionCoffee.sampleNumber}</Heading>
        </Link>
        <p>Total score sheets: {sessionCoffee.scoreSheets?.length || 0}</p>
        <div className="flex justify-end">
          <div>
            <Button variant="text" onClick={createScoreSheetDialog.toggle}>
              Add Score Sheet
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default SessionScoring

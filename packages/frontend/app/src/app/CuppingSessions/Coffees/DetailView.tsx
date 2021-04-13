import React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {useGetCuppingSessionCoffeeQuery} from '../../../graphql'
import ScoreSheetTableView from './ScoreSheets/TableView'

interface SessionCoffeeDetailViewProps extends RouteComponentProps<{sessionId: string; sessionCoffeeId: string}> {}

enum ScoringGraphOption {
  fragranceAroma = 'Fragrance/Aroma',
  flavor = 'Flavor',
  aftertaste = 'Aftertaste',
  body = 'Body',
  uniformity = 'Uniformity',
  cleanCup = 'Clean Cup',
  balance = 'Balance',
  sweetness = 'Sweetness',
  overall = 'Overall',
}

const SessionCoffeeDetailView = ({match}: SessionCoffeeDetailViewProps) => {
  const [selectedGraphOptions, setSelectedGraphOptions] = React.useState<string[]>([])

  const {error, loading, data} = useGetCuppingSessionCoffeeQuery({variables: {id: match.params.sessionCoffeeId}})
  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error!</div>
  const coffee = data.getCuppingSessionCoffee

  // @ts-ignore
  const graphsData: {} = coffee?.scoreSheets.reduce((acc, scoreSheet) => {
    return {
      ...acc,
      // @ts-ignore
      [scoreSheet?.user?.username]: {
        color: Math.floor(Math.random() * 16777215).toString(16),
        ...scoreSheet,
      },
    }
  }, {})

  return (
    <div>
      <h1>{coffee?.sampleNumber}</h1>
      <p>Coffee: {coffee?.coffee.name}</p>
      <p>Average Score: {coffee?.averageScore}</p>
      <div>
        <div className="flex items-center">
          {Object.keys(ScoringGraphOption).map(key => {
            return (
              <div className="mr-4">
                <label htmlFor={key}>
                  <input
                    className="mr-2"
                    type="checkbox"
                    id={key}
                    checked={selectedGraphOptions.includes(key)}
                    onChange={() => {
                      setSelectedGraphOptions(old => {
                        if (old.includes(key)) {
                          return old.filter(option => option !== key)
                        }
                        return old.concat(key)
                      })
                    }}
                  />
                  <span className="mr-2">{ScoringGraphOption[key]}</span>
                </label>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <ScoreSheetTableView scoreSheets={coffee?.scoreSheets} />
      </div>
    </div>
  )
}

export default SessionCoffeeDetailView

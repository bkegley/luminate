import React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {useGetCuppingSessionCoffeeQuery} from '../../../graphql'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend} from 'react-vis'
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
        <XYPlot width={500} height={500} xType="ordinal">
          <HorizontalGridLines />
          <DiscreteColorLegend
            orientation="vertical"
            style={{position: 'absolute', right: '-75px', top: '25px'}}
            // @ts-ignore
            items={Object.keys(graphsData).map(userId => ({title: userId, color: graphsData[userId].color}))}

            // items={selectedGraphOptions.map(option => ({title: option, color: option.color}))}
          />
          {Object.keys(graphsData).map(userId => {
            return (
              <VerticalBarSeries
                // @ts-ignore
                color={graphsData[userId].color}
                data={selectedGraphOptions.map(option => {
                  return {
                    x: option,
                    // @ts-ignore
                    y: graphsData[userId][option],
                  }
                })}
                barWidth={0.5}
              />
            )
          })}
          <XAxis title="id" />
          <YAxis />
        </XYPlot>
        <ScoreSheetTableView scoreSheets={coffee?.scoreSheets} />
      </div>
    </div>
  )
}

export default SessionCoffeeDetailView

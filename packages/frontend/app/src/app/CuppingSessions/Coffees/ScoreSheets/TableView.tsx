import React from 'react'
import {Heading} from '@luminate/components'
import {ScoreSheet} from '../../../../graphql'

export interface ScoreSheetTableViewProps {
  scoreSheets: ScoreSheet[]
}

const ScoreSheetTableView = ({scoreSheets}: ScoreSheetTableViewProps) => {
  const [openScoreSheetId, setOpenScoreSheetId] = React.useState<null | string>(null)
  return (
    <div>
      <div className="my-4">
        <Heading as="h4">Score Sheets</Heading>
      </div>
      <div className="bg-white rounded">
        <table className="w-full">
          <thead className="w-full bg-gray-400 border-b-2 border-gray-600">
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Overall</th>
            <th className="p-4 pr-10 text-right">Total Score</th>
          </thead>
          <tbody>
            {scoreSheets.map(scoreSheet => {
              return (
                <>
                  <tr
                    className={`w-full text-center border-gray-200 ${
                      openScoreSheetId === scoreSheet.id ? '' : 'border-b-2'
                    }`}
                    onClick={() => setOpenScoreSheetId(scoreSheet.id)}
                  >
                    <td className="p-4 text-left">{scoreSheet.user?.username}</td>
                    <td className="p-4 text-left">{scoreSheet.overall}</td>
                    <td className="p-4 pr-10 text-right">{scoreSheet.totalScore}</td>
                  </tr>
                  <tr className={`${openScoreSheetId === scoreSheet.id ? 'border-b-2' : 'hidden'} w-full bg-gray-100`}>
                    <td colSpan={4} className="p-6">
                      <div>Body: {scoreSheet.body}</div>
                      <div>Flavor: {scoreSheet.flavor}</div>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ScoreSheetTableView

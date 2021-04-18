import React from 'react'
import {LineData} from '@luminate/charts'

type Coord = [number, number]

export interface UseTimeLineActions {
  setData: (data: LineData[]) => void
  addLine: () => void
  updateLineMeta: (lineIndex: number, meta: Omit<LineData, 'data'>) => void
  addLineCoord: (lineIndex: number) => void
  updateLineCoord: (lineIndex: number, rowIndex: number, coord: Coord) => void
}

export const useTimeline = (initialData?: LineData[]) => {
  const [lines, setLines] = React.useState<LineData[]>(initialData ?? [])

  const actions: UseTimeLineActions = React.useMemo(
    () => ({
      setData: (data: LineData[]) => {
        setLines(data)
      },
      addLine: () => {
        setLines(data => data.concat({data: []}))
      },
      updateLineMeta: (lineIndex: number, meta: Omit<LineData, 'data'>) => {
        setLines(lines => lines.map((line, index) => (index === lineIndex ? {...line, ...meta} : line)))
      },
      addLineCoord: (lineIndex: number) => {
        setLines(lines =>
          lines.map((line, index) => (index === lineIndex ? {...line, data: line.data.concat([[0, 0]])} : line)),
        )
      },
      updateLineCoord: (lineIndex: number, rowIndex: number, coord: Coord) => {
        setLines(lines =>
          lines.map((line, index) =>
            index === lineIndex
              ? {...line, data: line.data.map((row, index) => (index === rowIndex ? coord : row))}
              : line,
          ),
        )
      },
    }),
    [],
  )

  return [lines, actions] as [LineData[], UseTimeLineActions]
}

import React from 'react'
import {Button, Icon, IconTypesEnum, Input, Label, Select} from '@luminate/components'
import {UseTimeLineActions} from './useTimeline'
import {LineData} from '@luminate/charts'
import {useViewState} from '../useViewState'

export interface TimelineFormProps {
  item?: any
  lines: LineData[]
  actions: UseTimeLineActions
}

export const TimelineForm = ({item, lines, actions}: TimelineFormProps) => {
  const {
    actions: {updateItem},
  } = useViewState()

  return (
    <>
      <div>
        <div className="space-y-10">
          {lines.map((line, i) => {
            return <TimelineLine index={i} line={line} actions={actions} />
          })}
        </div>
        <div className="mt-6 flex flex-row-reverse col-span-3">
          <div>
            <Button variant="outline" onClick={actions.addLine}>
              <div className="h-4 w-4">
                <Icon type={IconTypesEnum.PLUS} />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-row-reverse space-x-4 space-x-reverse">
        <div>
          <Button
            variant="outline"
            onClick={() =>
              updateItem({
                ...item,
                data: {
                  ...item.data,
                  lines,
                },
              })
            }
          >
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

interface TimelineLineProps {
  actions: UseTimeLineActions
  index: number
  line: LineData
}

const TimelineLine = ({actions, line, index: lineIndex}: TimelineLineProps) => {
  const [open, setOpen] = React.useState(true)

  return (
    <div>
      <div className="flex flex-col items-end w-full">
        <div>
          <Button onClick={() => setOpen(old => !old)}>
            <div className="h-5 w-5">
              <Icon type={open ? IconTypesEnum.MENU : IconTypesEnum.MENU_ALT_2} />
            </div>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor={`type-${lineIndex}`}>Type</Label>
          <Select
            options={[
              {name: 'Line', value: 'line'},
              {name: 'Area', value: 'area'},
            ]}
            onChange={value => {
              actions.updateLineMeta(lineIndex, {type: value.selectedItem.value as 'line' | 'area'})
            }}
          />
          <Label htmlFor={`color-${lineIndex}`}>Color</Label>
          <Select
            options={[
              {name: 'Green', value: 'text-primary-400'},
              {name: 'Yellow', value: 'text-secondary-300'},
            ]}
            onChange={value => {
              actions.updateLineMeta(lineIndex, {color: value.selectedItem.value as string})
            }}
          />
        </div>
      </div>
      {open ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {line.data.map((coord, index) => {
            return (
              <TimelineRow
                row={index}
                coord={coord}
                updateRow={(rowIndex: number, coord: Coord) => actions.updateLineCoord(lineIndex, rowIndex, coord)}
              />
            )
          })}
          <div className="mt-6 flex flex-row-reverse col-span-3">
            <div>
              <Button variant="outline" onClick={() => actions.addLineCoord.call(null, lineIndex)}>
                <div className="h-4 w-4">
                  <Icon type={IconTypesEnum.PLUS} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

type Coord = [number, number]

interface TimelineRowProps {
  row: number
  coord: Coord
  updateRow: (rowIndex: number, coord: Coord) => void
}

const TimelineRow = ({row, coord, updateRow}: TimelineRowProps) => {
  return (
    <>
      <div className="col-span-1">
        <p>Coordinates</p>
      </div>
      <div>
        <Label htmlFor="x">X</Label>
        <Input
          type="number"
          value={coord[0]}
          onChange={e => updateRow(row, [parseInt(e.currentTarget.value), coord[1]])}
        />
      </div>
      <div>
        <Label htmlFor="y">Y</Label>
        <Input
          type="number"
          value={coord[1]}
          onChange={e => updateRow(row, [coord[0], parseInt(e.currentTarget.value)])}
        />
      </div>
    </>
  )
}

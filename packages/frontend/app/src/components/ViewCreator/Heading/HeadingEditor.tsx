import React from 'react'
import {Button, Heading, Icon, IconTypesEnum, Input, Label} from '@luminate/components'
import {HeadingItem} from '../types'
import {useViewState} from '../useViewState'

interface HeadingEditorProps {
  item: HeadingItem
}

export const HeadingEditor = ({item}: HeadingEditorProps) => {
  const {
    actions: {updateItem, removeItem},
  } = useViewState()

  const [text, setText] = React.useState(item.text)
  const [heading, setHeading] = React.useState(item.heading)

  React.useEffect(() => {
    setText(item.text)
    setHeading(item.heading)
  }, [item.id])

  return (
    <div>
      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="text">Text</Label>
          <Input id="text" value={text} onChange={e => setText(e.currentTarget.value)} />
        </div>
        <div className="flex flex-col items-start space-y-4">
          {Array.from(new Array(6)).map((_, index) => {
            const tag = `h${index + 1}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
            return (
              <button className={heading === tag ? 'text-primary-500' : ''} onClick={() => setHeading(tag)}>
                <Heading as={tag}>Heading {index + 1}</Heading>
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-10 flex flex-row-reverse space-x-4 space-x-reverse">
        <div>
          <Button onClick={() => updateItem({...item, text, heading})}>Save</Button>
        </div>
        <div>
          <Button variant="danger" onClick={() => removeItem(item.id)}>
            <div className="h-5 w-5">
              <Icon type={IconTypesEnum.TRASH} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

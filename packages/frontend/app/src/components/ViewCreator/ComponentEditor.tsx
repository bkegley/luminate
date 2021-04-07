import {Button, Input, Label} from '@luminate/components'
import React from 'react'
import {ItemType, TitleItem} from './types'
import {useViewState} from './useViewState'

export const ComponentEditor = () => {
  const {
    items,
    selectedItem,
    actions: {removeItem},
  } = useViewState()

  if (selectedItem === null) {
    return null
  }

  const item = items.find(item => item.id === selectedItem)

  return (
    <div>
      {item.type === ItemType.TITLE ? <TitleEditor item={item} /> : <div>other</div>}
      <div>
        <button onClick={() => removeItem(selectedItem)}>remove</button>
      </div>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  )
}

interface TitleEditorProps {
  item: TitleItem
}
const TitleEditor = ({item}: TitleEditorProps) => {
  const {
    actions: {updateItem},
  } = useViewState()

  React.useEffect(() => {
    setText(item.text)
  }, [item.id])

  const [text, setText] = React.useState(item.text)
  return (
    <div>
      <div>
        <Label htmlFor="title">title</Label>
        <Input id="title" value={text} onChange={e => setText(e.currentTarget.value)} />
      </div>
      <div>
        <Button onClick={() => updateItem({...item, text})}>Save</Button>
      </div>
    </div>
  )
}

import React from 'react'
import {Button, Icon, IconTypesEnum, Label} from '@luminate/components'
import {HeadingItem} from '../types'
import {useViewState} from '../useViewState'

interface ParagraphEditorProps {
  item: HeadingItem
}

export const ParagraphEditor = ({item}: ParagraphEditorProps) => {
  const {
    actions: {updateItem, removeItem},
  } = useViewState()

  const [text, setText] = React.useState(item.text)

  React.useEffect(() => {
    setText(item.text)
  }, [item.id])

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <div>
          <textarea className="input" rows={10} id="text" value={text} onChange={e => setText(e.currentTarget.value)} />
        </div>
      </div>
      <div className="mt-10 flex flex-row-reverse space-x-4 space-x-reverse">
        <div>
          <Button onClick={() => updateItem({...item, text})}>Save</Button>
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

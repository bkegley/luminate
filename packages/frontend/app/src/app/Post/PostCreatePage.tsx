import {Button, Card, Input, Label, Page} from '@luminate/components'
import React from 'react'
import {Editable, Slate} from 'slate-react'
import {useEditor} from '../../components/Editor/useEditor'

export const PostCreatePage = () => {
  const [title, setTitle] = React.useState('')
  const {getSlateProps, getEditableProps, actions} = useEditor()

  return (
    <Page title="Create a Post">
      <Card>
        <div className="p-6 min-h-[50vh]">
          <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
          </div>
          <div className="my-6">
            <Slate {...getSlateProps()}>
              <Editable {...getEditableProps()} placeholder="Tell the world..." />
            </Slate>
          </div>
        </div>
        <Card.Footer>
          <div className="flex justify-end">
            <div className="order-1">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Page>
  )
}

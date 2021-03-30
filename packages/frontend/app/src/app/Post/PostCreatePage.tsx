import React from 'react'
import {Button, Card, Input, Label, Page} from '@luminate/components'
import {Editable, Slate} from 'slate-react'
import {useEditor} from '../../components/Editor/useEditor'
import {EntityRelationInput, EntityType, useCreatePostMutation} from '../../graphql'
import {useQueryParams} from '../../hooks/useQueryParams'

export const PostCreatePage = () => {
  const queryParams = useQueryParams()

  const [title, setTitle] = React.useState('')
  const [relations, setRelations] = React.useState<EntityRelationInput[]>(
    queryParams.get('type') && queryParams.get('id')
      ? [{id: queryParams.get('id'), type: queryParams.get('type') as EntityType}]
      : [],
  )

  const {getSlateProps, getEditableProps, actions} = useEditor()
  const [createPost, {error, loading, data}] = useCreatePostMutation()

  const handleSubmit = () => {
    const {value} = getSlateProps()
    const input = {title, content: JSON.stringify(value), relations}
    createPost({variables: {input}})
  }

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
              <Button type="submit" variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Page>
  )
}

import React from 'react'
import {Button, Card, Input, Label, Page, Select} from '@luminate/components'
import {Editable, Slate} from 'slate-react'
import {useEditor} from '../../components/Editor/useEditor'
import {EntityRelationInput, EntityType, useCreatePostMutation, useListViewsQuery} from '../../graphql'
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

  const {data: listData} = useListViewsQuery()
  const options = listData?.listViews.edges.map(({node}) => ({value: node.id, name: node.name}))
  const [selectedView, setSelectedView] = React.useState<string | null>(null)

  return (
    <Page title="Create a Post">
      <Card>
        <div className="p-6 min-h-[50vh]">
          <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
          </div>
          <div>
            <Label htmlFor="view">View</Label>
            <Select options={options} onChange={e => setSelectedView(e.selectedItem?.value as string)} />
            <div>
              <Button variant="secondary" onClick={() => actions.insertView(selectedView)}>
                Add View
              </Button>
            </div>
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

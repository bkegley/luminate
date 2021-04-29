import React from 'react'
import {Button, Card, Grid, Heading, Input, Label, Select, Page} from '@luminate/components'
import {Editable, Slate} from 'slate-react'
import {useEditor} from '../../components/Editor/useEditor'
import {EntityRelationInput, EntityType, useCreatePostMutation, useListViewsQuery} from '../../graphql'
import {useQueryParams} from '../../hooks/useQueryParams'

export const PostCreateForm = () => {
  const queryParams = useQueryParams()

  const [title, setTitle] = React.useState('')
  const [relations, setRelations] = React.useState<EntityRelationInput[]>(
    queryParams.get('type') && queryParams.get('id')
      ? [{id: queryParams.get('id'), type: queryParams.get('type') as EntityType}]
      : [],
  )

  const {getSlateProps, getEditableProps, actions} = useEditor()
  const [createPost, {error, loading, data}] = useCreatePostMutation({})

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
      <Grid>
        <Grid.Left>
          <Card>
            <div className="p-6 min-h-[50vh]">
              <div className="space-y-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
                <Slate {...getSlateProps()}>
                  <Editable {...getEditableProps()} />
                </Slate>
              </div>
            </div>
            <Card.Footer>
              <div className="flex justify-end">
                <div className="order-1">
                  <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Save
                  </Button>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Grid.Left>
        <Grid.Right>
          <div className="sticky">
            <Card>
              <Card.Title>
                <Heading>Views</Heading>
              </Card.Title>
              <Card.Content>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="view">View</Label>
                    <Select options={options} onChange={e => setSelectedView(e.selectedItem?.value as string)} />
                  </div>
                </div>
              </Card.Content>
              <Card.Footer>
                <div className="flex flex-col items-end">
                  <div>
                    <Button variant="outline" onClick={() => actions.insertView(selectedView)}>
                      Add View
                    </Button>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Grid.Right>
      </Grid>
    </Page>
  )
}

import React from 'react'
import {Button, Card, Grid, Heading, Input, Label, Select, Page} from '@luminate/components'
import {Editable, Slate} from 'slate-react'
import {useEditor} from '../../components/Editor/useEditor'
import {GetPostQuery, useListViewsQuery, useUpdatePostMutation} from '../../graphql'

interface PostEditorProps {
  post: GetPostQuery
}

export const PostUpdateForm = ({post}: PostEditorProps): JSX.Element => {
  const {id, title: initialTitle, content} = post.getPost
  const initialValue = JSON.parse(content)

  const {getSlateProps, getEditableProps, actions} = useEditor({initialValue})
  const [title, setTitle] = React.useState(initialTitle)
  const [updatePost, {error, loading, data: updateData}] = useUpdatePostMutation()

  const {data: listData} = useListViewsQuery()
  const options = listData?.listViews.edges.map(({node}) => ({value: node.id, name: node.name}))
  const [selectedView, setSelectedView] = React.useState<string | null>(null)

  return (
    <Page
      title={post.getPost.title}
      primaryAction={{
        text: 'Save',
        onClick: () => {
          updatePost({variables: {id, input: {title, content: JSON.stringify(getSlateProps().value)}}})
        },
      }}
    >
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
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => {
                      updatePost({variables: {id, input: {title, content: JSON.stringify(getSlateProps().value)}}})
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Grid.Left>
        <Grid.Right>
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
        </Grid.Right>
      </Grid>
    </Page>
  )
}

import React from 'react'
import {Card, Label, Page, Input, Button} from '@luminate/components'
import {useRouteMatch} from 'react-router-dom'
import {Editable, Slate} from 'slate-react'
import {useEditor} from '../../components/Editor/useEditor'
import {GetPostQuery, useGetPostQuery, useUpdatePostMutation} from '../../graphql'

export const PostUpdatePage = (): JSX.Element => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
  const {error, loading, data} = useGetPostQuery({variables: {id}})

  if (!data) {
    return <div>loading</div>
  }

  return <PostEditor data={data} />
}

interface PostEditorProps {
  data: GetPostQuery
}

const PostEditor = ({data}: PostEditorProps) => {
  const {id, title: initialTitle, content} = data.getPost
  const initialValue = JSON.parse(content)

  const {getSlateProps, getEditableProps} = useEditor({initialValue})
  const [title, setTitle] = React.useState(initialTitle)
  const [updatePost, {error, loading, data: updateData}] = useUpdatePostMutation()

  return (
    <Page title="Update">
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
                Submit
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Page>
  )
}

import React from 'react'
import {Card, Heading, Page} from '@luminate/components'
import {useEditor} from '../../components/Editor/useEditor'
import {Slate, Editable} from 'slate-react'
import {useHistory} from 'react-router-dom'

const Home = () => {
  const {getSlateProps, getEditableProps} = useEditor()
  const history = useHistory()

  return (
    <Page title="Home" primaryAction={{onClick: () => history.push('/posts/create'), as: 'a', text: 'Create Post'}}>
      <Card>
        <Heading as="h4">Welcome</Heading>
      </Card>
      <Slate {...getSlateProps()}>
        <Editable {...getEditableProps()} />
      </Slate>
    </Page>
  )
}

export default Home

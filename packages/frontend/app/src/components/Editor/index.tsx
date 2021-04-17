import {Select} from '@luminate/components'
import React from 'react'
import {createEditor, Editor as SlateEditor, Transforms, Descendant, Element} from 'slate'
import {Slate, Editable, withReact, useEditor} from 'slate-react'
import {useListViewsQuery} from '../../graphql'

const withMentions = (editor: SlateEditor) => {
  const {isVoid, isInline} = editor
  editor.isInline = (element: Element) => (element.type === 'mention' ? true : isInline(element))
  editor.isVoid = (element: Element) => (element.type === 'mention' ? true : isVoid(element))
  return editor
}

const withEmbeds = (editor: SlateEditor) => {
  const {isVoid} = editor
  editor.isVoid = (element: Element) => (element.type === 'view' ? true : isVoid(element))
  return editor
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const Mention = ({attributes, element, children}: any) => {
  const {text} = element.data
  return (
    <span className="bg-green-400 text-white" {...attributes}>
      {text}
      {children}
    </span>
  )
}

const DefaultElement = (props: any) => {
  return (
    <p className="my-4" {...props.attributes}>
      {props.children}
    </p>
  )
}

const insertObject = <T extends {[x: string]: any; text: string}>(type: string) => (editor: SlateEditor, data: T) => {
  const mention = {
    type,
    data,
    children: [{text: data.text}],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

const insertMention = insertObject<{text: string}>('mention')
const insertView = (editor: SlateEditor, data: any) => {
  const mention = {
    type: 'view',
    data,
    children: [{text: data.text}],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.insertNodes(editor, {type: 'paragraph', children: [{text: ''}]})
  Transforms.move(editor)
}

const InsertView = () => {
  const editor = useEditor()
  const [id, setId] = React.useState('')
  const {error, loading, data} = useListViewsQuery()
  const options = data?.listViews.edges.map(({node}) => ({value: node.id, name: node.name}))
  return (
    <div className="p-6">
      <Select options={options} />
      <button
        className="bg-white text-gray-800"
        onClick={() => {
          insertView(editor, {text: '', url: 'https://picsum.photos/200', id})
          setId('')
        }}
      >
        Add View
      </button>
    </div>
  )
}

export const Editor = () => {
  const editor = React.useMemo(() => withReact(withEmbeds(withMentions(createEditor()))), [])

  const [value, setValue] = React.useState<Descendant[]>([{type: 'paragraph', children: [{text: ''}]}])

  const renderElement = React.useCallback(props => {
    switch (props.element.type) {
      case 'code': {
        return <CodeElement {...props} />
      }
      case 'mention': {
        return <Mention {...props} />
      }
      case 'view': {
        return
      }
      default: {
        return <DefaultElement {...props} />
      }
    }
  }, [])

  const onKeyDown = React.useCallback(event => {
    switch (event.key) {
      case '`': {
        event.preventDefault()
        Transforms.setNodes(editor, {type: 'code'}, {match: n => SlateEditor.isBlock(editor, n)})
      }
    }
  }, [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setValue(newValue)
      }}
    >
      <div>
        <InsertView />
        <Editable renderElement={renderElement} onKeyDown={onKeyDown} />
      </div>
    </Slate>
  )
}

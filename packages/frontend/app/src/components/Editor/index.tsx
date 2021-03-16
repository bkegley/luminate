import React from 'react'
import {createEditor, Editor as SlateEditor, Transforms, Descendant, Element} from 'slate'
import {Slate, Editable, withReact, useEditor} from 'slate-react'

const withMentions = (editor: SlateEditor) => {
  const {isVoid, isInline} = editor
  editor.isInline = (element: Element) => (element.type === 'mention' ? true : isInline(element))
  editor.isVoid = (element: Element) => (element.type === 'mention' ? true : isVoid(element))
  return editor
}

const withEmbeds = (editor: SlateEditor) => {
  const {isVoid} = editor
  editor.isVoid = (element: Element) => (element.type === 'embeddable' ? true : isVoid(element))
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
const insertEmbed = (editor: SlateEditor, data: any) => {
  const mention = {
    type: 'embeddable',
    data,
    children: [{text: data.text}],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.insertNodes(editor, {type: 'paragraph', children: [{text: ''}]})
  Transforms.move(editor)
}

const InsertEmbed = () => {
  const editor = useEditor()
  const [id, setId] = React.useState('')
  return (
    <div className="p-6">
      <input type="text" value={id} onChange={e => setId(e.currentTarget.value)} />
      <button
        className="bg-white text-gray-800"
        onClick={() => {
          insertEmbed(editor, {text: '', url: 'https://picsum.photos/200', id})
          setId('')
        }}
      >
        Embed
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
      case 'embeddable': {
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
        <InsertEmbed />
        <Editable renderElement={renderElement} onKeyDown={onKeyDown} />
      </div>
    </Slate>
  )
}

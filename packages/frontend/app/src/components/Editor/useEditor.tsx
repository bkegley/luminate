import React from 'react'
import {Editor, Element, Descendant, createEditor, Transforms, Text} from 'slate'
import {withReact} from 'slate-react'
import {EditableProps, RenderLeafProps} from 'slate-react/dist/components/editable'
import {NodeType} from './NodeType'
import {ViewDisplay} from '../ViewCreator/ViewDisplay'

const withMentions = (editor: Editor) => {
  const {isVoid, isInline} = editor
  editor.isInline = (element: Element) => (element.type === 'mention' ? true : isInline(element))
  editor.isVoid = (element: Element) => (element.type === 'mention' ? true : isVoid(element))
  return editor
}

const withEmbeds = (editor: Editor) => {
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

const View = ({attributes, element, children}: any) => {
  const {id} = element
  return <ViewDisplay id={id} />
}

const DefaultElement = (props: any) => {
  return (
    <p className="my-4" {...props.attributes}>
      {props.children}
    </p>
  )
}

const Leaf = ({attributes, leaf, children}: RenderLeafProps) => {
  if (leaf[NodeType.BOLD]) {
    children = <strong>{children}</strong>
  }

  if (leaf[NodeType.ITALIC]) {
    children = <em>{children}</em>
  }

  if (leaf[NodeType.UNDERLINE]) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export interface EditorConfig {
  initialValue?: Descendant[]
  renderElementMap?: {[x: string]: React.FC}
}

const defaultRenderMap: {[x: string]: React.FC} = {
  [NodeType.CODE]: CodeElement,
  [NodeType.MENTION]: Mention,
  [NodeType.VIEW]: View,
}

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(editor, {[format]: isActive ? null : true}, {match: Text.isText, split: true})
}

const isFormatActive = (editor: Editor, format: string) => {
  const nodes = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  })
  return !!nodes.next().value
}

const defaultValue = [{type: NodeType.PARAGRAPH, children: [{text: ''}]}]

export const useEditor = (
  {initialValue, renderElementMap}: EditorConfig = {
    initialValue: defaultValue,
    renderElementMap: {},
  },
) => {
  const editor = React.useMemo(() => withReact(withEmbeds(withMentions(createEditor()))), [])

  const insertView = React.useCallback((id: string) => {
    const view = {
      type: NodeType.VIEW,
      id,
      children: [{text: ''}],
    }
    Transforms.insertNodes(editor, view)
    Transforms.insertNodes(editor, {type: NodeType.PARAGRAPH, children: [{text: ''}]})
    Transforms.move(editor)
  }, [])

  const [value, setValue] = React.useState<Descendant[]>(initialValue ?? defaultValue)

  const renderElement = React.useCallback(
    props => {
      if (renderElementMap && renderElementMap[props.element.type]) {
        return renderElementMap[props.element.type](props)
      }

      if (defaultRenderMap[props.element.type]) {
        return defaultRenderMap[props.element.type](props)
      }

      return <DefaultElement {...props} />
    },
    [renderElementMap],
  )

  const onKeyDown = React.useCallback(event => {
    switch (event.key) {
      case '`': {
        event.preventDefault()
        Transforms.setNodes(editor, {type: NodeType.CODE}, {match: n => Editor.isBlock(editor, n)})
      }
    }
  }, [])

  const onDOMBeforeInput = React.useCallback((event: InputEvent) => {
    switch (event.inputType) {
      case 'formatBold':
        event.preventDefault()
        return toggleFormat(editor, NodeType.BOLD)
      case 'formatItalic':
        event.preventDefault()
        return toggleFormat(editor, NodeType.ITALIC)
      case 'formatUnderline':
        event.preventDefault()
        return toggleFormat(editor, NodeType.UNDERLINE)
    }
  }, [])

  const onChange = React.useCallback(newValue => {
    setValue(newValue)
  }, [])

  return {
    actions: {
      insertView,
    },
    getSlateProps: () => ({
      editor,
      value,
      onChange,
    }),
    getEditableProps: (): EditableProps => ({
      onKeyDown,
      renderElement,
      renderLeaf: props => <Leaf {...props} />,
      onDOMBeforeInput,
    }),
  }
}

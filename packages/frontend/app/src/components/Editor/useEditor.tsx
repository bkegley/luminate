import React from 'react'
import {Editor, Element, Descendant, createEditor, Transforms} from 'slate'
import {withReact} from 'slate-react'

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

const DefaultElement = (props: any) => {
  return (
    <p className="my-4" {...props.attributes}>
      {props.children}
    </p>
  )
}

export enum NodeType {
  PARAGRAPH = 'PARAGRAPH',
  CODE = 'CODE',
  MENTION = 'MENTION',
  EMBEDDABLE = 'EMBEDDABLE',
}

export interface EditorConfig {
  initialValue?: Descendant[]
  renderElementMap?: {[x: string]: React.FC}
}

const defaultRenderMap: {[x: string]: React.FC} = {
  [NodeType.CODE]: CodeElement,
  [NodeType.MENTION]: Mention,
  //[NodeType.EMBEDDABLE]: () => {},
}

export const useEditor = (
  {initialValue, renderElementMap}: EditorConfig = {
    initialValue: [{type: NodeType.PARAGRAPH, children: [{text: ''}]}],
    renderElementMap: {},
  },
) => {
  const editor = React.useMemo(() => withReact(withEmbeds(withMentions(createEditor()))), [])

  const [value, setValue] = React.useState<Descendant[]>(initialValue)

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

  const onChange = React.useCallback(newValue => {
    setValue(newValue)
  }, [])

  return {
    actions: {},
    getSlateProps: () => ({
      editor,
      value,
      onChange,
    }),
    getEditableProps: () => ({
      onKeyDown,
      renderElement,
    }),
  }
}

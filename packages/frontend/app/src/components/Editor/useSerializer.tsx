import React from 'react'
import {Node, Text} from 'slate'
import {NodeType} from './NodeType'

const Paragraph = ({children}: any) => {
  return <p>{children}</p>
}

const defaultSerializeMap = {
  [NodeType.PARAGRAPH]: Paragraph,
}

export const useSerializer = () => {
  const serialize = React.useCallback((nodes: Node | Node[]) => {
    if (Text.isText(nodes)) {
      if (nodes[NodeType.BOLD]) {
        return <strong>{nodes.text}</strong>
      }

      if (nodes[NodeType.ITALIC]) {
        return <em>{nodes.text}</em>
      }

      if (nodes[NodeType.UNDERLINE]) {
        return <u>{nodes.children}</u>
      }
      return <span>{nodes.text}</span>
    }

    if (Array.isArray(nodes)) {
      return nodes.map(node => {
        // @ts-ignore
        const children = node.children.map(n => serialize(n))
        // @ts-ignore
        const Component = defaultSerializeMap[NodeType.PARAGRAPH]
        return Component ? <Component>{children}</Component> : <Paragraph>{children}</Paragraph>
      })
    }
  }, [])

  return serialize
}

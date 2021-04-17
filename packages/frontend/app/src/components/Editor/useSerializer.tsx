import React from 'react'
import {Node, Text} from 'slate'
import {NodeType} from './NodeType'
import {ViewDisplay} from '../ViewCreator/ViewDisplay'

const Paragraph = ({children}: any) => {
  return <p>{children}</p>
}

const defaultSerializeMap = {
  [NodeType.PARAGRAPH]: Paragraph,
  [NodeType.VIEW]: ViewDisplay,
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
        const Component = defaultSerializeMap[node.type]
        return Component ? <Component {...node}>{children}</Component> : <Paragraph>{children}</Paragraph>
      })
    }
  }, [])

  return serialize
}

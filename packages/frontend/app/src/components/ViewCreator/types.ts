export enum NodeType {
  HEADING = 'HEADING',
  PARAGRAPH = 'PARAGRAPH',
  LINKED_FIELD = 'LINKED_FIELD',
}

export interface BaseNode {
  id: number
  type: NodeType
}

export interface HeadingNode extends BaseNode {
  type: NodeType.HEADING
  text: string
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface ParagraphNode extends BaseNode {
  type: NodeType.PARAGRAPH
  text: string
}

export interface LinkedFieldNode extends BaseNode {
  type: NodeType.LINKED_FIELD
  // TODO: use EntityType enum
  entityType: string
}

export type INode = HeadingNode | ParagraphNode | LinkedFieldNode

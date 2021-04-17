import {LineData} from '@luminate/charts'

export enum NodeType {
  HEADING = 'HEADING',
  PARAGRAPH = 'PARAGRAPH',
  LINKED_FIELD = 'LINKED_FIELD',
  LINKED_GRAPH = 'LINKED_GRAPH',
}

export interface BaseNode<T extends object = {}> {
  id: string
  type: NodeType
  data: T
}

export interface HeadingNode
  extends BaseNode<{
    text: string
    heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }> {
  type: NodeType.HEADING
}

export interface ParagraphNode extends BaseNode<{text: string}> {
  type: NodeType.PARAGRAPH
}

export interface LinkedFieldNode<T extends object = {}> extends BaseNode<T> {
  type: NodeType.LINKED_FIELD
  entityType: LinkedEntityType
}

export enum LinkedEntityType {
  COFFEE = 'COFFEE',
}

export interface LinkedGraphNode<T extends object = {}> extends BaseNode<T> {
  type: NodeType.LINKED_GRAPH
  graphType: LinkedGraphType
}

export enum LinkedGraphType {
  TIMELINE = 'TIMELINE',
}

type Color = 'green' | 'yellow'

export interface LinkedTimelineData {
  type?: 'line' | 'area'
  lines: LineData[]
}

export interface LinkedTimelineNode extends LinkedGraphNode<LinkedTimelineData> {}

export interface CoffeeLinkNode extends LinkedFieldNode<{id: string; field: string; label: string}> {}

export type INode = HeadingNode | ParagraphNode | LinkedFieldNode | LinkedGraphNode

export enum ItemType {
  HEADING = 'HEADING',
  PARAGRAPH = 'PARAGRAPH',
  EMBEDDED_DATA = 'EMBEDDED_DATA',
}

export interface BaseItem {
  id: number
  type: ItemType
}

export interface HeadingItem extends BaseItem {
  type: ItemType.HEADING
  text: string
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface ParagraphItem extends BaseItem {
  type: ItemType.PARAGRAPH
  text: string
}

export interface EmbeddedDataItem extends BaseItem {
  type: ItemType.EMBEDDED_DATA
  // TODO: use EntityType enum
  entityType: string
}

export type IItem = HeadingItem | ParagraphItem | EmbeddedDataItem

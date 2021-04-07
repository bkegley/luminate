export enum ItemType {
  TITLE = 'TITLE',
  EMBEDDED_DATA = 'EMBEDDED_DATA',
}

export interface BaseItem {
  id: number
  type: ItemType
}

export interface TitleItem extends BaseItem {
  type: ItemType.TITLE
  text: string
}

export interface EmbeddedDataItem extends BaseItem {
  type: ItemType.EMBEDDED_DATA
  // TODO: use EntityType enum
  entityType: string
}

export type IItem = EmbeddedDataItem | TitleItem

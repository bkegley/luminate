import {ValueObject} from '@luminate/services-shared'

export interface RootNode extends Partial<Record<FormatType, boolean>> {
  text: string
}

export interface ParagraphNode {
  type: 'PARAGRAPH'
  children: RootNode[]
}

enum FormatType {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
}
export type PostNode = string

export class PostContent extends ValueObject<PostNode[]> {
  public get value() {
    return this.attrs
  }

  public toString() {
    return JSON.stringify(this.attrs)
  }

  public static create(content: any) {
    return new PostContent(content)
  }
}

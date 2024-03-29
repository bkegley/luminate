import {ValueObject} from '@luminate/ddd'

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

  public static create(content: string) {
    return new PostContent(JSON.parse(content))
  }
}

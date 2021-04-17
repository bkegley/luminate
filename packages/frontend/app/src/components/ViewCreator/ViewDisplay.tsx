import React from 'react'
import {useGetViewQuery} from '../../graphql'
import {HeadingDisplay} from './Heading'
import {LinkedFieldDisplay} from './LinkedField/LinkedFieldDisplay'
import {LinkedGraphDisplay} from './LinkedGraph/LinkedGraphDisplay'
import {ParagraphDisplay} from './Paragraph'
import {NodeType} from './types'

export const ViewDisplay = ({id}: {id: string}) => {
  const {error, loading, data} = useGetViewQuery({variables: {id}})
  if (!data) {
    // TODO: handle error and loading better
    return null
  }
  const {jsonString} = data.getView
  const items = jsonString ? JSON.parse(jsonString) : []
  return (
    <div>
      {items.map(
        (item: any, index): JSX.Element => {
          let Component: React.ReactNode | null = null
          switch (item.type) {
            case NodeType.HEADING:
              Component = HeadingDisplay
              break

            case NodeType.PARAGRAPH:
              Component = ParagraphDisplay
              break

            case NodeType.LINKED_FIELD:
              Component = LinkedFieldDisplay
              break

            case NodeType.LINKED_GRAPH:
              Component = LinkedGraphDisplay
              break
          }
          // @ts-ignore
          return <div className="my-2">{Component ? <Component item={item} /> : null}</div>
        },
      )}
    </div>
  )
}

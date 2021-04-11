import React from 'react'
import {Badge, Heading, Icon, IconTypesEnum} from '@luminate/components'

interface ComponentEditorProps {
  title: string
  tags?: string | string[]
  children: React.ReactNode
}

const ComponentEditorContext = React.createContext(undefined)

export const ComponentEditor = ({title, tags, children}: ComponentEditorProps) => {
  const childArray = React.Children.toArray(children)

  const {meta, otherChildren} = childArray.reduce<{meta?: React.ReactNode; otherChildren: React.ReactNode[]}>(
    (acc, child: React.ReactElement) => {
      // @ts-ignore
      return child.type.name === 'Meta'
        ? {...acc, meta: child}
        : {...acc, otherChildren: acc.otherChildren.concat(child)}
    },
    {meta: undefined, otherChildren: []},
  )

  const [metaOpen, setMetaOpen] = React.useState(false)

  const tagArray = Array.isArray(tags) ? tags : [tags]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Heading as="h2">{title}</Heading>
          <div className="flex flex-wrap items-center space-x-2">
            {tagArray?.map(tag => (
              <Badge color="gray">{tag}</Badge>
            ))}
          </div>
        </div>
        {!!meta ? (
          <div>
            <button
              onClick={() => setMetaOpen(old => !old)}
              className="rounded p-2 dark:bg-gray-800 text-secondary-300"
            >
              <div className="h-5 w-5">
                <Icon type={metaOpen ? IconTypesEnum.CHEVRON_DOUBLE_UP : IconTypesEnum.CHEVRON_DOUBLE_DOWN} />
              </div>
            </button>
          </div>
        ) : null}
      </div>
      {metaOpen ? meta : null}
      {otherChildren}
    </div>
  )
}

interface ComponentEditorMetaProps {
  children: React.ReactNode
}

const Meta = ({children}: ComponentEditorMetaProps) => {
  return <dl className="mt-4 grid grid-cols-2 gap-4">{children}</dl>
}

ComponentEditor.Meta = Meta

import React from 'react'

interface TagProps {
  onCloseClick?: () => void
  variant?: 'default' | 'primary'
  text: string
}

const Tag = ({text, onCloseClick, variant = 'default'}: TagProps) => {
  return (
    <div className={`tag tag-${variant}`}>
      <div className="flex items-center">
        <div className="ml-2 mr-1 text-sm uppercase tracking-wide">{text}</div>
        {onCloseClick ? (
          <div onClick={onCloseClick} className={`tag-close tag-close-${variant}`}>
            X
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Tag

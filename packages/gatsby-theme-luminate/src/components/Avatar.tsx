import React from 'react'

export interface AvatarProps {
  width?: string | number
  height?: string | number
  src: string
  [x: string]: any
}

const Avatar = ({width = 48, height = 48, src, ...remainingProps}: AvatarProps) => {
  return (
    <img
      width={width}
      height={height}
      src={src}
      {...remainingProps}
      className="rounded-full min-w-0 max-w-full m-0 border-none bg-transparent appearance-none"
    />
  )
}

export default Avatar

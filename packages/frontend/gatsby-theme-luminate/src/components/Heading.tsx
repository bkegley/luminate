import React from 'react'

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
  [x: string]: any
}

const Heading = ({as, children, className: providedClassName, ...remainingProps}: HeadingProps) => {
  let fontSize = 'text-4xl'
  switch (as) {
    case 'h1': {
      fontSize = 'text-5xl'
      break
    }
    case 'h2': {
      break
    }
    case 'h3': {
      fontSize = 'text-3xl'
      break
    }
    case 'h4': {
      fontSize = 'text-2xl'
      break
    }
    case 'h5': {
      fontSize = 'text-1xl'
      break
    }
    case 'h6': {
      fontSize = 'text-base'
      break
    }
  }

  const className = `${providedClassName} ${fontSize}`
  return React.createElement(as ? as : 'h2', {className, ...remainingProps}, children)
}

export default Heading

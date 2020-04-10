import React from 'react'

export interface CardProps {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'blank'
  [x: string]: any
}

const Card = ({children, className, variant = 'default'}: CardProps) => {
  return <div className={`card card-${variant} ${className}`}>{children}</div>
}

export default Card

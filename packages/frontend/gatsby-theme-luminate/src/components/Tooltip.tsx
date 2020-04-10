import React from 'react'
import {useTooltipState, Tooltip as ReakitTooltip, TooltipReference} from 'reakit/Tooltip'

export interface TooltipProps {
  children: React.ReactElement
  text: string
}

const Tooltip = ({children, text}: TooltipProps) => {
  const tooltip = useTooltipState()
  return (
    <>
      <TooltipReference {...tooltip} {...children.props}>
        {referenceProps => React.cloneElement(children, referenceProps)}
      </TooltipReference>
      <ReakitTooltip {...tooltip} className="bg-black text-white py-1 px-2 rounded text-xs">
        {text}
      </ReakitTooltip>
    </>
  )
}
export default Tooltip

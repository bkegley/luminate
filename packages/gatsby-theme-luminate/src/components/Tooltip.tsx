/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useTooltipState, Tooltip as ReakitTooltip, TooltipReference} from 'reakit/Tooltip'

export interface TooltipProps {
  children: React.ReactElement
  text: string
  variant: string[] | string
}

const Tooltip = ({children, text, variant}: TooltipProps) => {
  const tooltip = useTooltipState()
  return (
    <React.Fragment>
      <TooltipReference {...tooltip} {...children.props}>
        {referenceProps => React.cloneElement(children, referenceProps)}
      </TooltipReference>
      <ReakitTooltip
        {...tooltip}
        sx={{
          bg: 'black',
          color: 'white',
          p: 1,
          borderRadius: 'small',
          fontSize: 0,
          variant: Array.isArray(variant) ? variant.map(variant => `tooltip.${variant}`) : `tooltip.${variant}`,
        }}
      >
        {text}
      </ReakitTooltip>
    </React.Fragment>
  )
}
export default Tooltip

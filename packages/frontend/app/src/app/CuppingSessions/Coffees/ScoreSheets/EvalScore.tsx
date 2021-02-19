import React from 'react'
import {Select, SelectProps} from '@luminate/components'

type EvalScoreProps = Omit<SelectProps, 'options'>

const EvalScore = (props: EvalScoreProps) => {
  const options = [6, 7, 8, 9, 10].reduce<Array<{name: string; value: number}>>((acc, curr) => {
    if (curr < 10)
      return acc.concat([
        {name: curr.toString(), value: curr},
        {name: (curr + 0.25).toString(), value: curr + 0.25},
        {name: (curr + 0.5).toString(), value: curr + 0.5},
        {name: (curr + 0.75).toString(), value: curr + 0.75},
      ])
    return acc.concat({name: curr.toString(), value: curr})
  }, [])
  return <Select options={options} {...props} />
}

export default EvalScore

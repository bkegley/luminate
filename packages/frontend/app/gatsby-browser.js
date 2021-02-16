import React from 'react'
import {DarkModeProvider} from './src/hooks/DarkModeProvider'

import './src/styles/style.css'
import 'react-vis/dist/style.css'

export const wrapRootElement = ({element}) => {
  return <DarkModeProvider>{element}</DarkModeProvider>
}

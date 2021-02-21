import React from 'react'
import {DarkModeProvider} from './src/hooks/DarkModeProvider'

import './src/styles/style.css'
import 'react-vis/dist/style.css'

const Wrapper = ({element}) => {
  return <DarkModeProvider initialTheme={'dark'}>{element}</DarkModeProvider>
}

export const wrapRootElement = ({element}) => <Wrapper element={element} />

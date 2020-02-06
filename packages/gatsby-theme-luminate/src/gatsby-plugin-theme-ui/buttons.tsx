import * as CSSType from 'csstype'
import {Theme} from 'theme-ui'

const buttonDefaults: CSSType.StandardProperties = {
  textTransform: 'uppercase',
  textAlign: 'center',
}

const buttons: Theme['buttons'] = {
  primary: {
    ...buttonDefaults,
    color: 'secondary',
    bg: 'primary',
    '&:hover': {
      bg: 'secondary',
      color: 'background',
    },
  },
  secondary: {
    ...buttonDefaults,
    color: 'secondary',
    bg: 'greens[3]',
  },
  text: {
    ...buttonDefaults,
    bg: 'inherit',
    color: 'black',
    border: 'none',
  },
  danger: {
    ...buttonDefaults,
    color: 'red',
    bg: 'background',
    border: 'borders.danger',
  },
}

export default buttons

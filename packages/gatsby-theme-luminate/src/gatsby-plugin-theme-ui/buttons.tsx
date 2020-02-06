import * as CSSType from 'csstype'
import {Theme} from 'theme-ui'

const buttonDefaults: CSSType.StandardProperties = {
  textTransform: 'uppercase',
  textAlign: 'center',
  fontFamily: 'body',
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
    bg: 'greens.1',
  },
  outline: {
    ...buttonDefaults,
    bg: 'inherit',
    color: 'secondary',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'secondary',
  },
  text: {
    ...buttonDefaults,
    bg: 'inherit',
    color: 'black',
    border: 'none',
  },
  danger: {
    ...buttonDefaults,
    color: 'reds.7',
    bg: 'reds.1',
  },
}

export default buttons

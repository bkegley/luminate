import {Theme} from 'theme-ui'
import {base} from '@theme-ui/presets'
import merge from 'lodash.merge'
import * as CSSType from 'csstype'

const buttonDefaults: CSSType.StandardProperties = {
  textTransform: 'uppercase',
  textAlign: 'center',
}

const theme: Theme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
  },
  borders: {
    primary: {
      border: '1px solid primary',
    },
    danger: {
      border: '1px solid red',
    },
  },
  buttons: {
    primary: {
      ...buttonDefaults,
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text',
      },
    },
    secondary: {
      ...buttonDefaults,
      color: 'background',
      bg: 'secondary',
    },
    danger: {
      ...buttonDefaults,
      color: 'red',
      bg: 'background',
      border: 'borders.danger',
    },
  },
  radii: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 'medium',
      boxShadow: 'rgba(65, 69, 88, 0.1) 0px 7px 14px 0px, rgba(0, 0, 0, 0.07) 0px 3px 6px 0px;',
    },
    compact: {
      padding: 1,
      borderRadius: 'small',
      border: '1px solid',
      borderColor: 'muted',
    },
  },
  forms: {
    checkbox: {
      borderColor: 'red',
    },
  },
}

export default merge(base, theme)

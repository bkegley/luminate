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
    small: 4,
    medium: 8,
    large: 12,
  },
  shadows: {
    small: '1px 1px 9px 2px hsla(0, 0%, 0%, 0.07)',
    medium: '7px 3px 11px 7px hsla(0, 0%, 0%, 0.1)',
    large: '7px 3px 13px 12px hsla(0, 0%, 0%, 0.15)',
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 'medium',
      boxShadow: 'medium',
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

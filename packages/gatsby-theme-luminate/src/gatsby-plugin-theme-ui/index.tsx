import {Theme} from 'theme-ui'
import {base} from '@theme-ui/presets'
import merge from 'lodash.merge'
import colors from './colors'
import buttons from './buttons'

const cardDefaults = {
  overflow: 'hidden',
  bg: 'background',
}

const theme: Theme = {
  colors,
  buttons,
  fonts: {
    body: 'Lato',
    heading: 'Lato',
  },
  borders: {
    primary: {
      border: '1px solid primary',
    },
    danger: {
      border: '1px solid red',
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
    blank: {},
    primary: {
      ...cardDefaults,
      borderRadius: 'medium',
      boxShadow: 'medium',
    },
    compact: {
      ...cardDefaults,
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
  styles: {
    root: {
      m: 0,
      p: 0,
    },
  },
  tooltip: {
    primary: {
      color: 'green',
    },
    secondary: {
      color: 'orange',
    },
  },
  modal: {
    small: {
      top: '50%',
      height: '20vh',
      mt: '-10vh',
    },
    medium: {
      top: '50%',
      height: '40vh',
      mt: '-20vh',
    },
    large: {
      top: '50%',
      height: '60vh',
      mt: '-30vh',
    },
  },
}

export default merge(base, theme)

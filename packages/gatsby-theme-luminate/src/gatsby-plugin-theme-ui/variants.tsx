import {SxStyleProp} from 'theme-ui'

type ThemeVariantKey = {[x: string]: SxStyleProp}
export interface ThemeVariants {
  cards: ThemeVariantKey
}

const variants: ThemeVariants = {
  cards: {
    primary: {},
  },
}

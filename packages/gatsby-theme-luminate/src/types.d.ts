declare module '@theme-ui/presets' {
  import {Theme} from 'theme-ui'

  type themePresets =
    | 'base'
    | 'dark'
    | 'deep'
    | 'funk'
    | 'future'
    | 'roboto'
    | 'swiss'
    | 'system'
    | 'tosh'
    | 'bootstrap'
    | 'bulma'
    | 'polaris'
    | 'tailwind'

  const presets: Record<themePresets, Theme>

  export = presets
}

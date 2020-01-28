/** @jsx jsx */
import {jsx, SxStyleProp} from 'theme-ui'
import React from 'react'
import {Flex, Box, Close} from '@luminate/gatsby-theme-luminate/src'
import {animated, useTransition} from 'react-spring'

type From = 'top' | 'right' | 'bottom' | 'left'
const getStylesForDrawerOpenFrom = (from: From) => {
  switch (from) {
    case 'top': {
      return {
        width: '100%',
        maxHeight: '90%',
        top: 0,
        left: 0,
      }
    }
    case 'right': {
      return {
        height: '100%',
        maxWidth: '90%',
        top: 0,
        right: 0,
      }
    }
    case 'bottom': {
      return {
        width: '100%',
        maxHeight: '90%',
        bottom: 0,
        left: 0,
      }
    }
    case 'left': {
      return {
        height: '100%',
        maxWidth: '90%',
        top: 0,
        left: 0,
      }
    }
  }
}
const DrawerBackground = ({
  ...props
}: {
  style?: React.CSSProperties
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {
  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'fixed',
        overflow: 'auto',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0.5,
        bg: 'black',
      }}
      {...props}
    />
  )
}

const DrawerWrapper = ({
  from,
  children,
  sx,
  ...props
}: {
  from: From
  children: React.ReactNode
  sx?: SxStyleProp
  style?: React.CSSProperties
}) => {
  return (
    <Box
      sx={{
        ...sx,
        zIndex: 100,
        overflow: 'auto',
        position: 'fixed',
        ...getStylesForDrawerOpenFrom(from),
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

const AnimatedDrawerBackground = animated(DrawerBackground)
const AnimatedDrawerWrapper = animated(DrawerWrapper)

const getDrawerAnimationStyles = (from: From) => {
  switch (from) {
    case 'top': {
      return {
        from: {marginTop: '-100%'},
        enter: {marginTop: '0px'},
        leave: {marginTop: '-100%'},
      }
    }
    case 'right': {
      return {
        from: {marginRight: '-100%'},
        enter: {marginRight: '0px'},
        leave: {marginRight: '-100%'},
      }
    }
    case 'bottom': {
      return {
        from: {marginBottom: '-100%'},
        enter: {marginBottom: '0px'},
        leave: {marginBottom: '-100%'},
      }
    }
    case 'left':
    default: {
      return {
        from: {marginLeft: '-100%'},
        enter: {marginLeft: '0px'},
        leave: {marginLeft: '-100%'},
      }
    }
  }
}

type ClickOutsideFn = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent,
) => void

interface DrawerProps {
  children: React.ReactNode
  onClickOutside: ClickOutsideFn
  from: From
  open: boolean
  bg?: string
  width?: string | string[]
}

const Drawer = ({
  children,
  onClickOutside,
  bg = 'white',
  width = ['90%', '75%', 'fit-content'],
  from,
  open,
}: DrawerProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape' && open) {
      onClickOutside(e)
    }
  }
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  const drawerTransitions = useTransition(open, null, getDrawerAnimationStyles(from))

  const backgroundTransitions = useTransition(open, null, {
    from: {opacity: 0},
    enter: {opacity: 0.5},
    leave: {opacity: 0},
  })

  return (
    <React.Fragment>
      {backgroundTransitions.map(
        ({item, key, props: animatedProps}) =>
          item && <AnimatedDrawerBackground style={animatedProps} key={key} onClick={onClickOutside} />,
      )}
      {drawerTransitions.map(({item, key, props: animatedProps}) => {
        return (
          item && (
            <AnimatedDrawerWrapper from={from} sx={{bg, width}} style={animatedProps} key={key}>
              <Flex
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    alignSelf: `flex-${from === 'right' ? 'start' : 'end'}`,
                    p: 2,
                    cursor: 'pointer',
                  }}
                >
                  <Close onClick={onClickOutside} />
                </Box>
                <Box sx={{width: '100%'}}>{children}</Box>
              </Flex>
            </AnimatedDrawerWrapper>
          )
        )
      })}
    </React.Fragment>
  )
}

export default Drawer

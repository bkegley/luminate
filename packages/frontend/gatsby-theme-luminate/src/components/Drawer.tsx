import React from 'react'
import {animated, useTransition} from 'react-spring'

type From = 'top' | 'right' | 'bottom' | 'left'
const getStylesForDrawerOpenFrom = (from: From) => {
  let classString = ''
  switch (from) {
    case 'top': {
      classString = 'w-full max-h-screen-11/12 top-0 left-0'
      break
    }
    case 'right': {
      classString = 'h-full max-w-screen-11/12 top-0 right-0'
      break
    }
    case 'bottom': {
      classString = 'w-full max-h-screen-11/12 bottom-0 left-0'
      break
    }
    case 'left': {
      classString = 'h-full max-w-screen-11/12 top-0 left-0'
      break
    }
  }
  return classString
}

const DrawerBackground = (props: any) => {
  return <div className="fixed overflow-auto z-50 top-0 left-0 h-full w-full opacity-50 bg-black" {...props} />
}

const DrawerWrapper = ({
  from,
  children,
  ...props
}: {
  from: From
  children: React.ReactNode
  className: string
  style: {[x: string]: any}
}) => {
  return (
    <div className={`z-50 overflow-auto fixed ${getStylesForDrawerOpenFrom(from)}`} {...props}>
      {children}
    </div>
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

const Drawer = ({children, onClickOutside, from, open}: DrawerProps) => {
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
            <AnimatedDrawerWrapper
              from={from}
              className="sm:w-11/12 md:w-1/2 lg:w-full bg-white"
              style={animatedProps}
              key={key}
            >
              <div className="flex flex-col items-center justify-center">
                <div className={`self-${from === 'right' ? 'start' : 'end'} p-2 cursor-pointer`}>
                  <button className="border-none p-0 m-0 bg-transparent text-lg" onClick={onClickOutside}>
                    x
                  </button>
                </div>
                <div className="w-full">{children}</div>
              </div>
            </AnimatedDrawerWrapper>
          )
        )
      })}
    </React.Fragment>
  )
}

export default Drawer

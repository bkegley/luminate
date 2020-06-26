import React from 'react'
import {useMenuState, Menu as BaseMenu, MenuButton, MenuStateReturn} from 'reakit'

export interface MenuProps {
  children: (menu: MenuStateReturn) => React.ReactNode
  button: React.ReactElement
  [x: string]: any
}

const Menu = ({button, items, children, ...props}: MenuProps) => {
  const menu = useMenuState()
  return (
    <React.Fragment>
      <MenuButton {...menu} {...button.props}>
        {disclosureProps => React.cloneElement(button, disclosureProps)}
      </MenuButton>
      <BaseMenu {...menu} {...props}>
        {children(menu)}
      </BaseMenu>
    </React.Fragment>
  )
}

export default Menu

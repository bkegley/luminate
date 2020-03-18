import React from 'react'
import {DialogBackdrop, Dialog, DialogStateReturn, DialogProps} from 'reakit'

export interface ModalProps {
  children: React.ReactNode
  className?: string
  dialog: DialogStateReturn
  top?: string
  variant?: string | string[]
  [x: string]: any
}

const Modal = ({children, className, dialog, top = '50px', variant, ...props}: ModalProps) => {
  return (
    <React.Fragment>
      <DialogBackdrop {...dialog} className="absolute bg-gray-600 opacity-50 inset-0 z-50" />
      <Dialog
        {...dialog}
        {...props}
        className={`fixed z-50 ${className}`}
        style={{top, left: '50%', transform: 'translateX(-50%)'}}
      >
        {children}
      </Dialog>
    </React.Fragment>
  )
}

export default Modal

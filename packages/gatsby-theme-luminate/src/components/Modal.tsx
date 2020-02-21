/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {DialogBackdrop, Dialog, DialogStateReturn, DialogProps} from 'reakit'

export interface ModalProps {
  children: React.ReactNode
  dialog: DialogStateReturn
  variant?: string | string[]
  [x: string]: any
}

const Modal = ({children, dialog, variant, ...props}: ModalProps) => {
  return (
    <React.Fragment>
      <DialogBackdrop
        {...dialog}
        sx={{
          bg: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
        }}
      />
      <Dialog
        {...dialog}
        {...props}
        sx={{
          position: 'fixed',
          top: '50px',
          left: '50%',
          bg: 'white',
          transform: 'translateX(-50%)',
          borderRadius: 'small',
          padding: 3,
          maxHeight: 'calc(100vh - 100px)',
          outline: 0,
          zIndex: 999,
          variant: Array.isArray(variant) ? variant.map(variant => `modal.${variant}`) : `modal.${variant}`,
        }}
      >
        {children}
      </Dialog>
    </React.Fragment>
  )
}

export default Modal

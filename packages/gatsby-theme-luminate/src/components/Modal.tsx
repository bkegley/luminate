/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useDialogState, Dialog, DialogDisclosure, DialogBackdrop, DialogStateReturn} from 'reakit/Dialog'

export interface ModalProps {
  disclosure: React.ReactElement
  backdrop?: boolean
  variant?: string[] | string
  children: (dialog: DialogStateReturn) => React.ReactElement
  [x: string]: any
}

const Modal = ({disclosure, backdrop = true, variant, children, ...props}: ModalProps) => {
  const dialog = useDialogState()
  return (
    <React.Fragment>
      <DialogDisclosure {...dialog} {...disclosure.props}>
        {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
      </DialogDisclosure>
      {backdrop ? (
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
        >
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
            {children(dialog)}
          </Dialog>
        </DialogBackdrop>
      ) : (
        <Dialog {...dialog} {...props} />
      )}
    </React.Fragment>
  )
}

export default Modal

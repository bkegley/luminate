/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Text} from 'theme-ui'

interface DeleteAlertProps {
  heading?: string
  text?: string
  onCancelClick?: () => void
  onConfirmClick?: () => void
  variant?: 'default' | 'danger'
}

const DeleteAlert = ({heading, text, onCancelClick, onConfirmClick, variant = 'default'}: DeleteAlertProps) => {
  return (
    <Box>
      {heading ? <Heading>{heading}</Heading> : null}
      {text ? <Text>{text}</Text> : null}

      <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
        {onConfirmClick ? (
          <Box sx={{order: 1}}>
            <Button onClick={onConfirmClick} variant={variant}>
              Confirm
            </Button>
          </Box>
        ) : null}
        {onCancelClick ? (
          <Box sx={{mr: onConfirmClick ? 2 : 0}}>
            <Button onClick={onCancelClick} variant="text">
              Cancel
            </Button>
          </Box>
        ) : null}
      </Flex>
    </Box>
  )
}

export default DeleteAlert

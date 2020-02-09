/** @jsx jsx */
import {jsx, Flex, Box, Card, Heading, Button, Field as ThemeField} from 'theme-ui'

interface FormWrapperProps {
  children: React.ReactNode
  isModal?: boolean
  title?: React.ReactNode
  onCancel?: () => void
}

const FormWrapper = ({isModal, title, onCancel, children}: FormWrapperProps) => {
  return (
    <Box>
      <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3}}>
        {title ? <Heading>{title}</Heading> : null}
        {children}
      </Card>
      <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
        {onCancel ? (
          <Box sx={{mr: 3}}>
            <Button type="button" variant="text" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        ) : null}
        <Box>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default FormWrapper

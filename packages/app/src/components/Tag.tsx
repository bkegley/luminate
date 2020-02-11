/** @jsx jsx */
import {jsx, Badge, Flex, Box, Close} from 'theme-ui'

interface TagProps {
  onCloseClick?: () => void
  variant?: string
  text: string
}

const Tag = ({text, onCloseClick, variant}: TagProps) => {
  return (
    <Badge sx={{p: 0, bg: 'greys.2', color: 'secondary', variant}}>
      <Flex sx={{alignItems: 'center'}}>
        <Box sx={{ml: 2, mr: 1, textTransform: 'uppercase'}}>{text}</Box>
        {onCloseClick ? (
          <Close
            type="button"
            onClick={onCloseClick}
            sx={{
              borderRadius: 0,
              borderTopRightRadius: 'small',
              borderBottomRightRadius: 'small',
              '&:hover': {
                bg: 'secondary',
                color: 'white',
              },
              variant,
            }}
          />
        ) : null}
      </Flex>
    </Badge>
  )
}

export default Tag

/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import FarmCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const FarmCreatePage = () => {
  const history = useHistory()
  return (
    <Box>
      <Heading sx={{mb: 4}}>Create Farm</Heading>
      <FarmCreateForm onCancel={() => history.push('/app/farms')} />
    </Box>
  )
}

export default FarmCreatePage

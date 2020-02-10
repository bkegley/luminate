/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import VarietyCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const VarietyCreatePage = () => {
  const history = useHistory()
  return (
    <Box>
      <Heading sx={{mb: 4}}>Create Variety</Heading>
      <VarietyCreateForm onCancel={() => history.push('/app/varieties')} />
    </Box>
  )
}

export default VarietyCreatePage

/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import RegionCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const RegionCreatePage = () => {
  const history = useHistory()
  return (
    <Box>
      <Heading sx={{mb: 4}}>Create Region</Heading>
      <RegionCreateForm onCancel={() => history.push('/app/regions')} />
    </Box>
  )
}

export default RegionCreatePage

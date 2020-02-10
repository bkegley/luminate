/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import CountryCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const CountryCreatePage = () => {
  const history = useHistory()
  return (
    <Box>
      <Heading sx={{mb: 4}}>Create Country</Heading>
      <CountryCreateForm onCancel={() => history.push('/app/countries')} />
    </Box>
  )
}

export default CountryCreatePage

/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import CoffeeCreateForm from './CreateForm'
import {useHistory} from 'react-router-dom'

const CoffeeCreatePage = () => {
  const history = useHistory()
  return (
    <Box>
      <Heading sx={{mb: 4}}>Create Coffee</Heading>
      <CoffeeCreateForm onCancel={() => history.push('/app/coffees')} />
    </Box>
  )
}

export default CoffeeCreatePage

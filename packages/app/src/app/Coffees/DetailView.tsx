/** @jsx jsx */
import React from 'react'
import {jsx, Box, Button} from 'theme-ui'
import {useGetCoffeeQuery} from '../../graphql'
import {Drawer} from '@luminate/gatsby-theme-luminate/src'
import {RouteComponentProps} from 'react-router-dom'
import CoffeeUpdateForm from './UpdateForm'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const CoffeeDetailView = ({match}: Props) => {
  const [showUpdateCoffee, setShowUpdateCoffee] = React.useState(false)
  const toggleUpdateForm = () => setShowUpdateCoffee(old => !old)
  const {
    params: {id},
  } = match
  const {data, error, loading} = useGetCoffeeQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getCoffee) {
    return null
  }

  return (
    <div>
      <h1>{data.getCoffee?.name}</h1>
      <Button onClick={toggleUpdateForm} variant="secondary">
        Edit
      </Button>
      <Drawer
        from="right"
        onClickOutside={toggleUpdateForm}
        open={showUpdateCoffee}
        bg="white"
        width={['90%', '75%', '50%']}
      >
        <Box sx={{p: 4}}>
          <CoffeeUpdateForm coffee={data.getCoffee} />
        </Box>
      </Drawer>
    </div>
  )
}

export default CoffeeDetailView

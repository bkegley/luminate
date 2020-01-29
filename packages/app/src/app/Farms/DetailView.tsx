/** @jsx jsx */
import React from 'react'
import {jsx} from 'theme-ui'
import {useGetFarmQuery} from '../../graphql'
import {Box, Button, Drawer} from '@luminate/gatsby-theme-luminate/src'
import {RouteComponentProps} from 'react-router-dom'
import FarmUpdateForm from './UpdateForm'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const FarmDetailView = ({match}: Props) => {
  const [showUpdateFarm, setShowUpdateFarm] = React.useState(false)
  const toggleUpdateForm = () => setShowUpdateFarm(old => !old)
  const {
    params: {id},
  } = match
  const {data, error, loading} = useGetFarmQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getFarm) {
    return null
  }

  return (
    <div>
      <h1>{data.getFarm?.name}</h1>
      <Button onClick={toggleUpdateForm} variant="secondary">
        Edit
      </Button>
      <Drawer
        from="right"
        onClickOutside={toggleUpdateForm}
        open={showUpdateFarm}
        bg="white"
        width={['90%', '75%', '50%']}
      >
        <Box sx={{p: 4}}>
          <FarmUpdateForm farm={data.getFarm} />
        </Box>
      </Drawer>
    </div>
  )
}

export default FarmDetailView

/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Card} from 'theme-ui'
import {useListFarmsTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Farm, Tooltip} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

interface Props extends RouteComponentProps {}

const ListFarmsView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListFarmsTableQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Flex sx={{flexDirection: 'column'}}>
      <Flex sx={{alignItems: 'center', justifyContent: 'space-between', px: 4, mb: 4}}>
        <Box>
          <Heading as="h1">Farm</Heading>
        </Box>
        <Box>
          <Button as="a" onClick={() => history.push(`${url}/create`)}>
            Create New
          </Button>
        </Box>
      </Flex>
      <Card>
        {data.listFarms.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>
                <FarmRow farm={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Flex>
  )
}

interface FarmRowProps {
  farm: Farm
  index: number
}
const FarmRow = ({farm, index}: FarmRowProps) => {
  return (
    <Flex sx={{py: 3, px: 4, bg: index % 2 == 0 ? 'inherit' : 'greys.0', alignItems: 'center'}}>
      <Box sx={{flex: 3}}>{farm.name}</Box>
      <Box sx={{flex: 2}}>{farm.country?.name}</Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(farm.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(farm.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(farm.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(farm.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
    </Flex>
  )
}

export default ListFarmsView

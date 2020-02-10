/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Card} from 'theme-ui'
import {useListRegionsTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Region, Tooltip} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

interface Props extends RouteComponentProps {}

const ListRegionsView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListRegionsTableQuery()

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
          <Heading as="h1">Region</Heading>
        </Box>
        <Box>
          <Button as="a" onClick={() => history.push(`${url}/create`)}>
            Create New
          </Button>
        </Box>
      </Flex>
      <Card>
        {data.listRegions.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>
                <RegionRow region={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Flex>
  )
}

interface RegionRowProps {
  region: Region
  index: number
}
const RegionRow = ({region, index}: RegionRowProps) => {
  return (
    <Flex sx={{py: 3, px: 4, bg: index % 2 == 0 ? 'inherit' : 'greys.0', alignItems: 'center'}}>
      <Box sx={{flex: 3}}>{region.name}</Box>
      <Box sx={{flex: 2}}>{region.country?.name}</Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(region.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(region.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(region.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(region.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
    </Flex>
  )
}

export default ListRegionsView

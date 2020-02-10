/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Card} from 'theme-ui'
import {useListVarietiesTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Variety, Tooltip} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

interface Props extends RouteComponentProps {}

const ListVarietiesView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListVarietiesTableQuery()

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
          <Heading as="h1">Variety</Heading>
        </Box>
        <Box>
          <Button as="a" onClick={() => history.push(`${url}/create`)}>
            Create New
          </Button>
        </Box>
      </Flex>
      <Card>
        {data.listVarieties.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>
                <VarietyRow variety={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Flex>
  )
}

interface VarietyRowProps {
  variety: Variety
  index: number
}
const VarietyRow = ({variety, index}: VarietyRowProps) => {
  return (
    <Flex sx={{py: 3, px: 4, bg: index % 2 == 0 ? 'inherit' : 'greys.0', alignItems: 'center'}}>
      <Box sx={{flex: 3}}>{variety.name}</Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(variety.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(variety.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(variety.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(variety.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
    </Flex>
  )
}

export default ListVarietiesView

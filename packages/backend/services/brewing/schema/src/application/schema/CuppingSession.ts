//import {CommandBus, QueryBus} from '@nestjs/cqrs'
//import {Args, Query, Resolver} from '@nestjs/graphql'

//@Resolver('CuppingSession')
//export class CuppingSessionResolvers {
//constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

//@Query('listCuppingSessions')
//async listCuppingSessions() {
//const query = new ListCuppingSessionsQuery()
//return this.queryBus.execute(query)
//}

//@Query('getCuppingSession')
//async getCuppingSession(@Args('id') id: string) {
//const query = new GetCuppingSessionQuery(id)
//const cuppingSession = await this.queryBus.execute(query)

//return CuppingSessionMapper.toDTO(cuppingSession)
//}

//@Mutation('createCuppingSession')
//async createCuppingSession(@Args('input') input: any) {
//const command = new CreateCuppingSessionCommand(input)
//}
//}

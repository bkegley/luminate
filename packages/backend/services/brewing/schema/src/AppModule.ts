import {CqrsModule} from '@nestjs/cqrs'
import {Module} from '@nestjs/common'
import {GraphQLFederationModule} from '@nestjs/graphql'

import {
  CreateBrewerCommandHandler,
  UpdateBrewerCommandHandler,
  DeleteBrewerCommandHandler,
  CreateBrewGuideCommandHander,
  UpdateBrewGuideCommandHandler,
  DeleteBrewGuideCommandHandler,
  CreateBrewingSessionCommandHandler,
  UpdateBrewingSessionCommandHandler,
  DeleteBrewingSessionCommandHandler,
  CreateEvaluationCommandHandler,
  UpdateEvaluationCommandHandler,
  DeleteEvaluationCommandHandler,
  CreateGrinderCommandHandler,
  UpdateGrinderCommandHandler,
  DeleteGrinderCommandHandler,
  CreateRecipeCommandHandler,
} from './application/commands'
import {
  ListBrewersQueryHandler,
  GetBrewerQueryHandler,
  ListBrewGuidesQueryHandler,
  GetRecipeQueryHandler,
  ListRecipesQueryHandler,
} from './application/queries'
import {BrewerResolvers} from './application/schema/Brewer'
import {BrewGuideResolvers} from './application/schema/BrewGuide'
import {RecipeResolvers} from './application/schema/Recipe'
import {GrinderResolvers} from './application/schema/Grinder'
import {
  InMemoryBrewerRepository,
  InMemoryBrewGuideRepository,
  InMemoryBrewingSessionRepository,
  InMemoryEvaluationRepository,
  InMemoryGrinderRepository,
  InMemoryRecipeRepository,
} from './infra/repositories'

const QueryHandlers = [
  ListBrewersQueryHandler,
  GetBrewerQueryHandler,
  ListBrewGuidesQueryHandler,
  ListRecipesQueryHandler,
  GetRecipeQueryHandler,
]

const CommandHandlers = [
  CreateBrewerCommandHandler,
  UpdateBrewerCommandHandler,
  DeleteBrewerCommandHandler,
  CreateBrewGuideCommandHander,
  UpdateBrewGuideCommandHandler,
  DeleteBrewGuideCommandHandler,
  CreateGrinderCommandHandler,
  UpdateGrinderCommandHandler,
  DeleteGrinderCommandHandler,
  CreateBrewingSessionCommandHandler,
  UpdateBrewingSessionCommandHandler,
  DeleteBrewingSessionCommandHandler,
  CreateEvaluationCommandHandler,
  UpdateEvaluationCommandHandler,
  DeleteEvaluationCommandHandler,
  CreateRecipeCommandHandler,
]

const EventHandlers: any[] = []

const Resolvers = [BrewerResolvers, BrewGuideResolvers, GrinderResolvers, RecipeResolvers]

const Repos = [
  InMemoryBrewerRepository,
  InMemoryBrewGuideRepository,
  InMemoryBrewingSessionRepository,
  InMemoryEvaluationRepository,
  InMemoryGrinderRepository,
  InMemoryRecipeRepository,
]

@Module({
  imports: [CqrsModule, GraphQLFederationModule.forRoot({typePaths: ['./src/application/schema/*.graphql']})],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers, ...Resolvers, ...Repos],
})
export class AppModule {}

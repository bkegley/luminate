const baseClientConfig = {
  withComponent: false,
  withHOC: false,
  withHooks: true,
  nonOptionalTypename: true,
  federation: true,
}

const clientMutationSuccessAdd = {
  add: {
    content: [
      `type ThenArg<T> = T extends PromiseLike<infer U> ? U : T`,
      `export type MutationSuccessResponse<T extends (...args: any[]) => any[]> = ThenArg<ReturnType<ThenArg<ReturnType<T>>[0]>>`,
    ],
  },
}

const clientGenerates = {
  'packages/frontend/admin/src/graphql/index.tsx': {
    documents: 'packages/frontend/admin/src/graphql/**/*.graphql',
    schema: 'http://localhost:3000/graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo', clientMutationSuccessAdd],
    config: baseClientConfig,
  },
  'packages/frontend/app/src/graphql/index.tsx': {
    documents: 'packages/frontend/app/src/graphql/**/*.graphql',
    schema: 'http://localhost:3000/graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo', clientMutationSuccessAdd],
    config: baseClientConfig,
  },
  'packages/frontend/gatsby-theme-luminate/src/graphql/index.tsx': {
    documents: 'packages/frontend/gatsby-theme-luminate/src/graphql/**/*.graphql',
    schema: 'http://localhost:3000/graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo', clientMutationSuccessAdd],
    config: baseClientConfig,
  },
}

const serverGenerates = {
  'packages/backend/graphql-utils/src/types.ts': {
    plugins: ['typescript'],
  },
  'packages/backend/server-auth/src/types.d.ts': {
    schema: ['./packages/backend/server-auth/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        Role: '@luminate/mongo#RoleDocument',
        User: '@luminate/mongo#UserDocument',
        Me: '@luminate/mongo#UserDocument',
      },
    },
  },
  'packages/backend/server-encyclopedia/src/types.d.ts': {
    schema: ['./packages/backend/server-encyclopedia/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        Coffee: '@luminate/mongo#CoffeeDocument',
        Country: '@luminate/mongo#CountryDocument',
        Farm: '@luminate/mongo#FarmDocument',
        Note: '@luminate/mongo#NoteDocument',
        Region: '@luminate/mongo#RegionDocument',
        Variety: '@luminate/mongo#VarietyDocument',
      },
    },
  },
  'packages/backend/server-sensory-eval/src/types.d.ts': {
    schema: ['./packages/backend/server-sensory-eval/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        CuppingSession: '@luminate/mongo#CuppingSessionDocument',
        SessionCoffee: '@luminate/mongo#SessionCoffeeDocument',
        ScoreSheet: '@luminate/mongo#ScoreSheetDocument',
      },
    },
  },
}

module.exports = {
  schema: ['./packages/backend//graphql-utils/src/schema/**/*.ts'],
  generates: Object.assign(
    {},
    process.argv.find(arg => arg === '--client') ? clientGenerates : null,
    process.argv.find(arg => arg === '--server') ? serverGenerates : null,
  ),
}

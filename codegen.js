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
  'packages/backend/utils/graphql/src/types.ts': {
    plugins: ['typescript'],
  },
  'packages/backend/services/identity/schema/src/types.d.ts': {
    schema: ['./packages/backend/services/identity/schema/src/application/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      //mappers: {
      //Role: './infra/models#RoleDocument',
      //User: './infra/models#UserDocument',
      //Me: './infra/models#UserDocument',
      //},
    },
  },
  'packages/backend/services/encyclopedia/schema/src/types.d.ts': {
    schema: ['./packages/backend/services/encyclopedia/schema/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        Coffee: './models#CoffeeDocument',
        Country: './models#CountryDocument',
        Farm: './models#FarmDocument',
        Note: './models#NoteDocument',
        Region: './models#RegionDocument',
        Variety: './models#VarietyDocument',
      },
    },
  },
  'packages/backend/services/brewing/schema/src/types.d.ts': {
    schema: ['./packages/backend/services/brewing/schema/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        CuppingSession: './models#CuppingSessionDocument',
        SessionCoffee: './models#SessionCoffeeDocument',
        ScoreSheet: './models#ScoreSheetDocument',
      },
    },
  },
}

module.exports = {
  schema: ['./packages/backend/utils/graphql/src/schema/**/*.ts'],
  generates: Object.assign(
    {},
    process.argv.find(arg => arg === '--client') ? clientGenerates : null,
    process.argv.find(arg => arg === '--server') ? serverGenerates : null,
  ),
}

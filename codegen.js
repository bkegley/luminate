module.exports = {
  schema: ['./packages/graphql-utils/src/schema/**/*.ts'],
  generates: {
    'packages/graphql-utils/src/types.ts': {
      plugins: ['typescript'],
    },
    'packages/server-luminate/src/types.d.ts': {
      schema: ['./packages/server-luminate/src/schema/**/!(index.ts)*.ts'],
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './startServer#Context',
        useIndexSignature: true,
        mappers: {
          Coffee: '@luminate/mongo#CoffeeDocument',
          Country: '@luminate/mongo#CountryDocument',
          Farm: '@luminate/mongo#FarmDocument',
          FarmZone: '@luminate/mongo#FarmZoneDocument',
          Region: '@luminate/mongo#RegionDocument',
          Variety: '@luminate/mongo#VarietyDocument',
        },
      },
    },

    'packages/server-auth/src/types.d.ts': {
      schema: ['./packages/server-auth/src/schema/**/!(index.ts)*.ts'],
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './startServer#Context',
        useIndexSignature: true,
        defaultMapper: 'Partial<{T}>',
      },
    },
  },
}

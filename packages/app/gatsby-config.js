module.exports = {
  plugins: [
    {
      resolve: '@luminate/gatsby-theme-luminate',
      options: {
        authWrapper: true,
        uri: 'http://api.luminate.coffee/graphql',
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/app/*'],
      },
    },
    'gatsby-plugin-typescript',
  ],
}

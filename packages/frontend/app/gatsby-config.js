require('dotenv').config({
  path: `.env.${process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  plugins: [
    {
      resolve: '@luminate/gatsby-theme-luminate',
      options: {
        authWrapper: true,
        uri: process.env.API_URL || 'http://localhost:3000/graphql',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
  ],
}

require('dotenv').config({
  path: `.env.${process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  plugins: [
    {
      resolve: '@luminate/gatsby-theme-luminate',
      options: {
        uri: process.env.API_URL || 'http://localhost:3000/graphql',
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('tailwindcss')('./tailwind.config.js'), require('autoprefixer')],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/styles/style.css'],
      },
    },
  ],
}

const path = require('path');
const config = require('./src/config');
module.exports = {
  pathPrefix: "/gatsby-starter-builder",
  siteMetadata: {
    title: 'Gatsby + Builder.io Starter',
    description:
      'This repo contains an example website that is built with Builder.io, and generate with Gatsby'
  },
  plugins: [
    'gatsby-plugin-top-layout',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: '@builder.io/gatsby',
      options: {
        publicAPIKey: config.builderAPIKey,
        templates: {
          // Render every `landingPage` model as a new page using the 
          // src/templates/LandingPage.jsx template based on the URL provided in Builder.io
          landingPage: path.resolve('src/templates/LandingPage.jsx'),
          testPage: path.resolve('src/templates/TestPage.jsx')
        },
        custom404Dev: path.resolve('./src/pages/404.jsx')
      }
    }
  ]
};

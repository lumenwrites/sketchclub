// Making dotenv work with next:
// https://medium.com/courtly-intrepid/environmental-variables-in-next-js-with-dotenv-599c5bbfdf74
const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config({
  path:'.env'
})

module.exports = {
  reactStrictMode: true,
  webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
      return config
      
  }
}

const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: 'localhost',
    host: '0.0.0.0',
    port: '8081', 
    proxy: {
      "/crm": {
        target: "https://crm.meihualife.com",
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/crm/" : "/",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jQuery',
        jQuery: 'jQuery',
      })
    ]
  }
})

const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    // host: '0.0.0.0',
    port: '8081', 
    proxy: {
      "/crm": {
        target: "https://crm.meihualife.com",
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/crm/" : "/",
  // publicPath: process.env.NODE_ENV === "production" ? "/weChat/CRM/" : "/",
  // publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jQuery',
        jQuery: 'jQuery',
      })
    ]
  }
})

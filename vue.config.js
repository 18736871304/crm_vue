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
      //  在全局引用jQuery
      new webpack.ProvidePlugin({
        $: 'jQuery',
        jQuery: 'jQuery',
      })
    ]
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        // args 是 terser-webpack-plugin 的配置数组，修改第一个元素的 terserOptions
        if (args[0].terserOptions.compress) {
          args[0].terserOptions.compress.drop_console = true
          args[0].terserOptions.compress.pure_funcs = ['console.log'] // 额外保证去除 console.log
        }
        return args
      })
    }
  }



})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//關閉eslink校驗
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-app/'
    : '/'
})

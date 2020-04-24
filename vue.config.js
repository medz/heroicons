const path = require('path');

module.exports = {
  publicPath: "/heroicons/",
  outputDir: path.resolve(__dirname, 'docs'),
  configureWebpack: {
    resolve: {
      alias: {
        '@bytegem/vue-heroicons': path.resolve(__dirname, 'packages/vue-heroicons/dist/vue-heroicons.esm.js'),
      }
    }
  }
};
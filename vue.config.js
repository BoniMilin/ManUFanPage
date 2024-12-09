const webpack = require('webpack');

module.exports = {
  publicPath: './', // Ensures proper loading of assets
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
    ],
  },
};

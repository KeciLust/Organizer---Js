const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
 const TerserPlugin = require('terser-webpack-plugin');
 const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({}),
      '...',
    ],
  },
});

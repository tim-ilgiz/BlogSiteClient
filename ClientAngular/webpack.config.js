const PATH = require('path');
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  resolve: { extensions: ['.ts', '.js'] },

  entry: {
    polyfills: './src/polyfills.ts',
    //app: './test.ts'
    app: './src/main.ts'
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },

      { test: /\.html$/, loader: 'html-loader' },

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      { test: /\.(png|jpg|svg|gif)$/, use: ['file-loader'] },

      { test: /\.scss$/, use: ['sass-loader', 'node-loader'] },

      { test: /\.(ttf|woff|woff2|eot)$/, use: ['file-loader'] }
    ]
  },

  output: {
    path: PATH.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },

  plugins: [
    new HTML_WEBPACK_PLUGIN({template: './src/index.html'}),
    new CleanWebpackPlugin()
  ]
}

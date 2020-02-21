const PATH = require('path');
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: { splitChunks: { chunks:'all' } },
  devServer: { port: 4200 },

  resolve: { 
      extensions: ['.ts', '.js'],
      alias: {
        '@CORE': PATH.resolve(__dirname, 'src/app/core'),
        '@DOMAIN': PATH.resolve(__dirname, 'src/app/Domain'),
        '@SHARED': PATH.resolve(__dirname, 'src/app/shared'),
        '@COMPONENTS': PATH.resolve(__dirname, 'src/app/components')
      }
  },

  entry: {
    polyfills: './src/polyfills.ts',
    app: './src/main.ts'
  },

  module: {
    rules: [
      { test: /\.ts$/, 
        use: [{
            loader: 'awesome-typescript-loader',
            options: { configFileName: PATH.resolve(__dirname, 'tsconfig.json') } }] },

      { test: /\.(ts|js)$/, use: ['angular-router-loader'] },

      { test: /\.html$/, use: ['html-loader'] },

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      { test: /\.(png|jpg|svg|gif)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]' },

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

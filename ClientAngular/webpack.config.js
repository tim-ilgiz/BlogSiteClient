const PATH = require('path');
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");
//const COPY_WEBPACK_PLUGIN = require('copy-webpack-plugin');
const MINI_CSS_EXTRACT_PLUGIN = require('mini-css-extract-plugin');
const OPTIMIZE_CSS_ASSETS_WEBPACK_PLUGIN = require('optimize-css-assets-webpack-plugin');
const TERSER_WEBPACK_PLUGIN = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const IS_NODE_DEV = process.env.NODE_ENV === 'development';
const IS_NODE_PROD = !IS_NODE_DEV;
console.log(`IS_NODE=${process.env.NODE_ENV}`);

const optimizationFunc = () => {
  const config = { splitChunks: { chunks:'all' } };

    if (IS_NODE_PROD) {
      config.minimizer = [
        new TERSER_WEBPACK_PLUGIN(),
        new OPTIMIZE_CSS_ASSETS_WEBPACK_PLUGIN()]
    }
    return config;
  };

const FILENAME_FUNC = ext => IS_NODE_DEV ? `[name].${ext}` : `[name].[hash].${ext}`;
const CSS_LOADER_FUNC = (extra) => {
  const loaders = [
    'to-string-loader',
      {
        loader: MINI_CSS_EXTRACT_PLUGIN.loader,
        options: { hmr: IS_NODE_DEV, reloadAll: true }
      },
    'css-loader'];

  if(extra) loaders.push(extra);
  return loaders;
}

const GET_BABLE_OPTIONS = preset => {
  const options = {presets: [
      '@babel/preset-env'
    ],
    plugins: ['@babel/plugin-proposal-class-properties'] };

  if(preset) options.presets.push(preset);
  return options;
}

module.exports = {
  devtool: IS_NODE_DEV ? 'source-map' : '',
  optimization: optimizationFunc(),
  devServer: { port: 4200, historyApiFallback: true, hot: IS_NODE_DEV},

  resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@CORE': PATH.resolve(__dirname, './src/app/core'),
        '@DOMAIN': PATH.resolve(__dirname, './src/app/Domain'),
        '@SHARED': PATH.resolve(__dirname, './src/app/shared'),
        '@COMPONENTS': PATH.resolve(__dirname, './src/app/components')
      }
  },

  entry: {
    'polyfills': './src/polyfills.ts',
    'app': './src/main.ts'
  },

  module: {
    rules: [
      { test: /\.(ts|js)$/, use: ['angular-router-loader'] },

      { test: /\.html$/, use: ['html-loader'] },

      { test: /\.(png|jpg|svg|gif)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]' },

      { test: /\.(ttf|woff|woff2|eot)$/, use: ['file-loader'] },

      { test: /\.css$/, use: CSS_LOADER_FUNC() },

      { test: /\.(scss|sass)$/,
        use: [
          'to-string-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },

      { test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {configFileName: PATH.resolve(__dirname, './tsconfig.json')}
          }, 'angular2-template-loader'
        ]
      },

      { test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: GET_BABLE_OPTIONS()
        }
      },
    ]
  },

  output: {
    path: PATH.resolve(__dirname, './dist'),
    filename: FILENAME_FUNC('js')
  },

  plugins: [
    new HTML_WEBPACK_PLUGIN({
      template: './src/index.html',
      minify: {
        collapseWhitespace: IS_NODE_PROD
      }
    }),
    new CleanWebpackPlugin(),
    new MINI_CSS_EXTRACT_PLUGIN({filename: FILENAME_FUNC('css')})
  ]
}




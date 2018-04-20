/*
*   BUILD COMMAND
*   "build:test": "cross-env NODE_ENV=production webpack --config ./webpack.test.config.js --progress --profile --colors --debug",
* */

'use strict'
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoPreFixer = require('autoprefixer');
const packageJson = require('./package.json');

//Environment constant
const ENV = {
  DEV: 'development',
  PROD: 'production',
}

// Add [--debug] flag at build command so that easily maintain file minification for development || production environment
const DEBUG = process.argv.includes('--debug')

// Get Application environment
const NODE_ENV = `${process.env.NODE_ENV}` || ENV.DEV
console.log('NODE_ENV ', NODE_ENV);
console.log('DEBUG ', DEBUG);

// Set Application Configuration with multiple environment
const appConfig = () => {
  let _config = {}

  if (NODE_ENV === ENV.PROD) {
    _config = {
      'process.env': {
        'API_URI': JSON.stringify('http://localhost:5001/api'),
      }
    }
  } else {
    _config = {
      'process.env': {
        'API_URI': JSON.stringify('http://localhost:5000/api'),
      }
    }
  }

  _config['process.env'] = {
    ..._config['process.env'],
    'NODE_ENV': JSON.stringify(NODE_ENV)
  };

  //console.log('APP_CONFIG ', _config, '\n');
  return _config;
};

// Webpack Configuration for APP
const config = {

  // Set multiple entry point to make multiple file || router level file
  entry: {
    main: path.join(__dirname, 'src/app/index.js'),
    vendor: Object.keys(packageJson.dependencies),
  },

  //  Get All file which are entered in entry point
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: DEBUG ? 'js/[name].js' : 'js/[name].[hash].js',
    publicPath: '/'
  },

  //  Set source map
  devtool: DEBUG ? 'eval-source-map' : false,

  //  Set Devserver config
  devServer: {
    historyApiFallback: true
  },

  //  Define all extension which are required for JS
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  //  Define all modules loaders
  module: {
    loaders: [
      //  JS Loader
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },

      //  JSON Loader
      {
        test: /\.(json)$/,
        loader: 'json-loader',
      },

      //  CSS Loader
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: true}
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [autoPreFixer]
                }
              }
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, 'src/styles/assets/variables.scss'),
              }
            }
          ]
        })
      },

      //  Image Loader
      {
        test: /\.(jpg|png|gif|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./assets/images/[name].[ext]',
        include: path.join(__dirname, 'src/assets/images')
      },

      //  Fonts Loader
      {
        test: /\.(eot|otf|svg|ttf|woff)$/,
        loader: 'file-loader?name=./assets/fonts/[name].[ext]',
        include: path.join(__dirname, 'src/assets/fonts')
      }
    ]
  },

  //  Define all Plugins which are required
  plugins: [

    //  CleanWebpackPlugin use to clear dist folder
    new CleanWebpackPlugin(['dist']),

    //  OccurrenceOrderPlugin use to define order
    new webpack.optimize.OccurrenceOrderPlugin(true),

    //  DefinePlugin use to set all basic configuration
    new webpack.DefinePlugin(appConfig()),

    //  HtmlWebpackPlugin use to create HTML index page
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist/index.html'),
      template: path.join(__dirname, 'src/index.ejs'),
      title: 'React App'
    }),

    //  ExtractTextPlugin use for CSS
    new ExtractTextPlugin({
      filename: DEBUG ? 'assets/styles/[name].css' : 'assets/styles/[name].[contenthash].css',
    }),

    //  UglifyJsPlugin use to Uglify JS files
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {warnings: false},
        comments: false,
        minimize: true
      }
    }),
    //  CommonsChunkPlugin use to create a common js file
    new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'js/[name].[hash].js'}),

    //  CopyWebpackPlugin use to copy files
    // new CopyWebpackPlugin([
    //     {from: path.join(__dirname, '/web.config'), to: path.join(__dirname, 'dist/')},
    //     {from: path.join(__dirname, '/robots.txt'), to: path.join(__dirname, 'dist/')}
    // ], {
    //     copyUnmodified: true
    // })

  ]
};

const webPackConfig = () => {
  //  Here you can define any business logic || modify webpack configuration

  return config;
};

module.exports = webPackConfig;

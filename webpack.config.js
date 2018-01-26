'use strict';

var webpack   = require('webpack');
var path      = require('path');

module.exports = [
  {
    resolve: {
      extensions: ['.js', '.jsx']
    },

    entry: path.join(__dirname, 'index.jsx'),

    output: {
      path: __dirname.replace('/essy-chart-example', ''),
      filename: 'chart-example.min.js'
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: ['node_modules'],
          use: [
            'babel-loader'
          ]
        }
      ]
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ],

    stats: {
      colors: true
    }
  }
];

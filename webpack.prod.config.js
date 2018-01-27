'use strict';

var webpack = require('webpack');
var config  = require('./webpack.config');

for (let i = 0; i < config.length; i++) {
  let cfg = config[i];
  cfg.plugins = cfg.plugins || [];
  cfg.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  cfg.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
}

module.exports = config;

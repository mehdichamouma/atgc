var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: "./index.js",
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: "../public/",
    filename: "server.js"
  },
  externals: nodeModules,
  devtool: "source-map",
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                         { raw: true, entryOnly: false }),
   new webpack.optimize.OccurenceOrderPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}

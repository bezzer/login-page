var webpack = require("webpack");
var PROD = JSON.parse(process.env.NODE_ENV === 'production');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/src/js',
    filename: 'site.js'
  },
  devtool: PROD ? '' : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  },
  // Uglify output for production builds
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
}
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './index.ts',
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    title: 'opensheetmusicdisplay | webpack-usage-example',
    favicon: 'resources/favicon.ico' // not providing a favicon.ico can cause 404 warnings
  }),
  new CopyWebpackPlugin([
  {
    from: 'resources/MuzioClementi_SonatinaOpus36No1_Part1.xml',
    to: 'musicXmlSample.xml'
  },
  ])
  ]
};

module.exports = config;

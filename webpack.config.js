/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const locateContentScripts = require('./utils/locateContentScripts');

const sourceRootPath = path.join(__dirname, 'src');
const contentScriptsPath = path.join(sourceRootPath, 'content-scripts', 'scripts');
const distRootPath = path.join(__dirname, 'chrome', 'dist');
const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const webBrowser = process.env.WEB_BROWSER ? process.env.WEB_BROWSER : 'chrome';
const contentScripts = locateContentScripts(contentScriptsPath);

module.exports = {
  mode: nodeEnv,
  entry: {
    background: path.join(sourceRootPath, 'background', 'index.ts'),
    options: path.join(sourceRootPath, 'options', 'index.tsx'),
    popup: path.join(sourceRootPath, 'popup', 'index.tsx'),
    ...contentScripts,
  },
  output: {
    path: distRootPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(sourceRootPath, 'template.html'),
      inject: 'body',
      filename: 'options.html',
      title: 'Web Extension Starter - Options Page',
      cssFile: 'options.css',
      root: 'options-root',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(sourceRootPath, 'template.html'),
      inject: 'body',
      filename: 'popup.html',
      title: 'Web Extension Starter - Popup Page',
      root: 'popup-root',
      cssFile: 'popup.css',
      chunks: ['popup'],
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(nodeEnv),
      WEB_BROWSER: JSON.stringify(webBrowser),
    }),
    new CleanWebpackPlugin(),
  ],
};

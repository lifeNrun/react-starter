/**
 * Http server for serving the frontend files
 */

const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.config');

const app = express();

app.use(require('connect-history-api-fallback')());


const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use(express.static(path.join(__dirname, 'src/static')));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server is now running at http://localhost:${port}.`); // eslint-disable-line no-console

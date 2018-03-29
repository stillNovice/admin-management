import express from 'express';
import path from 'path';
import colors from 'colors';
import open from 'open';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';

const PORT = 3000;
const app = express();

// setup webpack
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, function(err) {
  if(err) {
    console.log(colors.red('errors'));  //eslint-disable-line no-console
    console.error(err); //eslint-disable-line no-console
  } else {
    console.log(colors.green(`Server is listening @ ${PORT}`)); //eslint-disable-line no-console
    open(`http://localhost:${PORT}`, `chrome`); //eslint-disable-line no-console
  }
});
var http = require('http')
var express = require('express')
var app = express()
const port = process.env.PORT || 3005
var path = require('path');

var isProduction = (process.env.NODE_ENV === 'production');

if (!isProduction) {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);


  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    filename: 'bundle.js',
    stats: {
      colors: true
    },
    //quiet: true
  }));

  app.use(require("webpack-hot-middleware")(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000
  }));
}

app.use('/public', express.static(path.join(__dirname, 'src/client/public')));
app.use(express.static(__dirname + '/src/client/public'));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'src/client/', 'index.html'))
})

var server = app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
})